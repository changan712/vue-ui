<template>
    <el-form :model="form" :rules="rules" ref="formUpload" label-width="140px">
        <el-form-item label="文件：" required>
            <el-upload
                    action="/upload"
                    :on-success="onSuccess"
                    :on-error="onError"
                    :file-list="fileList"
                    :auto-upload="false"
                    :on-change="handleChange"
                    :showFileList="false"
                    :data="form"
                    accept="image/*"
                    ref="upload">
                <el-button slot="trigger" @click="clearList" type="primary">选取文件</el-button>
                <span class=" ml10">  {{fileName}}</span>
                <div class="error" v-if="submitted&&!fileName">请选择上传文件</div>

            </el-upload>

        </el-form-item>
        <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="类别：" prop="label">
            <el-checkbox-group v-model="form.label" :max="3">
                <el-checkbox label="1" name="label">美食/餐厅线上活动</el-checkbox>
                <el-checkbox label="2" name="label">地推活动</el-checkbox>
                <el-checkbox label="3" name="label">线下主题活动</el-checkbox>
                <el-checkbox label="4" name="label">单纯品牌曝光</el-checkbox>
            </el-checkbox-group>

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
                view: [],
                form: {
                    label: []
                },
                fileList: [],
                fileName: '',
                rules: {
                    label: [
                        {type:'array',required: true, message: '请至少选择一个', trigger: 'change'}
                    ],
                }
            }
        },

        watch: {},

        mounted(){
            fetch('/aa', {query: {a: 1}}).then((res) => {
                console.log(res);

            })

        },

        methods: {
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
</style>
