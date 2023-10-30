<template>
  <div class="container-fluid mx-auto p-0">
    <div class="p-0">
      <YandexMap
          id="map"
          :coordinates="coordinates"
          :settings="settings"
          zoom="8"
          class="map"


      >
        <YandexCollection v-for="item in villages">
          <YandexMarker
              :options="{ preset: 'islands#redHomeIcon' }"
              v-if="item.type === 'rent' && balloonRed"
              :key="item.id"
              :coordinates="item.coordinates.split(',')"
              :marker-id="item.id"
              @click="console.log(item.id)"
              data-toggle="modal"
              data-target="#exampleModalLong"
          />
          <YandexMarker
              :options="{ preset: 'islands#blueHomeIcon' }"
              v-if="item.type === 'homes' && balloonBlue"
              :key="item.id"
              :coordinates="item.coordinates.split(',')"
              :marker-id="item.id"
          >
            <template #component>
              <router-link :to="'/all-villages/village-instock-single/' + item.id">{{ item.name }}</router-link>
            </template>
          </YandexMarker>
          <YandexMarker
              :options="{ preset: 'islands#greenHomeIcon' }"
              v-if="item.type === 'farm' && balloonGreen"
              :key="item.id"
              :coordinates="item.coordinates.split(',')"
              :marker-id="item.id"

          />
          <YandexMarker
              :options="{ preset: 'islands#yellowHomeIcon' }"
              v-if="item.type === 'sales' && balloonYellow"
              :key="item.id"
              :coordinates="item.coordinates.split(',')"
              :marker-id="item.id"
          />

        </YandexCollection>

      </YandexMap>
      <div class="container">
        <div class="mx-auto legend">
          <div class="red col">
            <div v-if="balloonBlue === true" class="text-center">
              <img src="./../../assets/mapicon_blue.svg" />
              <p class="">Дома</p>
              <button @click="balloonBlue = false" class="btn">не показывать</button>

            </div>
            <div v-else class="text-center grayscale">
              <img src="./../../assets/mapicon_blue.svg" />
              <p class="">Дома</p>
              <button @click="balloonBlue = true" class="btn">показать</button>
            </div>

          </div>
          <div class="blue col">
            <div v-if="balloonRed === true" class="text-center">
              <img src="./../../assets/mapicon_red.svg" />
              <p class="">Аренда</p>
              <button @click="balloonRed = false" class="btn"> не показывать</button>

            </div>
            <div v-else class="text-center grayscale">
              <img src="./../../assets/mapicon_red.svg" />
              <p class="">Аренда</p>
              <button @click="balloonRed = true" class="btn"> показать</button>
            </div>
          </div>
          <div class="yellow col">

            <div v-if="balloonYellow === true" class="text-center">
              <img src="./../../assets/mapicon_yellow.svg" />
              <p class="">Акции</p>
              <button @click="balloonYellow = false" class="btn"> не показывать</button>

            </div>
            <div v-else class="text-center grayscale">
              <img src="./../../assets/mapicon_yellow.svg" />
              <p class="">Акции</p>
              <button @click="balloonYellow = true" class="btn"> показать</button>
            </div>
          </div>
          <div class="green d-flex col">

            <div v-if="balloonGreen === true" class="text-center">
              <img src="./../../assets/mapicon_green.svg" />
              <p class="">Фермы</p>
              <button @click="balloonGreen = false" class="btn"> не показывать</button>

            </div>
            <div v-else class="text-center grayscale">
              <img src="./../../assets/mapicon_green.svg" />
              <p class="">Фермы</p>
              <button @click="balloonGreen = true" class="btn"> показать</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import releasedProjects from "../ReleasedProjects.vue";
import { YandexMap, YandexMarker, YandexCollection} from 'vue-yandex-maps'
import axios from "axios";


export default {
  name: "VillageMap.vue",
  components: { YandexMap, YandexMarker, YandexCollection , releasedProjects },
  data() {
    return {
      villages: {},
      renderComponent: true,
      coordinates: [55.753753, 37.622645],
      settings: {
        apiKey: 'ed7341a7-5d45-4b53-a2ba-385417af70aa',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'

      },
      balloonRed: true,
      balloonBlue: true,
      balloonGreen: true,
      balloonYellow: true

    }
  },
  created () {
    this.getAllVillagesInstock()
  },
  methods: {
    async getAllVillagesInstock () {
      const API_URL = "http://127.0.0.1:3000/villages_instock"

      try {
        const result = await axios(API_URL).then(res => res.data)
        this.loading = false;
        console.log()
        return this.villages = result;
      } catch (err) {

      }
    }
  }

}
</script>

<style lang="scss">
.map {
  height:80vh;
}
p {
  margin-bottom: 0;
}
.legend {
  position: absolute;
  bottom: 17%;
  margin: 0 auto;
  background: rgba(255,255,255,0.9);
  padding: 10px;
  border-radius: 20px;
  font-size: 16px;
  font-weight: 500;

  button {
    padding: 0 5px;
    font-size: 14px;
    margin-top: -5px;
    border: 1px solid rgba(0,0,0,0.3);
    width: 100%;

    &:hover {
      border: 1px solid rgba(0,0,0,0.8)
    }
  }

  .grayscale {
    filter: grayscale(1);
    text-decoration: line-through;
  }

  img {
    width: 25px;
    height: auto;
  }
}
</style>