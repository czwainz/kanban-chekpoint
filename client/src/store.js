import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: "//localhost:3000/auth/",
  timeout: 3000,
  withCredentials: true
})

let api = Axios.create({
  baseURL: "//localhost:3000/api/",
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    activeBoard: {},
    lists: [],
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setBoards(state, boards) {
      state.boards = boards
    },
    setBoard(state, board) {
      state.activeBoard = board
    },
    setLists(state, lists) {
      state.lists = lists
    },
    addList(state, list) {
      state.lists.push(list)
    },
    setTasks(state, tasks) {
      state.tasks = tasks
    }
  },
  actions: {
    //AUTH STUFF
    register({ commit, dispatch }, newUser) {
      auth.post('register', newUser)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },
    authenticate({ commit, dispatch }) {
      auth.get('authenticate')
        .then(res => {
          commit('setUser', res.data)
          // router.push({ name: 'boards' })
        }).catch
    },
    login({ commit, dispatch }, creds) {
      auth.post('login', creds)
        .then(res => {
          commit('setUser', res.data)
          router.push({ name: 'boards' })
        })
    },

    //BOARDS
    getBoards({ commit, dispatch }) {
      api.get('boards')
        .then(res => {
          console.log('boards', res.data)
          commit('setBoards', res.data)
        })
    },
    getBoard({ commit, dispatch }, boardId) {
      api.get('boards/' + boardId)
        .then(res => {
          commit('setBoard', res.data)
        })
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post('boards', boardData)
        .then(serverBoard => {
          dispatch('getBoards')
        })
    },
    deleteBoard({ commit, dispatch }, boardId) {
      api.delete('boards/' + boardId)
        .then(res => {
          dispatch('getBoards')
        })
    },
    //LISTS
    getLists({ commit }, boardId) {
      api.get('boards/' + boardId + '/lists/')
        .then(res => {
          console.log('lists', res)
          commit('setLists', res.data)
        })
    },
    addList({ commit, dispatch }, listData) {
      api.post('lists/', listData)
        .then(res => {
          console.log('new lists', res.data)
          // dispatch('getLists', listData.boardId)
          commit('addList', res.data)
        })
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete('lists/' + payload.listId)
        .then(res => {
          console.log('list deleted')
          dispatch('getLists', payload.boardId)
        })
    },
    //TASKS
    getTasks({ commit }, listId) {
      api.get('lists/' + listId + '/tasks/')
        .then(res => {
          console.log('tasks', res.data)
          commit('setTasks', res.data)
        })
    }
  }
})