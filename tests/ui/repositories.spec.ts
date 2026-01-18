import {test, expect} from 'playwright/test'
import { HomePage } from '../../utils/home';
import * as dotenv from 'dotenv';
import { RepoPage } from '../../pageObjects/UIpageObjects/repoPage';
import { faker } from '@faker-js/faker';
dotenv.config();

const userName = process.env.USER_NAME;

test('Create new repository',{tag: '@ui'}, async({page})=>{
    test.setTimeout(60000)
   const homePage = new HomePage(page);
   const repoPage = new RepoPage(page);
   await homePage.navigateToUrl();
   await homePage.navigateToRepositories();
   const repoName = `pw-e2e-${Date.now()}-${faker.word.noun()}`.toLowerCase();
   const repoDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;
   await repoPage.createNewRepo(repoName, repoDescription);
   await homePage.navigateToHome();
   expect(await homePage.isRepoPresent(userName, repoName )).toBeTruthy()
})

test('Create new repository with no title',{tag: '@ui'}, async({page})=>{
    test.setTimeout(60000)
   const homePage = new HomePage(page);
   const repoPage = new RepoPage(page);
   await homePage.navigateToUrl();
   await homePage.navigateToRepositories();
   const repoName = ""
   const repoDescription = `E2E repository created by Playwright test for repo creation flow. Created at ${new Date().toISOString()}`;
   await repoPage.createNewRepo(repoName, repoDescription);
   await expect(await repoPage.emptyTitleErrorMessage).toBeVisible();
   
})




