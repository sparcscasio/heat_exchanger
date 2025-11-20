import React, { type ChangeEvent } from "react";

interface CustomDateInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const CustomDateInput: React.FC<CustomDateInputProps> = ({
  value,
  onChange,
  label,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 4,
      width: "100%"
    }}>
      {label && <label style={{ fontSize: 14 }}>{label}</label>}
      
      <input
        type="date"
        value={value}
        onChange={handleChange}
        style={{
          height: 35,
          fontSize: 14,
          outline: "none",
          border: "none"
        }}
      />
    </div>
  );
};

export default CustomDateInput;
