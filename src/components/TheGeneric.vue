<template>
    <div>
        <div>
            <input type="text" v-model="genericText">
        </div>
        <div>
            <button @click="save">Guardar</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TheGeneric',
    data() {
      return {
        genericText: '',
      };
    },
    methods: {
      save() {
        // eslint-disable-next-line no-console
        console.log(this.genericText);
      },
    },
  };
</script>

<style scoped type="text/css">

</style>