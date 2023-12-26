<template>
  <div class="container mx-auto my-1">
    <div class="row align-items-center mt-5" v-if="loading === true">
      <div class="spinner-grow col-3 mx-auto text-center" role="status">
        <span class="visually-hidden">Загрузка объектов</span>
      </div>
    </div>
    <div class="container" v-else>
      <div class="row align-items-center">

        <div class="col-12 my-4">
        <span class="id py-3 d-flex align-items-center">
          <router-link to="/" class="me-2">Главная</router-link> //
          <div class="mx-2" >Акции</div>
         </span>
        </div>
        <div class="col-md-8">
          <h2>Акции</h2>
        </div>

      </div>

      <div class="row my-5">

        <div class="col-12" v-for="village in villages">
          <div class="row align-items-center">
            <div class="images-slider-wrapper col-md-6 col-12">
              <div class="images-slider">
                <div class="village-image" v-for="(item) in village.photos.split(',')">
                  <img :src="item" alt="" class="w-100">
                </div>
              </div>
            </div>

            <div class="sale col-md-6 col-12">
              <h2 class="sale-description mb-5">{{ village.name }}</h2>
              <p class="mb-5">{{ village.description }}</p>
              <p class="mb-5">{{ village.enddate }}</p>

              <div class="align-items-center d-flex flex-wrap justify-content-start">
                <a  class="btn btn-outline-primary me-3"
                    :href="'tel:' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')">
                  Подробнее по телефону
                </a>
                <div class="message">
                  <span class="me-2">или в мессенджерах: </span>
                  <a class="me-2" :href="'https://t.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img src="./../assets/icons/telegram.png" alt="" class="order-icon"></a>
                  <a :href="'https://wa.me/' + contacts.phone.replace('\(', '').replace('\)', '').replaceAll(' ', '').replaceAll('-', '')"><img src="./../assets/icons/whatsapp.png" alt="" class="order-icon"></a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>



</template>


<script>
import axios from "axios";



export default {
  name: "VillageList.vue",

  data () {
    return {
      contacts: {
        phone: ''
      },
      loading: true,
      villages: []
    }
  },
  created () {
    this.getAllVillagesInstock()
    this.getContacts()
  },

  methods: {
    async getAllVillagesInstock () {
      const API_URL = "http://83.147.245.251:3000/sales"

      try {
        const result = await axios(API_URL).then(res => res.data)
        this.loading = false;
        console.log(result)
        return this.villages = result;

      } catch (err) {

      }
    },
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

      } catch (err) {
      }
    }

  }
}
</script>

<style lang="scss">
.card {
  .images-slider-wrapper {
    width: calc(100%);


    overflow: hidden;
    .images-slider {
      position: relative;
      width: 400%;
      display: flex;
      transition: .15s all ease!important;
    }


    .village-image {
      width: 100% ;
    }
    .arrows-slide {

      font-size: 100px;
      color: rgba(255,255,255,.5);
      transition: .15s ease;
      cursor: pointer;

      &:hover {
        color: #ffffff;
      }
      .prev {
        position: absolute;
        top: 30px;
        left: 20px;
        z-index: 2;
      }
      .next {
        position: absolute;
        top: 30px;
        right: 20px;
        z-index: 2;
      }
    }
  }

}
a.list-item {
  font-size: 20px;
  font-weight: bold;
  color: #000000;
  text-decoration: none;
  transition: all 0.2s ease;

}
a.list-item:hover {
  padding-left: 10px;
}
.card {
  .village-image {

  }
  .village-header {
    font-size: 22px;
    font-weight: 700;
  }
  .village-price {
    font-size: 18px;
    font-weight: 600;
  }
  .separator {
    width: 100%;
    height: 1px;
    background-color: #000000;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  ul {
    list-style: none;
    padding-left: 0;
    li {
      font-size: 12px;
    }
  }
  .more {
    margin-bottom: 10px;
    text-align: center;
    border: 2px solid #2055E5;
    border-radius: 10px;
    text-decoration: none;
    color: #2055E5;
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;
    padding-bottom: 5px;
    transition: all 0.15s ease;
    &:hover {
      color: #13379e;
      border-color: #13379e;
    }
  }
}
</style>