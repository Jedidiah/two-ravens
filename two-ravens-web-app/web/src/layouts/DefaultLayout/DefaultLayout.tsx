import { Grid, View } from '@adobe/react-spectrum';

import MainMenu from 'src/components/MainMenu/MainMenu';

type DefaultLayoutProps = {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Grid
        areas={['header  header', 'content content', 'footer  footer']}
        columns={['20rem', 'auto']}
        rows={['size-1000', 'auto', 'size-1000']}
        gap="0"
      >
        <View backgroundColor="gray-200" gridArea="header">
          <MainMenu />
        </View>
        <View gridArea="content">
          <div style={{ minHeight: '90vh' }}>{children}</div>
        </View>
        <View backgroundColor="magenta-600" gridArea="footer" />
      </Grid>
    </>
  );
};

export default DefaultLayout;
