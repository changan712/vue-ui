<style scoped>

</style>
<template>
    <div>
        <div class="">
            <v-header title="home">
                <template slot="left">欢迎你：<a>{{user.name}}</a></template>
                <span slot="right">退出</span>
            </v-header>

        </div>
        <router-view></router-view>
    </div>
</template>
<script>

    export default {
        computed: {
            user(){
                return this.$store.state.user
            },
            title(){
                return this.$store.state.title
            }
        },
        mounted(){

            console.log(this.$router);

        }

    }
</script>