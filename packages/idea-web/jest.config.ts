const { getJestProjects } = require('@nrwl/jest');

export default {
  projects: [
    ...getJestProjects(),
    '<rootDir>/apps/idea-web',
    '<rootDir>/apps/api',
  ],
};
