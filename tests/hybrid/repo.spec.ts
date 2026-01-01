import {test,expect} from 'playwright/test'
import { LoginPage } from '../../pageObjects/UIpageObjects/login.ts'
import { APIClient } from '../../utils/api/apiClient.ts'
import { HomePage } from '../../utils/home.ts'
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator.ts'
import { IssuePage } from '../../pageObjects/UIpageObjects/issuePage.ts'
import * as dotenv from 'dotenv';
import { IssueUpdatePayload } from '../../pageObjects/APIpageObjects/updateIssuePayload.ts'

dotenv.config();

const userName = process.env.ADMIN_NAME;
if(!userName){
    throw "User name is not defined in env file"
}

const password = process.env.PASSWORD;

test('Create repo and validate', async({page}) => {
    const client = new APIClient()
    await client.init();

    const reponame = `pw-api-${Date.now()}`
    await client.createNewRepo(reponame, 'dummydesc');

    const homePage = new HomePage(page)
    await homePage.navigateToUrl();
    await homePage.signInLink.click()

    const loginPage = new LoginPage(page);
    await loginPage.signIn(userName, password);

    //verify repo is preset on UI
    await homePage.navigateToHome();
    expect(await homePage.isRepoPresent(userName, reponame)).toBeTruthy();

    await client.deleteRepo(userName, reponame) 

})


test('Delete a repo and validate', async({page}) => {
    const client = new APIClient()
    await client.init();

    const reponame = `pw-api-${Date.now()}`
    await client.createNewRepo(reponame, 'dummydesc');

    const homePage = new HomePage(page)
    await homePage.navigateToUrl();
   
    //verify repo is preset on UI
    await homePage.navigateToHome();
    expect(await homePage.isRepoPresent(userName, reponame)).toBeTruthy();

    const deleteResponse = await client.deleteRepo(userName,reponame);
    await statusCodeValidator.validateStatusCode(deleteResponse,204)

    await homePage.navigateToHome();
    expect(await homePage.isRepoPresent(userName, reponame)).toBeFalsy();


})
