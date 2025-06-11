<!-- Lisa -->
<script>
import { useLoginStore } from '../stores/login'

export default {
    props: { Cartelle:Object},
    data() {
        return {
            LinkDBSacroCuore: this.Cartelle['LinkDBSacroCuore'],
            LinkStudentiDaCaricare: this.Cartelle['LinkStudentiDaCaricare'],
            LinkDocentiDaCaricare: this.Cartelle['LinkDocentiDaCaricare'],
            LinkClassiDocentiDaCaricare: this.Cartelle['LinkClassiDocentiDaCaricare'],
            
            statusStudenti: null, 
            statusDocenti: null,
            statusDocentiClassi: null,
            statusCreaCartelle: null,
            
            loadingStudenti: false,
            loadingDocenti: false,
            loadingDocentiClassi: false,
            loadingCreaCartelle: false 
        }
    },
    methods: {
        async creaCartelle() {
            this.loadingCreaCartelle = true;
            this.statusCreaCartelle = null;
            const loginStore = useLoginStore();
            try {
                await loginStore.creaCartelleClassi();
                await loginStore.creaCartelleDipartimenti();
                this.statusCreaCartelle = 'success';
            } catch (error) {
                console.error("Errore durante la creazione delle cartelle:", error);
                this.statusCreaCartelle = 'error';
            } finally {
                this.loadingCreaCartelle = false;
            }
        },
        async caricaDatiStudenti() {
            this.loadingStudenti = true;
            this.statusStudenti = null;
            const loginStore = useLoginStore();
            try {
                await loginStore.caricaDatiStudenti();
                const verifica = await loginStore.verificaDatiStudenti();
                if (verifica) {
                    this.statusStudenti = 'success';
                } else {
                    this.statusStudenti = 'error';
                }
            } catch (error) {
                console.error("Errore durante il caricamento/verifica dati degli studenti:", error);
                this.statusStudenti = 'error';
            } finally {
                this.loadingStudenti = false;
            }
        },
        async caricaDatiDocenti() {
            this.loadingDocenti = true;
            this.statusDocenti = null;
            const loginStore = useLoginStore();
            try {
                await loginStore.caricaDatiDocenti();
                const verifica = await loginStore.verificaDatiDocenti();
                if (verifica) {
                    this.statusDocenti = 'success';
                } else {
                    this.statusDocenti = 'error';
                }
            } catch (error) {
                console.error("Errore durante il caricamento/verifica dati dei docenti:", error);
                this.statusDocenti = 'error';
            } finally {
                this.loadingDocenti = false;
            }
        },
        async caricaDatiDocentiClassi() {
            this.loadingDocentiClassi = true;
            this.statusDocentiClassi = null;
            const loginStore = useLoginStore();
            try {
                await loginStore.caricaDatiDocentiClassi();
                const verifica = await loginStore.verificaDatiDocentiClassi();
                if (verifica) {
                    this.statusDocentiClassi = 'success';
                } else {
                    this.statusDocentiClassi = 'error';
                }
            } catch (error) {
                console.error("Errore durante il caricamento/verifica dei dati delle classi dei docenti:", error);
                this.statusDocentiClassi = 'error';
            } finally {
                this.loadingDocentiClassi = false;
            }
        }
    },
    emits: ["change-status"]  
}
</script>

