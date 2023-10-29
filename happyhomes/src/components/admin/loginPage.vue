<template>
  <div>

    <div class="form" v-if="isAdmin === false">
      <h2>Войдите</h2>
      <div class="form-group">
        <label for="exampleInputEmail1">Логин</label>
        <input type="text" class="form-control" id="username" v-model="inputed_username" aria-describedby="emailHelp" placeholder="Enter email">
      </div>
      <div class="form-group">

        <label for="exampleInputPassword1">Пароль</label>
        <input type="password" class="form-control" v-model="inputed_password" id="password" placeholder="Password">
      </div>
      <button class="btn btn-primary" @click="loginForm">Войти</button>
    </div>
    <div class="form-add mb-5 pb-5" v-else>
      <h2>Добавить что-то :)</h2>
      <div class="row container">
        <div class="col-md-4 col-12 mt-4">
          <label>Куда добавляем?</label>
          <select class="form-control"
                  :required="true"
                  v-on:input="onWhereChanged($event.target.value)"
                  @input="project.where = $event.target.value">
                  <option
                      v-for="option in options"
                      v-bind:value="option.value"
                      :selected="option === 'Сгенерированная ссылка'"
                  >{{ option.name }}</option>
                  @change="onWhereChanged(option)">


          </select>
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Заголовок</label>
          <input class="form-control"  :value="project.header" @input="project.header = $event.target.value">
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Прайс</label>
          <input class="form-control" :value="price" @input="project.price = $event.target.value">
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Сгенерированная ссылка</label>
          <input class="form-control" disabled id="generatedLink">
          <div class="custom-file">
            <label class="mt-3">Фото 1</label>
            <input type="file" class="custom-file-input" id="customFile">
          </div>
          <div class="custom-file">
            <label>Фото 2</label>
            <input type="file" class="custom-file-input" id="customFile2">
          </div>
          <div class="custom-file">
            <label>Фото 3</label>
            <input type="file" class="custom-file-input" id="customFile3">
          </div>
          <div class="custom-file">
            <label>Фото 4</label>
            <input type="file" class="custom-file-input" id="customFile4">
          </div>
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Особенности</label>
          <textarea class="form-control" :value="features" @input="project.features = $event.target.value"></textarea>
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>О поселке</label>
          <textarea class="form-control" :value="about" @input="project.about = $event.target.value"></textarea>
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Как добраться?</label>
          <p>На общественном транспорте</p>
          <textarea class="form-control small" :value="howtoride_all" @input="project.howtoride_all = $event.target.value" ></textarea>
          <p>На личном автомобиле</p>
          <textarea class="form-control small" :value="howtoride_personal" @input="project.howtoride_personal = $event.target.value"></textarea>
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Категория обустройства поселка</label>
          <textarea class="form-control" :value="category" @input="project.category = $event.target.value"></textarea>
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Интерактивная планировка и цены</label>
          <textarea class="form-control" :value="interactive" @input="project.interactive = $event.target.value"></textarea>
        </div>
        <div class="col-md-12 col-12 mt-4">
          <button class="btn btn-primary"
                  @click="addProject()">Добавить</button>
        </div>

      </div>

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
      isAdmin: false,
      id: '',
      selected: 'Сгенерированная ссылка появится тут',
      options: [ {
        name: 'Выбрать куда добавлять',
        value: '',
      },{
        name: 'Реализованные проекты',
        value: `/village-single/`,
      }, {
        name: 'Все поселки',
        value: `/all_villages/`
      }],
      onWhereChanged(value) {
        console.log(value);
        this.selected = value
      },
      project: {
        id: '',
        where: '',
        header: '',
        price: '',
        link: '',
        features: '',
        about: '',
        howtoride_all: '',
        howtoride_personal: '',
        category: '',
        interactive: '',
        photo: '',

      }

    }
  },

  created() {
    const generated_id = uuid()
    this.checkAdmin();

  },
  methods: {
    async checkAdmin() {
      //check admin
      const API_URL = "http://127.0.0.1:3000/admin-login-check"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: window.localStorage.getItem('id')
          })
        }).then(res => res.json())

        if (result.length === 0) {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      } catch (err) {
        console.log('result failed')
        return this.isAdmin = false;
      }

    },
    async loginForm() {
      const settedID = uuid();

      const API_URL = "http://127.0.0.1:3000/admin-login"
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
            id: settedID
          })
        }).then(res => res.json())
        window.localStorage.setItem('id', settedID);
        if (result.length === 0) {

        } else {
          this.isAdmin = true;
          // window.localStorage.setItem('id', this.id);
          // window.localStorage.setItem('isAdmin', true);
          // const localId = window.localStorage.getItem('id', this.id);
        }
      } catch (err) {
        console.log('result failed')
      }

    },
    async addProject () {
      const projectAdd = this.project
      const projUid = uuid()
      this.project.link = this.selected + projUid
      this.project.id = projUid
      const API_URL = "http://127.0.0.1:3000/insert-project"
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
</style>