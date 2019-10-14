<template>
  <q-page padding>
    {{nativeState}}
    <q-btn
      label='inc'
      @click='increment'
    ></q-btn>
    <q-btn
      label='action'
      @click='action'
    ></q-btn>

    <div>getter: {{ourTestGetter}}</div>
    <div>getter: {{ourTestGetter2}}</div>
  </q-page>
</template>

<script>
// @ts-check
import { testModule } from '../store/test.module'
export default {
  // name: 'PageName',
  methods: {
    increment () {
      testModule.mutations.addCount(5)
    },
    action () {
      testModule.actions.increment(100)
    }
  },
  computed: {
    nativeState () {
      return testModule.state.count
    },
    ourTestGetter () {
      return testModule.getters.testGetter
    },
    ourTestGetter2 () {
      return testModule.getters.testGetter2
    }
  }
}
</script>
