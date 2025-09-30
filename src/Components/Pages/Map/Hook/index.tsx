import { MutableRefObject, useMemo } from "react";
// Openlayers
import { Feature, Map, View } from "ol";
import { ScaleLine, defaults as defaultControls } from "ol/control";
import { applyTransform, createEmpty, extend, getCenter } from "ol/extent";
import {
  Circle as CircleGeom,
  LineString,
  Polygon as OLPolygon,
  Point as PointGeom,
} from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import {
  fromLonLat,
  get as getProjection,
  getTransform,
  transform,
} from "ol/proj";
import VectorSource from "ol/source/Vector";
import { getArea, getLength } from "ol/sphere.js";
// Proj4
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
// Interfaces
import {
  DrawerDataItem,
  HandleMapClickProps,
  InitialMApProps,
  PropRectangle,
} from "@/Interfaces";
// Icons
import locInit from "@/assets/png/pointPNG1.png";
import { ReactComponent as Circle } from "@/assets/svg/circle.svg";
import { ReactComponent as Cursor } from "@/assets/svg/cursor.svg";
import { ReactComponent as Line } from "@/assets/svg/line.svg";
import { ReactComponent as Point } from "@/assets/svg/point.svg";
import { ReactComponent as Polygon } from "@/assets/svg/polygon.svg";
// redux
import { clearDrawnFeatures, getDrawnFeatures } from "@/store/Actions/Map";
// Styles
import { closeModal } from "@/store/Actions/Root";
import "ol/ol.css";
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  RegularShape,
  Stroke,
  Style,
  Text,
} from "ol/style";

import { getLength as getSphereLength } from "ol/sphere";
import { circleStyleD, defaultStyle, pointStyle } from "../../Style";
import { tileSources } from "../components/Tiles";
import { handleDeleteSelectedFeatureProps, modifyEndProps } from "./interface";
import "./styleTest.css";

export const labelStyleMeasure: any = new Style({
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    backgroundFill: new Fill({
      color: "#e4d233",
    }),
    padding: [3, 3, 3, 3],
    textBaseline: "bottom",
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: "#e4d233",
    }),
  }),
});
export const modifyStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
  }),
  text: new Text({
    text: "Drag to modify",
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [2, 2, 2, 2],
    textAlign: "left",
    offsetX: 15,
  }),
});

export const formatLengthNew = function ({
  line,
  utm,
}: {
  line: any;
  utm: string;
}) {
  const length = getSphereLength(line, { projection: utm });
  let output;
  if (length > 1000) {
    output = Math.round((length / 1000) * 100) / 100 + " km";
  } else {
    output = Math.round(length * 100) / 100 + " m";
  }
  return output;
};

const DEFAULT_RADIUS_PX = 50;
function makeOffsetGeometryFunction(
  map: any,
  index: number,
  total: number,
  center: [number, number],
  radiusPx: number = DEFAULT_RADIUS_PX
) {
  return (_feat: any) => {
    const res = map.getView().getResolution();
    const radius = radiusPx * res;
    const angleStep = (2 * Math.PI) / total;
    const angle = index * angleStep;
    const dx = radius * Math.cos(angle);
    const dy = radius * Math.sin(angle);
    return new PointGeom([center[0] + dx, center[1] + dy]);
  };
}

const highlightedStyleFactory = (pointName: string): Style => {
  return new Style({
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: "#FFB020" }),
      stroke: new Stroke({ color: "black", width: 1 }),
    }),
    text: new Text({
      text: pointName,
      offsetY: 15,
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 3 }),
    }),
    stroke: new Stroke({ color: "#FFB020", width: 3 }),
    fill: new Fill({ color: "rgba(255, 176, 32, 0.5)" }),
  });
};

const highlightedStyleFactoryNEW = (
  pointName: string,
  geomFunc?: (f: any) => any
): Style => {
  return new Style({
    geometry: geomFunc,
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: "#FFB020" }),
      stroke: new Stroke({ color: "black", width: 1 }),
    }),
    text: new Text({
      text: pointName,
      offsetY: 15,
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 3 }),
    }),
    stroke: new Stroke({ color: "#FFB020", width: 3 }),
    fill: new Fill({ color: "rgba(255, 176, 32, 0.5)" }),
  });
};

const lineStyle = (feature: any) =>
  new Style({
    stroke: new Stroke({
      color: "#5AC4B4",
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(90, 152, 219, 0.1)",
    }),
    text: new Text({
      text: feature.get("name") || "",
      font: "12px Calibri,sans-serif",
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 3 }),
      placement: "line",
    }),
  });

const polygonStyle = (feature: any) =>
  new Style({
    fill: new Fill({
      color: "rgba(90, 152, 219, 0.1)",
    }),
    stroke: new Stroke({
      color: "#2094FF",
      width: 2,
    }),
    text: new Text({
      text: feature.get("name") || "",
      font: "12px Calibri,sans-serif",
      fill: new Fill({ color: "black" }),
      stroke: new Stroke({ color: "white", width: 3 }),
    }),
  });

// Style clicked coordinates to display popup
export const highlightedStyle = new Style({
  fill: new Fill({
    color: "rgba(255, 176, 32, 0.19)",
  }),
  stroke: new Stroke({
    color: "#FFB020",
    width: 3,
  }),
  image: new CircleStyle({
    radius: Math.min(20, 7),
    fill: new Fill({ color: "#FFB020" }),
    stroke: new Stroke({ color: "black", width: 1 }),
    // anchor: [0.5, 0.8],
  }),
});

