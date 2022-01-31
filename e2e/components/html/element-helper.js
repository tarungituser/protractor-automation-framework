/* eslint-disable consistent-return */
import { browser, by, element, protractor, By } from 'protractor';

import { WaitHelper } from './wait-helper';

export class ElementHelper {
    static EC = protractor.ExpectedConditions;

    static async getBrowser() {
      const capabilities = await browser.getCapabilities();
      return capabilities.get('browserName');
    }

    static async actionMouseMove(item) {
      await WaitHelper.waitForElementToBeDisplayed(item);
      return browser.actions().mouseMove(item).perform();
    }

    static async actionMouseDown(item) {
      await WaitHelper.waitForElementToBeDisplayed(item);
      return browser.actions().mouseDown(item).perform();
    }

    static async actionDragAndDrop(source, destination) {
      return browser.actions().dragAndDrop(source, destination).perform();
    }

    static async actionDoubleClick(optElementOrButton, optButton) {
      if (optElementOrButton) {
        return browser.actions().doubleClick(optElementOrButton).perform();
      }
      if (optButton) {
        return browser.actions().doubleClick(optButton).perform();
      }
    }

    static async actionClick(optElementOrButton, optButton) {
      if (optElementOrButton) {
        return browser.actions().click(optElementOrButton).perform();
      }
      if (optButton) {
        return browser.actions().click(optButton).perform();
      }
    }

    static async actionHoverOver(locator) {
      return browser.actions().mouseMove(locator).perform();
    }

    static async actionHoverOverAndClick(hoverOverLocator, clickLocator) {
      return browser.actions().mouseMove(hoverOverLocator).click(clickLocator).perform();
    }

    static async hasOption(select, option) {
      return select
        .element(by.cssContainingText('option', option))
        .isPresent();
    }

    static async getFocusedElement() {
      return browser
        .driver
        .switchTo()
        .activeElement();
    }

    static async currentSelectedOptionByText(text) {
      const selector = `//option[@selected="selected" and normalize-space(.)="${text}"]`;
      return element(By.xpath(selector));
    }

    static async getSelectedOption(select) {
      return select.element(By.css('option[selected]'));
    }

    static async isVisible(locator) {
      return this.EC.visibilityOf(locator);
    }

    static async isNotVisible(locator) {
      return this.EC.invisibilityOf(locator);
    }

    static async inDom(locator) {
      return this.EC.presenceOf(locator);
    }

    static async notInDom(locator) {
      return this.EC.stalenessOf(locator);
    }

    static async isClickable(locator) {
      return this.EC.elementToBeClickable(locator);
    }

    static async hasText(locator, text) {
      return this.EC.textToBePresentInElement(locator, text);
    }

    static async titleIs(title) {
      return this.EC.titleIs(title);
    }

    static async hasClass(locator, klass) {
      const classes = await locator.getAttribute('class');
      return classes && classes.split(' ').indexOf(klass) !== -1;
    }

    static async hasClassRegex(locator, klass) {
      const classAttribute = await locator.getAttribute('class');
      const pattern = new RegExp(`(^|\\s)${klass}(\\s|$)`);
      return pattern.test(classAttribute);
    }

    static async click(targetElement) {
      await WaitHelper.waitForElementToBeClickable(targetElement);
      return targetElement.click();
    }

    static async clickIfPresent(targetElement) {
      const isPresent = await targetElement.isPresent();
      if (isPresent) {
        return this.click(targetElement);
      }
    }

    static async clickUsingJs(targetElement) {
      await WaitHelper.waitForElementToBeClickable(targetElement);
      return this.clickUsingJsNoWait(targetElement);
    }

    static async clickUsingJsNoWait(targetElement) {
      return browser.executeScript('arguments[0].click();', await targetElement.getWebElement());
    }

    static async selectDropDownByIndex(elementt, optionNum) {
      if (optionNum) {
        const options = await elementt.findElements(by.tagName('option'));
        await options[optionNum].click();
      }
    }

    static async scrollToElement(elementt) {
      await browser.executeScript('arguments[0].scrollIntoView();', elementt.getElementFinder());
    }

    static async getAttributeValue(elem, attribute) {
      const value = await elem.getAttribute(attribute);
      return value.trim();
    }

    static async getText(elem) {
      await WaitHelper.waitForElementToHaveText(elem);
      const text = await elem.getText();
      return text.trim();
    }

    static async openLinkInNewTabUsingTarget(targetElement) {
      const script = 'const item = arguments[0];item.setAttribute("target", "_blank");item.click()';
      await browser.executeScript(script, await targetElement.getWebElement());
    }

    static async openLinkInNewTabUsingWindowOpener(targetElement) {
      const script = 'return window.open(arguments[0].getAttribute("href"),"_blank")';
      await browser.executeScript(script, await targetElement.getWebElement());
    }
}
