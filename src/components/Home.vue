<template>
    <div>
        <h3>¿Que quieres hacer?</h3>
        <div class="checks one">
            <input type="checkbox" id="box1" @click="value1" value="first_checkbox" v-model="check1" />
            Una página web (500 €)
            <Panel v-if="check1 === true" @pag="pages" @idiom="idiomas">
            </Panel>
        </div>
        <div class="checks">
            <input type="checkbox" id="box2" @click="value2" value="second_checkbox" v-model="check2" />
            Hacer una consultoria SEO (300 €)
        </div>
        <div class="checks">
            <input type="checkbox" id="box3" @click="value3" value="third_checkbox" v-model="check3" /> Una campanya de
            Google
            Ads (200 €)
        </div>
        <div class="total">Precio = {{ total }} €</div>
    </div>
</template>

<script>
import Panel from "../components/Panel.vue";

export default {
    components: {
        Panel
    },
    data() {
        return {
            check1: false,
            check2: false,
            check3: false,
            myPages: 1,
            myIdiomas: 1,
            check1value: 0,
            subtotal:0,
            total: 0
        };
    },
    methods: {
        value1() {
            if (this.check1 === false) {
                this.check1 = true;
                this.check1value = 500;
                this.total = this.total + this.check1value;
            }
            else {
                this.myIdiomas = 1;
                this.myPages = 1
                this.total = this.total - this.check1value;
                this.check1value = 0;

            }
        },
        value2() {
            if (this.check2 === false) {
                this.check2 = true;
                this.total = this.total + 300;
            }
            else {
                this.total = this.total - 300;
            }
        },
        value3() {
            if (this.check3 === false) {
                this.check3 = true;
                this.total = this.total + 200;
            }
            else {
                this.total = this.total - 200;
            }
        },
        pages(val) {
            this.myPages = val;
            this.incrementar()
        },
        idiomas(val) {
            this.myIdiomas = val;
            this.incrementar()
        },
        incrementar(){
            this.subtotal = 0
            this.subtotal = this.myPages*this.myIdiomas*30
            this.total = this.check1value + this.subtotal
        }
    },
    components: { Panel }
};
</script>

<style scoped>
.checks {
    margin-top: 20px;
}

.one {
    margin-bottom: 40px;
}
</style>
