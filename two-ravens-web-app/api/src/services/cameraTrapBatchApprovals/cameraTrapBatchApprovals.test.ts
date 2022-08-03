import {
  cameraTrapBatchApprovals,
  cameraTrapBatchApproval,
  createCameraTrapBatchApproval,
  updateCameraTrapBatchApproval,
  deleteCameraTrapBatchApproval,
} from './cameraTrapBatchApprovals';
import type { StandardScenario } from './cameraTrapBatchApprovals.scenarios';

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float and DateTime types.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe('cameraTrapBatchApprovals', () => {
  scenario(
    'returns all cameraTrapBatchApprovals',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapBatchApprovals();

      expect(result.length).toEqual(
        Object.keys(scenario.cameraTrapBatchApproval).length
      );
    }
  );

  scenario(
    'returns a single cameraTrapBatchApproval',
    async (scenario: StandardScenario) => {
      const result = await cameraTrapBatchApproval({
        id: scenario.cameraTrapBatchApproval.one.id,
      });

      expect(result).toEqual(scenario.cameraTrapBatchApproval.one);
    }
  );

  scenario(
    'creates a cameraTrapBatchApproval',
    async (scenario: StandardScenario) => {
      const result = await createCameraTrapBatchApproval({
        input: {
          userId: scenario.cameraTrapBatchApproval.two.userId,
          batchId: scenario.cameraTrapBatchApproval.two.batchId,
          approvedImages: 'String',
          rejectedImages: 'String',
        },
      });

      expect(result.userId).toEqual(
        scenario.cameraTrapBatchApproval.two.userId
      );
      expect(result.batchId).toEqual(
        scenario.cameraTrapBatchApproval.two.batchId
      );
      expect(result.approvedImages).toEqual('String');
      expect(result.rejectedImages).toEqual('String');
    }
  );

  scenario(
    'updates a cameraTrapBatchApproval',
    async (scenario: StandardScenario) => {
      const original = await cameraTrapBatchApproval({
        id: scenario.cameraTrapBatchApproval.one.id,
      });
      const result = await updateCameraTrapBatchApproval({
        id: original.id,
        input: { approvedImages: 'String2' },
      });

      expect(result.approvedImages).toEqual('String2');
    }
  );

  scenario(
    'deletes a cameraTrapBatchApproval',
    async (scenario: StandardScenario) => {
      const original = await deleteCameraTrapBatchApproval({
        id: scenario.cameraTrapBatchApproval.one.id,
      });
      const result = await cameraTrapBatchApproval({ id: original.id });

      expect(result).toEqual(null);
    }
  );
});
