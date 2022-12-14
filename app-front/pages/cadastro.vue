<template>
    <div>
        <b-container>
            <div class="login">
                <b-form @submit="doRegister">

                    <b-form-group id="user" label="Usuário" label-for="user-input"
                        description="Insira o seu nome de usuário" label-align="left">
                        <b-form-input id="user-input" v-model="user.username" type="text" required
                            placeholder="Username"></b-form-input>
                    </b-form-group>

                    <b-form-group id="user" label="Email" label-for="user-email" description="Insira o seu email"
                        label-align="left">
                        <b-form-input id="user-email" v-model="user.email" type="text" required placeholder="Email">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group id="pwd" label="Senha" label-for="pwd-input" label-align="left"
                        description="Insira a sua senha.">
                        <b-form-input id="pwd-input" v-model="user.pwd" type="password" required placeholder="Senha">
                        </b-form-input>
                    </b-form-group>

                    <b-button type="submit" variant="success">Cadastrar</b-button>
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
        doRegister(event) {
            event.preventDefault();

            this.$axios
                .post("http://localhost:5000/user", this.user)
                .then((response) => {
                    console.log(response.data);
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
@import '../static/style.css';
</style>