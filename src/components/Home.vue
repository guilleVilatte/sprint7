<template>
    <div class="row">
        <div class="col-12 col-lg-6 mb-3 ms-5 ms-lg-0">
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
            <router-link class="principal" :to="{name:'home',query:{páginaWeb:this.checks[0],campaniaSeo:this.checks[1],campaniaAds:this.checks[2],nPáginas:this.myPages,nIdiomas:this.myIdiomas}}">
            <div class="checks one">
                <input type="checkbox" id="box1" @click="value1" :value="checksValues[0]" v-model="checks[0]"  />
                <label for="box1">Una página web (500 €)</label> 
                <Panel v-if="checks[0] === true" @pag="pages" @idiom="idiomas">
                </Panel>
            </div>
            <div class="checks">
                <input type="checkbox" id="box2" @click="value2" :value="checksValues[1]" v-model="checks[1]" />
                <label for="box2"> Hacer una consultoria SEO (300 €)</label>
            </div>
            <div class="checks">
                <input type="checkbox" id="box3" @click="value3" :value="checksValues[2]" v-model="checks[2]" /> <label for="box2">Una campanya de Google Ads (200 €)</label>
            </div>
            </router-link>
            <div class="total">Precio = {{ total }} €</div>
            <button type="button" class="save btn btn-danger col-3" @click="savePressupost">Guardar</button>
        </div>
        <div class="col-12 col-lg-6">
            <PressupostList 
            :presupuestos="postPresupuestos" 
            @orderOne="alphabeticOrder" 
            @orderTwo="dateOrder"
            @firstOne="restart"
            @buscar="buscarCliente"
            @buscar2="buscarNombrePres"
            @borrar="borrarBusqueda">
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
            checks: [false,false,false],
            myPages: 1,
            myIdiomas: 1,
            checksValues: [0,0,0],
            subtotal: 0,
            total: 0,
            nombrePres: '',
            cliente: '',
            fecha: '',
            postPresupuestos: [],
            servicio: '',
            ordenInicial: [],
            buscoCliente: []
        };
    },
    methods: {
        value1() {
            if (this.checks[0] === false) {
                this.checks[0] = true
                this.checksValues[0] = 500
                this.subtotal = this.myPages * this.myIdiomas * 30
                this.total = this.total + this.checksValues[0] + this.subtotal;
            }
            else {
                this.checks[0] = false
                this.myPages = 1
                this.myIdiomas = 1
                this.total = this.total - this.checksValues[0] - this.subtotal
                this.subtotal = 0
                this.checksValues[0] = 0
            }
        },
        value2() {
            if (this.checks[1] === false) {
                this.checks[1] = true
                this.checksValues[1] = 300
                this.total = this.total + this.checksValues[1]
            }
            else {
                this.checks[1] = false
                this.total = this.total - this.checksValues[1]
                this.checksValues[1] = 0
            }
        },
        value3() {
            if (this.checks[2] === false) {
                this.checks[2] = true
                this.checksValues[2] = 200
                this.total = this.total + this.checksValues[2]
            }
            else {
                this.checks[2] = false;
                this.total = this.total - this.checksValues[2]
                this.checksValues[2] = 0
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
            this.total = this.checksValues[0] + this.checksValues[1] + this.checksValues[2] + this.subtotal
        },
        savePressupost() {
            if (this.checks[0] == true) {
                this.servicio += "'Página web'"
            }
            if (this.checks[1] == true) {
                this.servicio += " 'Consultoría SEO'"
            }
            if (this.checks[2] == true) {
                this.servicio += " 'Google Adds'"
            }

            if (this.cliente != '' && this.nombrePres != '' && this.fecha != '' && this.total != 0) {
                this.postPresupuestos.push({
                    cliente: this.cliente.toLowerCase(),
                    nombrePres: this.nombrePres.toLowerCase(),
                    servicio: this.servicio,
                    fecha: this.fecha,
                    total: this.total
                })
            }

            this.total = 0
            this.myIdiomas = 1
            this.myPages = 1
            this.subtotal = 0
            this.checksValues = [0,0,0]
            this.nombrePres = ''
            this.cliente = ''
            this.servicio = ''
            this.fecha = ''
            this.checks = [false,false,false]
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
            if(this.postPresupuestos.length > 1){
            this.buscoCliente = JSON.parse(JSON.stringify(this.postPresupuestos))
            }
            this.postPresupuestos = this.postPresupuestos.filter(presupuesto => presupuesto.cliente == search1.toLowerCase())
        },
        buscarNombrePres(search2) {
            if(this.postPresupuestos.length > 1){
            this.buscoCliente = JSON.parse(JSON.stringify(this.postPresupuestos))
            }
            this.postPresupuestos = this.postPresupuestos.filter(presupuesto => presupuesto.nombrePres.includes(search2.toLowerCase()))
        },
        borrarBusqueda(){
            this.postPresupuestos = this.buscoCliente
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
.principal{
    text-decoration:none;
    cursor: default;
    color: black;
}
input[type=checkbox]{
    cursor:pointer
}
</style>
