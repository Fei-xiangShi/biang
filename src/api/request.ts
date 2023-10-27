const request = (url: string, method: "GET" | "POST", data: object) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method: method,
      data: data,
      success(result) {
        resolve(result);
      },
      fail(error) {
        reject(error);
      },
    });
  });
};

const get = (url: string) => {
  return request(url, "GET", {});
};

const post = (url: string, data: object) => {
  return request(url, "POST", data);
};

const http = {
    get,
    post
}

export default http