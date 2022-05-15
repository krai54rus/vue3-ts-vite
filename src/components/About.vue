<script setup lang="ts">
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  const store = useStore()
  store.dispatch('module/loaditems')
  const data = computed(() => store.state.module.items)
</script>

<template>
  <h1>About</h1>
  <div class="data-list">
    <div class="data-item" v-for="item in data">
      <span>{{ item.id }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .data {
    &-list {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  }
</style>
