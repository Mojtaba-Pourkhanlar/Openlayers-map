import { ReactComponent as Refresh } from "@/assets/images/icons/refresh.svg";
import Box from "@/Components/Common/Core/Box";
import ListGroup from "@/Components/Common/Core/Button/Custome";
import Tooltip from "@/Components/Common/Core/Tooltip/Basic";
import { getTranslate } from "@/language";
import { getEPSG, getMapGuid } from "@/store/Actions/Map";
import { openProject, projectName } from "@/store/Actions/Projects";
import { RootState } from "@/store/interfaces";
import { apiRequest } from "@/store/Middleware";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "./components/Card";
import { BoxList, CardGrid, SearchInput } from "./Style";

const ListProject = ({ listMode, searchParams, setSearchParams }: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const baseURL = import.meta.env.VITE_BASE_URL;
  const translate = getTranslate();
  const seaParams = new URLSearchParams(searchParams);
  const [search, setSearch] = useState("");
  const [pointName, setPointName] = useState("");
  const pageSize = 10;
  const [pageIndex, setPageIndex] = useState(1);
  const [dataLength, setDataLength] = useState(1);
  const [slots, setSlots] = useState<any | null>(null);

  const isFetching = useRef(false);
  const debounceTimeout: any = useRef(0);
  const [searchParamsS, setSearchParamsS] = useState({
    epsg: "",
    guid: "",
    name: "",
  });

  const { id, route, persistentRoute } = useSelector(
    (state: RootState) => state?.project
  );
  const transferStep = useSelector(
    (state: RootState) => state?.root.transferStep
  );
  const getData = async () => {
    const params = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      fileName: pointName ?? "",
    };
    const { response, error } = await apiRequest<any>(
      "get",
      `/api/v1/projectList`,
      null,
      {},
      params
    );
    if (response) {
      const sortedSlots = response?.data.list.sort(
        (a: { timeSlot: string }, b: { timeSlot: string }) =>
          new Date(a.timeSlot).getTime() - new Date(b.timeSlot).getTime()
      );
      setSlots((prevSlots: any) => [...(prevSlots || []), ...sortedSlots]);
      setDataLength(response?.data?.totalNumber);
    } else {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search) {
      setPointName(search);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!e.target.value) {
      setPointName("");
    }
  };
  const handleRefresh = () => {
    setPointName("");
    setSearch("");
  };

  useEffect(() => {
    if (transferStep === 2) {
      setSlots(null);
      setPageIndex(1);
      getData();
    } else {
      getData();
    }
  }, [pageIndex, transferStep]);

  const filteredData = slots?.filter((item: any) => {
    const searchText = search.toLowerCase();
    return item.name.toLowerCase().includes(searchText);
  });

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = event.currentTarget.scrollTop;
    const scrollHeight = event.currentTarget.scrollHeight;
    const clientHeight = event.currentTarget.clientHeight;

    const bottom = scrollHeight - scrollTop - clientHeight;
    if (bottom <= 20 && !isFetching.current) {
      if (debounceTimeout && debounceTimeout.current !== undefined) {
        clearTimeout(debounceTimeout.current);
      }
      if (debounceTimeout) {
        debounceTimeout.current = setTimeout(() => {
          if (pageIndex !== Math.ceil(dataLength / pageSize)) {
            isFetching.current = true;
            setPageIndex(pageIndex + 1);
            isFetching.current = false;
          }
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (route !== null && id) {
      if (!persistentRoute) {
        const params = new URLSearchParams();
        params.set("epsg", searchParamsS.epsg);
        params.set("guid", searchParamsS.guid);
        params.set("name", searchParamsS.name);
        navigate(
          `/admin/project/projectlist/${id}?${params.toString()}&tab=map`
        );
      }
    }
  }, [route, persistentRoute, id, navigate]);

  const refreshData = () => {
    setPageIndex(1);
    setSlots(null);
    if (pageIndex === 1) {
      getData();
    }
  };

  return (
    <Box style={{ marginTop: "20px" }}>
      <BoxList>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchInput
            onKeyDown={(e) => handleSearch(e)}
            type="text"
            placeholder={translate.searchProjectName}
            onChange={(e) => handleChange(e)}
            value={search}
            icon={
              pointName && (
                <Box style={{ margin: "0 0 0 8px" }}>
                  <Refresh onClick={() => handleRefresh()} />
                </Box>
              )
            }
          />
        </Box>
        <Box
          style={{
            margin: "-13px 10px 0 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Tooltip text={"بروزرسانی لیست"}>
            <div
              style={{
                background: "#DEEFF7",
                padding: "7px",
                borderRadius: "16px",
                margin: "0px 0 0 10px",
                cursor: "pointer",
              }}
              onClick={refreshData}
            >
              <Refresh />
            </div>
          </Tooltip>
          <ListGroup
            firstOnClick={() => {
              seaParams.set("mode", "table");
              setSearchParams(seaParams);
            }}
            defaultActive={2}
            secondOnClick={() => {
              seaParams.set("mode", "list");
              setSearchParams(seaParams);
            }}
          />
        </Box>
      </BoxList>

      <CardGrid onScroll={handleScroll}>
        {filteredData?.map((item: any, index: number) => {
          return (
            <Card
              key={index}
              image={item.guid}
              name={item.name}
              date={item.createdAt}
              updatedAt={item.updatedAt}
              owner={item.ownerName}
              isSync={item.isSync}
              modifiedBy={item.modifiedBy}
              boundingBox={item.BoundingBox}
              onClick={() => {
                setSearchParamsS({
                  epsg: item.epsg.toString(),
                  guid: item.guid.toString(),
                  name: item.name.toString(),
                });
                dispatch(getEPSG(item.epsg) as any);
                dispatch(openProject({ guid: item.guid }) as any);
                dispatch(projectName({ name: item.name, id: String(item.id) }));
                dispatch(getMapGuid(item.guid) as any);
              }}
            />
          );
        })}
      </CardGrid>
    </Box>
  );
};

export default ListProject;
