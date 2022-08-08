import { useCallback } from 'react';

import {
  ActionButton,
  ActionGroup,
  Breadcrumbs,
  Flex,
  Grid,
  Heading,
  Item,
  repeat,
  StatusLight,
  Text,
  View,
  Well,
} from '@adobe/react-spectrum';
import Add from '@spectrum-icons/workflow/Add';
import Camera from '@spectrum-icons/workflow/Camera';
import CameraRefresh from '@spectrum-icons/workflow/CameraRefresh';
import humanize from 'humanize-string';

import { Link, navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/toast';

import { QUERY } from 'src/components/CameraTrap/CameraTrapsCell';
import Delete from '@spectrum-icons/workflow/Delete';
import ImageCheck from '@spectrum-icons/workflow/ImageCheck';
import Article from '@spectrum-icons/workflow/Article';

const DELETE_CAMERA_TRAP_MUTATION = gql`
  mutation DeleteCameraTrapMutation($id: String!) {
    deleteCameraTrap(id: $id) {
      id
    }
  }
`;

const MAX_STRING_LENGTH = 150;

const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value));
      return humanizedValues.join(', ');
    } else {
      return humanize(values as string);
    }
  }
};

const truncate = (text) => {
  let output = text;
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...';
  }
  return output;
};

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2));
};

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  );
};

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />;
};

const CameraTrapsList = ({ cameraTraps }) => {
  const [deleteCameraTrap] = useMutation(DELETE_CAMERA_TRAP_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrap deleted');
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete cameraTrap ' + id + '?')) {
      deleteCameraTrap({ variables: { id } });
    }
  };

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
      navigate(routes.cameraTrapBatches({ cameraId: id }));
    }
  }, []);

  return (
    <div>
      <Flex
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
      </Flex>
      <Grid
        marginTop="size-500"
        justifyContent="center"
        columnGap="size-500"
        columns={repeat('auto-fit', 'size-4600')}
        autoRows="auto-fit"
      >
        {cameraTraps.map((cameraTrap) => (
          <View
            backgroundColor="static-white"
            borderRadius="medium"
            borderColor="light"
            borderWidth="thick"
            key={cameraTrap.id}
            padding="size-200"
            width="size-4600"
            maxWidth="100%"
            marginBottom="size-500"
          >
            <Heading level={2}>
              <Link to={routes.cameraTrap({ id: cameraTrap.id })}>
                <Text>{cameraTrap.deviceId}</Text>
              </Link>
            </Heading>
            <Well>
              This camera has captured{' '}
              <strong>{cameraTrap.photos.length}</strong>&nbsp;photos across{' '}
              <strong>{cameraTrap.batches.length}</strong>&nbsp;batches
            </Well>
            <p>
              {/* <StatusLight variant="positive">ACTIVE</StatusLight> */}
              <StatusLight variant="neutral">RESTING</StatusLight>
              {/* <StatusLight variant="negative">NOT WORKING</StatusLight> */}
            </p>
            <ActionGroup onAction={onActionPress}>
              <Item key={`view-${cameraTrap.id}`}>
                <Article /> <Text>View Details</Text>
              </Item>
              <Item key={`viewBatches-${cameraTrap.id}`}>
                <ImageCheck /> <Text>View Batches</Text>
              </Item>
              {/* <Item>
                <Delete />
              </Item> */}
            </ActionGroup>
          </View>
        ))}
      </Grid>
    </div>
  );
};

export default CameraTrapsList;
