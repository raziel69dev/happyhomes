<template>
  <div class="container mx-auto">
    <div class="form-add mb-5 pb-5">

      <div class="row" >
        <h2 class="col-md-10 col-12">Удалить проект</h2>
        <div class="col-md-2 col-12 text-right">
          <router-link class="btn btn-outline-secondary w-100 mt-4" to="/admin">Назад</router-link>
        </div>

        <div class="col-md-4 col-12 mt-4" v-if="isAdmin">
          <label>ID проекта</label>
          <input class="form-control"  :value="project.id" @input="project.id = $event.target.value" />
          <label>Категория объекта</label>
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
          <div class="col-md-12 col-12 mt-4">
            <button class="btn btn-primary"
                    @click="deleteProject()">Удалить</button>
          </div>
        </div>
        <div class="" v-else>
          <router-link to="/admin">Залогиньтесь, вы не админ</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


export default {
  name: "deleteProject.vue",
  data() {
    return {
      selected: '',
      isAdmin: false,
      project: {
        id: '',
      },
      options: [ {
        name: 'Выбрать куда добавлять',
        value: '',
      },{
        name: 'Реализованные проекты',
        value: `villages_released`,
      }, {
        name: 'Все поселки',
        value: `villages_instock`
      }],
      onWhereChanged(value) {
        console.log(value);
        this.selected = value
      },
    }

  },
  created() {
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

        if (result.length <= 0) {
          this.isAdmin = false;
        } else {
          this.isAdmin = true;
        }
      } catch (err) {
        console.log('result failed')
        return this.isAdmin = false;
      }

    },
    async deleteProject () {
      const deleteProject = this.project

      const API_URL = "http://127.0.0.1:3000/delete-project"
      try {
        const result = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            deleteProject
          })
        }).then(res => res.json())

      } catch (err) {
        console.log('result failed')
      }

      console.log(this.selected)
    },
  }
}
</script>

<style scoped>

</style>