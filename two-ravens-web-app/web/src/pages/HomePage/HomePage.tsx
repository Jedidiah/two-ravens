import { MetaTags } from '@redwoodjs/web';

import PublicMap from 'src/components/PublicMap/PublicMap';

const HomePage = () => {
  return (
    <>
      <MetaTags title="Two Ravens" description="Memory and Thought" />

      <PublicMap />
    </>
  );
};

export default HomePage;
