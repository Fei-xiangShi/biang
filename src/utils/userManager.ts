import universities from "@/config/universities";

const language: "zh-Hans" | "en" = uni.getStorageSync("lang");

export const userInitFromRequest = (res: any) => {
  uni.setStorageSync("email", res.data.data.email);
  uni.setStorageSync("aueduSession", res.data.data.auedu_session);
  uni.setStorageSync("username", res.data.data.username);
  uni.setStorageSync("schoolId", res.data.data.university);
  uni.setStorageSync("classTableUrl", res.data.data.ics_url);
  uni.setStorageSync(
    "school",
    Object.keys(universities[language] as { [key: string]: string }).find(
      (key) =>
        (universities[language] as { [key: string]: string })[key] ===
        res.data.data.university
    )
  );
};

export const userLogout = () => {
  uni.removeStorageSync("classTableUrl");
  uni.removeStorageSync("aueduSession");
  uni.removeStorageSync("classTableContent");
  uni.removeStorageSync("username");
  uni.removeStorageSync("userAvatarUrl");
  uni.removeStorageSync("email");
};

export const userWxCode = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider: "weixin",
      success: (res) => {
        uni.getUserInfo({
          provider: "weixin",
          success: () => {
            resolve(res.code);
          },
        });
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

