import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
    global.TextEncoder = TextEncoder;
    global.TextDecoder = TextDecoder;
}

// Extend Jest matchers
declare global {
    namespace jest {
        interface Expect {
            toHaveBeenCalledWith: (...args: any[]) => void;
        }

        interface Matchers<R, T = {}> {
            toBeInTheDocument(): R;
            toHaveTextContent(text: string): R;
        }

        interface MockInstance<T, Y extends any[]> {
            toHaveBeenCalledWith: (...args: Y) => void;
        }
    }
}