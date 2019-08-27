import { degreesToMeters } from './helpers.js';

export function testDegreesToMeters () {
  const result = degreesToMeters(10.698893, 59.927666);

  if (
    result.x === 1190995.3206459312 &&
    result.y === 8383651.098022533
  ) {
    return true;
  } else {
    throw new Error('x or y did not get a correct value')
  }
}
