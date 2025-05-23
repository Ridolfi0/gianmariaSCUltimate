<script>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-parsing-error */

import { useLoginStore } from '../stores/login'
import { ref } from 'vue'
import { CurrentUser } from '../File_js/Options'

export default {
    data() {
        return {
            users:[],
            CurrentUser:{Nome: "", Cognome: "", Mail: "", Ruolo : ""},
            sessionStorage,
            isLoading:false
        }
    },
    methods:{
        async onSubmit() {
            let $email = document.getElementById("in1").value
            let $password = document.getElementById("in2").value
            this.isLoading = true

            const mail = ref($email)
            const userpwd = ref($password)
            
            const loginInstance = useLoginStore()
            
            let esito = await loginInstance.log(mail, userpwd);
            this.isLoading = false


            if(esito.success == true){
                CurrentUser.Nome = esito.name;
                CurrentUser.Cognome = esito.cognome; 
                CurrentUser.Mail = esito.mail;
                CurrentUser.Ruolo = esito.ruolo;
                CurrentUser.Password = esito.password;
                this.$emit('change-status', 'home', this.cartelle);
                let userString = JSON.stringify(CurrentUser);
                sessionStorage.setItem('USER', userString);
                this.$emit('set-user', JSON.parse(sessionStorage.getItem('USER')));
            }
            else{
                alert("Errore nelle credenziali")
            }
        }
    },
    emits:["change-status", "set-user"]
}

//colors
// #78c3ce  #55a0a1  #266874  #21575f  #1c454a  #11282d
</script>

<template>

    <div class="container-fluid adapt">
        <div class="row align-items-center" style="height: 100vh;">
            <div class="col-2"></div>
            <div class="col-8 d-flex rounded-4 px-3 justify-content-center align-items-center" style="height: 80vh;">
                <form @submit.prevent="onSubmit()" class="fs-1" style="width: 40vW;">
                    <p class="unselectable">Username:</p>
                    <input autocomplete="off" placeholder="Enter email" type="email" class="rounded-4 p-2 px-3" id="in1" required>
                    <p class="unselectable mt-2">Password:</p>
                    <input placeholder="Enter password" type="password" class="rounded-4 p-2 px-3" id="in2" required>
                    <input type="submit" class="btn rounded-4 se float-end text-light fs-1 p-2 px-3" value="Login" tabindex="-1"></input>
                    <div v-if="isLoading" class="loader m-3">
                        <div class="loaderBar"></div>
                    </div>
                </form>

            </div>
            <div class="col-2"></div>
        </div>
    </div>

</template>

<style scoped>
body{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
.se {
    background-color: #266874;
    color: #78c3ce;
    
}

.se:hover {
    background-color: #21575f;
}

.adapt {
    background-image: url('https://cdn.jsdelivr.net/gh/DiegusFrosty/ImagesOpenDay@1247ca9/Login.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
}
input {
    background-color: #266874;
    color: #78c3ce;
}

input:focus {
    background-color: #21575f;
}

p {
    color: #11282d;
    font-weight: bold;
}

::placeholder {
    color: #78c3ce;
}

.loader { 
  width:500px; 
  margin:0 auto;
  border-radius:10px;
  border:4px solid transparent;
  position:relative;
  padding:1px;
}
.loader:before {
  content:'';
  border:1px solid #21575f; 
  border-radius:10px;
  position:absolute;
  top:-4px; 
  right:-4px; 
  bottom:-4px; 
  left:-4px;
}
.loader .loaderBar { 
  position:absolute;
  border-radius:10px;
  top:0;
  right:100%;
  bottom:0;
  left:0;
  background:#78c3ce; 
  width:0;
  animation:borealisBar 2s linear infinite;
}

@keyframes borealisBar {
  0% {
    left:0%;
    right:100%;
    width:0%;
  }
  10% {
    left:0%;
    right:75%;
    width:25%;
  }
  90% {
    right:0%;
    left:75%;
    width:25%;
  }
  100% {
    left:100%;
    right:0%;
    width:0%;
  }
}
</style>