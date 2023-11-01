<template>
  <div class="custom-balloon">

    <h4>{{ name }}</h4>
    <h4>от {{ price }}р.</h4>

    <router-link :to="link">Подробнее</router-link>
  </div>
</template>

<script>
export default {
  props: ['name', 'price', 'link']
}
</script>