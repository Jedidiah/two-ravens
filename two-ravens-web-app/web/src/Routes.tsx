// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, Private } from '@redwoodjs/router';

import CameraTrapBatchApprovalsLayout from 'src/layouts/CameraTrapBatchApprovalsLayout';
import CameraTrapBatchesLayout from 'src/layouts/CameraTrapBatchesLayout';
import CameraTrapEventsLayout from 'src/layouts/CameraTrapEventsLayout';
import CameraTrapsLayout from 'src/layouts/CameraTrapsLayout';
import DefaultLayout from 'src/layouts/DefaultLayout';

const Routes = () => {
  return (
    <Router>
      <Set wrap={DefaultLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        {/* <Route path="/signup" page={SignupPage} name="signup" /> */}
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
        <Route path="/" page={HomePage} name="home" />
        <Private unauthenticated="login">
          <Set wrap={CameraTrapEventsLayout}>
            <Route path="/camera-trap-events/new" page={CameraTrapEventNewCameraTrapEventPage} name="newCameraTrapEvent" />
            <Route path="/camera-trap-events/{id}/edit" page={CameraTrapEventEditCameraTrapEventPage} name="editCameraTrapEvent" />
            <Route path="/camera-trap-events/{id}" page={CameraTrapEventCameraTrapEventPage} name="cameraTrapEvent" />
            <Route path="/camera-trap-events" page={CameraTrapEventCameraTrapEventsPage} name="cameraTrapEvents" />
          </Set>

          <Set wrap={CameraTrapBatchApprovalsLayout}>
            <Route path="/camera-trap-batch-approvals/new" page={CameraTrapBatchApprovalNewCameraTrapBatchApprovalPage} name="newCameraTrapBatchApproval" />
            <Route path="/camera-trap-batch-approvals/{id}/edit" page={CameraTrapBatchApprovalEditCameraTrapBatchApprovalPage} name="editCameraTrapBatchApproval" />
            <Route path="/camera-trap-batch-approvals/{id}" page={CameraTrapBatchApprovalCameraTrapBatchApprovalPage} name="cameraTrapBatchApproval" />
            <Route path="/camera-trap-batch-approvals" page={CameraTrapBatchApprovalCameraTrapBatchApprovalsPage} name="cameraTrapBatchApprovals" />
          </Set>

          <Set wrap={CameraTrapBatchesLayout}>
            <Route path="/camera-trap-batches/new" page={CameraTrapBatchNewCameraTrapBatchPage} name="newCameraTrapBatch" />
            <Route path="/camera-trap-batches/{id}/edit" page={CameraTrapBatchEditCameraTrapBatchPage} name="editCameraTrapBatch" />
            <Route path="/camera-trap-batches/{id}" page={CameraTrapBatchCameraTrapBatchPage} name="cameraTrapBatch" />
            <Route path="/camera-trap-batches" page={CameraTrapBatchCameraTrapBatchesPage} name="cameraTrapBatches" />
          </Set>

          <Set wrap={CameraTrapsLayout}>
            <Route path="/camera-traps/new" page={CameraTrapNewCameraTrapPage} name="newCameraTrap" />
            <Route path="/camera-traps/{id}/edit" page={CameraTrapEditCameraTrapPage} name="editCameraTrap" />
            <Route path="/camera-traps/{id}" page={CameraTrapCameraTrapPage} name="cameraTrap" />
            <Route path="/camera-traps" page={CameraTrapCameraTrapsPage} name="cameraTraps" />
          </Set>
        </Private>
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  );
};

export default Routes;
