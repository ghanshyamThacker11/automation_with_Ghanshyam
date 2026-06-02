import { test, expect } from '@playwright/test';

test('Prompt ', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    
    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.accept('Learn automation with Ghanshyam');
    });
    
    await page.click('text=Click for JS Prompt');
    
    const result = await page.locator('#result').textContent();
    expect(result).toBe('You entered: Learn automation with Ghanshyam');

    await page.pause();
});