import { BtnComponent } from "@/Components/Common/Core/Button";
import moment from "moment-jalaali";

interface Props {
  tableHeader: string[];
  tableData: any[] | undefined;
  nameFile: string;
  formatFile: string;
  wordSeparator: string;
  disable: boolean;
  titr: boolean;
}

const formatDate = (date: string) => {
  const solarDate = moment(date).locale("fa").format("jYYYY/jMM/jDD HH:mm:ss");
  return solarDate;
};

const Excle = ({
  titr = false,
  tableData,
  tableHeader,
  nameFile,
  formatFile,
  wordSeparator = ",",
  disable,
}: Props) => {
  const convertDataForExport = () => {
    if (!tableData) {
      return [];
    }
    const convertedTableData = tableData.map((item, index) => {
      const convertedDate = formatDate(item.date);
      const { id, ...rest } = item;
      return { ...rest, number: index + 1, date: convertedDate };
    });
    return convertedTableData;
  };
  const handleExport = () => {
    // Prepare data for export
    const convertedTableData = convertDataForExport();
    const tData = convertedTableData
      .map((item) => Object.values(item).join(wordSeparator))
      .join("\n");
    const data = !titr
      ? `${tData}`
      : `${tableHeader.join(wordSeparator)}\n${tData}`;

    // Format today's date using moment
    const todayDate = moment().locale("fa").format("jYYYY/jMM/jDD");

    // Append today's date to the file name
    const fileNameWithDate = `${nameFile}_${todayDate}.${formatFile}`;

    // Create a Blob and trigger the download
    const blob = new Blob([data], { type: `text / ${formatFile} ` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileNameWithDate;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <BtnComponent
        disabled={disable}
        onClick={() => handleExport()}
        label="دانلود"
        variant="contained"
        style={{ backgroundColor: "#0B233F", color: "#fff", width: "124px" }}
      />
    </>
  );
};

export default Excle;
