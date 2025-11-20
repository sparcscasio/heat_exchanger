// CustomNumberInput.tsx
import styled from "@emotion/styled";
import type { ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  max?: number;
}

const Input = styled.input`
  padding: 8px 12px;
  font-size: 16px;
  width: 100%;
  outline: none;
  border: none;
  alignment: center;
  text-align: center;
`;

export default function CustomNumberInput({
  value,
  onChange,
  placeholder,
  min,
  max,
}: Props) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;

    if (/^-?\d*\.?\d*$/.test(v)) {
      if (v === "." || v === "-" || v === "") {
        onChange(v);
        return;
      }
      const num = Number(v);
      if (!isNaN(num)) {
        if (min !== undefined && num < min) return;
        if (max !== undefined && num > max) return;
      }
      onChange(v);
    }
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      inputMode="decimal"
      style={{backgroundColor: '#ececec'}}
    />
  );
}
