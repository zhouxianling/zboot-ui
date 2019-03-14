<template>

  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <Input v-model="search.name" class="filter-item" placeholder="名称搜索.." clearable style="width: 200px"/>
      <Button class="filter-item" type="primary" @click="searchData">搜索</Button>
      <Button class="add" type="primary" @click="add">添加</Button>

    </div>


    <el-table :data="tableData"
              border
              style="width: 100%">

      <el-table-column prop="createTime"
                       label="创建时间">
      </el-table-column>


      <el-table-column prop="roleName"
                       label="名称">
      </el-table-column>

      <el-table-column prop="roleCode"
                       label="编号">
      </el-table-column>

      <el-table-column prop="roleDesc"
                       label="描述">
      </el-table-column>

      <el-table-column prop="updateTime"
                       label="更新时间">
      </el-table-column>

      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="primary"
                     @click="look(scope.row)">
            查看
          </el-button>
          <el-button size="mini"
                     type="success"
                     @click="edit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini"
                     type="danger"
                     @click="delete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 -->
    <div class="pagination-container">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="total,prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>

    <!--    新增和编辑-->
    <Modal width="40%" v-model="show" :title="mTitle" @on-ok="m_ok" @on-cancel="m_cancel" ok-text="提交">
      <Form :model="formItem" :label-width="60">
        <FormItem label="名称">
          <Input v-model="formItem.roleName" placeholder="请输入..." clearable=""></Input>
        </FormItem>
        <FormItem label="编号">
          <Input v-model="formItem.roleCode" placeholder="请输入..." clearable></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.roleDesc" placeholder="请输入..." clearable></Input>
        </FormItem>
      </Form>
    </Modal>

    <Modal width="40%" v-model="isLook" title="详情" footer-hide>
      <Form :model="formItem" :label-width="60">
        <FormItem label="名称">
          {{mTitle}}
        </FormItem>
        <FormItem label="编号">
          {{mTitle}}
        </FormItem>
        <FormItem label="描述">
          {{mTitle}}
        </FormItem>
      </Form>
    </Modal>


  </div>
</template>

<script>

  import {save, getList} from '@/api/sys/roleApi'

  export default {

    data() {
      return {
        search: {
          name: '',
        },
        tableData: [],
        page: 1,
        size: 16,
        currentPage: 0,
        total: 0,
        show: false,
        formItem: {
          roleCode: "",
          roleDesc: "",
          roleName: "",
        },
        mTitle: '新增角色',
        isLook: false
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      requestData() {
        let params = {
          roleName: this.search.name,
          page: this.page,
          size: this.size,
        };
        getList(params).then(
          res => {
            this.tableData = res.records;
            this.currentPage = res.current;
            this.total = res.total;
          },
        );
      },
      /* 搜索方法 */
      searchData() {
        this.requestData();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.page = val;
        this.requestData()
      },
      look(item) {
        this.isLook = true
      },
      edit(item) {

      },
      delete(item) {

      },
      //新增
      add() {
        this.show = true
      },


      /* 新增和编辑的在下面*/
      m_ok() {
        console.log(JSON.stringify(this.formItem))
        save(JSON.stringify(this.formItem)).then(res => {
          this.$message.success('保存成功');
        })
      },
      m_cancel() {

      }


    }
  }
</script>

<style>


</style>
