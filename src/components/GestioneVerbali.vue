<script>
export default {
    props: { Cartelle:Object},
    data() {
        return {
            //Risposte: this.Cartelle.file['GESTIONE_ORERISPOSTEURL'],
            //DbDocenti:  this.Cartelle.file['DB_DOCENTIURL'],
            //LinkForm : this.Cartelle.file['GESTIONE_OREURL']
        }
    },
    emits: ["change-status"]    
}
</script>

<style>
iframe {
    width: 90%;
    height: 200%;
    border-radius: 25px;
}
</style>

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
    <h3>Link a template cdc</h3>
    <h3>Button Crea per ogni classe</h3>
    <h3>Link a template dipartimenti</h3>
    <h3>Button Crea per ogni dipartimento</h3>
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
    width: 85%;
    height: 900px;
}

.backArrow:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}
</style>