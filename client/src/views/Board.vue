<template>
  <div class="board container-fluid">
    <div class="row justify-content-center">
      <div class="col-1">
        <router-link to="/"><i class="far fa-snowflake"></i> Boards</router-link>
      </div>
      <div class="col-11">
        <h3>{{board.title}}</h3>
      </div>
    </div>
    <div class="form col-12 justify-content-center">
      <form @submit.prevent="addList">
        <input type="text" placeholder="title" v-model="newList.title" required>
        <input type="text" placeholder="description" v-model="newList.description">
        <button type="submit">Create List</button>
      </form>
    </div>
    <div class="row">
      <List v-for="list in lists" :list="list" :key="list._id" :boardId="boardId"></List>
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'
  import Task from '@/components/Task.vue'

  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$route.params.boardId) {
        this.$router.push({ name: "boards" });
      }
    },
    mounted() {
      return this.$store.dispatch("getLists", this.boardId);
      this.$store.dispatch("getBoard", this.$route.params.boardId)
    },
    data() {
      return {
        newList: {
          title: '',
          description: ''
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      },
      board() {
        return this.$store.state.boards.find(board => {
          return this.boardId == board._id
        })
      }
    },
    methods: {
      // getLists() {
      //   this.$store.dispatch('getLists', this.$route.params.id)
      // },
      addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('addList', this.newList)
        this.newList = { title: "", description: "" }; //resets newList in data back ot default
      },
    },
    components: {
      List,
      Task
    },
    props: ["boardId"]
  };
</script>