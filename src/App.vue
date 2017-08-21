<style scoped>

</style>
<template>
    <div>

        <el-menu theme="dark"  :router="true"  :default-active="$route.path" class="el-menu-demo" mode="horizontal"
                 @select="handleSelect">
            <el-menu-item index="/" :route="{path:'/'}">上传</el-menu-item>

            <el-menu-item index="/search" :route="{path:'/search'}">搜索</el-menu-item>
        </el-menu>

     <div class="container">   <router-view></router-view></div>
    </div>
</template>
<script>
    import {mapActions} from 'vuex';
    import {USER_SIGNOUT} from  './store/user';

    export default {
        data:()=>({

        }),
        methods: {
            ...mapActions([USER_SIGNOUT]),
            signout(){
                this[USER_SIGNOUT]();
                this.$router.replace({path: '/login'})
            },
            handleSelect(){

            }

        },

        computed: {
            user(){
                return this.$store.state.user
            },
            app(){
                console.log(this.$store.state);

                return this.$store.state.appStatus
            }
        },
        mounted(){

        }

    }
</script>