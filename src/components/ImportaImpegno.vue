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
      tableData: [],
      selectedRows: [],
      condividiConTutti: false
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    async onSubmit() {
      this.isLoading = true;
      this.text = "Sto creando gli impegni selezionati...";
      const loginStore = useLoginStore();
      try {
        for (let i = 0; i < this.selectedRows.length; i++) {
          const index = this.selectedRows[i];
          const row = this.tableData[index];

          const res = await loginStore.upLoadImpegno(
            row.Titolo,
            row.Descrizione,
            row.DataOraInizio,
            row.DataOraFine,
            index + 2,
            this.condividiConTutti
          );
          if (res.status !== "success") {
            console.warn("Errore su:", row.Titolo);
          }
        }
        this.$emit('change-status', 'gestioneImpegni');
      } catch (e) {
        alert("Errore: " + e.message);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch("https://opensheet.elk.sh/1FOIfb0XxLcvhPtgCHE04M0ny9HZeRuZrd7x9A2nhbJ4/Foglio1");
        this.tableData = await response.json();
      } catch (error) {
        console.error("Errore nel caricamento:", error);
      } finally {
        this.isLoading = false;
      }
    },
    toggleRowSelection(index) {
      const pos = this.selectedRows.indexOf(index);
      if (pos === -1) this.selectedRows.push(index);
      else this.selectedRows.splice(pos, 1);
    },
    isRowSelected(index) {
      return this.selectedRows.includes(index);
    }
  },
  emits: ['change-status']
}
</script>

<template>
  <div class="fullscreen-wrapper">
    <!-- Breadcrumb -->
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: #fff">
          <a href="#" style="color: #fff" @click="$emit('change-status', 'gestioneImpegni')">Gestione impegni</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Importa impegno</li>
      </ol>
    </nav>

    <div class="d-flex align-items-center back-title mb-4">
      <div class="circleArrow backArrow me-2">
        <i class="bi bi-arrow-left small-icon" @click="$emit('change-status', 'gestioneImpegni')"></i>
      </div>
      <h2 class="ms-3 text-white">Importa Impegno</h2>
    </div>

    <div class="main-content-wrapper">
      <div class="checkbox-wrapper mb-3">
        <input type="checkbox" id="condividi" v-model="condividiConTutti" class="buttonCondividi" />
        <label for="condividi">Condividi con tutti</label>
      </div>

      <div v-if="!isLoading">
        <form @submit.prevent="onSubmit">
          <div class="table-container">
            <table class="table table-striped table-bordered">
              <thead v-if="tableData.length">
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
                      class="checkbox-select"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="upload-button-wrapper">
            <div class="circle btnUpLoadEvent" @click="onSubmit">
              <i class="bi bi-upload small-icon"></i>
            </div>
          </div>
        </form>
      </div>

      <div v-else class="loader-fullscreen">
        <div class="cradle-wrap" v-for="n in 3" :key="n">
          <div class="cradle"><div class="sphere"></div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-wrapper {
  padding: 2rem;
}

.breadcrumb-nav .breadcrumb {
  --bs-breadcrumb-divider-color: white;
  --bs-breadcrumb-item-color: white;
  --bs-breadcrumb-active-color: white;
}

.back-title {
  margin-bottom: 1rem;
}

.text-white {
  color: white;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-left: 1rem;
}

.buttonCondividi {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.checkbox-wrapper label {
  color: white;
  font-size: 16px;
}

.checkbox-select {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.main-content-wrapper {
  background-color: #78c3ce;
  padding: 1.5rem;
  border-radius: 10px;
}

.table-container {
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
}

.upload-button-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
}

.table {
  background-color: white;
  width: 100%;
}

.circle, .circleArrow {
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

.circle:hover, .circleArrow:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.small-icon {
  font-size: 25px;
}

.loader-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.cradle-wrap {
  position: relative;
  animation: turn 3s linear infinite;
}

.cradle {
  margin: 0 auto;
  width: 125px;
  height: 50px;
  position: relative;
}

.sphere {
  background: #266874;
  width: 10px;
  height: 10px;
  border-radius: 25px;
  position: absolute;
  top: 0px;
  animation: slide 1s ease-in-out infinite alternate;
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
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
