<template>
    <div id="corpo_login">
        <b-container>
            <div class="form_login">
                <img id="logo_login" src="~/assets/logo.png" alt />

                <b-form @submit="doLogin">
                    <b-form-group id="user" label="Usuário" label-for="user-input" label-align="left">
                        <b-form-input id="user-input" v-model="login.username" type="text" required
                            placeholder="Nome de usuário"></b-form-input>
                    </b-form-group>

                    <b-form-group id="pwd" label="Senha" label-for="pwd-input" label-align="left">
                        <b-form-input id="pwd-input" v-model="login.pwd" type="password" required placeholder="Senha">
                        </b-form-input>
                    </b-form-group>

                    <br />

                    <b-button v-on:click="cadastro()" variant="primary" class="btn_login">Cadastrar</b-button> <b-button
                        type="submit" variant="success" class="btn_login">Entrar</b-button>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Login",

    data() {
        return {
            login: {
                // username: "",
                // pwd: "",
                username: "augusto",
                pwd: "1234",
            },
        };
    },

    methods: {

        cadastro() {
            window.location.href = "/cadastro";
        },

        doLogin(event) {
            event.preventDefault();
            this.$axios
                .post("http://localhost:5000/login", this.login)
                .then((response) => {
                    this.$store.commit('setToken', response.data.token)
                    this.$router.push("/main");
                })
                .catch((error) => {
                    console.error("Não foi possível realizar o Login");
                    console.error(error);
                });
        },
    },
}
</script>

<style>
@import '../static/login_style.css';
@import '../static/animations.css';
</style>