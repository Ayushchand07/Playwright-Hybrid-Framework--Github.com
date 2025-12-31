import { test} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';
import getAllProductsBody from '../../testData/apiTestData/getAllProducts.json';
import getAllProductsSchema from '../../testData/schemas/getAllProducts.schema.json'
import { schemaValidator } from '../../utils/validators/schemaValidator';
import { responseBodyValidator } from '../../utils/validators/responseBodyValidator';
import { responseCodeValidator } from '../../utils/validators/responseCodeValidator';
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator';

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
  const response = await client.deleteRepo(`Ayushtest123`, 'hgf');
  await statusCodeValidator.validateStatusCode(response, 204);
});

test('API 3: Fetch a repo', async () => {
  const response = await client.fetchRepo(`Ayushtest123`, 'pw-e2e-1765813549690-yogurt');
  await statusCodeValidator.validateStatusCode(response, 200);
});
