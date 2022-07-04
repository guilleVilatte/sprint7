<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Nombre de Presupuesto</th>
                    <th scope="col">Servicio</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody id="cuerpo">
                <tr v-for="(presupuesto,i) in presupuestos" :key="i">
                    <td>{{presupuesto.cliente}}</td>
                    <td>{{presupuesto.nombrePres}}</td>
                    <td>{{presupuesto.servicio}}</td>
                    <td>€{{presupuesto.total}}</td>
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
    }
}
</script>

<style>
</style>