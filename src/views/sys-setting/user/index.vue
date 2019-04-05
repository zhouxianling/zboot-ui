<template>

  <div class="app-container">
    <el-container class="m-el-container" direction="horizontal">

      <el-aside>
        <el-input placeholder="输入关键字进行过滤" size="small" v-model="filterText">
          <el-button slot="append" icon="el-icon-close" @click="resetTree">重置</el-button>
        </el-input>

        <el-tree :data="deptTreeData" ref="tree" @node-click="handleNodeClick" :default-expand-all=true
                 :filter-node-method="filterNode" style="margin-top: 20px"></el-tree>

      </el-aside>

      <el-container class="m-el-main">
        <el-header>
          <el-input placeholder="输入用户名搜索" size="small" v-model="username" clearable style="width: 240px"></el-input>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
        </el-header>

        <el-main>
          <el-button type="primary" size="small" icon="el-icon-edit" @click="btnClick">添加</el-button>
          <el-table :data="tableData" border style="width: 100%;margin-top: 20px">
            <el-table-column prop="id" align="center" label="序号"></el-table-column>
            <el-table-column align="center" prop="username" label="用户名"></el-table-column>
            <el-table-column prop="realName" align="center" label="真实姓名"></el-table-column>
            <el-table-column prop="phone" align="center" label="联系方式"></el-table-column>
            <el-table-column prop="id" align="center" label="角色">
              <template slot-scope="scope">
                <el-button type="text">{{getRole(scope.row.id)}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="lockFlag" align="center" label="状态">
              <template slot-scope="scope">
                <el-button type="text">{{scope.row.lockFlag?'有效':'锁定'}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间"></el-table-column>

            <el-table-column fixed="right" align="center" width="260" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button>
                <el-button type="text" size="small" icon="el-icon-delete">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="pagination-container" @size-change="handleSizeChange"
                         @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="size"
                         layout="total,prev, pager, next, jumper" :total="total">
          </el-pagination>
        </el-main>
      </el-container>


    </el-container>
  </div>

</template>

<script>
  import {getList} from '@/api/sys/userApi'
  import {getTreeList} from '@/api/sys/deptApi'
  import {findRoleByUserId} from '@/api/sys/roleApi'

  export default {
    data() {
      return {
        treeData: {},
        filterText: '',
        currentPage: 0,
        roleData: [],
        page: 1,
        size: 16,
        total: 0,
        username: null,
        deptId: null,
        tableData: [],
        deptTreeData: [],
        formData: {
          roleName: null,
          roleCode: null,
          roleDesc: null,
        },
        ruleValidate: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
        },
      }
    },
    created() {
      this.requestData();
      this.getDeptTree();
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      //获取列表数据
      requestData() {
        let params = {
          page: this.page,
          size: this.size,
          username: this.username,
          deptId: this.deptId,
        };
        getList(params).then(res => {
            this.tableData = res.records;
            this.total = res.total;
            this.currentPage = res.current;
          },
        );
      },
      //删除
      delete(item) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            deleteById(item).then(res => {
              this.requestData();
              this.$message.success(res.msg)
            })
          }
        })
      },

      btnClick() {


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
      handleSizeChange() {

      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.requestData();
      },
      getDeptTree() {
        getTreeList().then(
          res => {
            this.deptTreeData = res;
          },
        );
      },
      handleNodeClick(item) {
        console.log(item);
        this.deptId = item.id;
        this.requestData();

      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      resetTree() {
        this.deptId = null;
        this.requestData();
      },
      search() {
        this.requestData();
      },
      getRole(userId) {
        let roleName = "";
        findRoleByUserId(userId).then(res => {
          this.roleData = res;
        });
        this.roleData.forEach(function (item) {
          roleName += item.roleName + " "
        });
        return roleName;
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
