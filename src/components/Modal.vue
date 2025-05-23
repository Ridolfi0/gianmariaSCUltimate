<script>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import { useLoginStore } from '../stores/login'
import { ref } from 'vue'

export default {
    props: {
        data: Object
    },
    emits: ['close', 'noFetch'],
    data() {
        return {
            user: this.data,
            isEditing:false
        }
    },
    methods: {
        editUserRole(role) {
            document.getElementById('dropdownSelectedOption').textContent = role;
        },
        async saveEdit() {
            let email = document.getElementById("setEmail").value;
            let role = document.getElementById("dropdownSelectedOption").textContent;

            const mail = ref(email)
            const ruolo = ref(role)
            
            const loginInstance = useLoginStore()

            this.isEditing=true;
            let esito = await loginInstance.editPermissions(mail, ruolo);
            this.$emit('close', true)
        }
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        Modifica utente
                    </h5>
                </div>
                <div class="modal-body ciao">
                    <div class="container-fluid">
                        <h6 style="display: inline-block;">e-mail:</h6>
                        <input id="setEmail" style="width: 250px;" class="margin ms-2" type="text"
                            :value="user[0]" />
                        <div class="margin mt-2">
                            <h6 style="display: inline-block;">Permessi:</h6>
                            <div style="display: inline-block;" class="dropdown margin ms-2">
                                <a class="btn btn-primary dropdown-toggle" href="#" role="button"
                                    data-bs-toggle="dropdown" aria-expanded="false" id="dropdownSelectedOption"
                                    @click="alerts()">
                                    {{ user[4] }}
                                </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" @click="editUserRole('admin')">admin</a></li>
                                    <li><a class="dropdown-item" href="#" @click="editUserRole('editor')">editor</a>
                                    </li>
                                    <li><a class="dropdown-item" href="#"
                                        @click="editUserRole('viewer')">viewer</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="$emit('close', false)">Chiudi</button>
                    <button type="button" class="btn btn-primary close" data-bs-dismiss="modal"
                        @click="saveEdit()">Salva</button>
                    <h6 v-if="this.isEditing">Modifica utente in corso...</h6>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.modal {
    display: flex;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

.dropdown{
    overflow-y:inherit !important;
}

.modal-content {
    margin: auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    background-color: white;
}

.close {
    float: right;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}
</style>