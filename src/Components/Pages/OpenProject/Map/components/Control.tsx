// icon
import { ReactComponent as FullScreenIcon } from "@/assets/svg/full.svg";
import { ReactComponent as RotateIcon } from "@/assets/svg/rotate.svg";
import { ReactComponent as ZoomOutIcon } from "@/assets/svg/zoomin.svg";
import { ReactComponent as ZoomInIcon } from "@/assets/svg/zoomout.svg";
// Styles
import { BoxIconMap, MapIconContainer, Plus } from "../../Style";

interface Reusable {
  map?: any;
  setFullScreen: any;
  fullScreen: boolean;
}
const Control = ({ fullScreen, setFullScreen, map }: Reusable) => {
  const fake = false;
  const toggleFullScreen = () => {
    if (map) {
      const mapElement = map.getTargetElement();
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
    if (map) {
      const view = map.getView();
      const currentZoom: number | undefined = view.getZoom();
      if (typeof currentZoom === "number") {
        view.setZoom(currentZoom + 1);
      }
    }
  };

  const handleZoomOut = () => {
    if (map) {
      const view = map.getView();
      const currentZoom: number | undefined = view.getZoom();
      if (typeof currentZoom === "number") {
        view.setZoom(currentZoom - 1);
      }
    }
  };

  const handleRotate = () => {
    if (map) {
      const view = map.getView();
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
          <FullScreenIcon />
        </MapIconContainer>
      </BoxIconMap>
    </>
  );
};

export { Control };
