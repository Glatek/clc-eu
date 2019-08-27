import { degreesToMeters } from './helpers.js';

(function testDegreesToMeters () {
  console.log('degressToMeters');

  const result = degreesToMeters(10.698893, 59.927666);

  if (
    result.x === 1190995.3206459312 &&
    result.y === 8383651.098022533
  ) {
    console.log("\t Test passed");
    process.exit(0);
  } else {
    process.exit(1);
  }
})();