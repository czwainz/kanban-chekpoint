<template>
  <div class="list">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id" class="lists">
      <h4>{{list.title}}</h4>
      <p>{{list.description}}</p>
      <Tasks></Tasks>
      <button @click="deleteList(list._id)">Delete List</button>
    </div>
  </div>
</template>

<script>
  import Tasks from '@/components/Task.vue'

  export default {
    name: 'List',
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
      }
    },
    mounted() {
      this.$store.dispatch('getLists', this.$route.params.boardId)
    },
    methods: {
      addList() {
        this.newList.boardId = this.boardId
        this.$store.dispatch('addList', this.newList)
        this.newList = { title: "", description: "" }; //resets newList in data back ot default
      },
      deleteList(listId) {
        this.$store.dispatch('deleteList', { listId, boardId: this.boardId })
      }
    },
    component() {
      Tasks
    },
    props: ["boardId", "listId"]
  }
</script>

<style scoped>
</style>