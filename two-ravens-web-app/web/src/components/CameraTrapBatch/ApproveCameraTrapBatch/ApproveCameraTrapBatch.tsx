import { useState } from 'react';

import {
  ActionButton,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Footer,
  Form,
  Heading,
  Item,
  ProgressCircle,
  TextField,
  View,
} from '@adobe/react-spectrum';
import formatISO from 'date-fns/formatISO';

import BatchApprovalModal from 'src/components/BatchApprovalModal/BatchApprovalModal';
import EnvelopeEmailField from 'src/components/EnvelopeEmailField/EnvelopeEmailField';
import ImageBlock from 'src/components/ImageBlock/ImageBlock';
import LocaleDate from 'src/components/LocaleDate/LocaleDate';
import CameraTrapBatchCell from '../CameraTrapBatchCell';

const CameraTrapBatch = ({ cameraTrapBatch }) => {
  const [stakeholders, setStakeholders] = useState([]);
  const [ccUsers, setCcUsers] = useState([]);
  const [batchLabel, setBatchLabel] = useState(
    `${cameraTrapBatch?.cameraTrap?.deviceId}__${formatISO(
      new Date(cameraTrapBatch.dateStart),
      { representation: 'date' }
    )}__${formatISO(new Date(cameraTrapBatch.dateEnd), {
      representation: 'date',
    })}`
  );
  const [emailSubject, setEmailSubject] = useState('');
  return (
    <View maxWidth="60rem" marginX="auto" marginBottom="size-1000">
      <Flex
        direction="row"
        marginTop="size-500"
        alignContent="stretch"
        height="size-600"
      >
        <View alignSelf="center">
          <Breadcrumbs>
            <Item key="cameraTraps">Camera Traps</Item>
            <Item key="cameraTraps">MGPI</Item>
            <Item>Approve Batch</Item>
          </Breadcrumbs>
        </View>
      </Flex>
      <Flex
        width="100%"
        alignItems="start"
        justifyContent="space-between"
        alignContent="center"
      >
        <View>
          <Form>
            <Flex
              marginBottom="size-400"
              width="100%"
              alignContent="space-around"
            >
              <View>
                <Heading level={2}>Send Batch to Stakeholders by Email</Heading>
                <p>
                  Fill in the details of the stakeholders you need to get
                  approval from and anyone else that you would like to copy in.
                </p>

                <TextField
                  marginTop="size-225"
                  width="size-4600"
                  label="Batch Label"
                  isRequired
                  onChange={setBatchLabel}
                  defaultValue={batchLabel}
                />
                <br />
                <TextField
                  onChange={setEmailSubject}
                  width="size-4600"
                  isRequired
                  label="Email Subject"
                />
              </View>
              <View width="size-4600" marginStart="size-1000">
                <ImageBlock photos={cameraTrapBatch.photos} />
                <p style={{ textAlign: 'left' }}>
                  This batch contains{' '}
                  <strong>
                    {cameraTrapBatch.photos.length} Photo
                    {cameraTrapBatch.photos.length === 1 ? '' : 's'}
                  </strong>{' '}
                  captured between{' '}
                  <strong>
                    <LocaleDate dateString={cameraTrapBatch.dateStart} />
                  </strong>
                  &nbsp;and&nbsp;
                  <strong>
                    <LocaleDate dateString={cameraTrapBatch.dateEnd} />
                  </strong>{' '}
                  on <strong>{cameraTrapBatch.cameraTrap.deviceId}</strong>
                </p>
                <DialogTrigger>
                  <ActionButton>Preview Form</ActionButton>
                  {(close) => (
                    <Dialog width="80vw" size="L">
                      <Content>
                        <CameraTrapBatchCell id={cameraTrapBatch.id} />
                      </Content>
                      <ButtonGroup>
                        <Button variant="secondary" onPress={close}>
                          Close
                        </Button>
                      </ButtonGroup>
                    </Dialog>
                  )}
                </DialogTrigger>
              </View>
            </Flex>

            <EnvelopeEmailField
              onChange={setStakeholders}
              title="Stakeholders"
            />
            <EnvelopeEmailField onChange={setCcUsers} title="CC." />

            <DialogTrigger>
              <Button width="size-4600" variant="cta">
                Submit
              </Button>
              {(close) => (
                <BatchApprovalModal
                  cameraTrapBatch={cameraTrapBatch}
                  fields={{ stakeholders, ccUsers, emailSubject, batchLabel }}
                  close={close}
                />
              )}
            </DialogTrigger>
          </Form>
        </View>
      </Flex>
    </View>
  );
};

export default CameraTrapBatch;
