import fetch from 'make-fetch-happen';
import OpenLocationCode from 'open-location-code';

import { getBoundsInMeters, getArcGISPolygon } from './helpers.js';

const layerInfoURL = 'http://copernicus.discomap.eea.europa.eu/arcgis/rest/services/Corine/CLC2012_WM/MapServer/0?f=json';
const layerPromise = fetch(layerInfoURL).then(r => r.json());

const olcInstance = new OpenLocationCode.OpenLocationCode();

export async function getTerrainDataFromPlotCode(plotCode) {
  const decodedOCL = olcInstance.decode(plotCode);
  const { xmin, ymin, xmax, ymax } = getBoundsInMeters(decodedOCL);
  const arcgisbbox = encodeURIComponent(`${xmin},${ymin},${xmax},${ymax}`);

  const arcgisPolygon = getArcGISPolygon(decodedOCL);

  const identifyUrl = `http://copernicus.discomap.eea.europa.eu/arcgis/rest/services/Corine/CLC2012_WM/MapServer/identify?geometry=${encodeURIComponent(JSON.stringify(arcgisPolygon))}&geometryType=esriGeometryPolygon&tolerance=2&mapExtent=${arcgisbbox}&imageDisplay=10%2C10%2C96&returnGeometry=false&f=pjson`;
  const tilePromise = fetch(identifyUrl).then(r => r.json());

  const tileData = await tilePromise;
  const layerData = await layerPromise;

  const terrainValues = tileData.results.map(obj => obj.value);

  const terrainTypes = layerData.drawingInfo.renderer.uniqueValueInfos
    .filter(info => terrainValues.indexOf(info.value) !== -1)
    .map(info => info.label.split(':')[1].trim());

  const obj = {};

  obj[plotCode] = terrainTypes;

  return obj;
}

/**
 *
 * @param {{ latitude: number, longitude: number }} coords
 */
export async function getTerrainDataFromLatLong (coords) {
  const openLocationCode = olcInstance.encode(coords.latitude, coords.longitude);

  return getTerrainDataFromPlotCode(openLocationCode);
}
