import { useCallback, useEffect, useReducer, useState } from 'react';

import { navigate, routes } from '@redwoodjs/router';
import { useMutation } from '@redwoodjs/web';
import { toast } from '@redwoodjs/web/dist/toast';

const CREATE_CAMERA_TRAP_MUTATION = gql`
  mutation CreateCameraTrapMutation($input: CreateCameraTrapInput!) {
    createCameraTrap(input: $input) {
      id
    }
  }
`;

const CREATE_CAMERA_TRAP_FOLDER_MUTATION = gql`
  mutation CreateCameraTrapFolderMutation(
    $input: CreateMediavaletCategoryInput!
  ) {
    createMediavaletCategory(input: $input) {
      id
    }
  }
`;

type ACTION_TYPES =
  | 'SET_CREATION_STATE'
  | 'SET_DEVICE_ID'
  | 'SET_MANUFACTURER'
  | 'SET_MANUFACTURER_OTHER'
  | 'SET_FOLDER_ID'
  | 'SET_DOWNLOAD_FOLDER_ID'
  | 'SET_PROCESSED_FOLDER_ID'
  | 'SET_PROJECT';

type TCreationState =
  | 'idle'
  | 'creatingCameraFolder'
  | 'creatingDownloadsFolder'
  | 'creatingProcessedFolder'
  | 'submitting'
  | 'complete'
  | 'error';

interface REDUCER_STATE {
  creationState: TCreationState;
  deviceId: string;
  manufacturer: string;
  manufacturerOther: string;
  project: string;
  mediavaletCategoryId: string;
  mediavaletDownloadsFolderId: string;
  mediavaletProcessedFolderId: string;
}

