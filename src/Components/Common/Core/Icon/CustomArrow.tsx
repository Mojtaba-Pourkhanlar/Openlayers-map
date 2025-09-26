interface Props {
  isDisabled?: boolean;
  onClick: () => void;
}

const RightArrow = ({ onClick, isDisabled }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      style={{ cursor: "pointer" }}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={() => !isDisabled && onClick()}
    >
      <path
        d="M15.7049 7.41L14.2949 6L8.29492 12L14.2949 18L15.7049 16.59L11.1249 12L15.7049 7.41Z"
        fill={isDisabled ? "#878787" : "#0E0E0F"}
      />
    </svg>
  );
};
const LeftArrow = ({ onClick, isDisabled }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      style={{ cursor: "pointer" }}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={() => !isDisabled && onClick()}
    >
      <path
        d="M9.70492 6L8.29492 7.41L12.8749 12L8.29492 16.59L9.70492 18L15.7049 12L9.70492 6Z"
        fill={isDisabled ? "#878787" : "#0E0E0F"}
      />
    </svg>
  );
};
const DoubleLeftArrow = ({ onClick, isDisabled }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      style={{ cursor: "pointer" }}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={() => !isDisabled && onClick()}
    >
      <path
        d="M5.7051 6.70978C5.3151 7.09978 5.3151 7.72978 5.7051 8.11978L9.5851 11.9998L5.7051 15.8798C5.3151 16.2698 5.3151 16.8998 5.7051 17.2898C6.0951 17.6798 6.7251 17.6798 7.1151 17.2898L11.7051 12.6998C12.0951 12.3098 12.0951 11.6798 11.7051 11.2898L7.1251 6.70978C6.7351 6.31978 6.0951 6.31978 5.7051 6.70978Z"
        fill={isDisabled ? "#878787" : "#101112"}
      />
      <path
        d="M12.2951 6.70978C11.9051 7.09978 11.9051 7.72978 12.2951 8.11978L16.1751 11.9998L12.2951 15.8798C11.9051 16.2698 11.9051 16.8998 12.2951 17.2898C12.6851 17.6798 13.3151 17.6798 13.7051 17.2898L18.2951 12.6998C18.6851 12.3098 18.6851 11.6798 18.2951 11.2898L13.7051 6.69978C13.3251 6.31978 12.6851 6.31978 12.2951 6.70978Z"
        fill={isDisabled ? "#878787" : "#101112"}
      />
    </svg>
  );
};
const DoubleRightArrow = ({ onClick, isDisabled }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      style={{ cursor: "pointer" }}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      onClick={() => !isDisabled && onClick()}
    >
      <path
        d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6L11.59 12L17.59 18Z"
        fill={isDisabled ? "#878787" : "#101112"}
      />
      <path
        d="M11 18L12.41 16.59L7.83 12L12.41 7.41L11 6L5 12L11 18Z"
        fill={isDisabled ? "#878787" : "#101112"}
      />
    </svg>
  );
};
export { RightArrow, LeftArrow, DoubleLeftArrow, DoubleRightArrow };
