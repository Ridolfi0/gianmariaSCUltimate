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
    text: "",
    nome: "",
    descrizione: "",
    dataInizio: "",
    dataFine: "",
  }
},
methods: {
  async onSubmit() {
    this.isLoading = true;
    this.text = "Sto caricando le cartelle...";
    await this.dataTrasmission();
    this.isLoading = false;
  },
  async dataTrasmission() {
    this.text = "Sto creando l'impegno...";
    console.log("1");  
    // Prepara i dati da inviare come array (per esempio)
    const dati = [
      this.nome,
      this.descrizione,
      this.dataInizio,
      this.dataFine
    ];

    console.log("primaprima", dati);
    try {
      // Fai la POST request verso lo script Google Apps Script
      console.log("prima:", dati);
      const response = await fetch('https://script.google.com/macros/s/AKfycbzNwnBlE9m3gzWcBdNyt8EQZ4E7LQt7PvPbN_YnbpceCKFwKRXnuyqp4N9K3oAC--Lc2Q/exec', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    nome: this.nome,
    descrizione: this.descrizione,
    dataInizio: this.dataInizio,
    dataFine: this.dataFine 
  })
});

console.log("dopo", dati);
      const result = await response/*.json()*/;
      console.log("result " + response);
      console.dir(result);
      if(result.status === "success"){
        this.$emit('change-status', 'gestioneImpegni');
      } else {
        alert("Errore nel salvataggio dell'impegno");
      }
    } catch(e) {
      alert("Errore di connessione: " + e.message);
    }
    console.log("fine", dati);
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
        <form @submit.prevent="onSubmit" class="fs-1 ms-5">
        <input v-model="nome" type="text" class="inputFilter form-control mb-3" placeholder="Nome impegno" required>
        <input v-model="descrizione" type="text" class="inputFilter form-control mb-3" placeholder="Descrizione impegno" required>
        <input v-model="dataInizio" type="datetime-local" class="inputFilter form-control mb-3" placeholder="Data e ora di inizio impegno" required>
        <input v-model="dataFine" type="datetime-local" class="inputFilter form-control mb-3" placeholder="Data e ora di fine impegno" required>
        <button type="submit" class="azzurro-button" id="btnSalvaImpegno" @click="dataTrasmission()">Salva e aggiungi impegno</button>
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

.azzurro-button {
  background: linear-gradient(135deg,rgb(27, 52, 95) 0%,rgb(79, 107, 200) 100%);
  border: none;
  border-radius: 8px;
  padding: 6px 16px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 159, 255, 0.25);
  transition: all 0.25s ease;
  letter-spacing: 0.04em;
  user-select: none;
}

.azzurro-button:hover {
  background: linear-gradient(135deg,rgb(43, 56, 110) 0%,rgb(67, 112, 151) 100%);
  box-shadow: 0 6px 14px rgba(0, 159, 255, 0.4);
  transform: translateY(-2px);
}

.azzurro-button:active {
  transform: translateY(0px);
  box-shadow: 0 3px 6px rgba(0, 159, 255, 0.3);
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