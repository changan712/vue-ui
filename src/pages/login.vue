<template>
    <div class="login">

        <div class="padding">
            <form class="login" @submit.prevent="submit">
                <div>
                    <el-input type="text" v-model="form.name">
                        <template slot="prepend">用户名：</template>

                    </el-input>
                </div>
                <br>
                <div>
                    <el-input type="password" v-model="form.password">
                        <template slot="prepend">密码： </template>

                    </el-input>
                </div>
                <br>

                <el-button icon="search" native-type="submit" type="info">确定</el-button>
            </form>
        </div>

    </div>
</template>

<script>

    import {mapActions} from 'vuex'
    import {USER_SIGNIN} from '@/store/user'
    export default {
        data () {
            return {
                btn: false,
                form: {
                    password: '',
                    name: ''
                }

            }
        },
        methods: {
            ...mapActions([USER_SIGNIN]),
            submit(){
                if (this.form.name && this.form.password) {
                    this.USER_SIGNIN(this.form);
                    this.$router.replace({path: '/home'});
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2{
        font-weight:normal;
    }

    ul{
        list-style-type:none;
        padding:0;
    }

    li{
        display:inline-block;
        margin:0 10px;
    }

    a{
        color:#42b983;
    }
</style>
