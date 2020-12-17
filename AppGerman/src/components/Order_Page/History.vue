<template>
  <div>
    <template>
      <div>
        <v-stepper value="0" class="mt-12">
          <v-stepper-header>
            <v-stepper-step step="1" :complete="manutAssinatura()">Manutentor</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2" :complete="liderAssinatura()">
              Líder
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="3" :complete="admAssinatura() ">Administrador</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </div>
    </template>
    
    <br>
    <br>
    <v-card
      v-if="isMobile()"
      class="mx-auto"
      max-width="500"
    >
        <v-card-text class="py-0">
          <v-timeline
            align-top
            dense
          >
          <v-timeline-item
            v-for="(item, i) in listHistorico"
            :key="i"
            color="blue"
            small
          >
            <v-row class="pt-1">
              <v-col>
                 <span
                    :class="`headline font-weight-bold blue--text`"
                    v-text="formatDate(item.DTALTER)"
                  ></span>
                <br>
                <strong>{{item.NOME}}</strong>
                <div class="caption">
                   {{item.DESC}} 
                </div>
              </v-col>
            </v-row>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

    <v-row justify="center" v-if="!isMobile()">
      <v-col cols="6" md="6" lg="6">
            <template>
            <v-timeline>
              <v-timeline-item
                v-for="(item, i) in listHistorico"
                :key="i"
                color="blue"
                small
              >
                <template v-slot:opposite>
                  <span
                    :class="`headline font-weight-bold blue--text`"
                    v-text="formatDate(item.DTALTER)"
                  ></span>
                </template>
                <div class="py-4">
                  <h2 :class="`headline font-weight-light mb-4 blue--text`">{{item.NOME}}</h2>
                  <div>
                  {{item.DESC}}     
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </template> 
      </v-col>
    </v-row>
    <v-overlay :value="loadingPage">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { get, post } from '../../utils/http.js';
import moment from 'moment'
export default {
  name: 'summary',
  data() {
    return {
      loadingPage: false,
      fab: false,
      listHistorico: [],
      summary: {}
    }
  },
  mounted() {
    this.getHistorico();
    this.dadosom();
  },

  methods: {
    isMobile(){
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
        return true;

      return false;
    },
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY, HH:mm:ss ');
    },
    getHistorico() {
       this.loadingPage = true;
       post({ url: `${this.$host}:${this.$port}/GetOneHistorico`,
       body: {
        idOm: this.$route.params.id
       }
       }).then(res => {
         this.listHistorico = res.data;
         this.loadingPage = false;
       }).catch(err => {
         this.loadingPage = false;
       })
      },
       dadosom(){
        post({
        url: `${this.$host}:${this.$port}/GetAssinaturas`,
        body: {
          idOm: this.$route.params.id
        }
      })
        .then(res => {
          this.summary = res.data;
        })
        .catch(err => {    
        });
    },

    manutAssinatura(){
       if(this.summary[0]){
        if(this.summary[0].CARGO == 1)
          return true;
      }
      return false;
    },

     liderAssinatura(){
       if(this.summary[1]){
        if(this.summary[1].CARGO == 2)
          return true;
      }
      return false;
    },

    admAssinatura(){
      if(this.summary[2]){
        if(this.summary[2].CARGO == 3)
          return true;
      }
      return false;
    }
  }
}
</script>

<style>

.v-timeline-item__opposite{
 max-width: 95% !important;
}

/* .v-timeline-item__body{
  max-width: 90% !important;
} */
</style>
