<template>
    <!-- scritta home che si genera quando entri in una pagina (cronologia) delle pagine dove sei entrato -->
  <div class="fullscreen-wrapper">
    <nav aria-label="breadcrumb" class="breadcrumb-nav unselectable">
      <ol class="breadcrumb">
        <!-- cambia lo stato della pagina e lo mette ad home -->
        <li class="breadcrumb-item"><a href="#" @click="$emit('change-status', 'home')">Home</a></li>
        <li class="breadcrumb-item active" aria-current="page">Gestione impegni</li>
      </ol>
    </nav>

    <!-- freccia che torna indietro -->
    <div class="d-flex align-items-center back-title mb-4">
      <div class="circleArrow backArrow me-2">
        <!-- cambia lo stato della pagina e lo mette ad home -->
        <i class="bi bi-arrow-left small-icon" @click="$emit('change-status', 'home')"></i>
      </div>
      <h3 class="title mb-0">Impegni</h3>
    </div>

    <div v-if="isLoading" class="loader-fullscreen">
      <div class="cradle-wrap" v-for="n in 3" :key="n">
        <div class="cradle"><div class="sphere"></div></div>
      </div>
    </div>

    <!-- bottone per aggiornare solo la tabella con le modifiche -->
    <div v-else class="content-area">
      <div class="table-section">
        <div class="refresh-wrapper">
            <div class="circle btnAddEvent mb-3"  @click="fetchData">
                <i class="bi bi-arrow-clockwise small-icon me-1"></i>
            </div>
        </div>

        <!-- tabella collegata al foglio google -->
        <div class="table-container">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th v-for="(value, key) in tableData[0]" :key="key">{{ key }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, index) in tableData" :key="index">
                <td v-for="(value, key) in row" :key="key">{{ value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- bottoni per aggiungere e caricare impegni -->
      <div class="button-panel" v-if="Ruolo !== 'viewer'">
        <div class="circle btnAddEvent mb-3" @click="$emit('change-status', 'creaEvento')">
          <i class="bi bi-plus small-icon"></i>
        </div>
        <div class="circle btnAddEvent" @click="$emit('change-status', 'importaEvento')">
          <i class="bi bi-upload small-icon"></i>
        </div>
      </div>
    </div>
  </div>
</template>

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
  },
};
</script>

<style scoped>
.fullscreen-wrapper {
  padding: 2rem;
}

.breadcrumb-nav {
  margin-bottom: 1rem;
}

.back-title {
  margin-bottom: 1rem;
}

.title {
  color: #266874;
}

.loader-fullscreen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.content-area {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.table-section {
  flex: 2;
}

.refresh-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.table-container {
  overflow-x: auto;
}

.table {
  background-color: #fff;
  width: 100%;
}

.button-panel {
  flex: 0 0 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
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

.circleArrow {
  width: 40px;
  height: 40px;
  background-color: #266874;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}

.backArrow:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.small-icon {
  font-size: 25px;
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
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
