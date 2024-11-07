import { Middleware } from "redux";

export const logger: Middleware = () => (next) => (action) => {
  console.log("🚀 ~ logger ~ action:", action);
  next(action);
};

