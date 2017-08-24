<template>
    <div class="">

        <div>
            <el-input placeholder="请输入内容" v-model="search.keyword">
                <el-cascader class="no-bd" v-model="search.type" style="width:100px;" :show-all-levels="false"
                             expand-trigger="hover" :props="cascaderProp" :options="tags" slot="prepend"
                             placeholder="全部">

                </el-cascader>

                <el-button slot="append" icon="search" @click.native="searchHdl()"></el-button>
            </el-input>
        </div>

        <el-row class="main" :gutter="10">
            <el-col :span="18">
                <div>111</div>

            </el-col>

            <el-col :span="6">
                <div class="sidebar">
                    <dl v-for="item in tags">
                        <dt>{{item.name}}</dt>
                        <dd>
                            <el-tag @click.native="typeChanged(item,c)"
                                    :type="activeLabelId==c.id?'primary':'gray'"
                                    v-for="c in item.children">
                                {{c.name}}
                            </el-tag>
                        </dd>
                    </dl>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>

    import   'whatwg-fetch'


    export default {

        data () {
            return {

                tags: [],
                search: {
                    keyword: '',
                    type: []
                },
                cascaderProp: {
                    value: 'id',
                    label:'name'
                }
            }
        },
        computed: {
            activeLabelId(){
                let type = this.search.type;

                if (type[type.length - 1]) {
                    return type[type.length - 1];
                }
            }
        },

        mounted(){
            this.getData().then((res) => {
                console.log(res);
                
                this.$set(this, 'tags', res);
            })

        },
        methods: {
            searchHdl(){

            },

            getData(query){
                return fetch('/api/categories', {query}).then((res) => {
                    return res.json();
                })
            },
            typeChanged(...type){
                let arr = [];
                type.forEach((item) => {
                    arr.push(item.id);
                });
                this.$set(this.search, 'type', arr)

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .main{
        margin:30px 0 0;
    }

    .sidebar{
        border-left:1px dotted #ddd;
        padding:0 0 0 20px;
    }

    .sidebar dl{
        border-bottom:1px dotted #ddd;
        margin-bottom:10px;
    }

    .sidebar dl:last-child{
        border-bottom:none;
    }

    .sidebar dd{
        padding:10px 0;
    }

    .sidebar dd .el-tag{
        margin:0 5px 5px 0;
    }

    .sidebar dt{
        font-size:1.6rem;
    }

    .el-input-group__prepend{
        padding-left:5px;

    }

    .el-input-group__prepend input{
        border:none;
        border-radius:5px;
        height:34px;

    }

    .el-cascader-menus{
        margin-left:-5px;
    }

    .el-tag{
        cursor:pointer;
    }
</style>
