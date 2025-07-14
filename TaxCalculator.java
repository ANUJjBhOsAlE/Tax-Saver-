public class TaxCalculator {
    public static double calculateTax(double income, double deductions) {
        double taxable = income - deductions;
        double tax = 0;

        if (taxable <= 300000) {
            tax = 0;
        } else if (taxable <= 600000) {
            tax = 0.05 * (taxable - 300000);
        } else if (taxable <= 900000) {
            tax = 15000 + 0.10 * (taxable - 600000);
        } else if (taxable <= 1200000) {
            tax = 45000 + 0.15 * (taxable - 900000);
        } else if (taxable <= 1500000) {
            tax = 90000 + 0.20 * (taxable - 1200000);
        } else {
            tax = 150000 + 0.30 * (taxable - 1500000);
        }

        return tax;
    }
}
