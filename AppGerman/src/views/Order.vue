<template>
  <v-container fluid>
    <summary-page v-if="activeBtn === 0" />
    <history-page v-if="activeBtn === 1" />
    <tool-page v-if="activeBtn === 2" />
    <apont-page v-if="activeBtn === 3" />
    <v-bottom-navigation
      color="red"
      app
      v-model="activeBtn"
      grow
    >
      <v-btn>
        <span>Resumo</span>
        <v-icon>mdi-clipboard-text-outline</v-icon>
      </v-btn>

      <v-btn v-if="summary.IDLAYOUT == 1">
        <span>Materiais</span>
        <v-icon>mdi-tools</v-icon>
      </v-btn>

      <v-btn>
        <span>Histórico</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>
      <!-- <v-btn>
        <span>Apontamentos</span>
        <v-icon>mdi-clock</v-icon>
      </v-btn> -->
    </v-bottom-navigation>
  </v-container>
</template>

<script>
import SummaryPage from '../components/Order_Page/Summary';
import ToolPage from '../components/Order_Page/Tool';
import HistoryPage from '../components/Order_Page/History';
import ApontPage from '../components/Order_Page/Apont';
import { get, post } from "../utils/http.js";

export default {
  components: {
    SummaryPage,
    ToolPage,
    HistoryPage,
    ApontPage,
  },

  data() {
    return {
      activeBtn: 0,
      summary:{}
    }
  },
  mounted() {
    this.dadosom();
  },
   methods: {
     dadosom(){
        post({
        url: `${this.$host}:${this.$port}/GetOMFiltrada`,
        body: {
          id: this.$route.params.id
        }
      })
        .then(res => {
          this.summary = res.data[0];
        })
        .catch(err => {    
        });
     }
   }
}
</script>

<style>
</style>
