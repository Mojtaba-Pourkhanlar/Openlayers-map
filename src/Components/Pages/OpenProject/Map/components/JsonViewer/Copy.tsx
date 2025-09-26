import { ReactComponent as CopyIcon } from "@/assets/svg/mapIcon/copy.svg";
import { ReactComponent as TickIcon } from "@/assets/svg/mapIcon/tick.svg";
import { openSnackbar } from "@/store/Actions/Root";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Copy as StyledCopy } from "../../../Style";

const Copy = ({ jsonData, show }: any) => {
  const [showTic, setShowTic] = useState(false);
  const dispatch = useDispatch();

  const handleCopy = () => {
    const textToCopy = JSON.stringify(jsonData ?? []);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setShowTic(true);
          dispatch(
            openSnackbar({
              message: `داده با موفقیت کپی شد`,
              type: "success",
            })
          );
        })
        .catch(() => setShowTic(false));
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          setShowTic(true);
          dispatch(
            openSnackbar({
              message: `داده با موفقیت کپی شد`,
              type: "success",
            })
          );
        }
      } catch (err) {
        setShowTic(false);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <StyledCopy $show={show}>
      <button>
        <span
          onClick={handleCopy}
          onMouseLeave={() => setShowTic(false)}
          title={showTic ? "Copied!" : "Copy"}
        >
          {showTic ? (
            <TickIcon style={{ width: "22px", height: "22px" }} />
          ) : (
            <CopyIcon style={{ width: "20px", height: "20px" }} />
          )}
        </span>
      </button>
    </StyledCopy>
  );
};

export default Copy;
