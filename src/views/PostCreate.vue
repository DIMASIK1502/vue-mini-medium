<template>
  <div class="post-create-page">
    <div class="post-create-form">
      <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      <b-field label="Заголовок">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-field label="Описание">
        <b-input v-model="description" type="textarea"></b-input>
      </b-field>
      <div v-if="!postData" class="form-actions">
        <b-button
          @click="handlePostCreate"
          class="form-btn"
          type="is-primary"
          outlined
        >
          Создать пост
        </b-button>
      </div>
      <div v-else class="form-actions">
        <b-button
          @click="handlePostUpdate"
          class="form-btn"
          type="is-primary"
          outlined
        >
          Сохранить
        </b-button>
        <b-button
          @click="$router.back()"
          class="form-btn"
          type="is-primary"
          outlined
        >
          Отменить
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      title: "",
      description: "",
      isLoading: false
    };
  },
  computed: {
    ...mapState(["post"], ["postList", "error"])
  },
  methods: {
    ...mapActions("post", ["postCreate", "postUpdate"]),
    async handlePostUpdate() {
      const { title, description, postUpdate, error, id } = this;
      if (title.length && description.length && id) {
        this.isLoading = true;
        const updatedAt = moment().format();
        await postUpdate({ id, title, description, updatedAt });
        this.isLoading = false;
        if (!error) {
          this.$router.replace("/");
        }
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Все поля должны быть заполнены",
          position: "is-bottom",
          type: "is-danger"
        });
      }
    },
    async handlePostCreate() {
      const { title, description, postCreate, error } = this;
      if (title.length && description.length) {
        this.isLoading = true;
        const createdAt = moment().format();
        const post = {
          createdAt: createdAt,
          claps: 0,
          updatedAt: createdAt,
          title,
          description
        };
        await postCreate(post);
        this.isLoading = false;
        if (!error) {
          this.$router.push("/");
        } else {
          console.log(this.error);
        }
      } else {
        this.$buefy.toast.open({
          duration: 3000,
          message: "Все поля должны быть заполнены",
          position: "is-bottom",
          type: "is-danger"
        });
      }
    }
  },
  props: {
    postData: {
      type: Object,
      required: false
    }
  },
  created() {
    if (this.postData) {
      this.title = this.postData.title;
      this.description = this.postData.description;
      this.id = this.postData.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.post-create-page {
  padding-top: 32px;
  .post-create-form {
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: 16px;
    margin: 0 auto;
    max-width: 800px;
    width: 100%;
    background-color: white;
    border-radius: 4px;
    .form-actions {
      padding-top: 12px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        &:not(:last-child) {
          margin-right: 16px;
        }
      }
    }
  }
}
</style>
