const request = (
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  data: object
) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method,
      data,
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

const put = (url: string, data: object) => {
  return request(url, "PUT", data);
}

const del = (url: string, data: object) => {
  return request(url, "DELETE", data);
}

const http = {
  get,
  post,
  put,
  del,
};

export default http;
