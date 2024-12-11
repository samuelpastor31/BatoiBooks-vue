<script>
import { store } from '../stores/stores.js';

export default {
  name: 'AddBooks',
  data() {
    return {
      book: {
        //id: null,
        moduleCode: '',
        publisher: '',
        price: null,
        pages: null,
        status: '',
        comments: '',
      },
      modules: [],
    };
  },
  computed: {
    modules() {
      return store.state.modules;
    }
  },
  methods: {
    async handleSubmit() {

      // Crear el libro y agregarlo al store
      const newBook = {
        ...this.book,
        userId: 2,
      };
      await store.addBook(newBook);

      // Limpiar el formulario
      this.book = {
        //id: null,
        moduleCode: '',
        publisher: '',
        price: null,
        pages: null,
        status: '',
        comments: '',
      };
    },
  },
};
</script>

<template>
  <div id="form">
    <form @submit.prevent="handleSubmit">
      <h3 id="titleForm">Añadir libro</h3>
      <div v-if="book.id">
        <label for="id">ID:</label>
        <input type="text" v-model="book.id" disabled />
      </div>

      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" v-model="book.moduleCode" required>
          <option value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" v-model="book.publisher" required />
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" v-model="book.price" required min="0" step="0.01" />
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" v-model="book.pages" required min="0" />
      </div>

      <div>
        <label>Estado:</label>
        <input type="radio" id="good" value="good" v-model="book.status" />
        <label for="good">Bueno</label>
        <input type="radio" id="bad" value="bad" v-model="book.status" />
        <label for="bad">Malo</label>
        <input type="radio" id="new" value="new" v-model="book.status" />
        <label for="new">Nuevo</label>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments" v-model="book.comments"></textarea>
      </div>

      <button type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>
