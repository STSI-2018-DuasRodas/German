<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="white"
            flat
          >
            </v-toolbar>
            <v-img
              src="https://yata.ostr.locaweb.com.br/32e1e388b30748cfd0a583bf38784957f3590577d09ae0cdbb703b4ecfdb4fcd"
              aspect-ratio="3"
              contain
            />
          
          <v-card-text>
            <v-form ref="form">
              <v-text-field
                label="Usuário"
                v-model="user"
                prepend-icon="mdi-account"
                :rules="[v => !!v || 'Usuário é Obrigatório']"
                type="text"
              />

              <v-text-field
                id="password"
                label="Senha"
                v-model="password"
                prepend-icon="mdi-account-lock"
                :rules="[v => !!v || 'Senha é Obrigatória']"
                type="password"
              />
            </v-form>
            <small class="red--text" v-if="hasValidateError">Usuário ou Senha estão incorretos!</small>
          </v-card-text>
          <v-card-actions>
            <v-btn
              dark
              block
              color="red darken-3"
              :loading="isLoading"
              @click="login()"
              class="my-1"
            >
              Entrar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import { post } from '../utils/http.js';

  export default {
    props: {
      source: String,
    },

    data: () => ({
      user: '',
      password: '',
      hasValidateError: false,
      isLoading: false,
    }),

    mounted() {
      
    },

    methods: {
     login() {             
         this.hasValidateError = false;
         if (this.$refs.form.validate()) {
           this.isLoading = true;
            post({
             url: `${this.$host}:${this.$port}/logon`,
             body: {
               userName: this.user,
               password: this.password,
             },
           }).then(res => {
             this.isLoading = false;

            if(this.setLocalStorage(res.data.token,res.data.id,res.data.cargoId,res.data.cargoNome));
              this.redirect();

           }).catch(err => {
             this.isLoading = false;
             this.hasValidateError = true;
           });
         }
      },
      redirect(){
          if (localStorage.getItem('token')) this.$router.push('/order');
      },

    setLocalStorage(token,id,cargoId,cargoNome){
       try{
           localStorage.setItem('token', token);
           localStorage.setItem('userId', id);
           localStorage.setItem('cargoId', cargoId);
           localStorage.setItem('cargoNome', cargoNome);
          return true;
       }
       catch{
         return false;
       }
        
      }
    }
  }
</script>