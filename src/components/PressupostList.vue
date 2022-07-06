<template>
    <div>
        <div class="buscadores d-flex justify-content-center">
            <div class="m-3">
                <div>Cliente</div>
                <input type="text" v-model="search1" >
            </div>
            <div class="m-3">
                <div>Nombre de Presupuesto</div>
                <input type="text" v-model="search2">
            </div>
        </div>
        <div class="botones row d-flex justify-content-center mb-4">
            <button type="button" class="btn btn-danger col-3 me-3" @click="$emit('orderOne')">Orden Alfabético</button>
            <button type="button" class="btn btn-danger col-3 me-3" @click="$emit('orderTwo')">Orden por Fecha</button>
            <button type="button" class="btn btn-danger col-3 me-3" @click="$emit('firstOne')">Reiniciar Orden</button>
        </div>
        <table class="table">
            <thead>
                <tr>
                    <th class="col-3">Cliente</th>
                    <th class="col-3">Nombre de Presupuesto</th>
                    <th class="col-3">Servicio</th>
                    <th class="col-2">Fecha</th>
                    <th class="col-1">Total</th>
                </tr>
            </thead>
            <tbody id="cuerpo">
                <tr v-for="(presupuesto, i) in presupuestos" :key="i">
                    <td>{{ presupuesto.cliente }}</td>
                    <td>{{ presupuesto.nombrePres }}</td>
                    <td>{{ presupuesto.servicio }}</td>
                    <td>{{ presupuesto.fecha }}</td>
                    <td>€{{ presupuesto.total }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: 'PressupostList',
    props: {
        presupuestos: Array
    },
    data() {
        return {
            search1: "",
            search2: ""
        }
    },
    computed:{

    }
}
</script>

<style scoped>
</style>