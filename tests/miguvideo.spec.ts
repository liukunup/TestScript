import { test, expect } from '@playwright/test';
import { envPhoneNumberReader, csvPhoneNumberReader } from '../utils/pnReader';

const pnReader = process.env.CI ? new envPhoneNumberReader() : new csvPhoneNumberReader('../PhoneNumber.csv');
for (const pn of pnReader.getPhoneNumberList()) {
  // 咪咕视频
  test(`miguvideo: ${pn}`, async ({ page }) => {
    console.log(pn);

    await page.goto('https://www.miguvideo.com/');
    await page.locator('.user').first().click();
    await page.frameLocator('#login_frame').locator('.checkbox').first().click();
    await page.frameLocator('#login_frame').getByRole('textbox', { name: '手机号' }).fill(pn);
    await page.frameLocator('#login_frame').getByRole('button', { name: '获取验证码' }).click();
    await expect(page.frameLocator('#login_frame').getByRole('button', { name: '重新获取(59s)' })).toBeVisible();
  });
}