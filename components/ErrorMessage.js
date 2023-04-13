export function ErrorMessage({ message }) {
  return (
    <div role="alert" className="flex p-3 border-2 rounded-lg bg-critical-subtle border-critical-bold space-x-3">
      {/* Icon: exclamation-circle (solid) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 w-6 h-6 text-critical-bold"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
}
