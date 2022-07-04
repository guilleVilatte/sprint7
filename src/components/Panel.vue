<template>
  <div class="numbers">
    <div>
      <div class="numPag">Número de páginas </div>
      <div>
        <button type="button" class="btn btn-danger" @click="sumaPage">+</button>
      </div>
      <div>
        <input type="text" id="page" v-model="pages">
      </div>
      <div class="resta">
        <button type="button" class="btn btn-danger" @click="restaPage">-</button>
      </div>
      <div type="button" @click="showModal1 = true">
        <img src="../../public/img/icon.jpg" alt="">
      </div>
      <transition>
        <div class="modal-overlay" @click="showModal1 = false" v-if="showModal1"></div>
      </transition>
      <transition>
        <div class="modal" v-if="showModal1">En este componente debes indicar el numero de páginas que tendrá tu sitio
          web</div>
      </transition>
    </div>
    <div>
      <div class="numPag">Número de idiomas </div>
      <div>
        <button type="button" class="btn btn-danger" @click="sumaIdiom">+</button>
      </div>
      <div>
        <input type="text" id="lengua" v-model="idiomas">
      </div>
      <div class="resta">
        <button type="button" class="btn btn-danger" @click="restaIdiom">-</button>
      </div>
      <div type="button" @click="showModal2 = true">
        <img src="../../public/img/icon.jpg" alt="">
      </div>
      <transition>
        <div class="modal-overlay" @click="showModal2 = false" v-if="showModal2"></div>
      </transition>
      <transition>
        <div class="modal" v-if="showModal2">En este componente debes indicar el numero de idiomas que tendrá tu sitio
          web</div>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Panel',
  data() {
    return {
      pages: 1,
      idiomas: 1,
      showModal1: false,
      showModal2: false
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
  methods: {
    sumaPage() {
      this.pages++
    },
    sumaIdiom() {
      this.idiomas++
    },
    restaPage() {
      if (this.pages > 0)
        this.pages--
    },
    restaIdiom() {
      if (this.idiomas > 0)
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
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.numPag{
  margin-right: 5px;
}

input {
  width: 50px;
  margin-left: 5px;
  margin-right: 5px;
  border: none;
  text-align: center;
}

img {
  width: 40px;
  height: 40px;
}

.resta {
  margin-right: 5px;
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
}

.modal {
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  height: 100px;
  width: 60%;
  text-align: center;
  line-height: 80px;
  position: fixed;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media (max-width: 950px) {
  .modal {
    height: 100px;
    width: 100%;
    line-height: 40px;
  }
}

@media (max-width: 450px) {
  .numbers {
    padding: 5px;
    border: 3px solid black;
    border-radius: 8px;
    width: 300px;
  }
}
</style>
