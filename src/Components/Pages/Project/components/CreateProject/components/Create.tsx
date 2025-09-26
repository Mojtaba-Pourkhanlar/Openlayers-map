import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
import Typography from "@/Components/Common/Core/Typography";
import { utmDataCustom } from "@/Constants";
import { getTranslate } from "@/language";
import { createProject } from "@/store/Actions/Projects";
import { clearIsRefresh, closeModal, openSnackbar } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "styled-components";
import { locationTime, system } from "../../constants";
import {
  BoxCheckbox,
  BoxInput,
  BoxMain,
  BoxRadio,
  BoxSelectAndInput,
  CheckboxC,
  CheckboxRadio,
  FileName,
  Radio,
  RadioText,
  SelectStyle,
  SelectStyleSec,
  Submit,
  TextAria,
  TextState,
} from "../../modal/Style";

const Create = () => {
  const theme = useTheme().palette;
  const translate = getTranslate();
  const dispatch = useDispatch();
  // Input
  const [desc, setDesc] = useState<string>("");
  // Select
  const [location, setLocation] = useState<any>(null);
  const [formData, setFormData] = useState({
    fileName: "",
    desc: "",
    synced: true,
    cadastre: false,
    parametric: false,
    location: "Default(UTC & Local)",
    utm: "UTM39N",
  });

  const { getProject } = useSelector((state: RootState) => state?.root);

  useEffect(() => {
    if (!location) {
      setLocation("Default(UTC & Local)");
    }
  }, [location]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  }, []);

  const handleSelectChange = useCallback(
    (name: string, value: string | boolean) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const deleteHandler = useCallback(() => {
    const isNameExists = getProject?.some((item) => item === formData.fileName);
    if (isNameExists) {
      dispatch(
        openSnackbar({
          duration: 2000,
          message: translate.projectDuplicate,
          type: "error",
        })
      );
    } else {
      const selectedUTM = utmDataCustom.find(
        (item) => item.utm === formData.utm
      );
      const projectData = {
        name: formData.fileName,
        referenceRayDB: selectedUTM?.code,
        enableTransformation: false,
        isCadastre: false,
        projectTimezone: formData.location,
        description: formData.desc,
        isSync: true,
        // enableTransformation: formData.parametric,
        // isCadastre: formData.cadastre,
        // isSync: formData.synced,
      };
      dispatch(createProject(projectData) as any);
    }
  }, [formData, getProject, dispatch, translate]);

  const closeModalHandler = useCallback(() => {
    dispatch(closeModal());
    dispatch(clearIsRefresh());
  }, [dispatch]);

  return (
    <>
      <BoxMain>
        <BoxSelectAndInput>
          <BoxInput>
            <p>{translate.fileName}</p>
            <FileName
              placeholder={"نام پروژه را وارد کنید"}
              type="text"
              value={formData.fileName}
              name="fileName"
              onChange={handleInputChange}
            />
          </BoxInput>

          <SelectStyleSec
            label={translate.timeZone}
            options={locationTime}
            value={formData.location}
            onChange={(option) => handleSelectChange("location", option.value)}
            changedesign={true}
            defaultOption={locationTime[0]}
            dontClose
          />
          <SelectStyle
            label={translate.coordinateSystem}
            // options={[...utmOptionsNorthern, ...utmOptionsSouthern]}
            options={system}
            value={formData.utm}
            onChange={(option) => handleSelectChange("utm", option.value)}
            changedesign={true}
            defaultOption={system[1]}
            dontClose
          />
        </BoxSelectAndInput>

        <TextAria
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={translate.projectDecs}
        ></TextAria>
      </BoxMain>
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "35px 0 5px",
        }}
      >
        <BtnComponent
          onClick={() => closeModalHandler()}
          label={translate.comingBack}
          variant="text"
          style={{ color: theme.primary[900], width: "124px" }}
        />
        <Submit
          onClick={() => deleteHandler()}
          label={translate.submit}
          disabled={!formData.fileName}
          variant="contained"
        />
      </Box>
    </>
  );
};

export default Create;
{
  /* <BoxRadio>
            <TextState>{translate.statusProject}</TextState>
            <Radio>
              <CheckboxRadio
                radioGroup="mojio"
                label=""
                type="radio"
                checked={formData.synced}
                onChange={() => handleSelectChange("synced", true)}
              />
              <RadioText>چند کاربره</RadioText>
            </Radio>
            <Radio>
              <CheckboxRadio
                radioGroup="mojio"
                label=""
                type="radio"
                checked={!formData.synced}
                onChange={() => handleSelectChange("synced", false)}
              />
              <RadioText>تک کاربره</RadioText>
            </Radio>
          </BoxRadio> */
}
{
  /* <BoxCheckbox>
          <CheckboxC>
            <Checkbox
              label=""
              name="cadastre"
              checked={formData.cadastre}
              onChange={(checked) => handleCheckboxChange("cadastre", checked)}
            />
            <Typography style={{ margin: "0 5px" }}>
              {translate.cadastreProject}
            </Typography>
          </CheckboxC>
          <CheckboxC>
            <Checkbox
              label=""
              name="parametric"
              checked={formData.parametric}
              onChange={(checked) =>
                handleCheckboxChange("parametric", checked)
              }
            />
            <Typography style={{ margin: "0 5px" }}>
              {translate.parameterTransformation}
            </Typography>
          </CheckboxC>
        </BoxCheckbox> */
}
