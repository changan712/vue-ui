<template>
    <div class="">
        <el-form ref="form">

            <div>

                <el-input placeholder="请输入内容" v-model="search.keyword">
                    <el-select style="width:120px" v-model="search.type" slot="prepend" placeholder="全部">
                        <el-option label="餐厅名" value="1"></el-option>
                        <el-option label="订单号" value="2"></el-option>
                        <el-option label="用户电话" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="search"></el-button>
                </el-input>
            </div>
        </el-form>

        <el-row class="main">
            <el-col :span="18">
                <div>111</div>

            </el-col>
            <el-col :span="6">
                <dl v-for="item in tags">
                    <dt>{{item.label}}</dt>
                    <dd>
                        <el-tag type="gray" v-for="c in item.children">
                            {{c.label}}
                        </el-tag>
                    </dd>
                </dl>
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
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
                },    {
                    label: '子标签2', id: 12
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
                    type: ''
                }
            }
        },
        mounted(){
            this.$set(this, 'tags', tags);

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .main{
        margin:30px 0 0;
    }
</style>
