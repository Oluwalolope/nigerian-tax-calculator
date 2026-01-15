import { motion } from "framer-motion";
import calculatorIcon from '../assets/calculator-icon.svg';
import chatbotIcon from '../assets/chatbot-icon.svg';
import padlockIcon from '../assets/padlock-icon.svg';
import shieldIcon from '../assets/shield-icon.svg';
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
    const navigate = useNavigate()
  return (
    <main className="bg-slate-50 min-h-screen px-4 py-12">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* HERO */}
        <motion.section
          variants={item}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-blue-600 leading-tight">
            Understand Your 2026 <br className="hidden sm:block" />
            Tax in Minutes
          </h1>

          <p className="mt-4 text-primary opacity-75 text-base md:text-lg">
            Calculate your tax obligations easily and accurately with Nigeria&apos;s
            2026 tax reforms. Get clarity, transparency, and confidence in your
            tax calculations.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/calculator')}
              className="flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-white font-medium shadow-lg shadow-blue-600/30 cursor-pointer"
            >
                <img src={calculatorIcon} alt="Calculator Icon" className="w-5 h-5" />
               Calculate My Tax
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/ai-assistant')}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-6 py-3 text-primary font-medium cursor-pointer"
            >
                <img src={chatbotIcon} alt="Chatbot Icon" className="w-5 h-5" />
              Ask the Tax Assistance
            </motion.button>
          </div>
        </motion.section>

        {/* FEATURES */}
        <motion.section
          variants={container}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          <motion.div
            variants={item}
            className="rounded-2xl border border-primary bg-white p-6 text-center text-primary"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/12 text-primary">
                <img src={padlockIcon} alt="Padlock Icon" className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">No Login Required</h3>
            <p className="mt-2 text-sm">
              Start calculating immediately without creating an account
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="rounded-2xl border border-primary bg-white p-6 text-center text-primary"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                <img src={shieldIcon} alt="Shield Icon" className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-lg">Anonymous Calculations</h3>
            <p className="mt-2 text-sm">
              Your data is never stored or shared. Complete privacy guaranteed
            </p>
          </motion.div>
        </motion.section>

        {/* CTA Section*/}
        <motion.section
          variants={item}
          className="mt-16 rounded-3xl bg-blue-100 px-6 py-10 text-center md:px-12"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-primary/90">
            Ready to Calculate Your Tax?
          </h2>

          <p className="mt-3 text-secondary/80">
            Get started in seconds. No signup, no hidden fees, just accurate tax
            calculations.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/calculator')}
            className="mt-6 rounded-xl bg-primary/90 px-8 py-4 text-white font-medium shadow-lg shadow-blue-600/30 cursor-pointer"
          >
            Start Calculating Now
          </motion.button>
        </motion.section>

        {/* DISCLAIMER */}
        <motion.footer
          variants={item}
          className="mt-12 text-center text-sm text-primary max-w-4xl mx-auto"
        >
          <p className="text-secondary/80">
            <strong className="text-primary/90">Disclaimer:</strong> This calculator provides estimates based
            on the 2026 Nigerian tax reforms. For official tax advice, please
            consult with a certified tax professional or the Federal Inland
            Revenue Service (FIRS).
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
}

export default Home;