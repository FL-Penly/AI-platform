<template>

  <div style="display: flex;flex-direction: column;height: 950px">

      <div style="text-align: center;position: relative;height: 100px;font-family: SimSun">
          <el-image style="width: 100%;height: 100%"
                    src="./src/assets/image/background.jpg">
          </el-image>
          <div style="position: absolute;bottom: 10px;left: 0;width: 100%;padding: 10px;color: #fff;font-size: 50px;color: #775360;font-weight: bolder">
              育智人工智能建模体验与训练平台
          </div>
      </div>

      <div style="flex: 1;font-family: SimSun;background-color: #e7d5d5">
          <router-view/>
      </div>
  </div>



</template>

<script setup>
</script>

<style scoped>
header {
    background-color: #577149;
    color: white;
    text-align: center;
    padding: 5px;
}

nav {
    font-size: 20px;
    font-weight: bold;
    line-height: 30px;
    height: 600px;
    width: 300px;
    float: left;
    padding: 5px;
}

section {

    width: 1000px;
    height: 800px;
    float: left;
    padding: 10px;
}

footer {
    background-color: #ECDFA6;
    color: white;
    clear: both;
    text-align: center;
    padding: 5px;
}

table {
    width: 100%
}

td {
    text-align: center;
}
</style>