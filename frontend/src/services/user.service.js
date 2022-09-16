import axios from "axios";

import authHeader from "./auth-header";

const API_URI = "http://localhost:5000"

class UserService {
  getPublicContent() {
    return axios.get(API_URI + "/api/test/all");
  }
  getUserBoard() {
    return axios.get(API_URI + "/api/test/user", { headers: authHeader() });
  }
  getModeratorBoard() {
    return axios.get(API_URI + "/api/test/mod", { headers: authHeader() });
  }
  getAdminBoard() {
    return axios.get(API_URI + "/api/test/admin", { headers: authHeader() });
  }
}

export default new UserService();
