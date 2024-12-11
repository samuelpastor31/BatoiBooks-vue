import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default class ApiClient {
  books() {
    return {
      getDBBooks: () => apiClient.get("/books"),
      getDBBook: (id) => apiClient.get("/books/" + id),
      addBook: (book) => apiClient.post("/books", book),
      removeDBBook: (id) => apiClient.delete("/books/" + id),
      changeDBBook: (book) => apiClient.put("/books/" + book.id, book),
      checkBookInModuleDBBook: (userId, moduleCode) =>
        apiClient.get("/books?userId=" + userId + "&moduleCode=" + moduleCode),
    };
  }

  modules() {
    return {
      getDBModules: () => apiClient.get("/modules"),
      getDBModule: (id) => apiClient.get("/modules/" + id),
    };
  }

  //    users = {
  //     getDBUsers:() => apiClient.get('/users').then(response => response.data),
  //     getDBUser:(id) => apiClient.get('/users/'+id).then(response => response.data),
  //     addDBUser:(user) => apiClient.post('/users', user).then(response => response.data),
  //     removeDBUser:(id) => apiClient.delete('/users/'+id).then(response => response.data),
  //     changeDBUser:(user) => apiClient.put('/users/'+user.id, user).then(response => response.data),
  //     changeDBUserPassword:(id,contra) => apiClient.patch('/users/'+id, {password:contra}).then(response => response.data),
  //   }
}
