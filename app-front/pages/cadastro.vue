<template>
    <div id="corpo_login">
        <b-container>
            <div class="form_cadastro">

                <img id="logo_login" src="~/assets/logo.png" alt />

                <b-form @submit="doRegister">
                    <b-form-group id="user" label="Usuário" label-for="user-input"
                        description="Insira o seu nome de usuário" label-align="left">
                        <b-form-input id="user-input" v-model="user.username" type="text" required
                            placeholder="username"></b-form-input>
                    </b-form-group>

                    <b-form-group id="user" label="E-mail" label-for="user-email" description="Insira o seu email"
                        label-align="left">
                        <b-form-input id="user-email" v-model="user.email" type="text" required placeholder="e-mail">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="pwd" label="Senha" label-for="pwd-input" label-align="left"
                        description="Insira a sua senha.">
                        <b-form-input id="pwd-input" v-model="user.pwd" type="password" required placeholder="senha">
                        </b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="success" class="btn_cadastro">Cadastrar</b-button> <br /><br />

                    <b-button v-on:click="inicio()" variant="secondary" class="btn_cadastro">Retornar</b-button>
                </b-form>
            </div>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "Cadastro",

    data() {
        return {
            user: {
                username: null,
                email: null,
                pwd: null,
            },
        };
    },

    methods: {
        inicio() {
            this.$router.push("/");
        },

        doRegister(event) {
            event.preventDefault();

            this.$axios
                .post("http://localhost:5000/user", this.user)
                .then((response) => {
                    console.log(response);
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.error("Não foi possível realizar o cadastro");
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