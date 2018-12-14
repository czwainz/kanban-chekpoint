<template>
  <div class="task card">
    <div class="allTasks">
      <div class="dropdown">
        <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown">Change
          Lists</button>
        <div class="dropdown-menu">
          <p class="dropdown-item" v-for="list in lists" @click="updateTask(list._id)">{{list.title}}</p>
        </div>
      </div>
    </div>
    <div class="task-details">
      <ul>
        <li>
          <h5 style="color: blue;">{{taskData.title}}</h5>
        </li>
        <h6 style="color: blue;">{{taskData.description}}</h6>
      </ul>
      <button @click="deleteTask(taskData._id)" class="btn btn-outline-info"><i class="far fa-trash-alt"></i></button>
      <br>
      <button type="button" class="btn btn-outline-primary" data-toggle="modal" @click="openModal('#task-'+taskData._id)"
        :data-target="'#task-'+taskData._id"><i class="far fa-plus-square"></i></button>
    </div>

    <div class="modal fade show" :id="'task-'+taskData._id" tabindex="-1" role="dialog">
      <div class="modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header top">

            <h3 class="modal-title">Add Comment Form</h3>
            <!-- <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button> -->
          </div>

          <div class="modal-body">
            <form @submit.prevent="addComment" class="form-group">
              <input type="text" placeholder="description" v-model="newComment.description" required class="form-control">

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal('task-'+taskData._id)" data-dismiss="modal">Close</button>
                <button type="submit" class="btn btn-primary">Add Comment</button>
                <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>


    <div v-for="comment in taskData.comments">
      {{comment.description}}
      <button @click="deleteComment(comment._id)" class="btn btn-outline-info"><i class="far fa-trash-alt"></i></button>
    </div>
  </div>


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
        // modal: false
      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    methods: {

      deleteTask(taskId) {
        this.$store.dispatch('deleteTask', { taskId, listId: this.listId })
      },
      addComment() {
        this.$store.dispatch('addComment', {
          taskId: this.taskData._id,
          description: this.newComment.description
        })
      },
      deleteComment(id) {
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
      },
      openModal(id) {
        $(id).show()
        $('.modal-backdrop').show()
      },
      closeModal(id) {
        $('#' + id).hide('fade')
        $('.modal-backdrop').hide()
        $('body').removeClass('modal-open')
      }
    },
    props: ["listId", "taskData"]
  }

</script>

<style>
</style>