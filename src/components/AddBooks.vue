<script>
import { mapState,mapActions } from "pinia";
import { useDataStore } from "../stores/useDataStore.js";

export default {
  name: "AddBooks",
  props: {
    id: {
      type: Number,
      required: null,
    },
    book: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      book: {
        moduleCode: "",
        publisher: "",
        price: null,
        pages: null,
        status: "",
        comments: "",
      },
      bookSave: {},
    };
  },
  watch: {
    id() {
      this.book = {
        moduleCode: "",
        publisher: "",
        price: null,
        pages: null,
        status: "",
        comments: "",
      };
    },
  },
  computed: {
    ...mapState(useDataStore, ['modules','getBookById']),
    esEdicion() {
      return this.id != null;
    },
  },
  async mounted() {
    if (this.esEdicion) {
      const book = await this.getBookById(this.id);
      if (book) {
        this.book = { ...this.book, ...book };
        this.bookSave = { ...this.book };
      }
    }
  },
  methods: {
    ...mapActions(useDataStore, ['addToCart','editBook', 'addBook']),
    async handleSubmit() {
      if (this.esEdicion) {
        await this.editBook(this.book);
        this.$router.push("/");
      } else {
        const newBook = { ...this.book, userId: 2 };
        await this.addBook(newBook);
        this.book = {
          moduleCode: "",
          publisher: "",
          price: null,
          pages: null,
          status: "",
          comments: "",
        };
        this.$router.push("/");
      }
    },
    bookReset() {
      alert("reseted");
      this.book = { ...this.bookSave };
    },
  },
};
</script>

<template>
  <div id="form">
    <form @submit.prevent="handleSubmit">
      <h3 id="titleForm">{{ esEdicion ? "Editar libro" : "Añadir libro" }}</h3>

      <div v-if="esEdicion">
        <label for="id">ID:</label>
        <input type="text" id="id" :value="book.id" disabled />
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

      <button type="submit">{{ esEdicion ? "Editar" : "Añadir" }}</button>
      <button type="button" v-if="esEdicion" @click="bookReset">Reset</button>
      <button type="reset" v-else>Reset</button>
    </form>
  </div>
</template>
