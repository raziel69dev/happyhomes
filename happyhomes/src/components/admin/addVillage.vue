<template>
  <div class="container mx-auto">
    <div class="form-add mb-5 pb-5">
      <div class="row">
        <h2 class="col-md-10 col-12">Добавить проект</h2>
        <div class="col-md-2 col-12 text-right">
          <router-link class="btn btn-outline-secondary w-100 mt-4" to="/admin">Назад</router-link>
        </div>

      </div>
      <div class="row container" v-if="isAdmin">
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

          <label>Координаты</label>
          <div class="d-flex">
            <textarea class="form-control h50" :value="getcoordinates" placeholder="адрес" id="generateCoords"></textarea>
            <button class="btn btn-outline-primary" @click="getCoordinates()">Получить по адресу</button>
          </div>
          <p class="form-control coordinatesYandex">Получены координаты: <span id="coordinatesYandex">{{ generatedCoordinates.toString() }}</span></p>


          <label>Категория объекта</label>
          <select class="form-control"
                  :required="true"
                  v-on:input="onWhereChanged($event.target.value)"
                  @input="project.type = $event.target.value">
            <option
                v-for="option in types"
                v-bind:value="option.value"
                :selected="option === 'Сгенерированная ссылка'"
            >{{ option.name }}</option>
            @change="onWhereChanged(option)">


          </select>
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
      types: [ {
        name: 'Аренда',
        value: 'rent',
      },{
        name: 'Дома',
        value: 'homes',
      }, {
        name: 'Ферма',
        value: 'farm'
      }, {
        name: 'Скидки',
        value: 'sales'
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
        coordinates: ''

      }
    }

  },
  created () {
    this.checkAdminPrivelegies()
  },
  methods: {
    async checkAdminPrivelegies (){
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
    async addProject () {
      const projectAdd = this.project
      projectAdd.coordinates = document.getElementById('coordinatesYandex').innerText
      console.log(projectAdd)
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
    },
    async getCoordinates() {
      const address = document.getElementById('generateCoords').value;
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=ed7341a7-5d45-4b53-a2ba-385417af70aa&geocode=${address}&format=json`;
      console.log(url)
      const coordinatesYandex = await fetch(url).then(res => res.json())
      const splitcoordinates = coordinatesYandex.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      this.generatedCoordinates = [splitcoordinates[1], splitcoordinates[0]]
      console.log(this.generatedCoordinates)

      return [splitcoordinates[1], splitcoordinates[0]]
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