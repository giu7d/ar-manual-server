module.exports = {
	preset: "ts-jest/presets/js-with-ts",
	testEnvironment: "node",
	coveragePathIgnorePatterns: ["/node_modules/", "__helpers__", "__mocks__"],
	modulePathIgnorePatterns: ["__helpers__", "__mocks__"],
	setupFiles: ["./config/jest/jest.env.js"],
	setupFilesAfterEnv: ["./config/jest/jest.setup.js"],
	transform: {
		"^.+\\.ts?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	moduleNameMapper: {
		"^src/(.*)": "<rootDir>/src/$1",
	},
};
