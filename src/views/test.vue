<template>
<div id="app">
  <img src="assets/logo.png"></p>
  <br>
  <p>Questa è una view con vue!</p>
  <br>
  <em> enjoy your data</em>
  <br>
  <p> {{otherData}}</p>
  <br>
  <button @click="click">fai click!</button>
  <br>
  <p> {{dots}}</p>


  <trend :data=dots :gradient="['#6fa8dc', '#b96d42', '#c12a2a']" auto-draw smooth>
  </trend>
</div>
</template>



<script>
// import trendChart from 'api/chart/' // sempre problemi con il path dell'import
//  chart = trendChart;
import Vue from "vue";
import Trend from "vuetrend";
Vue.use(Trend);

import exampleMixin from './mixing'

export default {
    mixins: [exampleMixin],
    data: function () {
        return {
        }
    }
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
