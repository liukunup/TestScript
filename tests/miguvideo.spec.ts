import { test, expect } from '@playwright/test';
import { Parameterized } from '../utils/parameterized';

const inst = new Parameterized('../PhoneNumber.csv');
for (const record of inst.getRecords()) {
  // 咪咕视频
  test(`miguvideo: ${record.pn}`, async ({ page }) => {
    console.log(record.pn);

    await page.goto('https://www.miguvideo.com/');
    await page.locator('.user').first().click();
    await page.frameLocator('#login_frame').locator('.checkbox').first().click();
    await page.frameLocator('#login_frame').getByRole('textbox', { name: '手机号' }).fill(record.pn);
    await page.frameLocator('#login_frame').getByRole('button', { name: '获取验证码' }).click();
    await expect(page.frameLocator('#login_frame').getByRole('button', { name: '重新获取(59s)' })).toBeVisible();
  });
}