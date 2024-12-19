<script>
import { useDataStore } from '@/stores/useDataStore';
import BookItem from './BookItem.vue';
import { mapActions, mapState } from 'pinia';
export default {
    name: 'AppCart',
    components: {
        BookItem
    },
    computed: {
        ...mapState(useDataStore, ['books', 'modules', 'cart']),
    },
    methods: {
        ...mapActions(useDataStore, ['addBookToCart','findModule','clearClartDB']),
        addToCarts(book) {
            this.addBookToCart(book);
        },
        buyCart() {
            if (confirm("¿Desea realizar la compra?")) {
            this.clearClartDB();
            alert("Compra realizada");
            }
        },
        clearCart() {
            this.clearClartDB();
        }
    }
}

</script>

<template>
    <h1>Carrito de Libros</h1>
    <div id="list">
        <book-item v-for="book in cart" :key="book.id" :book="book" :module="this.findModule(book.moduleCode)">
            <div id="buttons">
                <button class="addToCartButton" data-id={{book.id}} v-on:click="addToCarts(book)">
                    <span class="material-icons">cart-off</span>
                </button>
            </div>
        </book-item>
    </div>
    <div>
        Total libros : {{ cart.length }}
        <P>Precio total : {{ cart.reduce((total, book) => total + book.price, 0) }} €</P>
        <button type="button" v-on:click="buyCart">Realizar Compra</button>
        <button type="button" v-on:click="clearCart">Vaciar Carrito</button>
    </div>
</template>