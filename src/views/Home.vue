<script>
import { validationMixin } from "vuelidate";
import { minLength, required } from "vuelidate/lib/validators";

export default {
  name: "Home",
  mixins: [validationMixin],
  data: function () {
    return {
      rowsPerPage: 3,
      addBlog: false,
      editBlog: false,
      deleteBlog: false,
      form: {
        title: null,
      },
      lastUser: null,
      userSaved: false,
    };
  },
  validations: {
    form: {
      title: {
        required,
        minLength: minLength(3),
      },
    },
  },
  computed: {
    isListedData() {
      return this.$store ? this.$store.state.blog.message : [];
    },
  },
  watch: {
    isListedData(newVal) {
      return newVal;
    },
  },
  created() {
    this.$store.dispatch("blog/success");
  },
  mounted() {
    this.$store.dispatch("blog/success");
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.title = null;
    },
    saveUser() {
      this.sending = true;

      this.$store.dispatch("blog/addTodo", this.form);
      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.title}`;
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },

    validateUserEdit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.$store.dispatch("blog/editTodo", id, this.form);
      }
    },
  },
};
</script>
<template>
  <div>
    Blog List Page
    <br />
    <router-link to="/post">Post Page </router-link>
    <md-dialog :md-active.sync="addBlog">
      <md-dialog-title>Add Blog</md-dialog-title>

      <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card class="md-card md-layout-item">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="Title">Title</label>
                  <md-input
                    name="Title"
                    id="Title"
                    autocomplete="given-name"
                    v-model="form.title"
                  />
                  <span class="md-error" v-if="!$v.form.title.required"
                    >The title is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.title.minlength"
                    >Invalid first name</span
                  >
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button type="submit" class="md-primary">Create Blog</md-button>
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved"
          >The user {{ lastUser }} was saved with success!</md-snackbar
        >
      </form>
    </md-dialog>

    <!-- <md-button class="md-primary md-raised" @click="showDialog = true">Show Dialog</md-button> -->
    <md-button v-on:click.native="addBlog = true">Add Blog</md-button>
    <md-table v-model="isListedData" md-card>
      <md-table-row
        slot="md-table-row"
        slot-scope="{ item }"
        md-selectable="single"
      >
        <md-table-cell md-label="ID" md-sort-by="id" md-numeric>{{
          item.userId
        }}</md-table-cell>
        <md-table-cell md-label="Name" md-sort-by="name">{{
          item.title
        }}</md-table-cell>
        <md-table-cell md-label="Email" md-sort-by="email">{{
          item.completed
        }}</md-table-cell>
        <md-table-cell md-label="Action" md-sort-by="email">
          <md-button v-on:click.native="editBlog = true" class="md-primary">
            Edit Blog</md-button
          >
          <md-button v-on:click.native="deleteBlog = true" class="md-accent"
            >Delete Blog</md-button
          >
           
        </md-table-cell>
      </md-table-row>
    </md-table>
  <md-dialog-alert
      :md-active.sync="deleteBlog"
      md-content="Your post has been deleted!"
      md-confirm-text="Cool!" />
    <md-dialog :md-active.sync="editBlog">
      <md-dialog-title>Edit Blog</md-dialog-title>

      <form novalidate class="md-layout" @submit.prevent="validateUserEdit">
        <md-card class="md-card md-layout-item">
          <md-card-content>
            <div class="md-layout md-gutter">
              <div class="md-layout-item md-small-size-100">
                <md-field :class="getValidationClass('title')">
                  <label for="Title">Title</label>
                  <md-input
                    name="Title"
                    id="Title"
                    autocomplete="given-name"
                    v-model="form.title"
                  />
                  <span class="md-error" v-if="!$v.form.title.required"
                    >The title is required</span
                  >
                  <span class="md-error" v-else-if="!$v.form.title.minlength"
                    >Invalid first name</span
                  >
                </md-field>
              </div>
            </div>
          </md-card-content>

          <md-card-actions>
            <md-button type="submit" class="md-primary">Edit Blog</md-button>
          </md-card-actions>
        </md-card>

        <md-snackbar :md-active.sync="userSaved"
          >The user {{ lastUser }} was saved with success!</md-snackbar
        >
      </form>
    </md-dialog>

    <md-table v-model="isListedData" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-numeric>{{
          item.userId
        }}</md-table-cell>

        <md-table-cell md-label="Name">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Last name">{{ item.completed }}</md-table-cell>
      </md-table-row>

      <!-- <md-table-pagination
        :md-page-size="rowsPerPage"
        :md-page-options="[3, 5, 10, 15]"
        :md-update="updatePagination"
        :md-data.sync="isListedData"
      /> -->
    </md-table>
  </div>
</template>