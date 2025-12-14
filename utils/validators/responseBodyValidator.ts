import { expect } from "playwright/test";

export class responseBodyValidator{
    static async validateResponseBody(response, expectedResponseBody){
        const responseBody = await response.json();
        expect(responseBody).toEqual(expectedResponseBody);
      }
}