// Coordinate style function
const memoizedStyleFunction = ({
  layers,
  mapRef,
  selectedName,
  clusterRef,
  selectedFeatureRef,
}: any) => {
  const showStyle = useMemo(() => {
    return (feature: any) => {
      const geometryType = feature?.getGeometry()?.getType();
      const zoomLevel = mapRef?.current?.getView().getZoom();
      const featuresArray = feature.get("features");
      const name = featuresArray
        ? featuresArray[0]?.get("name")
        : feature.get("name");
      const isSelected = name === selectedName;
      const size = featuresArray?.length || 1;
      const layer = layers.find(
        (l: any) => l.name.toLowerCase() === geometryType?.toLowerCase()
      );
      if (zoomLevel > 12 && zoomLevel <= 15) {
        clusterRef.current.setDistance(60);
      } else if (zoomLevel > 15 && zoomLevel < 18) {
        clusterRef.current.setDistance(30);
      } else if (zoomLevel > 18 && zoomLevel < 24) {
        clusterRef.current.setDistance(5);
      } else if (zoomLevel > 24) {
        clusterRef.current.setDistance(0);
      }
      if (!layer || !layer.active) return [];
      if (geometryType === "Point") {
        if (featuresArray && featuresArray.length > 0) {
          if (size === 1) {
            const originalFeatureName = featuresArray[0]?.get("name");
            return new Style({
              image: new CircleStyle({
                radius: 7,
                stroke: new Stroke({
                  color: "rgba(0, 0, 0)",
                }),
                fill: new Fill({
                  color: "rgba(0, 0, 0)",
                }),
              }),
              text: new Text({
                text: originalFeatureName,
                offsetY: 15,
                fill: new Fill({ color: "black" }),
                stroke: new Stroke({ color: "white", width: 3 }),
              }),
            });
          }
          if (zoomLevel > 22) {
            const center = feature.getGeometry().getCoordinates();
            const styles: Style[] = featuresArray.map((f: any, i: number) => {
              const geomFunc = makeOffsetGeometryFunction(
                mapRef.current,
                i,
                featuresArray.length,
                center
              );
              const isPicked =
                f?.values_?.properties?.id_ray_db ===
                selectedFeatureRef.current?.values_?.properties?.id_ray_db;
              return isPicked
                ? highlightedStyleFactoryNEW(f.get("name"), geomFunc)
                : new Style({
                    geometry: geomFunc,
                    image: new CircleStyle({
                      radius: 7,
                      fill: new Fill({ color: "rgba(0, 0, 0)" }),
                      stroke: new Stroke({ color: "black", width: 1 }),
                    }),
                    text: new Text({
                      text: f.get("name"),
                      offsetY: 15,
                      fill: new Fill({ color: "black" }),
                      stroke: new Stroke({ color: "white", width: 3 }),
                    }),
                  });
            });
            return styles;
          } else {
            return new Style({
              image: new CircleStyle({
                radius: Math.min(20, size + 10),
                fill: new Fill({ color: "rgba(0, 0, 0)" }),
                stroke: new Stroke({ color: "black", width: 1 }),
              }),
              text: new Text({
                text: size.toString(),
                fill: new Fill({ color: "white" }),
              }),
            });
          }
        }
        return [];
      }
      // Non-point geometry styles
      switch (geometryType) {
        case "LineString":
          return [isSelected ? highlightedStyle : lineStyle(feature)];
        case "Polygon":
          return [isSelected ? highlightedStyle : polygonStyle(feature)];
        case "Circle":
          return [isSelected ? highlightedStyle : circleStyleD];
        default:
          return [];
      }
    };
  }, [layers, mapRef, selectedName, clusterRef, selectedFeatureRef]);
  return showStyle;
};

//...................................................
// Show drawings on the map
const drawerData: DrawerDataItem[] = [
  // { name: "Services", icon: <Services /> },
  { name: "Circle", icon: <Circle /> , tooltip:"ترسیم دایره با شعاع و مرکز"},
  { name: "Polygon", icon: <Polygon /> , tooltip:"ترسیم چند ضلعی"},
  { name: "LineString", icon: <Line /> , tooltip:"ترسیم خط"},
  { name: "Point", icon: <Point /> , tooltip:"ترسیم نقطه"},
  { name: "None", icon: <Cursor /> , tooltip:"حالت پیش فرض"},
];
// handle open measure popup
const handleShowMeasurePopup = (
  state: any,
  setShowMeasure: (boolean: boolean) => void
) => {
  if (state === "LineString" || state === "Polygon") {
    setShowMeasure(false);
  }
};
// Create a ScaleLine control with its own instance
const scaleLineControl: any = new ScaleLine({
  units: "metric",
  bar: false,
  steps: 1,
  text: true,
  className: "demo",
});
// Function to generate a unique name
const generateUniqueName = (
  baseName: string,
  counter: number,
  lineName: any,
  pointData: { features: any[]; type: string },
  counters: any
) => {
  let result = "";
  let counterNew = counters[baseName] || 1;
  const baseNameExists = pointData.features.some(
    (featureData: any) => featureData
    // featureData.properties.name.startsWith(baseName)
  );
  if (baseNameExists) {
    const baseNameNumbers = pointData.features
      .filter((featureData: any) =>
        featureData.properties.name.startsWith(baseName)
      )
      .map((featureData: any) =>
        parseInt(featureData.properties.name.replace(baseName, ""), 10)
      )
      .filter((num: any) => !isNaN(num));

    if (baseNameNumbers.length > 0) {
      counterNew = Math.max(...baseNameNumbers);
    }
  }
  const see = baseNameExists ? counterNew + counter : counter;
  // Check if the base name already exists, if yes, start from the next number
  while (
    lineName?.includes(`${baseName}${counter.toString().padStart(3, "0")}`)
  ) {
    counter++;
  }
  result = `${baseName}${see.toString().padStart(3, "0")}`;
  return result;
};
const showData = (pointData: any, utm: any) => {
  return pointData.features?.reduce((acc: any, featureData: any) => {
    const { geometry, properties } = featureData;
    let geom;
    switch (geometry.type) {
      case "Point":
        geom = new PointGeom(geometry.coordinates);
        break;
      case "LineString":
        geom = new LineString(geometry.coordinates);
        break;
      case "Polygon":
        geom = new OLPolygon(geometry.coordinates.map((ring: any) => ring));
        break;
      case "Circle":
        geom = new OLPolygon(geometry.coordinates.map((ring: any) => ring));
        break;
      default:
        console.error(`Unsupported GeoJSON type: ${geometry.type}`);
        return acc;
    }
    geom.transform("EPSG:4326", utm);
    acc.push(new Feature({ geometry: geom, name: properties.name }));
    return acc;
  }, []);
};

