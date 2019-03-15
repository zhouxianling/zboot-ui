<template>

  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <!--  <Input v-model="search.name" class="filter-item" placeholder="名称搜索.." clearable style="width: 200px"/>
        <Button class="filter-item" type="primary" @click="searchData">搜索</Button>-->
      <Button class="add" type="primary" @click="add">添加</Button>
    </div>

    <tree-table ref="TreeTable" :data="tableData" :default-expand-all="true" :columns="columns" border
                default-children="children">
      <template slot="operation" slot-scope="{scope}">
        <Button size="small" type="primary" @click="menuDetail(scope.row)">查看</Button>
        <Button size="small" type="primary" @click="edit(scope.row)">编辑</Button>
        <Button size="small" type="error" @click="deleteMenuById(scope.row.id)">删除</Button>
      </template>
    </tree-table>

    <!--    新增和编辑-->
    <Modal width="40%" v-model="isShow" :title="mTitle" ok-text="提交">
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <FormItem label="上级菜单：">
          <Cascader :data="tableData" v-model="value" change-on-select></Cascader>
        </FormItem>
        <FormItem label="名称：" prop="name">
          <Input v-model="formItem.name" placeholder="请输入名称..." clearable=""></Input>
        </FormItem>
        <FormItem label="接口权限：" prop="permission">
          <Input v-model="formItem.permission" placeholder="请输入编号..." clearable></Input>
        </FormItem>
        <FormItem label="前端路由：" prop="path">
          <Input v-model="formItem.path" placeholder="请输入描述..." clearable></Input>
        </FormItem>
        <FormItem label="排序：">
          <el-input-number size="mini" v-model="formItem.sort"></el-input-number>
        </FormItem>
        <FormItem label="按钮：">
        </FormItem>

      </Form>
      <div slot="footer" class="dialog-footer">
        <Button type="primary" @click="m_cancel">取 消</Button>
        <Button type="primary" @click="m_ok('formItem')">确 定</Button>
      </div>
    </Modal>


    <!--详情-->
    <Modal width="40%" v-model="isLook" title="详情" footer-hide>
      <Form :model="ruleValidate" :label-width="80">
        <FormItem label="上级菜单：">{{ruleValidate.parentId}}</FormItem>
        <FormItem label="名称：">{{ruleValidate.name}}</FormItem>
        <FormItem label="接口权限：">{{ruleValidate.permission}}</FormItem>
        <FormItem label="前端路由：">{{ruleValidate.path}}</FormItem>
        <FormItem label="创建时间：">{{ruleValidate.createTime}}</FormItem>
        <FormItem label="更新时间：">{{ruleValidate.updateTime}}</FormItem>
        <FormItem label="排序：">{{ruleValidate.sort}}</FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import TreeTable from '@/components/TreeTable'
  import {save, getList, deleteRoleById, getTreeList} from '@/api/sys/menuApi'

  export default {
    components: {
      TreeTable,
    },
    data() {
      return {
        search: {
          name: '',
        },
        treeData: {},
        tableData: [],
        value: [],
        page: 1,
        size: 16,
        currentPage: 0,
        total: 0,
        isShow: false,
        isTreeShow: false,
        formItem: {
          name: "",
          permission: "",
          path: "",
          parentId: 0,
          icon: "",
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
        mTitle: '新增',
        isLook: false,
        columns: [
          {
            label: '名称',
            key: 'name',
            expand: true
          },
          {
            label: '权限',
            key: 'permission',
          },
          {
            label: '路由',
            key: 'path',
          },
          {
            label: '排序',
            key: 'sort',
          },
          {
            label: '创建时间',
            key: 'createTime'
          },
          {
            label: '更新时间',
            key: 'updateTime'
          },
          {
            label: '操作',
            key: 'operation',
            width: 200
          }
        ],
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
      //详情
      menuDetail(item) {
        this.isLook = true
        this.ruleValidate = item
      },
      edit(item) {

      },
      //删除
      deleteMenuById(item) {
        this.$Modal.confirm({
          title: '提示',
          content: '确定删除吗？',
          onOk: () => {
            deleteRoleById(item).then(res => {
              this.requestData()
              this.$message.success(res.msg)
            })
          }
        })
      },
      //新增
      add() {
        this.isShow = true
      },
      // 新增和编辑的在下面
      m_ok(name) {
        if (this.value.length > 0) {
          console.log('上级ID为', this.value[this.value.length - 1]);
          this.formItem.parentId = this.value[this.value.length - 1];
        }
        console.log(JSON.stringify(this.formItem));

        this.$refs[name].validate((valid) => {
          if (valid) {
            save(JSON.stringify(this.formItem)).then(res => {
              this.m_cancel();
              this.requestData();
              this.formItem = '';
              this.$message.success(res.msg);
            })
          }
        })
      },
      m_cancel() {
        this.isShow = false
      },

    }
  }
</script>

<style>


</style>
