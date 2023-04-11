<template>
  <div class="dashboard">
    <div v-loading="loading" class="search-form">
      <el-input v-model="search" placeholder="Название города...">
        <el-button slot="append" icon="el-icon-search" :disabled="loading" @click="doSearch"></el-button>
      </el-input>
    </div>
    <div class="list-view">
      <div v-for="item in list" :key="item.place_id">
        <span class="list-row" @click="moveCenter(item.place_id)">{{ item.display_name }}</span>
      </div>
    </div>
    <client-only>
      <l-map style="height: 500px" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      </l-map>
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'DashboardComponent',

  data() {
    return {
      loading: false,
      search: '',
      list: [],
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 8,
      center: [55.4, 37],
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }
  },

  methods: {
    doSearch() {
      this.loading = true
      // request to geo server
      this.$axios
        .get('https://nominatim.openstreetmap.org/search?format=json&q=' + this.search)
        .then((response) => {
          this.list = response.data
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error)
        })
        .finally(() => {
          this.loading = false
        })
    },

    moveCenter(id) {
      const point = this.list.filter((e) => e.place_id === id).pop()
      if (point.lat && point.lon) {
        this.center = [point.lat, point.lon]
      } else {
        // eslint-disable-next-line no-console
        console.error('Wrong point', id)
      }
    },
  },
}
</script>

<style lang="scss">
.list-view {
  margin-top: 20px;
  margin-bottom: 20px;

  > div {
    padding: 5px 0;
    border: 1px solid #f0f0f0;
    cursor: pointer;
  }
}

.form-error {
  color: red;
}
</style>
