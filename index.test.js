import {
  getTerrainDataFromPlotCode,
  getTerrainDataFromLatLong
} from './index.js';

(async function testGetTerrainDataFromPlotCode () {
  console.log('getTerrainDataFromPlotCode');

  const result = await getTerrainDataFromPlotCode('9FFGWP5P+2R');

  if (
    result['9FFGWP5P+2R'].includes('Continuous urban fabric')
  ) {
    console.log("getTerrainDataFromPlotCode>Test passed");
    process.exit(0);
  } else {
    console.log('getTerrainDataFromPlotCode>Test failed');
    process.exit(1);
  }
})();

(async function testGetTerrainDataFromLatLong () {
  console.log('getTerrainDataFromLatLong');

  const result = await getTerrainDataFromLatLong({
    latitude: 59.927666,
    longitude: 10.698893
  });

  if (
    result['9FFGWMHX+3H'].includes('Green urban areas')
  ) {
    console.log("getTerrainDataFromLatLong>Test passed");
    process.exit(0);
  } else {
    console.log('getTerrainDataFromLatLong>Test failed');
    process.exit(1);
  }
})();