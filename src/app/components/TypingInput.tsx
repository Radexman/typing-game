export default function TypingInput({
  value,
  onChange,
  disabled,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (val: string) => void;
  disabled: boolean;
  placeholder: string;
  autoFocus: boolean;
}) {
  return (
    <input
      type="text"
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mb-6 w-full border p-2"
      autoFocus={autoFocus}
    />
  );
}
