<template>
  <div class="board container-fluid">
    <div class="row justify-content-center">
      <div class="col-1">
        <h3>
          <router-link to="/"><i class="far fa-snowflake"></i> Boards</router-link>
        </h3>
      </div>
      <div class="col-11 boardTitle">
        <h2>{{board.title}}</h2>
      </div>
    </div>
    <div class="row form-group col-12 justify-content-center">
      <div class="col-8">
        <form @submit.prevent="addList">
          <input type="text" placeholder="title" v-model="newList.title" required class="form-control mt-2">
          <input type="text" placeholder="description" v-model="newList.description" class="form-control mt-2">
          <button type="submit" class="btn btn-primary btn-block mt-2">Create List</button>
        </form>
      </div>
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
      // this.$store.dispatch("getBoard", this.$route.params.boardId)
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
        }) || { title: 'loading...' }
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

<style>
  .boardTitle {
    font-family: 'Work Sans', sans-serif;
    font-size: 38px;
  }
</style>