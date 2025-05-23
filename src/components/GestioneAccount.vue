<script>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-use-v-if-with-v-for */

import Modal from "./Modal.vue"
import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

export default {
    data() {
        return {
            usersList: [],
            showModal: false,
            allUsers: [],
            selectedUser: null,
            filter: "",
            isLoading: false,
            newUserData: { name: "", surname: "", mail: "", password: "", role: "" },
            testoSceltaRuoli: "Filtra per ruoli",
            roleToFilter:"tutti"
            // niko puzza
        }
    },
    methods: {
        openModal(user) {
            this.selectedUser = user;
            this.showModal = true;
        },
        async closeModal(fetch) {
            this.showModal = false;
            if (fetch) {
                this.isLoading = true;
                this.filter = "";
                this.selectedUser = null;
                this.usersList = {};
                this.usersList = await this.fetchUsers();
                this.allUsers = this.usersList;
                this.testoSceltaRuoli = "Filtra per ruolo";
                this.filter = "";
                this.isLoading = false;
            }
        },
        filterUsers() {
            if (this.filter !== "" && this.roleToFilter === "tutti") {
                let filteredUsers = [];
                filteredUsers = this.allUsers.filter(
                    user => (user[2].toLowerCase().startsWith(this.filter.toLowerCase()))
                );
                this.usersList = filteredUsers;
            }
            else if(this.filter !== "" && this.roleToFilter !== "tutti"){
                let filteredUsers = [];
                filteredUsers = this.allUsers.filter(
                    user => (user[2].toLowerCase().startsWith(this.filter.toLowerCase()) && user[4] === this.roleToFilter)
                );
                this.usersList = filteredUsers;
            }
            else if(this.roleToFilter !== "tutti"){
                let filteredUsers = [];
                filteredUsers = this.allUsers.filter(
                    user => (user[4] === this.roleToFilter)
                );
                this.usersList = filteredUsers;
            }
            else {
                this.usersList = this.allUsers;
            }
        },
        setRole(role){
            this.roleToFilter = role;
            if(role !== "tutti"){
                this.testoSceltaRuoli = role
            }
            else{
                this.testoSceltaRuoli = "Filtra per Ruoli";
            }
            this.filterUsers();
        },
        editUserRole(role) {
            document.getElementById('role').textContent = role;
        },
        async fetchUsers() {
            const loginInstance = useLoginStore();
            const data = await loginInstance.fetchAllUsers();
            return data;
        },
        async addUser() {
            this.isLoading = true;
            this.newUserData.role = document.getElementById('role').textContent;
            const loginInstance = useLoginStore();

            const mail = ref(this.newUserData.mail);
            const name = ref(this.newUserData.name);
            const surname = ref(this.newUserData.surname);
            const role = ref(this.newUserData.role);
            const pwd = ref(this.newUserData.password);
            const data = await loginInstance.addNewUser(mail, name, surname, role, pwd);
            this.usersList = await this.fetchUsers();
            this.allUsers = this.usersList;
            this.testoSceltaRuoli = "Filtra per ruolo";
            this.filter = "";
            this.isLoading = false;
        },
        async deleteUser(user) {
            let conferma = confirm("Vuoi eliminare questo utente?");
            if (conferma) {
                this.isLoading = true;
                let mailToDelete = user[0];

                const loginInstance = useLoginStore();

                const mail = ref(mailToDelete);

                const data = await loginInstance.deleteUser(mail);

                this.usersList = await this.fetchUsers();
                this.allUsers = this.usersList;
                this.testoSceltaRuoli = "Filtra per ruolo";
                this.filter = "";
            }
            this.isLoading = false;
        }
    },
    async created() {
        this.isLoading = true;
        const loginInstance = useLoginStore();
        const allUsersObject = await loginInstance.fetchAllUsers();

        if (typeof allUsersObject === 'object' && !Array.isArray(allUsersObject)) {
            this.allUsers = Object.values(allUsersObject);
        } else {
            this.allUsers = allUsersObject;
        }

        this.usersList = this.allUsers;
        this.isLoading = false;
    },
    emits: ["change-status"],
    components: {
        Modal
    }
}
</script>

