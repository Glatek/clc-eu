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
