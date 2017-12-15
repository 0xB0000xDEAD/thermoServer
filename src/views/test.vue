<template>
  <div id="app">
    <img src="/assets/logo.png"></p>
    <br>
    <p>Questa è una view con vue!</p>

    <trend
  :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
  :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
  auto-draw
  smooth>
</trend>
  </div>
</template>

<script>

import Vue from 'vue'
import Trend from 'vuetrend'

Vue.use(Trend)
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
