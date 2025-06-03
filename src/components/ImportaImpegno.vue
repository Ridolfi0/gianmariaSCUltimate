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
      tableData: [],
      selectedRows: []  // per tenere traccia delle righe selezionate (opzionale)
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async onSubmit() {
  this.isLoading = true;
  this.text = "Sto caricando le cartelle...";
  await this.dataTrasmission();
  this.isLoading = false;
},
    async dataTrasmission() {
  this.text = "Sto creando gli impegni selezionati...";
   const loginStore = useLoginStore();
  try {
    for (let i = 0; i < this.selectedRows.length; i++) {
      const index = this.selectedRows[i];
      const row = this.tableData[index];

      const payload = {
        nome: row.Titolo,
        descrizione: row.Descrizione,
        dataInizio: row.dataOraInizio,
        dataFine: row.dataOraFine,
        rowIndex: index + 2 // +2 perché array parte da 0 e riga 1 è intestazione
      };

      const res = await loginStore.upLoadImpegno('uploadImpegni', payload); // il tuo endpoint
      if (res.status !== "success") {
        console.warn("Errore durante il salvataggio dell'impegno:", payload.nome);
      }
    }

    this.$emit('change-status', 'gestioneImpegni');

  } catch (e) {
    alert("Errore durante la creazione degli impegni: " + e.message);
  }
},
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1FOIfb0XxLcvhPtgCHE04M0ny9HZeRuZrd7x9A2nhbJ4/Foglio1"
        );
        this.tableData = await response.json();
      } catch (error) {
        console.error("Errore nel caricamento dati:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleRowSelection(index) {
      const pos = this.selectedRows.indexOf(index);
      if (pos === -1) {
        this.selectedRows.push(index);
      } else {
        this.selectedRows.splice(pos, 1);
      }
    },
    isRowSelected(index) {
      return this.selectedRows.includes(index);
    }
  },
  emits: ['change-status']
}
</script>

<template>
  <!-- breadcrumb -->
  <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5">
    <ol class="breadcrumb">
      <li class="breadcrumb-item"><a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a></li>
      <li class="breadcrumb-item active" aria-current="page" style="color: #fff">
        <a href="#" style="color: #fff" @click="$emit('change-status', 'gestioneImpegni')">Gestione impegni</a>
      </li>
      <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Importa Impegno</li>
    </ol>
  </nav>

  <!-- caption crea(evento) -->
  <div class="inLine">
    <div class="circleArrow backArrow margin ms-3">
      <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'gestioneImpegni')"></i>
    </div>
    <p class="fs-2 mx-2" style="color: white;">Importa Impegno</p>
  </div>

  <div class="container-fluid adapt" style="height: 100vh;">
      <div v-if="!isLoading" class="col-12 d-flex flex-column p-0 m-0" style="height: 100%; background-color: #78c3ce;">
        <form @submit.prevent="onSubmit()" class="flex-grow-1 w-100 m-0 p-0">
            <div class="table-container">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th v-for="(value, key) in tableData[0]" :key="key">{{ key }}</th>
                    <th>Seleziona</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, index) in tableData" :key="index">
                    <td v-for="(value, key) in row" :key="key">{{ value }}</td>
                    <td>
                      <input 
                        type="checkbox" 
                        :checked="isRowSelected(index)" 
                        @change="toggleRowSelection(index)" 
                        style="width: 18px; height: 18px; cursor: pointer;"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="circle btnUpLoadEvent" @click="onSubmit">
              <i class="bi bi-upload small-icon"></i>
            </div>
        </form>
      </div>

      <!-- loader -->
      <div class="containerC" v-else>
        <div class="cradle-wrap" v-for="n in 3" :key="n">
          <div class="cradle"><div class="sphere"></div></div>
        </div>
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
  width: 60px;
  height: 60px;
  background-color: #266874;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
}

.circle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.small-icon {
  font-size: 25px;
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

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

form {
  margin: 0;
  padding: 0;
}

.tabellaImpegni {
  margin: 0;
  padding: 0;
}

</style>