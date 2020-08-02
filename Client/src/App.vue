<template>
  <el-container>
    <el-header>
      <el-page-header content="便签">
      </el-page-header>
    </el-header>
    
    <el-main>
      <div v-for="todo in TodoList" :key="todo.id" style="margin-top: 25px;">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ todo.title }}</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click="showEdit(todo.id)">修改</el-button>
          </div>
          <div class="text item">
            {{ todo.msg }}
          </div>
        </el-card>
      </div>
      <el-button style="margin-top: 25px;" @click="showAddTodo">新建便签</el-button>
    </el-main>

    <el-dialog title="修改" :visible.sync="edit.isEdit">
      <el-form>
        <el-form-item label="标题">
          <el-input v-model="edit.data.title" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input v-model="edit.data.msg" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="edit.isEdit = false;edit.editId = '';" v-if="edit.type == 'edit'">删 除</el-button>
        <el-button @click="edit.isEdit = false;edit.editId = ''">取 消</el-button>
        <el-button type="primary" @click="ent()">确 定</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import fly from 'flyio'
fly.config.baseURL = "http://127.0.0.1:3000"

export default {
  name: 'app',
  data(){
    return {
      Server: {
      host: "127.0.0.1:3000"
    },
    edit: {
      isEdit: false,
      type: "edit",
      editId: "",
      data: {
        title: "",
        msg: "",
        dtodo: {}
      }
    },
    TodoList: [
    ]
    }
  },
  mounted(){
    this.syncTodo();
  },
  methods: {
    showEdit(id){
      this.edit.isEdit = true;
      this.edit.editId = id;
      let dtodo;

      for(let todo of this.TodoList){
        if(todo.id == id){
          dtodo = todo;
          break;
        }
      }

      this.edit.data.title = dtodo.title;
      this.edit.data.msg = dtodo.msg;
      this.edit.data.from = dtodo;
      this.edit.type = 'edit';
    },
    showAddTodo(){
      this.edit.isEdit = true;
      this.edit.data.title = '';
      this.edit.data.msg = '';
      this.edit.data.from = {};
      this.edit.type = 'add';
    },
    ent(){
      if(this.edit.type == 'edit'){
        this.editTodo()
      } else if (this.edit.type == 'add'){
        this.addTodo()
      }
    },
    async syncTodo(){
      let data = await fly.get("/getTodoList");
      console.log(data);
      if(data.data.code === '0000'){
        this.TodoList = data.data.data;
      }
    },
    async editTodo(){
      let postData = {};
      postData['id'] = this.edit.data.from.id;
      if(this.edit.data.title != this.edit.data.from.title){
        postData['title'] = this.edit.data.title;
      }
      if(this.edit.data.msg != this.edit.data.from.msg){
        postData['msg'] = this.edit.data.msg;
      }

      let data = await fly.post("editTodo",postData);

      console.log(data);

      this.edit.isEdit = false;
      this.edit.editId = '';

      if(data.data.code === '0000'){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }

      this.syncTodo();
    },
    async addTodo(){
      let postData = {};
      if(this.edit.data.title != ''){
        postData['title'] = this.edit.data.title;
      }
      if(this.edit.data.msg != ''){
        postData['msg'] = this.edit.data.msg;
      }

      let data = await fly.post("/newTodo",postData);

      console.log(data);

      this.edit.isEdit = false;
      this.edit.editId = '';

      if(data.data.code === '0000'){
        this.$message({
          message: '修改成功',
          type: 'success'
        });
      }

      this.syncTodo();
    }
  },
  components: {
    
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
