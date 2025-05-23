<script>

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/no-mutating-props */

import { useLoginStore } from '../stores/login'

export default {
    props: {
        Ruolo:String,
        Cartelle: Object
    },
    emits: ['change-status'],
    data() {
        return {
            imageUrl: "https://cdn.jsdelivr.net/gh/DiegusFrosty/ImagesOpenDay@1247ca9/openday.png",
            eventList: {},
            isLoading: false,
            folderData: this.Cartelle
        }
    },
    async created() {
        this.isLoading = true;
        //const RecuperaEventi = useLoginStore();
        //this.eventList = await RecuperaEventi.fetchEvents(this.folderData.file['DB_IMPEGNI']);
        this.isLoading = false;
    },
    methods:{
       
    }
}
</script>

<template>
    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="mt-3 ms-5 unselectable">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#" style="color: #fff" @click="$emit('change-status', 'home')">Home</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Gestione impegni</li>
        </ol>
    </nav>
    <div class="sameLine">
        <div class="circleArrow backArrow margin ms-3">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
    </div>
    <h3 class="title sameLine margin ms-1">Impegni</h3>
    <div class="container">
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

        <h3>Visualizzo una tabella degli impegni</h3>
        <div>
            <div class="circle btnAddEvent margin ms-4" v-if="!this.isLoading && this.Ruolo !== 'viewer'">
                <i class="bi bi-plus" @click="$emit('change-status', 'creaEvento')"></i>
            </div>
            <div class="circle btnAddEvent margin ms-4" v-if="!this.isLoading && this.Ruolo !== 'viewer'">
                <i class="bi bi-upload" @click="$emit('change-status', 'importaEvento')"></i>
            </div>
        </div>
    </div>
    <!-- colors
    #78c3ce  #55a0a1  #266874  #21575f  #1c454a  #11282d -->
</template>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.containerC {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    color: #ffffff;
}

.sameLine {
    display: inline-block;
}

.circle {
    width: 100px;
    height: 100px;
}

.circle, .circleArrow{
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

img {
    border-radius: 8%;
}

.card {
    background-color: #55a0a1;
    border-radius: 8%;
}

.card-title,
.card-text {
    color: #fff;
}

.btnViewDetails {
    background-color: #266874;
    color: #fff;
}

.btnAddEvent:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}


.containerC {
    width: 350px;
    margin: 100px auto;

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