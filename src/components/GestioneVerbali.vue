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
        }
    },
    methods: {
        async Clona(type, URL) {
            try {
                const loginStore = useLoginStore(); // Prima ottieni lo store
                const res = await loginStore.CreaCloneVerAree(type, URL); // Poi usa il suo metodo
            
                if (res.success === true) {
                    
                } else {
                    alert("Errore nella creazione: " + (res.message || "Errore sconosciuto"));
                }
            } catch (e) {
                alert("Errore di connessione: " + e.message);
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
    <div style="display: flex; align-items: center; gap: 8px;">
        <h3 style="margin: 0;">Modello verbale cdc:</h3>
        <a class="linkModelli" :href="Cartelle['LinkVerbaliCDC']">clicca qui</a>
    </div>
    <button class="azzurro-button" @click="Clona('cdc', Cartelle['LinkVerbaliCDC'])">Crea verbale per ogni classe</button>  
    <br>
    <br>
    <div style="display: flex; align-items: center; gap: 8px;">
        <h3 style="margin: 0;">Modello verbale dipartimenti:</h3>
        <a class="linkModelli" :href="Cartelle['LinkVerbaliDipartimenti']">clicca qui</a>
    </div>
    <button class="azzurro-button" @click="Clona('dipartimenti', Cartelle['LinkVerbaliDipartimenti'])">Crea verbale per ogni dipartimento</button>
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
.linkModelli {
    color: #0f0f0f;
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