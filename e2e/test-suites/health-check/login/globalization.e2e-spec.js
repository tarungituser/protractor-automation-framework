
import { StepLogger } from '../../../../core/logger/step-logger';
import { SuiteNames } from '../../helpers/suite-names';
import { HomePageHelper } from '../../../page-objects/pages/homepage/home-page.helper';
import { PageHelper } from '../../../components/html/page-helper';

// THIS IS A POC TEST
describe(SuiteNames.e2eTestSuite, () => {
  it('Globalization test - [18176328][BUG:ABCD-19909]', async () => {
    StepLogger.caseId = 18176328;
    await PageHelper.maximizeWindow();
    StepLogger.preCondition('I am going to execute a tests');
    StepLogger.step('This is my test');
    StepLogger.subVerification('this must be there');
    StepLogger.verification('aah all good');
    await HomePageHelper.gotoDrupalHomePage();
    const text = await HomePageHelper.getDrupalHomePageDOM();
    console.log(text);
  });
});
