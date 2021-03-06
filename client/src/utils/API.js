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
  changePassword: function (data) {
    return axios.post("/api/user/changepwd", data);
  },
  updateUser: function (data) {
    return axios.put("/api/user", data);
  },
  getUserSkills: function () {
    return axios.get("/api/user/skills");
  },
  createUserSkill: function (data) {
    return axios.post("/api/user/skills", data);
  },
  updateUserSkill: function (data) {
    return axios.put("/api/user/skills", data);
  },

  userProfile: function (id) {
    return axios.get(`/api/user/find/${id}`);
  }, 

  //CATEGORY
  getCategories: function () {
    return axios.get("/api/category");
  },

  getCategoriesMostAvailable: function (nolimit) {
    return axios.get(`/api/category/grouped?nolimit=${nolimit}`);
  },

  //SKILLS
  getSkills: function (data) {
    data.id = data.id || "";
    data.search = data.search || "";
    data.categoryId = data.categoryId || "";
    data.zipCode = data.zipCode || "";
    data.distanceRange = data.distanceRange || "";
    data.latitude = data.latitude || "";
    data.longitude = data.longitude || "";

    return axios.get(`/api/skill?id=${data.id}&search=${data.search}&categoryId=${data.categoryId}&zipCode=${data.zipCode}&distanceRange=${data.distanceRange}&latitude=${data.latitude}&longitude=${data.longitude}`);  
  },

  //get all skills to fill data list
  allSkills: function () {
    return axios.get("/api/skill/all");
  },

  //REVIEWS
  addReview: function (data) {
    return axios.post("/api/skill/review", data);
  },

  //CONTACTS
  getSkillContact: function (skillId) {
    return axios.get(`/api/contact/skill/${skillId}`);
  },

  createSkillContact: function (data) {
    return axios.post(`/api/contact/skill`, data);
  },

  getUserRequests: function () {
    return axios.get(`/api/contact`);
  },

  getUserClients: function () {
    return axios.get(`/api/contact/clients`);
  },

  updateContact: function (data) {
    return axios.put("/api/contact/chat", data);
  
  },

  getPostalCodeFromGeoLocation: function (data) {
    return axios.get(`/api/google/postalcode/${data.latitude}/${data.longitude}`);
  }

};
