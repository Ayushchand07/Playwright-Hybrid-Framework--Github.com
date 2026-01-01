import { test} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';
import { schemaValidator } from '../../utils/validators/schemaValidator';
import { responseBodyValidator } from '../../utils/validators/responseBodyValidator';
import { responseCodeValidator } from '../../utils/validators/responseCodeValidator';
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator';
import { IssueUpdatePayload } from '../../pageObjects/APIpageObjects/updateIssuePayload';

dotenv.config();

const userName = process.env.ADMIN_NAME;
if(!userName){
    throw "User name is not defined in env file"
}

let client: APIClient;

test.beforeEach(async () => {
  client = new APIClient();
  await client.init();
});

test('API 1: Create a new issue', async () => {
  const repoName = `Repo-api-${Date.now()}`
  await client.createNewRepo(repoName, 'dummydesc')
  
  const issueName = `Issue-API-${Date.now()}`
  const response = await client.createNewIssue(userName,repoName, issueName);
  await statusCodeValidator.validateStatusCode(response, 201);
});

test('API 2: Get an issue', async () => {
  const repoName = `Repo-api-${Date.now()}`
  await client.createNewRepo(repoName, 'dummydesc')
  
  const issueName = `Issue-API-${Date.now()}`
  const response = await client.createNewIssue(userName,repoName, issueName);
  await statusCodeValidator.validateStatusCode(response, 201);

  const responseBody = await response.json();
  const issueNumber = responseBody.number;

  const response1 = await client.fetchIssue(userName, repoName, issueNumber)
  await statusCodeValidator.validateStatusCode(response1, 200);
});

test('API 3: Update an issue', async () => {
  test.setTimeout(50000);
  const repoName = `Repo-api-${Date.now()}`
  await client.createNewRepo(repoName, 'dummydesc')
  
  const issueName = `Issue-API-${Date.now()}`
  const response = await client.createNewIssue(userName,repoName, issueName);
  await statusCodeValidator.validateStatusCode(response, 201);

  const responseBody = await response.json();
  const issueNumber = responseBody.number;
  
  const updatePayload: IssueUpdatePayload = {
    "title": `UPDATED_Issue-API-${Date.now()}`,
    "body": `Updated description-${Date.now()}`,
  };
      
    const response1 = await client.updateIssue(userName, repoName, issueNumber,updatePayload)
    await statusCodeValidator.validateStatusCode(response1, 200);
});

