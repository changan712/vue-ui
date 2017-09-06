<template>
    <el-form :model="form" :rules="rules" ref="formUpload" label-width="140px">
        <el-form-item label="文件：" required>
            <el-upload
                    action="/api/upload_handle"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :showFileList="false"
                    :data="form"
                    ref="upload">
                <el-button slot="trigger" @click="clearList" type="primary">选取文件</el-button>
                <span class=" ml10">{{fileName}}</span>
                <div class="error" v-if="submitted&&!fileName">请选择上传文件</div>

            </el-upload>

        </el-form-item>
        <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类别：" prop="label">
          <div class="ck-grpup">  <el-checkbox-group v-model="form.label" >  <!--:max="3"-->
                    <dl v-for="item in tags">
                        <dt>{{item.name}}</dt>
                        <dd>
                            <el-checkbox  v-for="c in item.children" :label="c.id" >{{c.name}}</el-checkbox>

                        </dd>
                    </dl>
            </el-checkbox-group></div>

        </el-form-item>
        <el-form-item>
            <el-button size="large" type="success" @click="submit">提 交</el-button>
        </el-form-item>
    </el-form>

</template>11

<script>

    import   'whatwg-fetch'

    export default {

        data () {

            return {
                submitted: false,
                tags: [],
                form: {
                    label: []
                },
                fileList: [],
                fileName: '',
                rules: {
                    label: [
                        {type: 'array', required: true, message: '请至少选择一个', trigger: 'change'}
                    ],
                }
            }
        },

        watch: {},

        mounted(){
            this.getTags().then((res)=>{
                this.$set(this, 'tags', res)
            });
        },

        methods: {

            getTags(query = {}){
                return fetch('/api/categories', {query}).then((res) => {
                    return res.json();
                })
            },
            reset(){
                this.$refs.formUpload.resetFields();
                this.$set(this, 'submitted', false)
            },

            clearList(){
                this.$refs.upload.clearFiles();

            },
            handleChange(file, fileList){
                if (fileList && fileList[0])
                    this.$set(this, 'fileName', fileList[0].name);

            },
            submit() {
                let uploader = this.$refs.upload;
                let form = this.$refs.formUpload;
                this.$set(this, 'submitted', true);
                form.validate((valid) => {
                    if (valid) {
                        console.log(uploader);

                        uploader.submit();

                    }
                });

            },
            onError(){
                this.$message.error('上传失败！');

            },
            onSuccess(){
                this.$message('上传成功！');
                this.reset();

            },

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .error{
        color:red;
        font-size:12px;
    }
    .ck-grpup{
        padding: 15px;
        border:1px solid #bfcbd9;
        border-radius:5px;
    }

    .ck-grpup dl:not(:last-child){
        border-bottom:1px dotted #ddd;
        margin-bottom:10px;
    }

    .ck-grpup dt{
        line-height:1.8;
        font-weight:bold;
    }
</style>
