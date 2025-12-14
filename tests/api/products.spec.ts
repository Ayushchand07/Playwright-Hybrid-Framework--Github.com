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

    const response = await client.getAllProducts()

    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,200)
    await schemaValidator.validateSchema(response,getAllProductsSchema)
    await responseBodyValidator.validateResponseBody(response,getAllProductsBody)

    //await performanceValidator.validatePerformance()

})

test ('API 2: POST To All Products List', async({request})=>{

    const response = await client.postAllProducts()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,405)
    await responseBodyValidator.validateResponseBody(response,postAllProductsBody)
})

test ('API 3: Get All Brands List', async({request})=>{

    const response = await client.getAllBrands()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,200)
    await schemaValidator.validateSchema(response, getAllBrandsSchema)
    await responseBodyValidator.validateResponseBody(response,getAllBrandsBody)

})

test('API 4: PUT To All Brands List', async({request})=>{
    const response = await client.putAllBrands()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,405)
    await responseBodyValidator.validateResponseBody(response,putAllBrandsBody)
})

// test('API 5: POST To Search Product', async({request})=>{
//     const response = await client.postSearchProduct()
//     await
// })


// test('API 6: POST To Search Product without search_product parameter', async({request})=>{
//     const response = await client.postSearchProduct()
//     await
// })






})