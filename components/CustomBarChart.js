import { ComposedChart, Line, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';

//Rewriting tooltip function to show custom text
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="font-semibold label bg-[#24CCA7]">{`${formatCurrency(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export const CustomBarChart = ({ data, width, minWidth, minHeight }) => {
  return (
    <ResponsiveContainer width={width} minWidth={minWidth} minHeight={minHeight}>
      <ComposedChart
        data={data}
        margin={{
          top: 0,
          right: 10,
          bottom: 0,
          left: 10,
        }}
      >
        <XAxis dataKey="key" scale="band" />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" barSize={20} fill="#436BD7" />
        <Line type="monotone" dataKey="normalizedValue" stroke="#4A56E2" strokeWidth={5} dot={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
