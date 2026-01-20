import {test, expect} from 'playwright/test'
import { LoginPage } from './pageObjects/UIpageObjects/login'; 
import { HomePage } from './utils/home'
import * as dotenv from 'dotenv';

dotenv.config();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

test('signIn',{tag: '@setup'}, async({page})=>{

    test.setTimeout (60000);
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)

    await homePage.navigateToUrl();
    await homePage.signInLink.click()
    await loginPage.signIn(userName, password)
    await homePage.openUserMenu()
    expect(homePage.isUserMenuVisible()).toBeTruthy();
    //expect(homePage.isUsernameVisible(userName)).toBeTruthy()
    await page.context().storageState({ path: 'auth.json' });
    
})