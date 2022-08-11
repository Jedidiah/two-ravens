import {
  Breadcrumbs,
  Flex,
  Item,
  TabList,
  TabPanels,
  Tabs,
  View,
} from '@adobe/react-spectrum';
import { useLocation } from '@redwoodjs/router';
import { parse } from 'query-string';
import { useCallback } from 'react';
import CameraTrapBatchesCell from 'src/components/CameraTrapBatch/CameraTrapBatchesCell';
import useUpdateQueryString from 'src/hooks/useUpdateQueryString';

const CameraTrapBatchesPage = () => {
  const { search } = useLocation();
  const { status = 'all', camera = undefined } = parse(search);
  const updateQuery = useUpdateQueryString();

  const switchTab = useCallback(
    (newStatus: string) => {
      updateQuery({ status: newStatus });
    },
    [updateQuery]
  );

  return (
    <>
      <Tabs
        aria-label="Camera Trap Batch Statuses"
        onSelectionChange={switchTab}
        defaultSelectedKey={String(status)}
      >
        <Flex
          direction="row"
          marginTop="size-500"
          alignContent="stretch"
          height="size-600"
        >
          <View alignSelf="center" width="size-3400" maxWidth="20vw">
            <Breadcrumbs>
              <Item key="home">Camera Trap Batches</Item>
            </Breadcrumbs>
          </View>
          <View flexGrow={1} paddingStart="size-500">
            <TabList>
              <Item key="all">All</Item>
              <Item key="approval">Awaiting Approval</Item>
              <Item key="signing">Awaiting Signing</Item>
              <Item key="signed">Ready to publish</Item>
              <Item key="published">Published</Item>
            </TabList>
          </View>
        </Flex>
        <TabPanels margin="2rem auto">
          <Item key="all">
            <div style={{ padding: '15px' }}>
              <CameraTrapBatchesCell cameraTrapId={camera} />
            </div>
          </Item>
          <Item key="approval">
            <div style={{ padding: '15px' }}>
              <CameraTrapBatchesCell status="approval" cameraTrapId={camera} />
            </div>
          </Item>
          <Item key="signing">
            <div style={{ padding: '15px' }}>
              <CameraTrapBatchesCell status="signing" cameraTrapId={camera} />
            </div>
          </Item>
          <Item key="signed">
            <div style={{ padding: '15px' }}>
              <CameraTrapBatchesCell status="signed" cameraTrapId={camera} />
            </div>
          </Item>
          <Item key="published">
            <div style={{ padding: '15px' }}>
              <CameraTrapBatchesCell status="published" cameraTrapId={camera} />
            </div>
          </Item>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default CameraTrapBatchesPage;
