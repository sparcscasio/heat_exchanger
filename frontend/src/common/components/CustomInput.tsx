import styled from "@emotion/styled";
import { useState, type ChangeEvent } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  errormessage?: string;
  errorfunction?: (value: string) => boolean;
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

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  text-align: right;
  width: 100%;
`;

export default function CustomInput({
  value,
  onChange,
  placeholder,
  errormessage,
  errorfunction,
}: Props) {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    onChange(v);
  };

  const handleBlur = () => {
    if (errorfunction) {
      setError(errorfunction(value));
    }
  };

  return (
    <div style={{flex: 1}}>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        onBlur={handleBlur}
        style={{boxSizing: 'border-box', border: error ? '0.5px solid red' : 'none', backgroundColor: '#ececec'}}
      />
      {error && errormessage && <ErrorMessage>{errormessage}</ErrorMessage>}
    </div>
  );
}
