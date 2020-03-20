import axios from "axios";
import { url } from "../../config/api";

const state = {
  user: null,
  error: null
};

const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setError(state, error) {
    state.error = error;
  }
};

const actions = {
  async getUserFromStorage({ commit }) {
    const user = await localStorage.getItem("user");
    if (user) {
      return commit("setUser", JSON.parse(user));
    }
  },
  async userLogout({ commit }) {
    await localStorage.removeItem("user");
    commit("setUser", null);
  },
  userAuth({ commit }, user) {
    commit("setError", null);
    return axios
      .get(`${url}/users`, {
        params: {
          login_like: user.email.trim(),
          password_like: user.password.trim(),
          _limit: 1
        }
      })
      .then(res => {
        if (res.data && res.data.length) {
          commit("setError", null);
          commit("setUser", res.data[0]);
          localStorage.setItem("user", JSON.stringify(res.data[0]));
        } else {
          commit("setError", "Неверный логин или пароль");
        }
      })
      .catch(() => {
        commit("setError", "Ошибка на сервере или сервер не доступен");
      });
  }
};

const getters = {
  user(state) {
    return state.user;
  },
  role(state) {
    return state.user ? state.user.role : "guest";
  },
  isAuth(state) {
    return state.user ? true : false;
  }
};
const namespaced = true;
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced
};
