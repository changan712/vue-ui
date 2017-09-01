<template>
    <div class="">

        <div class="card-search">
            <el-input placeholder="请输入内容" v-model="search.keyword"
                      @keyup.native.delete="handleInputDelete(search.keyword)">
                <el-cascader class="no-bd" v-model="search.type" style="width:100px;" :show-all-levels="false"
                             expand-trigger="hover" :props="cascaderProp" :options="tags" slot="prepend"
                             placeholder="全部">

                </el-cascader>

                <el-button slot="append" icon="search" @click.native="searchHdl()"></el-button>
            </el-input>
        </div>

        <el-row class="main" :gutter="10">
            <el-col :span="18">
                <ul class="list">
                    <li class="item" v-for="item in list">
                        {{item}}
                    </li>
                </ul>
                <div class="a-r">
                    <el-pagination

                            @current-change="handlePageChange"
                            :current-page="search.page"
                            :page-size="1"
                            layout="total, prev, pager, next"
                            :total="list.length">
                    </el-pagination>
                </div>
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
                flagKeyWordSearched: false,
                tags: [],
                list: [],
                search: {
                    keyword: '',
                    type: [],
                    page: 1
                },
                cascaderProp: {
                    value: 'id',
                    label: 'name'
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
            this.getTags().then((data) => {
                this.$set(this, 'tags', data);
            });

            this.getList(this.search).then((data) => {

                this.$set(this, 'list', data);
            })

        },
        methods: {
            handleInputDelete(content){
                if (content.length == 0 && this.flagKeyWordSearched) {
                    this.searchHdl();
                    this.$set(this, 'flagKeyWordSearched', false);
                }

            },
            handlePageChange(page){

                this.$set(this.search, 'page', page);
                this.getList(this.search);

            },
            searchHdl(){
                this.$set(this, 'flagKeyWordSearched', true);
                this.$set(this.search, 'page', 1);
                this.getList(this.search);
            },

            getList(query = {}){
                console.log(query);

                return new Promise((resolve) => {
                    resolve([1, 2, 3, 4])
                })
                /*    return fetch('/api/list', {query}).then((res) => {
                 return res.json();
                 })*/
            },

            getTags(query = {}){

                return fetch('/api/categories', {query}).then((res) => {
                    return res.json();
                })
            },
            typeChanged(...type){
                let arr = [];
                type.forEach((item) => {
                    arr.push(item.id);
                });
                this.$set(this.search, 'page', 1);
                this.$set(this.search, 'type', arr);

                this.getList(this.search);

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card-search{
        padding:20px ;
        max-width:600px;
        margin:0 auto;
    }
    .a-r{
        text-align:right;
    }

    .list{

    }

    .list .item{
        border:1px dotted #ddd;
        padding:10px;
        margin-bottom:10px;
    }

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
