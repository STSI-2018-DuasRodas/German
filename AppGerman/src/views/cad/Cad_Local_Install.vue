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
          <v-toolbar-title>Local de Instalação</v-toolbar-title>
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
                    <v-text-field
                      v-model="editedItem.IDSAP"
                      :rules="[v => !!v || 'Código SAP é Obrigatório']"
                      label="Código SAP"
                      required
                    />
                    <v-select
                      v-model="lider1"
                      :items="lideres"
                      :rules="[v => !!v || 'Lider do setor é Obrigatório']"
                      label="Líder do Setor"
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
      lider1: 0,
      lideres: [],
      headers: [
        {
          text: 'Nome',
          value: 'NOME'
        },{
          text: 'Codigo Sap',
          value: 'IDSAP'
        },{
          text: 'Código Líder',
          value: 'LIDER'
        },
        {
          text: 'Ação',
          value: 'action', 
          sortable: false
        },
      ],
      sectorItems: [],
      editedIndex: -1,
      editedItem: {
        ID: '',
        NOME: '',
        IDSAP: '',
        LIDER: '',
      },
      defaultItem: {
        NOME: '',
        IDSAP: '',
        LIDER: '',
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Local de instalação' : 'Alterar Local de instalação'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    mounted() {
      this.loadValues();
      this.loadLideres();
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
            url: `${this.$host}:${this.$port}/DelLOC_INST`,
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
        get({url: `${this.$host}:${this.$port}/GetLOC_INST` }).then(res => {
          this.loadingPage = false;
          this.sectorItems = res.data;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

      loadLideres() {
        this.loadingPage = false;
        get({ url: `${this.$host}:${this.$port}/GetLeads` }).then(res => {
          this.loadingPage = false;
          res.data.map(i => {
            this.lideres.push({ value: i.ID, text: i.NOME });
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
              url: `${this.$host}:${this.$port}/EditLOC_INST`,
              body: {
                id: this.editedItem.ID,
                name: this.editedItem.NOME,
                idsap: this.editedItem.IDSAP,
                idlider: this.lider1
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
              url: `${this.$host}:${this.$port}/AddLOC_INST`,
              body: {
                name: this.editedItem.NOME,
                idsap: this.editedItem.IDSAP,
                idlider: this.lider1
              },
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

