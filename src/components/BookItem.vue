<script>
import { store } from '../stores/stores.js';

export default {
    props: {
        book : {
            type : Object,
            required : true,
        },
        module : {
            type : Object,
            required : true,
        }
    },
    name : 'BookItem',
    methods: {
        deleteBook(book) {
            if (confirm("¿Desea eliminar el libro con id " + book.id + " y modulo " + book.moduleCode + "?")){
            store.deleteBook(book.id);
            }
        }
    }
}
</script>

<template>
    <div>
    <h3 class="title">Libro: ({{book.id}})</h3>
    <span class="material-icons">face</span>
    <h4 class="publisher">Editorial {{book.publisher}}</h4>
    <p class="pages">{{book.pages}} páginas</p>
    <p class="vliteral">Modulo: {{module.vliteral}}</p>
    <p class="status">Estado: {{book.status}}</p>
    <p>{{ventaOVendido}} </p>
    <p class="comments">{{book.comments}}</p>
    <h4 class="price">{{book.price}} €</h4>
    <div id="buttons">
        <button class="addToCartButton" data-id={{book.id}}>
            <span class="material-icons">add_shopping_cart</span>
        </button>
        <button class="editButton" data-id={{book.id}} on>
            <span class="material-icons">edit</span>
        </button>
        <button class="removeButton" data-id={{book.id}} v-on:click="deleteBook(book)">
            <span class="material-icons">delete</span>
        </button>
    </div> 
    </div>
</template>