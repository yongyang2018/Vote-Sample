<template>
  <div id="app">
    <Header></Header>
    <div class="mt-5 container">
      <Votes ref="votes"></Votes>
    </div>
    <div class="mt-5 container">
      <Poll ref="poll"></Poll>
    </div>
    <div class="footer mb-5"></div>
  </div>
</template>

<script>
import Header from "./components/Header";
import Votes from "./components/Votes";
import Poll from "./components/Poll";
export default {
  name: "app",
  mounted(){
    this.$refs.poll.$on('poll', ()=>{
      this.$refs.votes.getVoteInfos()
    })
  },
  components: {
    Header,
    Votes,
    Poll
  }
};
</script>

<style scoped>
</style>
