<template>
  <div class="app-container">
    <el-container class="m-el-container">
      <el-header>
        <el-button-group>
          <el-button type="primary" @click="btnClick('save')">添加</el-button>
          <el-button type="primary" @click="btnClick('update')">编辑</el-button>
          <el-button type="primary" @click="btnClick('delete')">删除</el-button>
        </el-button-group>
      </el-header>

      <el-container direction="horizontal">
        <!--左侧侧边栏-->
        <el-aside class="m-el-aside" width="400px">
          <el-tree :data="tableData" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <!--主要区域容器-->
        <el-main class="m-el-main">
          <el-form ref="form" :model="formData" label-width="120px" :rules="ruleValidate">
            <el-form-item label="父级节点">
              <el-input v-model="formData.parentId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="formData.name" placeholder="输入部门名称" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="部门排序">
              <el-input v-model="formData.sort" placeholder="输入部门排序" :disabled="isDisabled"></el-input>
            </el-form-item>
          </el-form>

          <el-container direction="horizontal" v-show="btnShow">
            <el-button type="primary" @click="saveOrUpdate('form')" style="margin-left: 30px">{{btnName}}</el-button>
            <el-button @click="btnCancel">取消</el-button>
          </el-container>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import {save, getList, deleteDeptById, getTreeList} from '@/api/sys/deptApi'

  export default {
    data() {
      return {
        treeData: {},
        btnName: null,
        tableData: [],
        btnShow: false,
        value: [],
        isDisabled: true,
        formData: {
          name: null,
          parentId: 0,
          sort: 1,
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入部门名称', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      //获取列表数据
      requestData() {
        getTreeList().then(
          res => {
            this.tableData = res;
          },
        );
      },
      //todo 更新
      update(item) {


      },
      //删除
      delete(item) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            deleteDeptById(item).then(res => {
              this.requestData();
              this.$message.success("删除成功")
            })
          }
        })
      },
      //TODO
      handleNodeClick(data) {
        this.isDisabled = true;
        this.formData = data;
        this.btnShow = false;

      },
      btnClick(type) {
        switch (type) {
          case 'save':
            this.isDisabled = false;
            this.btnName = '保存';
            this.btnShow = true;

            let parentId = this.formData.parentId;
            this.formData = {};
            this.formData.parentId = parentId;
            break;
          case 'update':
            this.isDisabled = false;
            this.btnName = '更新';
            this.btnShow = true;
            break;
          case 'delete':
            this.delete(this.formData.id);
            break
        }
      },
      saveOrUpdate(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            save(JSON.stringify(this.formData)).then(res => {
              this.requestData();
              this.$message.success('保存成功');
            })
          }
        })
      },
      btnCancel() {
        this.btnShow = false;
        this.isDisabled = true;
      }
    }
  }
</script>

<style>
  .m-el-container {
    background: white;
    padding: 20px;
  }

  .m-el-main {
    -moz-box-shadow: 1px 4px 5px #eeeeee; /* 老的 Firefox */
    box-shadow: 1px 4px 5px #eeeeee;

  }

  .m-el-aside {

  }

</style>
