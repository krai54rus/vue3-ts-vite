<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useStore } from 'vuex'
  import api, { errorHandler } from '@/api'

  defineProps<{ msg: string }>()

  const store = useStore()
  const data = ref(null)
  const loading = ref(true)
  const error = ref(null)
  await store.dispatch('module/loaditems')
</script>

<template>
  <h1>About</h1>
  <div>
    <span>{{ msg }}</span>
    <div>
      <div v-for="item in data">
        <span>{{ item }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }
</style>
