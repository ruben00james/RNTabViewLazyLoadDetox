import detox, {device} from 'detox';

// is executed before each test file run
beforeAll(async () => {
  await detox.init();
  await device.launchApp();
});

// is executed before each test run
beforeEach(async () => {
  await device.reloadReactNative();
});

// is executed after each test file run
afterAll(async () => {
  await detox.cleanup();
});
