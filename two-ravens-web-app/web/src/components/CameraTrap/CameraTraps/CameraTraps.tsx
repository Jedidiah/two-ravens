import { useCallback } from 'react';

import {
  ActionButton,
  ActionGroup,
  Breadcrumbs,
  Button,
  Flex,
  Grid,
  Heading,
  Item,
  repeat,
  Text,
  View,
  Well,
  Link as SpectrumLink,
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Article from '@spectrum-icons/workflow/Article';
import ImageCheck from '@spectrum-icons/workflow/ImageCheck';

import { Link, navigate, routes } from '@redwoodjs/router';

import CameraTrapStatus from 'src/components/CameraTrapStatus/CameraTrapStatus';

const CameraTrapsList = ({ cameraTraps }) => {
  const onAddNewClick = useCallback(() => {
    navigate(routes.newCameraTrap());
  }, []);

  const onActionPress = useCallback((key: string) => {
    if (key.startsWith('view-')) {
      const id = key.replace('view-', '');
      navigate(routes.cameraTrap({ id }));
    }
    if (key.startsWith('viewBatches-')) {
      const id = key.replace('viewBatches-', '');
      navigate(routes.cameraTrapBatches({ camera: id }));
    }
  }, []);

  return (
    <div>
      {/* <Flex
        direction="row"
        marginTop="size-500"
        alignContent="stretch"
        height="size-600"
      >
        <View alignSelf="center" width="size-2000" maxWidth="20vw">
          <Breadcrumbs alignSelf="center">
            <Item key="cameraTraps">Camera Traps</Item>
          </Breadcrumbs>
        </View>

        <View alignSelf="center">
          <ActionButton onPress={onAddNewClick}>
            <Add />
            <Text> Add New Camera Trap</Text>
          </ActionButton>
        </View>
      </Flex> */}
      <Grid
        marginTop="size-500"
        justifyContent="center"
        columnGap="size-500"
        columns={repeat('auto-fit', 'size-4600')}
        autoRows="auto-fit"
      >
        <View
          padding="size-200"
          width="size-4600"
          maxWidth="100%"
          // borderColor="light"
          // borderWidth="thick"
          marginBottom="size-500"
        >
          <Flex direction="column" alignItems="start" justifyContent="stretch">
            <Heading level={1} width="100%" marginBottom="size-100">
              Camera Traps
            </Heading>
            <View flexGrow={1} maxWidth="size-3600">
              <p>
                Add a camera trap here for each physical device in your project,
                make sure to give each a unique name and to set the name on the
                device.
              </p>
            </View>
            <Button variant="cta" onPress={onAddNewClick}>
              <Add />
              <Text> Add New Camera Trap</Text>
            </Button>
          </Flex>
        </View>
        {cameraTraps.map((cameraTrap) => (
          <Link
            key={cameraTrap.id}
            to={routes.cameraTrap({ id: cameraTrap.id })}
            style={{ textDecoration: 'none', color: 'initial' }}
          >
            <View
              backgroundColor="static-white"
              borderRadius="medium"
              borderColor="light"
              borderWidth="thick"
              padding="size-200"
              width="size-4600"
              maxWidth="100%"
              marginBottom="size-500"
            >
              <Heading level={2}>
                <SpectrumLink>
                  <Text>{cameraTrap.deviceId}</Text>
                </SpectrumLink>
              </Heading>
              <Well>
                This camera has captured{' '}
                <strong>{cameraTrap.photos.length}</strong>&nbsp;photos across{' '}
                <strong>{cameraTrap.batches.length}</strong>&nbsp;
                {cameraTrap.batches.length === 1 ? 'batch' : 'batches'}
              </Well>
              <p>
                <CameraTrapStatus latestEvent={cameraTrap.events[0]} />
              </p>
              {/* <ActionGroup onAction={onActionPress}>
              <Item key={`view-${cameraTrap.id}`}>
                <Article /> <Text>View Details</Text>
              </Item>
              <Item key={`viewBatches-${cameraTrap.id}`}>
                <ImageCheck /> <Text>View Batches</Text>
              </Item>
            </ActionGroup> */}
            </View>
          </Link>
        ))}
      </Grid>
    </div>
  );
};

export default CameraTrapsList;
