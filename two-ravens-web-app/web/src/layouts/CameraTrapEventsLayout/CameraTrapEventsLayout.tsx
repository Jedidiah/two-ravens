import { Link, routes } from '@redwoodjs/router';
import { Toaster } from '@redwoodjs/web/toast';

type CameraTrapEventLayoutProps = {
  children: React.ReactNode;
};

const CameraTrapEventsLayout = ({ children }: CameraTrapEventLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.cameraTrapEvents()} className="rw-link">
            CameraTrapEvents
          </Link>
        </h1>
        <Link
          to={routes.newCameraTrapEvent()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Camera Trap Event
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  );
};

export default CameraTrapEventsLayout;
