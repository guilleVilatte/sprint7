<template>
  <div class="numbers">
    <div>
      <div>Número de páginas </div>
      <div>
        <button type="button" class="btn btn-danger" @click="sumaPage">+</button>
      </div>
      <div>
        <input type="text" id="page" v-model="pages">
      </div>
      <div>
        <button type="button" class="btn btn-danger" @click="restaPage">-</button>
      </div>
    </div>
    <div>
      <div>Número de idiomas </div>
      <div>
        <button type="button" class="btn btn-danger" @click="sumaIdiom">+</button>
      </div>
      <div>
        <input type="text" id="lengua" v-model="idiomas">
      </div>
      <div>
        <button type="button" class="btn btn-danger" @click="restaIdiom">-</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  data() {
    return {
      pages: 1,
      idiomas: 1
    }
  },
  watch: {
    pages: function () {
      this.$emit("pag", this.pages)
    },
    idiomas: function () {
      this.$emit("idiom", this.idiomas)
    }
  },
  methods:{
     sumaPage(){
      this.pages++
    },
    sumaIdiom(){
      this.idiomas++ 
    },
    restaPage(){
      if(this.pages > 1)
      this.pages--  
    },
    restaIdiom(){
      if(this.idiomas > 1)
      this.idiomas--
    }
  }
}
</script>

<style scoped>
.numbers {
  padding: 10px;
  border: 3px solid black;
  border-radius: 8px;
  width: 350px;
}

.numbers div {
  margin-bottom: 10px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

input {
  width: 50px;
}
</style>
