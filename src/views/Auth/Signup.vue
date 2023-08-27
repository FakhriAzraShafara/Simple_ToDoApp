<template>
  <main class="main-content">
    <section class="section">
      <div class="container">
        <div class="row justify-center align-center">
          <div class="card card-plain">
            <div class="card-header text-center">
              <h3 class="text-white font-weight-bolder">Let's Sign Up to Create Your Account!</h3>
            </div>
            <div class="card-body bg-white">
              <form @submit.prevent="submitRegist" class="form">
                <div class="mb-3">
                  <input
                    type="text"
                    placeholder="Name"
                    aria-label="Name"
                    v-model="input.name"
                    class="input"
                  />
                </div>
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
                    <span class="text-white" style="padding: 4px">I agree to the</span>
                    <a href="javascript:;" class="text-blue font-weight-bolder"
                      >Terms and Conditions</a
                    >
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
              Already have an account?
              <router-link class="text-blue font-weight-bolder" :to="{ name: 'SigninComponent' }"
                >Sign in</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { mapActions } from 'pinia'
import d$auth from '@/stores/auth'

export default {
  name: 'SignupComponent',
  data() {
    return {
      input: {
        username: '',
        name: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(d$auth, ['a$register']),
    async submitRegist() {
      try {
        await this.a$register({ ...this.input })
        this.$router.replace({ name: 'SigninComponent' })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

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
