import http from "../http";
const prix = process.env.NODE_ENV === "production" ? '/': "/apiCount/";
export const getNotic = (data) =>
  http({
    url: `${prix}viewAnnouncementList`,
    method: "post",
    data
  });
