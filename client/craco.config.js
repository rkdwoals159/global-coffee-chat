module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    configure: (webpackConfig) => {
      // TailwindCSS가 제대로 작동하도록 설정
      return webpackConfig;
    },
  },
  jest: {
    configure: {
      // Jest 설정 커스터마이징
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
      testEnvironment: "jsdom",
      moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      // 모듈 확장자 설정
      moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
      // 변환 설정
      transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": "babel-jest",
      },
    },
  },
};
