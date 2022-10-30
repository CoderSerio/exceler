export const asyncTestFunc = async () => {
  const res = await new Promise<number>((resolve) => {
    resolve(1);
  })
  return res;
};

