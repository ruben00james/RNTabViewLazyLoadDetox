import {element, by, expect} from 'detox';

describe('Example', () => {
  it('should click on second tab and expect item 2', async () => {
    await element(by.label('Second')).tap();
    await expect(element(by.text('Item 2'))).toBeVisible();
  });
});