// Search the coordinates displayed on the map
const searchCoodinates = (
  pointData: { features: any[]; type: string },
  search: string
) => {
  const filteredPointData = pointData.features.filter((featureData: any) =>
    featureData.properties.name.includes(search)
  );
  // Create an array to store the features to be added to the map
  const features: Feature[] = [];
  // Iterate through the filteredPointData and create features
  filteredPointData.forEach((featureData: any) => {
    const geometryType = featureData.geometry.type;
    let geometry;
    switch (geometryType) {
      case "Point":
        geometry = new PointGeom(fromLonLat(featureData.geometry.coordinates));
        break;
      case "LineString":
        geometry = new LineString(
          featureData.geometry.coordinates.map((coord: any) =>
            fromLonLat(coord)
          )
        );
        break;
      case "Polygon":
        const linearRings = featureData.geometry.coordinates.map((ring: any) =>
          ring.map((coord: any) => fromLonLat(coord))
        );
        geometry = new OLPolygon(linearRings);
        break;
      default:
        console.error(`Unsupported GeoJSON type: ${geometryType}`);
        return;
    }

    features.push(
      new Feature({
        geometry,
        name: featureData.properties.name,
      })
    );
  });

  return features;
};
// Changing Projection by proj4 library
function onChangeProjection(
  code: any,
  name: any,
  proj4def: any,
  bbox: any,
  map: any
) {
  if (code === null || name === null || proj4def === null || bbox === null) {
    return;
  }
  const newProjCode = "EPSG:" + code;
  proj4.defs(newProjCode, proj4def);
  register(proj4);
  const newProj: any = getProjection(newProjCode);
  const fromLonLat = getTransform("EPSG:4326", newProj);
  let worldExtent = [bbox[1], bbox[2], bbox[3], bbox[0]];
  if (bbox[1] > bbox[3]) {
    worldExtent = [bbox[1], bbox[2], bbox[3] + 360, bbox[0]];
  }
  const extent = applyTransform(worldExtent, fromLonLat, undefined, 8);
  const newView = new View({
    projection: newProj,
  });

  newProj.setWorldExtent(worldExtent);
  map?.setView(newView);
  newView.fit(extent);
}
// Function to calculate the average latitude and longitude
function calculateAverageCenter(points: []) {
  var totalLon = 0;
  var totalLat = 0;
  points.forEach(function (point) {
    totalLon += point[0]; // Longitude
    totalLat += point[1]; // Latitude
  });
  var avgLon = totalLon / points.length;
  var avgLat = totalLat / points.length;
  return [avgLon, avgLat];
}

// Getting UTM from the project and changing the projection and displaying the map based on utm zone.
const useUTMHandler = (
  utm: any,
  map: any,
  mapData: any,
  isAnimate: boolean
) => {
  let code, name, proj4def, bbox;
  if (utm === "EPSG:32639") {
    code = "32639";
    name = "WGS 84 / UTM zone 39N";
    proj4def = `
            PROJCS["WGS 84 / UTM zone 39N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,  AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT   ["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION    ["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",51],PARAMETER    ["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1, AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32639"]]`;
    bbox = [84, 48, 0, 54];
  } else if (utm === "EPSG:32638") {
    code = "32638";
    name = "WGS 84 / UTM zone 38N";
    proj4def = `
            PROJCS["WGS 84 / UTM zone 38N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,  AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT   ["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION    ["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",45],PARAMETER    ["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1, AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32638"]]`;
    bbox = [84, 42, 0, 48];
  } else if (utm === "EPSG:32641") {
    code = "32641";
    name = "WGS 84 / UTM zone 41N";
    proj4def = `
            PROJCS["WGS 84 / UTM zone 41N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,  AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT   ["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION    ["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",63],PARAMETER    ["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1, AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32641"]]`;
    bbox = [84, 60, 0, 66];
  } else if (utm === "EPSG:32640") {
    code = "32640";
    name = "WGS 84 / UTM zone 40N";
    proj4def = `
            PROJCS["WGS 84 / UTM zone 40N",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,  AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT   ["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION    ["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",57],PARAMETER    ["scale_factor",0.9996],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1, AUTHORITY["EPSG","9001"]],AXIS["Easting",EAST],AXIS["Northing",NORTH],AUTHORITY["EPSG","32640"]]`;
    bbox = [84, 54, 0, 60];
  } else {
    code = "4326";
    name = "WGS 84";
    proj4def = `
            GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]]`;
    bbox = [90, -180, -90, 180];
  }
  // Update the view projection
  onChangeProjection(code, name, proj4def, bbox, map);
  // Create a new instance of VectorSource with transformed features
  let geometry;
  const transformedFeatures = mapData
    ?.map((featureData: any) => {
      const geometryType = featureData.geometry.type;
      switch (geometryType) {
        case "Point":
          geometry = new PointGeom(featureData.geometry.coordinates);
          break;
        case "LineString":
          geometry = new LineString(
            featureData.geometry.coordinates.map((coord: any) => coord)
          );
          break;
        case "Polygon":
          const linearRings = featureData.geometry.coordinates.map(
            (ring: any) => ring.map((coord: any) => coord)
          );
          geometry = new OLPolygon(linearRings);
          break;
        case "Circle":
          const linearCircle = featureData.geometry.coordinates.map(
            (ring: any) => ring.map((coord: any) => coord)
          );
          geometry = new CircleGeom(linearCircle);
          break;
        default:
          console.error(`Unsupported GeoJSON type: ${geometryType}`);
          return null;
      }
      geometry.transform("EPSG:4326", utm);
      return new Feature({
        geometry,
        name: featureData.properties.name,
      });
    })
    .filter((feature: any) => feature !== null);

  const newSource = new VectorSource({
    features: transformedFeatures,
  });
  // Update the source for the VectorLayer
  map?.getLayers().forEach((layer: any) => {
    if (layer instanceof VectorLayer) {
      layer.setSource(newSource);
    }
  });

  const featureCoordinates = mapData
    ?.map((feature: any) => {
      switch (feature.geometry.type) {
        case "Point":
          return feature.geometry.coordinates;
        case "LineString":
          return feature.geometry.coordinates.reduce((acc: any, coord: any) => {
            acc.push(coord);
            return acc;
          }, []);
        case "Polygon":
          return feature.geometry.coordinates.reduce((acc: any, ring: any) => {
            return acc.concat(ring);
          }, []);
        default:
          return [];
      }
    })
    .reduce((acc: any, coordinates: any) => {
      // Only apply the logic for LineString and Polygon
      if (Array.isArray(coordinates[0])) {
        return acc.concat(coordinates);
      } else {
        acc.push(coordinates);
        return acc;
      }
    }, [])
    .filter(
      (coord: any) => Number.isFinite(coord[0]) && Number.isFinite(coord[1])
    );
  // Filter out invalid coordinates
  const totalCoordinates = featureCoordinates?.length ?? 0;
  if (totalCoordinates > 0) {
    // Calculate the center based on the average of the points
    const averageCenter = calculateAverageCenter(featureCoordinates);
    // Zoom to fit all points
    var extent = newSource?.getExtent();
    const newView = new View({
      projection: utm,
      center: transform(averageCenter, "EPSG:4326", utm),
      zoom: 15,
    });
    map?.setView(newView);
    if (isAnimate) {
      map
        ?.getView()
        ?.fit(extent, { padding: [100, 100, 100, 100], duration: 2000 });
    }
  } else {
    const newView = new View({
      projection: utm,
      center: transform(
        [53.72578400784792, 32.246560087232126],
        "EPSG:4326",
        utm
      ),
      zoom: 6,
    });
    map?.setView(newView);
  }
};

