<script>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/require-v-for-key */
/* eslint-disable no-prototype-builtins */

//cork cork cork cork cork cork cork cork cork

import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

export default {
  props: {
    eventType: Object,
    Cartelle: Object
  },
  data() {
    return {
      isLoading: false,
      folderData: this.Cartelle,
      text:""
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.text = "Sto caricando le cartelle..."
      await this.dataTrasmission();
      this.isLoading = false;
    },
    async dataTrasmission() {
      let idCartelle = this.folderData
      this.text = "Sto creando l'impegno..."
      // Chiamata per la creazione di un nuovo impegno
      //const esito = await loginInstance.transmitMinistageData(idTemplate1, idFolder, data, nrProg, nrMaxPren, db);
      this.$emit('change-status', 'gestioenImpegni');
    },
  },
  emits: ['change-status']
}
</script>

<template>

  <!-- breadcrumb -->

  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page" style="color: #fff"><a href="#" style="color: #fff"
          @click="$emit('change-status', 'gestioneImpegni')">Gestione impegni</a></li>
      <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Crea Impegno</li>
    </ol>
  </nav>

  <!-- caption crea(evento) -->

  <div class="inLine">
    <div class="circleArrow backArrow margin ms-3">
      <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'gestioneImpegni')"></i>
    </div>
    <p class="fs-2 mx-2" style="color: white;">Crea {{ this.eventType }}</p>
  </div>

  <!-- tutto -->

  <div class="container-fluid adapt">
    <div class="row" style="height: 100vh;">
      <div class="col-2"></div>
      <!-- comincia -->
      <div v-if="!this.isLoading" class="col-8 d-flex rounded-4 p-3 rounded-4"
        style="height: 90%; background-color: #78c3ce; width: 100vw;">
        <form @submit.prevent="onSubmit()" class="fs-1 ms-5">
            <h3>Vanno inseriti i campi di Input necessari</h3>
        </form>
      </div>
      <div class="containerC" v-else>
        <div class="cradle-wrap">
          <div class="cradle">
            <div class="sphere"></div>
          </div>
        </div>
        <div class="cradle-wrap">
          <div class="cradle">
            <div class="sphere"></div>
          </div>
        </div>
        <div class="cradle-wrap">
          <div class="cradle">
            <div class="sphere"></div>
          </div>
        </div>
      </div>
      <!-- <p class="fs-2 containerC">{{ this.text }}</p>-->
    </div>
  </div>
</template>

<style scoped>
.ziopera {
  display: flex;
  flex-direction: column;
}

.allineati {
  display: flex;
  flex-direction: row;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.sameLine {
  display: inline-block
}

input {
  background-color: #266874;
  color: #78c3ce;
}

input:focus {
  background-color: #21575f;
}

p {
  color: #11282d;
  font-weight: bold;
}

::placeholder {
  color: #78c3ce;
}

.se {
  background-color: #266874;
  color: #78c3ce;

}

.se:hover {
  background-color: #21575f;
}

.circle {
  width: 100px;
  height: 100px;
}

.circle,
.circleArrow {
  background-color: #266874;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-size: 150px;
}

.circleArrow {
  width: 40px;
  height: 40px;
}

.backArrow {
  border-width: 40px;
  border-radius: 50px;
}

.backArrow:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: white;
  transition: transform 0.2s, box-shadow 0.2s;
}

.inLine {
  display: flex;
  justify-content: flex-start;
  align-items: center;

}

.containerC {
  width: 350px;
  margin: 100px auto;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;

    .cradle-wrap {
      .sphere {
        background: #11282d;
      }

      &:first-child {
        transform: rotate(120deg);

        .sphere {
          background: #11282d;
        }
      }

      &:last-child {
        transform: rotate(240deg);

        .sphere {
          background: #11282d;
        }
      }
    }
  }
}

.cradle-wrap {
  position: absolute;

  &:first-child {
    transform: rotate(120deg);
  }

  &:last-child {
    transform: rotate(240deg);
  }
}

.cradle {
  margin: 0 auto;
  width: 125px;
  height: 50px;
  position: relative;
  animation-name: turn;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-delay: 0;
  animation-iteration-count: infinite;
}

.sphere {
  background: #266874;
  width: 10px;
  height: 10px;
  border-radius: 25px;
  position: absolute;
  top: 0px;
  animation-name: slide;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-play-state: running;
  transition: background 0.3s ease;
}

.inputFilter,
#btnFilter {
  float: left;
}

@keyframes slide {
  0% {
    left: 0px;
    width: 40px;
    height: 40px;
    opacity: 1;
  }

  100% {
    left: 70px;
    top: 12px;
    width: 25px;
    height: 25px;
    opacity: 0.2;
  }
}

@keyframes turn {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>