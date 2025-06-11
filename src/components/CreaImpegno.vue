//jessica        
<script>
import { useLoginStore } from '../stores/login'
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
      condividiConTutti: false 
    }
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.text = "Sto creando l'impegno...";
      await this.dataTrasmission();
      this.isLoading = false;
    },
    async dataTrasmission() {
      const loginStore = useLoginStore();
      try {
        console.log("Condividi con tutti:", this.condividiConTutti); 

        const res = await loginStore.datiNuovoImpegno(
          this.nome,
          this.descrizione,
          this.dataInizio,
          this.dataFine,
          this.condividiConTutti
        );
        
        if (res.status === "success") {
          this.$emit('change-status', 'gestioneImpegni');
        } else {
          alert("Errore nel salvataggio dell'impegno");
        }
      } catch (e) {
        alert("Errore di connessione: " + e.message);
      }
    }
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

  <div class="inLine">
    <div class="circleArrow backArrow margin ms-3">
      <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'gestioneImpegni')"></i>
    </div>
    <p class="fs-2 mx-2" style="color: white;">Crea {{ this.eventType }}</p>
  </div>

  <div class="checkbox-wrapper">
    <input type="checkbox" id="condividi" v-model="condividiConTutti" class="buttonCondividi" />
    <label for="condividi">Condividi con tutti</label>
  </div>

  <div class="container-fluid adapt">
    <div class="row" style="height: 100vh;">
      <div class="col-2"></div>
      <div v-if="!this.isLoading" class="col-8 d-flex rounded-4 p-3 rounded-4"
        style="height: 90%; background-color: #78c3ce; width: 100vw;">
        <form @submit.prevent="onSubmit" class="fs-1 ms-5">
        <input v-model="nome" type="text" class="inputFilter form-control mb-3" placeholder="Nome impegno" required>
        <input v-model="descrizione" type="text" class="inputFilter form-control mb-3" placeholder="Descrizione impegno" required>
        <input v-model="dataInizio" type="datetime-local" class="inputFilter form-control mb-3" placeholder="Data e ora di inizio impegno" required>
        <input v-model="dataFine" type="datetime-local" class="inputFilter form-control mb-3" placeholder="Data e ora di fine impegno" required>
        <button type="submit" class="azzurro-button" id="btnSalvaImpegno">Salva e aggiungi impegno</button>
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

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px; 
}

.buttonCondividi {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 10px;
}

.checkbox-wrapper label {
  color: white;
  font-size: 16px;
  line-height: 20px; 
}
</style>
