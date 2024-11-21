import type { Context } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export const sendResponse = (
  c: Context,
  data: any,
  message: string = "Success",
  status: StatusCode = 200,
) => {
  return c.json(
    {
      data,
      message,
    },
    status,
  );
};
