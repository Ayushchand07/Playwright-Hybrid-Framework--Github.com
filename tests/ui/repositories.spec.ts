import {test, expect} from 'playwright/test'
import { LoginPage } from '../../pageObjects/UIpageObjects/login'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { LogoutPage } from '../../pageObjects/UIpageObjects/logout';
import { RepoPage } from '../../pageObjects/UIpageObjects/repoPage';
import { faker } from '@faker-js/faker';
dotenv.config();

const userName = process.env.ADMIN_NAME;
const password = process.env.PASSWORD; 

test.beforeEach('signIn', async({page})=>{
//     const loginPage = new LoginPage(page)
       const homePage = new HomePage(page)

       await homePage.navigateToUrl();
//     await homePage.signInLink.click()
//     await loginPage.signIn(userName, password)
//     await homePage.openUserMenu()
//     expect(homePage.isUserMenuVisible()).toBeTruthy();
//     //expect(homePage.isUsernameVisible(userName)).toBeTruthy()
//     await homePage.page.waitForTimeout(5000)
})

test('Create new repository', async({page})=>{
    test.setTimeout(60000)
   const homePage = new HomePage(page);
   const repoPage = new RepoPage(page);
   await homePage.navigateToRepositories();
   const repoName = `pw-e2e-${Date.now()}-${faker.word.noun()}`.toLowerCase();
   const repoDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;
   await repoPage.createNewRepo(repoName, repoDescription);
   await homePage.navigateToHome();
   expect(homePage.isRepoPresent(userName, repoName )).toBeTruthy()
})




