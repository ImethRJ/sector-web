import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
    test('should show login form on /management-portal', async ({ page }) => {
        await page.goto('/management-portal');

        // Check if the login form elements are present
        await expect(page.getByTestId('login-email')).toBeVisible();
        await expect(page.getByTestId('login-password')).toBeVisible();
        await expect(page.getByTestId('login-submit')).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.goto('/management-portal');

        await page.getByTestId('login-email').fill('wrong@sectorinstitute.lk');
        await page.getByTestId('login-password').fill('wrongpassword');
        await page.getByTestId('login-submit').click();

        // Expect an error message (based on AdminPage.jsx logic)
        await expect(page.locator('text=Invalid credentials')).toBeVisible();
    });

    // NOTE: This test requires valid credentials. 
    // You might want to use environment variables for these.
    test.skip('should login successfully with valid credentials', async ({ page }) => {
        await page.goto('/management-portal');

        await page.getByTestId('login-email').fill('admin@sectorinstitute.lk');
        await page.getByTestId('login-password').fill('your-real-password');
        await page.getByTestId('login-submit').click();

        // Check for dashboard elements
        await expect(page.locator('text=Admin Dashboard')).toBeVisible();
    });
});
