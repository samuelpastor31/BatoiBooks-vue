<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import { mapState, mapActions } from "pinia";
import { useDataStore } from "../stores/useDataStore.js";

export default {
  name: "AddBooks",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
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
      validationSchema: yup.object().shape({
        moduleCode: yup.string().required("El módulo es obligatorio"),
        publisher: yup.string().required("La editorial es obligatoria"),
        price: yup
          .number()
          .required("El precio es obligatorio")
          .min(0, "El precio debe ser mayor o igual a 0"),
        pages: yup
          .number()
          .required("El número de páginas es obligatorio")
          .min(1, "Debe haber al menos 1 página"),
        status: yup
          .string()
          .required("Debe seleccionar un estado"),
        comments: yup.string().nullable(),
      }),
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
    ...mapState(useDataStore, ['modules', 'getBookById']),
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
    ...mapActions(useDataStore, ['addToCart', 'editBook', 'addBook']),
    async handleSubmit(values) {
      if (this.esEdicion) {
        await this.editBook(values);
        this.$router.push("/");
      } else {
        const newBook = { ...values, userId: 2 };
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
      alert("Formulario reseteado");
      this.book = { ...this.bookSave };
    },
  },
};
</script>

<template>
  <div id="form">
    <Form
      :validation-schema="validationSchema"
      @submit="handleSubmit"
      :initial-values="book"
    >
      <h3 id="titleForm">{{ esEdicion ? "Editar libro" : "Añadir libro" }}</h3>

      <div v-if="esEdicion">
        <label for="id">ID:</label>
        <input type="text" id="id" :value="book.id" disabled />
      </div>

      <div>
        <label for="id-module">Módulo:</label>
        <Field as="select" id="id-module" name="moduleCode">
          <option value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </Field>
        <ErrorMessage name="moduleCode" />
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <Field id="publisher" name="publisher" type="text" />
        <ErrorMessage name="publisher" />
      </div>

      <div>
        <label for="price">Precio:</label>
        <Field id="price" name="price" type="number" min="0" step="0.01" />
        <ErrorMessage name="price" />
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <Field id="pages" name="pages" type="number" min="1" />
        <ErrorMessage name="pages" />
      </div>

      <div>
        <label>Estado:</label>
        <Field name="status" type="radio" value="good" /> Bueno
        <Field name="status" type="radio" value="bad" /> Malo
        <Field name="status" type="radio" value="new" /> Nuevo
        <ErrorMessage name="status" />
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <Field as="textarea" id="comments" name="comments" />
        <ErrorMessage name="comments" />
      </div>

      <button type="submit">{{ esEdicion ? "Editar" : "Añadir" }}</button>
      <button type="button" v-if="esEdicion" @click="bookReset">Reset</button>
      <button type="reset" v-else>Reset</button>
    </Form>
  </div>
</template>