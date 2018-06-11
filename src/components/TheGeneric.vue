<template>
    <div>
        <div>
            <h1 class="title">Bienvenido a sitio genérico</h1>
        </div>
        <div>
            <input class="generic-input" type="text" v-model="input">
        </div>
        <div>
            <button class="generic-button" @click="saveText(input)">Guardar</button>
        </div>
        <div class="generic-result">
            resultado: {{text}}
        </div>
    </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'TheGeneric',
    data() {
      return {
        input: '',
      };
    },
    created() {
      this.checkStore().then((resp) => {
        if (resp) {
          this.getText();
        } else {
          this.saveText('');
        }
      });
    },
    methods: {
      checkStore() {
        return this.$store.dispatch('checkStore').then(resp => resp.payload);
      },
      getText() {
        return this.$store.dispatch('getText').then(() => true);
      },
      saveText(data) {
        return this.$store.dispatch('setText', data).then(() => true);
      },
    },
    computed: {
      ...mapGetters({
        text: 'text',
      }),
    },
  };
</script>

<style scoped type="text/css">

</style>
