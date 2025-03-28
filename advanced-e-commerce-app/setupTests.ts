import '@testing-library/jest-dom';

if (typeof TextEncoder === 'undefined') {
    const util = await import('util');
    global.TextEncoder = util.TextEncoder;
    global.TextDecoder = util.TextDecoder;
}