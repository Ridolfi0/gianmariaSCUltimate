<script>
import { useLoginStore } from '../stores/login'

export default {
  props: {
    Ruolo: String,
    Cartelle: Object,
  },
  emits: ['change-status'],
  data() {
    return {
      tableData: [],
      isLoading: true,
      selectedRows: [],
      loadingCondividi: false,
      statusCondividi: null,
      loadingElimina: false,
      statusElimina: null
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch("https://opensheet.elk.sh/1nLs1QG_mIVCHyyKo1FwhZy5aTBui5Iyr9ETNAney5Tg/Impegni");
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
    async condividiConTutti() {
      if (this.selectedRows.length === 0) return;

      this.loadingCondividi = true;
      this.statusCondividi = null;

      const impegni = this.selectedRows.map(i => this.tableData[i]);
      const loginStore = useLoginStore();

      try {
        for (let i = 0; i < impegni.length; i++) {
          await loginStore.condividiImpegno(impegni[i].Id);
        }
        this.statusCondividi = 'success';
      } catch (e) {
        console.error(e);
        this.statusCondividi = 'error';
      } finally {
        this.loadingCondividi = false;
      }
    },
    async eliminaImpegni() {
      if (this.selectedRows.length === 0) return;

      this.loadingElimina = true;
      this.statusElimina = null;

      const impegni = this.selectedRows.map(i => this.tableData[i]);
      const loginStore = useLoginStore();

      try {
        for (let i = 0; i < impegni.length; i++) {
          await loginStore.deleteImpegno(impegni[i].Id);
        }
        this.statusElimina = 'success';
        this.selectedRows = [];
        await this.fetchData();
      } catch (e) {
        console.error(e);
        this.statusElimina = 'error';
      } finally {
        this.loadingElimina = false;
      }
    }
  }
};
</script>

<template>
  <div class="fullscreen-wrapper">
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5 unselectable">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
        </li>
        <li class="breadcrumb-item active" style="color: #fff">Gestione impegni</li>
      </ol>
    </nav>

    <div class="d-flex align-items-center back-title mb-4">
      <div class="circleArrow backArrow me-2">
        <i class="bi bi-arrow-left small-icon" @click="$emit('change-status', 'home')"></i>
      </div>
      <h2 class="ms-3 text-white">Impegni</h2>
    </div>

    <div v-if="isLoading" class="loader-fullscreen">
      <div class="cradle-wrap" v-for="n in 3" :key="n">
        <div class="cradle"><div class="sphere"></div></div>
      </div>
    </div>

    <div v-else class="main-content-wrapper">
      <div class="main-content-area">
        <div class="left-panel">
          <div class="refresh-wrapper">
            <div class="circle btnAddEvent" @click="fetchData">
              <i class="bi bi-arrow-clockwise small-icon me-1"></i>
            </div>
          </div>

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

              <div class="button-bar mt-3">
                <button
                  type="button"
                  class="btn btn-primary me-2"
                  :disabled="selectedRows.length === 0 || loadingCondividi"
                  @click="condividiConTutti"
                >
                  {{ loadingCondividi ? 'Condivisione...' : 'Condividi con tutti' }}
                </button>
                <span v-if="statusCondividi" :class="{'text-success': statusCondividi === 'success', 'text-danger': statusCondividi === 'error'}">
                  {{ statusCondividi === 'success' ? 'Condivisione completata!' : 'Errore nella condivisione!' }}
                </span>

                <button
                  type="button"
                  class="btn btn-danger ms-3"
                  :disabled="selectedRows.length === 0 || loadingElimina"
                  @click="eliminaImpegni"
                >
                  {{ loadingElimina ? 'Eliminazione...' : 'Elimina selezionati' }}
                </button>
                <span v-if="statusElimina" :class="{'text-success': statusElimina === 'success', 'text-danger': statusElimina === 'error'}" class="ms-2">
                  {{ statusElimina === 'success' ? 'Impegni eliminati!' : 'Errore nell\'eliminazione!' }}
                </span>
              </div>
            </div>
          </form>
        </div>

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

.main-content-wrapper {
  background-color: #78c3ce;
  padding: 1rem;
  border-radius: 10px;
}

.main-content-area {
  display: flex;
  gap: 1.5rem;
}

.left-panel {
  flex: 1;
}

.right-panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.refresh-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
}

.table-container {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
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

.button-bar {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
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