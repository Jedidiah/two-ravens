import { useCallback, useEffect } from 'react';

import {
  Button,
  ButtonGroup,
  Content,
  Dialog,
  Divider,
  Footer,
  Heading,
  ProgressCircle,
} from '@adobe/react-spectrum';
import { BlobProvider, Page, Text } from '@react-pdf/renderer';
import { CameraTrapBatch } from 'types/graphql';

import { useAuth } from '@redwoodjs/auth';
import { navigate, routes } from '@redwoodjs/router';
import { toast } from '@redwoodjs/web/dist/toast';

import PdfPhotoPage from '../PdfPhotoPage/PdfPhotoPage';

const BatchApprovalModal = (props: {
  close: () => void;
  cameraTrapBatch: CameraTrapBatch;
  fields: Record<string, unknown>;
}) => {
  const { getToken } = useAuth();

  // useEffect(() => {
  //   const postBatch = async () => {
  //     const token = await getToken();
  //     const response = await fetch(
  //       `/.redwood/functions/generateDocusignTemplate`,
  //       {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'content-type': 'application/json',
  //           'auth-provider': 'dbAuth',
  //           authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           ...props.fields,
  //           cameraTrapBatchId: props.cameraTrapBatch.id,
  //         }),
  //       }
  //     );
  //     if (response.status === 200) {
  //       toast('Batch submitted for approval');
  //     } else {
  //       // toast.error('Batch Approval Failed');
  //     }
  //     navigate(
  //       routes.cameraTrapTab({
  //         id: props.cameraTrapBatch.cameraTrap.id,
  //         tab: 'batches',
  //       })
  //     );
  //   };
  //   postBatch();
  // }, []);

  // const postPdf = useCallback(
  //   async (blob) => {
  //     const token = await getToken();
  //     const formData = new FormData();
  //     formData.append(
  //       'fields',
  //       JSON.stringify({
  //         ...props.fields,
  //         cameraTrapBatchId: props.cameraTrapBatch.id,
  //       })
  //     );
  //     formData.append('pdf', blob);

  //     const response = await fetch(
  //       `/.redwood/functions/generateDocusignTemplate`,
  //       {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'content-type': 'multipart/form-data',
  //           'auth-provider': 'dbAuth',
  //           authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           ...props.fields,
  //           cameraTrapBatchId: props.cameraTrapBatch.id,
  //         }),
  //       }
  //     );
  //     if (response.status === 200) {
  //       toast('Batch submitted for approval');
  //     } else {
  //       // toast.error('Batch Approval Failed');
  //     }
  //     navigate(
  //       routes.cameraTrapTab({
  //         id: props.cameraTrapBatch.cameraTrap.id,
  //         tab: 'batches',
  //       })
  //     );
  //   },
  //   [getToken, props.cameraTrapBatch, props.fields]
  // );

  // const MyDoc = (
  //   <>
  //     <Page>
  //       <Text>Title Page</Text>
  //     </Page>
  //     {props.cameraTrapBatch.photos.map((photo, index) => {
  //       return (
  //         <PdfPhotoPage
  //           key={photo.large}
  //           photo={photo}
  //           index={index}
  //           total={props.cameraTrapBatch.photos.length}
  //         />
  //       );
  //     })}
  //   </>
  // );

  return (
    <Dialog>
      <Heading>Submiting for approval</Heading>
      <Divider />
      <Content>
        Generating document and posting to DocuSign to begin approval. On
        completion the document will be emailed to all stakeholders.
        {/* <BlobProvider document={MyDoc}>
          {({ blob, url, loading, error }) => {
            if (!loading && !!blob) {
              postPdf(blob);
            }
            return null;
          }}
        </BlobProvider> */}
        <p>
          <strong>
            THE PDF GENERATION BROKE SHORTLY BEFORE BUILDING FOR THE DEMO SO
            THIS HAS BEEN DISABLED
          </strong>
        </p>
      </Content>

      <Footer>
        <p style={{ textAlign: 'right' }}>
          <ProgressCircle isIndeterminate />
        </p>
      </Footer>
      <ButtonGroup>
        <Button variant="secondary" onPress={props.close}>
          Close
        </Button>
        <Button variant="cta" isDisabled onPress={props.close}>
          Submitting&hellip;
        </Button>
      </ButtonGroup>
    </Dialog>
  );
};

export default BatchApprovalModal;
