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
        icon: "home",
        text: i18n.global.t("hello"),
        // text:"功能1",
        url: "sub/uploadAvator",
      },
      {
        icon: "home",
        text: "introduction",
        url: "sub/introduction",
      },
      {
        icon: "home",
        text: "功能3",
        url: "sub/introduction",
      },
      {
        icon: "home",
        text: "功能4",
        url: "sub/introduction",
      },
      {
        icon: "home",
        text: i18n.global.t("theme"),
        url: "sub/introduction",
      },
      {
        icon: "home",
        text: i18n.global.t("language"),
        url: "sub/introduction",
      },
    ],
  },
};

export default RouteConfig;
