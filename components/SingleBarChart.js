import { Bar, BarChart, Cell, ResponsiveContainer, XAxis } from 'recharts';

export const SingleBarChart = ({ data, width, height, left, right }) => {
  const barColors = ['#24CCA7', '#D96C6C'];

  return (
    <ResponsiveContainer height={height}>
      <BarChart
        width={width}
        data={data}
        margin={{
          top: 0,
          right,
          bottom: 0,
          left,
        }}
      >
        <XAxis
          dataKey="text"
          fontFamily="sans-serif"
          tickSize={0}
          fontSize={12}
          fontWeight={'bold'}
          interval={0}
          tick={{ fill: '#4A56E2' }}
          axisLine={false}
        />
        <defs>
          {barColors.map((color, index) => (
            <linearGradient
              key={`colorUv${index}`}
              id={`colorUv${index}`}
              x1="0"
              y1="0"
              x2="0"
              y2="100%"
              spreadMethod="reflect"
            >
              <stop offset="0" stopColor="#495ae0" />
              <stop offset="1" stopColor={color} />
            </linearGradient>
          ))}
        </defs>
        <Bar dataKey="avgData" barSize={25} radius={5} fontFamily="sans-serif">
          {data.map((entry, index) => (
            <Cell key={`colorUv${index}`} fill={`url(#colorUv${index})`} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
