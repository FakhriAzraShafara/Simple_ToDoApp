<template>
  <main class="mt-0 main-content bg-dark">
    <section>
      <div class="page-header min-vh-100 position-relative">
        <div class="container">
          <div class="row justify-center align-center">
            <div class="card card-plain">
              <div class="card-header text-center">
                <h3 class="text-white font-weight-bolder">Let's Sign in to your Account First</h3>
              </div>
              <div class="card-body bg-white">
                <form @submit.prevent="submitLogin" class="form">
                  <div class="mb-3">
                    <input
                      type="text"
                      v-model="input.username"
                      placeholder="Username"
                      name="username"
                      class="input lg"
                    />
                  </div>
                  <div class="mb-3">
                    <input
                      type="password"
                      v-model="input.password"
                      placeholder="Password"
                      name="password"
                      class="input lg"
                    />
                  </div>
                  <div class="checkbox">
                    <label class="checkbox-label" for="flexCheckDefault">
                      <input type="checkbox" checked />
                      <span class="text-white" style="padding: 4px">Remember me?</span>
                    </label>
                  </div>

                  <div class="text-center mt-4">
                    <button class="btn" type="submit">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-footer text-center bg-white">
              <p class="text-sm mt-3 mb-0">
                Don't have an account?
                <router-link class="text-blue font-weight-bolder" :to="{ name: 'Signup' }"
                  >Sign up</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.main-content {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.section {
  margin-top: 50px;
}

.card {
  border: 1px solid green;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 20px;
}

.card-body {
  padding: 20px;
}

.form {
  display: flex;
  flex-direction: column;
}

.input {
  padding: 8px;
  border: 3px solid green;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 16px;
}

.input.lg {
  font-size: 18px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  font-size: 14px;
}

.btn {
  padding: 10px 20px;
  background-color: green;
  border: none;
  color: #fff;
  border-radius: 5px;
  cursor: pointer;
}

.text-center {
  text-align: center;
  margin-top: 10px;
}

.text-blue {
  color: #007bff;
}

.text-white {
  color: #fff;
}

.text-sm {
  font-size: 14px;
}

.text-sm.mt-3 {
  margin-top: 10px;
}

.text-white.font-weight-bolder {
  font-weight: bold;
}

.text-center.mt-4 {
  margin-top: 20px;
}

.text-center.mb-0 {
  margin-bottom: 0;
}
</style>

<script>
import { mapActions } from 'pinia'
import d$auth from '@/stores/auth'
const body = document.getElementsByTagName('body')[0]

export default {
  name: 'SigninComponent',
  data: () => ({
    //Input
    input: {
      username: '',
      password: ''
    }
  }),
  methods: {
    ...mapActions(d$auth, ['a$login']),
    async submitLogin() {
      try {
        await this.a$login({ ...this.input })
        console.log('suksess')
        this.$router.replace({ name: 'Default' })
      } catch (e) {
        console.error(e)
        window.alert('Login Failed. Please Try again\n' + e)
      }
    }
  },

  created() {
    this.$store.state.hideConfigButton = true
    this.$store.state.showSidenav = false
    this.$store.state.showFooter = false
    body.classList.remove('bg-gray-100')
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false
    this.$store.state.showSidenav = true
    this.$store.state.showFooter = true
    body.classList.add('bg-gray-100')
  }
}
</script>
