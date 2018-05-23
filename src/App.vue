<template>
  <div id="app">
  	<m-header></m-header>
  	<v-mctab></v-mctab>
  	<keep-alive>
  		<router-view></router-view>
  	</keep-alive>
  </div>
</template>

<script>
	import MHeader from "components/m-header/m-header.vue"
	import VMctab from "components/mctab/mctab.vue"
	export default {
	  name: 'App',
	  components:{
	  	"m-header" :MHeader,
	  	"v-mctab": VMctab
	  }
	}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif,"微软雅黑";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background-color:#000;
}
</style>
