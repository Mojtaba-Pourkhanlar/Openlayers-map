// Openlayers
import TileLayer from "ol/layer/Tile";
import { BingMaps, OSM, StadiaMaps, TileJSON } from "ol/source";
// Core
import Box from "@/Components/Common/Core/Box";
// Icon
import { ReactComponent as Layers } from "@/assets/svg/layers.svg";
import SatelliteIcon from "@/assets/svg/mapIcon/Satellite.png";
import OSMIcon from "@/assets/svg/mapIcon/osm.png";
import outIcon from "@/assets/svg/mapIcon/out.png";
import streetIcon from "@/assets/svg/mapIcon/street.png";
// Styles
import {
  BoxOpen,
  BoxTextTile,
  BoxTile,
  BoxTileContainer,
  TileStyle,
} from "../../Style";
import { TileCache } from "ol";

interface TileProps {
  showLayers: boolean | string;
  selectedTileSource: boolean | string;
  setShowLayers: any;
  setSelectedTileSource: any;
}

const key = "IQaNlkGVlqmxEb5BApeA";
const bing = "AuTafsXa7N5ptqBoPMwlroAYjGUA-pGVFd3A07MpcRPVdrRWRnO7rew00gFx20DJ";

const MAX_CACHE_SIZE_MB = 3 * 1024 * 1024;
const tileCache = new TileCache(MAX_CACHE_SIZE_MB);
let cacheSize = 0;

function clearCacheManually(tileCache: any) {
  const keys = tileCache.getKeys();
  keys.forEach((key: string) => {
    tileCache.remove(key);
  });
  cacheSize = 0;
}

export function customTileLoadFunction(imageTile: any, src: string) {
  const img = imageTile.getImage();

  img.onload = () => {
    const imgSize = img.naturalHeight * img.naturalWidth * 4;
    if (!tileCache.containsKey(src)) {
      tileCache.set(src, img);
      cacheSize += imgSize;
    } else {
    }
    if (cacheSize > MAX_CACHE_SIZE_MB) {
      clearCacheManually(tileCache);
    }
  };

  img.src = src;
}
// url: "http://192.168.23.38:8080/data/openmaptiles/{z}/{x}/{y}.pbf",

const tileSources: any = {
  streets: new TileLayer({
    source: new OSM({
      tileLoadFunction: customTileLoadFunction,
    }),
  }),
  satellite: new TileLayer({
    source: new TileJSON({
      url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=${key}`, // source URL
      tileSize: 512,
      crossOrigin: "anonymous",
      tileLoadFunction: customTileLoadFunction,
    }),
  }),
  bing: new TileLayer({
    preload: Infinity,
    source: new BingMaps({
      key: bing,
      imagerySet: "AerialWithLabelsOnDemand",
      tileLoadFunction: customTileLoadFunction,
    }),
  }),
  // dark: new TileLayer({
  //   source: new StadiaMaps({
  //     layer: "alidade_smooth_dark",
  //     retina: true,
  //     tileLoadFunction: customTileLoadFunction,
  //   }),
  // }),
};

const ChangeTiles = ({
  selectedTileSource,
  setSelectedTileSource,
  setShowLayers,
  showLayers,
}: TileProps) => {
  return (
    <TileStyle>
      <BoxTile $show={Boolean(showLayers)}>
        <BoxOpen onClick={() => setShowLayers(!showLayers)}>
          <Layers />
        </BoxOpen>
        <BoxTextTile $show={Boolean(showLayers)}>
          <Box onClick={() => setSelectedTileSource("satellite")}>
            <BoxTileContainer $active={selectedTileSource === "satellite"}>
              <img src={SatelliteIcon} alt="Satellite Icon " />
              <p>Satellite</p>
            </BoxTileContainer>
          </Box>
          <Box onClick={() => setSelectedTileSource("bing")}>
            <BoxTileContainer $active={selectedTileSource === "bing"}>
              <img src={outIcon} alt="outIcon Icon " />
              <p>Bing</p>
            </BoxTileContainer>
          </Box>
          <Box onClick={() => setSelectedTileSource("streets")}>
            <BoxTileContainer $active={selectedTileSource === "streets"}>
              <img src={streetIcon} alt="streetIcon Icon " />
              <p>Light</p>
            </BoxTileContainer>
          </Box>
          {/* <Box onClick={() => setSelectedTileSource("dark")}>
            <BoxTileContainer $active={selectedTileSource === "dark"}>
              <img src={OSMIcon} alt="OSMIcon Icon " />
              <p>Dark</p>
            </BoxTileContainer>
          </Box> */}
        </BoxTextTile>
      </BoxTile>
    </TileStyle>
  );
};

export { ChangeTiles, tileSources };
