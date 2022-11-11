<template>
    <div>
        <div id="rodape_topo">

            <div class="invent-cards">
                <h1 class="titulo_pag" v-if="inicioView">Olá Teste</h1>
                <h1 class="titulo_pag" v-if="marketplaceView">Marketplace</h1>
                <h1 class="titulo_pag" v-if="acoesView">Mercado de ações</h1>
                <h1 class="titulo_pag" v-if="transferenciasView">Operações</h1>
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-nav-item class='icons_nav_menu' @click="
                    inicioView = true
                    marketplaceView = false
                    acoesView = false
                    transferenciasView = false">
                    Página inicial
                </b-nav-item>

                <!-- Botão do marketplace -->
                <b-nav-item class='icons_nav_menu' @click="
                    inicioView = false
                    marketplaceView = true
                    acoesView = false
                    transferenciasView = false">
                    Marketplace
                </b-nav-item>

                <!-- Botão de Ações -->
                <b-nav-item class='icons_nav_menu' @click="
                    inicioView = false
                    marketplaceView = false
                    acoesView = true
                    transferenciasView = false">
                    Mercado de Ações
                </b-nav-item>

                <!-- Botão das Operações -->
                <b-nav-item class='icons_nav_menu' @click="
                    inicioView = false
                    marketplaceView = false
                    acoesView = false
                    transferenciasView = true">
                    Operações
                </b-nav-item>
            </div>
        </div>

        <div class="invent-cards" v-if="marketplaceView">
        
        </div>

        <div class="invent-cards" v-if="acoesView">
        
        </div>

        <div class="invent-cards" v-if="transferenciasView">
            
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ store, $axios, redirect }) {
        console.log(`STATE: ${store.state.authenticationToken}`)
        const authToken = typeof window !== 'undefined' ? store.state.authenticationToken : null // se tiver carregando client side, recupera o token do usuário

        // Check if user is logged in.
        if (authToken === null) {
            // This means that there ISN'T JWT and no user is logged in.
            $axios.defaults.headers.common.Authorization = null;
            redirect("/");
        } else {
            // This means that there IS a JWT so someone must be logged in.
            $axios.defaults.headers.common.Authorization = `Bearer ${authToken}`; // salva o token para usar nos headers nas requisições
        }

        let vendedores, conta;
        const identificador = 0;

        try {
            const response = await $axios.$get(`conta/${identificador}`);
            conta = response;
        } catch (ex) {
            console.log(ex);
        }
      
        try {
            const response = await $axios.$get('vendedores');
            vendedores = response;
        } catch (ex) {
            console.log(ex);
        }

        return { vendedores, conta }
    },

    name: 'IndexPage',
    data: function () {
        return {
            show: false,
            inicioView: true,
            marketplaceView: false,
            acoesView: false,
            transferenciasView: false,

            conta: {
                nome: 'Testômetro',
                endereco: null,
                saldo: 0,
            },

            vendedores: []
        };
    },

    methods: {

    }
}
</script>
  
<style scoped>
@import '../static/style.css';
</style>