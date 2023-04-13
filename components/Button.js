import { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const VARIANT_MAP = {
  bold: 'bg-primary-bold text-white hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none',
  subtle:
    'bg-primary-subtle text-primary-bold hover:bg-primary-subtle-darker active:bg-primary-subtle-darkest focus:ring-2 focus:ring-primary-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none',
  inverted:
    'bg-white text-primary-bold hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-white focus:ring-opacity-30 ring-offset-1 ring-offset-transparent outline-none',
  critical:
    'bg-critical-bold text-white hover:bg-opacity-90 active:bg-opacity-75 focus:ring-2 focus:ring-critical-bold focus:ring-opacity-30 ring-offset-1 ring-offset-transparent	outline-none',
};

export const Button = forwardRef(function Button(
  { as: Tag = 'button', variant = 'bold', block, children, loading, disabled: disabledProp, ...props },
  ref
) {
  const variantClasses = VARIANT_MAP[variant];
  const disabled = loading || disabledProp;
  return (
    <Tag
      ref={ref}
      disabled={Tag === 'button' ? disabled : undefined}
      className={`px-8 h-12 rounded-lg ${
        block ? 'w-full flex' : 'inline-flex'
      } items-center justify-center font-sans font-medium select-none ${variantClasses} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
      }`}
      {...props}
    >
      {loading ? <LoadingSpinner /> : children}
    </Tag>
  );
});
