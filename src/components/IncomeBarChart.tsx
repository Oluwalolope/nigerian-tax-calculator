import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface IncomeBarChartProps {
  grossIncome: number;
  taxableIncome: number;
  afterTaxIncome: number;
}

const IncomeBarChart = ({ grossIncome, taxableIncome, afterTaxIncome }: IncomeBarChartProps) => {
  const data = [
    { name: "Gross Income", income: grossIncome },
    { name: "Taxable Income", income: taxableIncome },
    { name: "After Tax Income", income: afterTaxIncome },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="income" fill="#1653FF" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default IncomeBarChart;
