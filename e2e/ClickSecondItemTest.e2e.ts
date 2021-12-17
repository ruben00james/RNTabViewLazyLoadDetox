import {element, by, expect} from 'detox';

describe('Example', () => {
  it('should click on second tab and expect item 2', async () => {
    // await element(by.text('Second')).tap();
    // await expect(element(by.text('Item 2'))).toBeVisible();
    await expect(element(by.text('Step One'))).toBeVisible();
  });
});
