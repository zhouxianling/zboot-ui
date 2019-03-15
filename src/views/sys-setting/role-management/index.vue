<template>

  <div class="app-container">
    <!-- 过滤条件 -->
    <div class="filter-container">
      <Input v-model="search.name" class="filter-item" placeholder="名称搜索.." clearable style="width: 200px"/>
      <Button class="filter-item" type="primary" @click="searchData">搜索</Button>
      <Button class="add" type="primary" @click="add">添加</Button>
    </div>

    <Table border :columns="columns" :data="tableData"></Table>

    <Page class="pagination-container" :total="total" :current.sync="currentPage" :page-size="size"
          @on-change="handleCurrentChange" show-total
          show-elevator/>

    <!--    新增和编辑-->
    <Modal width="40%" v-model="isShow" :title="mTitle" ok-text="提交">
      <Form ref="formItem" :model="formItem" :label-width="60" :rules="ruleValidate">
        <FormItem label="名称" prop="roleName">
          <Input v-model="formItem.roleName" placeholder="请输入名称..." clearable=""></Input>
        </FormItem>
        <FormItem label="编号" prop="roleCode">
          <Input v-model="formItem.roleCode" placeholder="请输入编号..." clearable></Input>
        </FormItem>
        <FormItem label="描述">
          <Input v-model="formItem.roleDesc" placeholder="请输入描述..." clearable></Input>
        </FormItem>
      </Form>

      <div slot="footer" class="dialog-footer">
        <Button type="primary" @click="m_cancel">取 消</Button>
        <Button type="primary" @click="m_ok('formItem')">确 定</Button>
      </div>

    </Modal>

    <Modal width="40%" v-model="isLook" title="详情" footer-hide>
      <Form :model="ruleValidate" :label-width="80">
        <FormItem label="名称：">{{ruleValidate.roleName}}</FormItem>
        <FormItem label="编号：">{{ruleValidate.roleCode}}</FormItem>
        <FormItem label="描述：">{{ruleValidate.roleDesc}}</FormItem>
        <FormItem label="创建时间：">{{ruleValidate.createTime}}</FormItem>
        <FormItem label="更新时间：">{{ruleValidate.updateTime}}</FormItem>
        <FormItem label="所属部门："></FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>

  import {save, getList, deleteRoleById} from '@/api/sys/roleApi'

  export default {
    components: {},
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
        isShow: false,
        formItem: {
          roleCode: "",
          roleDesc: "",
          roleName: "",
        },
        ruleValidate: {
          roleName: [
            {required: true, message: '请输入角色名称', trigger: 'blur'},
          ],
          roleCode: [
            {required: true, message: '请输入角色编号', trigger: 'blur'}
          ],
        },
        mTitle: '新增角色',
        isLook: false,
        columns: [
          {
            title: '名称',
            key: 'roleName',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.roleName)
              ]);
            }
          },
          {
            title: '编号',
            key: 'roleCode'
          },
          {
            title: '描述',
            key: 'roleDesc'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '更新时间',
            key: 'updateTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.menuDetail(params.row)
                    }
                  }
                }, '查看'),

                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '编辑'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.deleteMenuById(params.row.id)
                    }
                  }
                }, '删除')
              ]);
            }
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

      // 搜索方法
      searchData() {
        this.requestData();
      },

      handleCurrentChange(val) {
        this.page = val;
        this.requestData()
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
        this.$refs[name].validate((valid) => {
          if (valid) {
            save(JSON.stringify(this.formItem)).then(res => {
              this.m_cancel()
              this.requestData()
              this.$message.success(res.msg)
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
