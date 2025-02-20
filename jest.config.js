const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.json");

module.exports = {
  preset: "ts-jest",
  // Укажите корневую директорию
  roots: ["<rootDir>"],
  // Обработка файлов с расширениями js, jsx (и ts, tsx если нужно)
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  // Расширения файлов для модулей
  moduleFileExtensions: ["js", "jsx", "ts", "tsx", "json"],
  // Настройка алиасов (если вы их используете в проекте)
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  // Настройка окружения для работы с DOM
  testEnvironment: "jsdom",
  // Автоматический импорт matchers из jest-dom
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: 'jest-environment-jsdom',
};
