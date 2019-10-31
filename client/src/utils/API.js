import axios from "axios";

export default {
  // Authenticate user
  authenticate: function(loginData) {
    return axios.post("/api/user/auth", loginData);
  },
  signOut: function () {
    return axios.post("/api/user/signout");
  },
  getUserSession: function () {
    return axios.get("/api/user/auth");
  },
  signUp: function (data) {
    return axios.post("/api/user", data);
  },
  resetPassword: function (data) {
    return axios.post("/api/user/resetpwd", data);
  }
};
