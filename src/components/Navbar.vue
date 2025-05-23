<script>
export default {
    emits: ["change-status", "change-year"],
    props:{
        sessionStorage:Object,
    },
    data() {
        return {
            //imageUrl:"https://cdn.jsdelivr.net/gh/DiegusFrosty/ImagesOpenDay@1247ca9/logoITT.png"
            imageUrl:"https://cdn.jsdelivr.net/gh/ftappi/ImagesCorksProjectSC@master/LogoSacroCuore.png"
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid unselectable">
            <a class="navbar-brand" @click="$emit('change-status', 'home')"><img :src="this.imageUrl"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
                aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav">
                    <li class="nav-item" v-if="this.sessionStorage.Ruolo == 'admin'">
                        <a class="nav-link" aria-current="page" @click="$emit('change-status', 'account')">Gestione Utenti</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown"
                            aria-expanded="false">
                            Gestione Impegni
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" @click="$emit('change-status', 'creaEvento')">Crea Impegno</a></li>
                            <li><a class="dropdown-item" @click="$emit('change-status', 'importaEvento')">Importa Impegni</a></li>
                            
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="$emit('change-status', 'gestioneVerbali')" v-if="this.sessionStorage.Ruolo !== 'viewer'">Gestione Verbali</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="$emit('change-status', 'gestioneAmministrazione')" v-if="this.sessionStorage.Ruolo !== 'viewer'">Amministratore</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="$emit('change-status', 'gestioneTemplate')" v-if="this.sessionStorage.Ruolo !== 'viewer'">Gestione Template</a>
                    </li>
                </ul>
            </div>

            <div class="nav-item">
                <button @click="$emit('change-status', 'gestione-proprio-account')" class="btn btn-transparent">
                    <i class="bi bi-person-circle" style="font-size: 2rem; color: #78c3ce ;"></i>
                </button>
            </div>
            <div class="nav-item">
                <a style="color: #78c3ce; font-size: 25px; text-align: center; margin-left:5px">Ciao, {{sessionStorage.Nome.substring(0,1).toUpperCase() + sessionStorage.Nome.substring(1)}}</a>

            </div>
        </div>
    </nav>
</template>

<style scoped>
i{
    width: 20px;
}
.user{
    color: #78c3ce;
    height: 20px;
}
nav,
li>ul {
    background-color: #1c454a;

}

a {
    color: #78c3ce;
    text-decoration: none;
    font-size: 25px
}

li>ul:hover {
    /* background-color: #78c3ce; */
    background-color: #1c454a
}

img {
    width: 110px;
    border-radius: 25px
}

#datepicker {
    border-radius: 20px;
    text-align: center;
    width: 90px;
}

.datepicker-button {
    background-color: #78c3ce;
    color: #1c454a;
    margin-left: 10px;
    margin-right: 10px;
}

.datepicker-button:hover {
    background-color: #1c454a;
    color: #78c3ce;
}
</style>