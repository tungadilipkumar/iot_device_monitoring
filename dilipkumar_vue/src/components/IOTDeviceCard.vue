<template>
  <div v-if="device" class="device-card">
    <h2>{{ device.name }}</h2>
    <div>Status: <span :class="{ 'working': device.status === 'working', 'stopped': device.status === 'stopped' }">{{ device.status }}</span></div>
    <div>Location: {{ device.location }}</div>
    <div>Description: {{ device.description }}</div>
    <div>Device Version: {{ device.version }}</div>
    <div>Manufacturer: {{ device.manufacturer }}</div>
    <div>Date Installed: {{ device.date_installed }}</div>
  </div>
</template>
<script>
export default {
  name: 'IOTDeviceCard',
  props: {
    device: Object
  }
}
</script>

<style scoped>
.device-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

span.working {
  color: green;
}

span.stopped {
  color: red;
}
</style>