export const handleMapInteraction = (mapRef: any) => {
  if (mapRef) {
    const view = mapRef.getView();
    const extent: any = mapRef.getLayers().item(1)?.getSource()?.getExtent();

    if (extent) {
      view.fit(extent, {
        padding: [100, 100, 100, 100],
        duration: 2000,
      });
    }
  }
};

// Getting the coordinates of the drawn circle and changing the format as an array and saving it in Redux
const circleCoordinates = (center: any, radius: any) => {
  const result = [
    [center[0] - radius, center[1]],
    [center[0], center[1] + radius],
    [center[0] + radius, center[1]],
    [center[0], center[1] - radius],
    [center[0] - radius, center[1]],
  ];
  return result;
};
// Calculate 3 selected points (center + radius) and draw a circle based on 3 points, save in redux, choose dynamic name for popup
function calculateAndDrawCircle(
  points: any,
  sourceRef: any,
  counters: any,
  getPointData: any,
  setDrawnFeatures: any,
  setCounters: any,
  mapData: any,
  dispatch: any,
  utm: any,
  radiusThree: any
) {
  const [x1, y1] = points[0];
  const [x2, y2] = points[1];
  const [x3, y3] = points[2];
  // Calculate the coefficients of the linear equations
  const a11 = 2 * (x2 - x1);
  const a12 = 2 * (y2 - y1);
  const a21 = 2 * (x3 - x1);
  const a22 = 2 * (y3 - y1);
  const b1 = x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1;
  const b2 = x3 * x3 + y3 * y3 - x1 * x1 - y1 * y1;
  // Solve the linear equations
  const denominator = a11 * a22 - a21 * a12;
  const E_center = (b1 * a22 - b2 * a12) / denominator;
  const N_center = (a11 * b2 - a21 * b1) / denominator;
  // Calculate the radius
  const Radius = Math.sqrt((x1 - E_center) ** 2 + (y1 - N_center) ** 2);
  // Create circle feature
  const center = [E_center, N_center];

  const coordinates = [];
  const circleCoordinatesD = [];
  const circleResolution = radiusThree; // Change resolution as needed
  for (let i = 0; i <= circleResolution; i++) {
    const angle = (Math.PI / 180) * (i / circleResolution) * 360;
    const x = center[0] + Radius * Math.cos(angle);
    const y = center[1] + Radius * Math.sin(angle);
    circleCoordinatesD.push([x, y]);
  }
  coordinates.push(circleCoordinatesD);
  const circle = new OLPolygon(coordinates);
  const circleFeature = new Feature(circle);
  const geometryType = circleFeature?.getGeometry()?.getType();
  const feature = circleFeature;

  const resultCoor = handleConvertToWGS84Drawer({
    geometryType,
    feature,
    utm,
    coordinates,
  });

  // Set name for circle feature
  let baseName = "Cloud_Circle";
  let lineName = mapData?.polygon;
  let result = generateUniqueName(
    baseName,
    counters["Circle"],
    lineName,
    getPointData,
    counters
  );
  circleFeature.set("name", result);
  // Serialize the drawn feature data
  const serializedFeatureData = {
    type: "Feature",
    geometry: {
      type: "Circle",
      coordinates: [resultCoor],
    },
    properties: { name: circleFeature.get("name") },
  };
  // Store the reference to the circle feature
  dispatch(getDrawnFeatures(serializedFeatureData));
  setDrawnFeatures((prevFeatures: any) => [...prevFeatures, circleFeature]);
  // Update the counter for the specific geometry type
  setCounters((prevCounters: any) => ({
    ...prevCounters,
    ["Circle"]: prevCounters["Circle"] + 1,
  }));
  // Set style for circle feature
  circleFeature.setStyle(circleStyleD);
  // Add circle feature to the source
  sourceRef?.addFeature(circleFeature);
}
// Helper function to calculate azimuth angle
function calculateAzimuth(E1: any, N1: any, E2: any, N2: any) {
  const dE = E2 - E1;
  const dN = N2 - N1;
  const divideValue = Math.abs(dE / dN);
  const vAngle = (Math.atan(divideValue) * 180) / Math.PI;
  let azimuth = 0;
  if (dE > 0 && dN > 0) {
    azimuth = vAngle;
  } else if (dE > 0 && dN < 0) {
    azimuth = 180 - vAngle;
  } else if (dE < 0 && dN < 0) {
    azimuth = 180 + vAngle;
  } else {
    azimuth = 360 - vAngle;
  }
  return azimuth;
}
// Drawering Arc
const calculateAndDrawArc = (
  points: any,
  sourceRef: any,
  counters: any,
  pointData: any,
  setDrawnFeatures: any,
  setCounters: any,
  mapData: any,
  dispatch: any,
  utm: any
) => {
  const [x1, y1] = points[0];
  const [x2, y2] = points[1];
  const [x3, y3] = points[2];
  // Calculate the coefficients of the linear equations
  const a11 = 2 * (x2 - x1);
  const a12 = 2 * (y2 - y1);
  const a21 = 2 * (x3 - x1);
  const a22 = 2 * (y3 - y1);
  const b1 = x2 * x2 + y2 * y2 - x1 * x1 - y1 * y1;
  const b2 = x3 * x3 + y3 * y3 - x1 * x1 - y1 * y1;
  // Solve the linear equations
  const denominator = a11 * a22 - a21 * a12;
  const E_center = (b1 * a22 - b2 * a12) / denominator;
  const N_center = (a11 * b2 - a21 * b1) / denominator;
  // calculate azimuth angles
  let azimuth1_3 = calculateAzimuth(x1, y1, x3, y3);
  let azimuth1_2 = calculateAzimuth(x1, y1, x2, y2);
  let azimuth_c_1 = calculateAzimuth(E_center, N_center, x1, y1);
  let azimuth_c_3 = calculateAzimuth(E_center, N_center, x3, y3);

  let delta;
  if (x1 > x3 && azimuth1_3 < azimuth1_2) {
    if (azimuth_c_1 < azimuth_c_3) {
      delta = Array.from(
        { length: azimuth_c_1 + 361 - azimuth_c_3 },
        (_, index) => azimuth_c_3 + index
      );
    } else {
      delta = Array.from(
        { length: azimuth_c_1 - azimuth_c_3 + 1 },
        (_, index) => azimuth_c_3 + index
      );
    }
  } else if (x1 > x3 && azimuth1_3 > azimuth1_2) {
    delta = Array.from(
      { length: azimuth_c_3 - azimuth_c_1 + 1 },
      (_, i) => azimuth_c_1 + i
    );
  } else if (x1 < x3 && azimuth1_3 > azimuth1_2) {
    if (azimuth_c_1 < azimuth_c_3) {
      delta = Array.from(
        { length: azimuth_c_3 - azimuth_c_1 + 1 },
        (_, i) => azimuth_c_1 + i
      );
    } else {
      delta = Array.from(
        { length: azimuth_c_3 + 360 - azimuth_c_1 + 1 },
        (_, i) => azimuth_c_1 + i
      );
    }
  } else {
    delta = Array.from(
      { length: azimuth_c_1 - azimuth_c_3 + 1 },
      (_, i) => azimuth_c_3 + i
    );
  }
  const Radius = Math.sqrt((x1 - E_center) ** 2 + (y1 - N_center) ** 2);

  let E = delta.map(
    (angle) => Radius * Math.sin((angle * Math.PI) / 180) + E_center
  );
  let N = delta.map(
    (angle) => Radius * Math.cos((angle * Math.PI) / 180) + N_center
  );

  let lineCoordinates = [];
  for (let i = 0; i < E.length; i++) {
    lineCoordinates.push([E[i], N[i]]);
  }

  const lineString = new LineString(lineCoordinates);
  // lineString.transform("EPSG:4326", "EPSG:3857");
  const arcFeature: any = new Feature({
    geometry: lineString,
  });

  // Set name for circle feature
  let baseName = "Cloud_Arc";
  let lineName = mapData?.line;
  let result = generateUniqueName(
    baseName,
    counters["Arc"],
    lineName,
    pointData,
    counters
  );
  arcFeature.set("name", result);
  // Convert UTM To WGS84
  const test: any = arcFeature
    .getGeometry()
    .getCoordinates()
    .map((ring: any) => ring.map((coord: any) => coord));
  const geometry = test.map((demo: any) => transform(demo, utm, "EPSG:4326"));
  // Serialize the drawn feature data
  const serializedFeatureData = {
    type: "Feature",
    geometry: {
      type: arcFeature?.getGeometry()?.getType(),
      coordinates: geometry,
    },
    properties: { name: arcFeature.get("name") },
  };
  // Store the reference to the Arc feature
  dispatch(getDrawnFeatures(serializedFeatureData));
  setDrawnFeatures((prevFeatures: any) => [...prevFeatures, arcFeature]);
  // Update the counter for the specific geometry type
  setCounters((prevCounters: any) => ({
    ...prevCounters,
    ["Arc"]: prevCounters["Arc"] + 1,
  }));
  // Set style for Arc feature
  arcFeature.setStyle(lineStyle);
  // Add the feature to the source
  sourceRef.addFeature(arcFeature);
};
// Change drawing type
const handleGeometryTypeChange = (
  geometryType: string,
  setDrawer: (name: string) => void,
  setState: any,
  isEditMode: boolean,
  setShowAlert: any
) => {
  setDrawer("");
  if (isEditMode) {
    setState((prevState: any) => ({
      ...prevState,
      selectedGeometryType: "None",
    }));
    setShowAlert(true);
  } else {
    setState((prevState: any) => ({
      ...prevState,
      selectedGeometryType: geometryType,
    }));
    setShowAlert(false);
  }
};

