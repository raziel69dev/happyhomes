<template>
  <div class="row align-items-center">
    <div class="col-md-8">
      <h2>Все поселки списком</h2>
    </div>
    <div class="col-md-4 text-end">
      <router-link to="/all-villages-map">Поселки на карте</router-link>
    </div>
  </div>

  <released-projects></released-projects>


</template>

<script>
import releasedProjects from "../ReleasedProjects.vue";
export default {
  name: "VillageList.vue",
  components: {releasedProjects}
}
</script>

<style scoped>

</style>