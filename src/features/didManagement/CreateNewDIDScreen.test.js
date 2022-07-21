import React from 'react';
import {shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {
  CreateNewDIDScreen,
  CreateNewDIDScreenContainer,
} from './CreateNewDIDScreen';

const mockStore = configureMockStore();

describe('CreateNewDIDScreen', () => {
  it('should render disabled button when no name is provided', () => {
    const initialState = {
      // placeholder for redux store
    };

    const form = {
      didName: '',
      didType: 'didkey',
      showDIDDockQuickInfo: false,
      keypairType: 'ed25519',
      derivationPath: '',
      _errors: {
        didType: '',
      },
      _hasError: false,
    };
    const wrapper = shallow(
      <CreateNewDIDScreen
        handleChange={jest.fn()}
        form={form}
        handleSubmit={jest.fn()}
      />,
      {
        context: {store: mockStore(initialState)},
      },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('should render enabled button when  name is provided', () => {
    const initialState = {
      // placeholder for redux store
    };

    const form = {
      didName: 'Default',
      didType: 'didkey',
      showDIDDockQuickInfo: false,
      keypairType: 'ed25519',
      derivationPath: '',
      _errors: {
        didType: '',
      },
      _hasError: false,
    };
    const wrapper = shallow(
      <CreateNewDIDScreen
        handleChange={jest.fn()}
        form={form}
        handleSubmit={jest.fn()}
      />,
      {
        context: {store: mockStore(initialState)},
      },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('should render correctly without modal ', () => {
    const initialState = {
      // placeholder for redux store
    };

    const form = {
      didName: '',
      didType: 'didkey',
      showDIDDockQuickInfo: false,
      keypairType: 'ed25519',
      derivationPath: '',
      _errors: {
        didType: '',
      },
      _hasError: false,
    };
    const wrapper = shallow(
      <CreateNewDIDScreen
        handleChange={jest.fn()}
        form={form}
        handleSubmit={jest.fn()}
      />,
      {
        context: {store: mockStore(initialState)},
      },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });
  it('should render correctly with modal', () => {
    const initialState = {
      // placeholder for redux store
    };

    const form = {
      didName: '',
      didType: 'diddock',
      showDIDDockQuickInfo: true,
      keypairType: 'ed25519',
      derivationPath: '',
      _errors: {
        didType: '',
      },
      _hasError: false,
    };
    const wrapper = shallow(
      <CreateNewDIDScreen
        handleChange={jest.fn()}
        form={form}
        handleSubmit={jest.fn()}
      />,
      {
        context: {store: mockStore(initialState)},
      },
    );
    expect(wrapper.dive()).toMatchSnapshot();
  });

  it('should render CreateNewDIDScreenContainer correctly', () => {
    const initialState = {
      // placeholder for redux store
    };

    const wrapper = shallow(<CreateNewDIDScreenContainer />, {
      context: {store: mockStore(initialState)},
    });
    expect(wrapper.dive()).toMatchSnapshot();
  });
});
