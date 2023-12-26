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
          <div class="mx-2" >Дома</div>
         </span>
        </div>
        <div class="col-md-8">
          <h2>Все дома</h2>
        </div>


      </div>

      <div class="row my-5">

        <div class="col-md-6 col-12" v-for="village in villages">
          <div class="p-3 card shadow">
            <div class="homes-slider-wrapper">
              <div class="images-slider">
                <div class="village-image" v-for="(item) in village.photos.split(',')">
                  <img :src="item" alt="" class="w-100" data-fancybox="gallery" :data-index="village.photos.length">

                </div>

              </div>
              <div class="arrows-slide">
                <div class="next" @click="slide('left')">&#8250;</div>
                <div class="prev" @click="slide('right')">&#8249;</div>
              </div>
            </div>

            <div class="village-heading align-items-center d-flex justify-content-between">
              <div class="village-header">{{ village.name }}</div>
              <div class="village-price">от {{ village.price }} р.</div>
            </div>
            <div class="separator"></div>
            <div class="village-short-description">
              <table>
                <tbody>
                <tr>
                  <td>Общая площадь: </td>
                  <td><span>{{ village.space }} м²</span></td>
                </tr>
                <tr>
                  <td>Размер дома: </td>
                  <td><span>{{ village.size }} м</span></td>
                </tr>
                <tr>
                  <td>Количество этажей: </td>
                  <td><span>{{ village.floor }}</span></td>
                </tr>
                <tr>
                  <td>Тип кровли: </td>
                  <td><span>{{ village.rooftype }}</span></td>
                </tr>
                <tr>
                  <td>Материал стен: </td>
                  <td><span>{{ village.walltype }}</span></td>
                </tr>
                <tr>
                  <td>Фундамент: </td>
                  <td><span>{{ village.foundation }}</span></td>
                </tr>

                </tbody>
              </table>
              <ul >
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
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




</template>


<script>
import axios from "axios";



export default {
  name: "AllHomes.vue",

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
    async getAllVillagesInstock() {
      const API_URL = "http://83.147.245.251:3000/homes_instock"

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
    },
    slide(dest) {
      const slides = document.querySelector('.images-slider')
      const marginLeft = parseInt(slides.style.left.replace('%', '')) || 0;

      switch (dest) {
        case 'left':
          marginLeft === -300 ? slides.style.left = 0 : slides.style.left = marginLeft - 100 + '%'
          console.log(marginLeft)
          break;
        case 'right':
          marginLeft === 0 ? slides.style.left = -300 + '%' : slides.style.left = marginLeft + 100 + '%'
          console.log(marginLeft)
          break;
      }

    }

  }
}
</script>

<style lang="scss">
.card {
  .homes-slider-wrapper {
    width: calc(100%);


    overflow: hidden;
    .images-slider {
      height: 300px;
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
        top: 80px!important;
        left: 20px;
        z-index: 2;
      }
      .next {
        position: absolute;
        top: 80px!important;
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
.order-icon {
  width: 20px;
  height: 20px;
  margin-left: 5px;
}
.village-short-description {
  table {
    font-size: 16px;
    tbody {
      margin-top: 10px;
      td {
        padding-bottom:  5px;


      }
      span {
        font-weight: 500;
        padding-left: 10px;
      }
    }
  }
}
</style>