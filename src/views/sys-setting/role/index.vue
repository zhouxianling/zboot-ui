<template>
  <div class="app-container">
    <div class="m-el-container">
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="addClick">
        添加
      </el-button>
      <el-table :data="tableData" border style="width: 100%;margin-top: 20px">
        <el-table-column prop="id" align="center" label="序号"></el-table-column>
        <el-table-column align="center" prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="roleCode" align="center" label="角色编码"></el-table-column>
        <el-table-column prop="roleDesc" align="center" label="角色描述"></el-table-column>
        <el-table-column prop="createTime" align="center" label="时间"></el-table-column>
        <el-table-column fixed="right" align="center" width="260" label="操作">
          <template slot-scope="scope">
            <el-button @click="detail(scope.row)" type="text" size="small" icon="el-icon-view">查看</el-button>
            <el-button @click="updateById(scope.row)" type="text" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button @click="deleteById(scope.row.id)" type="text" size="small" icon="el-icon-delete">删除</el-button>
            <el-button @click="addMenu(scope.row)" type="text" size="small" icon="el-icon-plus">权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pagination-container" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     :current-page.sync="currentPage" :page-size="size" layout="total,prev, pager, next, jumper"
                     :total="total">
      </el-pagination>

      <!--新增查看-->
      <el-dialog :title="dialogTitle" :visible.sync="isVisible">
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="formData.roleName" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="角色编码" prop="roleCode">
            <el-input v-model="formData.roleCode" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="formData.roleDesc" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item label="角色权限">
            <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="treeBox"
                     highlight-current :disabled="isDisabled" :default-checked-keys="defaultCheckedKeys"></el-tree>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="isVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')" size="small" :disabled="isDisabled">确 定</el-button>
         </span>
      </el-dialog>


      <el-dialog title="分配权限" :visible.sync="isMenuVisible">
        <el-tree :data="treeData" show-checkbox default-expand-all node-key="id" ref="treeBox"
                 highlight-current :default-checked-keys="defaultCheckedKeys"></el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitMenu" size="small">更 新</el-button>
         </span>

      </el-dialog>


    </div>
  </div>
</template>

<script>
  import {deleteById, getList, save} from '@/api/sys/roleApi'
  import {getMenuTree, findMenuIdsByRoleId} from '@/api/sys/menuApi'

  export default {
    data() {
      return {
        treeData: [],
        currentPage: 0,
        dialogTitle: '新增',
        isVisible: false,
        isMenuVisible: false,
        isDisabled: false,
        isShowCheckbox: false,
        defaultCheckedKeys: [],
        page: 1,
        size: 16,
        total: 0,
        tableData: [],
        formData:
          {
            roleName: '',
            roleCode: '',
            roleDesc: '',
            menuIds: '',
          },
        rules: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleCode: [
            {required: true, message: '请输入角色编码', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.requestData();

      getMenuTree().then(
        res => {
          this.treeData = res;
        },
      );
    },
    methods: {
      //获取列表数据
      requestData() {
        let params = {
          page: this.page,
          size: this.size,
        };
        getList(params).then(res => {
            this.tableData = res.records;
            this.total = res.total;
            this.currentPage = res.current;
          },
        );
      },
      //删除
      deleteById(id) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            deleteById(id).then(res => {
              this.requestData();
              this.$message.success(res.msg)
            })
          }
        })
      },
      //TODO 查询详情
      detail(itemData) {
        this.handleMenuIds(itemData.id);
        this.formData = itemData;
        this.isVisible = true;
        this.isDisabled = true;
        this.dialogTitle = '角色详情';
      },
      //TODO 新增或者更新
      addClick() {
        this.isVisible = true;
        this.formData = {};
        this.isDisabled = false;
        this.defaultCheckedKeys = [];
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            save(JSON.stringify(this.formData)).then(res => {
              this.requestData();
              this.isVisible = false;
              this.$message.success('保存成功');
            })
          } else {
            return false;
          }
        });
      },
      handleSizeChange() {

      },
      //更新
      updateById(item) {
        this.isVisible = true;
        this.formData = item;
        this.isDisabled = false;
        this.handleMenuIds(item.id);
        this.dialogTitle = '角色编辑';
      },
      handleCurrentChange(val) {
        this.page = val;
        this.requestData();
      },
      submitMenu() {
        let ids = this.$refs.treeBox.getCheckedKeys();
        console.log(ids);
        if (ids) {
          this.formData.menuIds = ids.join(",");
        }
        this.isMenuVisible = false;
      },
      addMenu(item) {
        this.isMenuVisible = true;
        this.handleMenuIds(item.id);

      },
      handleMenuIds(id) {
        findMenuIdsByRoleId(id).then(
          data => {
            this.defaultCheckedKeys = data;
          });
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
