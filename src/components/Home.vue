<script>
export default {
    props:{Ruolo:String},
    emits:["change-status"]
}
</script>

<template>
    <div class="container-fluid h-100">
        <div class="row d-flex justify-content-center align-items-center h-100 py-5">
            <div class="col-4 d-flex justify-content-center">
                <button class="btn btn-scelta" @click="this.$emit('change-status','gestioneImpegni')">
                    <div class="container">
                        <div class="row"><i class="bi bi-list-check"></i></div>
                        <div class="row fw"><p>GESTIONE IMPEGNI</p></div>
                    </div>
                </button>
            </div>
            <div class="col-4 d-flex justify-content-center" v-if="this.Ruolo !== 'viewer'">
                <button class="btn btn-scelta" @click="this.$emit('change-status','gestioneVerbali')">
                    <div class="container">
                        <div class="row"><i class="bi bi-file-earmark-text"></i></div>
                        <div class="row fw"><p>GESTIONE VERBALI</p></div>
                    </div>
                </button>
            </div>
            <div class="col-4 d-flex justify-content-center"  v-if="this.Ruolo !== 'viewer'">
                <button class="btn btn-scelta" @click="this.$emit('change-status','gestioneAmministrazione')">
                    <div class="container">
                        <div class="row"><i class="bi bi-gear"></i></div>
                        <div class="row fw"><p>AMMINISTRATORE</p></div>
                    </div>
                </button>
            </div>
            <div class="col-4 d-flex justify-content-center" v-if="this.Ruolo !== 'viewer'">
                <button class="btn btn-scelta" @click="this.$emit('change-status','gestioneTemplate')">
                    <div class="container">
                        <div class="row"><i class="bi bi-puzzle"></i></div>
                        <div class="row fw"><p>GESTIONE TEMPLATE</p></div>
                    </div>
                </button>
            </div>
        </div>
    </div>

</template>

<style scoped>
    p{
        text-align: center;
        color: white
    }
</style>