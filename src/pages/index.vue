<template>
    <div class="">
        <el-upload
                action=""
                :before-upload="beforeUpload"
                :on-success="onSuccess"
                :file-list="fileList"
                :auto-upload="false"
                :multiple="true"
                accept="image/*"
                ref="upload">
            <el-button slot="trigger" type="primary">选取文件</el-button>
            <el-button style="margin-left: 5px;"  type="success" @click="submitUpload">上传到服务器</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>

    </div>
</template>

<script>


    export default {

        data () {
            return {
                //Array<{name:string,url:string}>
                fileList: [],
            }
        },
        mounted(){

            
        },
        methods: {
            submitUpload() {
                this.$refs.upload.submit();
            },
            onSuccess(){
                this.$message('上传成功！');

            },
            beforeUpload(file){

            }

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
