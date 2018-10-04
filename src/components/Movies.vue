<template>
  <q-page>
      <q-search  v-model="query" @clear="reset()"  placeholder="Movies" clearable  />

        <p class="text-right">Search result amount : ({{ searchResult.pagination.total }})</p>
        <p class="text-right" >Search performed in {{ searchResult.timings.search }} ms, facets in {{ searchResult.timings.facets }} ms</p>
        <div>
          <p>Tags:
          <span v-for="tagBucket in filters.tags">
            <q-chip closable @hide="unselectBucket('tags',tagBucket)" color="primary"> {{tagBucket}}</q-chip>
          </span>
            </p>
            <p>Actors:
          <span v-for="tagBucket in filters.actors">
            <q-chip closable @hide="unselectBucket('actors',tagBucket)" color="primary"> {{tagBucket}}</q-chip>
          </span>
            </p>
            <p>Genres:
          <span v-for="tagBucket in filters.genres">
            <q-chip closable @hide="unselectBucket('genres',tagBucket)" color="primary"> {{tagBucket}}</q-chip>
          </span>
            </p>
             <p>Year:
          <span v-for="tagBucket in filters.country">
            <q-chip closable @hide="unselectBucket('country',tagBucket)" color="primary"> {{tagBucket}}</q-chip>
          </span>
           <span v-for="tagBucket in filters.year">
            <q-chip closable @hide="unselectBucket('year',tagBucket)" color="primary"> {{tagBucket}}</q-chip>
          </span>
            </p>
        </div>
        <div class="row">
          <div class="col-md-3 col-xs-3">
            <q-list dense v-for="facet in searchResult.data.aggregations" >
              <q-collapsible group="mygroup" :label="getFacetLabel(facet)">
              <!-- <q-list-header class="text-weight-bold "><big>{{ facet.title }}</big></q-list-header> -->
                <q-item v-for="bucket in facet.buckets" >

                      <q-checkbox v-model="filters[facet.name]" :val="bucket.key" :label="getBucketLabel(bucket)"></q-checkbox>
                </q-item>
              </q-collapsible>
            </q-list>
          </div>

          <div class="col-md-9 col-xs-9">
            <q-list >
                <q-item v-for="item of searchResult.data.items" >
                  <q-item-side><img style="width: 100px;" v-bind:src="item.image"></q-item-side>
                  <q-item-main :label="item.name" :sublabel="item.description">
                    <q-item-tile >
                      <br>
                    <q-chip small tag  v-for="tag in item.tags">{{ tag }}</q-chip>
                  </q-item-tile>
                  </q-item-main>
                  <q-item-side right>{{item.year}}</q-item-side>
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
        e.year = e.year.toString()
      })
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
      size: 10
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
      rows: [],
      configuration
    }
  },
  methods: {
    getFacetLabel(facet){
      if(this.filters[facet.name].length > 0)
        return facet.title + " (active filters: " + this.filters[facet.name].length + ")"
      else
        return facet.title
    },
    unselectBucket(facetName, tagBucket){
        this.filters[facetName] = this.filters[facetName].filter(item => item !== tagBucket)
    },
    getBucketLabel(bucket) {
      return bucket.key +" (" + bucket.doc_count + ")"
    },
    reset() {
      var filters = {};
      Object.keys(this.configuration.aggregations).map(function(v) {
        filters[v] = [];
      })

      this.filters = filters;
      this.query = '';
    }
  },
  computed: {
    searchResult: function () {
     
      var result = itemsjs(this.rows, this.configuration).search({
        per_page:100,
        query: this.query,
        filters: this.filters
      })
      return result
    }
  }
}
</script>
