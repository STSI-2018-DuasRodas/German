<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="equipItems"
      sort-by="name"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Equipamentos</v-toolbar-title>
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
                      :rules="[v => !!v || 'Id SAP é Obrigatório']"
                      label="Id SAP"
                      required
                    />
                     <v-text-field
                      v-model="editedItem.EQUIP_SUP"
                      :rules="[v => !!v || 'Equipamento superior é Obrigatório']"
                      label="Equipamento superior"
                      required
                    />
                    <v-text-field
                      v-model="editedItem.LOCAL"
                      :rules="[v => !!v || 'Local é Obrigatório']"
                      label="Local"
                      required
                    />
                    <v-select
                      v-model="editedItem.LOC_INST_ATRIB"
                      :items="sectorItems"
                      :rules="[v => !!v || 'Local de Instalação é Obrigatório']"
                      label="Local de Instalação"
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
        <!-- <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon> -->
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
      LOC_INST_ATRIB: 0,
      sectorItems: [],
      headers: [
        {
          text: 'Nome',
          value: 'NOME',         
        },
        {
          text: 'Local de instalação',
          value: 'LOC_INST_ATRIB'          
        },
        {
          text: 'Local',
          value: 'LOCAL'          
        },
        {
          text: 'Equipamento superior',
          value: 'EQUIP_SUP'          
        },
        {
          text: 'Id SAP',
          value: 'IDSAP'
        },
        {
          text: 'Ação',
          value: 'action', 
          sortable: false
        },
      ],
      equipItems: [],
      editedIndex: -1,
      editedItem: {
        ID: '',
        NOME: '',
        IDSAP: '',
        LOC_INST_ATRIB: '',
        LOCAL: '',
        EQUIP_SUP: '',
      },
      defaultItem: {
        NOME: '',
        IDSAP: '',
        LOC_INST_ATRIB: ''
      },
    }),

    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Novo Equipamento' : 'Alterar Equipamento'
      },
    },

    watch: {
      dialog(val) {
        val || this.close()
      },
    },

    mounted() {
      this.loadValues();
      this.loadSectors();
    },

    methods: {
      editItem(item) {
        this.editedIndex = this.equipItems.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem(item) {
        const index = this.equipItems.indexOf(item)
        if (confirm('Tem certeza que deseja remover?')) {
          this.loadingPage = true;
          post({
            url: `${this.$host}:${this.$port}/DelEquip`,
            body: {
              id: item.ID
            }
            }).then(res => {
            
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
        get({ url: `${this.$host}:${this.$port}/GetEQUIP` }).then(res => {
          this.loadingPage = false;
          this.equipItems = res.data;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

      loadSectors() {
        this.loadingPage = false;
        get({ url: `${this.$host}:${this.$port}/GetLOC_INST` }).then(res => {
          this.loadingPage = false;
          res.data.map(i => {
            this.sectorItems.push({ value: i.ID, text: i.NOME });
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
              url: `${this.$host}:${this.$port}/EditEQUIP`,
              body: {
                id: this.editedItem.ID,
                name: this.editedItem.NOME ,
                idsap: this.editedItem.IDSAP,
                li: this.editedItem.LOC_INST_ATRIB,
                local: this.editedItem.LOCAL,
                equipsup: this.editedItem.EQUIP_SUP
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
              url: `${this.$host}:${this.$port}/AddEquip`,
              body: {
                name: this.editedItem.NOME ,
                idsap: this.editedItem.IDSAP,
                li: this.editedItem.LOC_INST_ATRIB,
                local: this.editedItem.LOCAL,
                equipsup: this.editedItem.EQUIP_SUP
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