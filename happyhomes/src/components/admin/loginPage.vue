<template>
  <div class="container mx-auto my-5">

    <div class="form" v-if="isAdmin === false">
      <h2>Войдите</h2>
      <div class="alert alert-danger" role="alert" v-if="error">
        Неправильный логин и\или пароль. Попробуйте снова.
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Логин</label>
        <input type="text" class="form-control" id="username" v-model="inputed_username" aria-describedby="emailHelp" placeholder="Enter email" required>
      </div>
      <div class="form-group">

        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" class="form-control" v-model="inputed_password" id="password" placeholder="Password" required>
      </div>

      <button class="btn btn-primary" @click="loginForm">Войти</button>
    </div>
    <div class="form-group" v-else>
      <h2>Панель администратора</h2>
      <div class="submenu">
        <router-link to="/admin/add-village" >Добавить проект</router-link>
        <router-link to="/admin/add-home" >Добавить дом</router-link>
        <router-link to="/admin/delete-village" >Удалить проект</router-link>
        <router-link to="/admin/change-contacts" >Изменить контакты</router-link>
        <router-link to="/admin/add-sale" >Добавить акцию</router-link>
        <router-link to="/admin/delete-sale" >Удалить акцию</router-link>
        <router-link to="/admin/service" >Добавить услугу</router-link>
        <router-link to="/admin/service" >Удалить услугу</router-link>
      </div>
      <router-view />
    </div>

  </div>
</template>

<script>
import { ref } from 'vue'

import {  v4 as uuid } from 'uuid'




export default {
  name: "loginPage.vue",

  data() {
    return {
      inputed_username: '',
      inputed_password: '',
      error: false,
      isAdmin: false,


    }
  },

  created() {
    const generated_id = uuid()
    this.checkAdmin();

  },
  methods: {
    async checkAdmin() {
      //check admin
      const API_URL = "http://83.147.245.251:3000/admin-login-check"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token: window.localStorage.getItem('token')
          })
        }).then(res => res.json())

        this.isAdmin = result.isAdmin

      } catch (err) {
        console.log('result failed')
        return this.isAdmin = false;
      }

    },
    async loginForm() {
      const API_URL = "http://83.147.245.251:3000/admin-login"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.inputed_username,
            password: this.inputed_password,
            exp: Math.round(Date.now() / 1000)
          })
        }).then(res => res.json())
        console.log(result.error)
        if (result.error) {
          this.error = true;
        } else {
          window.localStorage.setItem('token', result.token)
          this.isAdmin = true;
          this.error = false;
        }
      } catch (err) {
        console.log(err)
      }

    },
    async addProject () {
      const projectAdd = this.project
      const projUid = uuid()
      this.project.link = this.selected + projUid
      this.project.id = projUid
      const API_URL = "http://83.147.245.251:3000/insert-project"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            projectAdd
          })
        }).then(res => res.json())


      } catch (err) {
        console.log('result failed')

      }

      console.log(this.selected)
    }
  },


}
</script>

<style scoped>
textarea {
  height: 300px;
}
textarea.small {
  height: 110px;
}
label {
  font-weight: 700;
}
.submenu a {
  margin-right: 30px;
  color: #000000;
  text-decoration: none;
  font-size: 30px;
  border: 1px solid transparent;
  transition: 0.15s ease;
  padding: 10px 20px;

}
.submenu {
  display: flex;
  flex-wrap: wrap;
}
.submenu a:hover {
  border-color: black;
}
</style>