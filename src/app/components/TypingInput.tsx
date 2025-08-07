import React from "react";

const TypingInput = React.forwardRef<
  HTMLInputElement,
  {
    value: string;
    onChange: (val: string) => void;
    disabled: boolean;
    placeholder: string;
    autoFocus: boolean;
  }
>((props, ref) => {
  return (
    <input
      ref={ref}
      type="text"
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      className="mb-6 w-full rounded-md border border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
      autoFocus={props.autoFocus}
    />
  );
});

TypingInput.displayName = "TypingInput";

export default TypingInput;
