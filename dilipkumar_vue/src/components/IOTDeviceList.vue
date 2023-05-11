<template>
  <div>
    <h1 class="title"> IOT Devices Monitoring System</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="device in devices" :key="device._id" class="device" @click="selectDevice(device)">
        <div class="device-name">{{ device.name }}</div>
        <div class="device-status" :class="{ 'working': device.status === 'working', 'stopped': device.status === 'stopped' }">{{ device.status }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IOTDeviceList',
  data() {
    return {
      devices: [],
      loading: true
    }
  },
  mounted() {
    fetch('https://iot-device-backend.onrender.com/api')
      .then(response => response.json())
      .then(devices => {
        this.devices = devices
        this.loading = false
      })
  },
  methods: {
    selectDevice(device) {
      this.$emit('device-selected', device)
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 30px;
}

.device {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  margin-bottom: 20px;
}

.device:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.device-name {
  font-size: 24px;
  font-weight: bold;
  margin-right: 10px;
  color: #4a4a4a;
}

.device-status {
  padding: 5px 10px;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  text-transform: uppercase;
}

.device-status.working {
  background-color: #4caf50;
}

.device-status.stopped {
  background-color: #f44336;
}
</style>

