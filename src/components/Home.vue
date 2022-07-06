<template>
    <div class="row">
        <div class="col-6">
            <h3>¿Que quieres hacer?</h3>
            <div class="cliente">
                <div>Cliente</div>
                <input type="text" id="cliente" v-model="cliente">
            </div>
            <div class="nombrePres">
                <div>Nombre de presupuesto</div>
                <input type="text" id="nombrePres" v-model="nombrePres">
            </div>
            <div class="fecha ">
                <div>Fecha</div>
                <input type="date" id="fecha" v-model="fecha">
            </div>
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
                <input type="checkbox" id="box3" @click="value3" value="third_checkbox" v-model="check3" /> Una campanya
                de
                Google
                Ads (200 €)
            </div>
            <div class="total">Precio = {{ total }} €</div>
            <button type="button" class="save btn btn-danger" @click="savePressupost">Guardar</button>
        </div>
        <div class="col-6">
            <PressupostList 
            :presupuestos="postPresupuestos" 
            @orderOne="alphabeticOrder" 
            @orderTwo="dateOrder"
            @firstOne="restart"
            @buscar="buscarCliente">
            </PressupostList>
        </div>
    </div>
</template>

<script>
import Panel from "./Panel.vue";
import PressupostList from "./PressupostList.vue";

export default {
    data() {
        return {
            check1: false,
            check2: false,
            check3: false,
            myPages: 1,
            myIdiomas: 1,
            check1value: 0,
            check2value: 0,
            check3value: 0,
            subtotal: 0,
            total: 0,
            nombrePres: '',
            cliente: '',
            fecha: '',
            postPresupuestos: [],
            servicio: '',
            ordenInicial: []
        };
    },
    methods: {
        value1() {
            if (this.check1 === false) {
                this.check1 = true
                this.check1value = 500
                this.subtotal = this.myPages * this.myIdiomas * 30
                this.total = this.total + this.check1value + this.subtotal;
            }
            else {
                this.check1 = false
                this.myPages = 1
                this.myIdiomas = 1
                this.total = this.total - this.check1value - this.subtotal
                this.subtotal = 0
                this.check1value = 0
            }
        },
        value2() {
            if (this.check2 === false) {
                this.check2 = true
                this.check2value = 300
                this.total = this.total + this.check2value
            }
            else {
                this.check2 = false
                this.total = this.total - this.check2value
                this.check2value = 0
            }
        },
        value3() {
            if (this.check3 === false) {
                this.check3 = true
                this.check3value = 200
                this.total = this.total + this.check3value
            }
            else {
                this.check3 = false;
                this.total = this.total - this.check3value
                this.check3value = 0
            }
        },
        pages(val) {
            this.myPages = val
            this.incrementar()
        },
        idiomas(val) {
            this.myIdiomas = val
            this.incrementar()
        },
        incrementar() {
            this.subtotal = 0
            this.subtotal = this.myPages * this.myIdiomas * 30
            this.total = this.check1value + this.check2value + this.check3value + this.subtotal
        },
        savePressupost() {
            if (this.check1 == true) {
                this.servicio += "'Página web'"
            }
            if (this.check2 == true) {
                this.servicio += " 'Consultoría SEO'"
            }
            if (this.check3 == true) {
                this.servicio += " 'Google Adds'"
            }

            if (this.cliente != '' && this.nombrePres != '' && this.fecha != '' && this.total != 0) {
                this.postPresupuestos.push({
                    cliente: this.cliente,
                    nombrePres: this.nombrePres,
                    servicio: this.servicio,
                    fecha: this.fecha,
                    total: this.total
                })
            }

            this.total = 0
            this.myIdiomas = 1
            this.myPages = 1
            this.subtotal = 0
            this.check1value = 0
            this.check2value = 0
            this.check3value = 0
            this.nombrePres = ''
            this.cliente = ''
            this.servicio = ''
            this.fecha = ''
            this.check1 = false
            this.check2 = false
            this.check3 = false
        },
        alphabeticOrder() {
            if (this.ordenInicial.length == 0 || this.ordenInicial.length != this.postPresupuestos.length) {
                this.ordenInicial = JSON.parse(JSON.stringify(this.postPresupuestos))
            }
            this.postPresupuestos.sort(function (a, b) {
                if (a.cliente > b.cliente) {
                    return 1;
                }
                if (a.cliente < b.cliente) {
                    return -1;
                }
                if (a.cliente == b.cliente) {
                    if (a.nombrePres > b.nombrePres) {
                        return 1
                    }
                    if (a.nombrePres < b.nombrePres) {
                        return -1
                    }
                }
                return 0;
            })
        },
        dateOrder() {
            if (this.ordenInicial.length == 0) {
                this.ordenInicial = JSON.parse(JSON.stringify(this.postPresupuestos))
            }
            this.postPresupuestos.sort(function (a, b) {
                if (a.fecha > b.fecha) {
                    return 1;
                }
                if (a.fecha < b.fecha) {
                    return -1;
                }
                if (a.fecha == b.fecha) {
                    if (a.cliente > b.cliente) {
                        return 1
                    }
                    if (a.cliente < b.cliente) {
                        return -1
                    }
                }
                return 0;
            })
        },
        restart() {
            if(this.ordenInicial.length != 0){
            this.postPresupuestos = this.ordenInicial
            this.ordenInicial = []
            }
        },
        buscarCliente(search1) {
            this.postPresupuestos.filter(presupuesto => presupuesto.cliente == search1)
        }
    },
    components: { Panel, PressupostList }
}
</script>

<style scoped>
.checks {
    margin-top: 20px;
}

.cliente,
.nombrePres,
.fecha {
    margin-top: 20px;
}

.one {
    margin-bottom: 40px;
}

.total {
    margin-top: 10px;
}

.save {
    margin-top: 10px;
}
</style>
