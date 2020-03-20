import axios from "axios";
import { url } from "../../config/api";
import moment from "moment";

const findPostIndex = (arr, id) => arr.findIndex(a => a.id === id);

const state = {
  postList: [],
  total: 0,
  error: null
};
const mutations = {
  setPostList(state, list) {
    state.postList = list;
  },
  setError(state, error) {
    state.error = error;
  },
  setTotal(state, total) {
    state.total = total;
  },
  addPost(state, post) {
    state.postList.unshift(post);
  },
  removePost(state, index) {
    state.postList.splice(index, 1);
  },
  setPostItem(state, { index, post }) {
    state.postList[index] = post;
  }
};

const actions = {
  postUpdate({ commit, state }, newPost) {
    const postIndex = findPostIndex(state.postList, newPost.id);
    if (postIndex != -1) {
      return axios
        .patch(`${url}/posts/${newPost.id}`, {
          ...newPost,
          updatedAt: moment().format()
        })
        .then(res => {
          commit("setPostItem", { index: postIndex, post: res.data });
        })
        .catch(() => {
          commit("setError", "Ошибка на сервера при попытке изменении поста");
        });
    } else {
      commit("setError", "Ошибка, элемент не найден");
    }
  },

  postCreate({ commit }, post) {
    return axios
      .post(`${url}/posts`, post)
      .then(res => {
        commit("addPost", res.data);
      })
      .catch(() => commit("setError", "Ошибка при попытке создания поста"));
  },
  postRemove({ commit, state }, id) {
    const postIndex = findPostIndex(state.postList, id);
    if (postIndex != -1) {
      return axios
        .delete(`${url}/posts/${id}`)
        .then(() => {
          commit("removePost", postIndex);
        })
        .catch(() => {
          commit("setError", "Ошибка при попытке удаления поста");
        });
    } else {
      commit("setError", "Ошибка, элемент не найден");
    }
  },
  setPostClaps({ dispatch, state }, { id, claps }) {
    const postIndex = findPostIndex(state.postList, id);
    const post = state.postList[postIndex];
    const newPost = { ...post, claps: post.claps + claps };
    if (postIndex != -1) {
      return dispatch("postUpdate", newPost);
    }
  },
  getPostList({ commit }, params) {
    let config = {
      _page: 1,
      _limit: 10,
      _order: "desc",
      _sort: "createdAt",
      ...params
    };
    return axios
      .get(`${url}/posts`, {
        params: config
      })
      .then(res => {
        commit("setTotal", +res.headers["x-total-count"]);
        commit("setPostList", res.data);
      })
      .catch(() => {
        commit("setError", "Ошибка при получении списка постов");
      });
  }
};
const namespaced = true;
const getters = {};
export default {
  state,
  getters,
  mutations,
  actions,
  namespaced
};
