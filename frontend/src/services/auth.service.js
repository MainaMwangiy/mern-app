import axios from "axios";
const API_URI = "http://localhost:5000"

class AuthService {
  login(username, password) {
    return axios
      .post(API_URI + "/api/v1/login", {username, password})
      .then((user) => {
        if (!user.data.accessToken) {
          localStorage.setItem("user", JSON.parse(user.data));
        }
        return user.data;
      });
  }
  logout() {
    localStorage.removeItem("user");
  }
  register(username, email, password) {
    return axios.post(API_URI + "/api/v1/create-new-user", {
      username,
      email,
      password,
    });
  }
}

export default new AuthService();
