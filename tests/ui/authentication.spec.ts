import {test, expect} from 'playwright/test'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { LogoutPage } from '../../pageObjects/UIpageObjects/logout';
dotenv.config();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

test('signOut', {tag: '@ui'}, async({page})=>{
    const homePage = new HomePage(page)
    const logoutPage = new LogoutPage(page)

    await homePage.navigateToUrl();
    await homePage.openUserMenu()
    expect(homePage.isUserMenuVisible()).toBeTruthy();
    await homePage.signOutLink.click()
    expect(logoutPage.signOutPageHeading).toBeVisible()
    await logoutPage.signOut(userName);
})




