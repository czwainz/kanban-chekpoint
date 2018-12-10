<template>
  <div class="board">
    {{boardId}}
    <div v-for="list in lists" :key="list._id">
      <router-link :to="{name: 'list', params: {listId: list._id}}">{{list.title}}</router-link>
      {{list.title}}
      <!-- {{boardId}}
    <router-link :to="{name: 'List', params: {listId: list._id}}" v-for="list in lists">{{list.title}}</router-link> -->
    </div>
  </div>
</template>

<script>
  import List from '@/components/List.vue'

  export default {
    name: "board",
    created() {
      //blocks users not logged in
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
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
      List
    },
    props: ["boardId", "lists"]
  };
</script>