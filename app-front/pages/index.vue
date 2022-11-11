<template>

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

    let vendedores;

    try {
      const response = await $axios.$get('vendedores');
      vendedores = response;
    } catch (ex) {
      console.log(ex);
    }

    return { vendedores }
  },

  name: 'IndexPage',
  data: function () {
    return {
      show: false,
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