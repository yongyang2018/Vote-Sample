<template>
  <div>
    <h2 class="h2 mt-5">新建投票</h2>
    <form class="mt-5" @submit="poll">
      <div class="form">
        <div class="form-group col-md-4">
          <label>Title</label>
          <input type="text" class="form-control" placeholder="投票项" v-model="title">
        </div>
        <div class="form-group col-md-4">
          <label>Content</label>
          <input type="text" class="form-control" placeholder="说明" v-model="content">
        </div>
        <div class="form-group col-md-4">
          <label>Total Counts</label>
          <input type="text" class="form-control" placeholder="总票数限制" v-model="totalcoun">
        </div>
        <div class="form-group col-md-4">
          <label>&nbsp;</label>
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
      totalcoun: 0
    };
  },
  methods: {
    // web3 contract.method.send() not works as expected
    poll(e) {
      e.preventDefault();
      createVote(this.title, this.content, this.totalcoun).then(() => {
        console.log("------"); // this never happens
        this.$emit("poll");
      });
    }
  }
};
</script>
