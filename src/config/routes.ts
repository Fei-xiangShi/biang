import { i18n } from "@/main";

const RouteConfig = {
  indexPage: {
    url: "/pages/index/index",
    toolbox: [
      {
        icon: "home",
        text: i18n.global.t("占位"),
      },
      {
        icon: "search",
        text: i18n.global.t("占位"),
      },
      {
        icon: "cart",
        text: i18n.global.t("占位"),
      },
      {
        icon: "account",
        text: i18n.global.t("占位"),
      },
    ],

    popularFunctions: [
      {
        icon: "home",
        text: i18n.global.t("占位"),
      },
      {
        icon: "search",
        text: i18n.global.t("占位"),
      },
      {
        icon: "cart",
        text: i18n.global.t("占位"),
      },
      {
        icon: "account",
        text: i18n.global.t("占位"),
      },
      {
        icon: "home",
        text: i18n.global.t("占位"),
      },
      {
        icon: "search",
        text: i18n.global.t("占位"),
      },
      {
        icon: "cart",
        text: i18n.global.t("占位"),
      },
      {
        icon: "account",
        text: i18n.global.t("占位"),
      },
      {
        icon: "account",
        text: i18n.global.t("占位"),
      },
      {
        icon: "account",
        text: i18n.global.t("占位"),
      },
    ],
  },
  classTablePage: {
    url: "/pages/classTable/classTable",
  },
  schoolList: {
    url: "/pages/schools/index",
  },
  my: {
    url: "/pages/my/my",
    myItemList: [
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        // text:"功能1",
        url: "sub/uploadAvator",
        func: "",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func: "",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func: "",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func: "",
      },
      {
        icon: "custom-icon custom-icon-tuwen",
        text: i18n.global.t("主题"),
        url: "sub/introduction",
        func: "",
      },
      {
        icon: "custom-icon custom-icon-yuyanqiehuan",
        text: i18n.global.t("更改语言"),
        url: "",
        func: "languageSetting",
      },
    ],
    setting: {
      url: "sub/setting",
    },
    login: {
      url: "sub/login",
    },
  },
};

export default RouteConfig;
