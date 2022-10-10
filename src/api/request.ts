import axios, { AxiosRequestConfig } from "axios";
import qs from "qs";

axios.defaults.baseURL = "http://localhost:3000/";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default function request(
  url: string,
  method: string = "get",
  data = {}
): Promise<any> {
  return new Promise((resolve, reject) => {
    let option: AxiosRequestConfig = {
      url,
      method,
      params: data,
      data: qs.stringify(data),
      withCredentials: false,
    };

    if (method.toLowerCase() === "get") {
      delete option.data;
    } else if (method.toLowerCase() === "post") {
      delete option.params;
    }

    axios(option)
      .then((res) => {
        // console.log(res.data, "from request.ts line 30");
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
