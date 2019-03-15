<template>
  <div class="login container-fluid">
    <div class="row justify-content-center headline">
      <p>Welcome to the Winter Wonderland</p>
    </div>
    <div class="row form-group justify-content-center">
      <div class="col-4">
        <form v-if="loginForm" @submit.prevent="loginUser">
          <input type="email" v-model="creds.email" placeholder="email" class="form-control">
          <small class="form-text text-muted">We'll never share your email with anyone else.</small>
          <input type="password" v-model="creds.password" placeholder="password" class="form-control">
          <button type="submit" class="btn btn-primary mt-1">Login</button>
        </form>
        <form v-else @submit.prevent="register">
          <input type="text" v-model="newUser.name" placeholder="name" class="form-control">
          <input type="email" v-model="newUser.email" placeholder="email" class="form-control mt-1">
          <small class="form-text text-muted">We'll never share your email with anyone else.</small>
          <input type="password" v-model="newUser.password" placeholder="password" class="form-control mt-1">
          <button type="submit" class="btn btn-primary mt-1">Create Account</button>
        </form>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4 bg-info registerTag rounded">
        <div @click="loginForm = !loginForm">
          <p v-if="loginForm">No account? Click here to Register </p>
          <p v-else>Already have an account? Click here to Login</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        loginForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      };
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    }
  };
</script>

<style>
  .headline {
    color: var(--primary);
    text-shadow: 1px 1px 3px grey;
    font-size: 45px;
  }

  .registerTag {
    color: whitesmoke;
    border: 1px solid var(--gray);
    align-items: center;
    padding-top: 10px;
    margin-top: 1rem;
  }
</style>