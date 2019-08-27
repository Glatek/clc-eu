import * as HelperTests from './helpers.test.js';
import * as IndexTests from './index.test.js';

function runTests (testCollection) {
  return Object.keys(testCollection).map(async testName => {
    try {
      await testCollection[testName]();
      console.log(`✅ ${testName} succeeded.`);
    } catch (error) {
      console.log(`⚠️ ${testName} failed.`);
    }
  });
}

const helperTests = runTests(HelperTests);
const indextests = runTests(IndexTests);

Promise.all([
  ...helperTests,
  ...indextests,
])
  .then(() => console.log('Success. All tests passed.'))
  .catch(error => process.exit(1));
