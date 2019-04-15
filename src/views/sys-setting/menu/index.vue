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
          <el-tree :data="treeData" @node-click="handleNodeClick"></el-tree>
        </el-aside>
        <!--主要区域容器-->
        <el-main class="m-el-main">
          <el-form ref="form" :model="formData" label-width="120px" :rules="ruleValidate">
            <el-form-item label="父级节点">
              <el-input v-model="formData.parentId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="标题" prop="name">
              <el-input v-model="formData.name" placeholder="输入标题" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="formData.sort" placeholder="输入排序" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="图标">
              <el-input placeholder="请输入内容" v-model="formData.icon" :disabled="isDisabled">
                <el-button slot="prepend" :icon="formData.icon" :disabled="isDisabled"></el-button>
              </el-input>
            </el-form-item>
            <el-form-item label="接口权限" prop="permission" :disabled="isDisabled">
              <el-input v-model="formData.permission" placeholder="输入接口权限" :disabled="isDisabled"></el-input>
            </el-form-item>
            <el-form-item label="前端地址" prop="path">
              <el-input v-model="formData.path" placeholder="输入前端地址" :disabled="isDisabled"></el-input>
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
  import {saveOrUpdate, getMenuTree, deleteMenuById, findMenuIdsByRoleId} from '@/api/sys/menuApi'

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
          permission: null,
          path: null,
          parentId: 0,
          icon: 'el-icon-menu',
          sort: 1,
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入菜单名称', trigger: 'blur'},
          ],
          permission: [
            {required: true, message: '请输入接口权限', trigger: 'blur'},
          ],
          path: [
            {required: true, message: '请输入前端路由', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      requestData() {
        getMenuTree().then(
          res => {
            this.treeData = res;
          },
        );
      },
      //删除
      delete(item) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            deleteMenuById(item).then(res => {
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
          //save
          case 'save':
            this.isDisabled = false;
            this.btnName = '保存';
            this.btnShow = true;
            let parentId = this.formData.parentId;
            this.formData = {};
            this.formData.parentId = parentId;
            break;
          //update
          case 'update':
            this.isDisabled = false;
            this.btnName = '更新';
            this.btnShow = true;
            break;
          //delete
          case 'delete':
            this.delete(this.formData.id);
            break
        }
      },
      saveOrUpdate(item) {
        this.$refs[item].validate((valid) => {
          if (valid) {
            saveOrUpdate(JSON.stringify(this.formData)).then(res => {
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
