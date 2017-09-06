<template>
    <div class="">

        <div class="card-search">
            <el-input placeholder="请输入内容" v-model="search.query"
                      @keyup.native.delete="handleInputDelete(search.query)">
                <el-cascader class="no-bd" v-model="search.type" style="width:100px;" :show-all-levels="false"
                             expand-trigger="hover" :props="cascaderProp" :options="tags" slot="prepend"
                             @change="typeChanged(search.type[0],search.type[1])"
                             placeholder="全部">

                </el-cascader>

                <el-button slot="append" type="submit" icon="search" @click.native="searchHdl()"></el-button>
            </el-input>
        </div>

        <el-row class="main" :gutter="10">
            <el-col :span="18">
                <ul class="list">

                    <li class="item" v-for="item in list.hits">
                        <div><img :src="item._source.ext|fileTypeImg" alt="">{{item._source.title_raw}}</div>
                        <div class="content"> {{item._source.content_raw}}</div>
                    </li>
                </ul>
                <div class="a-r">
                    <el-pagination

                            @current-change="handlePageChange"
                            :current-page="search.page"
                            :page-size="20"
                            layout="total, prev, pager, next"
                            :total="list.total">
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
    import imgDoc  from  '@/assets/type-doc.png'
    import imgOthers  from  '@/assets/type-others.png'
    import imgPpt  from  '@/assets/type-ppt.png'
    import imgPdf  from  '@/assets/type-pdf.png';
    import imgXls  from  '@/assets/type-xls.png';

    export default {

        data () {
            return {
                flagKeyWordSearched: false,
                tags: [],
                list: [],
                search: {
                    query: '',
                    type: [],
                    page: 1,

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
            },
            searchParams(){
                return {
                    query: this.search.query,
                    category: this.search.type[this.search.type.length - 1] || '',
                    page: this.search.page,
                }
            }
        },

        mounted(){
            this.getTags().then((data) => {
                this.$set(this, 'tags', data);
            });

            this.getList(this.searchParams);
        },
        filters: {
            fileTypeImg(value){
                const assetsUrl = '~assets/';
                const othersName = imgOthers;
                const typeMap = {
                    doc: imgDoc,
                    docx: imgDoc,
                    xls: imgXls,
                    ppt: imgPpt,
                    pdf: imgPdf,
                };

                let result = othersName;

                if (typeMap[value]) {
                    result = typeMap[value];
                }
                return result;
            }

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
                this.getList(this.searchParams);

            },
            searchHdl(){
                this.$set(this, 'flagKeyWordSearched', true);
                this.$set(this.search, 'page', 1);
                this.getList(this.searchParams);
            },

            getList(params = {}){
                let queryString = getQueryString(params);
                return fetch('/api/search?' + queryString).then((res) => {

                    return res.json();
                }).then((result) => {
                    this.$set(this, 'list', result);
                })
            },

            getTags(){
                return fetch('/api/categories').then((res) => {
                    return res.json();
                })
            },
            typeChanged(...type){
                let arr = [];
                type.forEach((item) => {
                    arr.push(item.id || item);
                });
                this.$set(this.search, 'page', 1);
                this.$set(this.search, 'type', arr);

                this.getList(this.searchParams);

            }
        }
    }

    function getQueryString(params) {

        let queryString = Object.keys(params)
            .map(k => {

                return encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
            })
            .join('&');

        return queryString;
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card-search{
        padding:20px;
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

    .list .item img{

        height:15px;
        margin-right:5px;
    }

    .list .item .content{
        margin-top:5px;
        font-size:1.2rem;
        color:#777;
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
