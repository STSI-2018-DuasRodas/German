<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer" v-if="!isLoginPage">
      <v-list-item>
        <v-list-item-avatar>
          <v-img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEXBCif///+8AAD9+fn98/bCEizBAyXAAB/AACK/ABq+ABG+AAy/ABa/ABy+AArAAB712t7WgIfjqK7y09f34uX99ffvyM3OTV356uzJOErrusDUanfps7rMSFjTZnLz19vRXmvciJLEGTPvyc7Xc3/fkpvhl6DGKz/mrbPQV2XkpKzJMUfYe4bKQFHFIznWcX0kLtrTAAANgUlEQVR4nO1d6XqyvBaFoAFCCLbihEOVOmvt/d/dATKQoH0B20/gPFm/qljJIjt7yt7RMDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP6/AZrBCwmazeB1FIHVCEFLM9QMNUPNUDPUDFvJsPcSV6bXJMM+/M9vBvstZQidBH/Bv40MoY8ACG6z2SUmgGDndzdrHUPoIrg6DvknptH+CyH7FzdrGUMHGdvPog7sHZfYffpm7WKI4v30oaIfrrxn57FNDB2w6T3kl3Fckudu1iKG6Db4kV+KM3hK57SGIfS2OZlRtJ9/3eLD5O1dYh3Gz6zG1jD0zoLeYk0I9lN7aLsIxNcPfqU3wfVv1haGYMGHsY9JoIwQgyunaK3rU2wJQ3DkJNZ3qw2iXFKtSW1BbQdDssuXoFNkSPaSurHiuuqmFQzdtcRhgFUbGXzR95kYh6ims9oGhk5MzfyUvh15ygADevEMNvR/3muOsw0MCZ2e0YFplJ1s29kKDT0ImCifgp++9yFawNBmYrjGgFmMVa4xuQDPEqcNjLM/P+rp0xYwBEMmhonVHzM+fJocNrxdKrnQpQK7raVPm2doT+giTDWIY4T0hcE0Joiy10OqfdwV00V1btY8Q0ZilU1MMLNkSnhOhzZjgYVHI6tJnTijcYYwzl6E7O74RK8c09eOQT+4QewfA3o1qhNmNM7QpQr0yiWPbOiljQchUy2f+cgAdW/qDLVxhiQTUit3wbkDt3aMNzowmLsxeFNbTJtm6DiZfvzMrTx0qW61Qhbuf0uKxbllb+1r6JqmGdpUtWxkFrGSyVBdHJBdG9dYiE0z9KnuUPwU/0siOFVdbSrU0xpjbZohziJ7a6bS2OQMQ6h42ihze6wOSSna0IlSaDAdSnECslpxM+1jxdUDjMYZZsHfVM5I2cQeSQzD3ZJ4Pr/oUx/gUD1KbBtDiMEkkglml49rQlzquHWP4U6W0sCDm9B8iOjaR9jhDkKHpBRnI7YuyZw42D1Fj+lRDHdfDg2wLL/8JhxNM2Tx38T2weGn6ZMQnjPfe9Qha8HC3ytYR/LW94Ab/fftuLgqTcVTLUXTDJ1+xmWgTF+0xJDK69zDnrFeFLczzqj8JhxNM4SguJkWbjCxDbo+RwSmG6YeuOyVPY11h9YhZNECw2hxAlnwSy37iOcrHAQOb2MxlZ2KD51Zvv4G15gwB6bA0EhVLYhXVHbHnYoPeSLKtBZLnO/Z3zNMB8tix3kNIW0BQ+alhADd+58Fhiz9PbXrpL2bZ8hCPvOq6MeHDBGd7l3Hcm18Eq2ZHCM+YgjoFs20XplRCxgahE5NKO86PWCIWPr72rmct2HP6KuhtHV4zxDRzHEtfyZFGxgaNAw2zY9ACOodQ4/NoJx5q4RWMOS7T2b4xdVN0eKLxEbtTeB2MOQZRNPaEGrrFIbQu/G8xrWGR0rRDoaG43K/c3ACaTQvMXQ8vOfxBd1adEiHMsJc8Tuu8MAH24STRxkiF6HbOffr0h0LiG7DU3Wvpi0Mk5l6FzzM8W6ZZTdGs9W7Wii1cl0nMYuhX9kmtoZh4nR+P4h1i5iSVRZK7iuvx/YwNAx8+2eahoKHyrOqS7FNDBNJXd4VlzLs9oU3hlVjxFYxTNwbcFjcy+rgjSBS5F41hGoZw9QS4NU5FNH8aDrezQBOi2sV5h+rqt5p6xjSQvZ4ufq+Xrfz9cUHaVgcgG9Zpw7mqLJr00KG2bAc303g25kT6oCTzG/0Lcq+ISy1Gi1lqMD5GhaWYGIqoI09hF3fdzHy8D+i/k4wXBZVT4y9/mQXDdNKuFH4Gb0tofdTLVgXGBpe0VR8rMaFmv5wscaPdU8nGMKA2fl/bmyEbw/VTycYGi7d7d+JWunHmM4flPN3g2FWGhbOiGM8bjgRGN7uRLUjDKExeneDxDuXJrE3OO7eEuyiMA+vrHnRm+sIQ8M5IGg4gXDNR9EqBh5ObCbGhFykZqm9p35nVxga6SYU5nZxtLt5coTouN5B2Mx3dRY7wzANILljEwJU1CiBtMGjVoJ3iCHJq2yud4sNy26dUijeLMNRDYZK20Wxd4ZdnDJVKwcezTKsUdvES9rpv/YuSojPezJON0qxd8uluBmGIvyrzBDSKk1zAOn/hoG0EqEXsgXo31jPRi6nsD9qgKHwvirXNtGKPXNqYKZSPqW1RlhPRsIAs92NlXDgYMxv1nshQ6HZlxXzSQ4b5sk10Df98yzGywX4K/0yj/adhGIlOgd+s/B1DIkw3KuKyRbWnZjVt3OVc2WltaxgJTH16SvIsufim20Rew1fxxCJbsqK5cwQZ6I5MrJly/oX+CYN8+Q+aGkfn1FBh23AmjVL/H8HLJrx1BLnH0F3MXgaGLJ13LulYolpm4noyeBrgNcW54+zTp3RLxGIbryPaoLDBs0b85yYKtSBnfiqfdaTIZ6Vv1LEI18Smyd6bJ8E7PObVuucYF0nUa5bWN9JBMB9TwYzRgP2Tq64a7Xa/BL5gW2XKuaCzYqUA0aske8zZOOX6909ujBpGg5ica/gvz9IRSA3F5Ukh61bmQUQqyvDVv4a9kBo/T9rJDJfag6TKRA7aZUKuKjPPVAsi1LtrmpJtgjow5Nu9TpVKqsaq4p+I5kofqo0sJTQKBSg4GwhUs2bL8N6hUa/RO5JmesKPa801XZU+4MNaQ4/1AwUDaUW6edzj4a6PC8DFuckVDBSEE7zOWGwwUReh/sLQHnem1aHZaKbF3dOyzcA/hJIBHvTctmB1C3L/R+Iva9F4byw6fsEey6dSvQp1h0Qj7Kic/FXsPMZKBdTNod8tgMvfnt4Csoo+j4gbMtzKFWvfj9/iM8zgLZQAIvyZ4tDIXUQo9Ndx0kO62OzRB7VTEcky8ro9svzpuoi9xZ75VEwFbUhSlZfv7xlITxTTZ3oTuiIT7/UVqSQxLS81pA6KdO0YUhefSJTcJZtY/69ruHnx1G8WEgN2U6FpWKKaWhxllP6VrQE14zvdJJ4p6u7jgVz5vC6zvRpuC/VpNmoN2IopQVO9qQ4+nDTJzaT3izYDzwy2YfyDI+IOK0h/dBrNWkKaIvhlMfeWJmgUXRCWcsCTRG/Mx1rIzK7fopPJopJ8uxqNLv9GYg4dKc8rCHShszgLeYnm6kMjbRjgcS8w+bblaawVv/CX0Hyp0on0eYBgrWYeXnLwh1DI83TELpcgSG141TNeP0tpCz9ukzRMb10JkSWtkcM+Zb40ZMUaeUCqr9FngQzP3CJpnO3jz73iCFrfzcvdu771j3S5s+AcikqtYmITuJemYxHDFlPxgJhcUKYOXxl3CQjyI1Ar6wNhh3cYq5kOg8YAhrwjg62k+vfpqYwT3yaFU5/4imzicTnniE/TOoNSfvhjShSCmcmRlFaL8rPkrBOue0uMoT8VLQxcSUnYdaALeQgeT4pLIuEeQbRvAJxUJ/K0MbMxPb6tp97eOdmFCkFRHkgtC8biDg6MrKZ5lAYQnLhUeMsyM/wM3veyz1SGVg68HJZ5p7yRWaOrtTsSwwdBLk8WBPMMv0ZVi8PKlR4ucUISxMpgqI53dwIthlDEiA0Ey0Lowl2brlovDh5cQ/7kscDi1KdR+bi06PP64RupL3H611u3MMLloImZb+7IaD8UEhzW5p3wxc5Q9Oje25y4BE5gZIP3zZl7CVID9y8lJpmG0tP5A69VaJWkLQIo+ZMYQ6+PZYtr36pTEHU/6lA0dqBRKu40glF02b1KAee50P6LHPBjbTq+3Z+UKIYbuxUyO2bdG3ZmLumQjJe5rGKeXY8Z30cSCmL3sd+QsN+0eeXYvO6Td9/A9qS+thV2zP1Pfcw2e6PUfS+m3/F4mB6eUsqagvBRLIO0nzMqxowx07L9D2E/fw3FOT608Gf/LTCHwHLx+yunn700JPsxOjWSObiJ8jnl1nrZykqxX31T43+byFrG+v0nJkGMsFr095aEVBKaSRa/plZBLIvsGsyZHoMx5f9sVP9lm0i1y6c2+DLFOH05V2lyhqV/zeWPZ1yH74RBDfZhX6rJWaOq5ZmtMhOyAgO8tbnHlQfZhDIIj6u4Po1BP8iU4wq//AKnsl+6rjuufSvhHuRhzo4VLIa0JNc99RXazHBhOJBpthbV1iMjqJEzUVb1yBHoB6xuy/9bRk3Vpq8zzVWb0OwDaWS5NP4p6RCcFIKM1po6O/hYKXuwJqTn6fR99/lz5rbdtrBIlTvJFEd8Q/TCMlEEenRpG2+6I/I86JU4Vwf2g3cVycwzSN2Bp66uszh153GscFWTdZEsFXxYBnc24epjj/2ZI42WRZK23bP/aJXc3CAKoKmebyIs5N8b1mogupNuqBECwDzQoGeFS1J4nGmtXvFc07GT/1eWePAh7vDaj7e+iC+r93b3LWUdgQOuha5JErn7p1w1p6sYW2g+J5QETvQKR1ahAOuP//oYzals85Y+Z+A4+PP/Hrbp3+8s0VwSPF4GoFzv0NezL9gk9OjyvXo1u5YtxZ8MC9yHM+65sSUwCUryTpa0Ve3NehD+N7XkerV6f5Q5/DLDsFGxnxsRmunqy5MBUCfAPLKRkkNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDY1O4X9atszPZTsdOgAAAABJRU5ErkJggg=="
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense>
        <v-list-item v-for="item in menu" :key="item.title" link :to="item.to">
          <v-list-group
        value="true"
        v-if="item.submenu"
      >
        <template v-slot:activator>
          <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </template>
        <v-list-item 
            v-for="subitem in item.submenu"
            :key="subitem.title"
            link
            :to="subitem.to"
            >
          <template>
            
          <v-list-item-icon>
              <v-icon>{{ subitem.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ subitem.title }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>

          </v-list-group>
        <v-list-item v-else>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        </v-list-item>
      </v-list>
      
    </v-navigation-drawer>

    <v-app-bar app dark color="red darken-3" v-if="!isLoginPage">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <div class="flex-grow-1" />

      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Meu Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title @click="logout()">Sair</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-if="isListPage" v-slot:extension>
        <v-tabs fixed-tabs v-model="tab" background-color="transparent">
          <v-tabs-slider color="white" />
          <v-tab
            v-for="tab in tabs"
            :key="tab.id"
            @click="changeFilterStatus(tab.id)"
          >
            {{ tab.title }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-content>
      <v-container fluid v-bind:class="[isLoginPage ? 'fill-height' : '']">
        <router-view />
        <filter-menu
          :dialog="getShowFilterPage"
          v-on:closeMenu="closeModal($event)"
          v-on:saveValues="applyFilters($event)"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import filterMenu from "./components/FilterMenu";

export default {
  components: {
    filterMenu,
  },

  name: "App",

  watch: {
    inputSearch(newValue) {
      this.$store.commit("SET_SEARCH_FILTER", newValue);
    },
  },

  computed: {
    getShowFilterPage() {
      return this.showFilterPage;
    },

    isListPage() {
      return this.$route.name === "Listagem";
    },

    isLoginPage() {
      return this.$route.name === "Login";
    },
  },

  methods: {
    closeModal($event) {
      this.showFilterPage = false;
    },

    applyFilters($event) {
      this.showFilterPage = false;
    },

    changeFilterStatus(status) {
      this.$store.commit("SET_FILTER_STATUS", status);
    },

    findvalue() {
      if (this.inputSearch === "") {
        this.showSearchInput = !this.showSearchInput;
        setTimeout(() => {
          this.$refs.inputSearch.focus();
        }, 100);
      }
    },

    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem('userId');
      localStorage.removeItem('cargoId');
      localStorage.removeItem('cargoNome');
      this.$router.push("/login");
    },
  },

  data() {
    return {
      showSearchInput: true,
      tab: null,
      inputSearch: "",
      showFilterPage: false,
      tabs: [
        {
          id: 0,
          title: "Todos",
        },
        {
          id: 2,
          title: "Em Andamento",
        },
        {
          id: 3,
          title: "Em Análise",
        },
      ],
      drawer: null,
      menu: [
        { title: "Dashboard", icon: "mdi-view-dashboard" },
        {
          title: "Ordens de Manutenção",
          icon: "mdi-clipboard-text-multiple",
          to: "/order",
        },
        {
          title: "Cadastros",
          icon: "mdi-message-draw",
          class: "sm-hide md-block",
          submenu: [
            {
              title: "Usuários",
              icon: "mdi-account-multiple-plus",
              to: "/user",
            },
            {
              title: "Causa do defeito",
              icon: "mdi-bandage",
              class: "sm-hide md-block",
              to: "/defect",
            },
            {
              title: "Local de instalação",
              icon: "mdi-home-city",
              class: "sm-hide md-block",
              to: "/local-install",
            },
            {
              title: "Tipo de Manutenção",
              icon: "mdi-file-cog",
              class: "sm-hide md-block",
              to: "/maintenance",
            },
            {
              title: "Equipamentos",
              icon: "mdi-tools",
              class: "sm-hide md-block",
              to: "/equipments",
            },
            {
              title: "Ordem de Manutenção",
              icon: "mdi-clipboard-text",
              class: "Testando",
              to: "/new_order",
            },
            {
              title: "Epis",
              icon: "mdi-sunglasses",
              class: "sm-hide md-block",
              to: "/epis",
            },
            {
              title: "Layouts",
              icon: "mdi-collage",
              class: "Testando",
              to: "/layout",
            },
            {
              title: "Operações",
              icon: "mdi-clipboard-list",
              class: "Testando",
              to: "/operation",
            },
            {
              title: "Materiais",
              icon: "mdi-hammer",
              class: "Testando",
              to: "/material",
            },
            {
              title: "Centro de trabalho",
              icon: "mdi-school",
              class: "Testando",
              to: "/work_center",
            },
            {
              title: "Sintoma",
              icon: "mdi-exclamation",
              class: "Testando",
              to: "/symptom",
            },
          ],
        },
      ],
    };
  },
};
</script>
<style>
.v-toolbar__extension{
  padding: 0px !important;
}
.v-tab{
  padding: 18px !important;
}
</style>
