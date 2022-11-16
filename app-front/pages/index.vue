<template>
    <div>
        <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>

        <div id="rodape_lateral">

            <div class="invent-cards">
                <h1 class="titulo_pag" v-if="inicioView">Bank Bank</h1>
                <h1 class="titulo_pag" v-if="marketplaceView">Marketplace</h1>
                <h1 class="titulo_pag" v-if="acoesView">Mercado de ações</h1>
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-navbar-nav>
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = true
                        marketplaceView = false
                        acoesView = false">
                        <h3 class="buttn_icon_menu">Página inicial</h3>
                    </b-nav-item>

                    <!-- Botão do marketplace -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = true
                        acoesView = false">
                        <h3 class="buttn_icon_menu">Marketplace</h3>
                    </b-nav-item>

                    <!-- Botão de Ações -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = false
                        acoesView = true">
                        <h3 class="buttn_icon_menu">Mercado de Ações</h3>
                    </b-nav-item>
                </b-navbar-nav>
            </div>
        </div>

        <div class="invent-cards content_page" v-if="inicioView">
            <h2>Olá Testador!</h2><hr />

            <div id="btn_operacoes">
                <i class="fas fa-stopwatch"></i> Funções rápidas
                <hr />

                <div id="itens_fnc_rapida">
                    <div class='item_fnc_rapida'>
                        PIX
                        <hr />
                        <p class="btn_item"><i class="fas fa-wallet"></i> Pagar</p>
                        <p class="btn_item"><i class="fas fa-key"></i> Registrar chave</p>
                    </div>

                    <div class='item_fnc_rapida'>
                        Pagamentos <i class="fas fa-dollar-sign"></i>
                        <hr />
                        <p class="btn_item"><i class="fas fa-wallet"></i> Transferir</p>
                        <p class="btn_item"><i class="fas fa-receipt"></i> Receber</p>
                    </div>

                    <div class='item_fnc_rapida'>
                        Recargas <i class="fas fa-bolt"></i>
                        <hr />
                        <p class="btn_item"><i class="fas fa-mobile"></i> Celular</p>
                        <p class="btn_item"><i class="fas fa-passport"></i> Bilhete único</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="invent-cards content_page" v-if="marketplaceView">
            <div>
                <h2>Bem vindo ao Marketplace</h2>

                <h2 style="float: right; margin-top: -46px; margin-right: 20px;">Carrinho <i class="fas fa-dolly"></i></h2>
            </div><hr />
            <input type="text" class="search" placeholder="Pesquisa">

            <div id="lista_itens_marketplace">
                <div class="item_market_place"></div>
                <div class="item_market_place"></div>
                <div class="item_market_place"></div>
                <div class="item_market_place"></div>
            </div>
        </div>

        <div class="invent-cards content_page" v-if="acoesView">
            <h2>Mercado de ações</h2><hr />

            <input type="text" class="search" placeholder="Pesquisa">

            <div id="banner_mercado_acoes">

            </div>

            <hr />
            <h4>Ações em destaque <i class="fas fa-crown"></i></h4>

            <div id="lista_empresas_mercado">
                <div class="item_m_acoes"></div>
                <div class="item_m_acoes"></div>
                <div class="item_m_acoes"></div>
                <div class="item_m_acoes"></div>
                <div class="item_m_acoes"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ store, $axios, redirect }) {
        console.log(`STATE: ${store.state.authenticationToken}`)
        const authToken = typeof window !== 'undefined' ? store.state.authenticationToken : null
        // se tiver carregando client side, recupera o token do usuário

        // Check if user is logged in.
        if (authToken === null) {
            // This means that there ISN'T JWT and no user is logged in.
            $axios.defaults.headers.common.Authorization = null;
            redirect("/");
        } else {
            // This means that there IS a JWT so someone must be logged in.
            $axios.defaults.headers.common.Authorization = `Bearer ${authToken}`; // salva o token para usar nos headers nas requisições
        }

        let produtos, conta, acoes, lojas, transferencias;
        const identificador = 0;

        try {
            const response = await $axios.$get(`conta/${identificador}`);
            conta = response;
        } catch (ex) {
            console.log(ex);
        }

        try {
            const response = await $axios.$get('produto');
            produtos = response;
        } catch (ex) {
            console.log(ex);
        }

        try {
            const response = await $axios.$get('acao');
            acoes = response;
        } catch (ex) {
            console.log(ex);
        }

        try {
            const response = await $axios.$get('loja');
            lojas = response;
        } catch (ex) {
            console.log(ex);
        }

        try {
            const response = await $axios.$get('transferencia');
            transferencias = response;
        } catch (ex) {
            console.log(ex);
        }

        return { produtos, conta, acoes, lojas, transferencias }
    },

    name: 'IndexPage',
    data: function () {
        return {
            show: false,
            inicioView: true,
            marketplaceView: false,
            acoesView: false,

            conta: {
                nome: 'Testômetro',
                tipo: 0, // 0 - Usuário comum, 1 - adm, 2 - vendedor/loja
                endereco: null,
                saldo: 0,
            },

            acoes: [],
            lojas: [],
            produtos: [],
            transferencias: []
        };
    },

    methods: {

    }
}
</script>
  
<style scoped>
@import '../static/style.css';
@import '../static/animations.css';
</style>