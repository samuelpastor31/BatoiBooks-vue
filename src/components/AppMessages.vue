<script>
import { store } from '../stores/stores.js';

export default {
    computed: {
        messages() {
            return store.state.messages;
        },
    },
    methods: {
        deleteMessage(index) {
            return store.deleteMessage(index);
        }
    }
}
</script>

<template>
    <div id="messages" v-for="(message, index) in messages" :key="message.id">
        <div v-html="message"></div>
        <button type="button" class="buttonX"
            style="float: right; background: none; border: none; font-weight: bold; font-size: 16px; cursor: pointer;"
            v-on:click=deleteMessage(index)>
            x
        </button>
    </div>
</template>
