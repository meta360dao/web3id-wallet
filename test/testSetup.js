import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {NativeModules} from 'react-native';
import mockAsyncStorage from '../node_modules/@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNPermissions from '../node_modules/react-native-permissions/mock';
import '../src/core/setup-env';

jest.mock('../src/core/realm', () => {
  const realmFunctions = {
    write: jest.fn(callback => {
      callback();
    }),
    create: jest.fn(),
    delete: jest.fn(),
    objects: jest.fn(() => ({
      filtered: jest.fn(),
    })),
  };
  return {
    getRealm: () => realmFunctions,
  };
});
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-device-info', () => 'DeviceInfo');
jest.mock('react-native-permissions', () => mockRNPermissions);

jest.mock('react-native-share', () => 'RNShare');

Enzyme.configure({adapter: new Adapter()});

React.useLayoutEffect = React.useEffect 

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = ({ children }) => children;
  return { KeyboardAwareScrollView };
});

jest.mock('react-native-fs', () => ({
  CachesDirectoryPath: jest.fn(),
  DocumentDirectoryPath: jest.fn(),
  ExternalDirectoryPath: jest.fn(),
  ExternalStorageDirectoryPath: jest.fn(),
  LibraryDirectoryPath: jest.fn(),
  MainBundlePath: 'testPath',
  PicturesDirectoryPath: jest.fn(),
  TemporaryDirectoryPath: jest.fn(),
  appendFile: jest.fn(),
  completeHandlerIOS: jest.fn(),
  copyAssetsVideoIOS: jest.fn(),
  copyFile: jest.fn(),
  copyFileAssets: jest.fn(),
  copyFileAssetsIOS: jest.fn(),
  downloadFile: jest.fn(),
  exists: jest.fn(),
  existsAssets: jest.fn(),
  getAllExternalFilesDirs: jest.fn(),
  getFSInfo: jest.fn(),
  hash: jest.fn(),
  isResumable: jest.fn(),
  mkdir: jest.fn(),
  moveFile: jest.fn(),
  pathForBundle: jest.fn(),
  pathForGroup: jest.fn(),
  read: jest.fn(),
  readDir: jest.fn(),
  readDirAssets: jest.fn(),
  readFile: () =>
    new Promise(resolve => {
      resolve('console.log()');
    }),
  readFileAssets: jest.fn(),
  readdir: jest.fn(),
  resumeDownload: jest.fn(),
  setReadable: jest.fn(),
  stat: jest.fn(),
  stopDownload: jest.fn(),
  stopUpload: jest.fn(),
  touch: jest.fn(),
  unlink: jest.fn(),
  uploadFiles: jest.fn(),
  write: jest.fn(),
  writeFile: jest.fn(),
}));

jest.mock('react-native-keychain', () => ({
  getSupportedBiometryType: () => Promise.resolve('FaceId'),
  BIOMETRY_TYPE: {
    FACE_ID: 1,
    FINGERPRINT: 2,
  },
}));

NativeModules.RNGestureHandlerModule = {
  attachGestureHandler: jest.fn(),
  createGestureHandler: jest.fn(),
  dropGestureHandler: jest.fn(),
  updateGestureHandler: jest.fn(),
  forceTouchAvailable: jest.fn(),
  State: {},
  Directions: {},
};

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectionMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
  getCurrentState: jest.fn(() => Promise.resolve()),
};

NativeModules.RCTAnalytics = {
  optIn: jest.fn(),
  trackEvent: jest.fn(),
  getRemoteVariables: jest.fn(),
};

jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableOpacity',
  () => 'TouchableOpacity',
);
jest.mock(
  'react-native/Libraries/Components/Touchable/TouchableHighlight',
  () => 'TouchableHighlight',
);
jest.mock(
  'react-native/Libraries/Components/TextInput/TextInput',
  () => 'TextInput',
);
jest.mock('react-native-document-picker', () => ({
  pick: jest.fn(),
  types: {},
}));

jest.mock('react-native/Libraries/Interaction/InteractionManager', () => ({
  runAfterInteractions: jest.fn(),
  createInteractionHandle: jest.fn(),
  clearInteractionHandle: jest.fn(),
  setDeadline: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => {
  const logEvent = jest.fn(() => Promise.resolve([]));
  return {
    __esModule: true,
    default: jest.fn().mockReturnValue({
      logEvent,
    }),
  };
});

jest.mock('@docknetwork/react-native-sdk/src/client/wallet-rpc', () => {
  const originalModule = jest.requireActual(
    '@docknetwork/react-native-sdk/src/client/wallet-rpc',
  );
  const {WalletRpc} = originalModule;
  return {
    __esModule: true,
    WalletRpc: {
      ...WalletRpc,
      importWallet: jest.fn(() => Promise.resolve()),
      query: jest.fn(() => Promise.resolve([])),
      remove: jest.fn(),
      create: jest.fn(),
      load: jest.fn(),
      sync: jest.fn(),
    },
  };
});
jest.mock('@docknetwork/react-native-sdk/src/client/api-rpc', () => {
  const originalModule = jest.requireActual(
    '@docknetwork/react-native-sdk/src/client/api-rpc',
  );
  const {ApiRpc} = originalModule;
  return {
    __esModule: true,
    ApiRpc: {
      ...ApiRpc,
      sendTokens: jest.fn(() => Promise.resolve()),
    },
  };
});
