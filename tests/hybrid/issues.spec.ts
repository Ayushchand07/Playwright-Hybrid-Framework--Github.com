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

test('Create issue and validate', async({page}) => {
    test.setTimeout(40000);
    const client = new APIClient()
    await client.init();

    const repoName = `pw-api-${Date.now()}`
    await client.createNewRepo(repoName, 'dummydesc');

    const homePage = new HomePage(page)
    await homePage.navigateToUrl();
    await homePage.navigateToMyIssues();

    const issuePage = new IssuePage(page)
    const issueName = `Issue-API-${Date.now()}`
    await issuePage.createNewIssue(issueName, 'dummy issue description',repoName)
    await page.waitForURL(/\/issues\/\d+$/);
    const url = page.url();
    const issueNumber = Number(url.split('/').pop());
    const response1 = await client.fetchIssue(userName, repoName, issueNumber)
    await statusCodeValidator.validateStatusCode(response1, 200);
})

test('Update issue and validate title', async({page}) => {

    test.setTimeout(70000);

    const updatePayload: IssueUpdatePayload = {
  "title": `UPDATED_Issue-API-${Date.now()}`,
  "body": `Updated description-${Date.now()}`,
};
    const updatedTitle = updatePayload.title

    const client = new APIClient()
    await client.init();

    const repoName = `pw-api-${Date.now()}`
    await client.createNewRepo(repoName, 'dummydesc');

    const homePage = new HomePage(page)
    await homePage.navigateToUrl();
    await homePage.navigateToMyIssues();

    const issuePage = new IssuePage(page)
    const issueName = `Issue-API-${Date.now()}`
    await issuePage.createNewIssue(issueName, 'dummy issue description',repoName)
    await page.waitForURL(/\/issues\/\d+$/);
    const url = page.url();
    const issueNumber = Number(url.split('/').pop());
    const response1 = await client.updateIssue(userName, repoName, issueNumber,updatePayload)
    await statusCodeValidator.validateStatusCode(response1, 200);
    await page.reload();
    await issuePage.validateIssueTitle(updatedTitle)
})

