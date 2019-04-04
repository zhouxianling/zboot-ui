<template>
  <div class="app-container">
    <div class="m-el-container">
      <el-button type="primary" size="mini" icon="el-icon-edit" @click="btnClick">添加</el-button>
      <el-table
        :data="tableData"
        border
        style="width: 100%;margin-top: 20px">
        <el-table-column
          prop="id"
          align="center"
          label="序号">
        </el-table-column>

        <el-table-column
          align="center"
          prop="roleName"
          label="角色名称"
        >
        </el-table-column>
        <el-table-column
          prop="roleCode"
          align="center"
          label="角色编码"
        >
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          align="center"
          label="描述">
        </el-table-column>
        <el-table-column
          prop="createTime"
          align="center"
          label="时间">
        </el-table-column>

        <el-table-column
          fixed="right"
          align="center"
          width="260"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="" type="text" size="small" icon="el-icon-view">查看</el-button>
            <el-button type="text" size="small" icon="el-icon-edit">编辑</el-button>
            <el-button type="text" size="small" icon="el-icon-delete">删除</el-button>
            <el-button type="text" size="small" icon="el-icon-plus">权限</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination-container"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="total,prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {save, getList, deleteById} from '@/api/sys/roleApi'

  export default {
    data() {
      return {
        treeData: {},
        currentPage: 0,
        page: 1,
        size: 16,
        total: 0,
        tableData: [],
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
