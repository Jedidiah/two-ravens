import {
  ActionButton,
  Button,
  ButtonGroup,
  Content,
  Dialog,
  DialogTrigger,
  Divider,
  Flex,
  Grid,
  Header,
  Heading,
  Link as SpectrumLink,
  ProgressBar,
  ProgressCircle,
  repeat,
  Text,
  Tooltip,
  TooltipTrigger,
  View,
} from '@adobe/react-spectrum';
import Download from '@spectrum-icons/workflow/Download';
import type { MediavaletAssetsQuery } from 'types/graphql';

import { Link } from '@redwoodjs/router';
import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web';

import useProcessImages from 'src/hooks/useProcessImages';

export const QUERY = gql`
  query MediavaletAssetsQuery($categoryId: String!) {
    mediavaletAssets(categoryId: $categoryId) {
      id
      title
      thumb
    }
  }
`;

export const Loading = () => (
  <View width="50%">
    <Heading>
      <Download marginBottom="-0.3em" /> <Text>Camera Downloads Folder</Text>
    </Heading>
    <Divider marginBottom="size-400" height={1} />

    <Flex direction="row" alignItems="center">
      <ProgressCircle
        marginEnd="size-200"
        isIndeterminate
        aria-label="Loading Images"
      />
      <Text>
        Checking <em>camera-downloads</em> folder on MediaValet
      </Text>
    </Flex>
  </View>
);

export const Empty = () => (
  <View width="50%">
    <Heading>
      <Download marginBottom="-0.3em" /> <Text>Camera Downloads Folder</Text>
    </Heading>
    <Divider height={1} marginBottom="size-400" />

    <p style={{ maxWidth: '40rem' }}>
      There are no unprocessed photos in this camera&lsquo;s downloads folder on
      MediaValet.
    </p>
    <Flex direction="row" alignItems="center">
      <ActionButton marginEnd="size-225">Refresh</ActionButton>{' '}
      <Link
        target="_blank"
        rel="noreferrer"
        to="https://hackathonjgi.mediavalet.com/upload"
      >
        <TooltipTrigger delay={0}>
          <SpectrumLink>Upload Images</SpectrumLink>

          <Tooltip>
            Make sure to upload into the camera-downloads category for the
            correct camera name
          </Tooltip>
        </TooltipTrigger>
      </Link>
    </Flex>
  </View>
);

export const Failure = ({ error }: CellFailureProps) => (
  <View width="50%">
    <Heading>
      <Download marginBottom="-0.3em" /> <Text>Camera Downloads Folder</Text>
    </Heading>
    <Divider height={1} marginBottom="size-400" />

    <p style={{ maxWidth: '40rem' }}>
      The MediaValet downloads folder could not be accessed, there maybe an
      issue with the API.
    </p>
    <ActionButton>Retry</ActionButton>
    <div style={{ color: 'red' }}>Error: {error.message}</div>
  </View>
);

function ProcessImagesDialog({
  cameraTrapId,
  mediavaletAssets,
  close,
}: {
  cameraTrapId: string;
  mediavaletAssets: {
    __typename?: 'MediavaletAsset';
    id: string;
    title: string;
    thumb: string;
  }[];
  close: () => void;
}) {
  const { total, complete, batchesComplete } = useProcessImages(
    cameraTrapId,
    mediavaletAssets
  );
  const step1Complete = total === complete;
  const step2Complete = batchesComplete;
  return (
    <Dialog>
      <Heading>Processing Images</Heading>
      <Divider />

      <Header>
        {complete} of {total}
      </Header>
      <Divider />
      <Content>
        <Flex direction="column">
          <ProgressBar
            label="Processing"
            minValue={0}
            maxValue={Number(total)}
            value={Number(complete)}
            marginBottom="size-130"
          />
          {step1Complete && (
            <ProgressBar
              isIndeterminate={!step2Complete}
              minValue={step2Complete ? 0 : undefined}
              maxValue={step2Complete ? 100 : undefined}
              value={step2Complete ? 100 : undefined}
              label="Updating MediaValet Categories"
            />
          )}
        </Flex>
      </Content>
      <ButtonGroup>
        <Button
          isDisabled={!(step1Complete && step2Complete)}
          variant="cta"
          onPress={close}
        >
          Complete
        </Button>
      </ButtonGroup>
    </Dialog>
  );
}

export const Success = ({
  cameraTrapId,
  mediavaletAssets,
}: CellSuccessProps<MediavaletAssetsQuery>) => {
  // https://hackathonjgi.mediavalet.com/browse/categories/1e5ea909-ae48-44a5-9440-a514c646831a/7dbbb011-05b8-47c2-956a-53e843a6bbc8/full-screen
  return (
    <>
      <View width="50%">
        <Heading>
          <Download marginBottom="-0.3em" />{' '}
          <Text>Camera Downloads Folder</Text>
        </Heading>
        <Divider height={1} marginBottom="size-400" />

        <p style={{ maxWidth: '40rem' }}>
          There {mediavaletAssets.length === 1 ? 'is' : 'are'}{' '}
          <strong>{mediavaletAssets.length}</strong> unprocessed{' '}
          {mediavaletAssets.length === 1 ? 'photo' : 'photos'} in this
          camera&lsquo;s downloads folder on MediaValet. The{' '}
          {mediavaletAssets.length === 1 ? 'photo' : 'photos'} will eventually
          be automatically processed by a background job, but you can also
          manually process them here. It may take a while as the MediaValet API
          is quite slow and they have to be processed individually, but if you
          leave the tab open it will work through them.
        </p>
        <Flex direction="row" alignItems="center">
          <DialogTrigger isKeyboardDismissDisabled>
            <ActionButton marginEnd="size-200">
              Process Downloaded Images
            </ActionButton>
            {(close) => (
              <ProcessImagesDialog
                cameraTrapId={cameraTrapId}
                mediavaletAssets={mediavaletAssets}
                close={close}
              />
            )}
          </DialogTrigger>
          <Link
            rel="nofollow"
            target="_blank"
            to={`https://hackathonjgi.mediavalet.com/browse/categories/6c9e60cb-7fad-4346-b5d4-75a3b4a15a09`}
          >
            <SpectrumLink>View folder on MediaValet</SpectrumLink>
          </Link>
        </Flex>
      </View>
      <Grid
        width="50%"
        marginTop="size-500"
        justifyContent="center"
        columnGap="size-200"
        columns={repeat('auto-fit', '154px')}
        autoRows="auto-fit"
        rowGap="size-200"
      >
        {mediavaletAssets.map((item) => {
          return (
            <img
              width={154}
              height={87}
              key={item.id}
              src={item.thumb}
              alt={item.title}
            />
          );
        })}
      </Grid>
    </>
  );
};
