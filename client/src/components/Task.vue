<template>
  <div class="task">
    <div class="allTasks">
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">Change
          Lists</button>
        <div class="dropdown-menu">
          <p class="dropdown-item" v-for="list in lists" @click="updateTask(list._id)">{{list.title}}</p>
        </div>
      </div>
      <h5 style="color: blue;">{{taskData.title}}</h5>
      <h6 style="color: blue;">{{taskData.description}}</h6>
      <button @click="deleteTask(taskData._id)"><i class="far fa-trash-alt"></i></button>
      <form @submit.prevent="addComment">
        {{taskData._id}}
        <input type="text" placeholder="description" v-model="newComment.description" required>
        <button type="submit">Add Comment</button>
      </form>
      <div v-for="comment in taskData.comments">
        {{comment.description}}
        <button @click="deleteComment(comment._id)"><i class="far fa-trash-alt"></i></button>
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
        },
        newComment: {
          description: ''
        }
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {
      addTask() {
        this.newTask.boardId = this.$route.params.boardId
        this.newTask.listId = this.listId
        this.$store.dispatch('addTask', this.newTask)
      },
      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', { taskId, listId: this.listId })
      },
      addComment() {
        debugger
        this.$store.dispatch('addComment', {
          taskId: this.taskData._id,
          description: this.newComment.description
        })
      },
      deleteComment(id) {
        debugger
        this.$store.dispatch('deleteComment', {
          taskId: this.taskData._id,
          commentId: id
        })
      },
      updateTask(listId) {
        this.$store.dispatch('updateTask', {
          taskId: this.taskData._id,
          listId: listId,
          oldList: this.taskData.listId
        })
      }
    },
    props: ["listId", "taskData"]
  }

</script>

<style>


</style>