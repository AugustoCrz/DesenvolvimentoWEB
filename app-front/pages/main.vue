<template>
    <div>
        <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>

        <div id="rodape_lateral">
            <div class="invent-cards">
                <img id="logo_app" src="logo.png" />
            </div>

            <div id="buttons_nav">
                <!-- Botão de Inicio -->
                <b-navbar-nav>
                    <b-nav-item class='icons_nav_menu' v-on:click="desativa_views(0)">
                        <h3 class="buttn_icon_menu">Página inicial</h3>
                    </b-nav-item>

                    <!-- Botão do marketplace -->
                    <b-nav-item v-if="lojas.length > 0" class='icons_nav_menu' v-on:click="
                        desativa_views(1)">
                        <h3 class="buttn_icon_menu">Marketplace</h3>
                    </b-nav-item>

                    <!-- Botão de Ações -->
                    <b-nav-item v-if="acoes.length > 0" class='icons_nav_menu' v-on:click="
                        desativa_views(2)">
                        <h3 class="buttn_icon_menu">Mercado de Ações</h3>
                    </b-nav-item>

                    <!-- Botão de Configurações -->
                    <b-nav-item class='icons_nav_menu' v-on:click="
                        desativa_views(3)">
                        <h3 class="buttn_icon_menu">Configurações</h3>
                    </b-nav-item>
                </b-navbar-nav>
            </div>
        </div>

        <!-- Tela inicial com várias funções de conta -->
        <div class="invent-cards content_page" v-if="inicioView">
            <h2>Olá {{conta.nome}}!</h2>
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

            <div id="btn_operacoes">
                <i class="fas fa-user"></i> Sua conta
                <hr />

                <div id="itens_fnc_rapida">

                    <div class='item_fnc_rapida'>
                        Compras <i class="fas fa-dollar-sign"></i>
                        <hr />
                        <p class="btn_item"><i class="fas fa-calendar"></i> Histórico</p>
                    </div>

                    <div class='item_fnc_rapida'>
                        Dados
                        <hr />
                        <a href="#">
                            <p class="btn_item" v-b-modal.modal-conta v-on:click="objeto_edita(3, conta.id)"><i class="fas fa-server"></i> Atualizar</p>
                        </a>
                    </div>

                    <div class='item_fnc_rapida'>
                        Deslogar <i class="fas fa-bolt"></i>
                        <hr />
                        <a href="#">
                            <p class="btn_item"><i class="fas fa-power-off" v-on:click="redirect("/")"></i> Deslogar</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Marketplace -->
        <div class="invent-cards content_page" v-if="marketplaceView">
            <div>
                <h2>Bem vindo ao Marketplace</h2>

                <a href="#" class="icon_carrinho_compras" v-on:click="abrir_carrinho()">
                    <h2 id="text_carrinho">Carrinho <i class="fas fa-dolly"></i></h2>
                </a>
            </div>
            <hr />
            <input type="text" class="search" placeholder="Pesquisar por um produto">

            <!-- Lojas em destaque -->
            <div id="lista_lojas_destaque_marketplace" v-if="(lojas.length > 0)">

                <br />
                <h4>Lojas em destaque <i class="fas fa-store"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="(loja, index) in lojas" v-if="(index <= 2)">
                        <a href="#">
                            <div class="item_loja_marketplace_destaque" v-on:click="abrir_painel_loja(loja)">
                                <h3>{{loja.nome}}</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <hr v-if="(produtos.length > 0)"/>
            <h4 v-if="(produtos.length > 0)">Produtos em destaque <i class="fas fa-store"></i></h4>

            <!-- Produtos do marketplace -->
            <div id="lista_itens_marketplace">
                <div v-for="produto in produtos">
                    <a href="#">
                        <div class="item_marketplace">
                            <h3 class="nome_item_marketplace">{{produto.nome}}</h3>

                            <p class="preco_item_marketplace">R${{produto.preco}}</p>

                            <div class="opcoes_item" v-if="modo_develop">
                                <p class="btn_opcao_item" v-b-modal.modal-produto v-on:click="objeto_edita(1, produto.id)"><i class="fas fa-pen"></i></p>

                                <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedProduto(produto.id)"><i class="fas fa-trash"></i></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Painel com os detalhes e produtos da loja selecionada -->
        <div id="painel_loja_preview" v-if="lojaPainelView">
            <h2>{{objetoLoja.nome}} <i class="fas fa-store"></i></h2>

            <div class="opcoes_edit_loja" v-if="modo_develop">
                <p class="btn_opcao_item" v-b-modal.modal-loja v-on:click="objeto_edita(0, objetoLoja.id)"><i class="fas fa-pen"></i></p>

                <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedLoja(objetoLoja.id)"><i class="fas fa-trash"></i></p>
            </div>

            <a href="#" class="a_btn_link"><p class="btn_item btn_retornar_pag" style="float: right; margin-top: 25px;" v-on:click="lojaPainelView = false">Retornar</p></a>

            <hr />

            <i class="fas fa-location-arrow"></i> {{objetoLoja.endereco}} <br /> <i class="fas fa-check"></i> {{objetoLoja.vendas == 1 ? "1 venda realizada": objetoLoja.vendas == 0 ? "Nenhuma venda realizada" : `${objetoLoja.vendas} vendas realizadas` }} <br /> <i class="fas fa-box"></i> {{produtos_loja.length == 1 ? "1 produto disponível": produtos_loja.length == 0 ? "Nenhum produto disponível" : `${produtos_loja.length} produtos disponíveis` }} <br /><br />

            <p class="btn_item inserir_produto" v-if="modo_develop" v-b-modal.modal-produto v-on:click="objeto_adicionar(1)"><i class="fas fa-plus"></i> Inserir novo produto</p>

            <div id="lista_itens_marketplace">
                <div v-for="produto in produtos_loja">
                    <a href="#">
                        <div class="item_marketplace">
                            <h3 class="nome_item_marketplace">{{produto.nome}}</h3>

                            <p class="preco_item_marketplace">R${{produto.preco}}</p>

                            <div class="opcoes_item" v-if="modo_develop">
                                <p class="btn_opcao_item" v-b-modal.modal-produto v-on:click="objeto_edita(1, produto.id)"><i class="fas fa-pen"></i></p>

                                <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedProduto(produto.id)"><i class="fas fa-trash"></i></p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Tela do mercado de ações -->
        <div class="invent-cards content_page" v-if="acoesView">
            <h2>Mercado de ações</h2>
            <hr />

            <input type="text" class="search" placeholder="Pesquisa">

            <div id="banner_mercado_acoes"></div>

            <hr v-if="(acoes.length > 0)"/>
            <h4 v-if="(acoes.length > 0)">Ações em destaque <i class="fas fa-crown"></i></h4>

            <div id="lista_empresas_mercado">
                <div v-for="(acao, index) in acoes" v-if="index < 5">
                    <a href="#">
                        <div class="item_m_acoes" v-on:click="abrir_painel_acao(acao)">
                            <h3 class="infos_acao acao_nome">{{acao.nome}}</h3>
                            <p class="infos_acao acao_preco">R${{acao.preco}}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>

        <!-- Painel com detalhes da ação selecionada -->
        <div id="painel_acao_preview" v-if="acaoPainelView">

            <div id="banner_topo_acao_view"></div>

            <h2>{{objetoAcao.nome}} <i class="fas fa-comments-dollar"></i></h2>

            <div class="opcoes_edit_loja" v-if="modo_develop">
                <p class="btn_opcao_item" v-b-modal.modal-acao v-on:click="objeto_edita(2, objetoAcao.id)"><i class="fas fa-pen"></i></p>

                <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedAcao(objetoAcao.id)"><i class="fas fa-trash"></i></p>
            </div>

            <a href="#" class="a_btn_link"><p class="btn_item btn_retornar_pag" style="float: right; margin-top: 25px;" v-on:click="acaoPainelView = false">Retornar</p></a>

            <br />
            <p><i class="fas fa-industry"></i> {{objetoAcao.tipo}}</p>

            <p class="valor_acao_preview">R${{objetoAcao.preco}}</p>
        </div>

        <!-- Carrinho de compras -->
        <div id="painel_carrinho_preview" v-if="carrinhoPainelView">

            <h2>Seu carrinho de compras <i class="fas fa-"></i></h2>

            <!-- <div>
                <hr />
                <h3>Seu carrinho está vazio! Adicione produtos para poder visualizar por aqui!</h3>
            </div> -->

            <a href="#" class="a_btn_link"><p class="btn_item btn_retornar_pag" style="float: right; margin-top: 25px;" v-on:click="carrinhoPainelView = false">Retornar</p></a>
        </div>

        <!-- Painel com detalhes da conta selecionada -->
        <div id="painel_acao_preview" v-if="contaPainelView">

            <div id="banner_topo_acao_view"></div>

            <h2>{{objetoConta.nome}} <i class="fas fa-user"></i></h2>

            <div class="opcoes_edit_loja" v-if="modo_develop">
                <p class="btn_opcao_item" v-b-modal.modal-conta v-on:click="objeto_edita(3, objetoConta.id)"><i class="fas fa-pen"></i></p>

                <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedConta(objetoConta.id)"><i class="fas fa-trash"></i></p>
            </div>

            <a href="#" class="a_btn_link"><p class="btn_item btn_retornar_pag" style="float: right; margin-top: 25px;" v-on:click="contaPainelView = false">Retornar</p></a>

            <br />
            <p><i class="fas fa-location-arrow"></i> {{objetoConta.endereco}}</p>

            <p class="saldo_conta_preview">R${{objetoConta.saldo}}</p>
        </div>

        <!-- Configurações; Adições e listagens -->
        <div class="invent-cards content_page" v-if="configsView">
            <h2>Configurações</h2>
            <hr />

            <div id="itens_fnc_rapida">
                <div class='item_fnc_rapida'>
                    Lojas <i class="fas fa-store"></i>
                    <hr />
                    <p class="btn_item" v-b-modal.modal-loja v-on:click="objeto_adicionar(0)"><i class="fas fa-plus"></i> Cadastrar nova</p>

                    <a href="#" class="a_btn_link"><p class="btn_item" v-if="lojas.length > 0" v-on:click="ordena_amostragem(0)"><i class="fas fa-folder-open"></i> Exibir todas</p></a>
                </div>

                <div class='item_fnc_rapida'>
                    Produtos <i class="fas fa-cube"></i>
                    <hr />
                    <p v-if="lojas.length > 0" class="btn_item" v-b-modal.modal-produto v-on:click="objeto_adicionar(1)"><i class="fas fa-plus"></i> Inserir novo</p>
                    <p v-else class="btn_item">Crie uma loja antes!</p>

                    <a href="#" class="a_btn_link"><p class="btn_item" v-if="produtos.length > 0" v-on:click="ordena_amostragem(1)"><i class="fas fa-folder-open"></i> Exibir todos</p></a>
                </div>

                <div class='item_fnc_rapida'>
                    Ações <i class="fas fa-dollar-sign"></i>
                    <hr />
                    <p class="btn_item" v-b-modal.modal-acao v-on:click="objeto_adicionar(2)"><i class="fas fa-plus"></i> Inserir nova</p>

                    <a href="#" class="a_btn_link"><p class="btn_item" v-if="acoes.length > 0" v-on:click="ordena_amostragem(2)"><i class="fas fa-folder-open"></i> Exibir todas</p></a>
                </div>

                <div class='item_fnc_rapida'>
                    Configurações <i class="fas fa-fingerprint"></i>
                    <hr />

                    <a href="#">
                    <p v-if="!modo_develop" class="btn_item" v-on:click="develop()">
                        <i class="fas fa-solid fa-thumbs-down"></i> Desenvolvedor</p>

                    <p v-else class="btn_item" v-on:click="develop()">
                        <i class="fas fa-solid fa-thumbs-up"></i> Desenvolvedor</p></a>
                </div>

                <div class='item_fnc_rapida' v-if="modo_develop">
                    Administrativo <i class="fas fa-signal"></i>
                    <hr />

                    <a href="#">
                        <p class="btn_item" v-b-modal.modal-conta v-on:click="objeto_adicionar(3)">
                        <i class="fas fa-solid fa-plus"></i> Nova conta</p></a>

                    <a href="#"><p class="btn_item" v-on:click="ordena_amostragem(3)">
                        <i class="fas fa-solid fa-user"></i> Registrados</p></a>
                </div>
            </div>

            <div v-if="lojasRegistradasView">
                <hr />
                <h4>Lojas registradas <i class="fas fa-store"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="loja in lojas">
                        <a href="#">
                            <div class="item_loja_marketplace" v-on:click="abrir_painel_loja(loja)">
                                <h3>{{loja.nome}}</h3>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="produtosRegistradosView">
                <hr />
                <h4>Produtos registrados <i class="fas fa-cube"></i></h4>

                <div id="lista_lojas_marketplace">
                    <div v-for="produto in produtos">
                        <a href="#">
                            <div class="item_marketplace">
                                <h3 class="nome_item_marketplace">{{produto.nome}}</h3>

                                <p class="preco_item_marketplace">R${{produto.preco}}</p>

                                <div class="opcoes_item" v-if="modo_develop">
                                    <p class="btn_opcao_item" v-b-modal.modal-produto v-on:click="objeto_edita(1, produto.id)"><i class="fas fa-pen"></i></p>

                                    <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedProduto(produto.id)"><i class="fas fa-trash"></i></p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="acoesRegistradasView">
                <hr />
                <h4>Ações registradas <i class="fas fa-dollar-sign"></i></h4>

                <div id="lista_empresas_mercado">
                    <div v-for="acao in acoes">
                        <a href="#">
                            <div class="item_m_acoes" v-on:click="abrir_painel_acao(acao)">
                                <h3 class="infos_acao acao_nome">{{acao.nome}}</h3>
                                <h4 class="infos_acao acao_preco">R${{acao.preco}}</h4>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <div v-if="usuariosRegistradosView">
                <hr />
                <h4>Usuários registrados <i class="fas fa-user"></i></h4>

                <div id="lista_usuarios_registrados">
                    <div v-for="usuario in contas">
                        <a href="#">
                            <div class="item_usuario_registrado" v-on:click="abrir_painel_conta(usuario)">
                                <h3>{{usuario.nome}}</h3>

                                <div class="opcoes_item_usuario" v-if="modo_develop">
                                    <p class="btn_opcao_item" v-b-modal.modal-conta v-on:click="objeto_edita(3, usuario.id)"><i class="fas fa-pen"></i></p>

                                    <p class="btn_opcao_item btn_opcao_excluir" v-on:click="removeSelectedConta(usuario.id)"><i class="fas fa-trash"></i></p>
                                </div>
                            </div>
                        </a>
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

                    <label class="mr-sm-2" for="input_telefone">Telefone:</label>
                    <b-form-input v-model="objetoLoja.telefone" id="input_telefone" class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="(11) 8445-2382" required></b-form-input>
                    <br /><br />

                    <b-button v-if="!btn_edit_loja" type="submit" variant="primary"
                        v-on:click="prancheta_loja = !prancheta_loja">Cadastrar</b-button>
                    <b-button v-if="btn_edit_loja" type="submit" variant="primary"
                        v-on:click="btn_edit_loja = !btn_edit_loja">Atualizar</b-button>

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

                    <label class="mr-sm-2" for="input_quantidade">Quantidade em estoque:</label>
                    <b-form-input v-model="objetoProduto.quantidade" id="input_quantidade" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_preco">Preço:</label>
                    <b-form-input v-model="objetoProduto.preco" id="input_preco" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_tipo">Categoria:</label>
                    <b-form-select id="input_tipo" v-bind:options="categorias_produto" v-model="objetoProduto.categoria"
                        v-bind:value="null" required>
                    </b-form-select> <br /> <br />

                    <b-button v-if="!btn_edit_produto" type="submit" variant="primary"
                        v-on:click="prancheta_produto = !prancheta_produto">Cadastrar</b-button>
                    <b-button v-if="btn_edit_produto" type="submit" variant="primary"
                        v-on:click="btn_edit_produto = !btn_edit_produto">Atualizar</b-button>

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

                    <label class="mr-sm-2" for="input_tipo">Tipo de ação:</label>
                    <b-form-input v-model="objetoAcao.tipo" id="input_tipo" class="mb-2 mr-sm-2 mb-sm-0"
                        placeholder="Ex: Refinaria" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_preco">Preço:</label>
                    <b-form-input v-model="objetoAcao.preco" id="input_preco" class="mb-2 mr-sm-2 mb-sm-0"
                        type="number" required></b-form-input>
                    <br /><br />

                    <b-button v-if="!btn_edit_acao" type="submit" variant="primary"
                        v-on:click="prancheta_acao = !prancheta_acao">Cadastrar</b-button>
                    <b-button v-if="btn_edit_acao" type="submit" variant="primary"
                        v-on:click="btn_edit_acao = !btn_edit_acao">Atualizar</b-button>

                    <b-button type="reset" variant="danger">Limpar formulário</b-button>
                </b-form>
            </b-overlay>
        </b-modal>

        <!-- Modal para editar a conta do usuário -->
        <b-modal id="modal-conta" :title="titulo_modal" hide-footer>
            <b-overlay :show="prancheta_conta" rounded="sm">
                <b-form v-on:submit="operacao">
                    <label class="mr-sm-2" for="input_nome">Nome:</label>
                    <b-form-input id="input_nome" v-model="objetoConta.nome" class="mb-2 mr-sm-2 mb-sm-0" required></b-form-input> 
                    <br />

                    <label class="mr-sm-2" for="input_sobrenome">Sobrenome:</label>
                    <b-form-input v-model="objetoConta.sobrenome" id="input_sobrenome" class="mb-2 mr-sm-2 mb-sm-0" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_endereco">Endereço:</label>
                    <b-form-input v-model="objetoConta.endereco" id="input_endereco" class="mb-2 mr-sm-2 mb-sm-0" required></b-form-input>
                    <br />

                    <label class="mr-sm-2" for="input_endereco" v-if="modo_develop">Saldo:</label>
                    <b-form-input v-model="objetoConta.saldo" id="input_endereco" class="mb-2 mr-sm-2 mb-sm-0" required></b-form-input>
                    <br /><br />

                    <b-button v-if="!btn_edit_conta" type="submit" variant="primary"
                        v-on:click="prancheta_conta = !prancheta_conta">Cadastrar</b-button>
                    <b-button v-if="btn_edit_conta" type="submit" variant="primary"
                        v-on:click="btn_edit_conta = !btn_edit_conta">Atualizar</b-button>

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

        let produtos, conta, contas, acoes, lojas, transferencias, itens_carrinho;
        const identificador = 1;

        try {
            const response = await $axios.$get(`conta/${identificador}`);
            conta = response[0];
        } catch (ex) {
            console.log(ex);
        }

        try {
            const response = await $axios.$get('conta');
            contas = response;
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

        try{
            const response = await $axios.$get('carrinho');
            itens_carrinho = response;
        } catch (ex) {
            console.log(ex);
        }

        // try {
        //     const response = await $axios.$get('transferencia');
        //     transferencias = response;
        // } catch (ex) {
        //     console.log(ex);
        // }

        return { conta, contas, lojas, produtos, acoes, transferencias, itens_carrinho }
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
            usuariosRegistradosView: false,
            produtosRegistradosView: false,
            acoesRegistradasView: false,

            viewConfigAnterior: false,

            lojaPainelView: false,
            acaoPainelView: false,
            contaPainelView: false,
            carrinhoPainelView: false,

            tab_acao: false,
            tab_loja: false,
            tab_conta: false,
            tab_transferencias: false,

            operacao: this.createNewLoja,

            titulo_modal: 'Cadastro de produto',

            btn_edit_loja: false,
            btn_edit_acao: false,
            btn_edit_conta: false,
            btn_edit_produto: false,

            prancheta_acao: false,
            prancheta_loja: false,
            prancheta_conta: false,
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
                idLoja: null
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
                id: null,
                nome: null,
                sobrenome: null,
                endereco: null,
                saldo: null,
                tipo: 0, // 0 - Usuário comum, 1 - adm, 2 - vendedor/loja
            },

            id_loja_alvo: null,
            modo_develop: 1,

            acoes: [],
            lojas: [],
            contas: [],
            produtos: [],
            produtos_loja: [],
            transferencias: [],

            itens_carrinho: [],
        };
    },

    methods: {

        develop: function() {
            this.modo_develop = !this.modo_develop;

            this.viewConfigAnterior = null;
            this.usuariosRegistradosView = false;
        },

        objeto_adicionar: function(caso){

            // 0 -> Loja, 1 -> Produto, 2 -> Ação, 3 -> Conta
            if (caso == 0) { // Loja
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
            } else if(caso == 1) {
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
            } else if(caso == 2) {
                this.objetoAcao = {
                    nome: null,
                    tipo: null,
                    preco: null
                },

                this.btn_edit_acao = false;
                this.titulo_modal = "Cadastro de Ação";
                this.operacao = this.createNewAcao;
            } else {
                this.objetoConta = {
                    nome: null,
                    sobrenome: null,
                    endereco: null,
                    saldo: 0
                },

                this.btn_edit_conta = false;
                this.titulo_modal = "Cadastro de Conta";
                this.operacao = this.createNewConta;
            }
        },

        desativa_views: function (alvo) {

            this.inicioView = false;
            this.marketplaceView = false;
            this.acoesView = false;
            this.configsView = false;
            this.lojaPainelView = false;
            this.acaoPainelView = false;
            this.carrinhoPainelView = false;
            this.contaPainelView = false;

            // 0 -> Inicio, 1 -> Marketplace, 2 -> Acoes, 3 -> Configurações
            if(alvo == 0)
                this.inicioView = true;
            else if(alvo == 1)
                this.marketplaceView = true;
            else if(alvo == 2)
                this.acoesView = true;
            else
                this.configsView = true;
        },

        objeto_edita: function(caso, id_alvo){
            
            // 0 -> Loja, 1 -> Produto, 2 -> Ação, 3 -> Conta
            if(caso == 0) { // Loja
                this.$axios.$get(`loja/${id_alvo}`).then((response) => {
                    this.objetoLoja = response[0];

                    this.titulo_modal = "Atualizar Loja";
                    this.operacao = this.updateSelectedLoja;
                    this.btn_edit_loja = true;
                })
            } else if(caso == 1) {
                this.$axios.$get(`produto/${id_alvo}`).then((response) => {
                    this.objetoProduto = response[0];

                    this.titulo_modal = "Atualizar Produto";
                    this.operacao = this.updateSelectedProduto;
                    this.btn_edit_produto = true;
                });
            } else if(caso == 2) {
                this.$axios.$get(`acao/${id_alvo}`).then((response) => {
                    this.objetoAcao = response[0];

                    this.titulo_modal = "Atualizar Ação";
                    this.operacao = this.updateSelectedAcao;
                    this.btn_edit_acao = true;
                })
            } else {
                this.$axios.$get(`conta/${id_alvo}`).then((response) => {
                    this.objetoConta = response[0];

                    this.titulo_modal = "Atualizar Conta";
                    this.operacao = this.updateSelectedConta;
                    this.btn_edit_conta = true;
                })
            }
        },

        ordena_amostragem: function (caso){

            // 0 -> Lojas, 1 -> Produtos, 2 -> Ações 
            this.lojasRegistradasView = false;
            this.acoesRegistradasView = false;
            this.produtosRegistradosView = false;
            this.usuariosRegistradosView = false;

            if(caso !== this.viewConfigAnterior){
                if(caso == 0)
                    this.lojasRegistradasView = true;
                else if(caso == 1)
                    this.produtosRegistradosView = true;
                else if(caso == 2)
                    this.acoesRegistradasView = true;
                else
                    this.usuariosRegistradosView = true;
            }else{
                this.lojasRegistradasView = false;
                this.acoesRegistradasView = false;
                this.usuariosRegistradosView = false;
                this.produtosRegistradosView = false;

                caso = null;
            }

            this.viewConfigAnterior = caso
        },

        abrir_carrinho: function() {

            this.carrinhoPainelView = true;
        },

        abrir_painel_loja: function (dados) {

            this.objetoLoja = dados;
            this.atualiza_itens_loja(dados.id);
        },

        abrir_painel_acao: function (dados) {

            this.objetoAcao = dados;
            this.acaoPainelView = true;
        },

        abrir_painel_conta: function (dados) {

            this.objetoConta = dados;
            this.contaPainelView = true;
        },

        atualiza_itens_loja: function (id_loja) {

            this.lojaPainelView = false;

            this.objetoProduto.idLoja = id_loja;
            this.id_loja_alvo = id_loja;

            this.produtos_loja = [];

            for(let i = 0; i < this.produtos.length; i++){
                if(this.produtos[i].idLoja == id_loja)
                    this.produtos_loja.push(this.produtos[i])
            }

            this.lojaPainelView = true;
        },

        createNewConta: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("conta", this.objetoConta)
                .then(() => {
                    this.updateContas();
                })
                .catch((error) => {
                    console.error('Não foi possível criar uma nova conta');
                    console.log(error);
                });

            this.$bvModal.hide('modal-conta');
            this.tab_conta = false;
        },

        updateSelectedConta: function (event) {
            event.preventDefault();
            
            this.$axios
            .$post("conta/update", this.objetoConta)
            .then(() => {
                this.updateContas();
            })
            .catch((error) => {
                console.error('Não foi possível atualizar a conta selecionada.');
                console.log(error);
            });

            this.$bvModal.hide('modal-conta');
            this.operacao = this.createNewConta;
        },

        updateContas: function () {
            this.$axios.$get('conta').then((response) => {
                this.contas = response;
            })
        },

        removeSelectedConta: function (id) {
            this.$axios.$delete(`conta/${id}`).then(() => {
                this.updateContas();
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

        updateSelectedLoja: function (event) {
            event.preventDefault();

            this.$axios
            .$post("loja/update", this.objetoLoja)
            .then(() => {
                this.updateLoja();
            })
            .catch((error) => {
                console.error('Não foi possível atualizar a loja selecionada.');
                console.log(error);
            });

            this.$bvModal.hide('modal-loja');
        },

        updateLoja: function () {
            this.$axios.$get("loja").then((response) => {
                this.lojas = response;

                if(this.lojas.length < 1){
                    this.lojasRegistradasView = false;

                    // Remove a visualização da aba do marketplace
                    this.marketplaceView = false;
                    this.configsView = true;
                }
            })
        },

        removeSelectedLoja: function (id) {
            this.$axios.$delete(`loja/${id}`).then(() => {

                this.lojaPainelView = false;
                this.updateLoja();
                this.updateProduto();
            })
        },

        createNewProduto: function (event) {
            event.preventDefault();

            if(this.objetoProduto.idLoja != this.id_loja_alvo)
                this.objetoProduto.idLoja = this.id_loja_alvo;

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("produto", this.objetoProduto)
                .then(() => {
                    this.updateProduto();

                    // Atualizando a lista de itens da loja
                    this.atualiza_itens_loja(this.objetoProduto.idLoja)

                    this.$bvModal.hide('modal-produto');
                    this.operacao = this.createNewProduto;
                })
                .catch((error) => {
                    console.error('Não foi possível criar um novo produto');
                    console.log(error);
                });
        },

        updateSelectedProduto: function (event) {
            event.preventDefault();

            this.$axios
            .$post("produto/update", this.objetoProduto)
            .then(() => {
                this.updateProduto();
            })
            .catch((error) => {
                console.error('Não foi possível atualizar o produto selecionado.');
                console.log(error);
            });

            this.$bvModal.hide('modal-produto');
            this.operacao = this.createNewProduto;
        },

        updateProduto: function () {
            this.$axios.$get("produto").then((response) => {
                this.produtos = response;

                if(this.produtos.length < 1)
                    this.produtosRegistradosView = false;
            })

            this.$bvModal.hide('modal-produto');
            this.operacao = this.createNewProduto;
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

        updateSelectedAcao: function (event) {
            event.preventDefault();

            this.$axios
            .$post("acao/update", this.objetoAcao)
            .then(() => {
                this.updateAcao();
            })
            .catch((error) => {
                console.error('Não foi possível atualizar a ação selecionada.');
                console.log(error);
            });

            this.$bvModal.hide('modal-acao');
            this.operacao = this.createNewAcao;
        },

        updateAcao: function () {
            this.$axios.$get("acao").then((response) => {
                this.acoes = response;

                if(this.acoes.length < 1){
                    this.acoesRegistradasView = false;

                    this.acaoPainelView = false;
                    this.configsView = true;
                }
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

        createNewItemCarrinho: function (event) {
            event.preventDefault();

            // Veja mais sobre em https://axios.nuxtjs.org/usage
            this.$axios
                .$post("carrinho", this.itemCarrinho)
                .then(() => {
                    this.updateItemCarrinho();
                })
                .catch((error) => {
                    console.error('Não foi possível inserir este item no carrinho.');
                    console.log(error);
                });
        },

        updateItemCarrinho: function () {
            this.$axios.$get("carrinho").then((response) => {
                this.carrinho = response;
            })
        },

        removeSelectedItemCarrinho: function (id) {
            this.$axios.$delete(`carrinho/${id}`).then(() => {

                this.updateItemCarrinho();
            })
        },
    }
}
</script>

<style scoped>
@import '../static/style.css';
@import '../static/animations.css';
</style>