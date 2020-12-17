<template>
  <v-row>
      <v-dialog
        v-model="dialogFilter"
        max-width="800px"
      >
        <v-card>
          <v-card-title>
            Filtros
          </v-card-title>
          <v-card-text>
 
            <v-text-field
              v-model="Filters.idsap"
              label="Id SAP"
            />

             <v-text-field
              v-model="Filters.id"
              label="Id OM"
            />

            <v-select
              v-model="Filters.estado"
              :items="arrayEstado"
              label="Estado"
            />

            <v-select
              v-model="Filters.locinst"
              :items="sectorItems"
              label="Local de instalação"
            />
            <v-select
              v-model="Filters.prioridade"
              :items="priorityItems"
              label="Prioridade"
            />
             <v-select
              v-model="Filters.requerparada"
              :items="requiresStopItems"
              label="Requer parada?"
            />
            <v-select
              v-model="Filters.tpom"
              :items="typeItems"
              label="Tipo de om"
            />

            <v-select
              v-model="Filters.causadef"
              :items="arrayCausa"
              label="Causa do defeito"
            />

            <v-select
              v-model="Filters.idlayout"
              :items="arrayLayout"
              label="Estilo"
            />

            <v-select
              v-model="Filters.idct"
              :items="arrayCT"
              label="Centro de custo"
            />

             <v-select
              v-model="Filters.sintoma"
              :items="arraySintoma"
              label="Sintoma"
            />
            
            <v-menu
              v-model="geracaoMinPicker"
              :close-on-content-click="false"
              max-width="290"
            >
             <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.geracaoMin"
                  clearable
                  label="Data Início Gerada Minimo"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.geracaoMin"
                @change="geracaoMinPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="geracaoMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
             <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.geracaoMax"
                  clearable
                  label="Data Início Gerada Maximo"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.geracaoMax"
                @change="geracaoMaxPicker = false"
              />
            </v-menu>
            
            <v-menu
              v-model="geracaoMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
            <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.iniPlanMin"
                  clearable
                  label="Data Início Planejada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.iniPlanMin"
                @change="iniPlanMinPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="iniPlanMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.iniPlanMax"
                  clearable
                  label="Data Início Planejada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.iniPlanMax"
                @change="iniPlanMaxPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="iniProgMinPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.iniProgMin"
                  clearable
                  label="Data Início Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.iniProgMin"
                @change="iniProgMinPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="iniProgMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.iniProgMax"
                  clearable
                  label="Data Fim Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.iniProgMax"
                @change="iniProgMaxPicker = false"
              />
            </v-menu>


            <v-menu
              v-model="fimPlanMinPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.fimPlanMin"
                  clearable
                  label="Data Fim Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.fimPlanMin"
                @change="fimPlanMinPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="fimPlanMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.fimPlanMax"
                  clearable
                  label="Data Fim Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.fimPlanMax"
                @change="fimPlanMaxPicker = false"
              />
            </v-menu>
            
            <v-menu
              v-model="fimProgMinPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.fimProgMin"
                  clearable
                  label="Data Fim Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.fimProgMin"
                @change="fimProgMinPicker = false"
              />
            </v-menu>

            <v-menu
              v-model="fimProgMaxPicker"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="Filters.fimProgMax"
                  clearable
                  label="Data Fim Programada"
                  readonly
                  v-on="on"
                />
              </template>
              <v-date-picker
                v-model="Filters.fimProgMax"
                @change="fimProgMaxPicker = false"
              />
            </v-menu>
   
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialogFilter = false"
            >
              Cancelar
            </v-btn>

            <v-btn
              color="green"
              text
              @click="applyFilters()" 
            >
              Filtrar
            </v-btn>  
          </v-card-actions>
        </v-card>
      </v-dialog>

    <v-col cols="12"> 
        <v-btn
              class="btn-filtros"
              rounded
              color="primary"
              small
              @click="dialogFilter = !dialogFilter"
              >
              Filtros
        </v-btn> 
      <v-list one-line subheader flat>
        
        <!-- <v-btn  @click="dialogFilter = !dialogFilter"  small fab color="red" :style="{'position': 'absolute','right':'30px'}">
          <v-icon>mdi-filter</v-icon>
        </v-btn> -->
 
        <v-list-item v-for='(item) in getListFilter' :key='item.ID'>
          <v-list-item-avatar class='mt-0 mr-1'>
            <v-icon :class='getIconClass(item.PRIORIDADE)'/>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html='getOrderTitle(item.TITULO)'></v-list-item-title>
            <v-list-item-subtitle v-html='getOrderType(item.TBTIPOMANNOME)'></v-list-item-subtitle>
            <v-list-item-subtitle v-html='getOrderSector(item.TBLOC_INSTNOME)'></v-list-item-subtitle>
            <v-list-item-subtitle v-html='getOrderTypeOm(item.ESTILO)'></v-list-item-subtitle>
            <template>
             <div>
            <v-btn
              class="btn-float-left btn-informacoes"
              rounded
              color="primary"
              small
              
              @click=' detalharOM(item.TITULO,item.SINTOMANOME,item.TBLOC_INSTNOME,item.TBLAYOUTOMNOME,item.TBTIPOMANNOME,item.TBCAUSADEFNOME, item.TBPRIORIDADENOME, item.ID)' 
            >
              Informações
            </v-btn> 
            </div>
            </template>
          </v-list-item-content>      
          <v-dialog hide-overlay
            v-model="dialogDetalhes"
            width="500"
          >
            <v-card>
              <v-btn
                icon
                dark
                color="black"
                @click="dialogDetalhes = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              
              <v-divider></v-divider>

              <v-card-title class="headline">
                Detalhes
              </v-card-title>

              <v-card-text>
                <p><b>Titulo: </b>{{detalhes.titulo}}</p>
                <p><b>Sintoma: </b>{{detalhes.sintoma}}</p>
                <p><b>Local: </b>{{detalhes.localinstal}}</p>
                <p><b>Tipo da om: </b>{{detalhes.tipoOm}}</p>
                <p><b>Tipo da manutenção: </b>{{detalhes.manutencao}}</p>
                <p><b>Defeito: </b>{{detalhes.defeito}}</p>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-btn
                  class="btn-float-left btn-margin-10"
                  color="blue darken-1"
                  outlined
                  small
                  @click='acessarOM(detalhes.id)'
                >
                  Verificar
                </v-btn>
                <v-btn
                  class="btn-float-left btn-margin-10"
                  color="red"
                  outlined
                  small
                  @click="dialog2 = !dialog2"
                >
                  Convidar
                </v-btn>
              </v-card-actions>
              <div class="text-center" v-if="hiddenBtnAccept()" >
                <v-btn 
                block
                normal
                class="btn-aceitar"
                color="green"
                @click='acceptOM(item.ID)'
                >
                  Aceitar OM
                </v-btn>  
              </div>
            </v-card>
          </v-dialog>

          <template>
            <div>
              <v-row
                justify="center"
              >
                <v-dialog
                  v-model="dialog2"
                  max-width="500px"
                >
                  <v-card>
                    <v-card-title>
                      Selecione o manutentor para ser delegado:
                    </v-card-title>
                    <v-card-text>
                      <v-select
                        v-model="manutentor"
                        :items="selectAllManutentor"
                        label="Lista dos Manutentores"
                        
                      ></v-select>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        color="primary"
                        text
                        @click="dialog2 = false"
                      >
                        Cancelar
                      </v-btn>

                      <v-btn
                        color="green"
                        text
                        @click='delegateOM(item.ID)' 
                      >
                        Concluir
                      </v-btn>  
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </div>
          </template>
          
        </v-list-item>
      </v-list>

      <v-overlay :value="loadingPage">
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-overlay>
    </v-col>
    <v-bottom-sheet v-model="showAlert">
      <v-sheet inset class="text-center" height="150px">
        <div class="py-1">{{ message.text }}</div>
        <v-btn
          class="mt-6"
          dark
          outlined
          color="red"
          @click="getAllOrderList()"
        >
          Tentar Novamente
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-row>
</template>

