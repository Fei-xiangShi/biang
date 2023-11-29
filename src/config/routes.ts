const RouteConfig = {
  indexPage: {
    url: "/pages/index/index",
  },
  classTablePage: {
    url: "/pages/classTable/classTable",
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
        url: "sub/verifyEmail",
      },
      {
        icon: "custom-icon custom-icon-yuyanqiehuan",
        text: "更改语言",
        url: "languageSetting",
      },
    ],
    settings: {
      url: "sub/settings",
    },
    login: {
      url: "login/login",
      welcome: {
        url: "welcome",
      },
      emailRegister: {
        url: "emailRegister",
      },
      wxRegister: {
        url: "wxRegister",
      },
    },

    verifyCode: {
      url: "verifyCode",
    },
  },
  classDetail: {
    url: "/pages/classDetail/classDetail",
  },
  admin: {
    notices: {
      url: "/pages/admin/notices/notices",
      add: {
        url: "/pages/admin/notices/add",
      },
      modify: {
        url: "/pages/admin/notices/modify",
      },
    },
    test: {
      url: "/pages/admin/test/test",
    },
  },
};

export default RouteConfig;
