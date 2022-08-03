import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type CameraTrapLayoutProps = {
  children: React.ReactNode
}

const CameraTrapsLayout = ({ children }: CameraTrapLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.cameraTraps()}
            className="rw-link"
          >
            CameraTraps
          </Link>
        </h1>
        <Link
          to={routes.newCameraTrap()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New CameraTrap
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default CameraTrapsLayout
