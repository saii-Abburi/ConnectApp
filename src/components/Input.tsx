import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  className,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label
        className={twMerge(
          'absolute left-3 transition-all duration-200',
          (isFocused || props.value) 
            ? '-top-2 text-xs text-accent bg-white px-2' 
            : 'top-1/2 -translate-y-1/2 text-gray-500'
        )}
      >
        {label}
      </label>
      <input
        ref={ref}
        className={twMerge(
          'w-full px-4 py-3 border-2 rounded-lg transition-all duration-200',
          'focus:outline-none focus:border-accent',
          error ? 'border-red-500' : 'border-neutral',
          'hover:border-gray-400',
          className
        )}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 