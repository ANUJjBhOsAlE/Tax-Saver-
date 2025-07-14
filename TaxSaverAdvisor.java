public class TaxSaverAdvisor {

    public static void suggestTips(int age, double income, double deductionsUsed) {
        double max80C = 150000;
        double potential80C = Math.max(0, max80C - deductionsUsed);
        double totalSavings = 0;

        System.out.println("\n Tax Saving Tips:");

        if (potential80C > 0) {
            System.out.println(" You can still invest Rs" + potential80C + " under 80C (LIC, PPF, ELSS, etc.)");
            totalSavings += potential80C;
        }

        if (income > 500000) {
            System.out.println(" Invest ₹50,000 in NPS (Section 80CCD(1B))");
            totalSavings += 50000;
        }

        if (age >= 60) {
            System.out.println(" Claim ₹50,000 under 80D for senior citizen health insurance");
            totalSavings += 50000;
        } else {
            System.out.println(" Claim ₹25,000 under 80D for health insurance");
            totalSavings += 25000;
        }

        System.out.println(" Bro, if you follow these, you can still reduce your taxable income by Rs" + totalSavings);
    }
}
