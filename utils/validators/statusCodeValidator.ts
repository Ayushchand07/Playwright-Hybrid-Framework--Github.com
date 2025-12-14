import {expect} from 'playwright/test'

export class statusCodeValidator{
    static async validateStatusCode(response, expectedStatusCode){
    expect(response.status()).toBe(expectedStatusCode);
  }
}