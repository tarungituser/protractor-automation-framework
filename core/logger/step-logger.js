/* eslint-disable no-undef,no-buffer-constructor,max-len */
import * as log4js from 'log4js';
import { browser } from 'protractor';

export class StepLogger {
    static logger;
    static stepIdVar = '';
    static id;
    static testCaseId;
    static logMessages = '';
    static debug = process.env.DEBUG || true;

    static set caseId(theCaseId) {
      this.testCaseId = theCaseId;
      this.logger = log4js.getLogger(`C${theCaseId}`);
      this.logger.debug(this.logMessages);
      this.id = 1;
      this.logMessages = '';
    }

    static step(stepName) {
      let operation = 'Pre-Condition';
      if (this.testCaseId) {
        operation = 'Step';
      }
      this.commonLogger(operation, stepName);
    }

    static stepId(optionalId = 0) {
      this.id = optionalId > 0 ? optionalId : this.id + 1;
      this.commonLogger('Step Id', this.id.toString());
    }

    static commonLogger(operation, step) {
      const message = `${this.stepIdVar}- *${operation}* - ${step}`;
      if (this.debug) {
        console.log(`${this.testCaseId || ''}${message}`);
      }
      if (!process.env.NO_ALLURE) {
        allure.createStep(message, () => {
        })();
      }
      if (this.logger) {
        this.logger.debug(message);
      } else {
        this.logMessages += message;
      }
    }

    static verification(verificationDescription) {
      this.takeScreenShot();
      this.commonLogger('Verification', verificationDescription);
    }

    static takeScreenShot() {
      browser.takeScreenshot().then((png) => {
        if (!process.env.NO_ALLURE) {
          allure.createAttachment('Screenshot', () => new Buffer(png, 'base64'), 'image/png')();
        }
      });
    }

    /**
     * Called for any precondition related step-log shown towrds Spec file, never used anywhere else such as validation/helper
     * @param {string} preConditionDescription
     */
    static preCondition(preConditionDescription) {
      this.commonLogger('Pre-Condition', preConditionDescription);
    }

    static postCondition(postConditionDescription) {
      this.commonLogger('Post-Condition', postConditionDescription);
    }

    /**
     * Called wherever a helper/validation method need to have a step/action step significant enough to log
     * @param {string} stepName
     */
    static subStep(stepName) {
      this.commonLogger('Sub-Step', stepName);
    }

    /**
     * Called wherever a helper/validation method need to have a verification step significant enough to log
     * @param {string} verificationDescription
     */
    static subVerification(verificationDescription) {
      this.commonLogger('Sub-Verification', verificationDescription);
    }
}
