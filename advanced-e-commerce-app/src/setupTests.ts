import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

// Extend Jest matchers
declare global {
    namespace jest {
        interface Mock<T = any, Y extends any[] = any> {
            toHaveBeenCalledWith: (...args: Y) => void;
        }
    }

    // Extend Jest matchers
    namespace jest {
        interface Matchers<R> {
            toBeInTheDocument(): R;
            toHaveTextContent(text: string): R;
        }
    }
}