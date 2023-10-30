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
  setting: {
    url: "sub/setting",
  },
  my: {
    url: "/pages/my/my",
    myItemList: [
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        // text:"功能1",
        url: "sub/uploadAvator",
        func:""
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func:"",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func:"",
      },
      {
        icon: "custom-icon custom-icon-biaodan",
        text: i18n.global.t("占位"),
        url: "sub/introduction",
        func:""
      },
      {
        icon:"custom-icon custom-icon-tuwen",
        text: i18n.global.t("theme"),
        url: "sub/introduction",
        func:"",
      },
      {
        icon: "custom-icon custom-icon-yuyanqiehuan",
        text: i18n.global.t("language"),
        url: "sub/introduction",
        func:"languageSetting"
      },
    ],
  },
};

export default RouteConfig;
