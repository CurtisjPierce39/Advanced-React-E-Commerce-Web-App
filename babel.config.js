module.exports = {
    presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }], // or your preferred env preset
        '@babel/preset-react', // Add this line
    ],
    transform: {
        '^.+\\.js$': 'babel-jest', // or '^.+\\.jsx$' if you have .jsx files
    },
};