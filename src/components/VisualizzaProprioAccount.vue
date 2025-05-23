<script>

    import { useLoginStore } from '@/stores/login';
    import { ref } from 'vue';

export default {
    props: {
        sessionStorage: Object
    },
    data() {
        return {
            oldPsw: "",
            newPsw: "",
            confPsw: "",
            cambiaPassword: false,
            testoBtn1: "Visualizza Cambia Password",
            testoBtn2: "Nascondi Cambia Password",
            testoBtn: "",

        }
    },
    methods: {
        async ChangePassword() {
            if (this.oldPsw === this.sessionStorage.Password) {
                if (this.newPsw === this.confPsw) {

                    const mail = ref(this.sessionStorage.Mail);
                    const psw = ref(this.newPsw);

                    const loginStore = useLoginStore()

                    loginStore.updatePassword(mail, psw)
                }
                else {
                    alert("le password non coincidono")
                }
            }
            else {
                alert("sbagliata la vecchia password")
            }
        },
        AbilitaCambiaPassword() {
            this.cambiaPassword = !this.cambiaPassword
            this.CambiaTestoBottone();
        },
        CambiaTestoBottone() {
            !this.cambiaPassword ? this.testoBtn = this.testoBtn1 : this.testoBtn = this.testoBtn2;
        },
    },
    created() {
        this.CambiaTestoBottone()
    },
    emits:['logout', 'change-status']


}

</script>

<template>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff"><a href="#"
                    style="color: #fff">Gestione Account</a>
            </li>
        </ol>
    </nav>
    <div>
        <div class="circleArrow backArrow margin ms-3 sameLine">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
        <p class="fs-2 mx-2 sameLine" style="color: white;">Crea</p>
    </div>
    <div class="container">
        <h1>Gestione Utente</h1>

        <div>
            <div class="form-group">
                <label for="nome">Nome:</label>
                <label type="text" class="form-control" id="cognome">{{ this.sessionStorage.Nome }}</label>
            </div>

            <div class="form-group">
                <label for="cognome">Cognome:</label>
                <label type="text" class="form-control" id="cognome">{{ this.sessionStorage.Cognome }}</label>
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <label type="email" class="form-control" id="email">{{ this.sessionStorage.Mail }}</label>
            </div>
            <br>
            <button type="button" class="btn" @click="AbilitaCambiaPassword()">{{ testoBtn }}</button>
            <button type="button" class="btn btn-danger margin me-5" @click="$emit('change-status', login), $emit('logout')">Logout</button>
        </div>

        <div v-if="cambiaPassword">
            <form @submit.prevent="ChangePassword()">


                <div class="form-group">
                    <label for="oldPsw">Vecchia password:</label>
                    <input type="password" class="form-control" id="oldPsw" v-model="oldPsw">
                </div>
                <div class="form-group">
                    <label for="newPsw">Nuova password:</label>
                    <input type="password" class="form-control" id="newPsw" v-model="newPsw">
                </div>
                <div class="form-group">
                    <label for="confPsw">Conferma password:</label>
                    <input type="password" class="form-control" id="confPsw" v-model="confPsw">
                </div>
                <br>
                <button class="btn" type="submit">Conferma Cambiamento</button>
            </form>
        </div>

    </div>
</template>


<style scoped>
.container {
    max-width: 800px;
    margin: 0 auto;
}

.sameLine{
    display: inline-block;
}

#mainDiv {
    display: flex;
    flex-direction: column;
}

.btn {
    background-color: #266874;
    color: #ffffff;
}

.title {
    color: #ffffff;
    float: left;
}

iframe {
    width: 80vw;
    height: 40vh;
}

.circle {
    width: 100px;
    height: 100px;
}

.circle,
.circleArrow {
    background-color: #266874;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    font-size: 150px;
}

.circleArrow {
    width: 40px;
    height: 40px;
}

.backArrow {
    border-width: 40px;
    border-radius: 50px;
}

.backArrow:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}
</style>
