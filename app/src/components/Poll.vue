<template>
  <div>
    <h2 class="h2 mt-5">新建投票</h2>
    <form class="mt-5" @submit="poll">
      <div class="form">
        <div class="form-group col-md-4 my-0">
          <label>Title</label>
          <input type="text" class="form-control" placeholder="投票项" v-model="title">
        </div>
        <div class="form-group col-md-4 my-0">
          <label :class="{'show' : !this.title && this.showError}" class="error">请输入投票项</label>
        </div>
        <div class="form-group col-md-4 my-0">
          <label>Content</label>
          <input type="text" class="form-control" placeholder="说明" v-model="content">
        </div>
        <div class="form-group col-md-4 my-0">
          <label :class="{'show' : !this.content && this.showError}" class="error">请输入说明</label>
        </div>
        <div class="form-group col-md-4 my-0">
          <label>Total Counts</label>
          <input type="text" class="form-control" placeholder="总票数限制" v-model="totalcoun">
        </div>
        <div class="form-group col-md-4 my-0">
          <label :class="{'show' : !this.isValidTotalCoun() && this.showError}" class="error">请输入 "1 ~ 255 之间的整数</label>
        </div>
        <div class="form-group col-md-4 my-0">
          <button type="submit" class="form-control btn btn-outline-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import { createVote } from "../api/index";
export default {
  name: "Poll",
  data() {
    return {
      title: "",
      content: "",
      // TODO: limit total coun as uint8
      totalcoun: 0,
      showError: false,
    };
  },
  methods: {
    // web3 contract.method.send() not works as expected
    poll(e) {
      e.preventDefault();
      if (!this.isValidForm()) {
        this.showError = true
        return;
      }
      createVote(this.title, this.content, this.totalcoun).then(() => {
        this.$emit("poll");
      });
    },
    isValidTotalCoun() {
      return this.totalcoun >= 1 && this.totalcoun <= 255;
    },
    isValidForm(){
      return this.isValidTotalCoun() && this.title && this.content
    }
  }
};
</script>

<style scoped lang="scss">
.error{
  font-size: .75rem;
  color: transparent;
  &.show{
    color: $color-danger;
  }
}
</style>
