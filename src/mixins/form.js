export default{
    data(){
        return {}
    },
    methods: {
        validateForm(formName) {
            let flag = false;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    flag = true;
                } else {
                    flag = false;
                    this.$message({
                        message: '表单校验失败！',
                        type: 'error'
                    });
                }
            });
            return flag;
        }
    }
}