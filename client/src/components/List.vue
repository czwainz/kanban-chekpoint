<template>
  <div class="list col-6">

    <div class="lists justify-content-center">
      <div class="card">
        <div class="card-body">
          <h4>{{list.title}}</h4>
          <p>{{list.description}}</p>
          <button @click="deleteList">Delete List</button>
        </div>

        <div class="div">
          <Tasks v-for="task in tasks" :key="task._id" :taskData="task" :listId="list._id"></Tasks>
        </div>
        <form @submit.prevent="addTask" :listId="list._id">
          <input type="text" placeholder="title" v-model="newTask.title" required>
          <input type="text" placeholder="description" v-model="newTask.description">
          <button type="submit">Create Task</button>
        </form>
      </div>
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
        },
        newTask: {
          title: '',
          description: ''
        }
      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.list._id)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.list._id] || []
      }
    },
    methods: {
      deleteList() {
        this.$store.dispatch('deleteList', { listId: this.list._id, boardId: this.boardId })
      },
      addTask() {
        this.newTask.boardId = this.$route.params.boardId
        this.newTask.listId = this.list._id
        this.$store.dispatch('addTask', this.newTask)
        this.newTask = { title: "", description: "" }
      },
    },
    components: {
      Tasks
    },
    props: ["boardId", 'list']
  }
</script>

<style scoped>
</style>