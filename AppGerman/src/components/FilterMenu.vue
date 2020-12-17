<template>
  <v-row justify="center">
    <v-dialog overlay-color="red darken-3" v-model="dialog" fullscreen transition="slide-x-reverse-transition">
      <v-card>
        <v-toolbar dark color="red darken-3">
          <v-btn icon dark @click="$emit('closeMenu')">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Filtros</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="$emit('saveValues', filters)">Salvar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Período</v-subheader>
          <v-list-item>
            <v-menu
              v-model="menu1"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatDate(filters.initialDate)"
                  clearable
                  label="Data Inicial"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filters.initialDate"
                @change="menu1 = false"
              ></v-date-picker>
            </v-menu>
          </v-list-item>
          <v-list-item>
            <v-menu
              v-model="menu2"
              :close-on-content-click="false"
              max-width="290"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatDate(filters.finalDate)"
                  clearable
                  label="Data Final"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="filters.finalDate"
                @change="menu2 = false"
              ></v-date-picker>
            </v-menu>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Tipo de Manutenção</v-subheader>
          <v-list-item>
            <v-combobox
              v-model="maintenanceTypeSelect"
              :items="maintenanceType"
              label="Selecione os tipos de manutenção:"
              multiple
              chips
            />
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Setor</v-subheader>
          <v-list-item>
            <v-combobox
              v-model="sectorTypeSelect"
              :items="sectorType"
              label="Selecione os setores:"
              multiple
              chips
            />
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list subheader>
          <v-subheader>Centro de Trabalho</v-subheader>
          <v-list-item>
            <v-combobox
              v-model="centerTypeSelect"
              :items="centerType"
              label="Selecione o centro de trabalho:"
              multiple
              chips
            />
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    dialog: { type: Boolean, default: false }
  },

  methods: {
    formatDate(date) {
      const [year, month, day] = date.split('-');

      return `${day}/${month}/${year}`;
    }
  },

  data() {
    return {
      maintenanceTypeSelect: [],
      sectorTypeSelect: [],
      maintenanceType: ['Preventiva/Corretiva', 'Lista', 'Rota'],
      sectorType: ['SPRAY', 'Sorvetina'],
      menu1: false,
      menu2: false,
      filters: {
        initialDate: new Date().toISOString().substr(0, 10),
        finalDate: new Date().toISOString().substr(0, 10),
        text: 'Testando Filtro',
        componentsFilter: [1, 20, 40],
      },
      notifications: false,
      sound: true,
      widgets: false,
    }
  }
}
</script>
