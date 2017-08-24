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
                        <dt>{{item.label}}</dt>
                        <dd>
                            <el-tag @click.native="typeChanged(item,c)"
                                    :type="activeLabelId==c.id?'primary':'gray'"
                                    v-for="c in item.children">
                                {{c.label}}
                            </el-tag>
                        </dd>
                    </dl>
                </div>
            </el-col>
        </el-row>
    </div>

</template>

<script>
    const tags = [
        {
            label: '标签1', id: 1,
            children: [
                {
                    label: '子标签1', id: 11
                },
                {
                    label: '子标签2', id: 12
                }, {
                    label: '子标签3', id: 13
                }, {
                    label: '子标签4', id: 14
                }, {
                    label: '子标签5', id: 15
                }, {
                    label: '子标签6', id: 16
                }, {
                    label: '子标签7', id: 17
                }, {
                    label: '子标签8', id: 18
                }, {
                    label: '子标签9', id: 19
                },
            ],

        },
        {
            label: '标签2', id: 2,
            children: [
                {
                    label: '子标签1', id: 21
                }, {
                    label: '子标签2', id: 22
                },
            ],

        }
    ];

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

            this.$set(this, 'tags', tags);

        },
        methods: {
            searchHdl(){

            },

            getData(){

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
