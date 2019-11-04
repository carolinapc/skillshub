import axios from "axios";

export default {
  //USER
  authenticate: function(loginData) {
    return axios.post("/api/user/auth", loginData);
  },
  signOut: function () {
    return axios.post("/api/user/signout");
  },
  getUserSession: function () {
    return axios.get("/api/user/auth");
  },
  getUserAccount: function () {
    return axios.get("/api/user/account");
  },
  signUp: function (data) {
    return axios.post("/api/user", data);
  },
  resetPassword: function (data) {
    return axios.post("/api/user/resetpwd", data);
  },
  updateUser: function (data) {
    return axios.put("api/user", data);
  },
  getUserSkills: function () {
    return axios.get("api/user/skills");
  },
  createUserSkill: function (data) {
    return axios.post("api/user/skills", data);
  },
  updateUserSkill: function (data) {
    return axios.put("api/user/skills", data);
  },

  //CATEGORY
  getCategories: function () {
    return axios.get("api/category");
  },

  //CONSTANTS
  getPriceTypes: () => {
    const priceTypes = [
      {
        type: "H",
        name: "Per Hour"
      },
      {
        type: "D",
        name: "Per Day"
      },
      {
        type: "J",
        name: "Per Job"
      }
    ];

    return priceTypes;
  },

  uploadFile: function (data) {
    return axios.post("api/utils/uploadFile", data);
  }

};
