import React from "react";
import moment from "moment-jalaali";
import { styled } from "styled-components";

interface DateConverterProps {
  date: string;
  showSeparateDateTime?: boolean;
}

const StyleP = styled.p`
  margin-bottom: 0;
  font-size: 14px;
`;

const DateConverter: React.FC<DateConverterProps> = ({
  date,
  showSeparateDateTime = true,
}) => {
  // Convert to Jalaali calendar
  const jalaaliDate = moment(date).locale("fa");
  // Format the date and time
  const formattedDate = jalaaliDate.format("jYYYY/jMM/jDD");
  const formattedTime = jalaaliDate.format("HH:mm:ss");

  return (
    <div>
      {showSeparateDateTime ? (
        <div>
          <StyleP>
            {formattedTime} {formattedDate}{" "}
          </StyleP>
        </div>
      ) : (
        <StyleP>{formattedDate}</StyleP>
      )}
    </div>
  );
};

export default DateConverter;
