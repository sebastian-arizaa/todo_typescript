export const logger = (store) => (next) => (action) => {
  console.log("🚀 ~ logger ~ action:", action);
  next(action);
};
