import { reactive } from "vue";
import ApiClient from "../services/apiClient.api";
import AppMessages from "@/components/AppMessages.vue";

const apiClient = new ApiClient();

export const store = {
  state: reactive({
    books: [],
    modules: [],
    users: [],
    messages: [],
  }),
  async populateBooks() {
    try {
      const response = await apiClient.books().getDBBooks();
      this.state.books = response.data;
    } catch (error) {
      console.log("Error al cargar datos:", error);
      this.addMessage(false, "Error al cargar los libros");
    }
  },

  async populateModules() {
    try {
      const response = await apiClient.modules().getDBModules();
      this.state.modules = response.data;
    } catch (error) {
      console.log("Error al cargar datos:", error);
      this.addMessage(false, "Error al cargar los modulos");
    }
  },

  async bookInModule(userId, moduleCode) {
    try {
      const response = await apiClient
        .books()
        .checkBookInModuleDBBook(userId, moduleCode);
      return response.data;
    } catch (error) {
      console.log("Error al cargar datos:", error);
      this.addMessage(false, "Error al buscar el libro");
    }
  },

  async addBook(book) {
    try {
      alert("Libro añadido con exito");
      const response = await apiClient.books().addBook(book);
      this.state.books.push(response.data);
      this.addMessage(true, "Libro creado con exito");
    } catch (error) {
      console.log("Error al cargar datos:", error);
      this.addMessage(false, "Error al crear el libro");
    }
  },

  async deleteBook(id) {
    try {
      const response = await apiClient.books().removeDBBook(id);
      this.state.books = this.state.books.filter((book) => book.id !== id);
      this.addMessage(true, "Libro "+id+" eliminado con exito");
    } catch (error) {
      console.log("Error al cargar datos:", error);
      this.addMessage(false, "Error al eliminar el libro");
    }
  },

  addMessage(isInfo, message) {
    const alertStyle = isInfo
      ? "background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; padding: 10px; margin: 10px 0; border-radius: 5px;"
      : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; margin: 10px 0; border-radius: 5px;";

    const messageHTML = `
      <div style="${alertStyle}" role="alert">
        ${message}
      </div>`;

    this.state.messages.push(messageHTML);
  },

  deleteMessage(index) {
    this.state.messages.splice(index, 1);
  },
};
