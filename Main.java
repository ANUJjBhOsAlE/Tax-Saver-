import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;

        do {
            System.out.println("\n Welcome to Tax Saver Console App");
            System.out.println("1. New Tax Calculation");
            System.out.println("2. View All Records");
            System.out.println("3. Delete Record");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); 

            switch (choice) {
                case 1:
                    System.out.print("Enter your name: ");
                    String name = sc.nextLine();

                    System.out.print("Enter your age: ");
                    int age = sc.nextInt();

                    System.out.print("Enter your annual income: ");
                    double income = sc.nextDouble();

                    System.out.print("Enter your deductions: ");
                    double deductions = sc.nextDouble();
                    sc.nextLine(); 
                    double tax = TaxCalculator.calculateTax(income, deductions);

                    System.out.println("\n--- Summary ---");
                    System.out.println("Name: " + name);
                    System.out.println("Age: " + age);
                    System.out.println("Income: Rs" + income);
                    System.out.println("Deductions: Rs" + deductions);
                    System.out.println("Calculated Tax: Rs" + tax);

                    DatabaseManager.insertTaxRecord(name, income, deductions, tax);

                    System.out.print("Do you want tax saving suggestions? (yes/no): ");
                    String suggest = sc.nextLine().trim().toLowerCase();
                    if (suggest.equals("yes")) {
                         TaxSaverAdvisor.suggestTips(age, income, deductions);
                    }
                    break;

                case 2:
                    DatabaseManager.viewAllRecords();
                    break;

                case 3:
                    System.out.print("Enter the name to delete records: ");
                    String nameToDelete = sc.nextLine();
                    DatabaseManager.deleteRecordByName(nameToDelete);
                    break;

                case 4:
                    System.out.println("Thank you for using Tax Saver Console App!");
                    break;

                default:
                    System.out.println(" Invalid choice. Please enter 1-4.");
            }
        } while (choice != 4);

        sc.close();
    }
}
