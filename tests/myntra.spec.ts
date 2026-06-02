import { test, expect } from '@playwright/test';

test.only('test', async ({ page }) => {
  await page.goto('https://www.myntra.com/');
  await page.locator('#desktop-header-cnt').getByRole('link', { name: 'Men', exact: true }).hover();
  await page.getByRole('link', { name: 'Casual Trousers' }).click();

  //drop down menu
  await page.getByText('Sort by :').click();
  await page.getByText('What\'s New').click();

  await page.waitForTimeout(2000);


  //click on 20% and above discount radio button if not already selected
  const discountRadio = page.locator(
    'input[type="radio"][value="20.0 TO 100.0"]'
  );
  const isSelected = await discountRadio.isChecked();

  if (!isSelected) {
    await page
      .locator("//label[contains(normalize-space(text()), '20% and above')]")
      .click();
  }

  await page.waitForTimeout(2000);


  // drag left slider for price minimum 1000 Rs
  const slider = page.locator('#rootRailThumbLeft');
  const box = await slider.boundingBox();

  if (box) {
    await page.mouse.move(
      box.x + box.width / 2,
      box.y + box.height / 2
    );

    await page.mouse.down();

    await page.mouse.move(
      box.x + box.width / 2 + 17,
      box.y + box.height / 2
    );

    await page.mouse.up();
  }

  await page.waitForTimeout(2000);

  //keyboard event
  await page.goto('https://www.myntra.com/trousers/jeancherry/jeancherry-men-trousers/42686299/buy');
  await page.getByRole('textbox', { name: 'Enter pincode' }).click();
  await page.getByRole('textbox', { name: 'Enter pincode' }).fill('379205');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Enter pincode' }).press('Control+A');
  await page.waitForTimeout(2000);
  await page.getByRole('textbox', { name: 'Enter pincode' }).fill('370205');
  await page.getByRole('button', { name: 'Check' }).click();

});