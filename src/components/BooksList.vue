<script>
import { store } from '../stores/stores.js';
import BookItem from './BookItem.vue';
export default {
    name: 'BooksList',
    components: {
        BookItem
    },
    computed: {
        books() {
            return store.state.books;
        },
        modules() {
            return store.state.modules;
        }
    },
    methods: {
        getModule(moduleCode) {
            const module = store.state.modules.find(module => module.code == moduleCode);
            if (!module) {
                console.warn(`Módulo no encontrado para el código: ${moduleCode}`);
            }
            
            return module;
        },
    }
}

</script>

<template>
    <div id="list">
        <book-item v-for="book in books" :key="book.id" :book="book" :module="getModule(book.moduleCode)">
        </book-item>
    </div>
</template>