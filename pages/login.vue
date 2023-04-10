<template>
  <div class="login-form">
    <div class="form-field"><el-input v-model="login" placeholder="Имя пользователя..."></el-input></div>
    <div class="form-field"><el-input v-model="pswd" placeholder="Пароль..."></el-input></div>
    <div class="form-control"><el-button type="primary" @click="checkLogin">Авторизоваться</el-button></div>
    <div class="form-error">{{ error }}</div>
  </div>
</template>
<script>
export default {
  name: 'LoginPage',
  layout: 'anonymous',
  data() {
    return {
      isAuthenticated: false,
      login: '',
      pswd: '',
      error: '',
    }
  },
  mounted() {},
  methods: {
    checkLogin() {
      if (this.login === 'test_user' && this.pswd === 'Q1w2e3r4') {
        this.$cookies.set('isAuthenticated', true)
        this.$router.push('/')
      } else {
        this.error = 'Введены неверные учетные данные'
      }
    },
  },
}
</script>

<style lang="scss">
.login-form {
  width: 300px;
  margin: max(20px, 50vh - 150px) auto;

  > div {
    padding: 10px 0;
  }
}

.form-error {
  color: red;
}
</style>
