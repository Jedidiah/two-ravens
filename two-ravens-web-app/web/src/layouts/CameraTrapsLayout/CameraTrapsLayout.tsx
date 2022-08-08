import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type CameraTrapLayoutProps = {
  children: React.ReactNode;
};

const CameraTrapsLayout = ({ children }: CameraTrapLayoutProps) => {
  return (
    <div className="">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      {/* <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.cameraTraps()} className="rw-link">
            Camera Traps
          </Link>
        </h1>
        <Link to={routes.newCameraTrap()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Camera Trap
        </Link>
      </header> */}
      <main style={{ padding: '0 2rem' }}>{children}</main>
    </div>
  );
};

export default CameraTrapsLayout;
