import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
    test('navigation should be visible on desktop', async ({ page, isMobile }) => {
        test.skip(isMobile, 'This test is only for desktop viewports');
        await page.goto('/');

        // Verify logo is visible
        await expect(page.getByTestId('site-logo')).toBeVisible();

        // Verify desktop nav items are visible
        await expect(page.getByTestId('nav-item-home')).toBeVisible();
        await expect(page.getByTestId('nav-item-about')).toBeVisible();
        await expect(page.getByTestId('nav-item-teachers')).toBeVisible();
    });

    test('mobile menu should work correctly', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile viewports');

        await page.goto('/');

        // Desktop navigation should be hidden
        await expect(page.getByTestId('nav-item-home')).not.toBeVisible();

        // Mobile menu toggle should be visible
        const menuToggle = page.getByTestId('mobile-menu-toggle');
        await expect(menuToggle).toBeVisible();

        // Open mobile menu
        await menuToggle.click();

        // Mobile nav items should appear
        await expect(page.getByTestId('nav-item-mobile-home')).toBeVisible();
        await expect(page.getByTestId('nav-item-mobile-about')).toBeVisible();

        // Close mobile menu (by clicking Home)
        await page.getByTestId('nav-item-mobile-home').click();

        // Mobile nav should be hidden again
        await expect(page.getByTestId('nav-item-mobile-home')).not.toBeVisible();
    });
});
