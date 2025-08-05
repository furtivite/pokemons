import '@testing-library/jest-dom';

global.fetch = jest.fn();
// Polyfill TextEncoder in Jest (needed by react-router-dom)
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.TextEncoder = require('util').TextEncoder;