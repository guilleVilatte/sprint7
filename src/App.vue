<template>
  <nav>
    <router-link class="router text-danger" to="/">Presentacion</router-link> |
    <router-link class="router text-danger" to="/home">Home</router-link>
  </nav>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script>
export default{


}
</script>

<style scoped>
nav {
  margin: 10px;
  display: flex;
  justify-content: center;
}
.router {
  margin-bottom: 50px;
  text-decoration:none;
  margin-left: 5px;
  margin-right: 5px;
  color:green;
}

</style>