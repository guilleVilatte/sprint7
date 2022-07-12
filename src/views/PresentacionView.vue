<template>
  <div class="presentacion text-danger">
    <h1>Bienvenidos</h1>
    <h4>Aquí les facilitamos presupuestos para sus próximas paginas web</h4>
    <div class="d-flex justify-content-center">
      <button type="button" class="btn btn-danger mt-5" @click="reDireccionar">Presupuestos</button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'PresentacionView',
  methods:{
    reDireccionar(){
      window.location.href = "http://localhost:8080/home";
    }
  }
}
</script>


<style scoped>
h1, h4{
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  }
</style>