<script>
import Home from './components/Home.vue'
import Login from './components/Login.vue';
import Navbar from '@/components/Navbar.vue';
import { Status } from './File_js/Options';
import { CurrentUser } from './File_js/Options';
import GestioneAccount from './components/GestioneAccount.vue';
import EventsMain from './components/EventsMain.vue';
import CreaEvento from './components/CreaEvento.vue';
import ImportaEvento from './components/ImportaEvento.vue';
import GestioneVerbali from './components/GestioneVerbali.vue';
import VisualizzaProprioAccount from './components/VisualizzaProprioAccount.vue'
import GestioneAmministrazione from './components/GestioneAmministrazione.vue'
import { useLoginStore } from './stores/login';
import GestioneTemplate from './components/GestioneTemplate.vue';


export default {
  data() {
    return {
      Status,
      currentStatus: Status.LOGIN,
      sessionStorage,
      CurrentUser,
      gestioneOreDocentiSheetURL: "",
      Ruolo: "",
      AlreadyLoaded:false,
      templates:[],
      nrCreated : 0
    }
  },
  async created() {
    if (!this.AlreadyLoaded) {
      this.AlreadyLoaded = true;
      //console.log("App vue created");
      //this.nrCreated = this.nrCreated + 1;
      const fetchCartelle = useLoginStore();
      let cartelle = await fetchCartelle.inizializzazioneCartelle();
      this.sessionStorage.setItem('CARTELLE', JSON.stringify(cartelle))
      this.loadTemplate();
    }
  },
  components: {
    Home,
    Login,
    Navbar,
    GestioneAccount,
    EventsMain,
    CreaEvento,
    ImportaEvento,
    GestioneVerbali,
    VisualizzaProprioAccount,
    GestioneAmministrazione,
    GestioneTemplate
  },
  methods: {
    ChangeStatus(mode) {
      switch (mode) {
        case 'home':
          this.currentStatus = Status.HOME;
          sessionStorage.setItem('STATUS', Status.HOME);
          break;
        case 'login':
          this.currentStatus = Status.LOGIN;
          sessionStorage.setItem('STATUS', Status.LOGIN);
          break;
        case 'account':
          this.currentStatus = Status.GESTIONE_ACCOUNT;
          sessionStorage.setItem('STATUS', Status.GESTIONE_ACCOUNT);
          break;
        case 'gestioneImpegni':
          this.currentStatus = Status.GESTIONE_IMPEGNI;
          sessionStorage.setItem('STATUS', Status.GESTIONE_IMPEGNI);
          break;
        case 'creaEvento':
          this.currentStatus = Status.CREA_EVENTO;
          sessionStorage.setItem('STATUS', Status.CREA_EVENTO);
          break;
        case 'importaEvento':
          this.currentStatus = Status.IMPORTA_EVENTO;
          sessionStorage.setItem('STATUS', Status.IMPORTA_EVENTO);
          break;
        case 'gestioneVerbali':
          this.currentStatus = Status.GESTIONE_VERBALI;
          sessionStorage.setItem('STATUS', Status.GESTIONE_VERBALI);
          break;
        case 'gestioneAmministrazione':
          this.currentStatus = Status.GESTIONE_AMMINISTRAZIONE;
          sessionStorage.setItem('STATUS', Status.GESTIONE_AMMINISTRAZIONE);
          break;
        case 'gestioneTemplate':
          this.currentStatus = Status.GESTIONE_TEMPLATE;
          sessionStorage.setItem('STATUS', Status.GESTIONE_TEMPLATE);
          break;
        case 'gestione-proprio-account':
          this.currentStatus = Status.GESTIONE_PROPRIO_ACCOUNT
          this.sessionStorage.setItem('STATUS', Status.GESTIONE_PROPRIO_ACCOUNT)
          break;
        }
      },
    
    SetUser(user) {
      sessionStorage.setItem('USER', JSON.stringify(user));
      this.Ruolo = user.Ruolo;
    },
    EventClick(event) {
      this.sessionStorage.setItem('EVENT', JSON.stringify(event))
    },
    Logout() {
      this.sessionStorage.setItem('USER', null);
      this.currentStatus = Status.LOGIN;
      this.sessionStorage.setItem('STATUS', Status.LOGIN)
    },
    loadTemplate(){
      //const folders = JSON.parse(this.sessionStorage.getItem('CARTELLE'));
      /* da riscrivere con i nuovi file
      this.gestioneOreDocentiSheetURL = folders.file.GOREURL;
      this.templates.push("TEMPLATES OPENDAY")
      this.templates.push("Form adesione")
      this.templates.push(folders.file.ADESIONE_OPENDAYURL);
      this.templates.push("Risposte adesione");
      this.templates.push(folders.file.ADESIONE_OPENDAY_RISPOSTEURL);

      this.templates.push("Form famiglie");
      this.templates.push(folders.file.ODTEMPLATEURL);

      this.templates.push("TEMPLATES MINISTAGE")
      this.templates.push("Form adesione")
      this.templates.push(folders.file.ADESIONE_MINISTAGEURL);
      this.templates.push("Risposte adesione");
      this.templates.push(folders.file.ADESIONE_MINISTAGE_RISPOSTEURL);

      this.templates.push("Form famiglie");
      this.templates.push(folders.file.MSTEMPLATEURL);
      
      this.templates.push("TEMPLATES SUMMERSTAGE")
      this.templates.push("Form famigle");
      this.templates.push(folders.file.SSTEMPLATEURL);

      this.templates.push("TEMPLATES GESTIONE ORE")
      this.templates.push("Form gestione ore");
      this.templates.push(folders.file.GOREURL);
      this.templates.push("Risposte gestione ore");
      this.templates.push(folders.file.GORE_RISPURL); */
    }
  },
}
</script>

