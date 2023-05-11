<template>
  <div id="app">
    <IOTDeviceList @device-selected="showDevice" />
    <IOTDeviceCard :device="selectedDevice" />
  </div>
</template>

<script>
import IOTDeviceList from './components/IOTDeviceList.vue'
import IOTDeviceCard from './components/IOTDeviceCard.vue'

export default {
  name: 'App',
  components: {
    IOTDeviceList,
    IOTDeviceCard
  },
  data() {
    return {
      selectedDevice: null
    }
  },
  methods: {
    showDevice(device) {
      this.selectedDevice = device
    }
  }
}
</script>

<style>
body {
  font-family: 'Roboto', sans-serif;
  background-image: linear-gradient(to right, #6a11cb, #2575fc);
  margin: 0;
  padding: 0;
}
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
