<template>
  <div class="task">
    <div class="allTasks">
      <div v-for="task in tasks" :listId="listId">
        <div v-for="task in tasks" :taskId="taskId"></div>
        <h5 style="color: blue;">{{task.title}}</h5>
        <h6 style="color: blue;">{{task.description}}</h6>
      </div>
    </div>
    <form @submit.prevent="addTask">
      <input type="text" placeholder="title" v-model="newTask.title" required>
      <input type="text" placeholder="description" v-model="newTask.description">
      <button type="submit">Create Task</button>
    </form>

  </div>
</template>

<script>
  export default {
    name: 'Task',
    data() {
      return {
        newTask: {
          title: '',
          description: ''

        }

      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listId)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks[this.listId] || []
      }
    },
    methods: {
      addTasks() {
        let payload = {
          boardId: this.boardId,
          listId: this.listId
        }
        this.$store.dispatch('addTask', payload)
      }
    },
    props: ["listId"]
  }

</script>

<style>


</style>