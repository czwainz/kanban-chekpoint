<template>
  <div class="list col-6">

    <div class="lists justify-content-center">
      <div class="card">
        <div class="card-body row">
          <div class="col-10">

            <h4>{{list.title}}</h4>
            <p>{{list.description}}</p>
          </div>
          <div class="col-2">
            <button @click="deleteList" class="btn btn-outline-info"><i class="fas fa-trash"></i></button>
          </div>
        </div>
        <form @submit.prevent="addTask" :listId="list._id" class="form-group">
          <input type="text" placeholder="new task title" v-model="newTask.title" required class="form-control">
          <input type="text" placeholder="description" v-model="newTask.description" class="form-control">
          <button type="submit" class="btn btn-info">Create Task</button>
        </form>
        <div class="div">
          <Tasks v-for="task in tasks" :key="task._id" :taskData="task" :listId="list._id"></Tasks>
        </div>

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
  .card {}
</style>