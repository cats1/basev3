<template>
    <el-dialog :title="$t('btn.editGroup')" :visible.sync="dialogVisible" width="30%" @close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('role.rgroup')" prop="rgName">
                <el-input v-model="form.rgName"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveProject">{{$t('btn.saveBtn')}}</el-button>
        <el-button type="redline" @click="deleteProject" v-show="etype === 1">{{$t('btn.deleteBtn')}}</el-button>
        <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>       
      </span>
    </el-dialog>
</template>
<script>
import { getCache } from '@/utils/auth'
export default {
    props: {
        parent: null,
        isShow: null,
        etype: {
            type: Number,
            defalt: 0
        }
    },
    data() {
        return {
            dialogVisible: this.isShow,
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
            }
        }
    },
    watch: {
        parent(val) {
            this.form.rgName = val.name
            this.form.rid = val.pid
            this.dform.rid = val.pid
        },
        isShow(val) {
            this.dialogVisible = val
        },
        etype (val) {
            if (val === 0) {
                this.form = {
                    rgName: '',
                    parentId: '',
                    rid: '',
                    userid: getCache('userid')
                }
            } else {
                this.form.rgName = val.name
                this.form.rid = val.pid
                this.dform.rid = val.pid
            }
        }
    },
    mounted() {
        console.log(this.parent)
    },
    methods: {
        saveProject() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.etype === 0) {
                        this.addPro()
                    } else {
                        this.updatePro()
                    }
                } else {
                    return false;
                }
            })
        },
        addPro() {
            this.$store.dispatch('addRARG', this.form).then(res => {
                let { status } = res
                if (status === 0) {
                    this.dialogVisible = false
                    this.$refs['form'].resetFields()
                    this.$emit('editrolekit')
                }
            })
        },
        updatePro() {
            this.$store.dispatch('updateRARG', this.form).then(res => {
                let { status } = res
                if (status === 0) {
                    this.dialogVisible = false
                    this.$refs['form'].resetFields()
                    this.$emit('editrolekit')
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
                    this.$emit('editrolekit')
                }
            })
        },
        handleClose() {
            this.$emit('editrolekit')
        }
    }
}
</script>