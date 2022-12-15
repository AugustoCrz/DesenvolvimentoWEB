<template>
    <div>
        <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>

        <div id="rodape_lateral">
            <div class="invent-cards">
                <img id="logo_app" src="logo.png" />
                <h1 class="titulo_pag" v-if="inicioView">UpBank</h1>
                <h1 class="titulo_pag" v-if="marketplaceView">Marketplace</h1>
                <h1 class="titulo_pag" v-if="acoesView">Mercado de ações</h1>
                <h1 class="titulo_pag" v-if="configsView">Configurações</h1>
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-navbar-nav>
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = true
                        marketplaceView = false
                        acoesView = false
                        configsView = false
                        lojaPainelView = false">
                        <h3 class="buttn_icon_menu">Página inicial</h3>
                    </b-nav-item>

                    <!-- Botão do marketplace -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = true
                        acoesView = false
                        configsView = false
                        lojaPainelView = false">
                        <h3 class="buttn_icon_menu">Marketplace</h3>
                    </b-nav-item>

                    <!-- Botão de Ações -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = false
                        acoesView = true
                        configsView = false
                        lojaPainelView = false">
                        <h3 class="buttn_icon_menu">Mercado de Ações</h3>
                    </b-nav-item>

                    <!-- Botão de Configurações -->
                    <b-nav-item class='icons_nav_menu' @click="
                        inicioView = false
                        marketplaceView = false
                        acoesView = false
                        configsView = true
                        lojaPainelView = false">
                        <h3 class="buttn_icon_menu">Configurações</h3>
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
            <input type="text" class="search" placeholder="Pesquisar por um produto">

            <div id="lista_lojas_destaque_marketplace" v-if="(lojas.length > 0)">

                <br />
                <h4>Lojas em destaque <i class="fas fa-store"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="(loja, index) in lojas" v-if="(index <= 2)">
                        <a href="#">
                            <div class="item_loja_market_place_destaque" @click="abrir_painel_loja(loja)">
                                <h3>{{loja.nome}}</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <hr v-if="(produtos.length > 0)"/>
            <h4 v-if="(produtos.length > 0)">Produtos em destaque <i class="fas fa-store"></i></h4>

            <div id="lista_itens_marketplace">
                <div v-for="produto in produtos">
                    <div class="item_market_place">
                        <h2>{{produto.nome}}</h2>
                    </div>
                </div>
            </div>

            <div id="painel_loja_preview" v-if="lojaPainelView">
                <h2>{{objetoLoja.nome}} <i class="fas fa-store"></i></h2>

                <p class="btn_item" style="float: right; margin-top: 25px;" @click="lojaPainelView = false">Retornar</p>

                <hr />
                <p class="btn_item inserir_produto" v-b-modal.modal-produto @click="objeto_foco(1)"><i class="fas fa-plus"></i> Inserir novo produto</p>

                <div id="lista_itens_marketplace">
                    <div v-for="produto in produtos_loja">
                        <div class="item_market_place">
                            <h2>{{produto.nome}}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="invent-cards content_page" v-if="acoesView">
            <h2>Mercado de ações</h2>
            <hr />

            <input type="text" class="search" placeholder="Pesquisa">

            <div id="banner_mercado_acoes">

            </div>
            <hr v-if="(acoes.length > 0)"/>
            <h4 v-if="(acoes.length > 0)">Ações em destaque <i class="fas fa-crown"></i></h4>

            <div id="lista_empresas_mercado">
                <div v-for="(acao, index) in acoes" v-if="index < 5">
                    <div class="item_m_acoes">
                        <h3 style="float: left;" class="infos_acao">{{acao.nome}}</h3>
                        <h1 style="float: right;" class="infos_acao">R${{acao.preco}}</h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="invent-cards content_page" v-if="configsView">
            <h2>Configurações</h2>
            <hr />

            <div id="itens_fnc_rapida">
                <div class='item_fnc_rapida'>
                    Lojas <i class="fas fa-store"></i>
                    <hr />
                    <p class="btn_item" v-b-modal.modal-loja @click="objeto_foco(0)"><i class="fas fa-plus"></i> Cadastrar nova</p>

                    <p class="btn_item" v-if="lojas.length > 0" @click="ordena_amostragem(0)"><i class="fas fa-folder-open"></i> Exibir todas</p>
                </div>

                <div class='item_fnc_rapida' v-if="lojas.length > 0">
                    Produtos <i class="fas fa-cube"></i>
                    <hr />
                    <p class="btn_item" v-b-modal.modal-produto @click="objeto_foco(1)"><i class="fas fa-plus"></i> Inserir novo</p>

                    <p class="btn_item" v-if="produtos.length > 0" @click="ordena_amostragem(1)"><i class="fas fa-folder-open"></i> Exibir todos</p>
                </div>

                <div class='item_fnc_rapida'>
                    Ações <i class="fas fa-dollar-sign"></i>
                    <hr />
                    <p class="btn_item" v-b-modal.modal-acao @click="objeto_foco(2)"><i class="fas fa-plus"></i> Inserir nova</p>

                    <p class="btn_item" v-if="acoes.length > 0" @click="ordena_amostragem(2)"><i class="fas fa-folder-open"></i> Exibir todas</p>
                </div>
            </div>

            <div v-if="lojasRegistradasView">
                <hr />
                <h4>Lojas registradas <i class="fas fa-store"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="loja in lojas">
                        <div class="item_loja_market_place">
                            <h3>{{loja.nome}}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="produtosRegistradosView">
                <hr />
                <h4>Produtos registrados <i class="fas fa-cube"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="produto in produtos">
                        <div class="item_loja_market_place">
                            <h3>{{produto.nome}}</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="acoesRegistradasView">
                <hr />
                <h4>Ações registradas <i class="fas fa-dollar-sign"></i></h4>

                <div id="lista_empresas_mercado">
                    <div v-for="acao in acoes">
                        <div class="item_m_acoes">
                            <h3 style="float: left;" class="infos_acao">{{acao.nome}}</h3>
                            <h1 style="float: right;" class="infos_acao">R${{acao.preco}}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal para inserir ou editar lojas -->
        <b-modal id="modal-loja" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_loja" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome_loja">Nome da loja:</label>
                    <b-form-input id="input_nome_loja" v-model="objetoLoja.nome" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Rei dos descontos" required></b-form-input> 
                    <br /> 

                    <label class="mr-sm-2" for="input_endereco_loja">Endereço da loja:</label>
                    <b-form-input id="input_endereco_loja" v-model="objetoLoja.endereco" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Rua das flores douradas, 24 - Centro - Ratanabá" required></b-form-input> 
                    <br /> 

                    <label class="mr-sm-2" for="input-telefone">Telefone:</label>
                    <b-form-input v-model="objetoLoja.telefone" id="input-telefone" class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="(11) 8445-2382" required></b-form-input>
                    <br /><br />

                    <b-button v-if="!btn_edit_loja" type="submit" variant="primary"
                        @click="prancheta_acao = !prancheta_acao">Cadastrar</b-button>
                    <b-button v-if="btn_edit_loja" type="submit" variant="primary"
                        @click="btn_edit_loja = !btn_edit_loja">Atualizar</b-button>

                    <b-button type="reset" variant="danger">Limpar formulário</b-button>
                </b-form>
            </b-overlay>
        </b-modal>

        <!-- Modal para inserir ou editar produto -->
        <b-modal id="modal-produto" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_produto" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome_produto">Nome do item:</label>
                    <b-form-input id="input_nome_produto" v-model="objetoProduto.nome" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Chinelos" required></b-form-input> <br /> 

                    <label class="mr-sm-2" for="input-quantidade">Quantidade em estoque:</label>
                    <b-form-input v-model="objetoProduto.quantidade" id="input-quantidade" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input-preco">Preço:</label>
                    <b-form-input v-model="objetoProduto.preco" id="input-preco" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_tipo">Categoria:</label>
                    <b-form-select id="input_tipo" v-bind:options="categorias_produto" v-model="objetoProduto.categoria"
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

        <!-- Modal para inserir ou editar ações -->
        <b-modal id="modal-acao" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_acao" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome_acao">Nome da ação:</label>
                    <b-form-input id="input_nome_acao" v-model="objetoAcao.nome" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: PETR4" required></b-form-input> 
                    <br /> 

                    <label class="mr-sm-2" for="input-tipo">Tipo de ação:</label>
                    <b-form-input v-model="objetoAcao.tipo" id="input-tipo" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Refinaria" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input-preco">Preço:</label>
                    <b-form-input v-model="objetoAcao.preco" id="input-preco" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br /><br />

                    <b-button v-if="!btn_edit_acao" type="submit" variant="primary"
                        @click="prancheta_acao = !prancheta_acao">Cadastrar</b-button>
                    <b-button v-if="btn_edit_acao" type="submit" variant="primary"
                        @click="btn_edit_acao = !btn_edit_acao">Atualizar</b-button>

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

        // try {
        //     const response = await $axios.$get('transferencia');
        //     transferencias = response;
        // } catch (ex) {
        //     console.log(ex);
        // }

        return { conta, lojas, produtos, acoes, transferencias }
    },

    name: 'IndexPage',
    data: function () {
        return {
            show: false,
            inicioView: true,
            marketplaceView: false,
            acoesView: false,
            configsView: false,

            lojasRegistradasView: false,
            produtosRegistradosView: false,
            acoesRegistradasView: false,

            viewConfigAnterior: false,

            lojaPainelView: false,

            tab_acao: false,
            tab_loja: false,
            tab_conta: false,
            tab_produto: false,
            tab_transferencias: false,

            operacao: this.createNewLoja,

            titulo_modal: 'Cadastro de produto',

            btn_edit_loja: false,
            btn_edit_acao: false,
            btn_edit_produto: false,

            prancheta_acao: false,
            prancheta_loja: false,
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

            objetoConta: {
                nome: null,
                sobrenome: null,
                endereco: null,
                saldo: 0
            },

            objetoLoja: {
                nome: null,
                endereco: null,
                telefone: null,
                vendas: 0,
                saldo: 0
            },

            objetoProduto: {
                nome: null,
                quantidade: null,
                categoria: null,
                preco: null,
                idLoja: 0
            },

            objetoAcao: {
                nome: null,
                tipo: null,
                preco: null
            },

            objetoTransferencia: {
                data: null,
                conta: null,
                conta_alvo: null,
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
            produtos_loja: [],
            transferencias: []
        };
    },

    methods: {

        objeto_foco: function(caso){

            // 0 -> Loja, 1 -> Produto, 2 -> Ação
            if(caso == 0){ // Loja
                this.objetoLoja = {
                    nome: null,
                    endereco: null,
                    telefone: null,
                    vendas: 0,
                    saldo: 0
                }

                this.btn_edit_loja = false;
                this.titulo_modal = "Nova Loja";
                this.operacao = this.createNewLoja;
            }else if(caso == 1){
                this.objetoProduto = {
                    nome: null,
                    quantidade: null,
                    categoria: null,
                    preco: null,
                    idLoja: 0
                },

                this.btn_edit_produto = false;
                this.titulo_modal = "Cadastro de Produto";
                this.operacao = this.createNewProduto;
            }else{
                this.objetoAcao = {
                    nome: null,
                    tipo: null,
                    preco: null
                },

                this.btn_edit_acao = false;
                this.titulo_modal = "Cadastro de Ação";
                this.operacao = this.createNewAcao;
            }
        },

        ordena_amostragem: function (caso){

            // 0 -> Lojas, 1 -> Produtos, 2 -> Ações 
            this.lojasRegistradasView = false;
            this.produtosRegistradosView = false;
            this.acoesRegistradasView = false;

            if(caso !== this.viewConfigAnterior){
                if(caso == 0)
                    this.lojasRegistradasView = true;
                else if(caso == 1)
                    this.produtosRegistradosView = true;
                else
                    this.acoesRegistradasView = true;
            }else{
                this.lojasRegistradasView = false;
                this.produtosRegistradosView = false;
                this.acoesRegistradasView = false;

                caso = null;
            }

            this.viewConfigAnterior = caso
        },

        abrir_painel_loja: function (dados) {

            this.lojaPainelView = true;
            this.objetoLoja = dados;
            this.objetoProduto.idLoja = dados.id;

            this.produtos_loja = [];

            for(let i = 0; i < this.produtos.length; i++){
                if(this.produtos[i].idLoja == dados.id)
                    this.produtos_loja.push(this.produtos[i])
            }
        },

        createNewConta: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("conta", this.objetoConta)
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
                .$post("loja", this.objetoLoja)
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
                .$post("produto", this.objetoProduto)
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
                .$post("acao", this.objetoAcao)
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
                .$post("transferencia", this.objetoLoja)
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