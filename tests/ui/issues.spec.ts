import {test, expect} from 'playwright/test'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { IssuePage } from '../../pageObjects/UIpageObjects/issuePage';
import { faker } from '@faker-js/faker';
import { RepoPage } from '../../pageObjects/UIpageObjects/repoPage';
import { LoginPage } from '../../pageObjects/UIpageObjects/login';
dotenv.config();

const userName = process.env.USER_NAME;
const password = process.env.PASSWORD;

test.beforeEach(async({page})=>{
    const homePage = new HomePage(page)
    await homePage.navigateToUrl();
    const loginPage = new LoginPage(page)
    await loginPage.signIn(userName, password);
    
    expect(homePage.isUserMenuVisible()).toBeTruthy();
})


test('Create new issue', async({page})=>{
   test.setTimeout(80000)

   const homePage = new HomePage(page);
   const issuePage = new IssuePage(page);
   const repoPage = new RepoPage(page)

   const repoName = `pw-api-${Date.now()}`
   const repoDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;

   await homePage.navigateToUrl(); 
   await homePage.navigateToRepositories();

   await repoPage.createNewRepo(repoName, repoDescription);

   await homePage.navigateToMyIssues();
   const issueName = `pw-e2e-${Date.now()}-${faker.word.noun()}`.toLowerCase();
   const issueDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;
   await issuePage.createNewIssue(issueName, issueDescription, repoName);
   await homePage.navigateToMyIssues();
   expect(issuePage.isIssuePresent(issueName )).toBeTruthy()
})




