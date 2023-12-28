import { setupBrowserHooks, getBrowserState } from './utils';

describe('App test', function () {
  setupBrowserHooks();
  it('is running', async function () {
    const { page } = getBrowserState();
    // const element = await page.locator('::-p-text(pwa-app)').wait();
    const element = await page.locator('button').wait();

    expect(element).not.toBeNull();
  });
});
