import { test} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';
import { schemaValidator } from '../../utils/validators/schemaValidator';
import { responseBodyValidator } from '../../utils/validators/responseBodyValidator';
import { responseCodeValidator } from '../../utils/validators/responseCodeValidator';
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator';
import expectedSchema from '../../testData/schemas/fetchRepoSchema.json'

dotenv.config();

let client: APIClient;

test.beforeEach(async () => {
  client = new APIClient();
  await client.init();
});

test('API 1: Create a new repo', async () => {
  const response = await client.createNewRepo(`pw-api-${Date.now()}`, 'dummydesc');
  await statusCodeValidator.validateStatusCode(response, 201);
});

test('API 2: Delete a repo', async () => {
  const reponame = `pw-api-${Date.now()}`
  const response1 = await client.createNewRepo(reponame, 'dummydesc');
  await statusCodeValidator.validateStatusCode(response1, 201);
  const response2 = await client.deleteRepo(`Ayushtest123`, reponame);
  await statusCodeValidator.validateStatusCode(response2, 204);
});

test('API 3: Get a repo', async () => {
  const reponame = `pw-api-${Date.now()}`
  const response1 = await client.createNewRepo(reponame, 'dummydesc');
  await statusCodeValidator.validateStatusCode(response1, 201);
  const response = await client.fetchRepo(`Ayushtest123`, reponame);
  await statusCodeValidator.validateStatusCode(response, 200);
  await schemaValidator.validateSchema(response, expectedSchema )
});
