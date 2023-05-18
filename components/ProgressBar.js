export const ProgressBar = ({ value }) => {
  return (
    <div className="relative w-full bg-white h-1.5">
      <div
        style={{ width: `${value}%` }}
        className={`absolute top-0 left-0 bottom-0 bg-gradient-to-r from-primary-bold to-primary-accent transition-all ${
          value === 100 ? 'rounded-none' : 'rounded-r'
        } `}
      />
    </div>
  );
};
