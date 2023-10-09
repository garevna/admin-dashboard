<template>
  <v-container fluid class="home-page-content mt-0">
    <v-row align="start" justify="center" justify-md="end">
      <SignIn :resetPassword.sync="resetPassword" :success.sync="success" />
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Home',

  components: {
    SignIn: () => import('@/components/auth/SignIn.vue')
  },

  data: () => ({
    resetPassword: false,
    success: false
  }),

  watch: {
    success (val) {
      if (val && this.$route.name !== 'dash') {
        this.$router.push({ name: 'dash' }).catch(failure => console.warn('Router failure:\n', failure))
      }
    }
  }
}
</script>

<style>
.home-page-content {
  height: 100vh;
  background: transparent;
  background-image: url(../assets/images/Webb-Bridge-Melbourne-Drawing-effect.svg);
  background-position: center;
  background-size:cover;
}
</style>
