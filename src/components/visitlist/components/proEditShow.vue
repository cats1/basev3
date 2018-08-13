<template>
    <el-dialog :title="$t('btn.editProjectBtn')" :visible.sync="dialogVisible" width="30%" @close="handClose">
        <el-form :model="proform" :rules="rules" ref="proform" label-width="100px" class="demo-ruleForm">
            <el-form-item :label="$t('project.proname')" prop="pName">
                <el-input v-model="proform.pName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('form.remark.text')">
                <el-input v-model="proform.remark"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
        	<el-button type="primary" @click="saveProject">{{$t('btn.confirmBtn')}}</el-button>
        	<el-button type="danger" @click="deletProject" v-show="etype !== 0">{{$t('btn.deleteBtn')}}</el-button>
            <el-button @click="dialogVisible = false">{{$t('btn.cancelBtn')}}</el-button>
        </span>
    </el-dialog>
</template>
<script>
import { getCache } from '@/utils/auth'
export default {
    props: {
        btnType: {
            type: Number,
            default: 0
        },
        epdata: {
            type: Object,
            default: {}
        },
        isShow: {
            type: Boolean,
            default: false
        },
        etype: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            dialogVisible: this.isShow,
            proform: this.epdata,
            bType: 'default',
            rules: {
                pName: [
                    { required: true, message: this.$t('formCheck.validName.tip7'), trigger: 'blur' }
                ]
            }
        }
    },
    watch: {
        epdata(val) {
            this.proform = val
        },
        btnType(val) {
            if (val === 2) {
                this.bType = 'primary'
            } else {
                this.bType = 'default'
            }
        },
        isShow(val) {
            this.dialogVisible = val
        }
    },
    mounted() {
        if (this.btnType === 2) {
            this.bType = 'primary'
        } else {
            this.bType = 'default'
        }
    },
    methods: {
        editPro() {
            this.dialogVisible = true
            this.$emit('editpro', 2)
        },
        deletProject () {
        	let nform = {
        		pid: this.proform.pid,
        		userid: getCache('userid')
        	}
        	this.$store.dispatch('delProject', nform).then(res => {
                let { status } = res
                if (status === 0) {
                    this.dialogVisible = false
                    this.$emit('editkit')
                }
            })
        },
        saveProject() {
            this.$refs['proform'].validate((valid) => {
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
            this.$store.dispatch('addProject', this.proform).then(res => {
                let { status } = res
                if (status === 0) {
                    this.dialogVisible = false
                    this.$emit('editkit')
                    this.proform.pName = ''
                    this.proform.remark = ''
                }
            })
        },
        updatePro () {
        	this.$store.dispatch('updateProject', this.proform).then(res => {
                    let { status } = res
                    if (status === 0) {
                        this.dialogVisible = false
                        this.$emit('editkit')
                        this.proform.pName = ''
                        this.proform.remark = ''
                    }
            })
        },
        handClose () {
            this.$emit('editkit')
        }
    }
}
</script>