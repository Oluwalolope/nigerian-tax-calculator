import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
};

const Result = () => {
  const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="mx-auto max-w-6xl"
      >
        {/* HEADER */}
        <motion.header variants={item} className="mb-8">
          <button
            onClick={() => navigate("/calculator")}
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
            Return to Calculator
          </button>

          <h1 className="text-3xl md:text-4xl font-bold text-primary/95">
            Your 2026 Tax Breakdown
          </h1>
          <p className="mt-2 text-primary/75">
            Based on Nigeria&apos;s 2026 tax reform regulations
          </p>
        </motion.header>

        {/* SUMMARY CARDS */}
        <motion.section
          variants={container}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {[
            { label: "Gross Income", value: "₦200,000" },
            { label: "Total Deductions", value: "₦55,000" },
            { label: "Tax Owed", value: "₦10,000" },
            { label: "Effective Tax Rate", value: "16%" },
          ].map((card) => (
            <motion.div
              key={card.label}
              variants={item}
              className="rounded-2xl border border-primary bg-white p-5"
            >
              <p className="text-sm text-primary font-medium">{card.label}</p>
              <p className="mt-2 text-2xl font-bold text-primary/90">
                {card.value}
              </p>
            </motion.div>
          ))}
        </motion.section>

        {/* CHARTS */}
        <motion.section
          variants={container}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10"
        >
          {/* Income Distribution */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-primary bg-white p-6"
          >
            <h3 className="font-semibold text-primary/95 mb-1">
              Income Distribution
            </h3>
            <p className="text-sm text-primary/75 mb-6">
              Tax Owed vs. After-Tax Income
            </p>

            {/* Donut Placeholder */}
            <div className="mx-auto h-48 w-48 rounded-full border-18 border-blue-600/20 relative">
              <div className="absolute inset-0 flex items-center justify-center text-primary/95 font-semibold">
                ₦10,500
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-6 text-sm">
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full text-primary/95" />
                After Tax Income
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full text-primary/75" />
                Tax Owed
              </span>
            </div>
          </motion.div>

          {/* Deductions Breakdown */}
          <motion.div
            variants={item}
            className="rounded-2xl border border-primary bg-white p-6"
          >
            <h3 className="font-semibold text-primary/95 mb-1">
              Deductions Breakdown
            </h3>
            <p className="text-sm text-primary/75 mb-6">
              How your deductions reduce taxable income
            </p>

            {/* Bar Placeholder */}
            <div className="flex items-end justify-center gap-10 h-48">
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-36 bg-blue-200 rounded-lg" />
                <span className="text-xs text-primary/75">₦42,200</span>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-28 bg-blue-600 rounded-lg" />
                <span className="text-xs text-primary/75">₦30,700</span>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* TAX FLOW */}
        <motion.section
          variants={item}
          className="rounded-2xl border border-primary bg-white p-6 mb-10"
        >
          <h3 className="font-semibold text-primary/95 mb-1">
            Tax Calculation Flow
          </h3>
          <p className="text-sm text-primary/75 mb-6">
            How we arrived at your tax amount
          </p>

          <div className="space-y-4">
            {[
              ["Gross Annual Income", "₦200,000", 'minus'],
              ["Total Deductions", "₦55,000", 'equals'],
              ["Taxable Income", "₦145,000", 'apply tax brackets'],
              ["Final Tax Amount", "₦10,500"],
            ].map(([label, value, operation]) => (
              <>
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl bg-blue-50 px-4 py-3 text-primary/95 font-medium"
                >
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
                {operation && <div key={label} className="flex flex-col items-center justify-center text-primary">
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
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                  <p>{operation}</p>
                </div>}
              </>
            ))}
          </div>
        </motion.section>

        {/* EXPORT */}
        <motion.section
          variants={item}
          className="rounded-2xl border border-primary bg-white p-6 mb-10"
        >
          <h3 className="font-semibold text-primary/95 mb-1">Export & Share</h3>
          <p className="text-sm text-primary/75 mb-6">
            Download or share your tax calculation
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 rounded-xl bg-primary/80 py-3 text-white font-medium shadow-md items-center justify-center flex gap-2 hover:bg-primary transition-colors duration-150 ease-in-out cursor-pointer">
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download PDF
            </button>
            <button className="flex-1 rounded-xl border border-primary bg-white py-3 text-primary font-medium items-center justify-center flex gap-2 cursor-pointer">
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
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download PNG
            </button>
            <button className="flex-1 rounded-xl border border-blue-200 py-3 text-primary/95 font-medium items-center justify-center flex gap-2 cursor-pointer">
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
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
              Share Result
            </button>
          </div>
        </motion.section>

        {/* DISCLAIMER */}
        <motion.footer
          variants={item}
          className="rounded-2xl bg-blue-100 p-6 text-sm text-secondary/75"
        >
          <strong>Important:</strong> This calculation is for illustrative
          purposes. Actual tax obligations may vary based on individual
          circumstances. Please consult a certified tax professional or the
          Federal Inland Revenue Service (FIRS) for official tax advice.
        </motion.footer>
      </motion.div>
    </main>
  );
};

export default Result;
