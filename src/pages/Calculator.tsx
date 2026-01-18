import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../store/AppContext";

interface taxData {
  monthlyGrossIncome: number;
  additionalMonthlyIncome: number;
  annualPensionContribution: number;
  annualNHFContributions: number;
  annualRentPaid: number;
  lifeInsurancePremiums: number;
}

interface calculationResponse {
  success: boolean,
  message: string,
  userID: string,
  taxCalculation: {
    grossIncome: number,
    totalDeductions: number,
    taxableIncome: number,
    taxOwed: number,
    effectiveTaxRate: number,
    afterTaxIncome: number
  }
}


const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const inputStyle =
  "w-full rounded-xl bg-blue-100/60 px-4 py-3 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500";

const apiUrl = import.meta.env.VITE_API_URL;

const Calculator = () => {
  const appCtx = useContext(AppContext);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [taxData, setTaxData] = useState<taxData>({
    monthlyGrossIncome: 0,
    additionalMonthlyIncome: 0,
    annualPensionContribution: 0,
    annualNHFContributions: 0,
    annualRentPaid: 0,
    lifeInsurancePremiums: 0
  });

  const handleInputChange = (field: keyof taxData, value: number) => {
    setTaxData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }


  const calculateTax = async (taxData: taxData) => {
    setError(null);

    if (taxData.monthlyGrossIncome === 0 || taxData.additionalMonthlyIncome === 0 || taxData.annualPensionContribution === 0 || taxData.annualNHFContributions === 0 || taxData.annualRentPaid === 0 || taxData.lifeInsurancePremiums === 0 || loading) {
    
      setError("Please fill in all required fields.");
      return
    };

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/tax/calculate`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taxData),
      });

      if (!response.ok) {
        throw new Error("Failed to calculate taxes");
      }

      const data: calculationResponse = await response.json();

      appCtx.handleUserIDChange(data.userID);
      navigate("/result", { state: { taxResults: data.taxCalculation } });
    } catch (err) {
      setError("An error occurred while calculating taxes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <motion.div
        className="mx-auto max-w-3xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* HEADER */}
        <motion.header variants={item} className="mb-8">
          <button
            onClick={() => navigate("/")}
            className="mb-4 flex items-center gap-2 text-primary/70 hover:text-primary transition-colors duration-150 ease-in-out font-medium cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Return to Home
          </button>
          <h1 className="text-3xl md:text-4xl font-bold text-primary/95">
            Calculate Your 2026 Tax
          </h1>
          <p className="mt-3 text-primary/75 max-w-xl">
            Enter your income and deduction details below. All calculations are
            based on the 2026 Nigerian tax reforms.
          </p>
        </motion.header>

        {/* INCOME INFO */}
        <motion.section
          variants={item}
          className="rounded-2xl border border-blue-200 bg-white p-6 mb-8"
        >
          <h2 className="text-xl font-semibold text-primary/95 mb-2">
            Income Information
          </h2>
          <p className="text-primary/75 text-sm mb-6">
            Enter your monthly income details. We'll calculate the annual
            figures automatically.
          </p>

          <div className="space-y-5">
            <div>
              <label className="font-medium text-primary/95">
                Monthly Gross Income{" "}
                <span className="text-sm font-normal">(Required)</span>
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("monthlyGrossIncome", Number(e.target.value))}
                value={taxData.monthlyGrossIncome}
              />
            </div>

            <div>
              <label className="font-medium text-primary/95">
                Additional Monthly Income
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("additionalMonthlyIncome", Number(e.target.value))}
                value={taxData.additionalMonthlyIncome}
              />
            </div>
          </div>
        </motion.section>

        {/* DEDUCTIONS */}
        <motion.section
          variants={item}
          className="rounded-2xl border border-blue-200 bg-white p-6 mb-10"
        >
          <h2 className="text-xl font-semibold text-primary/95 mb-2">
            Tax Reliefs & Deductions
          </h2>
          <p className="text-primary/75 text-sm mb-6">
            Enter your annual contributions and payments. These reduce your
            taxable income.
          </p>

          <div className="space-y-5">
            <div>
              <label className="font-medium text-primary/95">
                Annual Pension Contributions
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("annualPensionContribution", Number(e.target.value))}
                value={taxData.annualPensionContribution}
              />
            </div>

            <div>
              <label className="font-medium text-blue-600">
                Annual NHF Contributions
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("annualNHFContributions", Number(e.target.value))}
                value={taxData.annualNHFContributions}
              />
            </div>

            <div>
              <label className="font-medium text-blue-600">
                Annual Rent Paid
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("annualRentPaid", Number(e.target.value))}
                value={taxData.annualRentPaid}
              />
            </div>

            <div>
              <label className="font-medium text-blue-600">
                Life Insurance Premiums
              </label>
              <input
                type="number"
                placeholder="0.00"
                className={inputStyle}
                onChange={(e) => handleInputChange("lifeInsurancePremiums", Number(e.target.value))}
                value={taxData.lifeInsurancePremiums}
              />
            </div>
          </div>
        </motion.section>

        {/* handle error messages */}
        {error && (
          <div
            className="rounded-2xl border border-red-200 bg-red-50 p-4 mb-6"
          >
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* CTA */}
        <motion.div variants={item}>
          <motion.button
            onClick={() => calculateTax(taxData)}
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-2xl bg-primary/90 py-4 text-white font-semibold shadow-xl shadow-blue-600/30 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Calculating your taxes..." : "See My Tax Break Down"}
          </motion.button>
        </motion.div>
      </motion.div>
    </main>
  );
}

 
export default Calculator;