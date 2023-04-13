export function TextField({ id, label, type = 'text', error, ...props }) {
  return (
    <div className="relative ">
      <input
        type={type}
        className={`appearance-none rounded h-[4rem] w-full px-3 pt-5 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600 bg-primary-input-accent text-primary-bold font-Inter font-bold`}
        id={id}
        {...props}
      />
      <label htmlFor={id} className="absolute left-0 pt-2 pl-3 mb-0 text-xs text-gray-400 label leading-tighter text-primary-bold font-Inter">
        {label}
      </label>
      {error && <span className="block text-sm text-critical-bold-darker">{error}</span>}
    </div>
  );
}
