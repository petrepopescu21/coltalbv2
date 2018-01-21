<template>
<v-navigation-drawer temporary
      v-model="drawer"
      light
      absolute app></v-navigation-drawer>
</template>

<script>
export default {
    name: "navdrawer",
    computed: {
        drawer() {
            return this.$store.getters['drawers/shownav']
        }
    }
}
</script>