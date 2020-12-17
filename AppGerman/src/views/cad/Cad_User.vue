<template>
  <div>
    <v-toolbar-title>Cadastro de Usuário</v-toolbar-title>
    <v-form
      ref="form"
      v-model="valid"
      :lazy-validation="lazy"
    >
     <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Nome"
        required
      />
      <!-- <v-text-field
        v-model="lastName"
        :rules="lastNameRules"
        label="Sobrenome"
        required
      />
      <v-text-field
        v-model="cpf"
        :rules="cpfRules"
        label="CPF"
        type="number"
        required
      /> -->
      <!-- <v-select
        v-model="sector"
        :items="sectorItems"
        :rules="[v => !!v || 'Setor é Obrigatório']"
        label="Setor"
        required
      /> -->
        <!-- <v-select
        v-model="center"
        :items="centerItems"
        :rules="[v => !!v || 'Centro de trab. é Obrigatório']"
        label="Centro de trabalho"
        required
      /> -->
      <v-select
        v-model="userClaim"
        :items="userClaimItems"
        :rules="[v => !!v || 'Cargo é Obrigatório']"
        label="Cargo"
        required
      />
     <v-text-field
        v-model="name_tag"
        :rules="name_tagRules"
        label="Número do Crachá"
        type="number"
        required
      /> 
      <v-text-field
        v-model="userName"
        :rules="userNameRules"
        label="Usuário"
        required
      />
      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Senha"
        type="password"
        required
      />
     
      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="newUser()"
      >
        Cadastrar
      </v-btn>
    </v-form>
    <span class="success--text">{{ successMessage }}</span>
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

export default {
  data: () => ({
    valid: true,
    lazy: false,
    loadingPage: false,
    showAlert: false,
    successMessage: '',
    sectorItems: [],
    userName: '',
    userNameRules: [
      v => !!v || 'Usuário é Obrigatório',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Senha é Obrigatório',
    ],
    name: '',
    nameRules: [
      v => !!v || 'Nome é Obrigatório',
    ],
    lastName: '',
    lastNameRules: [
      v => !!v || 'Sobrenome é Obrigatório',
    ],
    cpf: '',
    cpfRules: [
      v => !!v || 'CPF é Obrigatório',
      v => v.length < 14 || 'Máximo de 14 números',
    ],
    name_tag: '',
    name_tagRules: [
      v => !!v || 'Número do Crachá é Obrigatório',
    ],
    sector: null,
    userClaim: null,
    userClaimItems: [
      { value: 1, text: 'Manutentor' },
      { value: 2, text: 'Lider' },
      { value: 3, text: 'Administrador' },
    ]
  }),

  mounted() {
    this.getAllSector();
  },

  methods: {
    // getAllSector() {
    //   this.loadingPage = true;
    //   get({ url: `${this.$host}:${this.$port}/GetSETOR` }).then(res => {
    //     res.data.map(i => {
    //       this.sectorItems.push({ value: i.ID, text: i.NOME });
    //     });
    //     this.loadingPage = false;
    //   }).catch(err => {
    //     this.loadingPage = false;
    //     this.showAlert = true;
    //   });
    // },

  loadValues() {
  this.loadingPage = true;
  get({url: `${this.$host}:${this.$port}/GetUSUARIO` }).then(res => {
    this.loadingPage = false;
    this.sectorItems = res.data;
  }).catch(err => {
    this.loadingPage = false;
    this.showAlert = true;
  });
},

    newUser() {
      this.successMessage = '';
      if (this.$refs.form.validate()) {
 
        post({
          url: `${this.$host}:${this.$port}/AddUser`,
          body: {
            idsap: this.name_tag,
            name: this.name,           
            login: this.userName,
            password: this.password,           
            cdct: 1,  
            cargo: this.userClaim,
          },
        }).then(res => {
          this.loadingPage = false;
          this.reset();
          this.successMessage = 'Usuário Criado com Sucesso!';
        }).catch(err => {
          this.loadingPage = false;
          this.showAlert = true;
        });
      }
    },

    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>

<style>

</style>