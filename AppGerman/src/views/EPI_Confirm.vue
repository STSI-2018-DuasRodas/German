<template>
  <v-container fluid>
    <v-card flat>
      <v-row>
        <v-col cols="12" md="10" lg="6">
          <v-list>
            <v-subheader>Favor preencher todas as EPI's abaixo:</v-subheader>
            <v-list-item v-for="item in listEpi" :key="item.id">
              <v-list-item-content>
                <v-checkbox
                  hide-details
                  color="red darken-3"
                  :label="item.NOME"
                  :value="item.ID"
                  v-model="episelect"
                />
              </v-list-item-content>
            </v-list-item>
            <v-col cols="12" md="8">
              <v-textarea
                outlined
                name="input-7-4"
                label="Termos"
                value="Declaro por meio deste a ciência sobre os riscos de não utilizar todos os EPI's necessários e coloco sobre minha responsabilidade quaisquer problemas devido a falta de uso dos mesmos."
              ></v-textarea>
               <v-checkbox
                v-model="checkbox"
                value="1"
                label="Concordo com os termos"
                type="checkbox"
                required
              ></v-checkbox>
            </v-col>
            
          </v-list>
        </v-col>
      </v-row>
    </v-card>
      <v-btn
        v-if="checkbox"
        @click="confirmEpi()"
        block
        dark
        color="red darken-3"
        :loading="isLoading"
      >
        Continuar
      </v-btn>
    </v-footer>
  </v-container>
</template>

<script>
import { get, post, put, remove  } from '../utils/http.js';
export default {
  data() {
    return {
      checkbox: false,
      episelect: [],
      isLoading: false,
      listEpi: []
    }
  },
  mounted() {
    this.getEpi();
  },
  methods: {
     confirmEpi() {
        this.isLoading = true;
        var iduser = localStorage.getItem("userId");
        post({
          url: `${this.$host}:${this.$port}/AddOMEPI`,
          body: {
            idUser: iduser,  
            idOm: this.$route.params.id,
            epis: this.episelect,
          }
        })
        .then(res => {
          this.isLoading = false;
          this.$router.push(`/order/${this.$route.params.id}`)
        })
        .catch(err => {    
        });
     },

    getEpi(){
      get({ url: `${this.$host}:${this.$port}/GetEPIs `
      }).then(res => {
          this.listEpi = res.data
      }).catch(err => {
        alert(err);
      })
    },
  },
}
</script>

<style>

</style>