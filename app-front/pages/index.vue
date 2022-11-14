<template>
    <div>
        <div id="rodape_lateral">

            <div class="invent-cards">
                <h1 class="titulo_pag" v-if="inicioView">Olá Teste</h1>
                <h1 class="titulo_pag" v-if="marketplaceView">Marketplace</h1>
                <h1 class="titulo_pag" v-if="acoesView">Mercado de ações</h1>
                <h1 class="titulo_pag" v-if="operacoesView">Operações</h1>
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-navbar-nav>
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = true
                        marketplaceView = false
                        acoesView = false
                        operacoesView = false">
                        <h3 class="buttn_icon_menu">Página inicial</h3>
                    </b-nav-item>

                    <!-- Botão do marketplace -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = true
                        acoesView = false
                        operacoesView = false">
                        <h3 class="buttn_icon_menu">Marketplace</h3>
                    </b-nav-item>

                    <!-- Botão de Ações -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = false
                        acoesView = true
                        operacoesView = false">
                        <h3 class="buttn_icon_menu">Mercado de Ações</h3>
                    </b-nav-item>

                    <!-- Botão das Operações -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = false
                        acoesView = false
                        operacoesView = true">
                        <h3 class="buttn_icon_menu">Operações</h3>
                    </b-nav-item>
                </b-navbar-nav>
            </div>
        </div>

        <div class="invent-cards" v-if="marketplaceView">
            
        </div>

        <div class="invent-cards" v-if="acoesView">
        
        </div>

        <div class="invent-cards" v-if="operacoesView">
            
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
            operacoesView: false,

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