<script>
import { useDataStore } from '@/stores/useDataStore';
import BookItem from './BookItem.vue';
import { mapState,mapActions } from 'pinia';
export default {
    name: 'BooksList',
    components: {
        BookItem
    },
    computed: {
        ...mapState(useDataStore, ['books', 'modules']),
    },
    methods: {
        ...mapActions(useDataStore, ['deleteBook', 'addBookToCart', 'editBook', 'findModule']),
        deleteBooks(book) {
            if (confirm("¿Desea eliminar el libro con id " + book.id + " y modulo " + book.moduleCode + "?")) {
                this.deleteBook(book.id);
            }
        },
        addToCart(book) {
            
            this.addBookToCart(book);
        },
        editBook(book) {
            this.$router.push({ path: '/edit/' + book.id });
        }
    }
}

</script>

<template>
    <div id="list">
        <book-item v-for="book in books" :key="book.id" :book="book" :module="this.findModule(book.moduleCode)">

            <div id="buttons">
                <button class="addToCartButton" data-id={{book.id}} v-on:click="addToCart(book)">
                    <span class="material-icons">add_shopping_cart</span>
                </button>
                <button class="editButton" data-id={{book.id}} v-on:click="editBook(book)">
                    <span class="material-icons">edit</span>
                </button>
                <button class="removeButton" data-id={{book.id}} v-on:click="deleteBooks(book)">
                    <span class="material-icons">delete</span>
                </button>
            </div>
        </book-item>

    </div>
</template>