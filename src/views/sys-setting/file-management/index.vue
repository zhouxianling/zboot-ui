<template>

  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <el-input class="search-input"
                placeholder="请输入内容"
                v-model="search.name"
                clearable>
      </el-input>
      <el-button class="filter-item"
                 type="primary"
                 icon="el-icon-search"
                 @click="searchData">搜索
      </el-button>

      <el-button class="add"
                 type="primary"
                 @click="add">添加
      </el-button>
    </div>


    <el-table :data="tableData"
              border
              style="width: 100%">

      <el-table-column prop="createTime"
                       label="添加日期">
      </el-table-column>

      <el-table-column prop="username"
                       label="账号">
      </el-table-column>

      <el-table-column prop="realName"
                       label="真实姓名">
      </el-table-column>

      <el-table-column prop="phone"
                       label="电话">
      </el-table-column>

      <el-table-column prop="dept"
                       label="部门">
      </el-table-column>

      <el-table-column prop="role"
                       label="角色">
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

  </div>
</template>

<script>

  import {getList} from '@/api/sys/userApi'

  export default {
    components: {
    },
    data() {
      return {
        search: {
          name: '',
        },
        tableData: [],
        username: '',
        page: 1,
        size: 16,
        currentPage: 0,
        total: 0,
      }
    },
    created() {
      this.requestData();
    },
    methods: {
      requestData() {
        let params = {
          username: this.search.name,
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
      menuDetail(item) {

      },
      edit(item) {

      },
      delete(item) {

      },
      //新增
      add() {
      }

    }
  }
</script>

<style>


</style>
