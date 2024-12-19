<script>

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
}
</script>

<template>
    <div class="card">
    <h3 class="title">Libro: ({{book.id}})</h3>
    <span class="material-icons">face</span>
    <h4 class="publisher">Editorial {{book.publisher}}</h4>
    <p class="pages">{{book.pages}} páginas</p>
    <p class="vliteral">Modulo: {{module.vliteral}}</p>
    <p class="status">Estado: {{book.status}}</p>
    <p class="comments">{{book.comments}}</p>
    <h4 class="price">{{book.price}} €</h4>
        <slot></slot>
    </div>
</template>