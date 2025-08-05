import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

global.fetch = jest.fn();
global.TextEncoder = TextEncoder;