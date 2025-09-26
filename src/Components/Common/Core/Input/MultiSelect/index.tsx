import { ReactComponent as Close } from "@/assets/svg/close.svg";
import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import {
  SelectInput,
  StyledCheckboxContainer,
  StyledShow,
  StyledShowContainer,
  StyledShowTitle,
} from "./style";
import { useTheme } from "styled-components";

interface Option {
  title: string;
  year: number;
}
interface MultiSelectProps {
  options: Option[];
  label: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, label }) => {
  const theme = useTheme().palette;
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [, setNameList] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleCheckboxChange = (option: Option) => {
    const currentIndex = selectedOptions.findIndex(
      (o) => o.title === option.title
    );
    const newSelectedOptions = [...selectedOptions];

    if (currentIndex === -1) {
      newSelectedOptions.push(option);
    } else {
      newSelectedOptions.splice(currentIndex, 1);
    }
    setSelectedOptions(newSelectedOptions);
  };

  const handleRemoveItem = (removedOption: Option) => {
    const updatedOptions = selectedOptions.filter(
      (option) => option.title !== removedOption.title
    );
    setSelectedOptions(updatedOptions);
  };

  useEffect(() => {
    const list = selectedOptions.map((option) => option.title);
    setNameList(list);
  }, [selectedOptions]);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Close DropDown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".dropdown-menu")
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  // handle show text in the input
  const renderSelectedItems = () => {
    if (selectedOptions.length === 1 || selectedOptions.length === 2) {
      return (
        <StyledShow>
          {selectedOptions.map((option, index) => (
            <StyledShowContainer key={index}>
              <StyledShowTitle>{option.title}</StyledShowTitle>
              <Close
                style={{
                  cursor: "pointer",
                  fill: `${theme.neutral[0]} !important`,
                  width: "25px",
                  padding: "0px 0 0 5px",
                }}
                onClick={() => {
                  handleRemoveItem(option);
                }}
              />
            </StyledShowContainer>
          ))}
        </StyledShow>
      );
    } else if (selectedOptions.length > 2) {
      return (
        <StyledShow>
          {selectedOptions.slice(0, 2).map((option, index) => (
            <StyledShowContainer key={index}>
              <StyledShowTitle>{option.title}</StyledShowTitle>
              <Close
                onClick={() => {
                  handleRemoveItem(option);
                }}
                style={{
                  cursor: "pointer",
                  fill: `${theme.neutral[0]} !important`,
                  width: "25px",
                  padding: "0px 0 0 5px",
                }}
              />
            </StyledShowContainer>
          ))}
          <p>{`... ${selectedOptions.length}`}</p>
        </StyledShow>
      );
    }
    return null;
  };

  console.log("selectedOptions", selectedOptions);

  return (
    <>
      <SelectInput ref={dropdownRef} onClick={handleToggleDropdown}>
        <p style={{ padding: "0 10px 0 0", margin: "0", color: "#212121" }}>
          {selectedOptions.length === 0 ? label : renderSelectedItems()}
        </p>
      </SelectInput>
      <Dropdown show={showDropdown}>
        <Dropdown.Menu
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: "24px",
            marginTop: "10px",
            scrollbarWidth: "none",
            padding: "0",
          }}
        >
          {options.map((option, index) => (
            <Dropdown.Item
              key={index}
              style={{ padding: "0", margin: "2px 0" }}
            >
              <StyledCheckboxContainer>
                <Form.Check
                  type="checkbox"
                  id={option.title}
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                />
                <p style={{ margin: "0", padding: "0 10px" }}>{option.title}</p>
              </StyledCheckboxContainer>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default MultiSelect;

/* 
  const top100Films = [
    { title: 'رستگاری در شا..', year: 1994 },
    { title: 'گادفادر', year: 1972 },
    { title: 'گادفادر گارت دوم', year: 1974 },
    { title: 'اونجرز', year: 2008 },
    { title: 'اونجرز_1', year: 2009 },
    { title: 'اونجرز_2', year: 2010 },
    { title: 'اونجرز_3', year: 2011 },
    { title: 'اونجرز_4', year: 2012 },
  ];

      <div style={{ width: "300px" }}>
        <MultiSelect options={top100Films} label="لیست دستگاه ها" />
      </div>

*/
