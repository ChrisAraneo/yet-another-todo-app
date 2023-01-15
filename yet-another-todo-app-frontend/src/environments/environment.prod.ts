export const environment = {
  production: true,
  api: (() => {
    throw new Error('Production API variables are not defined!');
  })(), // TODO To be yet defined
};
