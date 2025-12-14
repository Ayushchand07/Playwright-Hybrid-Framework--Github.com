import {test} from 'playwright/test'
import { LoginPage } from '../../utils/login'
import testData from '../../testData/uiTestData/testData.json'

test('login',async({page})=>{
    const loginPage = new LoginPage(page)
    await loginPage.navigateToUrl();
    await loginPage.login()
})


