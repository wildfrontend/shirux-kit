const development = {
  API_URL: 'http://16.163.136.105',
  SOCKET_URL: 'http://16.163.136.105',
} as const;

type Environment = 'development' | 'production';

/**
 * Anchor ENV 設定
 */
const envVariable = ((env: Environment | undefined) => {
  switch (env) {
    default:
      return development;
  }
})(process.env.ELU_ENV as Environment | undefined);

export default envVariable;
