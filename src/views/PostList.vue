<template>
  <div class="post-page">
    <div class="post-list-container">
      <b-loading
        :is-full-page="true"
        class="post-loading"
        :active.sync="isLoading"
      ></b-loading>
      <div class="list-list">
        <post-card
          v-for="item in post.postList"
          :key="item.id"
          :data="item"
        ></post-card>
        <span class="post-list-emtpy" v-if="post.postList.length === 0"
          >Список пуст</span
        >
      </div>
      <b-pagination
        v-if="isPaginationShow"
        class="post-pagination"
        @change="handlePaginate"
        :total="post.total"
        :current.sync="current"
        :per-page="perPage"
        :icon-prev="prevIcon"
        :icon-next="nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
      >
      </b-pagination>
    </div>
  </div>
</template>

<script>
import PostCard from "../components/PostCard";
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      current: 1,
      perPage: 10,
      isLoading: false,
      prevIcon: "chevron-left",
      nextIcon: "chevron-right"
    };
  },
  components: {
    "post-card": PostCard
  },
  methods: {
    ...mapActions("post", ["getPostList"]),
    async handlePaginate(page) {
      this.isLoading = true;
      await this.getPostList({ _page: page });
      this.isLoading = false;
    }
  },
  computed: {
    ...mapState(["post"], ["postList", "total", "error"]),
    isPaginationShow() {
      return this.post.total > this.perPage;
    }
  },
  async mounted() {
    this.isLoading = true;
    await this.getPostList();
    this.isLoading = false;
    if (this.post.error) {
      this.$buefy.toast.open({
        duration: 3000,
        message: this.post.error,
        position: "is-bottom",
        type: "is-danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.post-page {
  padding: 32px 0;
  .post-list-container {
    min-height: 300px;
    margin: 0 auto;
    max-width: 800px;
    width: 100%;
    .list-list {
      display: flex;
      flex-direction: column;
    }
    .post-list-emtpy {
      text-align: center;
      font-size: 20px;
    }
  }
  .post-pagination {
    margin-top: 12px;
  }
}
</style>