<script>
import { get, post, put, remove  } from '../utils/http.js';
import filterMenu from '../components/FilterMenu';

export default {
  components: {
    filterMenu,
  },
  data() {
    return {
      Filters: {
        estado: "",
        prioridade:"",
        locinst:"",
        idct:"",
        idlayout:"",
        tpom:"",
        sintoma:"",
        causadef:"",
        requerparada:"",
        idsap:"",
        id:"",
        geracaoMin: "",
        geracaoMax: "",
        iniPlanMin: "",
        iniPlanMax: "",
        iniProgMin: "",
        iniProgMax: "",
        fimPlanMin: "",
        fimPlanMax: "",
        fimProgMin: "",
        fimProgMax: "",
      },
      geracaoMaxPicker: false,
      geracaoMinPicker: false,
      iniPlanMinPicker: false,
      iniPlanMaxPicker: false,
      iniProgMinPicker: false,
      iniProgMaxPicker: false,
      fimPlanMinPicker: false,
      fimPlanMaxPicker: false,
      fimProgMinPicker: false,
      fimProgMaxPicker: false,

      sectorItems: [],
      typeItems: [],
      arrayCausa: [],
      arrayCT: [],
      arrayLayout: [],
      arraySintoma:[],
      requiresStopItems: [
        { value: 'SIM', text: 'SIM' },
        { value: 'NAO', text: 'NÃO' },
      ],
      priorityItems: [
        { value: 1, text: 'Baixa' },
        { value: 2, text: 'Média' },
        { value: 3, text: 'Alta' },
      ],
      arrayEstado:[
        {text:"NOVA(SEM ATRIBUIÇÃO)", value: 1},
        {text:"ATRIBUIDA AO MANUTENTOR", value: 2},
        {text:"ATRIBUIDA AO LIDER", value: 3},
        {text:"ATRIBUIDA AO ADM", value: 4},
        {text:"FINALIZADA", value: 5}
      ],
        
      dialogDetalhes: false,
      dialogFilter: false,
      entrarBtn:false,
      aceitarBtn:false,
      cargoBtn: false,
      loadingPage: false,
      showAlert: false,
      show: false,
      list: [],
      listOmAtribuida: [],
      listOmEmAnalise: [],
      selectAllManutentor: [],
      status: 0,
      message: {
        type: '',
        text: '',
        showReloadPage: false,
      },
      detalhes: { titulo: "",
                  sintoma: "",
                  localinstal: "",
                  tipoOm: "",
                  manutencao: "",
                  defeito: "",
                  prioridade: ""
                  },
      manutentor: 0,
      dialog2: false,
      isHidden: {},
      direction: 'left',
      fab: false,
      fling: false,
      hover: false,
      tabs: null,
      top: false,
      right: false,
      bottom: false,
      left: false,
      transition: 'slide-y-reverse-transition',
      isfiltered: false,
    }
  },

  mounted() {
    this.getAllOrderList();
    this.getAllManutentor();
    this.getOmAtribuida();
    this.getOmFinalizada();
    this.verificaBtn();

    this.getAllSector();
    this.getAllMaintenance();
    this.getCausa();
    this.getCt();
    this.loadEstilo();
    this.loadSintoma();
    
  },

  computed: {
    getListFilter() {
      //if (this.$store.state.list.searchFilter !== '') return this.list.filter(i => i.titulo.includes(this.$store.state.list.searchFilter));
      //if (this.$store.state.list.filterStatus === 0) return this.list;
      //return this.list.filter(i => i.ESTADO === this.$store.state.list.filterStatus);
      if(this.$store.state.list.filterStatus == 0){
        this.entrarBtn = false;
        this.aceitarBtn = true;
        return this.list;
      }
      else if(this.$store.state.list.filterStatus == 2){
         this.entrarBtn = true;
         this.aceitarBtn = false;
         return this.listOmAtribuida;
      } 
      else if(this.$store.state.list.filterStatus == 3){
        this.entrarBtn = false;
        this.aceitarBtn = false;
        return this.listOmEmAnalise;
      } 
    },
  },

  methods: {

    hiddenBtnAccept(){
      if(this.$store.state.list.filterStatus == 0)
        return true;

      return false;
    },

    detalharOM(titulo,sintoma,localinstal,tipoOm,manutencao,defeito,prioridade,id){
      
      this.detalhes.id = id;
      this.detalhes.titulo = titulo,
      this.detalhes.sintoma = sintoma,
      this.detalhes.localinstal = localinstal,
      this.detalhes.tipoOm = tipoOm,
      this.detalhes.manutencao = manutencao,
      this.detalhes.defeito = defeito,
      this.detalhes.prioridade = prioridade

      this.dialogDetalhes = true
    },
    applyFilters(){
      this.isfiltered = true;
      this.getAllOrderList()
    },
     loadSintoma() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetSINTOMA` }).then(res => {
          this.loadingPage = false;
           res.data.map(i => {
             console.log(i)
            this.arraySintoma.push({ value: i.ID, text: i.NOME });
            console.log(this.arrayLayout);
           });
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

     loadEstilo() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetLAYOUTOM` }).then(res => {
          this.loadingPage = false;
           res.data.map(i => {
             console.log(i)
            this.arrayLayout.push({ value: i.ID, text: i.NOME , idestilo: i.IDESTILO});
            console.log(this.arrayLayout);
           });
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

    getCt() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetCT` }).then(res => {
          res.data.map(i => {
            this.arrayCT.push({ value: i.ID, text: i.NOME });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

    getCausa() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetCAUSADEF` }).then(res => {
          res.data.map(i => {
            this.arrayCausa.push({ value: i.ID, text: i.DSCAUSA });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

     getAllMaintenance() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetTIPOMAN` }).then(res => {
          res.data.map(i => {
            this.typeItems.push({ value: i.ID, text: i.NOME });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

      getAllSector() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetLOC_INST` }).then(res => {
          res.data.map(i => {
            this.sectorItems.push({ value: i.ID, text: i.NOME });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

   showActionBtns(index){
     this.$set(this.isHidden,index,!this.isHidden[index]);
   },

   verificaBtn(){
     let cargo = localStorage.getItem('cargoId');

    if(this.$store.state.list.filterStatus == 2){
      
    }

     if( cargo != 1){
       this.cargoBtn = true;
     }
   },
    getOrderType(type) {
      return `Tipo de Manutenção: <b>${type}</b>`;
    },
      getOrderTitle(def) {
      return `Titulo: <b>${def}</b>`;
    },
      getOrderSector(local) {
      return `Local: <b>${local}</b>`;
    },
    getOrderTypeOm(typeOm) {
      console.log("AQUI -->> ", typeOm);
      if(typeOm == 1){
         return `Tipo da om: <b>Corretiva/Preventiva</b>`;
      }
      else if(typeOm == 3){
         return `Tipo da om: <b>Lista</b>`;
      }
      else if(typeOm == 2){
         return `Tipo da om: <b>Rota</b>`;
      }
     
    },

    acessarOM(idOm){
      const cargoId = localStorage.getItem('cargoId');
      if(cargoId == 1){
        this.$router.push(`/epi/${idOm}`);
      }else{
        this.$router.push(`/order/${idOm}`)
      }
    },

    getIconClass(priority) {
      if (priority == 1) return 'yellow'; 
      if (priority == 2) return 'orange'; 
      if (priority == 3) return 'red'; 
    },

   async getAllManutentor(){
      const idUser = localStorage.getItem('userId');

      post({ url: `${this.$host}:${this.$port}/GetManuts`,
       body: {
          idUser: idUser
        },
      }).then(res => {
        res.data.map(i => {
            this.selectAllManutentor.push({ value: i.ID, text: i.NOME });
          });
      }).catch(err => {
        alert(err);
      })
    },

   getOmAtribuida() {
      this.showAlert = false;
      this.loadingPage = true;
      this.message.text = '';
      const idUser = localStorage.getItem('userId');
      const cargoId = localStorage.getItem('cargoId');
      const token = localStorage.getItem('token');
      console.log("TOKEN ---->>>>", token);

      if(cargoId == 1){
        post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
          body: {
            GetOMByUserIDAtribuida: idUser
          },
        }).then(res => {
          this.listOmAtribuida = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      } 
      else if(cargoId == 2){
        post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
          body: {
            GetOMsAndamentoLider: idUser
          },
        }).then(res => {
          this.listOmAtribuida = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      }
      else if(cargoId == 3){
         post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
         body : {
           GetOMsAndamentoADM : idUser
         }
        }).then(res => {
          this.listOmAtribuida = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      }
      
    },

    getOmFinalizada() {
      this.showAlert = false;
      this.loadingPage = true;
      this.message.text = '';
      const idUser = localStorage.getItem('userId');
      const cargoId = localStorage.getItem('cargoId');

      if(cargoId == 1){
        post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
          body: {
            GetOMByUserIDFinalizada: idUser
          },
        }).then(res => {
          this.listOmEmAnalise = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      } 
      else if(cargoId == 2){
        post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
          body: {
            GetOMsFinalizadaLider: idUser
          },
        }).then(res => {
          this.listOmEmAnalise = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      }
      else if(cargoId == 3){
        post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
        body: {
            GetOMsFinalizadaADM: idUser
          },
        }).then(res => {
          this.listOmEmAnalise = res.data;
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.message.text = 'Ocorreu um erro ao obter informações...';
          this.showAlert = true;
        })
      }
      
    },


    async getAllOrderList() {
      this.showAlert = false;
      this.loadingPage = true;
      this.message.text = '';
      if(this.isfiltered){
         post({ url: `${this.$host}:${this.$port}/GetOMFiltrada`,
          body: this.Filters,
          }).then(res => {
          this.list = res.data;
          this.loadingPage = false;
          this.dialogFilter = false;
          }).catch(err => {
            alert("Erro ao utilizar os filtros: ",err);
        })
      }
      else{
        const idUser = localStorage.getItem('userId');
        post({url: `${this.$host}:${this.$port}/GetOMFiltrada`,
        body : {
          GetOM : idUser
        }}).then(res => {
          console.log("Headers: ", res.data.headers);
        this.list = res.data;
        this.loadingPage = false;
      }).catch(err => {
        this.loadingPage = false;
        this.message.text = 'Ocorreu um erro ao obter informações...';
        this.showAlert = true;
      })
      }
      
      
    },

    acceptOM(idOrder){
      const idUser = localStorage.getItem('userId');
      post({
        url: `${this.$host}:${this.$port}/AddOMUser`,
        body: {
          idUser: idUser,
          idOm: idOrder
        },
      }).then(res => {
        alert("Ordem de manutenção movida para sua lista.");      
        window.location.reload();
      }).catch(err => {
        alert("Ocorreu um erro ao aceitar essa Ordem de manutenção");
      });
    },
    
     delegateOM(idOm){
      var idUser = localStorage.getItem("userId");
       post({
        url: `${this.$host}:${this.$port}/DelegateOM`,
        body: {
          idOm: idOm, //id da om
          idUser: this.manutentor ,
          idAdm: idUser,
        }
      }).then(res => {
        this.dialog2 = false
        alert("Manutentor delegado com sucesso.");      
      }).catch(err => {
        alert("Ocorreu um erro ao delegadar essa Ordem de manutenção");
      });
    }
  }
}
</script>

<style>
  .v-icon {
    width: 20px !important;
    height: 20px !important;
  }
  .btnTooltip{
    margin-right: 10px;
  }
  .btn-margin-10{
    margin: 10px !important;
  }
  .btn-float-left{
    float: left;
  }
  .btn-aceitar{
    margin-top: 5px !important;
    color: white !important;
  }
  .btn-informacoes{
    color: white !important;
  }
  .v-dialog{
  -webkit-box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.02); 
    box-shadow: 5px 5px 10px 5px rgba(0,0,0,0.02);
  }
  .btn-filtros{
    float:right;
  }
</style>
