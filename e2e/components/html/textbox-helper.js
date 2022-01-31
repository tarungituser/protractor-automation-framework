/* eslint-disable indent,no-await-in-loop,no-plusplus,no-use-before-define,function-paren-newline */
import { browser, protractor } from 'protractor';

import { VerboseLogger } from '../../../core/logger/verbose-logger';

import { WaitHelper } from './wait-helper';

export class TextBoxHelper {
    /**
     * Clears the existing text from an input elements
     * @param {ElementFinder} locator
     */
    static async clearText(locator) {
        let ctrl = protractor.Key.CONTROL;

        if (browser.platform && browser.platform.indexOf('Mac')) {
            ctrl = protractor.Key.COMMAND;
        }
        const command = protractor.Key.chord(ctrl, 'a') + protractor.Key.BACK_SPACE;
        await locator.sendKeys(command);
        await locator.clear();
    }

    /**
     * Send Keys to an input elements once it becomes available
     * @param {ElementFinder} locator for element
     * @param {string} value to be sent
     * @param {boolean} sendEnter for sending an enter key
     */
    static async sendKeys(locator,
                          value,
                          sendEnter = false) {
        await WaitHelper.waitForElementToBeDisplayed(locator);
        await this.clearText(locator);

        // On IE, text is sometimes not well sent, this is a workaround
        VerboseLogger.log(`Sending keys: ${value} to ${locator.locator().toString()}`);
        await locator.sendKeys(value);
        if (sendEnter) {
            await locator.sendKeys(protractor.Key.ENTER);
        }
    }

     static async typeSlowly(elm, keys, delay) {
        await WaitHelper.waitForElementToBeDisplayed(elm);
        VerboseLogger.log(`Sending keys slowly: ${keys} to ${elm.locator().toString()}`);
        await this.clearText(elm);
        for (let i = 0; i < keys.length; i++) {
            await elm.sendKeys(keys[i]);
            await sleep(delay);
        }
    }
}

async function sleep(ms = 0) {
    return await new Promise(r => setTimeout(r, ms));
}
