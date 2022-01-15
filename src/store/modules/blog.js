import axios from "axios";

const state = {
    message: []
};

const mutations = {
    success(state, message) {
        state.message = message;
    }
};

const actions = {
    success({ commit }) {
        axios.get("https://jsonplaceholder.typicode.com/todos").then((res) => {
            commit('success', res.data);
        });
    },
  
    addTodo({commit}, data) {
       
        axios.post("https://jsonplaceholder.typicode.com/todos", data).then((res) => {
           
            return res.data;
        });
    },

    editTodo({commit}, id, data) {
        axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, data).then((res) => {
            return res.data;
        });
    },

    deleteTodo({commit}, id) {
        axios.post(`https://jsonplaceholder.typicode.com/todos/${id}`).then((res) => {
            commit('success', res.data);
        });
    },
};

export const blog = {
    namespaced: true,
    state,
    actions,
    mutations
};
