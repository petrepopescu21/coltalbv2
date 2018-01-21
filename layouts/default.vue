<template>
    <v-app toolbar--fixed toolbar style="overflow: hidden">
      <nav-drawer />
      <top-toolbar />
      <main >
        <v-content>
          <v-container fluid class="p-0">
            <nuxt/>
          </v-container>
        </v-content>
      </main>
      <v-footer app></v-footer>
    </v-app>
</template>

<script>
import MyFooter from '~/components/Footer.vue'
import TopToolbar from '~/components/TopToolbar.vue'
import NavDrawer from '~/components/drawers/NavDrawer.vue'
export default {
  components: {
    MyFooter, TopToolbar, NavDrawer
  }
}
</script>

<style>
.p-0 {
  padding: 0;
}


</style>
