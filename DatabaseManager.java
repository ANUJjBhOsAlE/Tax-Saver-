import java.sql.*;

public class DatabaseManager {
    private static final String URL = "jdbc:mysql://localhost:3306/tax_s";
    private static final String USER = "root";
    private static final String PASSWORD = "Anuj007"; 

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void insertTaxRecord(String username, double income, double deductions, double tax) {
        String sql = "INSERT INTO tax_records (username, annual_income, deductions, calculated_tax) VALUES (?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, username);
            stmt.setDouble(2, income);
            stmt.setDouble(3, deductions);
            stmt.setDouble(4, tax);
            stmt.executeUpdate();
            System.out.println(" Data saved to tax_records table.");

        } catch (SQLException e) {
            System.out.println(" Database error: " + e.getMessage());
        }
    }
    public static void viewAllRecords() {
    String sql = "SELECT * FROM tax_records";
    try (Connection conn = getConnection();
         Statement stmt = conn.createStatement();
         ResultSet rs = stmt.executeQuery(sql)) {

        System.out.println("\n All Tax Records:");
        System.out.printf("%-15s %-15s %-15s %-15s%n", "Name", "Income", "Deductions", "Tax");
        while (rs.next()) {
            String name = rs.getString("username");
            double income = rs.getDouble("annual_income");
            double deductions = rs.getDouble("deductions");
            double tax = rs.getDouble("calculated_tax");

            System.out.printf("%-15s rs%-14.2f rs%-14.2f rs%-14.2f%n", name, income, deductions, tax);
        }

    } catch (SQLException e) {
        System.out.println(" Error retrieving records: " + e.getMessage());
    }
}

public static void deleteRecordByName(String name) {
    String sql = "DELETE FROM tax_records WHERE LOWER(TRIM(username)) = LOWER(TRIM(?))";

    try (Connection conn = getConnection();
         PreparedStatement stmt = conn.prepareStatement(sql)) {

        stmt.setString(1, name);
        int rowsDeleted = stmt.executeUpdate();

        if (rowsDeleted > 0) {
            System.out.println(" Record(s) deleted for: " + name);
        } else {
            System.out.println(" No record found for: " + name);
        }

    } catch (SQLException e) {
        System.out.println(" Error deleting record: " + e.getMessage());
    }
}


}
