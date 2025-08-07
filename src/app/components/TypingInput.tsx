import React, { useRef, useEffect } from "react";

interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  target?: string;
}

export default function TypingInput({
  value,
  onChange,
  disabled,
  placeholder,
  target = "",
}: TypingInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled, value]);

  const renderHighlight = () => {
    const chars = target.slice(0, value.length).split(""); // tylko wpisane litery
    return chars.map((char, i) => {
      const typedChar = value[i];
      let color = "gray";

      if (typedChar == null) {
        color = "gray"; // jeszcze nie napisane (w tym przypadku raczej nie wystąpi)
      } else if (typedChar === char) {
        color = "black"; // dobrze napisane
      } else {
        color = "red"; // błąd
      }

      return (
        <span
          key={i}
          style={{
            color,
            whiteSpace: "pre-wrap",
          }}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        fontFamily: "monospace",
        fontSize: "1.25rem",
      }}
    >
      {/* Overlay z kolorowym tekstem */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "pre-wrap",
          padding: "8px 12px",
          border: "1px solid gray",
          width: "100%",
          minHeight: "2rem",
          boxSizing: "border-box",
          color: "black",
          overflowWrap: "break-word",
        }}
      >
        {renderHighlight()}
        <span style={{ color: "gray" }}>{target.slice(value.length)}</span>
      </div>

      {/* Niewidoczny input z caret */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        style={{
          position: "relative",
          background: "transparent",
          color: "transparent",
          caretColor: "black",
          width: "100%",
          fontFamily: "monospace",
          fontSize: "1.25rem",
          border: "1px solid gray",
          padding: "8px 12px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
