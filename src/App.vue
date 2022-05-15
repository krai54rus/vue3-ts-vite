<script setup lang="ts"></script>

<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link msg="about message" to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