<template>
    <div class="container-fluid my-3">
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5 unselectable">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Amministrazione</li>
        </ol>
    </nav>
    </div>
    <div class="sameLine">
        <div class="circle backArrow margin ms-3">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
    </div>

    <div class="container-fluid py-4">
        <h2 class="section-title mb-4 text-white">Pannello di Amministrazione</h2>

        <div class="card mb-4 panel-card">
            <div class="card-body">
                <h3 class="card-title text-primary">Gestione Generale</h3>
                <div class="d-flex align-items-center mt-3">
                    <p class="mb-0 me-2 text-dark">Link al database principale:</p>
                    <a class="linkModelli" :href="LinkDBSacroCuore" target="_blank" rel="noopener noreferrer">clicca qui</a>
                </div>
            </div>
        </div>

        <div class="card mb-4 panel-card">
            <div class="card-body">
                <h3 class="card-title text-primary">Operazioni di Inizio Anno</h3>
                
                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <h5 class="mb-0 text-dark">Crea cartelle classi e dipartimenti</h5> 
                    <div class="d-flex align-items-center gap-2">
                        <button @click="creaCartelle" class="azzurro-button" :disabled="loadingCreaCartelle">
                            {{ loadingCreaCartelle ? 'Creazione...' : 'Crea' }}
                        </button>
                        <p v-if="statusCreaCartelle" :class="{'text-success': statusCreaCartelle === 'success', 'text-danger': statusCreaCartelle === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusCreaCartelle === 'success' ? 'Cartelle create!' : 'Errore nella creazione!' }}
                        </p>
                    </div>
                </div>
                
                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <h5 class="mb-0 text-dark">Archivia i dati degli STUDENTI dell'anno precedente</h5> 
                    <button class="azzurro-button">Archivia</button>
                </div>
                
                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <h5 class="mb-0 text-dark">Archivia i dati degli DOCENTI dell'anno precedente</h5> 
                    <button class="azzurro-button">Archivia</button>
                </div>
            </div>
        </div>

        <div class="card mb-4 panel-card">
            <div class="card-body">
                <h3 class="card-title text-primary">Importazione Dati</h3>

                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <a class="linkModelli" :href="LinkStudentiDaCaricare" target="_blank" rel="noopener noreferrer">Documento per l'inserimento dati degli STUDENTI:</a>
                    <div class="d-flex align-items-center gap-2">
                        <button class="azzurro-button" @click="caricaDatiStudenti" :disabled="loadingStudenti">
                            {{ loadingStudenti ? 'Caricamento...' : 'Carica' }}
                        </button>
                        <p v-if="statusStudenti" :class="{'text-success': statusStudenti === 'success', 'text-danger': statusStudenti === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusStudenti === 'success' ? 'Dati caricati con successo!' : 'Errore o verifica fallita!' }}
                        </p>
                    </div>
                </div>

                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <a class="linkModelli" :href="LinkDocentiDaCaricare" target="_blank" rel="noopener noreferrer">Documento per l'inserimento dati dei DOCENTI:</a>
                    <div class="d-flex align-items-center gap-2">
                        <button class="azzurro-button" @click="caricaDatiDocenti" :disabled="loadingDocenti">
                            {{ loadingDocenti ? 'Caricamento...' : 'Carica' }}
                        </button>
                        <p v-if="statusDocenti" :class="{'text-success': statusDocenti === 'success', 'text-danger': statusDocenti === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusDocenti === 'success' ? 'Dati caricati con successo!' : 'Errore o verifica fallita!' }}
                        </p>
                    </div>
                </div>

                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <a class="linkModelli" :href="LinkClassiDocentiDaCaricare" target="_blank" rel="noopener noreferrer">Documento per l'inserimento dati delle CLASSI DEI DOCENTI:</a>
                    <div class="d-flex align-items-center gap-2">
                        <button class="azzurro-button" @click="caricaDatiDocentiClassi" :disabled="loadingDocentiClassi">
                            {{ loadingDocentiClassi ? 'Caricamento...' : 'Carica' }}
                        </button>
                        <p v-if="statusDocentiClassi" :class="{'text-success': statusDocentiClassi === 'success', 'text-danger': statusDocentiClassi === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusDocentiClassi === 'success' ? 'Dati caricati con successo!' : 'Errore o verifica fallita!' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
body {
    background-color: #2b2e4a;
    color: #f8f9fa; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
}

.breadcrumb-item a {
    color: #fff !important;
    text-decoration: underline !important;
    transition: color 0.2s ease;
}

.breadcrumb-item.active {
    color: #fff !important;
}

.section-title {
    color: #e0f7fa;
    text-align: center;
    margin-bottom: 2.5rem;
    font-weight: 600;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.panel-card {
    background-color: #f8f9fa;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.panel-card .card-title {
    font-size: 1.6rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: #2b2e4a;
    border-bottom: 2px solid #e9ecef;
    padding-bottom: 0.75rem;
}

.operation-item {
    padding: 0.75rem 0;
    border-bottom: 1px solid #dee2e6; 
}

.operation-item:last-child {
    border-bottom: none;
}

/* Testo */
.operation-item h5, .operation-item p {
    color: #343a40; 
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0;
}

.linkModelli {
    color: #343a40; 
    text-decoration: none;
    font-weight: 500;
    font-size: 1.1rem;
    transition: color 0.2s ease;
}

.linkModelli:hover {
    color: #0056b3;
    text-decoration: underline;
}

.azzurro-button {
  background: linear-gradient(135deg,rgb(27, 52, 95) 0%,rgb(79, 107, 200) 100%);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 159, 255, 0.25);
  transition: all 0.25s ease;
  letter-spacing: 0.04em;
  user-select: none;
  min-width: 120px;
  text-align: center;
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

.azzurro-button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg,rgb(79, 107, 200) 0%,rgb(27, 52, 95) 100%);
    box-shadow: none;
    transform: none;
}

.status-icon {
    margin-left: 0.5rem;
    font-size: 1.8rem !important;
}

.status-message {
    font-size: 0.95rem;
    margin-top: 0.5rem;
    margin-left: auto; 
    padding-left: 1rem; 
}

.text-success {
    color: #28a745 !important;
}

.text-danger {
    color: #dc3545 !important;
}

.unselectable {
    user-select: none; 
}
</style>