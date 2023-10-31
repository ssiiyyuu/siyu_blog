<template>
  <div style="min-width: 1px; min-height: 100vh;">
    <div class="map_container m-card m-hover">
      <div id="map">
      </div>
    </div>
  </div>
  
</template>
<script>
import { debounce } from "@/utils/my-util";
import echarts from "echarts"
import 'echarts/map/js/china.js'
import {getMap} from '@/api/map'

export default {
  name: 'index',
  components: {
    getMap
  },
  data() {
    return {
      mode: 'PV',
      chart: {},
      dataList: [],
      options: {
        backgroundColor: '#FFFFFF',
        title: {
          text: '访客分布UV图',
          x: 'center',
          y: '0'
        },
        tooltip: {
          trigger: 'item',
        },
        visualMap: {
          show: true,
          x: '0',
          y: '0',
          splitList: [
            { start: 1, end: 50 },
            { start: 50, end: 150 },
            { start: 150, end: 300 },
            { start: 300, end: 500 },
            { start: 500, end: 1000 },
            { start: 1000 }
          ]
        },
        series: [
          {
            name: '访客量',
            type: 'map',
            mapType: 'china',
            roam: false,
            selectedMode: false,
            label: {
              normal: {
                show: false  
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                areaColor: "#ffffff",
                borderColor: "#389dff",
                borderWidth: 0.5
              },
              emphasis: {
                areaColor: "#ffffff"
              }
            },
            data: []
          }
        ]
      }, 
      resizeWrapper: null
    }
  },
  methods: {
    initMapOption() {
      getMap().then(res => {
        this.pv = res.data.records.map(record => {
          return {
            "name": record.address,
            "value": record.uv
          }
        })
        this.options.series[0]['data'] = this.pv
        this.initPvMap()
      })
    },
    initPvMap() {
      let map = document.getElementById('map')
      this.chart = echarts.init(map)
      this.chart.setOption(this.options)
      this.resizeWrapper = debounce(this.chart.resize, 100)
      window.addEventListener("resize", this.resizeWrapper)
    }
  },
  mounted() {
    this.initMapOption()
  },
  beforeDestroy() {
      window.removeEventListener("resize", this.resizeWrapper);
  }
}
</script>
<style scoped>
.map_container {
  padding: 0 20px;
  max-width: 800px;
  margin: auto;
  position: relative;
}
.m-card {
  border-radius: 4px;
  border: 1px solid #EBEEF5;
  background-color: #FFF;
  overflow: hidden;
  color: #303133;
  transition: .3s;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.map_container #map {
  height: 550px;
}
</style>