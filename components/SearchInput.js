export function SearchInput({ labelScreenReader, ...props }) {
  return (
    <div className="relative">
      <label htmlFor="search" className="absolute left-0 top-auto flex items-center justify-center w-12 h-12">
        {/* Search label (for screen readers only) */}
        <span className="sr-only">{labelScreenReader}</span>
        {/* Icon: search (outline) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            className="stroke-current text-neutral-muted"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
          />
        </svg>
      </label>

      {/* Search input */}
      <input
        id="search"
        type="search"
        className="w-full h-12 pr-3 text-base text-black bg-white border rounded-lg outline-none appearance-none pl-11 placeholder-neutral-muted border-neutral-dim-darker focus:border-primary-bold focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent"
        {...props}
      />
    </div>
  );
}
