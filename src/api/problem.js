import http from "../http";
const prix = process.env.NODE_ENV === "development" ? "/apiCount":"";
export const getProblem = (data) =>
  http({
    url: `${prix}/viewIssueList`,
    method: "post",
    data
  });