function pickNearestSubFeatureFromExpandedCluster(
  evt: any,
  map: any,
  clusterFeature: any
) {
  const subs: any[] = clusterFeature.get("features") || [];
  if (!subs.length) return null;

  const center: [number, number] = clusterFeature
    .getGeometry()
    .getCoordinates();
  const res = map.getView().getResolution();
  const radiusPx = 50;
  const radius = radiusPx * res;

  let bestIdx = 0;
  let bestDist = Infinity;

  for (let i = 0; i < subs.length; i++) {
    const angle = (2 * Math.PI * i) / subs.length;
    const coord: [number, number] = [
      center[0] + radius * Math.cos(angle),
      center[1] + radius * Math.sin(angle),
    ];
    const pix = map.getPixelFromCoordinate(coord);
    const d = Math.hypot(pix[0] - evt.pixel[0], pix[1] - evt.pixel[1]);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }

  return subs[bestIdx] || null;
}

// Add the click event to the map in a standalone function
export const addMapClickHandler = ({
  mapRef,
  setPopupVisible,
  setPopupContent,
  vectorLayerRef,
  setSelectedName,
  selectedFeatureRef,
}: HandleMapClickProps) => {
  if (mapRef.current) {
    mapRef.current.on("click", (event) => {
      mapRef.current?.forEachFeatureAtPixel(event.pixel, (feature: any) => {
        const clusteredFeatures = feature.get("features");
        const zoomLevel = mapRef?.current?.getView().getZoom() ?? 0;
        if (selectedFeatureRef.current) {
          selectedFeatureRef.current.setStyle(null);
        }
        if (clusteredFeatures && clusteredFeatures.length > 1) {
          if (zoomLevel > 22) {
            const picked = pickNearestSubFeatureFromExpandedCluster(
              event,
              mapRef.current,
              feature
            );

            if (picked) {
              const name = picked.get("name");
              const coords = picked.getGeometry().getCoordinates();
              const result: any = {
                name,
                type: "Point",
                lat: Math.ceil(coords[1] * 1e3) / 1e3,
                lon: Math.ceil(coords[0] * 1e3) / 1e3,
                numPoints: 0,
                icon: <Point />,
                ...(picked.getProperties()?.properties && {
                  showMore: picked.getProperties()?.properties,
                }),
              };
              selectedFeatureRef.current = picked;
              setSelectedName(name);
              setPopupContent(result);
              setPopupVisible(true);
            }
            return;
          }
          const extent = createEmpty();
          clusteredFeatures.forEach((cf: any) =>
            extend(extent, cf.getGeometry().getExtent())
          );
          const view = mapRef.current?.getView();
          const clusterCenter = getCenter(extent);
          view?.animate({
            center: clusterCenter,
            duration: 500,
            zoom: (zoomLevel ?? 10) + 2,
          });
        } else {
          handleMapClick(
            event,
            mapRef?.current,
            setPopupVisible,
            setPopupContent,
            vectorLayerRef,
            setSelectedName,
            selectedFeatureRef
          );
        }
      });
      const feature = mapRef.current?.forEachFeatureAtPixel(
        event.pixel,
        (f: any) => f
      );
      if (feature === undefined) {
        setSelectedName(null);
        setPopupVisible(false);
      }
    });
  }
};

