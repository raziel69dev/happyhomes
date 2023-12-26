
<template>
<header class="container-fluid pt-3 pb-3 shadow-lg header">
  <div class="container mx-auto">
    <div class="row align-center d-flex align-items-center" v-if="!loading">
      <div class="col-md-1">
        <div class="logotype">
          <router-link to="/"><img src="./assets/logo.png"></router-link>

        </div>
      </div>

      <div class="col-md-3 contacts text-center align-bottom">
        <div class="phone"><a
            :href="'tel:' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')">{{
            contacts.phone
          }}</a></div>
        <div class="address">{{ contacts.adress }}<br>{{ contacts.time }}</div>
      </div>

      <div class="col-md-5">
        <div class="" id="navbar">
          <ul class="mr-auto d-flex align-items-center px-2 menu">
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/all-villages-list" >Поселки</router-link>
            </li>
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/all-homes">Дома</router-link>
            </li>
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/sales">Акции</router-link>
            </li>
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/services">Услуги</router-link>
            </li>
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/contacts">Контакты</router-link>

            </li>


          </ul>

        </div>
      </div>
      <div class="col-md-3 d-flex align-items-center">
        <a :href="'https://t.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img src="./assets/icons/telegram.png" alt="" class="header-icon"></a>
        <a :href="'https://wa.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img src="./assets/icons/whatsapp.png" alt="" class="header-icon"></a>
        <button class="btn btn-outline-primary">Позвоните мне</button>
      </div>
    </div>
    <div class="row" v-else> loading</div>
  </div>

</header>
  <section class="container-fluid  p-0">
    <div class="container-fluid p-0 m-0 mx-auto">

     <router-view />
    </div>
  </section>
  <footer class="container-fluid pt-3 pb-3 shadow-lg mt-auto">
 FOOTER CONTENT
  </footer>
</template>

<script>

export default {
  data() {
    return {
      loading: true,
      contacts: {
        phone: ''
      }
    }
  },
  created() {
    this.getContacts();
  },
  methods: {

    async getContacts() {
      const API_URL = "http://83.147.245.251:3000/get-contact-info"

      try {
        const result = await fetch(API_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        this.contacts.phone = result[0].phone;
        this.contacts.email = result[0].email;
        this.contacts.adress = result[0].adress;
        this.contacts.time = result[0].time;
        this.loading = false;

      } catch (err) {
      }
    },
  }
}
</script>

<style scoped>
header {
  position: relative;
  z-index: 1;
}


</style>
