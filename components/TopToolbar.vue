<template>
    <v-toolbar absolute app class="white grey--text" dark flat>
        <v-toolbar-side-icon flat light color="grey darken-1" light class="hidden-lg-and-up" @click.stop="toggleDrawer()"></v-toolbar-side-icon>
        <v-spacer></v-spacer>
        <div class="hidden-md-and-down">
            <v-btn class="heavy-text" flat color="grey darken-1">{{l.contact}}</v-btn>
            <v-btn class="heavy-text" flat color="grey darken-1">{{l.desprenoi}}</v-btn>
            <v-btn class="heavy-text" flat color="grey darken-1">{{l.adopta}}</v-btn>
            <v-btn class="heavy-text" flat color="grey darken-1">{{l.blog}}</v-btn>
        </div>
        <v-btn raised color="accent" dark>{{l.doneaza}}</v-btn>
        <v-menu>
        <v-btn class="heavy-text" flat color="grey darken-1" slot="activator">{{x}}</v-btn>
        <v-list>
            <v-list-tile v-for="lang in langs" :key="lang" @click="changeLang(lang)">
                <v-list-tile-title color="grey darken-1" class="heavy-text">{{ lang }}</v-list-tile-title>
            </v-list-tile>
        </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
export default {
    name: "toptoolbar",
    data() {
        return {
            langs: ['en','ro','de']
        }
    },
    methods: {
        toggleDrawer() {
            this.$store.commit('drawers/togglenav')
        },
        changeLang(lang) {
            this.$store.commit('updateLang',lang)
        }
    },
    computed: {
        l() {
            return this.$store.state.labels[this.$store.state.lang]
        },
        x() {
            return this.$store.state.lang
        }
    }
}
</script>

<style>
.heavy-text {
    font-weight: 700;
    text-transform: uppercase;
}
</style>