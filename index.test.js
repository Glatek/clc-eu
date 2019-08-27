import {
  getTerrainDataFromPlotCode,
  getTerrainDataFromLatLong
} from './index.js';

export async function testGetTerrainDataFromPlotCode () {
  console.log('getTerrainDataFromPlotCode');

  const result = await getTerrainDataFromPlotCode('9FFGWP5P+2R');

  if (
    result['9FFGWP5P+2R'].includes('Continuous urban fabric')
  ) {
    return true;
  } else {
    throw new Error('Plot code did not contain the assumed terrain');
  }
}

export async function testGetTerrainDataFromLatLong () {
  const result = await getTerrainDataFromLatLong({
    latitude: 59.927666,
    longitude: 10.698893
  });

  if (
    result['9FFGWMHX+3H'].includes('Green urban areas')
  ) {
    return true;
  } else {
    throw new Error('Plot code did not contain the assumed terrain');
  }
}
