import { InputText } from "primereact/inputtext";
import React from "react";

type Props = {
  htmlFor: string;
  label: string;
  id: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: React.FocusEventHandler<HTMLInputElement> | undefined;
  value: string | undefined;
  style?: React.CSSProperties | undefined;
};

const TextInput: React.FC<Props> = ({
  htmlFor,
  label,
  id,
  name,
  onChange,
  onBlur,
  value,
  style,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={label}>{htmlFor}</label>
      <InputText
        id={id}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        style={style}
      />
    </div>
  );
};

export default TextInput;