<template>
  <div class="container-fluid p-0">
    <Navbar class="w-100" v-if="currentStatus !== Status.LOGIN || sessionStorage.getItem('STATUS') !== null"
      @change-status="ChangeStatus" @change-year="FilterEventsByYear"
      :sessionStorage="JSON.parse(sessionStorage.getItem('USER'))" />
    <Login v-if="sessionStorage.getItem('STATUS') === Status.LOGIN || sessionStorage.getItem('STATUS') === null"
      @change-status="ChangeStatus" @set-user="SetUser" />
    <Home v-if="sessionStorage.getItem('STATUS') === Status.HOME" @change-status="ChangeStatus" :Ruolo="this.Ruolo" />
    <GestioneAccount v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_ACCOUNT"
      @change-status="ChangeStatus" />
    <EventsMain v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_IMPEGNI" @change-status="ChangeStatus" />
    <CreaEvento v-if="sessionStorage.getItem('STATUS') === Status.CREA_EVENTO" @change-status="ChangeStatus" :Cartelle="JSON.parse(sessionStorage.getItem('CARTELLE'))"
      @openday-click="EventClick" :Ruolo="this.Ruolo" />
    <ImportaEvento v-if="sessionStorage.getItem('STATUS') === Status.IMPORTA_EVENTO" @change-status="ChangeStatus" :Cartelle="JSON.parse(sessionStorage.getItem('CARTELLE'))"
      @openday-click="EventClick" :Ruolo="this.Ruolo" />
    <GestioneVerbali v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_VERBALI" @change-status="ChangeStatus"
      :sheetEndpoint="this.gestioneOreDocentiSheetURL" :type="Docenti" :Cartelle="JSON.parse(sessionStorage.getItem('CARTELLE'))" />,
    <GestioneTemplate v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_TEMPLATE" @change-status="ChangeStatus" :payload="this.templates"></GestioneTemplate>
    <GestioneAmministrazione v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_AMMINISTRAZIONE" @change-status="ChangeStatus" :Cartelle="JSON.parse(sessionStorage.getItem('CARTELLE'))" />
    <VisualizzaProprioAccount v-if="sessionStorage.getItem('STATUS') === Status.GESTIONE_PROPRIO_ACCOUNT" @logout="Logout"
      :sessionStorage="JSON.parse(this.sessionStorage.getItem('USER'))" @change-status="ChangeStatus"/>
    <!-- <div id="otuput"><h1>{{ nrCreated }} - 1.0</h1></div> -->
  </div>
</template>
