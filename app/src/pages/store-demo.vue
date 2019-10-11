<template>
  <q-page padding>
    {{testje}}
    <q-btn
      label='inc'
      @click='increment'
    ></q-btn>
  </q-page>
</template>

<script>
import { testModule } from '../store/test.module'
export default {
  // name: 'PageName',
  methods: {
    increment () {
      testModule.mutations.addCount(5)
    }
  },
  computed: {
    testje () {
      return testModule.state.count
    }
  }
}
</script>
