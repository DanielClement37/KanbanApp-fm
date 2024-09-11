export default {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    rootDir: "src",
    moduleNameMapper: {
        "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/tests/mocks/fileMock.js",
        "^@app/(.*)$": "<rootDir>/$1",
        "\\.(css)$": "identity-obj-proxy",
    },
}