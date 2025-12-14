import { test} from '@playwright/test';
import * as dotenv from 'dotenv';
import { APIClient } from '../../utils/api/apiClient';

import { responseBodyValidator } from '../../utils/validators/responseBodyValidator';
import { responseCodeValidator } from '../../utils/validators/responseCodeValidator';
import { statusCodeValidator } from '../../utils/validators/statusCodeValidator';

import putAllBrandsBody from '../../testData/apiTestData/putAllBrands.json'
import loginWithoutEmailBody from '../../testData/apiTestData/loginWithoutEmail.json'
import deleteLoginBody from '../../testData/apiTestData/deleteLogin.json'

dotenv.config();

test.beforeEach('Initialize client', async({page})=>{
    const client = new APIClient()
    await client.init()

test('API 7: POST To Verify Login with valid details', async({request})=>{
    const response = await client.putAllBrands()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,405)
    await responseBodyValidator.validateResponseBody(response,putAllBrandsBody)
})

test('API 8: POST To Verify Login without email parameter', async({request})=>{
    const response = await client.putAllBrands()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,400)
    await responseBodyValidator.validateResponseBody(response,loginWithoutEmailBody)
})

test('API 9: DELETE To Verify Login', async({request})=>{
    const response = await client.putAllBrands()
    await statusCodeValidator.validateStatusCode(response,200)
    await responseCodeValidator.validateResponseCode(response,405)
    await responseBodyValidator.validateResponseBody(response,deleteLoginBody)
})


})