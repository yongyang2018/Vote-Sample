<template>
  <div id="app">
    <Header></Header>
    <b-container>
      <b-form-row>
        <Votes></Votes>
      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import Header from './components/Header'
import Votes from './components/Votes'
export default {
  name: 'app',
  components: {
    Header,
    Votes
  }
}
</script>

<style scoped>

</style>
