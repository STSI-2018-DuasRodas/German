<template>
  <div>
    <v-row justify="center">
      <!-- SOMENTE PARA OM DO TIPO ROTA -->
      <v-col cols="12" md="10" lg="12">
        <v-row align="center">
          <v-expansion-panels :popout="true" v-if="summary.ESTILO == 2">
            <v-expansion-panel>
              <v-expansion-panel-header>Equipamentos</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody v-for="item in equipsOpersExec" :key="item.EQUIPNOME">
                      <tr class="trTopo">
                        <th class="arrumandoBagunça">EQUIPAMENTO:</th>
                        <td class="arrumandoBagunça">{{ item.EQUIPNOME }}</td>
                        <th class="arrumandoBagunça">EQUIPAMENTO SUP:</th>
                        <td class="arrumandoBagunça">{{ item.EQUIP_SUP }}</td>
                        <th class="arrumandoBagunça">LI:</th>
                        <td class="arrumandoBagunça">{{ item.LI }}</td>
                        <th class="arrumandoBagunça">LOCAL:</th>
                        <td class="arrumandoBagunça">{{ item.LOCAL }}</td>
                      </tr>
                      <tr>
                        <th>Op.</th>
                        <th>Descrição da operação:</th>
                        <th>Material</th>
                        <th>Qtde</th>
                        <th>Un.</th>
                        <th>Observaçao</th>
                        <th v-if="item.DESC != null"> ações </th>
                        <th colspan="2">Executado</th>
                      </tr>
                      <tr>
                        <td>{{ item.OPER }}</td>
                        <td>{{ item.OPERDESC }}</td>
                        <td>{{ item.MAT_UTIL }}</td>
                        <td>{{ item.QTDE_MAT }}</td>
                        <td>{{ item.UN_MEDIDA }}</td>
                        <td v-if="item.DESC != null">{{ item.DESC }}</td>
                        <td v-if="item.DESC != null">
                           <v-btn
                            class="centralizar"
                            fab
                            dark
                            small
                            color="blue darken-2"
                            @click="openModalEditObs(item.IDEQUIP)"    
                          >
                           <v-icon>mdi-playlist-edit</v-icon>
                          </v-btn>
                          <v-btn
                            class="centralizar"
                            fab
                            dark
                            small
                            color="red darken-2"
                            @click="delObs()"    
                          >
                           <v-icon>mdi-delete</v-icon>
                          </v-btn>
                        </td>
                        <td v-if="item.DESC == null">
                          <v-btn
                            class="centralizar"
                            fab
                            dark
                            small
                            color="blue darken-2"
                            @click="openModalObs(item.IDEQUIP)"
                            
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </td>
                        <td colspan="2">
                          <v-checkbox
                            class="centralizar"
                            v-model="item.checkbox"
                            value="1"
                            type="checkbox"
                            required
                            @change="executaOper(item.checkbox,item.IDEQUIP,summary.ESTILO)"
                          ></v-checkbox>
                        </td>
                      </tr>
                      <br>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>

      <v-dialog v-model="dialog3" max-width="500px">
        <v-card>
          <v-card-title>Descreva sua observação:</v-card-title>
          <v-card-text>
            <v-text-field v-model="obsEquip" label="Ex: realizado procedimento..." required/>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" text @click="dialog3 = false">Cancelar</v-btn>

            <v-btn color="green" text @click="descOM(obsEquip,summary.ESTILO)">Concluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>


      <v-dialog v-model="dialog4" max-width="500px">
        <v-card>
          <v-card-title>Alterar observação:</v-card-title>
          <v-card-text>
            <v-text-field v-model="obsEquip" label="Ex: realizado procedimento..." required/>
          </v-card-text>

          <v-card-actions>
            <v-btn color="primary" text @click="dialog4 = false">Cancelar</v-btn>

            <v-btn color="green" text @click="editObs(obsEquip)">Concluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- SOMENTE PARA OM DO TIPO LISTA -->
      <v-col cols="12" md="10" lg="12">
        <v-row align="center">
          <v-expansion-panels :popout="true" v-if="summary.ESTILO == 3">
            <v-expansion-panel>
              <v-expansion-panel-header>Operações</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">ID SAP</th>
                        <th class="text-left">Descrição</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in descOpers" :key="item.oper">
                        <td>{{ item.IDSAP }}</td>
                        <td>{{ item.OPERDESC }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>

            <v-expansion-panel>
              <v-expansion-panel-header>Equipamentos</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Local de instalação</th>
                        <th class="text-left">Equipamento</th>
                        <th class="text-left">Equipamento Superior</th>
                        <th class="text-left">Local</th>
                        <th class="text-left"> Observação </th>
                        <th class="text-left">EXECUTADO</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in equipsExecutados" :key="item.IDEQUIP">
                        <td>{{ item.LI }}</td>
                        <td>{{ item.EQUIPNOME }}</td>
                        <td>{{ item.EQUIP_SUP }}</td>
                        <td>{{ item.LOCAL }}</td>
                        <td v-if="item.OBS != null">{{ item.OBS }}</td>
                        <td v-if="item.OBS == null">
                          <v-btn
                            class="centralizar"
                            fab
                            dark
                            small
                            color="blue darken-2"
                            @click="openModalObs(item.IDEQUIP)"
                            
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </td>
                        <td>
                          <v-checkbox :id="item.IDEQUIP" v-model="item.checkbox" value="1" type="checkbox" required @change="executaOper(item.checkbox,item.IDEQUIP,summary.ESTILO)"></v-checkbox>
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>

      <v-col cols="12" md="10" lg="6" v-if="summary.ESTILO == 3 || summary.ESTILO == 2">
        <v-card>
          <v-card-text>
            <div>
              <b>Titulo:</b>
              {{ summary.TITULO }}
            </div>
            <div>
              <b>ID SAP:</b>
              {{ summary.IDSAP }}
            </div>
            <div>
              <b>Defeito:</b>
              {{ summary.DEF }}
            </div>
            <div>
              <b>Tipo de manutenção:</b>
              {{ summary.TBTIPOMANNOME }}
            </div>
            <div>
              <b>Solicitante:</b>
              {{ summary.SOLIC }}
            </div>
            <div>
              <b>Código ABC:</b>
              {{ summary.PRIORIDADE }}
            </div>
            <div>
              <b>Descrição Geral:</b>
              {{ summary.OBS}}
            </div>
            <div>
              <b>Requer parada?</b>
              {{ summary.REQUERPARADA}}
            </div>
            <v-divider class="my-3"/>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" lg="6" v-if="summary.ESTILO == 3 || summary.ESTILO == 2">
        <v-card>
          <v-card-text>
            <div>
              <b>Data de geração: </b>
              <!-- {{ summary.DTGERACAO }} -->
              <span v-text="formatDate(summary.DTGERACAO)"></span>
            </div>
            <div>
              <b>Início Planejado: </b>
              <!-- {{ summary.DT_INI_PLAN }} -->
              <span v-text="formatDate(summary.DT_INI_PLAN)"></span>
            </div>
            <div>
              <b>Fim Planejado: </b>
              <!-- {{ summary.DT_FIM_PLAN }} -->
              <span v-text="formatDate(summary.DT_FIM_PLAN)"></span>
            </div>
            <div>
              <b>Início Programado: </b>
              <!-- {{ summary.DT_INI_PROG }} -->
              <span v-text="formatDate(summary.DT_INI_PROG)"></span>
            </div>
            <div>
              <b>Fim Programado: </b>
              <!-- {{ summary.DT_FIM_PROG }} -->
              <span v-text="formatDate(summary.DT_FIM_PROG)"></span>
            </div>
            <div>
              <b>Status da Ordem:</b>
              {{ status(summary.ESTADO) }}
            </div>
            <br>
            <v-divider class="my-3"/>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- SOMENTE PARA OM CORRETIVA/PREVENTIVA -->
      <v-col cols="12" md="10" lg="6" v-if="summary.ESTILO == 1">
        <v-card>
          <v-card-text>
           <div>
              <b>Titulo:</b>
              {{ summary.TITULO }}
            </div>
            <div>
              <b>ID SAP:</b>
              {{ summary.IDSAP }}
            </div>
            <div>
              <b>Defeito:</b>
              {{ summary.DEF }}
            </div>
            <div>
              <b>Tipo de manutenção:</b>
              {{ summary.TBTIPOMANNOME }}
            </div>
            <div>
              <b>Solicitante:</b>
              {{ summary.SOLIC }}
            </div>
            <div>
              <b>Código ABC:</b>
              {{ summary.PRIORIDADE }}
            </div>
            <div>
              <b>Descrição Geral:</b>
              {{ summary.OBS}}
            </div>
            <div>
              <b>Requer parada?</b>
              {{ summary.REQUERPARADA}}
            </div>

            <v-divider class="my-3"/>

            <div>
              <b>Data de geração: </b>
              <!-- {{ summary.DTGERACAO }} -->
              <span v-text="formatDate(summary.DTGERACAO)"></span>
            </div>
            <div>
              <b>Início Planejado: </b>
              <!-- {{ summary.DT_INI_PLAN }} -->
              <span v-text="formatDate(summary.DT_INI_PLAN)"></span>
            </div>
            <div>
              <b>Fim Planejado: </b>
              <!-- {{ summary.DT_FIM_PLAN }} -->
              <span v-text="formatDate(summary.DT_FIM_PLAN)"></span>
            </div>
            <div>
              <b>Início Programado: </b>
              <!-- {{ summary.DT_INI_PROG }} -->
              <span v-text="formatDate(summary.DT_INI_PROG)"></span>
            </div>
            <div>
              <b>Fim Programado: </b>
               <span v-text="formatDate(summary.DT_FIM_PROG)"></span>
              <!-- {{ summary.DT_FIM_PROG }} -->
            </div>
            <div>
              <b>Status da Ordem:</b>
              {{status(summary.ESTADO)}}
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="10" lg="6">
        <v-row align="center">
          <v-expansion-panels :popout="true" v-if="summary.ESTILO == 1">
            <v-expansion-panel>
              <v-expansion-panel-header>{{equipCorretiva[0].EQUIPNOME}}</v-expansion-panel-header>
              <v-expansion-panel-content>
                <table>
                  <th></th>
                  <tr>
                    <td>
                      <b>
                        <h4>Local de instalação:</h4>
                      </b>
                    </td>
                    <td>
                      <b>
                        <h4>{{equipCorretiva[0].LI}}</h4>
                      </b>
                    </td>
                    <td>
                      <b>
                        <h4>/</h4>
                      </b>
                    </td>
                    <td>
                      <b>
                        <h4>{{equipCorretiva[0].LOCAL}}</h4>
                      </b>
                    </td>
                  </tr>
                  <tr>
                    <td>Equipamento Super.:</td>
                    <td>{{equipCorretiva[0].EQUIP_SUP}}</td>
                  </tr>
                </table>

                <v-btn
                  class="btnEquips"
                  fab
                  dark
                  small
                  color="blue darken-2"
                  @click="dialog2 = !dialog2"
                >
                  <v-icon>mdi-clock-time-ten-outline</v-icon>
                </v-btn>
                <br>
                <br>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Manutentor</th>
                        <th class="text-left">Descrição</th>
                        <th class="text-left">Tempo</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in descEquips" :key="item.ID">
                        <td>{{ item.NOME }}</td>
                        <td>{{ item.DESC }}</td>
                        <td>{{ item.TEMPO_UTIL}}</td>
                      </tr>
                    </tbody>
                    <p v-for="tempo in tempoTotal" :key="tempo.value"><b>Tempo Total: {{tempo.value}}</b></p>
    
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-header>Operações</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Operação</th>
                        <th class="text-left">Id SAP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in descOpers" :key="item.IDSAP">
                        <td>{{ item.OPERDESC }}</td>
                        <td>{{ item.IDSAP }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-row>
      </v-col>
    </v-row>

    <template>
      <div>
        <v-row justify="center">
          <v-dialog v-model="dialog2" max-width="500px">
            <v-card>
              <v-card-title>Descreva sua operação:</v-card-title>
              <v-card-text>
                <v-text-field v-model="descApont" label="Ex: troca de oleo na maquina..." required/>
                <v-menu
                  v-model="datetimeApontPicker"
                  :close-on-content-click="false"
                  max-width="290"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      :value="datetimeApont"
                      clearable
                      label="Aponte o horário"
                      readonly
                      v-on="on"
                    />
                  </template>
                  <v-time-picker
                    v-model="datetimeApont"
                    class="mt-4"
                    format="24hr"
                    @change="datetimeApontPicker = false"
                  ></v-time-picker>
                </v-menu>
              </v-card-text>

              <v-card-actions>
                <v-btn color="primary" text @click="dialog2 = false">Cancelar</v-btn>

                <v-btn color="green" text @click="operDesc(descApont,datetimeApont)">Concluir</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </div>
    </template>
    <!-- -------------------------- -->

    <v-speed-dial
      v-model="fab"
      fab
      dark
      fixed
      right
      class="speedDial"
      direction="left"
      transition="slide-y-reverse-transition"
    >
      <v-icon dark>mdi-close</v-icon>
      <template v-slot:activator>
        <v-btn v-model="fab" color="red darken-3" dark fab>
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-btn fab dark small color="red"
      @click="reproveOM()"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-btn
        v-if="cargoBtn"
        v-on:click="isHidden = !isHidden"
        @click="dialog1 = !dialog1"
        fab
        dark
        small
        color="indigo"
      >
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>

      <v-btn fab dark small color="green" @click="assinarOM()">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-dialog v-model="dialog1" max-width="500px">
      <v-card>
        <v-card-title>Selecione o manutentor para ser convidado:</v-card-title>
        <v-card-text>
          <v-select
            v-model="manutentor"
            :items="selectAllManutentor"
            label="Lista dos Manutentores"
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="dialog1 = false">Cancelar</v-btn>

          <v-btn color="green" text @click="InviteOM()">Concluir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-overlay :value="loadingPage">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { get, post, patch } from "../../utils/http.js";
import moment from 'moment'

export default {
  name: "summary",
  data() {
    return {
      equipCorretiva: "",
      obsEquip: "",
      checkbox: null,
      descApont: "",
      cargoBtn: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dialog4: false,
      isHidden: false,
      manutentor: 0,
      selectAllManutentor: [],
      fab: false,
      loadingPage: false,
      summary: {},
      dialogSendOrder: false,
      datetimeApont: "",
      datetimeApontPicker: false,
      equipsOpersExec: [],
      descEdited: [],
      idDesc: 0,
      tempoTotal: [],


      equipId: null,
      descEquips: [],
      equipsExecutados: [],

      descOpers: []
    };
  },

  mounted() {
    this.getSummary();
    this.getAllManutentor();
    this.verificaCargoBtn();
    this.equipsWOM();
    this.descWOM();
    this.GetOperWOM();
    this.GetEquipWOMROTA();
     this.getTempoTotal();
  },

  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY, HH:mm:ss ');
    },
    getTempoTotal(){
       post({
        url: `${this.$host}:${this.$port}/GetTempo`,
        body: {
          idOm: this.$route.params.id //id da om
        }
      })
        .then(res => {
          res.data.map(i => {
             this.tempoTotal.push({ value: i.TEMPO});
          });
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao somar tempo total dos apontamentos");
        });

    },

    openModalEditObs(equipid){
      this.equipId = equipid;
      this.dialog4 = !this.dialog4;
    },
   
   delObs(){
      post({
        url: `${this.$host}:${this.$port}/GetDescOMROTA`,
        body: {
          idOm: this.$route.params.id, //id da om
        }
      })
        .then(res => {
            res.data.map(i => {
             this.idDesc =  i.ID;
            });
            patch({
              url: `${this.$host}:${this.$port}/DelDescOMRota`,
              body: {
                id: this.idDesc
              }
            })
              .then(res => {
                 window.location.reload();
              })
              .catch(err => {
                alert("Ocorreu um erro ao editar observação " + err);
              }); 
        })
        .catch(err => {
          alert("Ocorreu um erro ao editar observação " + err);
        });

   },
   editObs(obs){
     var idUser = localStorage.getItem("userId");
    
      post({
        url: `${this.$host}:${this.$port}/GetDescOMROTA`,
        body: {
          idOm: this.$route.params.id, //id da om
        }
      })
        .then(res => {
            res.data.map(i => {
             this.idDesc =  i.ID; 
            });
            post({
              url: `${this.$host}:${this.$port}/UpdateDescOMRota`,
              body: {
                idUser: idUser,
                desc: obs,
                id: this.idDesc,
                idOm: this.$route.params.id, //id da om
              }
            })
            .then(res => {
              window.location.reload();
            })
            .catch(err => {
              alert("Ocorreu um erro ao editar observação " + err);
            }); 
        })
        .catch(err => {
          alert("Ocorreu um erro ao editar observação " + err);
        });     
    },

    openModalObs(equipid){
      this.equipId = equipid;

      this.dialog3 = !this.dialog3;
    },

     executaOper(checked, equip, tipoOm){
       if(tipoOm != 3 && tipoOm != 2){
         alert("Somente ordens de manutenção do tipo lista e rota podem executar uma ação em equipamentos.");
         return;
       }
      let executado = 0;
      if(checked != null){
        executado = 1;
      }
      post({
        url: `${this.$host}:${this.$port}/ExecutaOper`,
        body: {
          idOm: this.$route.params.id, //id da om
          idEquip: equip,
          tipoOm: tipoOm,
          realizada: executado
        }
      })
        .then(res => {
        
        })
        .catch(err => {
          alert("Ocorreu um erro ao executar ação. " + err);
        });
      },

    status(id_status){

      if(id_status == 1){
        return "NOVA(SEM ATRIBUIÇÃO)";
      }else if(id_status == 2){
        return "ATRIBUÍDA AO MANUTENTOR";
      }else if(id_status == 3){
        return "ATRIBUÍDA AO LÍDER DO SETOR PARA APROVAÇÃO ";
      }else if(id_status == 4){
        return "ATRIBUÍDA AO ADM";
      }else if(id_status == 5){
        return "OM FINALIZADA";
      }
    },

    reproveOM(){
      var idUser = localStorage.getItem("userId");
       post({
        url: `${this.$host}:${this.$port}/ReproveOM`,
        body: {
          idOm: this.$route.params.id, //id da om
          idUser: idUser
        }
      })
        .then(res => {
          alert("Ordem desatribuída.");
          this.$router.push(`/order`);
        })
        .catch(err => {
          alert("Ocorreu um erro ao desatribuir a ordem de manuntenção. " + err);
        });
    },


    // delegarOM(){
    //   var idUser = localStorage.getItem("userId");
    //    post({
    //     url: `${this.$host}:${this.$port}/DelegateOM`,
    //     body: {
    //       idOm: this.$route.params.id, //id da om
    //       idUser: this.manutentor ,
    //       idAdm: idUser,
    //     }
    //   })
    //     .then(res => {
    //       alert("Assinatura delegada com sucesso.")
    //     })
    //     .catch(err => {
    //       alert(err + "Ocorreu um erro ao delegar a om.");
    //     });
    // },

    assinarOM(){
        var idUser = localStorage.getItem("userId");
        post({
        url: `${this.$host}:${this.$port}/EndOM`,
        body: {
          idOm: this.$route.params.id, //id da om
          idUser: idUser,
        }
      })
        .then(res => {
          alert("Assinatura atribuida com sucesso.")
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao assinar a om.");
        });
    },
   
    descOM(desc, estilo) {
      var idUser = localStorage.getItem("userId");
      if(estilo == 2){
        post({
        url: `${this.$host}:${this.$port}/DescOMRota`,
        body: {
          idOm: this.$route.params.id, //id da om
          idUser: idUser,
          desc: desc,
          idequip: this.equipId
        }
      })
        .then(res => {
          this.descOpers = res.data;
          window.location.reload();
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao inserir observação.");
        });
      }else{
        post({
        url: `${this.$host}:${this.$port}/EditObsEquipLista `,
        body: {
          idOm: this.$route.params.id, //id da om
          obs: desc,
          idEquip: this.equipId
        }
      })
        .then(res => {
          this.descOpers = res.data;
          window.location.reload();
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao inserir observação.");
        });
      }
    },

    GetOperWOM() {
      post({
        url: `${this.$host}:${this.$port}/GetOperWOM`,
        body: {
          idom: this.$route.params.id //id da om
        }
      })
        .then(res => {
          this.descOpers = res.data;
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao listar operações.");
        });
    },

    operDesc(desc, time) {
      var idUser = localStorage.getItem("userId");
      post({
        url: `${this.$host}:${this.$port}/DescOM`,
        body: {
          idOm: this.$route.params.id, //id da om
          idUser: idUser,
          desc: desc,
          time: time
        }
      })
        .then(res => {
          alert("Operação Salva com sucesso.");
          this.dialog2 = false;
          window.location.reload();
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao salvar operação.");
        });
    },

    descWOM() {
      post({
        url: `${this.$host}:${this.$port}/GetDescOM`,
        body: {
          idOm: this.$route.params.id //id da om
        }
      })
        .then(res => {
          res.data.map(i => {
            this.descEquips.push({
              NOME: i.NOME,
              DESC: i.DESC,
              TEMPO_UTIL: i.TEMPO_UTIL
            });
          });
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao aceitar essa Ordem de manutenção");
        });
    },

    equipsWOM() {
      post({
        url: `${this.$host}:${this.$port}/GetEquipWOM`,
        body: {
          idom: this.$route.params.id //id da om
        }
      })
        .then(res => {
          this.equipCorretiva = res.data;
          this.equipsExecutados = res.data;

          console.log("GETEQUIP", res.data);
        })
        .catch(err => {
          alert(err);
        });
    },

    GetEquipWOMROTA() {
      post({
        url: `${this.$host}:${this.$port}/GetEquipWOMROTA`,
        body: {
          idom: this.$route.params.id //id da om
        }
      })
        .then(res => {
          this.equipsOpersExec = res.data;
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao aceitar essa Ordem de manutenção");
        });
    },

    InviteOM() {
      var idUser = localStorage.getItem("userId");
      idUser = parseInt(idUser);
      post({
        url: `${this.$host}:${this.$port}/InviteOMUser`,
        body: {
          idUser: this.manutentor,
          idOm: this.$route.params.id,
          idAdm: idUser
        }
      })
        .then(res => {
          alert("Convite feito com sucesso.");
        })
        .catch(err => {
          alert(err + "Ocorreu um erro ao aceitar essa Ordem de manutenção");
        });
    },
    verificaCargoBtn() {
      let cargo = localStorage.getItem("cargoId");
      if (cargo == 1) {
        this.cargoBtn = true;
      }
    },
    async getAllManutentor() {
      const idUser = localStorage.getItem("userId");

      post({
        url: `${this.$host}:${this.$port}/GetManuts`,
        body: {
          idUser: idUser
        }
      })
        .then(res => {
          res.data.map(i => {
            this.selectAllManutentor.push({ value: i.ID, text: i.NOME });
          });
        })
        .catch(err => {
          alert(err);
        });
    },
    getSummary() {
      this.loadingPage = true;
      post({
        url: `${this.$host}:${this.$port}/GetOMFiltrada`,
        body: {
          id: this.$route.params.id
        }
      })
        .then(res => {
          this.summary = res.data[0];
          this.loadingPage = false;
        })
        .catch(err => {
          this.loadingPage = false;
        });
    },

    getPriority(priority) {
      if (priority === 1) return "Baixa";
      if (priority === 2) return "Média";
      if (priority === 3) return "Alta";
    }
  }
};
</script>

<style>
.speedDial {
  bottom: 75px;
}

.btnEquips {
  float: right;
}
.arrumandoBagunça {
  border: none !important;
}
.trTopo {
  border-radius: 10px !important;
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
}
.trTopo:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.3) !important;
}
.bodyTable {
  border: rgb(58, 57, 57) solid 0.3px !important;
}

.centralizar {
  margin-left: 20px;
}
</style>
