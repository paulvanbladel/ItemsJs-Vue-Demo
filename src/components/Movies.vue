<template>
  <q-page padding>

    <div class="row">
      <div class="col-3">
        <items-js-facets :rows="jsonData" :configuration="configuration" @searchResultUpdated="searchResultUpdated">
        </items-js-facets>
      </div>
      <div class="col-1"></div>
      <div class="col-7">
        <q-list>
          <q-item v-for="item of items" :key="item.name">
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



import rawJson from './imdb.json'
import ItemsJsFacets from './ItemsJsFacets.vue'
export default {
  components:{ItemsJsFacets},
  created() {
    this.jsonData = rawJson
     this.jsonData.forEach(e => {
        e.year = [e.year.toString()]
      })
  },
  data() {
    var configuration = {
      searchableFields: ['title', 'tags', 'actors'],
      sortings: {
        name_asc: {
          field: 'name', order: 'asc' }
       },
      aggregations: {
        tags: { title: 'Tags', size: 200 },
        actors: { title: 'Actors', size: 10 },
        genres: { title: 'Genres', size: 10 },
        country: { title: 'Country', size:20 },
        year: { title: 'Year', size:100 }
      }
    }
    return {
      jsonData: [],
      configuration,
      items: []

    }
  },
  methods: 
  {
    searchResultUpdated(d) {
      this.items = d
    }
  }
}
</script>
