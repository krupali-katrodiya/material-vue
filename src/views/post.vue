<script>
export default {
  name: "Home",
  data: function () {
    return {};
  },
  computed: {
    isPostData() {
      return this.$store ? this.$store.state.post.posts : [];
    },
  },
  watch: {
    isPostData(newVal) {
      return newVal;
    },
  },
  created() {
    this.$store.dispatch("post/getPostData");
  },
  mounted() {
    // this.success();

    this.$store.dispatch("post/getPostData");
  },
  methods: {
      navigate(id) {
           this.$router.replace({ name: "post-detail", params: {id: id}});
      }
  },
};
</script>

<template>
<div>
    <span v-for="(data, index) in isPostData" :key="index" @click="navigate(data.id)">
      <md-card >
        <md-card-header>
           Userid : {{data.userId}} , id: {{data.id}}
          <div class="md-title">{{ data.title }}</div>
        </md-card-header>

        <md-card-content> {{data.body}} </md-card-content>

      </md-card>
    </span>
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