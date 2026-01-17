import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface DonutChartProps {
  taxOwed: number;
  afterTaxIncome: number;
}

const DonutChart = ({
  taxOwed,
  afterTaxIncome,
}: DonutChartProps) => {
  const data = [
    { name: "Tax Owed", value: taxOwed },
    { name: "After Tax Income", value: afterTaxIncome },
  ];

  const COLORS = ["#DBEAFE", "#2563EB"];

  return (
    <PieChart
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={100}
        paddingAngle={3}
        dataKey="value"
      >
        {data.map((_, index) => (
          <Cell key={index} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default DonutChart;