export const unselectedStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({ color: "blue" }),
    stroke: new Stroke({ color: "blue", width: 2 }),
  }),
});
export const selectedStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    fill: new Fill({ color: "red" }),
    stroke: new Stroke({ color: "red", width: 2 }),
  }),
});

// Popup display
const handleMapClick = (
  event: any,
  map: any,
  setPopupVisible: any,
  setPopupContent: any,
  vectorLayerRef: any,
  setSelectedName: any,
  selectedFeatureRef: any
) => {
  const features: any[] = [];
  map.forEachFeatureAtPixel(event.pixel, (feature: any) => {
    features.push(feature);
  });

  if (features.length === 0) return;

  const selectedFeature =
    features.find((feature) => feature.getGeometry().getType() === "Point") ||
    features[0];
  const geometryType = selectedFeature?.getGeometry()?.getType();
  const name = selectedFeature?.get("name");

  if (selectedFeatureRef.current) {
    selectedFeatureRef.current.setStyle(null);
  }

  const pointName =
    geometryType === "Point"
      ? selectedFeature?.get("features")?.[0]?.get("name") || name
      : null;

  if (vectorLayerRef.current) {
    map.removeLayer(vectorLayerRef.current);
    vectorLayerRef.current = null;
  }

  if (selectedFeature) {
    selectedFeatureRef.current = selectedFeature;
    selectedFeature.setStyle(highlightedStyleFactory(pointName));
    const geometry = selectedFeature.getGeometry();
    const result: any = {
      name: geometryType === "Point" ? pointName : name,
      type: geometryType,
      lat: 0,
      lon: 0,
      numPoints: 0,
      icon: null,
    };
    if (geometryType === "Point") {
      const coordinates = geometry.getCoordinates();
      result.lat = Math.ceil(coordinates[1] * 1e3) / 1e3;
      result.lon = Math.ceil(coordinates[0] * 1e3) / 1e3;
      result.icon = <Point />;
      setSelectedName(pointName);
    } else if (geometryType === "LineString" || geometryType === "Polygon") {
      setSelectedName(name);
      if (geometryType === "LineString") {
        result.numPoints = geometry.getCoordinates().length;
        result.icon = <Line />;
      } else if (geometryType === "Polygon") {
        result.numPoints = geometry.getCoordinates()[0].length;
        result.icon = <Polygon />;
      }
    }

    setPopupVisible(true);
    setPopupContent(result);
  } else {
    setSelectedName(null);
    setPopupVisible(false);
  }
};

