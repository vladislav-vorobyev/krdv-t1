<template>
  <div class="dashboard">
    <div class="container">
      <Dashboard />
    </div>
  </div>
</template>

<script>
import Dashboard from '~/components/Dashboard.vue'

export default {
  name: 'IndexPage',
  components: { Dashboard },
  layout: 'default',
  middleware: ['authenticated'],
}
</script>
