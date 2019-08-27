import ArcgisToGeoJSONUtils from '@esri/arcgis-to-geojson-utils';

/**
 * @typedef {DecodedOpenLocationCode}
 * @prop {number} latitudeCenter
 * @prop {number} longitudeCenter
 * @prop {number} latitudeLo
 * @prop {number} longitudeLo
 * @prop {number} longitudeHi
 * @prop {number} latitudeHi
 */

 /**
 * @typedef {ArcGISPolygon}
 * @prop {Array.<number[]} rings
 * @prop {number} spatialReference
 */

/**
 * Converts latitude and longitue degrees to WSG84 meters.
 *
 * @param {number} longitude
 * @param {number} latitude
 * @returns {{ x: number, y: number }}
 */
export function degreesToMeters(longitude, latitude) {
  const x = longitude * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360)) / (Math.PI / 180);

  y = y * 20037508.34 / 180;

  return { x, y };
}

/**
 * @param {DecodedOpenLocationCode} decodedOpenLocationCode
 * @returns {{ xmin: number, ymin: number, xmax: number, ymax: number }}
 */
export function getBoundsInMeters(decodedOpenLocationCode) {
  const { x: xmin, y: ymin } = degreesToMeters(decodedOpenLocationCode.longitudeLo, decodedOpenLocationCode.latitudeLo);
  const { x: xmax, y: ymax } = degreesToMeters(decodedOpenLocationCode.longitudeHi, decodedOpenLocationCode.latitudeHi);

  return { xmin, ymin, xmax, ymax };
}

/**
 * @param {DecodedOpenLocationCode} decodedOpenLocationCode
 * @returns {ArcGISPolygon}
 */
export function getArcGISPolygon(decodedOpenLocationCode) {
  const { xmin, ymin, xmax, ymax } = getBoundsInMeters(decodedOpenLocationCode);

  const wsg84geoJSONPolygon = {
    type: 'Polygon',
    coordinates: [[
      [xmin, ymin],
      [xmax, ymin],
      [xmax, ymax],
      [xmin, ymax],
      [xmin, ymin]
    ]]
  };

  return Object.assign({}, ArcgisToGeoJSONUtils.geojsonToArcGIS(wsg84geoJSONPolygon), { spatialReference: 102100 });
}