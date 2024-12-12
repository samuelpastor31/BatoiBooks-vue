<script>
import { store } from '../stores/stores.js';
import BookItem from './BookItem.vue';
export default {
    name: 'AppCart',
    components: {
        BookItem
    },
    computed: {
        books() {
            return store.state.cart;
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
        addToCart(book) {
            store.addBookToCart(book);
        },
    }
}

</script>

<template>
    <h1>Carrito de Libros</h1>
    <div id="list">
        <book-item v-for="book in books" :key="book.id" :book="book" :module="getModule(book.moduleCode)">
            <div id="buttons">
                <button class="addToCartButton" data-id={{book.id}} v-on:click="addToCart(book)">
                    <span class="material-icons">cart-off</span>
                </button>
            </div>
        </book-item>
    </div>
</template>