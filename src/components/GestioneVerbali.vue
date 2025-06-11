
<script>
import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

export default {
    props: { Cartelle:Object},
    data() {
        return {
            //Risposte: this.Cartelle.file['GESTIONE_ORERISPOSTEURL'],
            //DbDocenti:  this.Cartelle.file['DB_DOCENTIURL'],
            //LinkForm : this.Cartelle.file['GESTIONE_OREURL']
            loadingCdc: false,
            statusCdc: null,
            loadingDipartimenti: false,
            statusDipartimenti: null
        }
    },
    methods: {
        async Clona(type, URL) {
            if (type === 'cdc') {
                this.loadingCdc = true;
                this.statusCdc = null;
            } else if (type === 'dipartimenti') {
                this.loadingDipartimenti = true;
                this.statusDipartimenti = null;
            }

            try {
                const loginStore = useLoginStore(); 
                const res = await loginStore.CreaCloneVerAree(type, URL);
           
                if (res.success === true) {
                    if (type === 'cdc') {
                        this.statusCdc = 'success';
                    } else if (type === 'dipartimenti') {
                        this.statusDipartimenti = 'success';
                    }
                } else {
                    if (type === 'cdc') {
                        this.statusCdc = 'error';
                    } else if (type === 'dipartimenti') {
                        this.statusDipartimenti = 'error';
                    }
                    alert("Errore nella creazione: " + (res.message || "Errore sconosciuto"));
                }
            } catch (e) {
                if (type === 'cdc') {
                    this.statusCdc = 'error';
                } else if (type === 'dipartimenti') {
                    this.statusDipartimenti = 'error';
                }
                alert("Errore di connessione: " + e.message);
            } finally {
                if (type === 'cdc') {
                    this.loadingCdc = false;
                } else if (type === 'dipartimenti') {
                    this.loadingDipartimenti = false;
                }
            }
        },
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
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Gestione Verbali</li>
        </ol>
    </nav>
    </div>
    <div class="sameLine">
        <div class="circle backArrow margin ms-3">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
    </div>

    <div class="container-fluid py-4">
        <h2 class="section-title mb-4 text-white">Gestione verbali</h2>
        <div class="card mb-4 panel-card">
            <div class="card-body">

                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <a class="linkModelli" :href="Cartelle['LinkVerbaliCDC']" target="_blank" rel="noopener noreferrer">Modello verbale cdc</a>
                    <div class="d-flex align-items-center gap-2">
                        <button class="azzurro-button" @click="Clona('cdc', Cartelle['LinkVerbaliCDC'])" :disabled="loadingCdc">
                            {{ loadingCdc ? 'Creazione...' : 'Crea verbale per ogni classe' }}
                        </button>
                        <p v-if="statusCdc" :class="{'text-success': statusCdc === 'success', 'text-danger': statusCdc === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusCdc === 'success' ? 'Verbali creati con successo!' : 'Errore nella creazione!' }}
                        </p>
                    </div>
                </div>
                
                <div class="operation-item d-flex align-items-center justify-content-between my-3">
                    <a class="linkModelli" :href="Cartelle['LinkVerbaliDipartimenti']" target="_blank" rel="noopener noreferrer">Modello verbale dipartimenti</a>
                    <div class="d-flex align-items-center gap-2">
                        <button class="azzurro-button" @click="Clona('dipartimenti', Cartelle['LinkVerbaliDipartimenti'])" :disabled="loadingDipartimenti">
                            {{ loadingDipartimenti ? 'Creazione...' : 'Crea verbale per ogni dipartimento' }}
                        </button>
                        <p v-if="statusDipartimenti" :class="{'text-success': statusDipartimenti === 'success', 'text-danger': statusDipartimenti === 'error'}" class="status-message ms-auto mt-1">
                            {{ statusDipartimenti === 'success' ? 'Verbali creati con successo!' : 'Errore nella creazione!' }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.circle {
    width: 40px;
    height: 40px;
    background-color: #266874;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 150px;
}

.backArrow{
    border-width: 40px;
    border-radius: 50px;
}

iframe {
    width: 90%;
    height: 200%;
    border-radius: 25px;
}

.backArrow:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}

body {
    background-color: #2b2e4a;
    color: #f8f9fa; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container-fluid {
    padding-left: 1rem;
    padding-right: 1rem;
}

/* Classi cronologia percorso */
.breadcrumb-item a {
    color: #fff !important;
    text-decoration: underline !important;
    transition: color 0.2s ease;
}

.breadcrumb-item.active {
    color: #fff !important;
}

/* Titolo della Sezione Principale */
.section-title {
    color: #e0f7fa; 
    text-align: center;
    margin-bottom: 2.5rem;
    font-weight: 600;
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

/* Stile delle Card del Pannello */
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

.operation-item h5, .operation-item p {
    color: #343a40; 
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 0;
}

/* Link ai documenti */
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

/* Pulsanti Azzurri  */
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

</style>