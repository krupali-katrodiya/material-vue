import axios from "axios";

const state = {
    posts: [],
    comment: null
};

const mutations = {
    getposts(state, message) {
        state.posts = message;
    },

    getComment(state, comment) {
        state.comment = comment;
    }
};

const actions = {
    getPostData({ commit }) {
        axios.get("https://jsonplaceholder.typicode.com/posts").then((res) => {
            commit('getposts', res.data);
        });
    },

    getSinglePost({ commit }, id) {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
            commit('getposts', res.data);
        });
    },

    getCommentOfPost({ commit }, id) {
        axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then((res) => {
            commit('getComment', res.data);
        }); 
    }
};

export const post = {
    namespaced: true,
    state,
    actions,
    mutations
};
