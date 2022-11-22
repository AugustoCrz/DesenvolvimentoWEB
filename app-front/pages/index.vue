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
            <h2>Olá Testador!</h2>
            <hr />

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

                <h2 style="float: right; margin-top: -46px; margin-right: 20px;">Carrinho <i class="fas fa-dolly"></i>
                </h2>
            </div>
            <hr />
            <input type="text" class="search" placeholder="Pesquisa">

            <div id="lista_itens_marketplace">
                <div v-for="produto in produtos">
                    <div class="item_market_place"></div>
                </div>
            </div>

            <button v-b-modal.modal-produto>Inserir Produtos</button>
        </div>

        <div class="invent-cards content_page" v-if="acoesView">
            <h2>Mercado de ações</h2>
            <hr />

            <input type="text" class="search" placeholder="Pesquisa">

            <div id="banner_mercado_acoes">

            </div>
            <hr />
            <h4>Ações em destaque <i class="fas fa-crown"></i></h4>

            <div id="lista_empresas_mercado">
                <div v-for="(acao, index) in acoes" v-if="index < 5">
                    <div class="item_m_acoes"></div>
                </div>
            </div>
        </div>

        <!-- Modal para inserir ou editar produto -->
        <b-modal id="modal-produto" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_produto" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome_produto">Nome do item:</label>
                    <b-form-input id="input_nome_produto" v-model="novoProduto.nome" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Chinelos" required></b-form-input> <br /> 

                    <label class="mr-sm-2" for="input-quantidade">Quantidade em estoque:</label>
                    <b-form-input v-model="novoProduto.quantidade" id="input-quantidade" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br>

                    <label class="mr-sm-2" for="input-valor">Preço:</label>
                    <b-form-input v-model="novoProduto.valor" id="input-valor" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br>

                    <label class="mr-sm-2" for="input_tipo">Categoria:</label>
                    <b-form-select id="input_tipo" v-bind:options="categorias_produto" v-model="novoProduto.categoria"
                        v-bind:value="null" required>
                    </b-form-select> <br /> <br /> 
                    

                    <b-button v-if="!btn_edit_produto" type="submit" variant="primary"
                        @click="prancheta_produto = !prancheta_produto">Cadastrar</b-button>
                    <b-button v-if="btn_edit_produto" type="submit" variant="primary"
                        @click="btn_edit_produto = !btn_edit_produto">Atualizar</b-button>

                    <b-button type="reset" variant="danger">Limpar formulário</b-button>
                </b-form>
            </b-overlay>
        </b-modal>
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

        return { conta, lojas, produtos, acoes, transferencias }
    },

    name: 'IndexPage',
    data: function () {
        return {
            show: false,
            inicioView: true,
            marketplaceView: false,
            acoesView: false,

            tab_acao: false,
            tab_loja: false,
            tab_conta: false,
            tab_produto: false,
            tab_transferencias: false,

            operacao: this.createNewProduto,

            titulo_modal: 'Cadastro de produto',

            btn_edit_produto: false,

            prancheta_produto: false,

            categorias_produto: [
                { text: "Selecione um:", value: null },
                "Utensílios",
                "Eletrônicos",
                "Roupa e Banho",
                "Ferramentas",
                "Peças para automóveis",
                "Pneus",
                "Produtos de Limpeza"
            ],

            novaConta: {
                nome: null,
                sobrenome: null,
                endereco: null,
                saldo: null
            },

            novaLoja: {
                nome: null,
            },

            novoProduto: {
                nome: null,
                quantidade: null,
                categoria: null,
                valor: null,
                idLoja: 0
            },

            novaAcao: {
                nome: null,
                tipo: null,
                valor: null
            },

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
        createNewConta: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("conta", this.novaConta)
                .then(() => {
                    this.updateConta();
                })
                .catch((error) => {
                    console.error('Não foi possível criar uma nova conta');
                    console.log(error);
                });

            this.$bvModal.hide('modal-conta');
            this.tab_conta = false;
        },

        updateConta: function () {
            this.$axios.$get("conta").then((response) => {
                this.conta = response;
            })
        },

        removeSelectedConta: function (id) {
            this.$axios.$delete(`conta/${id}`).then(() => {
                this.updateConta();
            })
        },

        createNewLoja: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("loja", this.novaLoja)
                .then(() => {
                    this.updateLoja();
                })
                .catch((error) => {
                    console.error('Não foi possível criar uma nova loja');
                    console.log(error);
                });

            this.$bvModal.hide('modal-loja');
            this.tab_loja = false;
        },

        updateLoja: function () {
            this.$axios.$get("loja").then((response) => {
                this.lojas = response;
            })
        },

        removeSelectedLoja: function (id) {
            this.$axios.$delete(`loja/${id}`).then(() => {
                this.updateLoja();
            })
        },

        createNewProduto: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("produto", this.novoProduto)
                .then(() => {
                    this.updateProduto();
                })
                .catch((error) => {
                    console.error('Não foi possível criar um novo produto');
                    console.log(error);
                });

            this.$bvModal.hide('modal-produto');
            this.tab_produto = false;
        },

        updateProduto: function () {
            this.$axios.$get("produto").then((response) => {
                this.produtos = response;
            })
        },

        removeSelectedProduto: function (id) {
            this.$axios.$delete(`produto/${id}`).then(() => {
                this.updateProduto();
            })
        },

        createNewAcao: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("acao", this.novaAcao)
                .then(() => {
                    this.updateAcao();
                })
                .catch((error) => {
                    console.error('Não foi possível criar uma nova ação');
                    console.log(error);
                });

            this.$bvModal.hide('modal-acao');
            this.tab_acao = false;
        },

        updateAcao: function () {
            this.$axios.$get("acao").then((response) => {
                this.acoes = response;
            })
        },

        removeSelectedAcao: function (id) {
            this.$axios.$delete(`acao/${id}`).then(() => {
                this.updateAcao();
            })
        },

        createNewTransferencia: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("transferencia", this.novaLoja)
                .then(() => {
                    this.updateTransferencia();
                })
                .catch((error) => {
                    console.error('Não foi possível registrar uma nova transferência');
                    console.log(error);
                });

            this.$bvModal.hide('modal-transferencia');
            this.tab_transferencias = false;
        },

        updateTransferencia: function () {
            this.$axios.$get("transferencia").then((response) => {
                this.transferencias = response;
            })
        },

        removeSelectedTransferencia: function (id) {
            this.$axios.$delete(`transferencia/${id}`).then(() => {
                this.updateTransferencia();
            })
        },
    }
}
</script>
  
<style scoped>
@import '../static/style.css';
@import '../static/animations.css';
</style>