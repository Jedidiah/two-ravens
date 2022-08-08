import { useCallback } from 'react';

import {
  Breadcrumbs,
  Button,
  Content,
  Dialog,
  DialogContainer,
  Divider,
  Flex,
  Form,
  Header,
  Heading,
  Item,
  ProgressCircle,
  Radio,
  RadioGroup,
  Text,
  TextField,
  View,
} from '@adobe/react-spectrum';

import { navigate, routes } from '@redwoodjs/router';
import useCreateCameraTrap from 'src/hooks/useCreateCameraTrap';

const NewCameraTrap = () => {
  const {
    form,
    setDeviceId,
    setManufacturer,
    setManufacturerOther,
    setProject,
    onSubmit,
    creationState,
  } = useCreateCameraTrap();
  const handleBreadcrumbs = useCallback(() => {
    navigate(routes.cameraTraps());
  }, []);

  return (
    <>
      <Flex
        direction="row"
        marginTop="size-500"
        alignContent="center"
        height="size-600"
        width="100%"
      >
        <View alignSelf="center" flexGrow={1}>
          <Breadcrumbs alignSelf="center" onAction={handleBreadcrumbs}>
            <Item key="cameraTraps">Camera Traps</Item>
            <Item key="newCameraTrap">New Camera Trap</Item>
          </Breadcrumbs>
        </View>
      </Flex>

      <View
        backgroundColor="static-white"
        borderRadius="medium"
        borderColor="light"
        borderWidth="thick"
        padding="size-400"
        margin="auto"
        marginTop="size-500"
        marginBottom="size-500"
        maxWidth="100%"
        width="35rem"
      >
        <DialogContainer onDismiss={() => {}}>
          {creationState !== 'idle' && (
            <Dialog>
              <Heading>Adding Camera Trap</Heading>
              <Header>
                <ProgressCircle isIndeterminate aria-label="" />
              </Header>
              <Divider />
              <Content>
                <Text>{creationState}&hellip;</Text>
              </Content>
            </Dialog>
          )}
        </DialogContainer>
        <Form onSubmit={onSubmit}>
          <TextField
            marginTop="size-500"
            isRequired
            minLength={1}
            // validationState={isValid ? 'valid' : 'invalid'}
            value={form.deviceId}
            onChange={setDeviceId}
            label="Camera Device ID"
            description="The name you set on the camera and the name of the cameras folder on MediaValet (often max four letters, but varies by manufacturer)."
          />
          <TextField
            marginTop="size-500"
            // validationState={isValid ? 'valid' : 'invalid'}
            value={form.project}
            onChange={setProject}
            label="Project Name"
            description="If this camera is connected to a specific project then you can record it here and it will be prefilled on Survey123 when adding a report (optional)"
          />
          <RadioGroup
            marginTop="size-500"
            label="Manufacturer"
            isRequired
            value={form.manufacturer}
            onChange={setManufacturer}
          >
            <Radio value="browning">Browning</Radio>
            <Radio value="bushnell">Bushnell</Radio>
            <Radio value="cuddeback">Cuddeback</Radio>
            <Radio value="gardepro">GardePro</Radio>
            <Radio value="moultrie">Moultrie</Radio>
            <Radio value="reconyx">Reconyx</Radio>
            <Radio value="spypoint">Spypoint</Radio>
            <Radio value="other">Other</Radio>
          </RadioGroup>
          {form.manufacturer === 'other' && (
            <TextField
              marginTop="size-200"
              isRequired
              // validationState={isValid ? 'valid' : 'invalid'}
              value={form.manufacturerOther}
              onChange={setManufacturerOther}
              label="Other Manufacturer"
              minLength={2}
            />
          )}

          <Button marginTop="size-500" variant="cta" onPress={onSubmit}>
            Create Camera Trap
          </Button>
        </Form>
      </View>
    </>
  );
  //   <div className="rw-segment">
  //     <header className="rw-segment-header">
  //       <h2 className="rw-heading rw-heading-secondary">New CameraTrap</h2>
  //     </header>
  //     <div className="rw-segment-main">
  //       <CameraTrapForm onSave={onSave} loading={loading} error={error} />
  //     </div>
  //   </div>
  // );
};

export default NewCameraTrap;
