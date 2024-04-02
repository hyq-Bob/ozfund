import http from "../http";
const prix = process.env.NODE_ENV === "development" ? "/apiCount" :"";
export const getDynamic = (data) =>
  http({
    url: `${prix}/viewDynamicList`,
    method: "post",
    data
  });
