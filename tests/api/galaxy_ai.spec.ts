import { test} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';
import getAllProductsBody from '../../testData/apiTestData/getAllProducts.json';
import getAllProductsSchema from '../../testData/schemas/getAllProducts.schema.json'
import { schemaValidator } from '../../utils/validators/schemaValidator';
import { responseBodyValidator } from '../../utils/validators/responseBodyValidator';
import { responseCodeValidator } from '../../utils/validators/responseCodeValidator';
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator';
import postAllProductsBody from '../../testData/apiTestData/postAllProducts.json' 
import getAllBrandsBody from '../../testData/apiTestData/getAllBrands.json'
import getAllBrandsSchema from '../../testData/schemas/getAllBrands.schema.json'
import putAllBrandsBody from '../../testData/apiTestData/putAllBrands.json'


dotenv.config();

test.beforeEach('Initialize client', async({page})=>{
    const client = new APIClient()
    await client.init()

test('API 1: Get All Products List', async ({ request }) => {

    const response = await client.getVideoGenerator();
    //await performanceValidator.validatePerformance()

})
})
