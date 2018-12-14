<template>
  <div class="boards container-fluid">
    <div class="row boardsTitle">
      <div class="col-11">

        <h3 class="boardsHeadline font-weight-bold">WELCOME TO THE BOARDS!!!</h3>
      </div>
      <div class="col-1">
        <button class=" btn btn-outline-danger" @click="logout">Log Out</button>
      </div>


      <div class="col-12">
        <h4>Choose your Snowboard</h4>
      </div>

    </div>
    <div class="row justify-content-center">
      <div class="col-6">

        <form @submit.prevent="addBoard" class=form-group>
          <input type="text" placeholder="title" v-model="newBoard.title" required class="form-control mb-2">
          <input type="text" placeholder="description" v-model="newBoard.description" class="form-control">
          <button type="submit" class="btn btn-outline-primary mt-1">Create Board</button>
        </form>
      </div>
    </div>


    <div class="row">
      <div v-for="board in boards" class="card col-4 mx-2" :key="board._id">
        <div class="card-title">
          <h3>
            <router-link :to="{name: 'board', params: {boardId: board._id}}">{{board.title}}</router-link>
          </h3>
        </div>
        <div class="card-body">
          <router-link :to="{name: 'board', params: {boardId: board._id}}"><img src='../assets/vertical-snowboard(1).png'></router-link>
        </div>
        <div class="footer">
          <button @click="deleteBoard(board._id) " class="btn btn-outline-warning"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "boards",
    created() {
      //blocks users not logged in
      // if (!this.$store.state.user._id) {
      //   this.$router.push({ name: "login" });
      // }
    },
    mounted() {
      if (!this.boards.length) {
        this.$store.dispatch("getBoards");
      }
    },
    data() {
      return {
        newBoard: {
          title: "",
          description: ""
        }
      };
    },
    computed: {
      boards() {
        return this.$store.state.boards;
      }
    },
    methods: {
      addBoard() {
        this.$store.dispatch("addBoard", this.newBoard);
        this.newBoard = { title: "", description: "" };
      },
      deleteBoard(boardId) {
        this.$store.dispatch("deleteBoard", boardId);
      },
      logout() {
        this.$store.dispatch('logout')
      }
    },

  };
</script>
<style scoped>
  .boardsTitle {
    color: var(--purple);
    font-weight: 400;
  }

  .card {
    display: flex;
    flex-wrap: wrap;
    transition: .3s linear;
  }

  .card:hover {

    transform: scale(1.1);
  }

  .boardsHeadline {
    text-shadow: 1px 1px 5px var(--gray);
    font-family: 'Snowburst One', cursive;
    font-size: 45px;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
  }

  a {
    text-decoration: none;
  }
</style>