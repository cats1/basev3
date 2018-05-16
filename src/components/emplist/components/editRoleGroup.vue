<template>
    <div class="btnsection">
        <el-button @click="addGroup"><i class="fa fa-folder-open"></i>{{$t('btn.editGroup')}}</el-button>
        <role-group-form :etype="1" :parent="parent" :is-show="isShow" @editrolekit="doDone"></role-group-form>
    </div>
</template>
<script>
import roleGroupForm from './roleGroupForm'
import { getCache } from '@/utils/auth'
export default {
    props: ['parent'],
    components: { roleGroupForm },
    data() {
        return {
            isShow: false,
            form: {
                rgName: '',
                parentId: '',
                rid: '',
                userid: getCache('userid')
            },
            rules: {
                rgName: [
                    { required: true, message: this.$t('formCheck.validName.tip1'), trigger: 'blur' }
                ]
            },
            dform: {
                rid: '',
                userid: getCache('userid')
            },
            parentObj: this.parent
        }
    },
    mounted() {},
    methods: {
        addGroup() {
            if (!this.parent.name || this.parent.type === 1) {
                this.$message({
                    message: this.$t('role.tip'),
                    type: 'error'
                })
            } else {
                this.isShow = true
            }
        },
        doDone() {
            this.isShow = false
            this.$emit('addrolekit')
        },
        saveProject() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$store.dispatch('updateRARG', this.form).then(res => {
                        let { status } = res
                        if (status === 0) {
                            this.dialogVisible = false
                            this.$refs['form'].resetFields()
                            this.$emit('editrolekit')
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        deleteProject() {
            this.$store.dispatch('delRARG', this.dform).then(res => {
                let { status } = res
                if (status === 0) {
                    this.dialogVisible = false
                    this.dateRange = []
                    this.$refs['form'].resetFields()
                    this.$emit('delerolekit')
                }
            })
        }
    }
}
</script>