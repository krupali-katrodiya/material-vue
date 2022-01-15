<script>
export default {
  data: function () {
    return {};
  },
  computed: {
    isPostRecord() {
      return this.$store ? this.$store.state.post.posts : [];
    },

    getComments() {
      return this.$store ? this.$store.state.post.comment : [];
    },
  },
  mounted() {
    this.$store.dispatch("post/getSinglePost", this.$route.params.id);
  },
  methods: {
    showComment(id) {
      this.$store.dispatch("post/getCommentOfPost", id);
    },
  },
};
</script>

<template>
  <div>
    <md-card>
      <md-card-header>
        <div>Post {{ isPostRecord.id }}</div>
        <div class="md-title">{{ isPostRecord.title }}</div>
      </md-card-header>

      <md-card-content>
        Here is the detail of first post card.
      </md-card-content>

      <md-card-actions>
        <md-button v-on:click.native="showComment(isPostRecord.id)"
          >Show comment</md-button
        >
      </md-card-actions>

      List of comments:-
      <span v-for="(data, index) of getComments" :key="index">
        <md-card>
          <md-card-header>
            Name : {{ data.name }}
            <div class="md-email">{{ data.email }}</div>
          </md-card-header>

          <md-card-content> {{ data.body }} </md-card-content>
        </md-card>
      </span>
    </md-card>
  </div>
</template>

<style lang="css" scoped>
.md-card {
  width: 320px;
  margin: 4px;
  display: inline-block;
  vertical-align: top;
}
</style>
