<template>
  <div class="task">
    <div v-for="task in tasks">
      <h5 style="color: blue;">{{tasks}}</h5>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Task',
    data() {
      return {

      }
    },
    mounted() {
      this.$store.dispatch('getTasks', this.listId)
    },
    computed: {
      tasks() {
        return this.$store.state.tasks
      }
    },
    methods: {}
  }

</script>

<style>


</style>