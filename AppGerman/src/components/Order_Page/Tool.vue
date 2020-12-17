<template>
  <div>
     <v-data-table
      :headers="headers"
      :items="listTool"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Layout da Om</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Novo</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form
                    ref="form"
                    v-model="valid"
                    :lazy-validation="lazy"
                  >
                    <v-select
                      v-model="editedItem.MATDESC"
                      :items="materiais"
                      :rules="[v => !!v || 'Estilo é Obrigatório']"
                      label="Material"
                      required
                    />      
                    <v-text-field
                      v-model="editedItem.QTDE"
                      :rules="[v => !!v || 'Quantidade é Obrigatório']"
                      label="Quantidade"
                      required
                    />      
                  </v-form>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                <v-btn color="blue darken-1" text @click="save">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="loadValues()">Recarregar</v-btn>
      </template>
    </v-data-table>
    <v-overlay :value="loadingPage">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-bottom-sheet v-model="showAlert">
      <v-sheet inset class="text-center" height="150px">
        <div class="py-1">Ocorreu um erro ao se comunicar com o banco!</div>
        <v-btn
          class="mt-6"
          dark
          outlined
          color="red"
          @click="showAlert = !showAlert"
        >
          Fechar
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import { get, post, put, remove,patch } from '../../utils/http.js';
export default {
  name: 'summary',
  data() {
    return {
      showAlert: false,
      loadingPage: false,
      lazy: false,
      valid: false,
      dialog: false,
      errorMessage: '',
      sheet: false,
      newTool: false,
      valid: true,
      lazy: false,
      dialog: false,
      isLoading: false,
      toolDefault: null,
      loadingPage: false,
      toolName: '',
      qtde: '',
      listTool: [],
      materiais: [],
      qtdeRules: [v => !!v || 'Quantidade é Obrigatória!', v => v !== '0' || 'Quantidade não pode ser 0 (zero)'],
       editedIndex: -1,
       editedItem: {
        MATDESC: '',
        LI: '',
        MATMEDIDA: '',
        QTDE: ''
      },
       headers: [
        {
          text: 'Nome',
          value: 'MATDESC',         
        },
        {
          text: 'Un. de Medida',
          value: 'MATMEDIDA'          
        },
        {
          text: 'Quantidade',
          value: 'QTDE'          
        },
        {
          text: 'Ação',
          value: 'action', 
          sortable: false
        },
      ],
    }
  },
   computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Material' : 'Alterar Material'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

  mounted() {
    this.loadValues();
  },

  methods: {

     deleteItem(item) {
        const index = this.listTool.indexOf(item)
        if (confirm('Tem certeza que deseja remover?')) {
          this.loadingPage = true;
          var iduser = localStorage.getItem("userId");
          patch({
            url: `${this.$host}:${this.$port}/DeleteOMMaterial`,
            body: {
              idOm : this.$route.params.id,
              idMat: item.IDMAT,
              idUser: iduser

            }}).then(res => {
            this.loadValues();
            this.loadingPage = false;
          }).catch(err => {
            this.loadingPage = false;
            this.showAlert = true;
          });
        }
      },

    editItem(item) {
      this.editedIndex = this.listTool.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    close() {
      this.dialog = false
      this.valid = true
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save() {
        if(this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.loadingPage = true;
            var iduser = localStorage.getItem("userId");
            post({
              url: `${this.$host}:${this.$port}/EditOMMaterialQTD `,
              body: {
                 idMat: this.editedItem.MATDESC,
                idOm: this.$route.params.id,
                qtde: this.editedItem.QTDE,
                idUser: iduser
              },
            }).then(res => {
              this.loadValues();
              this.loadingPage = false;
            }).catch(err => {
              this.loadingPage = false;
              this.showAlert = true;
            });
          } else {

            this.loadingPage = true;
            var iduser = localStorage.getItem("userId");
            post({
              url: `${this.$host}:${this.$port}/AddOMMaterial `,
              body: {
                idMat: this.editedItem.MATDESC,
                idOm: this.$route.params.id,
                qtde: this.editedItem.QTDE,
                idUser: iduser

              }
            }).then(res => {
              this.loadValues();
              this.loadingPage = false;
            }).catch(err => {
              this.loadingPage = false;
              this.showAlert = true;
            });
          }
          this.close();
        }
      },


    loadValues() {
       this.loadingPage = true;
      post({
        url: `${this.$host}:${this.$port}/GetMatWOM`,
        body: {
           idom: this.$route.params.id, //id da om
        },
      }).then(res => {
         this.loadingPage = false;
       this.listTool = res.data;
      }).catch(err => {
         this.loadingPage = false;
        alert("Ocorreu um erro ao listar materiais.");
      });
      get({ url: `${this.$host}:${this.$port}/GetMATERIAL` }).then(res => {
        this.loadingPage = false;
         res.data.map(i => {
            this.materiais.push({
              text: i.DESC,
              value: i.ID,
            });
          });
      }).catch(err => {
        this.loadingPage = false;
        this.showAlert = true;
      });
    },
  }
}
</script>

<style>

</style>