// Convert WGS84 to UTM, to get Easting and Northing.
const convertWGSToUTM = (latitude: any, longitude: any) => {
  let cords: {
    utmEasting: number | string | null;
    utmNorthing: number | string | null;
  } = {
    utmEasting: null,
    utmNorthing: null,
  };
  if (typeof latitude === "number" && typeof longitude === "number") {
    const posLong = (longitude + 180) % 360;
    const zone = Math.floor(posLong / 6 + 1);
    const bands = "CDEFGHJKLMNPQRSTUVWXX";
    const index = Math.floor((latitude + 80) / 8);
    const utmZone = `${zone}${bands[index]}`;
    const wgs84Projection =
      "+proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees";
    const utmProjection = `+proj=utm +zone=${utmZone} +ellps=WGS84 +datum=WGS84 +units=m +no_defs`;
    const [utmEasting, utmNorthing] = proj4(wgs84Projection, utmProjection, [
      longitude,
      latitude,
    ]);
    cords = {
      utmEasting: utmEasting.toFixed(3),
      utmNorthing: utmNorthing.toFixed(3),
    };
  } else {
    cords = {
      utmEasting: "_",
      utmNorthing: "_",
    };
  }
  return cords;
};
// Convert UTM to WGS84 , to get lat and lon.
const convertUTMToWGS = (
  utmEasting: number,
  utmNorthing: number,
  utmZone: number
) => {
  const utmProjection = `+proj=utm +zone=${utmZone} +datum=WGS84 +units=m +no_defs`;
  const wgs84Projection = "+proj=longlat +datum=WGS84 +no_defs";
  try {
    const [longitude, latitude] = proj4(utmProjection, wgs84Projection, [
      utmEasting,
      utmNorthing,
    ]);
    return {
      latitude: latitude,
      longitude: longitude,
    };
  } catch (error) {
    return { latitude: null, longitude: null };
  }
};
// Draw and save the coordinates of the rectangle in the state
const clickHandlerRectangle = ({
  event,
  drawer,
  isDrawing,
  setIsDrawing,
  setRectAngle,
}: PropRectangle) => {
  if (drawer === "rectAngle") {
    if (!isDrawing) {
      // Start drawing
      setIsDrawing(true);
      setRectAngle((prevPoints: any) => [...prevPoints, event.coordinate]);
    } else {
      // End drawing
      setIsDrawing(false);
      setRectAngle((prevPoints: any) => [...prevPoints, event.coordinate]);
      // Handle the drawn rectangle, e.g., calculate dimensions, store data, etc.
      // Reset or clear any necessary states
      setRectAngle([]);
    }
  }
};
// scale factor GSF
function calculateUTMScaleFactor(latitude: number, longitude: number): number {
  const deg2rad = (deg: number) => (deg * Math.PI) / 180;
  const rad2deg = (rad: number) => (rad * 180) / Math.PI;

  const lat = deg2rad(latitude);
  const lon = deg2rad(longitude);
  const zone = Math.floor(rad2deg(lon) / 6) + 31;
  const lon0 = (zone - 30) * 6 - 3;
  // const a = 6378137;
  const e = 0.0818191908426215;
  const e1 = Math.pow(e, 2) / (1 - Math.pow(e, 2));
  // const N = a / Math.sqrt(1 - Math.pow(e, 2) * Math.pow(Math.sin(lat), 2));
  const T = Math.pow(Math.tan(lat), 2);
  const C = e1 * Math.pow(Math.cos(lat), 2);
  const A = (lon - deg2rad(lon0)) * Math.cos(lat);
  const K0 = 0.9996;
  const K =
    K0 *
    (1 +
      (1 + C) * (Math.pow(A, 2) / 2) +
      (5 - 4 * T + 42 * C + 13 * Math.pow(C, 2) - 28 * e1) *
        (Math.pow(A, 4) / 24) +
      (61 - 148 * T + 16 * Math.pow(T, 2)) * (Math.pow(A, 6) / 720));
  return K;
}
// get Length
const formatLength = function (line: any) {
  const length = getLength(line);
  let output;
  if (length > 1000) {
    output = Math.round((length / 1000) * 100) / 100 + "km";
  } else {
    output = Math.round(length * 100) / 100 + "m";
  }
  return output;
};
// get Area
const formatArea = function (polygon: any) {
  const area = getArea(polygon);
  let output;
  if (area > 10000) {
    output = Math.round((area / 1000000) * 100) / 100 + "km²";
  } else {
    output = Math.round(area * 100) / 100 + "m²";
  }
  return output;
};
export const segmentStyle = new Style({
  text: new Text({
    font: "12px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
    padding: [2, 2, 2, 2],
    textBaseline: "bottom",
    offsetY: -12,
  }),
  image: new RegularShape({
    radius: 6,
    points: 3,
    angle: Math.PI,
    displacement: [0, 8],
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.4)",
    }),
  }),
});
export const styleEx = new Style({
  fill: new Fill({
    color: "rgba(255, 255, 255, 0.2)",
  }),
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 0.5)",
    lineDash: [10, 10],
    width: 2,
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    fill: new Fill({
      color: "rgba(255, 255, 255, 0.2)",
    }),
  }),
});
export const styleInitial = new Style({
  stroke: new Stroke({
    color: "#5AC4B4",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(90, 152, 219, 0.1)",
  }),
  image: new Icon({
    src: locInit,
    anchor: [0.5, 0.8],
    width: 24,
  }),
});
export const labelStyle: any = new Style({
  text: new Text({
    font: "14px Calibri,sans-serif",
    fill: new Fill({
      color: "rgba(255, 255, 255, 1)",
    }),
    backgroundFill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
    padding: [3, 3, 3, 3],
    textBaseline: "bottom",
    offsetY: -15,
  }),
  image: new RegularShape({
    radius: 8,
    points: 3,
    angle: Math.PI,
    displacement: [0, 10],
    fill: new Fill({
      color: "rgba(0, 0, 0, 0.7)",
    }),
  }),
});
const handleConvertToWGS84Drawer = ({
  geometryType,
  feature,
  utm,
  coordinates,
}: any) => {
  let geometry;
  switch (geometryType) {
    case "Point":
      geometry = transform(
        feature.getGeometry().getCoordinates(),
        utm,
        "EPSG:4326"
      );
      break;
    case "LineString":
      const test = feature
        .getGeometry()
        .getCoordinates()
        .map((ring: any) => ring.map((coord: any) => coord));
      geometry = test.map((demo: any) => transform(demo, utm, "EPSG:4326"));
      break;
    case "Polygon":
      const poly = feature
        .getGeometry()
        .getCoordinates()
        .map((ring: any) => ring.map((coord: any) => coord));
      geometry = poly[0].map((demo: any) => transform(demo, utm, "EPSG:4326"));
      break;
    case "Circle":
      const circ = coordinates.map((ring: any) =>
        ring.map((coord: any) => coord)
      );
      geometry = circ[0].map((demo: any) => transform(demo, utm, "EPSG:4326"));
      break;
    default:
      console.error(`Unsupported GeoJSON type: ${geometryType}`);
      return null;
  }
  return geometry;
};
const handleClearCoordinates = ({
  setPopupVisible,
  setShowMeasure,
  setDrawnFeatures,
  setCounters,
  drawnFeatures,
  sourceDrawnRef,
  sourceServerRef,
  dispatch,
}: any) => {
  // Clear drawn features and associated state
  setPopupVisible(false);
  setShowMeasure(false);
  setDrawnFeatures([]);
  setCounters({
    Point: 1,
    LineString: 1,
    Polygon: 1,
    Circle: 1,
    rectAngle: 1,
    Arc: 1,
  });
  sourceDrawnRef.current.clear();
  drawnFeatures.forEach((drawnFeature: any) => {
    sourceDrawnRef.current.removeFeature(drawnFeature);
    sourceServerRef.current.removeFeature(drawnFeature);
  });
  dispatch(closeModal());
  dispatch(clearDrawnFeatures());
};
const handleModifyEnd = ({
  event,
  updatedPointData,
  handleConvertToWGS84Drawer,
  utm,
  setPointData,
}: modifyEndProps) => {
  // Extract modified features from the event
  const modifiedFeatures = event.features.getArray();
  // Create a new array to hold the updated features

  // Iterate through modified features
  modifiedFeatures.forEach((feature: any) => {
    const geometryType = feature?.getGeometry()?.getType();
    const getCoordinate = [0, 0];
    const getEditCoordinate = handleConvertToWGS84Drawer({
      geometryType,
      feature,
      utm,
      getCoordinate,
    });
    // Find the corresponding feature in updatedPointData
    const matchingFeatureIndex = updatedPointData.features.findIndex(
      (dataFeature: any) =>
        dataFeature.properties.name === feature.getProperties().name
    );
    if (matchingFeatureIndex !== -1) {
      const polygonTest =
        geometryType === "Polygon" ? [getEditCoordinate] : getEditCoordinate;
      // Create a new object with updated coordinates
      const updatedFeature = {
        ...updatedPointData.features[matchingFeatureIndex],
        geometry: {
          ...updatedPointData.features[matchingFeatureIndex].geometry,
          coordinates: polygonTest,
        },
      };
      // Update the feature in the new array
      updatedPointData.features[matchingFeatureIndex] = updatedFeature;
    }
  });

  // Update the state to reflect the changes
  setPointData(updatedPointData);
};

