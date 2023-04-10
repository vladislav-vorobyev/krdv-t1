<template>
  <div class="dashboard">
    <div v-loading="loading" class="search-form">
      <el-input v-model="search" placeholder="Название города..."></el-input>
      <el-button type="primary" :disabled="loading" @click="doSearch">Поиск</el-button>
    </div>
    <div class="list-view">
      <div v-for="item in list" :key="item.place_id">
        <span>{{ item.display_name }}</span>
      </div>
    </div>
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
  },
}
</script>

<style lang="scss">
.list-view {
  margin-top: 20px;

  > div {
    padding: 5px 0;
    border: 1px solid #f0f0f0;
  }
}

.form-error {
  color: red;
}
</style>
