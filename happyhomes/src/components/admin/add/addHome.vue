<template>
  <div class="container mx-auto my-5">
    <div class="form-add mb-5 pb-5">
      <div class="row">
        <h2 class="col-md-10 col-12">Добавить дом</h2>
        <div class="col-md-2 col-12 text-right">
          <router-link class="btn btn-outline-secondary w-100 mt-4" to="/admin">Назад</router-link>
        </div>

      </div>
      <div class="row container" v-if="isAdmin">
        <div class="col-md-4 col-12 mt-4">
          <label>Категория объекта</label>
          <select class="form-control"
                  required
                  v-on:input="onWhereChanged($event.target.value)"
                  @input="project.type = $event.target.value">
            <option
                v-for="option in types"
                v-bind:value="option.value"
            >{{ option.name }}</option>
            @change="onWhereChanged(option)">


          </select>
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Заголовок</label>
          <input class="form-control"  :value="project.name" @input="project.name = $event.target.value">
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Прайс</label>
          <input class="form-control" :value="project.price" @input="project.price = $event.target.value">
        </div>
        <div class="col-md-4 col-12 mt-4">

          <label>Размер</label>
          <input class="form-control" :value="project.size" @input="project.size = $event.target.value">



          <div class="custom-file">
            <label class="mt-3">Фото 1</label>
            <input type="text" class="custom-file-input" @change="project.photo.push($event.target.value)">
          </div>
          <div class="custom-file">
            <label>Фото 2</label>
            <input type="text" class="custom-file-input" @change="project.photo.push($event.target.value)">
          </div>
          <div class="custom-file">
            <label>Фото 3</label>
            <input type="text" class="custom-file-input" @change="project.photo.push($event.target.value)">
          </div>
          <div class="custom-file">
            <label>Фото 4</label>
            <input type="text" class="custom-file-input" @change="project.photo.push($event.target.value)">
          </div>
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Площадь</label>
          <input class="form-control" @input="project.space = $event.target.value">
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Количество этажей</label>
          <input class="form-control" @input="project.floor = $event.target.value">
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Тип кровли</label>
          <input class="form-control" @input="project.rooftype = $event.target.value">
        </div>

        <div class="col-md-4 col-12 mt-4">
          <label>Материал стен</label>
          <input class="form-control" @input="project.walltype = $event.target.value">
        </div>
        <div class="col-md-4 col-12 mt-4">
          <label>Фундамент</label>
          <input class="form-control" @input="project.foundation = $event.target.value">
        </div>

        <div class="col-md-12 col-12 mt-4">
          <button class="btn btn-primary"
                  @click="addProject()">Добавить</button>
        </div>

      </div>
      <div class="" v-else>
        <router-link to="/admin">Залогиньтесь, вы не админ</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import {v4 as uuid} from "uuid";

export default {
  name: "addVillage.vue",
  data () {
    return {

      isAdmin: false,
      generatedCoordinates: '',
      getcoordinates: '',
      id: '',
      selected: 'Сгенерированная ссылка появится тут',

      types: [ {
        name: 'Деревянный каркас',
        value: 'wooden',
      },{
        name: 'Оцилиндрованное бревно',
        value: 'rounded',
      }, {
        name: 'Профилированный брус',
        value: 'profiled'
      }, {
        name: 'Стальной каркас',
        value: 'steel'
      }],
      onWhereChanged(value) {
        console.log(value);
        this.selected = value
      },
      project: {
        name: '',
        space: '',
        size: '',
        floor: '',
        price: '',
        rooftype: '',
        walltype: '',
        foundation: '',
        type: '',
        photo: []

      }
    }

  },
  created () {
    this.checkAdminPrivelegies()
  },
  methods: {
    async checkAdminPrivelegies (){
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
    async addProject () {
      const homeAdd = this.project
      const API_URL = "http://83.147.245.251:3000/insert-home"
      console.log(this.project.photo)
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'

          },
          body: JSON.stringify({
            homeAdd
          })
        }).then(res => res.json())

      } catch (err) {
        console.log('result failed')
      }

      console.log(this.selected)
    }

  }
}
</script>

<style lang="scss">
label {
  font-weight: 600;
}
.coordinatesYandex {
  font-size: 12px;
}
textarea {
  height: 400px;
  &.h50 {
    height: 60px;
  }
}
</style>