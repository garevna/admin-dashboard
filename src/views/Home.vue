<template>
  <v-container fluid class="home-page-content mt-12">
    <v-row align="start" justify="center" justify-md="end">
      <SignIn :reset.sync="resetPassword" :success.sync="success" />
    </v-row>
    <ResetPassword v-if="resetPassword" />
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
      if (val) {
        this.$router.push({ name: 'dash' })
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
