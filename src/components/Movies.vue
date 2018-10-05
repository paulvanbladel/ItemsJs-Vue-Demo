<template>
  <q-page padding>

    <p class="text-right">Search result amount : ({{ searchResult.pagination.total }})</p>
        <p class="text-right" >Search performed in {{ searchResult.timings.search }} ms, facets in {{ searchResult.timings.facets }} ms</p>
    <div class="row">
      <div class="col-3">
        <q-search inverted color='primary' v-model="query" @clear="reset()" placeholder="Type your search here..." clearable />
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
      <div class="col-1"></div>
      <div class="col-7">
        <q-list>
          <q-item v-for="item of searchResult.data.items" :key="item.name">
            <q-item-side><img style="width: 100px;" v-bind:src="item.image"></q-item-side>
            <q-item-main :label="item.name" :sublabel="item.description">
              <q-item-tile>
                <br>
                <q-chip small tag v-for="tag in item.tags" :key="tag.key">{{ tag }} </q-chip>
              </q-item-tile>
            </q-item-main>
            <q-item-side right>{{item.year[0]}}</q-item-side>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>
<style>
</style>
<script>


import itemsjs from 'itemsjs'
import rawJson from './imdb.json'

export default {
  created() {
    this.rows = rawJson
     this.rows.forEach(e => {
        e.year = [e.year.toString()]
      })
    this.itemsJsInstance = itemsjs(this.rows, this.configuration)

  },
  data() {
    var configuration = {
    searchableFields: ['title', 'tags', 'actors'],
    sortings: {
      name_asc: {
        field: 'name',
        order: 'asc'
      }
  },
  aggregations: {
    tags: {
      title: 'Tags',
      size: 200
    },
    actors: {
      title: 'Actors',
      size: 10
    },
    genres: {
      title: 'Genres',
      size: 10
    },
    country: {
      title: 'Country',
      size:20
    },
     year: {
      title: 'Year',
      size:100
    }
  }
}
   var filters = {};
    Object.keys(configuration.aggregations).map(function(v) {
      filters[v] = [];
    })

    return {
      query: '',
      // initializing filters with empty arrays
      filters,
      itemsJsInstance:{},
      rows: [],
      configuration
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
    searchResult: function () {
      var result = this.itemsJsInstance.search({
        per_page:100,
        query: this.query,
        filters: this.filters
      })
      return result
    }
  }
}
</script>