<template>
    <div class="container-fluid margin my-3">
        <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5 unselectable">
            <ol class="breadcrumb margin">
                <li class="breadcrumb-item"><a href="#" style="color: #fff"
                        @click="$emit('change-status', 'home')">Home</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Account</li>
            </ol>
        </nav>
        <div class="inLine mb-2">
            <i class="bi bi-arrow-left fs-3 circle backArrow" @click="$emit('change-status', 'home')"></i>
            <h3 class="title margin ms-1 unselectable">Utenti:</h3>
        </div>
        <input type="text" v-model="filter" class="inputFilter mx-3 sameLine" placeholder="Filtra per cognome"
            @input="filterUsers()" />
        <div class="dropdown margin ms-2 sameLine">
            <a class="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false" id="roleToFilter">
                {{ this.testoSceltaRuoli }}
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#" @click="setRole('admin')">Admin</a></li>
                <li><a class="dropdown-item" href="#" @click="setRole('editor')">Editor</a></li>
                <li><a class="dropdown-item" href="#" @click="setRole('viewer')">Viewer</a></li>
                <li><a class="dropdown-item" href="#" @click="setRole('tutti')">Nessun Filtro</a></li>
            </ul>
        </div>
        <button class="btn mx-3 mb-3 sameLine" id="btnAddUser" data-bs-toggle="modal" data-bs-target="#addUser">Aggiungi
            utente</button>
        <div class="modal fade" id="addUser" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Aggiungi account</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body mx-2 my-2">
                        <h6 class="sameLine">Nome:</h6>
                        <h6 class="sameLine me-5" style="float: inline-end">Cognome:</h6>
                        <div>
                            <input type="text" id="name" class="sameLine mx-2" v-model="this.newUserData.name">
                            <input type="text" id="surname" class="sameLine mx-2" v-model="this.newUserData.surname">
                        </div>
                        <h6 class="sameLine">E-Mail:</h6>
                        <h6 class="sameLine me-5" style="float: inline-end">Password:</h6>
                        <div>
                            <input type="text" id="mail" class="sameLine mx-2" v-model="this.newUserData.mail">
                            <input type="text" id="pwd" class="sameLine mx-2" v-model="this.newUserData.password">
                        </div>
                        <h6>Ruolo:</h6>
                        <div class="dropdown margin ms-2 sameLine">
                            <a class="btn btn-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                                aria-expanded="false" id="role">
                                Seleziona ruolo
                            </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#" @click="editUserRole('admin')">admin</a></li>
                                <li><a class="dropdown-item" href="#" @click="editUserRole('editor')">editor</a>
                                </li>
                                <li><a class="dropdown-item" href="#" @click="editUserRole('viewer')">viewer</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="addUser()">Salva</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="containerC" v-if="this.isLoading">
            <div class="cradle-wrap">
                <div class="cradle">
                    <div class="sphere"></div>
                </div>
            </div>
            <div class="cradle-wrap">
                <div class="cradle">
                    <div class="sphere"></div>
                </div>
            </div>
            <div class="cradle-wrap">
                <div class="cradle">
                    <div class="sphere"></div>
                </div>
            </div>
        </div>
        <div v-if="!this.isLoading" v-for="(user, index) in usersList" :key="index">
            <div class="card margin mt-1 ms-4 shadow p p-3">
                <div class="card-body">
                    <i class="bi fs-4 bi-personW-circle sameLine userImage"></i>
                    <h4 class="card-text margin ms-2 sameLine">{{ user[1][0].toUpperCase() + user[1].substring(1) }}
                    </h4>
                    <h4 class="card-text margin ms-2 sameLine">{{ user[2][0].toUpperCase() + user[2].substring(1) }}
                    </h4>
                    <h4 class="card-text margin ms-4 sameLine">({{ user[4] }})
                    </h4>
                    <button class="btn margin me-5 btnEdit" @click="openModal(user)">Modifica utente</button>
                    <button class="btn btn-danger margin me-5" @click="deleteUser(user)">Elimina Utente</button>
                </div>
            </div>
        </div>
        <Modal v-if="showModal" :data="selectedUser" @close="closeModal"></Modal>
    </div>
</template>

<style scoped>
.inLine {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.sameLine {
    display: inline-block;
}

.inputFilter {
    border-radius: 10px;
    text-align: center;
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

button {
    float: inline-end
}

.title {
    color: #ffffff;
    float: left;
}

.btnEdit,
#btnFilter,
#btnAddUser {
    background-color: #266874;
    color: #ffffff;
}

.card,
.userImage {
    background-color: #78c3ce;
    color: #000;
}

.card {
    width: 97%;
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

.containerC {
    width: 350px;
    margin: 100px auto;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        cursor: pointer;

        .cradle-wrap {
            .sphere {
                background: #11282d;
            }

            &:first-child {
                transform: rotate(120deg);

                .sphere {
                    background: #11282d;
                }
            }

            &:last-child {
                transform: rotate(240deg);

                .sphere {
                    background: #11282d;
                }
            }
        }
    }
}

.cradle-wrap {
    position: absolute;

    &:first-child {
        transform: rotate(120deg);
    }

    &:last-child {
        transform: rotate(240deg);
    }
}

.cradle {
    margin: 0 auto;
    width: 125px;
    height: 50px;
    position: relative;
    animation-name: turn;
    animation-duration: 3s;
    animation-timing-function: linear;
    animation-delay: 0;
    animation-iteration-count: infinite;
}

.sphere {
    background: #266874;
    width: 10px;
    height: 10px;
    border-radius: 25px;
    position: absolute;
    top: 0px;
    animation-name: slide;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-delay: 0;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-play-state: running;
    transition: background 0.3s ease;
}

.inputFilter,
#btnFilter {
    float: left;
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
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>