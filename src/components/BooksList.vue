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
        deleteBook(book) {
            if (confirm("¿Desea eliminar el libro con id " + book.id + " y modulo " + book.moduleCode + "?")) {
                store.deleteBook(book.id);
            }
        },
        addToCart(book) {
            store.addBookToCart(book);
        },
        editBook(book) {
            this.$router.push({ path: '/edit/' + book.id });
        }
    }
}

</script>

<template>
    <div id="list">
        <book-item v-for="book in books" :key="book.id" :book="book" :module="getModule(book.moduleCode)">

            <div id="buttons">
                <button class="addToCartButton" data-id={{book.id}} v-on:click="addToCart(book)">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="editButton" data-id={{book.id}} v-on:click="editBook(book)">
                    <span class="material-icons">edit</span>
                </button>
                <button class="removeButton" data-id={{book.id}} v-on:click="deleteBook(book)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </book-item>

    </div>
</template>