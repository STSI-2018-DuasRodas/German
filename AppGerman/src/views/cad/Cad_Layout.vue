<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="sectorItems"
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
                    <v-text-field
                      v-model="editedItem.NOME"
                      :rules="[v => !!v || 'Nome é Obrigatório']"
                      label="Nome"
                      required
                    />
                    <v-select
                      v-model="editedItem.IDESTILO"
                      :items="estiloItems"
                      :rules="[v => !!v || 'Estilo é Obrigatório']"
                      label="Estilo"
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
  import { get, post, put, remove } from '../../utils/http.js';

  export default {
    data: () => ({
      showAlert: false,
      loadingPage: false,
      lazy: false,
      valid: false,
      dialog: false,
      headers: [
        {
          text: 'Nome',
          value: 'NOME',         
        },
        {
          text: 'Estilo',
          value: 'ESTILONOME'          
        },
        {
          text: 'Ação',
          value: 'action', 
          sortable: false
        },
      ],
      sectorItems: [],
      estiloItems: [],
      editedIndex: -1,
      editedItem: {
        ID: '',
        NOME: '',
        IDESTILO: ''
      },
      defaultItem: {
        NOME: '',
        IDESTILO: ''
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Layout' : 'Alterar Layout'
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
      editItem(item) {
        this.editedIndex = this.sectorItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.sectorItems.indexOf(item)
        if (confirm('Tem certeza que deseja remover?')) {
          this.loadingPage = true;
          post({
            url: `${this.$host}:${this.$port}/DelLAYOUTOM`,
            body: {
              id : item.ID
            }}).then(res => {
            this.loadValues();
            this.loadingPage = false;
          }).catch(err => {
            this.loadingPage = false;
            this.showAlert = true;
          });
        }
      },

      close() {
        this.dialog = false
        this.valid = true
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      loadValues() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetLAYOUTOM` }).then(res => {
          this.loadingPage = false;
          this.sectorItems = res.data;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });

        //select estilo
        get({ url: `${this.$host}:${this.$port}/GetESTILO ` }).then(res => {
          this.loadingPage = false;
          res.data.map(i => {
            this.estiloItems.push({
              text: i.NOME,
              value: i.ID,
            });
          });
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

      save() {
        if(this.$refs.form.validate()) {
          if (this.editedIndex > -1) {
            this.loadingPage = true;
            post({
              url: `${this.$host}:${this.$port}/EditLAYOUTOM`,
              body: {
                id: this.editedItem.ID,
                name: this.editedItem.NOME,
                layout: this.editedItem.IDESTILO
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
            post({
              url: `${this.$host}:${this.$port}/AddLAYOUTOM`,
              body: {
                name: this.editedItem.NOME ,
                layout: this.editedItem.IDESTILO

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
    },
  }
</script>