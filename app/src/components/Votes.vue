<template>
  <div>
    <b-table striped hover :items="items" :fields="fields" class="table-vote"></b-table>
  </div>
</template>

<script>
import { getVoteslength, getAllVotes } from '../api/index'
export default {
  created() {
    // getVoteslength().then((res) => {
    //     console.log(res)
    //     return getAllVotes(0)
    // })
    // .then((res) => {
    //     console.log(res)
    // })
  },
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ['first_name', 'last_name', 'age'],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald'
        },
        { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
        { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
        { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.table-vote {
  width: 100%;
  table-layout: fixed;
}
</style>
