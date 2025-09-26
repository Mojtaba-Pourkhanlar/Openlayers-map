import { BtnComponent } from "@/Components/Common/Core/Button";
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
import Typography from "@/Components/Common/Core/Typography";
import { headerItemName } from "@/Constants";
import { ReactComponent as Close } from "@/assets/svg/closeAll.svg";
import { clearTableHeader, getTableHeader } from "@/store/Actions/Map";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BoxCheckbox,
  BoxCheckboxChild,
  BoxClose,
  BoxContainer,
  BoxFooter,
  BoxHeader,
  BoxMain,
  BoxSelectAll,
  ModalContainerTable,
  TextHeader,
} from "./Style";
import { getTranslate } from "@/language";
import { useTheme } from "styled-components";
import { Modal } from "@/Components/Common/Core/Modal";
const columns: string[] = [
  "id_ray_db",
  "name_ray_db",
  "date_ray_db",
  "Easting",
  "Northing",
  "lat_ray_db",
  "lon_ray_db",
  "height_ray_db",
  "pdop_ray_db",
  "hrms_ray_db",
  "vrms_ray_db",
  "age_ray_db",
];

interface Props {
  headerItems: string[];
}

const TableSetting = ({ headerItems }: Props) => {
  const theme = useTheme().palette;
  const translate = getTranslate();
  const dispatch = useDispatch();
  const { modal } = useSelector((state: RootState) => state?.root);
  const { header } = useSelector((state: RootState) => state?.map);

  const [clickedItemsSec, setClickedItemsSec] = useState(
    {} as { [key: string]: boolean }
  );

  const test: string[] = header ?? columns;
  const [selectedItemsSec, setSelectedItemsSec] = useState(
    headerItems.reduce((acc, item) => {
      // Set specific items to true by default
      acc[item] = test.includes(item);
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const closeModalExport = () => {
    dispatch(closeModal());
  };

  const handleCheckboxChangeSec = (item: string) => {
    setSelectedItemsSec((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
    // Update the clicked items state
    setClickedItemsSec((prev) => {
      const updatedClickedItems = { ...prev };

      // If the item is not in the clickedItemsSec state, add it
      if (!updatedClickedItems.hasOwnProperty(item)) {
        updatedClickedItems[item] = true;
      } else {
        // If the item is already in the clickedItemsSec state, remove it
        delete updatedClickedItems[item];
      }
      return updatedClickedItems;
    });
  };

  // Use useEffect to update clickedItemsSec when default items are set to true
  useEffect(() => {
    setClickedItemsSec((prev) => {
      const updatedClickedItems = { ...prev };
      Object.keys(selectedItemsSec)
        .filter((item) => selectedItemsSec[item])
        .forEach((item) => {
          if (!updatedClickedItems.hasOwnProperty(item)) {
            updatedClickedItems[item] = true;
          }
        });
      return updatedClickedItems;
    });
  }, [selectedItemsSec]);

  const handleClick = () => {
    dispatch(getTableHeader(clickedItemsSec) as any);
    dispatch(closeModal());
  };

  const handleSelectAll = () => {
    setSelectedItemsSec((prev) => {
      const isAllSelected = Object.values(prev).every((value) => value);
      const updatedState = Object.fromEntries(
        Object.keys(prev).map((item) => [
          item,
          !isAllSelected || test.includes(item),
        ])
      );
      setClickedItemsSec(updatedState); // Update clicked items state as well
      return updatedState;
    });
    dispatch(clearTableHeader());
  };

  // useEffect to dispatch clearTableHeader after selectedItemsSec is updated
  useEffect(() => {
    dispatch(clearTableHeader());
  }, [selectedItemsSec]);

  const sections = [];
  const itemsPerSection = Math.ceil(headerItems.length / 3); // You can adjust the number of sections here
  for (let i = 0; i < headerItems.length; i += itemsPerSection) {
    sections.push(headerItems.slice(i, i + itemsPerSection));
  }

  return (
    <>
      <Modal
        onClose={() => closeModalExport()}
        show={modal.name === translate.tableSetting}
        title={translate.tableSetting}
        width={650}
      >
        <BoxContainer>
          <BoxSelectAll>
            <Checkbox
              label=""
              checked={Object.values(selectedItemsSec).every((value) => value)}
              onChange={handleSelectAll}
            />
            <Typography style={{ margin: "0 5px -7px", fontSize: "14px" }}>
              {translate.selectedAllItems}
            </Typography>
          </BoxSelectAll>
          <div
            style={{
              margin: "0",
              backgroundColor: "#9DA7B2",
              height: "1px",
              width: "96%",
            }}
          ></div>
          <BoxMain>
            {sections.map((section, index) => (
              <BoxCheckboxChild key={`section-${index}`}>
                {section.map((item) => (
                  <BoxCheckbox key={item} style={{ margin: "7px 0" }}>
                    <Checkbox
                      label=""
                      checked={selectedItemsSec[item]}
                      onChange={() => handleCheckboxChangeSec(item)}
                    />
                    <Typography style={{ margin: "0 5px", fontSize: "14px" }}>
                      {headerItemName(item.replace(/_ray_db$/, ""))}
                    </Typography>
                  </BoxCheckbox>
                ))}
              </BoxCheckboxChild>
            ))}
          </BoxMain>

          <BoxFooter>
            <BtnComponent
              variant="outline"
              label={translate.cancle}
              style={{
                color: theme.primary[900],
                border: `1px solid ${theme.primary[900]}`,
                backgroundColor: theme.neutral[0],
                width: "124px",
              }}
              onClick={handleClick}
            />
            <BtnComponent
              variant="contained"
              label={translate.action}
              style={{
                backgroundColor: theme.primary[900],
                color: theme.neutral[0],
                width: "124px",
              }}
              onClick={handleClick}
            />
          </BoxFooter>
        </BoxContainer>
      </Modal>
    </>
  );
};

export default TableSetting;
