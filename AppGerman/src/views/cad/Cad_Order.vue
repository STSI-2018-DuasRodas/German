<template>
  <div>
    <!-- <v-alert type="success">
      I'm a success alert.
    </v-alert> -->
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
   <v-select
        v-model="layout"
        :items="arrayLayout"
        :rules="[v => !!v || 'Layout é Obrigatório']"
        label="Layout"
        required
        @change="verificaEstilo()"
      />
      <v-text-field
        v-model="idsap"
        label="Id SAP"
        required
      />
      <v-text-field
        v-model="omtitulo"
        label="Titulo"
        required
      />
      <v-text-field
        v-if="this.estilo == 1"
        v-model="solicitante"
        label="Solicitante"
        required
      />

        <!-- <v-text-field
        v-model="sintoma"
        label="Sintoma"
        required
      /> -->
 
      <v-text-field
        v-if="this.estilo == 1"
        v-model="def"
        label="Defeito"
        required
      />

         <v-text-field
          v-if="this.estilo == 1"
          v-model="obs"
          label="Observação"
          required
      />

      
       <v-select
        v-if="this.estilo == 1"
        v-model="causa"
        :items="arrayCausa"
        :rules="[v => !!v || 'Causa é Obrigatório']"
        label="Causa do defeito"
        required
      />

        <v-select
        v-if="this.estilo == 1"
        v-model="sintoma"
        :items="arraySintoma"
        :rules="[v => !!v || 'Sintoma é Obrigatório']"
        label="Sintoma"
        required
      />

      <v-select
        v-model="sector"
        :items="sectorItems"
        :rules="[v => !!v || 'Local de instalação é Obrigatório']"
        label="Local de instalação"
        required
      />

      <v-select
        v-model="ct"
        :items="arrayCT"
        :rules="[v => !!v || 'Centro de trabalho é Obrigatório']"
        label="Centro de trabalho"
        required
      />
      <v-select
        v-if="this.estilo == 1"
        v-model="type"
        :items="typeItems"
        :rules="[v => !!v || 'Tipo de Manutenção é Obrigatório']"
        label="Tipo de Manutenção"
        required
      />
      <v-text v-if="this.estilo == 2"> Adicionar operação/equipamento:
      </v-text>
      <v-btn v-if="this.estilo == 2" class="ma-2" @click="dialogEquip = !dialogEquip" outlined small fab color="indigo">
        <v-icon>mdi-plus-thick</v-icon>
      </v-btn>
      <v-dialog
        v-model="dialogEquip"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            Operação/Equipamento
          </v-card-title>
          <v-card-text>
            <v-select
              v-model="equipment"
              :items="equipmentsItems"
              label="Equipamento(s)"
              return-object
            />

             <v-select
              v-model="operacao"
              :items="operacoes"
              label="Operação"
              return-object
            />
             <v-select
              v-model="material"
              :items="materialItens"
              label="Material"
              return-object
            />
            <v-text-field
              v-model="qty_material"
              label="Quantidade"
              type="number"
              
            />
            <v-btn  class="col-12" tile outlined color="success"  @click='addEquip(equipment,operacao,material,qty_material)' >
              <v-icon left>mdi-plus-thick</v-icon> Adicionar
            </v-btn>

            <v-simple-table v-if="this.equipMaterial">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">
                      Equipamento
                    </th>
                    <th class="text-left">
                      Operação
                    </th>
                    <th class="text-left">
                      Material
                    </th>
                    <th class="text-left">
                      Quantidade
                    </th>
                    <th>
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in equipMaterial"
                    :key="item.id"
                  >
                    <td>{{ item.equipamento }}</td>
                    <td>{{ item.operacao }}</td>
                    <td>{{ item.material }}</td>
                    <td>{{ item.qtde }}</td>
                    <td>  
                      <v-icon
                        small
                        @click="deleteItem(item)"
                      >
                      mdi-delete
                     </v-icon>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialogEquip = false"
            >
              Cancelar
            </v-btn>

            <v-btn
              color="green"
              text
              @click="dialogEquip = false" 
            >
              Concluir
            </v-btn>  
          </v-card-actions>
        </v-card>
      </v-dialog>

       <v-select
          v-if="this.estilo == 3"
          v-model="equipment"
          :items="equipmentsItems"
          :rules="[v => !!v || 'Equipamento é Obrigatório']"
          label="Equipamento(s)"
          required
          multiple
          attach
          chips
      />

      <v-select
          v-if="this.estilo == 1"
          v-model="equipment"
          :items="equipmentsItems"
          :rules="[v => !!v || 'Equipamento é Obrigatório']"
          label="Equipamento(s)"
          required
          @change="teste()"
      />

      <v-select
        v-if="this.estilo != 2"
        v-model="operacao"
        :items="operacoes"
        :rules="[v => !!v || 'Operação é Obrigatório']"
        label="Operação(es)"
        required
        multiple
        attach
        chips
      />

      <v-select
        v-model="priority"
        :items="priorityItems"
        :rules="[v => !!v || 'Prioridade é Obrigatório']"
        label="Prioridade"
        required
      />

       <v-select
        v-model="requiresStop"
        :items="requiresStopItems"
        :rules="[v => !!v || 'Campo  Obrigatório']"
        label="Requer parada?"
        required
      />

      <v-menu
        v-model="plannedStartPicker"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="plannedStart"
            clearable
            label="Data Início Planejada"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="plannedStart"
          @change="plannedStartPicker = false"
        />
      </v-menu>
      <v-menu
        v-model="plannedEndPicker"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="plannedEnd"
            clearable
            label="Data Fim Planejada"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="plannedEnd"
          @change="plannedEndPicker = false"
        />
      </v-menu>
      <v-menu
        v-model="scheduledStartPicker"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="scheduledStart"
            clearable
            label="Data Início Programado"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="scheduledStart"
          @change="scheduledStartPicker = false"
        />
      </v-menu>
      <v-menu
        v-model="scheduledEndPicker"
        :close-on-content-click="false"
        max-width="290"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            :value="scheduledEnd"
            clearable
            label="Data Fim Programado"
            readonly
            v-on="on"
          />
        </template>
        <v-date-picker
          v-model="scheduledEnd"
          @change="scheduledEndPicker = false"
        />
      </v-menu>

      
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Cadastrar
        </v-btn>
      </v-form>
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
  import { get, post, put } from '../../utils/http.js';
  import moment from 'moment'

  export default {
    data: () => ({
      dialogEquip: false,
     
      // ---- OM ------
      idsap: "",
      omtitulo:"",
      solicitante: "",
      ct: null,
      arrayCT: [],
      causa: null,
      arrayCausa: [],
      def: "",
      sintoma: "",
      obs:"",
      arrayPrioridade: [],
      sector: null,
      sectorItems: [],
      equipment: [],
      equipmentText: "",
      equipmentsItems: [],
      equipamentos: [],
      layout: "",
      type: null,
      typeItems: [],
      material:[],
      materialItens: [],
      sintoma:"",
      arraySintoma: [],
      operacao: [],
      operacoes: [],
      qty_material: 0,
      arrayLayout: [],
      equipMaterial: [],
      estilo: {},
      priority: null,
      priorityItems: [
        { value: 1, text: 'Baixa' },
        { value: 2, text: 'Média' },
        { value: 3, text: 'Alta' },
      ],
      requiresStop: null,
      requiresStopItems: [
        { value: 'S', text: 'SIM' },
        { value: 'N', text: 'NÃO' },
      ],

      plannedStart: new Date().toISOString().substr(0, 10),
      plannedStartPicker: false,

      plannedEnd: new Date().toISOString().substr(0, 10),
      plannedEndPicker: false,

      scheduledStart: new Date().toISOString().substr(0, 10),
      scheduledStartPicker: false,

      scheduledEnd: new Date().toISOString().substr(0, 10),
      scheduledEndPicker: false,
      // -----------

      loadingPage: false,
      showAlert: false,
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Título é Obrigatório',
      ],
      orderNumber: null,
      orderNumberRules: [
        v => !!v || 'Número da Ordem é Obrigatório',
      ],

      abcCode: null,
      abcCodeRules: [
        v => !!v || 'Código ABC é Obrigatório',
      ],
      orderResponse: null,
      orderResponseRules: [
        v => !!v || 'Responsável pela Ordem é Obrigatório',
      ],
    

      checkbox: false,
      lazy: false,
    }),

    mounted() {
      this.getAllSector();
      this.getAllMaintenance();
      this.getAllEquipments();
      this.getCausa();
      this.getCt();
      this.getAllOpers();
      this.loadMaterial();
      this.loadEstilo();
      this.loadSintoma();
    },
    methods: {
      teste(){
        console.log("Lista -> ", this.equipmentsItems);
        console.log("Selecionado -> ", this.equipment);
      },

      deleteItem(item) {
        const index = this.equipMaterial.indexOf(item)
        this.equipMaterial.splice(index, 1);
      },
      verificaEstilo(){        
        var estilo = this.arrayLayout.filter(a => a.value == this.layout);
        estilo.forEach(element => {
           this.estilo = element.idestilo;
         });
          
         console.log("ESTILO: ", this.estilo);
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
      addEquip(equip,opera,material,qty_material_){
        console.log(equip);
        try{
          if(equip == "" || opera == "" || material == "" || qty_material_ == 0){
            alert("Por gentileza, informar todos os campos")
          }else{
            var equipamento = {
              id: equip.value,
              oper: opera.value,
              material: material.value,
              qtde: qty_material_
            }

            var objt = {
              equipamento: equip.text,
              material: material.text,
              operacao: opera.text,
              qtde: qty_material_
            }
            this.equipamentos.push(equipamento);
            this.equipMaterial.push(objt);
            alert("Adicionado com sucesso!")
            this.clearEquips();
          }
          console.log(this.equipamentos);
          }
        catch{
          alert("Ocorreu um erro inesperado, por gentileza entre em contato com o suporte.")
        }
      },

      clearEquips(){
        this.qty_material = 0,
        this.operacao = "",
        this.equipment = "",
        this.material = ""
      },

      
      loadMaterial() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetMATERIAL` }).then(res => {
          this.loadingPage = false;
           res.data.map(i => {
            this.materialItens.push({ value: i.ID, text: i.DESC });
           });
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },  

      validate() {
        if (this.$refs.form.validate()) {
            var operacoess = [];
            var equipamentoss = [];

            if(this.estilo == 1 || this.estilo == 3){
             this.operacao.forEach(element => {
                 var objt = {
                    id: element
                  }
                operacoess.push(objt)
              });
              if(this.estilo == 3){
                this.equipment.forEach(element => {
                    var objeto = {
                        id: element
                      }
                      equipamentoss.push(objeto);
                });
              }else{
                this.equipmentsItems.forEach(element => {
                  var objt = {
                    id: element.value
                  }
                  if(this.estilo == 1){
                    if(equipamentoss.length > 1){
                      alert("Layout corretivo/preventivo só aceita 1 equipamento.")
                    }
                    else{
                      equipamentoss.push(objt)
                      return; // quantidade de quipes certos, mas ainnda passa varias vezes aqui
                    }
                  }
                  else{
                    equipamentoss.push(objt)
                  } 
                 console.log("equipamentoss",equipamentoss)
              });
              }
            }

            if(this.estilo == 2){

              let tipo = this.typeItems.find(e => e.text == "Sem Tipo");
              this.type = tipo.value;

              console.log(this.arrayCausa);
              
              let c = this.arrayCausa.find(e => e.text == "Sem Causa");
              console.log(c);
              this.causa = c.value;

              let si = this.arraySintoma.find(e => e.text == "Sem Sintoma");
              this.sintoma = si.value;
        
              post({
              url: `${this.$host}:${this.$port}/AddOM`,
              body: {
                titulo: this.omtitulo,
                idsap: this.idsap,
                solicitante: "Sem solicitante",
                layout: this.layout,
                ct: this.ct,
                tipoManut: this.type,
                causa: this.causa,
                def: "Sem defeito",
                obs: "Sem observação",
                prior: this.priority,
                li: this.sector,
                sintoma: this.sintoma,
                requerParada:this.requiresStop,
                equips: this.equipamentos,
                opers: operacoess,
                dtFimPlan : new Date(this.plannedEnd),
                dtIniPlan: new Date(this.plannedStart),
                dtFimProg : new Date(this.scheduledEnd),
                dtIniProg: new Date(this.scheduledStart),
              },
            }).then(res => {
              this.loadingPage = false;
              this.reset();
            }).catch(err => {
              this.loadingPage = false;
              this.showAlert = true;
            });
          }
          else if(this.estilo == 3){
               let tipo = this.typeItems.find(e => e.text == "Sem Tipo");
              this.type = tipo.value;

              console.log(this.arrayCausa);
              
              let c = this.arrayCausa.find(e => e.text == "Sem Causa");
              console.log(c);
              this.causa = c.value;

              let si = this.arraySintoma.find(e => e.text == "Sem Sintoma");
              this.sintoma = si.value;
        
              post({
              url: `${this.$host}:${this.$port}/AddOM`,
              body: {
                titulo: this.omtitulo,
                idsap: this.idsap,
                solicitante: "Sem solicitante",
                layout: this.layout,
                ct: this.ct,
                tipoManut: this.type,
                causa: this.causa,
                def: "Sem defeito",
                obs: "Sem observação",
                prior: this.priority,
                li: this.sector,
                sintoma: this.sintoma,
                requerParada:this.requiresStop,
                equips: equipamentoss,
                opers: operacoess,
                dtFimPlan : new Date(this.plannedEnd),
                dtIniPlan: new Date(this.plannedStart),
                dtFimProg : new Date(this.scheduledEnd),
                dtIniProg: new Date(this.scheduledStart),
              },
            }).then(res => {
              this.loadingPage = false;
              this.reset();
            }).catch(err => {
              this.loadingPage = false;
              this.showAlert = true;
            });
          }
          else{
              post({
              url: `${this.$host}:${this.$port}/AddOM`,
              body: {
                titulo: this.omtitulo,
                idsap: this.idsap,
                solicitante: this.solicitante,
                layout: this.layout,
                ct: this.ct,
                tipoManut: this.type,
                causa:this.causa,
                def:this.def,
                obs: this.obs,
                prior: this.priority,
                li: this.sector,
                sintoma: this.sintoma,
                requerParada:this.requiresStop,
                equips: equipamentoss,
                opers: operacoess,
                dtFimPlan : new Date(this.plannedEnd),
                dtIniPlan: new Date(this.plannedStart),
                dtFimProg : new Date(this.scheduledEnd),
                dtIniProg: new Date(this.scheduledStart),
              },
            }).then(res => {
              this.loadingPage = false;
              this.reset();
            }).catch(err => {
              this.loadingPage = false;
              this.showAlert = true;
            });
          }
    
        }
      },

      reset() {
        this.$refs.form.reset()
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

      getAllEquipments() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetEQUIP` }).then(res => {
          res.data.map(i => {
            this.equipmentsItems.push({ value: i.ID, text: i.NOME });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },

     getAllOpers() {
        this.loadingPage = true;
        get({ url: `${this.$host}:${this.$port}/GetOPER` }).then(res => {
          res.data.map(i => {
            this.operacoes.push({ value: i.ID, text: i.DESC });
          });
          this.loadingPage = false;
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      },


      formatDate(date) {
        const [year, month, day] = date.split('-');

        return `${day}/${month}/${year}`;
      }
    },
  }
</script>

<style>

</style>