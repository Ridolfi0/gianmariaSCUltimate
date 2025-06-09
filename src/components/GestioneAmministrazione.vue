<script>
import { useLoginStore } from '../stores/login'

export default {
    props: { Cartelle:Object},
    data() {
        return {
            //DbStudenti: this.Cartelle.file['DB_STUDENTIURL'],
            LinkDBSacroCuore: this.Cartelle['LinkDBSacroCuore'],
            LinkStudentiDaCaricare: this.Cartelle['LinkStudentiDaCaricare'],
            LinkDocentiDaCaricare: this.Cartelle['LinkDocentiDaCaricare'],
            LinkClassiDocentiDaCaricare: this.Cartelle['LinkClassiDocentiDaCaricare']
        }
    },
    methods: {
        async creaCartelle() {
            const loginStore = useLoginStore();
            loginStore.creaCartelleInizioAnno();
        },
        async caricaDatiStudenti() {
            const loginStore = useLoginStore();
            loginStore.caricaDatiStudenti();
        },
        async caricaDatiDocenti() {
            const loginStore = useLoginStore();
            loginStore.caricaDatiDocenti();
        },
        async caricaDatiDocentiClassi() {
            const loginStore = useLoginStore();
            loginStore.caricaDatiDocentiClassi();
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
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Amministratore</li>
        </ol>
    </nav>
    </div>
    <div class="sameLine">
        <div class="circle backArrow margin ms-3">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
    </div>
    <div class="container-fluid my-3">
           <!-- <iframe :src="this.DbStudenti" style="height: 1000px;"></iframe> -->
        <div style="display: flex; align-items: center; gap: 8px;">
            <h3 style="margin: 0;">Gestione generale (link al database):</h3>
            <a class="linkModelli" :href="LinkDBSacroCuore" target="_blank" rel="noopener noreferrer">clicca qui</a>
        </div>

        <h4>Operazioni di inzio anno:</h4>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h4>Crea cartelle per verbali (cdc e dipartimenti)</h4> 
            <button @click="creaCartelle" class="azzurro-button">Crea</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h4>Archivia i dati degli STUDENTI dell'anno precedente</h4> 
            <button class="azzurro-button">Archivia</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h4>Archivia i dati degli DOCENTI dell'anno precedente</h4> 
            <button class="azzurro-button">Archivia</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h3 style="margin: 0;">Documento per l'inserimento dati degli studenti: </h3>
            <a class="linkModelli" :href="LinkStudentiDaCaricare" target="_blank" rel="noopener noreferrer">clicca qui</a>
            <button class="azzurro-button" @click="caricaDatiStudenti">Carica</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h3 style="margin: 0;">Documento per l'inserimento dati dei docenti: </h3>
            <a class="linkModelli" :href="LinkDocentiDaCaricare" target="_blank" rel="noopener noreferrer">clicca qui</a>
            <button class="azzurro-button" @click="caricaDatiDocenti">Carica</button>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
            <h3 style="margin: 0;">Documento per l'inserimento dati delle classi dei docenti: </h3>
            <a class="linkModelli" :href="LinkClassiDocentiDaCaricare" target="_blank" rel="noopener noreferrer">clicca qui</a>
            <button class="azzurro-button" @click="caricaDatiDocentiClassi">Carica</button>
        </div>
    </div>
</template>

<style scoped>
iframe {
    width: 90%;
    height: 200%;
    border-radius: 25px;
}

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
    width: 85%;
    height: 900px;
}

.backArrow:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}

.linkModelli {
    color: #000000;
}

input {
  background-color: #266874;
  color: #78c3ce;
}

input:focus {
  background-color: #21575f;
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

</style>