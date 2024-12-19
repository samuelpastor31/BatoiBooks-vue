<script>
import { mapActions, mapState } from 'pinia';
import { useDataStore } from '../stores/useDataStore.js';

export default {
    computed: {
        ...mapState(useDataStore, ['messages']),
    },
    methods: {
        ...mapActions(useDataStore, ['deleteMessage']),
        deleteMessages(index) {
            return this.deleteMessage(index);
        }
    }
}
</script>

<template>
    <div id="messages" v-for="(message, index) in messages" :key="message.id">
        <div v-html="message"></div>
        <button type="button" class="buttonX"
            style="float: right; background: none; border: none; font-weight: bold; font-size: 16px; cursor: pointer;"
            v-on:click=deleteMessages(index)>
            x
        </button>
    </div>
</template>
