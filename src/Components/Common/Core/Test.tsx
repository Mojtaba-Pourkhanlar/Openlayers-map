import { apiRequest } from "@/store/Middleware";
import { BtnComponent } from "./Button";

const Test = () => {
  const newApi = async (event: any) => {
    const selected_file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selected_file);
    const { response } = await apiRequest(
      "POST",
      "/api/v1/syncProject",
      formData
    );
    console.log("file response", response);
  };

  const selectFile = () => {
    const fileInput = document.getElementById("filedemo");

    if (fileInput) {
      fileInput.click();
    } else {
      console.error("Element with id 'filedemo' not found");
    }
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        id="filedemo"
        type="file"
        onChange={newApi}
      />

      <BtnComponent
        label="بارگذاری فایل"
        variant="contained"
        onClick={selectFile}
        style={{ background: "#DEEFF7", color: "#0B233F" }}
      />
    </div>
  );
};

export default Test;
