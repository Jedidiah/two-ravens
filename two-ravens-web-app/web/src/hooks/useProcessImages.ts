import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { useMutation } from '@redwoodjs/web';

const CREATE_PHOTO_MUTATION = gql`
  mutation CreatePhotoMutation($input: CreatePhotoFromAssetInput!) {
    createPhotoFromAsset(input: $input) {
      id
    }
  }
`;

const UPDATE_PHOTO_MUTATION = gql`
  mutation UpdatePhotosForCameraMutation(
    $input: UpdatePhotosForCameraTrapInput!
  ) {
    updatePhotosForCameraTrap(input: $input) {
      success
    }
  }
`;

async function* imageGenerator(
  cameraTrapId: string,
  assetIds: string[],
  createPhoto
) {
  let index = 0;
  while (index < assetIds.length) {
    const id = await createPhoto({
      variables: {
        input: {
          cameraTrapId,
          assetId: assetIds[index],
        },
      },
    });
    yield id;
    index++;
  }
  return;
}

export default function useProcessImages(
  cameraTrapId: string,
  assets: {
    __typename?: 'MediavaletAsset';
    id: string;
    title: string;
    thumb: string;
  }[]
) {
  const [complete, setComplete] = useState<string[]>([]);
  const [batchesComplete, setBatchesComplete] = useState<boolean>(false);
  const assetIds = useMemo(() => assets.map((a) => a.id), [assets]);
  const [createPhoto] = useMutation(CREATE_PHOTO_MUTATION);
  const [updatePhotosFromCameraTrap] = useMutation(UPDATE_PHOTO_MUTATION, {
    onCompleted: () => {
      setBatchesComplete(true);
    },
  });
  const imageGen = useRef(imageGenerator(cameraTrapId, assetIds, createPhoto));

  const addComplete = useCallback(
    (id) => {
      setComplete([...complete, id]);
    },
    [setComplete, complete]
  );

  useEffect(() => {
    const getNext = async () => {
      const id = await imageGen.current.next();
      if (!id.done) {
        addComplete(id.value);
      }
    };
    getNext();
  }, [addComplete]);

  useEffect(() => {
    if (complete.length === assetIds.length) {
      updatePhotosFromCameraTrap({ variables: { input: { cameraTrapId } } });
    }
  }, [
    assetIds.length,
    complete.length,
    updatePhotosFromCameraTrap,
    cameraTrapId,
  ]);

  return { total: assetIds.length, complete: complete.length, batchesComplete };
}
