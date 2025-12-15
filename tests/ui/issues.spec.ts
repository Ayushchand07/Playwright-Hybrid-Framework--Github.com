import {test, expect} from 'playwright/test'
import { LoginPage } from '../../pageObjects/UIpageObjects/login'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { IssuePage } from '../../pageObjects/UIpageObjects/issuePage';
import { faker } from '@faker-js/faker';
dotenv.config();

const userName = process.env.ADMIN_NAME;
const password = process.env.PASSWORD; 

test.beforeEach('signIn', async({page})=>{
    const loginPage = new LoginPage(page)
    const homePage = new HomePage(page)

    await homePage.navigateToUrl();
    await homePage.signInLink.click()
    await loginPage.signIn(userName, password)
    await homePage.openUserMenu()
    expect(homePage.isUserMenuVisible()).toBeTruthy();
    //expect(homePage.isUsernameVisible(userName)).toBeTruthy()
    await homePage.page.waitForTimeout(5000)
})

test('Create new issue', async({page})=>{
   test.setTimeout(60000)
   const homePage = new HomePage(page);
   const issuePage = new IssuePage(page);
   await homePage.navigateToMyIssues();
   const issueName = `pw-e2e-${Date.now()}-${faker.word.noun()}`.toLowerCase();
   const issueDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;
   await issuePage.createNewIssue(issueName, issueDescription);
   await homePage.navigateToMyIssues();
   expect(issuePage.isIssuePresent(issueName )).toBeTruthy()
})




