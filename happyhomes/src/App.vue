<script setup>
</script>

<template>
<header class="container-fluid pt-3 pb-3 shadow-lg header">
  <div class="container mx-auto">
    <div class="row align-center d-flex align-items-center">
      <div class="col-md-1">
        <div class="logotype">
          <router-link to="/"><img src="./assets/logo.png"></router-link>

        </div>
      </div>

      <div class="col-md-4 contacts text-center align-bottom">
        <div class="phone">+7 (495) <span>555-55-55</span></div>
        <div class="address">17-й проезд Марьиной Рощи, 4к1 (офис 734) с 09:00 до 20:00</div>
      </div>

      <div class="col-md-5">
        <div class="" id="navbar">
          <ul class="mr-auto d-flex align-items-center px-2 menu">
            <li class="nav-item" :class="[isActive && 'router-link-active']">
              <router-link to="/all-villages-map" >Все поселки</router-link>
<!--              <router-link to="/all-villages-map">Все поселки</router-link>-->
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
      <div class="col-md-2">
        <button class="btn btn-outline-primary">Позвоните мне</button>
      </div>
    </div>
  </div>

</header>
  <section class="container-fluid">
    <div class="row container mx-auto">
     <router-view />
    </div>
  </section>
</template>

<style scoped>

</style>
