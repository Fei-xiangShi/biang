import { i18n } from "@/main";

const RouteConfig = {
  indexPage: {
    url: "/pages/index/index",
  },
  classTablePage: {
    url: "/pages/classTable/classTable",
  },
  schoolList: {
    url: "/pages/schools/index",
  },
  setting: {
    url: "sub/setting",
  },
  my: {
    url: "/pages/my/my",
    myItemList: [
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("hello"),
        // text:"功能1",
        url: "sub/uploadAvator",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("loading"),
        url: "sub/introduction",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("loading"),
        url: "sub/introduction",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("loading"),
        url: "sub/introduction",
      },
      {
        icon:"custom-icon custom-icon-tuwen",
        text: i18n.global.t("theme"),
        url: "sub/introduction",
      },
      {
        icon: "custom-icon custom-icon-yuyanqiehuan",
        text: i18n.global.t("language"),
        url: "sub/introduction",
      },
    ],
  },
};

export default RouteConfig;
