<template>
  <div class="container my-5">
    <div class="form-add mb-5 pb-5">
      <div class="row">
        <h2 class="col-md-10 col-12">Изменить контактную информацию</h2>
        <div class="col-md-2 col-12 text-right">
          <router-link class="btn btn-outline-secondary w-100 mt-4" to="/admin">Назад</router-link>
        </div>

      </div>
      <div v-if="!loading">
        <div class="container" v-if="isAdmin">
          <div class="form row">
            <div class="col-md-6 col-12">
              <label>Телефон</label>
              <input class="form-control" id="phone" :value="contacts[0].phone" />
            </div>
            <div class="col-md-6 col-12">
              <label>E-mail</label>
              <input class="form-control" id="email" :value="contacts[0].email" />
            </div>
            <div class="col-md-6 col-12">
              <label>Адрес</label>
              <input class="form-control" id="adress" :value="contacts[0].adress" />
            </div>
            <div class="col-md-6 col-12">
              <label>Время работы</label>
              <input class="form-control" id="time" :value="contacts[0].time" />
            </div>
            <div class="col-md-12 col-12">
              <label>Описание</label>
              <textarea class="form-control" id="description" :value="contacts[0].description" @submit="contactsToUpdate.description = $event.target.value"></textarea>
            </div>
            <div class="col-md-12 col-12 mt-4">
              <button class="btn btn-primary"
                      @click="changeContactInfo()">Добавить</button>
            </div>

          </div>

        </div>
      </div>
      <div class="" v-else>
        <div class="spinner-grow col-3 mx-auto text-center" role="status">
          <span class="visually-hidden">Загрузка объектов</span>
        </div>
      </div>

      <div class="" v-else>
        <router-link to="/admin">Залогиньтесь, вы не админ</router-link>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "changeContactInfo.vue",
  data () {
    return {
      loading: true,
      isAdmin: false,
      error: false,
      contacts: {},
    }
  },
  created() {
    this.checkAdminPrivelegies();
    this.getContacts()
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
            token: window.localStorage.getItem('token')
          })
        }).then(res => res.json())

        this.isAdmin = result.isAdmin

      } catch (err) {
        console.log('result failed')
        return this.isAdmin = false;
      }

    },
    async getContacts() {
      const API_URL = "http://127.0.0.1:3000/get-contact-info"

      try {
        const result = await fetch(API_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        this.contacts = result;
        this.loading = false;
      } catch (err) {
      }
    },
    async changeContactInfo() {

      const contactsToUpdate = {
        time: document.getElementById('time').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        description: document.getElementById('description').value.replace(/'([^']+)'/g, '«$1»'),
        adress: document.getElementById('adress').value
      }
      const API_URL = "http://127.0.0.1:3000/set-contact-info"
      try {
        const results = await fetch(API_URL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contactsToUpdate
          })
        }).then(res => res.json())


      } catch (err) {
      }
    }
  }
}
</script>

<style scoped>

</style>