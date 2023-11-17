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
  my: {
    url: "/pages/my/my",
    myItemList: [
      {
        icon: "custom-icon custom-icon-biaodan",
        text: "课表绑定",
        url: "sub/changeClassTableUrl",
      },
      {
        icon: "custom-icon custom-icon-tuwen",
        text: "邮箱验证",
        url: "sub/emailVerify",
      },
      {
        icon: "custom-icon custom-icon-yuyanqiehuan",
        text: "更改语言",
        url: "",
        func: "languageSetting",
      },
    ],
    settings: {
      url: "sub/settings",
    },
    login: {
      url: "sub/login",
    },
  },
  classDetail: {
    url: "/pages/classDetail/classDetail",
  },
};

export default RouteConfig;
