import {test, expect} from 'playwright/test'
import { LoginPage } from '../../pageObjects/UIpageObjects/login'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { LogoutPage } from '../../pageObjects/UIpageObjects/logout';
dotenv.config();

const userName = process.env.ADMIN_NAME;
const password = process.env.PASSWORD;

test('singIn', async({page})=>{
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)

    await homePage.navigateToUrl();
    await homePage.signInLink.click()
    await loginPage.signIn(userName, password)
    await homePage.openUserMenu()
    expect(homePage.isUserMenuVisible()).toBeTruthy();
    expect(homePage.isUsernameVisible(userName)).toBeTruthy()
    
})

test('signOut', async({page})=>{
    const homePage = new HomePage(page)
    const loginPage = new LoginPage(page)
    const logoutPage = new LogoutPage(page)

   await homePage.navigateToUrl();
    await homePage.signInLink.click()
    await loginPage.signIn(userName, password)
    await homePage.openUserMenu()
    expect(homePage.isUserMenuVisible()).toBeTruthy();
    expect(homePage.isUsernameVisible(userName)).toBeTruthy()
    await homePage.signOutLink.click()
    expect(logoutPage.signOutPageHeading).toBeVisible()
    await logoutPage.signOut(userName);
})




