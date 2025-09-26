import React, { ReactNode, useEffect, useState, useRef } from "react";
import Typography from "../../Typography";
import {
  SelectButton,
  CustomSelect,
  DeleteIcon,
  DropdownList,
  DropdownItem,
  CloseIcon,
  DownIcon,
  LabelStyle,
} from "./Style";
import Box from "../../Box";

interface SelectProps {
  options: { value: string | number; label: ReactNode | number }[];
  onChange?: (value: any) => void;
  value?: string | number;
  label?: string; // Label displayed above the select
  placeholder?: string; // Placeholder shown when nothing is selected
  style?: React.CSSProperties;
  changedesign?: boolean;
  clear?: any;
  name?: boolean;
  setName?: string;
  notDefault?: boolean;
  dontClose?: boolean;
  chartStyle?: boolean;
  defaultOption?: {
    value: string | number;
    label: ReactNode | number | string;
  };
}

const Select: React.FC<SelectProps> = ({
  clear,
  name = false,
  changedesign = false,
  notDefault = false,
  dontClose = false,
  chartStyle = false,
  options,
  onChange,
  value,
  style,
  label = "",
  setName = "",
  placeholder = "انتخاب کنید", // Add placeholder prop
  defaultOption,
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    value || defaultOption?.label || ""
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item.label);
    setIsOpen(false);
    if (onChange) {
      onChange(item);
    }
  };

  const handleDeleteClick = () => {
    setSelectedItem("");
    if (clear !== undefined) {
      clear();
    }
  };

  const handleClickOutside = (event: Event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (notDefault === false) {
      if (!value && defaultOption) {
        setSelectedItem(defaultOption?.label || "");
        if (onChange) {
          onChange(defaultOption);
        }
      }
    } else {
      if (value === "") {
        setSelectedItem("");
      }
    }
  }, [notDefault, defaultOption, value, onChange]);

  useEffect(() => {
    if (value) {
      setSelectedItem(
        options.find((option) => option.value === value)?.label || ""
      );
    }
  }, [value, options]);

  return (
    <div style={{ display: "flex", flexDirection: "column", ...style }}>
      {label && <LabelStyle>{label}</LabelStyle>}
      <CustomSelect ref={dropdownRef} style={style}>
        <SelectButton
          onClick={() => setIsOpen(!isOpen)}
          hasvalue={selectedItem ? "true" : "false"}
          changedesign={changedesign.toString()}
          $chartStyle={chartStyle}
          {...rest}
        >
          {name ? `${setName}: ${selectedItem}` : selectedItem || placeholder}{" "}
          {!dontClose && selectedItem ? (
            <DeleteIcon onClick={handleDeleteClick}>
              <CloseIcon />
            </DeleteIcon>
          ) : (
            <div
              style={{
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 1 ease",
              }}
            >
              <DownIcon />
            </div>
          )}
        </SelectButton>
        <DropdownList isopen={isOpen.toString()}>
          {options.map((item, index) => (
            <DropdownItem key={index} onClick={() => handleItemClick(item)}>
              <Typography style={{ margin: 0 }}>{item.label}</Typography>
            </DropdownItem>
          ))}
        </DropdownList>
      </CustomSelect>
    </div>
  );
};

export default Select;
