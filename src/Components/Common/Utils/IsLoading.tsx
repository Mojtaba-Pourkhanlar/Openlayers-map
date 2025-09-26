import { RootState } from "@/store/interfaces";
import { useSelector } from "react-redux";

const IsLoading = () => {
  const { isLoading } = useSelector((state: RootState) => state.root);
  return (
    <div>
      {isLoading && (
        <div className="loaderContainer">
          <div className="loaderChaild">
            <div className="loaderApp"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IsLoading;
