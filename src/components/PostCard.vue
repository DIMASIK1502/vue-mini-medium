<template>
  <div class="post-card">
    <h3 class="post-title">{{ data.title }}</h3>
    <p class="post-description">{{ data.description }}</p>
    <div class="card-footer">
      <span class="footer-date">{{ displayDate(data.createdAt) }}</span>
      <div v-if="isAuth" class="footer-actions">
        <ClapButton
          :id="data.id"
          v-if="role === 'reader'"
          :claps="data.claps"
        ></ClapButton>
        <b-button
          @click="$router.push({ name: 'PostEdit', params: { postData: data } })"
          type="is-primary"
          outlined
          v-if="role === 'writer'"
          >Изменить</b-button
        >
        <b-button
          @click="handleRemovepost"
          type="is-danger"
          outlined
          v-if="role === 'writer'"
          >Удалить</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ClapButton from "./ClapButton";
import moment from "moment";
moment.locale("ru");

export default {
  props: ["data"],
  methods: {
    ...mapActions("post", ["postRemove"]),
    handleRemovepost() {
      this.$buefy.dialog.confirm({
        message: "Вы действительно хотите удалить пост?",
        onConfirm: () => {
          this.postRemove(this.data.id);
        }
      });
    },
    displayDate(date) {
      return moment(date).fromNow();
    }
  },
  computed: {
    ...mapGetters("user", ["isAuth", "role"])
  },
  components: {
    ClapButton
  }
};
</script>

<style lang="scss" scoped>
.post-card {
  &:not(:last-child) {
    margin-bottom: 20px;
  }
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .post-title {
    font-size: 22px;
    color: black;
    margin-bottom: 16px;
  }
  .post-description {
    margin-bottom: 12px;
  }
  .card-footer {
    padding-top: 12px;
    .footer-date {
      font-size: 12px;
      display: block;
    }
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    .footer-actions {
      button {
        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
