import { defineStore } from "pinia";
import ApiClient from "../services/apiClient.api";

const apiClient = new ApiClient();

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    books: [],
    modules: [],
    users: [],
    messages: [],
    cart:  JSON.parse(localStorage.getItem('cart')) || [],
  }),

  getters: {
    getBookById: (state) => (id) => {
      return state.books.find((book) => book.id === id);
    },
    findModule: (state) => (moduleCode) => {
      return state.modules.find((module) => module.code === moduleCode)||{};
    },
  },

  actions: {
    addMessage(isInfo, message) {
      const alertStyle = isInfo
        ? "background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; padding: 10px; margin: 10px 0; border-radius: 5px;"
        : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; margin: 10px 0; border-radius: 5px;";

      const messageHTML = `
        <div style="${alertStyle}" role="alert">
          ${message}
        </div>`;
      this.messages.push(messageHTML);
    },

    deleteMessage(index) {
      this.messages.splice(index, 1);
    },

    async populateBooks() {
      try {
        const response = await apiClient.books().getDBBooks();
        this.books = response.data;
      } catch (error) {
        console.error("Error al cargar los libros:", error);
        this.addMessage(false, "Error al cargar los libros");
      }
    },

    async populateModules() {
      try {
        const response = await apiClient.modules().getDBModules();
        this.modules = response.data;
      } catch (error) {
        console.error("Error al cargar los módulos:", error);
        this.addMessage(false, "Error al cargar los módulos");
      }
    },

    async bookInModule(userId, moduleCode) {
      try {
        const response = await apiClient
          .books()
          .checkBookInModuleDBBook(userId, moduleCode);
        return response.data;
      } catch (error) {
        console.error("Error al buscar el libro:", error);
        this.addMessage(false, "Error al buscar el libro");
      }
    },

    async addBook(book) {
      try {
        const response = await apiClient.books().addBook(book);
        this.books.push(response.data);
        this.addMessage(true, "Libro creado con éxito");
      } catch (error) {
        console.error("Error al crear el libro:", error);
        this.addMessage(false, "Error al crear el libro");
      }
    },

    async deleteBook(id) {
      try {
        await apiClient.books().removeDBBook(id);
        this.books = this.books.filter((book) => book.id !== id);
        this.addMessage(true, `Libro ${id} eliminado con éxito`);
      } catch (error) {
        console.error("Error al eliminar el libro:", error);
        this.addMessage(false, "Error al eliminar el libro");
      }
    },

    addBookToCart(book) {
      if (this.cart.includes(book)) {
        this.cart.splice(book, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.addMessage(false, `Libro ${book.id} quitado del carrito`);
      } else {
        this.cart.push(book);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.addMessage(true, `Libro ${book.id} añadido al carrito con éxito`);
      }
    },

    async editBook(book) {
      try {
        const response = await apiClient.books().changeDBBook(book);
        const index = this.books.findIndex((b) => b.id === book.id);

        if (index !== -1) {
          this.books[index] = response.data;
        }
        this.addMessage(true, `Libro ${book.id} editado con éxito`);
      } catch (error) {
        console.error("Error al editar el libro:", error);
        this.addMessage(false, "Error al editar el libro");
      }
    },
    clearClartDB(){
      this.cart = []
      localStorage.setItem('cart', JSON.stringify(this.cart));
      this.addMessage(true, "Carrito limpio con exito");
    }
  },
});
