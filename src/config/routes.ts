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
    login: {
      url: "login/login",
      emailRegister: {
        url: "emailRegister",
      },
      wxRegister: {
        url: "wxRegister",
      },
      emailLoginPassword: {
        url: "emailLoginPassword",
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
  options: {
    url: "/pages/options/options",
    optionList: [
      [
        {
          title: "options.账号资料",
          desc: "",
          url: "/options/account",
        },
      ],
      [
        {
          title: "options.主题设置",
          desc: "",
          url: "/options/theme",
        },
        {
          title: "options.清理缓存",
          desc: "",
          url: "/options/clearCache",
        },
        {
          title: "options.检查更新",
          desc: "",
          url: "/options/checkUpdate",
        },
        {
          title: "options.联系我们",
          desc: "",
          url: "/options/contactUs",
        },
      ],
      [
        {
          title: "options.隐私政策",
          desc: "",
          url: "/options/privacyPolicy",
        },
        {
          title: "options.用户协议",
          desc: "",
          url: "/options/userAgreement",
        },
        {
          title: "options.帮助中心",
          desc: "",
          url: "/options/helpCenter",
        },
      ],
      [
        {
          title: "options.捐赠我们",
          desc: "",
          url: "/options/donateUs",
        },
        {
          title: "options.关于",
          desc: "version-2.3.3",
          url: "/options/aboutUs",
        },
      ],
    ],
  },
};

export default RouteConfig;
