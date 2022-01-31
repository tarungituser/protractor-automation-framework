import { StepLogger } from '../../../../core/logger/step-logger';
import { SuiteNames } from '../../helpers/suite-names';

describe(SuiteNames.e2eTestSuite, () => {
  it('T1 - Verify user is able to Retrieve all the registries - [15997231]', async () => {
    StepLogger.caseId = 15997231;
    StepLogger.step('I want this step to be there in report');
    StepLogger.verification('I want this verification to be there in report');
  });
});