export default function useCreateCameraTrap() {
  const initialState = {
    creationState: 'idle',
    deviceId: '',
    manufacturer: '',
    manufacturerOther: '',
    project: '',
    mediavaletCategoryId: '',
    mediavaletDownloadsFolderId: '',
    mediavaletProcessedFolderId: '',
  };
  function reducer(
    state: REDUCER_STATE,
    action: { type: ACTION_TYPES; payload: string }
  ) {
    console.log(action);

    switch (action.type) {
      case 'SET_CREATION_STATE': {
        return { ...state, creationState: action.payload };
      }
      case 'SET_DEVICE_ID': {
        return { ...state, deviceId: action.payload };
      }
      case 'SET_MANUFACTURER': {
        return { ...state, manufacturer: action.payload };
      }
      case 'SET_MANUFACTURER_OTHER': {
        return { ...state, manufacturerOther: action.payload };
      }
      case 'SET_PROJECT': {
        return { ...state, project: action.payload };
      }
      case 'SET_FOLDER_ID': {
        return { ...state, mediavaletCategoryId: action.payload };
      }
      case 'SET_DOWNLOAD_FOLDER_ID': {
        return { ...state, mediavaletDownloadsFolderId: action.payload };
      }

      case 'SET_PROCESSED_FOLDER_ID': {
        return { ...state, mediavaletProcessedFolderId: action.payload };
      }

      default:
        break;
    }
  }
  const [{ creationState, ...form }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const setDeviceId = useCallback((payload: string) => {
    dispatch({ type: 'SET_DEVICE_ID', payload });
  }, []);
  const setManufacturer = useCallback((payload: string) => {
    dispatch({ type: 'SET_MANUFACTURER', payload });
  }, []);
  const setManufacturerOther = useCallback((payload: string) => {
    dispatch({ type: 'SET_MANUFACTURER_OTHER', payload });
  }, []);
  const setProject = useCallback((payload: string) => {
    dispatch({ type: 'SET_PROJECT', payload });
  }, []);

  const [createCameraTrap] = useMutation(CREATE_CAMERA_TRAP_MUTATION, {
    onCompleted: () => {
      toast.success('CameraTrap created');
      navigate(routes.cameraTraps());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [createCameraTrapDownloadsFolder] = useMutation(
    CREATE_CAMERA_TRAP_FOLDER_MUTATION,
    {
      onCompleted: ({ createMediavaletCategory }) => {
        console.log(createMediavaletCategory);
        toast.success('CameraTrap Downloads Folder created');
        dispatch({
          type: 'SET_DOWNLOAD_FOLDER_ID',
          payload: createMediavaletCategory.id,
        });
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'creatingProcessedFolder',
        });
      },
      onError: (error) => {
        toast.error(error.message);
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'error',
        });
      },
    }
  );

  const [createCameraTrapProcessedFolder] = useMutation(
    CREATE_CAMERA_TRAP_FOLDER_MUTATION,
    {
      onCompleted: ({ createMediavaletCategory }) => {
        console.log(createMediavaletCategory);
        toast.success('CameraTrap Processed Images Folder created');
        dispatch({
          type: 'SET_PROCESSED_FOLDER_ID',
          payload: createMediavaletCategory.id,
        });
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'submitting',
        });
      },
      onError: (error) => {
        toast.error(error.message);
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'error',
        });
      },
    }
  );

  const [createCameraTrapRootFolder] = useMutation(
    CREATE_CAMERA_TRAP_FOLDER_MUTATION,
    {
      onCompleted: ({ createMediavaletCategory }) => {
        console.log(createMediavaletCategory);
        if (createMediavaletCategory.id.startsWith('TypeError')) {
          toast.error('MediaValet API Integration Error');
          dispatch({
            type: 'SET_CREATION_STATE',
            payload: 'error',
          });
        }
        dispatch({
          type: 'SET_FOLDER_ID',
          payload: createMediavaletCategory.id,
        });
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'creatingDownloadsFolder',
        });
        toast.success('CameraTrap Folder created');
      },
      onError: (error) => {
        toast.error(error.message);
        dispatch({
          type: 'SET_CREATION_STATE',
          payload: 'error',
        });
      },
    }
  );

  useEffect(() => {
    console.log(
      `Effect: createCameraTrapRootFolder; Called: ${Boolean(
        creationState === 'creatingCameraFolder'
      )}`
    );
    if (creationState === 'creatingCameraFolder') {
      createCameraTrapRootFolder({
        variables: {
          input: {
            parentId: process.env['MEDIAVALET_ROOT_FOLDER_ID'],
            name: form.deviceId,
          },
        },
      });
    }
  }, [form.deviceId, creationState, createCameraTrapRootFolder]);

  useEffect(() => {
    console.log('downloadsFolder', form.mediavaletCategoryId, creationState);

    if (
      creationState === 'creatingDownloadsFolder' &&
      form.mediavaletCategoryId !== ''
    ) {
      createCameraTrapDownloadsFolder({
        variables: {
          input: {
            parentId: form.mediavaletCategoryId,
            name: 'camera-downloads',
          },
        },
      });
    }
  }, [
    form.mediavaletCategoryId,
    creationState,
    createCameraTrapDownloadsFolder,
  ]);

  useEffect(() => {
    console.log('processedFolder', form.mediavaletCategoryId, creationState);

    if (
      creationState === 'creatingProcessedFolder' &&
      form.mediavaletCategoryId !== ''
    ) {
      createCameraTrapProcessedFolder({
        variables: {
          input: {
            parentId: form.mediavaletCategoryId,
            name: 'processed-images',
          },
        },
      });
    }
  }, [
    form.mediavaletCategoryId,
    creationState,
    createCameraTrapProcessedFolder,
  ]);

  useEffect(() => {
    console.log(
      `Effect: submitting; Called: ${creationState === 'submitting'}`
    );
    if (creationState === 'submitting') {
      dispatch({
        type: 'SET_CREATION_STATE',
        payload: 'complete',
      });
      const { manufacturer, manufacturerOther, ...input } = form;

      createCameraTrap({
        variables: {
          input: {
            ...input,
            manufacturer:
              manufacturer === 'other' ? manufacturerOther : manufacturer,
          },
        },
      });
    }
  }, [form, creationState, createCameraTrap]);

  const onSubmit = useCallback(() => {
    dispatch({ type: 'SET_CREATION_STATE', payload: 'creatingCameraFolder' });
  }, []);

  return {
    form,
    setDeviceId,
    setManufacturer,
    setManufacturerOther,
    setProject,
    creationState,
    onSubmit,
  };
}
