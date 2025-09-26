import React from "react";
import Form from "react-bootstrap/Form";
import styled from "styled-components";

interface StyledCheckboxProps {
  checked: boolean;
  disabled?: boolean;
  type: "checkbox" | "radio";
}

const StyledCheckbox = styled(Form.Check)<StyledCheckboxProps>`
  input {
    position: relative;
    border: 1px solid #a0a0a0;
    background-color: ${({ checked, theme }) =>
      checked ? theme.palette.primary[900] : "transparent"} !important;
    padding: 10px;
    width: ${({ type }) => (type === "radio" ? "16px" : "24px")};
    height: ${({ type }) => (type === "radio" ? "16px" : "24px")};
    border-radius: 5px;
    box-shadow: none !important;
    &:hover {
      border-color: ${({ theme }) => theme.palette.primary[900]};
      box-shadow: 0px 0px 8px 0px rgba(172, 214, 236, 0.45);
    }
    &:focus-within {
      border-color: ${({ theme }) => theme.palette.primary[900]};
      background-color: ${({ checked, theme }) =>
        checked ? theme.palette.primary[900] : theme.palette.neutral[100]};
    }

    ${({ disabled, theme }) =>
      disabled &&
      `
            border-color: ${theme.palette.neutral[100]}
            color: ${theme.palette.neutral[100]}
            pointer-events: none;
        `}
  }
`;

interface CheckboxProps {
  label?: string;
  name?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  type?: "checkbox" | "radio";
  radioGroup?: string; // Provide a unique identifier for radio buttons in the same group
}

const Checkbox: React.FC<CheckboxProps> = ({
  type = "checkbox",
  label,
  name,
  checked,
  onChange,
  disabled,
  radioGroup,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // For radio buttons, call onChange only when the value changes
    if (type === "checkbox" || !checked) {
      onChange(event.target.checked);
    }
  };

  return (
    <StyledCheckbox
      type={type}
      label={label}
      checked={checked}
      onChange={handleCheckboxChange}
      disabled={disabled}
      name={radioGroup || name}
    />
  );
};

export default Checkbox;

/* 
    For Example : 
        const [checked, setChecked] = useState(false)
        const handleCheckboxChange = (checked: boolean) => {
            console.log('Checkbox checked state:', checked);
            setChecked(checked)
        };
        <Checkbox label="Check me" checked={checked} onChange={handleCheckboxChange} />
*/
