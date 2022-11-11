<template>
  <div>
    <b-card
      tag="article"
      style="max-width: 260px; max-height: 300px"
      v-bind:title="artista.nome"
      class="mb-2"
    >
      <b-card-text
        ><b>Seguidores:</b> <br />
        {{ artista.seguidores }}</b-card-text
      >
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CardArtista",
  data: function () {
    return {
    }
  },
  props: ['artista'],
}
</script>

<style>
.card-image {
    height: 130px; 
    object-fit: cover; 
    object-position: "center";
}
</style>
