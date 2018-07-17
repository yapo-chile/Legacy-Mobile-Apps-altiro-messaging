<template>
    <div>
        <div>
            <h1 class="title">Bienvenido a sitio genérico</h1>
        </div>
        <div>
            <input class="generic-input" type="text" v-model="input">
        </div>
        <div>
            <button class="generic-button" @click="save(input)">Guardar</button>
        </div>
        <div class="generic-result">
            resultado: {{generic.text}}
        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {Action, State} from 'vuex-class';
    import {GenericState} from '@/store/modules/generic/types';

    const namespace: string = 'generic';

    @Component
    export default class TheGeneric extends Vue {
        @State('generic') public generic!: GenericState;

        @Action('checkStore', {namespace})
        private checkStore: any;

        @Action('getText', {namespace})
        private getText: any;

        @Action('setText', {namespace})
        private setText: any;

        private created() {
            this.checkStore();
        }

        private save(input: string) {
            this.setText(input);
        }

        private data() {
            return {
                input: '',
            };
        }

    }
</script>
<style scoped>
</style>
