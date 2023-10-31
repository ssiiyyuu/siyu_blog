<template>
  <el-card :body-style="{ padding: '0px' }" class="m-hover card">
    <div slot="header">
      <i class="el-icon-s-opportunity"></i>types
    </div>
    <div class="types">
      <ul>
        <li v-for="t in types" :key="t.id">
          <el-button class="type" @click="clickHandler($event ,t.title)"> {{t.title}} </el-button>
        </li>
      </ul>
    </div>
  </el-card>
</template>
<script>
export default {
  name: 'type-card',
  methods: {
    clickHandler(evt, title) {
      let target = evt.target;
      if(target.nodeName == "SPAN"){
          target = evt.target.parentNode;
      }
      target.blur();

      return this.$router.push({
          name: 'search',
          params: {'mode': 'type', 'query': title, 'page': 1}
      })

    }
  },
  props: {
    types: Array
  },
  data() {
    return {
    }
  }
}
</script>
<style scoped>
@import "../style/m.css";
.card {
  border-top: 2px solid rgb(33,133,208) !important;
}
.types {
  padding: 25px 20px;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.el-button {
  background-color: rgb(0,181,173);
  color: white;
  font-weight: bold;
  border: 0;
  opacity: 0.8;
}
.el-button:hover{
  background-color: rgb(0,181,173);
  color: white;
  opacity: 1;
}
.type {
  width: 90%;
  margin: 5px 10px;
}
</style>