import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import DatePicker, { DatePickerProps } from "react-multi-date-picker";
import TextInput from "../TextFaild";
import { ReactComponent as DateIcon } from "@/assets/svg/date.svg";
import { ReactComponent as CloseIcon } from "@/assets/svg/close.svg";
import "./style.css";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
interface Props {
  onFocus: any;
  value: any;
  clearState: any;
}

function CustomMultipleInput({ onFocus, value, clearState }: Props) {
  return (
    <TextInput
      placeholder="تاریخ و زمان را انتخاب کنید"
      type="text"
      onFocus={onFocus}
      value={value}
      readOnly
      icon={
        <div>
          {value && <CloseIcon onClick={() => clearState()} />}
          <DateIcon onClick={onFocus} />
        </div>
      }
    />
  );
}

const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"];

interface DateProps extends DatePickerProps {
  value: Value | null;
  range?: boolean;
  onChange?: any;
  multiple?: boolean;
  minDate?: any;
  maxDate?: any;
  clearState?: any;
  label: string;
}

export default function Date({
  range,
  value,
  onChange,
  multiple,
  minDate,
  maxDate,
  clearState,
  label,
  ...rest
}: DateProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        flexDirection: "column",
      }}
    >
      <label
        style={{
          fontSize: "14px",
          fontWeight: "600",
          marginRight: "5px",
        }}
      >
        {label}
      </label>
      <DatePicker
        render={
          <CustomMultipleInput
            onFocus={onChange}
            value={value}
            clearState={clearState}
          />
        }
        format="YYYY/MM/DD HH:mm"
        plugins={[<TimePicker position="right" hideSeconds />]}
        calendar={persian}
        locale={persian_fa}
        weekDays={weekDays}
        value={value}
        calendarPosition="bottom"
        onChange={onChange}
        minDate={minDate}
        maxDate={maxDate}
        {...rest}
      />
    </div>
  );
}
