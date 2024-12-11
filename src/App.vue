<script>
import { RouterLink, RouterView } from 'vue-router'
import AppMenu from './components/AppMenu.vue';
import AppMessages from './components/AppMessages.vue';
import BooksList from './components/BooksList.vue';
import AddBooks from './components/AddBooks.vue';
import AppCart from './components/AppCart.vue';
import AboutView from './views/AboutView.vue';
import batoiLogo from '/logoBatoi.png';
import { store } from './stores/stores';

export default {
  components: {
    AppMenu,
    AppMessages,
    BooksList,
    AddBooks,
    AppCart,
    AboutView
  },
  data() {
    return {batoiLogo : batoiLogo};
  },
  methods:{
    async populate(){
      await Promise.all([
      store.populateModules(),
      store.populateBooks(),
        
      ]);
    }
  },
   async mounted(){
    await this.populate();
  }
}
</script>

<template>

    <header>
      <img :src=batoiLogo alt="Logo Batoi" />
      <h1>BatoiBooks</h1>
      <h3>Control de libros</h3>
      <app-menu></app-menu>
    </header>

      <books-list></books-list>
      <app-messages></app-messages>
      <add-books></add-books>
      <app-cart></app-cart>
      <about-view></about-view>

</template>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
</style>
