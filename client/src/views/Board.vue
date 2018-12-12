<template>
  <div class="board container-fluid">
    <div class="row justify-content-center">
      {{boardId}}
    </div>
    <div v-for="list in lists" :key="list._id"></div>
    <div class="row">
      <List :boardId="boardId"></List>
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
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      getLists() {
        this.$store.dispatch('getLists', this.$route.params.id)
      }
    },
    components: {
      List,
      Task
    },
    props: ["boardId"]
  };
</script>