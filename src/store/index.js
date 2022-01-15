import Vue from 'vue'
import Vuex from 'vuex'

import { blog } from "./modules/blog.js";
import { post } from "./modules/post.js";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    blog,
    post
  }
})
