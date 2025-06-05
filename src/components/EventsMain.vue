
<script>
export default {
  props: {
    // richiama la proprietà dal padre al figlio 
    Ruolo: String,
    Cartelle: Object,
  },
  emits: ['change-status'],
  data() {
    return {
      tableData: [],
      isLoading: true,
      selectedRows: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    // chiamata per collegare e leggere il foglio google 
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch(
          "https://opensheet.elk.sh/1nLs1QG_mIVCHyyKo1FwhZy5aTBui5Iyr9ETNAney5Tg/Impegni"
        );
        // collega la tabella a quella del foglio google 
        this.tableData = await response.json();
      } catch (error) {
        console.error("Errore nel caricamento dati:", error);
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
    }, 
    onSubmit() {
      this.$emit('change-status', 'gestioneImpegni');
    }
  }
};
</script>
<template>
  <div class="fullscreen-wrapper">
    <!-- Breadcrumb -->
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5 unselectable">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
        </li>
        <li class="breadcrumb-item active" style="color: #fff">Gestione impegni</li>
      </ol>
    </nav>

    <!-- Freccia indietro -->
    <div class="d-flex align-items-center back-title mb-4">
      <div class="circleArrow backArrow me-2">
        <i class="bi bi-arrow-left small-icon" @click="$emit('change-status', 'home')"></i>
      </div>
      <p class="fs-4 text-white mb-0 ms-3">Impegni</p>
    </div>

    <!-- Loader -->
    <div v-if="isLoading" class="loader-fullscreen">
      <div class="cradle-wrap" v-for="n in 3" :key="n">
        <div class="cradle"><div class="sphere"></div></div>
      </div>
    </div>

    <!-- Contenuto con sfondo -->
    <div v-else class="main-content-wrapper">
      <div class="main-content-area">
        <!-- Colonna sinistra: tabella -->
        <div class="left-panel">
          <div class="refresh-wrapper">
            <div class="circle btnAddEvent" @click="fetchData">
              <i class="bi bi-arrow-clockwise small-icon me-1"></i>
            </div>
          </div>

          <!-- Tabella -->
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
                        style="width: 18px; height: 18px; cursor: pointer;"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
        </div>

        <!-- Colonna destra: pulsanti -->
        <div class="right-panel" v-if="Ruolo !== 'viewer'">
          <div class="circle btnAddEvent mb-3" @click="$emit('change-status', 'creaEvento')">
            <i class="bi bi-plus small-icon"></i>
          </div>
          <div class="circle btnAddEvent" @click="$emit('change-status', 'importaEvento')">
            <i class="bi bi-upload small-icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fullscreen-wrapper {
  padding: 2rem;
}

.back-title {
  margin-bottom: 1rem;
}

.loader-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

/* Tutta la sezione sotto ha sfondo azzurro */
.main-content-wrapper {
  background-color: #78c3ce;
  padding: 1rem;
  border-radius: 10px;
}

/* Layout a due colonne */
.main-content-area {
  display: flex;
  gap: 1.5rem;
}

/* Colonna sinistra */
.left-panel {
  flex: 1;
}

/* Colonna destra: bottoni verticali */
.right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Bottone ricarica in alto a destra */
.refresh-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

/* Contenitore tabella */
.table-container {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

/* Stile tabella */
.table {
  background-color: white;
  width: 100%;
}

/* Bottoni circolari */
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

/* Loader sphere */
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