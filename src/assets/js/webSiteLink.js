
/**
 * @summary 网站快捷链接
 */
const {VUE_APP_OZBET_URL,VUE_APP_OZFUND_URL, VUE_APP_AUPAY_URL } = process.env
export const webSiteLinkCut = [
  {
    href: VUE_APP_OZFUND_URL,
    target: "_blank",
    label: "footer.ozfund",
  },
  {
    href: VUE_APP_OZBET_URL,
    target: "_blank",
    label: "footer.ozbet",
  },
  {
    href: VUE_APP_AUPAY_URL,
    target: "_blank",
    label: "footer.auPay",
  },
  {
    href: "javaScript:viod 0;",
    label: "footer.aboutOzfund",
    toggleShow: false,
    children: [
      {
        target: "_blank",
        href: "@/pdf/Oz-White-Paper.pdf",
        label: "global.whitePaper",
      },
      {
        target: "_blank",
        href: "@/pdf/Oz-clause.pdf",
        label: "global.termsAndConditions",
      },
      {
        target: "_blank",
        href: "@/pdf/Oz-Privacy-Policy.pdf",
        label: "global.privacyPolicy",
      },
    ],
  },
  {
    href: "javaScript:viod 0;",
    label: "global.FollowUs",
    inline: true,
    toggleShow: false,
    children: [
      {
        href: "https://t.me/ozfundglobal",
        label: "",
        target: "_blank",
        imgUrl: require("@/assets/images/home/tele1.png"),
      },
      {
        href: "https://twitter.com/OzfundOfficial",
        label: "",
        target: "_blank",
        imgUrl: require("@/assets/images/home/tiw1.png"),
      },
      {
        href: "https://www.youtube.com/channel/UCo9sUDCiEL8Efu-DIcb2rlQ",
        label: "",
        target: "_blank",
        imgUrl: require("@/assets/images/home/youtube1.png"),
      },
    ],
  },
];
