<template>
  <b-button
    rounded
    outlined
    type="is-info"
    icon-left="sign-language"
    @click="handleBtnClick"
    >{{ totalClaps }}
  </b-button>
</template>

<script>
import { debounce } from "lodash";
import { mapActions } from "vuex";
export default {
  props: {
    claps: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      clickedCount: 0
    };
  },
  created() {
    this.debounceValue = debounce(this.debounceValue, 1000);
  },
  computed: {
    totalClaps() {
      return this.clickedCount + this.claps;
    },
    isActive() {
      return this.clickedCount > 0;
    }
  },
  methods: {
    ...mapActions("post", ["setPostClaps"]),
    debounceValue() {
      if (this.id) {
        this.setPostClaps({ id: this.id, claps: this.clickedCount });
      }
    },
    handleBtnClick() {
      this.clickedCount++;
      this.debounceValue();
    }
  }
};
</script>