// handleDeleteSelectedFeature.js
const handleDeleteSelectedFeature = ({
  selectedFeature,
  pointData,
  getPointData,
  setPointData,
  sourceServerRef,
  sourceDrawnRef,
  setSelectedFeature,
  showData,
  utm,
  setSelected,
  selected,
}: handleDeleteSelectedFeatureProps) => {
  if (selected?.length > 0) {
    // Extract selected feature names
    const selectedFeatureNames = selected.map(
      (feature: any) => feature?.getProperties().name
    );
    const isServerFeature = pointData?.features?.some((feature: any) =>
      selectedFeatureNames.includes(feature.properties.name)
    );
    // Filter out selected features from pointData
    const updatedPointData = getPointData?.features?.filter(
      (feature: any) => !selectedFeatureNames.includes(feature.properties.name)
    );
    const data = {
      features: updatedPointData,
      type: "FeatureCollection",
    };
    setPointData(data);
    if (isServerFeature) {
      const serverFeatures = showData(data, utm);
      sourceServerRef.current.addFeatures(serverFeatures);
    } else {
      const features = showData(data, utm);
      sourceServerRef.current.addFeatures(features);
      sourceDrawnRef.current.removeFeature(selectedFeature);
    }
    setSelected([]);
  } else {
    const selectedFeatureName = selectedFeature?.getProperties().name;
    // Check if the selected feature exists in the server data
    const isServerFeature = pointData?.features?.some(
      (feature: any) => feature.properties.name === selectedFeatureName
    );
    // Remove the feature from the Redux state
    const updatedPointData = getPointData?.features?.filter(
      (feature: any) => feature.properties.name !== selectedFeatureName
    );
    const data = {
      features: updatedPointData,
      type: "FeatureCollection",
    };
    setPointData(data);
    if (isServerFeature) {
      // sourceServerRef.current.clear();
      const features = showData(data, utm);
      sourceServerRef.current.addFeatures(features);
    } else {
      // sourceServerRef.current.clear();
      const features = showData(data, utm);
      sourceServerRef.current.addFeatures(features);
      sourceDrawnRef.current.removeFeature(selectedFeature);
    }
    setSelectedFeature(null);
  }
};
export function calculateESF(elHeight: number, latitude: number) {
  const a = 6378137;
  const e = 0.00669438;
  const sinLat = Math.sin((latitude * Math.PI) / 180);
  const N = a / Math.sqrt(1 - e * Math.pow(sinLat, 2));
  const M = (a * (1 - e)) / Math.pow(1 - e * Math.pow(sinLat, 2), 3 / 2);
  const R = Math.sqrt(N * M);
  const esf = R / (R + elHeight);
  return esf;
}
/////////////////////////////////REFACTOR/////////////////////////////////
// Separation of map creation into a separate function
export const initializeMap = ({
  mapRef,
  selectedTileSource,
}: InitialMApProps) => {
  mapRef.current = new Map({
    controls: defaultControls().extend([scaleLineControl]),
    layers: [tileSources[selectedTileSource]],
    target: "map",
    view: new View({
      center: fromLonLat([16.37, 48.2]), // Center of the map
      zoom: 10,
      showFullExtent: true,
    }),
  });
};
// Seperate updating layers into a separate function
export const updateMapLayers = ({
  mapRef,
  selectedTileSource,
}: InitialMApProps) => {
  if (mapRef.current) {
    mapRef.current.getLayers().clear();
    mapRef.current.addLayer(tileSources[selectedTileSource]);
  }
};

// Cleaning function
export const cleanupMap = (mapRef: MutableRefObject<Map | null>) => {
  if (mapRef.current) {
    mapRef.current.setTarget("");
    mapRef.current = null;
  }
};
//.....
const darkIcon = new Icon({
  src: "data/icons/emoticon-cool.svg",
});
const lightIcon = new Icon({
  src: "data/icons/emoticon-cool-outline.svg",
});

export const clusterMemberStyle = (clusterMember: any) => {
  return new Style({
    geometry: clusterMember.getGeometry(),
    image: clusterMember.get("LEISTUNG") > 5 ? darkIcon : lightIcon,
  });
};

export const clusterStyle = (feature: any) => {
  const size = feature.get("features").length;
  if (size > 1) {
    return [
      new Style({
        image: new CircleStyle({
          radius: 20,
          fill: new Fill({ color: "rgba(255, 153, 102, 0.3)" }),
        }),
      }),
      new Style({
        image: new CircleStyle({
          radius: 14,
          fill: new Fill({ color: "rgba(255, 165, 0, 0.7)" }),
        }),
        text: new Text({
          text: size.toString(),
          fill: new Fill({ color: "#fff" }),
          stroke: new Stroke({ color: "rgba(0, 0, 0, 0.6)", width: 3 }),
        }),
      }),
    ];
  }
  return clusterMemberStyle(feature.get("features")[0]);
};

export const convexHullFill = new Fill({
  color: "rgba(255, 153, 0, 0.4)",
});
export const convexHullStroke = new Stroke({
  color: "rgba(204, 85, 0, 1)",
  width: 1.5,
});
export const outerCircleFill = new Fill({
  color: "rgba(255, 153, 102, 0.3)",
});
export const innerCircleFill = new Fill({
  color: "rgba(255, 165, 0, 0.7)",
});
export const textFill = new Fill({
  color: "#fff",
});
export const textStroke = new Stroke({
  color: "rgba(0, 0, 0, 0.6)",
  width: 3,
});
export const innerCircle = new CircleStyle({
  radius: 14,
  fill: innerCircleFill,
});
export const outerCircle = new CircleStyle({
  radius: 20,
  fill: outerCircleFill,
});

///.....................

// Reset the previously selected styles
export const resetPreviousSelectionStyles = ({
  prevSelectedRef,
  getPointStyle,
}: any) => {
  prevSelectedRef.current.forEach((feature: any) => {
    feature?.setStyle(defaultStyle);
    const geometryType = feature?.getGeometry()?.getType();
    let styleToSet;
    switch (geometryType) {
      case "Point":
        styleToSet = pointStyle;
        break;
      case "LineString":
        styleToSet = lineStyle;
        break;
      case "Polygon":
        styleToSet = polygonStyle;
        break;
      case "Circle":
        styleToSet = circleStyleD;
        break;
      default:
        styleToSet = [];
    }

    feature?.setStyle(styleToSet);
  });
};

// Highlight selected features
export const highlightSelectedFeatures = (selected: any | []) => {
  selected.forEach((feature: any) => {
    feature?.setStyle(highlightedStyle);
  });
};

// Calculate the distance between two coordinates
const calculateDistance = (coords: any) => {
  const line = new LineString(coords);
  const length = getLength(line, { projection: "EPSG:3857" }); // Calculate the distance in meters
  return length;
};

export {
  calculateAndDrawArc,
  calculateAndDrawCircle,
  calculateDistance,
  calculateUTMScaleFactor,
  circleCoordinates,
  clickHandlerRectangle,
  convertUTMToWGS,
  convertWGSToUTM,
  drawerData,
  formatArea,
  formatLength,
  generateUniqueName,
  handleClearCoordinates,
  handleConvertToWGS84Drawer,
  handleDeleteSelectedFeature,
  handleGeometryTypeChange,
  handleMapClick,
  handleModifyEnd,
  handleShowMeasurePopup,
  memoizedStyleFunction,
  scaleLineControl,
  searchCoodinates,
  showData,
  useUTMHandler,
};
