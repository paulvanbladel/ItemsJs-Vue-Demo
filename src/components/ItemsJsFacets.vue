<template>
  <div>
    <q-search inverted color='primary' v-model="query" @clear="reset()" placeholder="Type your search here..." clearable />
     <p class="text-right">Search result amount : ({{ searchResult.pagination.total }})</p>
    <p class="text-right">Search performed in {{ searchResult.timings.search }} ms, facets in {{ searchResult.timings.facets }} ms</p>
    <br>
    <div>
      <span v-for="facet in searchResult.data.aggregations" :key="facet.name">
        <span v-for="bucket in filters[facet.name]" :key="bucket.key">
          <q-chip closable @hide="unselectBucket(facet.name,bucket)" color="primary">
            {{bucket}}
          </q-chip>
        </span>
      </span>
    </div>
    <div>
      <q-list dense v-for="facet2 in searchResult.data.aggregations" :key="facet2.name">
        <q-collapsible group="mygroup" :header-class="filters[facet2.name].length > 0?'text-bold text-italic':''" :label="getFacetLabel(facet2)">
          <q-item v-for="bucket in facet2.buckets" :key="bucket.key">
            <q-checkbox v-model="filters[facet2.name]" :val="bucket.key" :label="getBucketLabel(bucket)">
            </q-checkbox>
          </q-item>
        </q-collapsible>
      </q-list>
    </div>
  </div>
</template>
<style>
</style>
<script>


import itemsjs from 'itemsjs'
export default {
  props:['rows','configuration'],
  created() {
    this.itemsJsInstance = itemsjs(this.rows, this.configuration)
  },
  data() {
   var filters = {};
    Object.keys(this.configuration.aggregations).map(function(v) {
      filters[v] = [];
    })

    return {
      query: '',
      filters,
      itemsJsInstance: {}
    }
  },
  methods: {
    getFacetLabel(facet) {
      return facet.title
    },
    unselectBucket(facetName, tagBucket) {
      this.filters[facetName] = this.filters[facetName].filter(item => item !== tagBucket)
    },
    getBucketLabel(bucket) {
      return bucket.key + ' (' + bucket.doc_count + ')'
    },
    reset() {
      var filters = {}
      Object.keys(this.optionList.aggregations).map(function(v) {
        filters[v] = []
      })
      this.filters = filters
      this.query = ''
    },
  },
    computed: {
    searchResult() {
      let result =  this.itemsJsInstance.search({
        per_page:100,
        query: this.query,
        filters: this.filters
      })
      this.$emit('searchResultUpdated', result.data.items)
      return result
    }
  }
}
</script>
