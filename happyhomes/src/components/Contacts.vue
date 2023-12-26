<template>
  <div class="container my-5">
    <h2>Контакты</h2>
    <div class="row" v-if="!loading">
      <div class="col-md-6 col-4">
        <img src="./../assets/logo.png" class="w-25">
        <h3>ООО "Хэппи Хоумс"</h3>
        <p class="address mt-4" id="address">
          {{ contacts.adress }}
        </p>
        <div class="row contacts">
          <div class="col-md-5 left">
            Часы работы:<br/>
            Телефон:<br/>
            E-mail:
          </div>
          <div class="col right">
            {{ contacts.time }} <br/>
            <a :href="'tel:' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')">{{
                contacts.phone
              }}</a>
            <a :href="'https://t.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img
                src="./../assets/icons/telegram.png" alt="" class="phone-icon"></a>
            <a :href="'https://wa.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img
                src="./../assets/icons/whatsapp.png" alt="" class="phone-icon"></a>
            <br/>
            <a :href="'mailto:' + contacts.email">{{ contacts.email }}</a>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-12" v-if="coordinates.length > 1">
        <YandexMap
            :coordinates="coordinates"
            :settings="settings"
            zoom="11"
            class="map-contacts"

        >
          <YandexMarker :coordinates="coordinates" :marker-id="contactsballoon">

          </YandexMarker>
        </YandexMap>

      </div>

      <div class="col-md-12 col-4 mt-5 description">
        {{ contacts.description }}
      </div>

    </div>
    <div class="row" v-else>
      loading
    </div>
  </div>
</template>

<script>
import {YandexMap, YandexMarker} from 'vue-yandex-maps'

export default {
  name: "Contacts.vue",
  components: {YandexMap, YandexMarker},


  data() {
    return {
      loading: true,
      contacts: {},
      coordinates: [],
      settings: {
        apiKey: 'ed7341a7-5d45-4b53-a2ba-385417af70aa',
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1'
      }
    }
  },
  created() {
    this.getContacts()

  },
  methods: {
    async getCoordinates(address) {
      console.log(address)
      const url = `https://geocode-maps.yandex.ru/1.x/?apikey=ed7341a7-5d45-4b53-a2ba-385417af70aa&geocode=${address}&format=json`;
      const coordinatesYandex = await fetch(url).then(res => res.json())
      const splitcoordinates = coordinatesYandex.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      this.generatedCoordinates = [splitcoordinates[1], splitcoordinates[0]]
      console.log(this.generatedCoordinates)

      return [splitcoordinates[1], splitcoordinates[0]]
    },
    async getContacts() {
      const API_URL = "http://83.147.245.251:3000/get-contact-info"

      try {

        console.log(this.coordinates)
        const result = await fetch(API_URL, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(res => res.json())
        this.contacts = result[0];
        this.loading = false;
        this.coordinates = await this.getCoordinates(this.contacts.adress);
        // console.log(this.contacts[0])
      } catch (err) {
      }
    },
  }
}
</script>

<style lang="scss">
.map-contacts {
  height: 350px;
}

.description {
  font-size: 18px;
}

.address {
  font-size: 18px;
}

.contacts {
  font-size: 18px;

  .right {
    font-weight: 600;

    a {
      color: #000000;
      text-decoration: none;
    }
  }

  .left {

  }
}

.phone-icon {
  width: 20px;
  margin-left: 10px;
}
</style>