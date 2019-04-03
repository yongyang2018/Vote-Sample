<template>
  <div>
    <h1 class="h1">Vote</h1>
    <div class="form-group col-md-4 mt-5">
      <label>Choose your ethereum address</label>
      <select class="custom-select" v-model="address">
        <option v-for="(account, index) in accounts" :key="index" :value="account">{{ account }}</option>
      </select>
    </div>
    <table class="table table-striped text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">标题</th>
          <th scope="col">内容</th>
          <th scope="col">总投票数</th>
          <th scope="col">是否已经关闭</th>
          <th scope="col">支持票</th>
          <th scope="col">反对票</th>
          <th scope="col">投票</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vote, index) in votes" v-bind:key="index">
          <th scope="row">{{ index }}</th>
          <td scope="row">{{ vote.title }}</td>
          <td scope="row">{{ vote.content }}</td>
          <td scope="row">{{ vote.totalcoun }}</td>
          <td scope="row">{{ vote.isClosed ? '是' : '否' }}</td>
          <td scope="row">{{ vote.support }}</td>
          <td scope="row">{{ vote.oppose }}</td>
          <td>
            <button
              :disabled="vote.isClosed"
              @click="voteSupport(vote.id)"
              type="button"
              class="btn btn-outline-success btn-sm mr-2"
            >支持</button>
            <button
              :disabled="vote.isClosed"
              @click="voteOppose(vote.id)"
              type="button"
              class="btn btn-outline-danger btn-sm"
            >反对</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {
  getVoteInfos,
  voteType,
  vote,
  isVotable,
  getAccounts
} from "../api/index";
export default {
  created() {
    this.getVoteInfos();
    this.getAccounts();
  },
  data() {
    return {
      votes: [],
      address: "",
      accounts: []
    };
  },
  methods: {
    getAccounts() {
      getAccounts().then(res => {
        this.accounts.splice(0, this.accounts.length);
        for (let r of res) {
          this.accounts.push(r);
        }
      });
    },
    getVoteInfos() {
      getVoteInfos().then(votes => {
        this.votes.splice(0, this.votes.length);
        for (let v of votes) {
          this.votes.push(v);
        }
      });
    },
    vote(key, type) {
      isVotable(key, this.address)
        .then(res => {
          if (!res) {
            throw "您已经投票过，请不要重复投票";
          }
          return true;
        })
        .then(() => {
          return vote(key, type, this.address);
        })
        .catch(err => {
          alert('投票失败 请不要重复投票');
        })
        .then(() => {
          console.log("======"); // this never happens
          this.getVoteInfos();
        });
    },
    voteSupport(key) {
      this.vote(key, voteType.Support);
    },
    voteOppose(key) {
      this.vote(key, voteType.Oppose);
    }
  }
};
</script>

<style lang="scss" scoped>
.table-vote {
  width: 100%;
  table-layout: fixed;
}
</style>
