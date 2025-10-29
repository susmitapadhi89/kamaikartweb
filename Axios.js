// import axios from "axios";
// import toast from "react-hot-toast";

// export const API = axios.create({
//   baseURL: "https://www.kamaikart.in/api", //"http://localhost:3000", // your API backend
//   withCredentials: true,
// });

// API.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 = Access token expired
//     if (error.response?.status === 403 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const res = await API.post(
//           "/auth/refresh",
//           {},
//           { withCredentials: true }
//         );

//         // 🔁 Retry original request
//         return API(originalRequest);
//       } catch (err) {
//         localStorage.removeItem("user");
//         localStorage.removeItem("isLoggedIn");
//         toast.error("Session expired. Please login again.");
//         setTimeout(() => {
//           window.location.href = "/home";
//         }, 1000);
//         return Promise.reject(err);
//       }
//     }

//     if (
//       error.response?.data?.message === "Refresh token is required" ||
//       error.response?.status === 401
//     ) {
//       toast.error("Session expired. Please login again.");
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 1500);
//     }

//     return Promise.reject(error);
//   }
// );

import axios from "axios";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: "https://www.kamaikart.in/api",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403) {
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => API(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await API.post(
            "/web/refresh",
            {},
            { withCredentials: true }
          );
          const newAccessToken = res.data?.accessToken;

          if (newAccessToken) {
            API.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
          }

          isRefreshing = false;
          processQueue(null, newAccessToken);

          return API(originalRequest);
        } catch (err) {
          isRefreshing = false;
          processQueue(err, null); // reject queued requests

          // ✅ Only logout once
          localStorage.removeItem("user");
          localStorage.removeItem("isLoggedIn");
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            window.location.href = "/home";
          }, 1000);

          return Promise.reject(err);
        }
      }
    }

    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Refresh token is required"
    ) {
      // ✅ Handles direct 401
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
      toast.error("Session expired. Please login again.");
      setTimeout(() => {
        window.location.href = "/home";
      }, 1000);
    }

    return Promise.reject(error);
  }
);
