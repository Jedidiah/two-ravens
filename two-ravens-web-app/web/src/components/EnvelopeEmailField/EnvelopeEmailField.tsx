import { useEffect, useReducer } from 'react';

import {
  ActionButton,
  Flex,
  Heading,
  TextField,
  View,
} from '@adobe/react-spectrum';

interface Contact {
  name: string;
  email: string;
}

type ContactList = Contact[];

const EnvelopeEmailField = (props: {
  title: string;
  limit?: number;
  onChange?: (contacts: ContactList) => void;
}) => {
  const { title, limit = 4, onChange = () => {} } = props;
  const initialState = [{ name: '', email: '' }];
  const reducer = (state: ContactList, action) => {
    switch (action.type) {
      case 'add': {
        return state.length >= limit
          ? state
          : [...state, { name: '', email: '' }];
      }
      case 'remove': {
        return state.length <= 1 ? state : state.slice(0, -1);
      }
      case 'change': {
        const { index, key, text } = action.payload;
        const newState = [...state];
        newState[index] = { ...newState[index], [key]: text };
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);

  return (
    <View marginBottom="size-400">
      <Flex>
        <Heading marginEnd="size-200">{title}</Heading>
        <ActionButton
          onPress={() => {
            dispatch({ type: 'remove' });
          }}
          alignSelf="center"
        >
          &ndash;
        </ActionButton>
        <ActionButton
          onPress={() => {
            dispatch({ type: 'add' });
          }}
          alignSelf="center"
        >
          +
        </ActionButton>
      </Flex>

      <Flex direction="row">
        {state.map((s, index) => (
          <View
            key={String(index)}
            width="size-3000"
            backgroundColor="gray-75"
            borderColor="gray-300"
            borderRadius="medium"
            padding="size-200"
            borderWidth="thin"
            margin="size-100"
          >
            <TextField
              label="Name"
              pattern="email"
              onChange={(text) => {
                dispatch({
                  type: 'change',
                  payload: { index, key: 'name', text },
                });
              }}
            />
            <TextField
              label="Email"
              onChange={(text) => {
                dispatch({
                  type: 'change',
                  payload: { index, key: 'email', text },
                });
              }}
              type="email"
            />
          </View>
        ))}
      </Flex>
    </View>
  );
};

export default EnvelopeEmailField;
