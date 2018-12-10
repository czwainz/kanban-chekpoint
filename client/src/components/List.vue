<template>
  <div class="list">
    {{lists}}
  </div>
</template>

<script>
  export default {
    name: 'List',
    data() {
      return {

      }
    },
    computed: {
      lists() {
        return this.$store.state.lists
      }
    },
    mounted() {
      this.$store.dispatch('getLists', this.$route.params.id)
    },
    methods: {},
    props: ["listsId"]
  }
</script>

<style scoped>
</style>