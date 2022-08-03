import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type CameraTrapBatchApprovalLayoutProps = {
  children: React.ReactNode
}

const CameraTrapBatchApprovalsLayout = ({ children }: CameraTrapBatchApprovalLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.cameraTrapBatchApprovals()}
            className="rw-link"
          >
            CameraTrapBatchApprovals
          </Link>
        </h1>
        <Link
          to={routes.newCameraTrapBatchApproval()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New CameraTrapBatchApproval
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default CameraTrapBatchApprovalsLayout
