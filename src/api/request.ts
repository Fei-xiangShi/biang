const request = (
  url: string,
  method: "GET" | "POST" | "DELETE" | "PUT",
  data: object,
  header = {}
) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: url,
      method,
      data,
      header,
      success(result) {
        resolve(result);
      },
      fail(error) {
        reject(error);
      },
    });
  });
};

const get = (url: string, data = {}, header = {}) => {
  return request(url, "GET", data, header);
};

const post = (url: string, data: object, header = {}) => {
  return request(url, "POST", data, header);
};

const put = (url: string, data: object | any, header = {}) => {
  return request(url, "PUT", data, header);
};

const del = (url: string, data: object, header = {}) => {
  return request(url, "DELETE", data, header);
};

const http = {
  get,
  post,
  put,
  del,
};

export default http;
