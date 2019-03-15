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
      <Form ref="formItem" :model="formItem" :label-width="100" :rules="ruleValidate">
        <FormItem label="上级：">
          <Cascader :data="treeData" v-model="value" change-on-select></Cascader>
        </FormItem>
        <FormItem label="名称：" prop="name">
          <Input v-model="formItem.name" placeholder="请输入..." clearable=""></Input>
        </FormItem>
        <FormItem label="排序：">
          <el-input-number size="mini" v-model="formItem.sort"></el-input-number>
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
        <FormItem label="父级：">{{ruleValidate.parentId}}</FormItem>
        <FormItem label="名称：">{{ruleValidate.name}}</FormItem>
        <FormItem label="创建时间：">{{ruleValidate.createTime}}</FormItem>
        <FormItem label="更新时间：">{{ruleValidate.updateTime}}</FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import TreeTable from '@/components/TreeTable'
  import {save, getList, deleteDeptById, getTreeList} from '@/api/sys/deptApi'

  export default {
    components: {
      TreeTable,
    },
    data() {
      return {
        search: {
          name: '',
        },
        treeData: [],
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
          parentId: 0,
          sort: 1,
        },
        ruleValidate: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
        },
        mTitle: '新增',
        isLook: false,
        columns: [
          {
            title: '名称',
            key: 'name',
            render: (h, params) => {
              return h('div', [
                h('Icon', {
                  props: {
                    type: 'person'
                  }
                }),
                h('strong', params.row.name)
              ]);
            }
          },
          {
            title: '父级',
            key: 'parentId'
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
          name: this.search.name,
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
            deleteDeptById(item);
            this.requestData();
          }
        })
      },
      //新增
      add() {
        getTreeList().then(res => {
          this.treeData = res;
        });
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
      searchData() {
        this.requestData();
      },
      handleCurrentChange(val) {
        this.page = val;
        this.requestData()
      },

    }
  }
</script>

<style>


</style>
