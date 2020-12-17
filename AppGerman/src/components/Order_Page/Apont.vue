<template>
  <div>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="6">
        <v-card>
          <v-list>
            <v-list-item-group color="primary">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>Operador: Iago Soares</v-list-item-title>
                  <v-list-item-subtitle>Data: 05/12/2019</v-list-item-subtitle>
                  <v-list-item-subtitle>Horas Apontadas: 08:30</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <v-overlay :value="loadingPage">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
export default {
  name: 'summary',
  data() {
    return {
      loadingPage: false,
      fab: false,
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
