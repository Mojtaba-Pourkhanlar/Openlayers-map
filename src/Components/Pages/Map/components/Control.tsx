// icon
import { ReactComponent as FullScreenIcon } from "@/assets/svg/full.svg";
import { ReactComponent as CurLocation } from "@/assets/svg/mapIcon/current-location.svg";
import { ReactComponent as RotateIcon } from "@/assets/svg/rotate.svg";
import { ReactComponent as ZoomOutIcon } from "@/assets/svg/zoomin.svg";
import { ReactComponent as ZoomInIcon } from "@/assets/svg/zoomout.svg";
// Styles
import { BoxIconMap, MapIconContainer, Plus } from "../../Style";
import { Map } from "ol";

interface Reusable {
  mapRef: React.RefObject<Map>;
  setFullScreen: (value: boolean) => void;
  fullScreen: boolean;
}
const Control = ({ fullScreen, setFullScreen, mapRef }: Reusable) => {
  const fake = false;
  const toggleFullScreen = () => {
    if (mapRef.current) {
      const mapElement = mapRef.current.getTargetElement();
      if (mapElement) {
        if (fullScreen) {
          document.exitFullscreen();
        } else {
          mapElement.requestFullscreen();
        }
        setFullScreen(!fullScreen);
      }
    }
  };

  const handleZoomIn = () => {
    if (mapRef.current) {
      const view = mapRef.current.getView();
      const currentZoom: number | undefined = view.getZoom();
      if (typeof currentZoom === "number") {
        view.setZoom(currentZoom + 1);
      }
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      const view = mapRef.current.getView();
      const currentZoom: number | undefined = view.getZoom();
      if (typeof currentZoom === "number") {
        view.setZoom(currentZoom - 1);
      }
    }
  };

  const handleRotate = () => {
    if (mapRef.current) {
      const view = mapRef.current.getView();
      const currentRotation = view.getRotation();
      view.setRotation(currentRotation + Math.PI / 2);
    }
  };

  return (
    <>
      <BoxIconMap>
        <MapIconContainer open={fullScreen} onClick={handleRotate}>
          <RotateIcon />
        </MapIconContainer>
        <MapIconContainer open={fake} onClick={handleZoomIn}>
          <ZoomInIcon />
          <Plus>+</Plus>
        </MapIconContainer>
        <MapIconContainer open={fake} onClick={handleZoomOut}>
          <ZoomOutIcon />
          <Plus>-</Plus>
        </MapIconContainer>
        <MapIconContainer open={fake} onClick={toggleFullScreen}>
          {fullScreen ? <FullScreenIcon /> : <CurLocation />}
        </MapIconContainer>
      </BoxIconMap>
    </>
  );
};

export { Control };
