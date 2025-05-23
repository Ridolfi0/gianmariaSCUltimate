<script>

/* eslint-disable vue/require-v-for-key  */

export default {
    data() {
        return {
        }
    },
    emits: ["change-status"],
    props: {
        payload: Array, //array di id da includere
    }
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
            <li class="breadcrumb-item active" aria-current="page" style="color: #fff">Gestione template</li>
        </ol>
    </nav>
    </div>
    <div class="sameLine">
        <div class="circle backArrow margin ms-3">
            <i class="bi bi-arrow-left fs-3" @click="$emit('change-status', 'home')"></i>
        </div>
    </div>

    <!-- <div class="container d-flex justify-content-center my-5" v-for="link in payload">
        <h2 v-if="link.includes(' ')" class="write">{{ link }}</h2>
        <a style="color: greenyellow;" v-else target="_blank" :href="link">{{ link }}</a>
    </div> -->
    
</template>

<style>
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

.backArrow:hover{
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: white;
    transition: transform 0.2s, box-shadow 0.2s;
}

.write{
    color:#ffffff;
}
</style>