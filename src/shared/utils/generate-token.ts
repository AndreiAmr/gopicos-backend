export const generateRandomToken = (): number => {
  const token = Math.floor(Math.random() * 9000) + 1000;
  return token;
};
