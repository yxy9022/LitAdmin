<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <a href="/"><img src="../assets/logo.png" style="width:42px;"></a>
      </div>
      <div class="topbar-title topbar-btn">
        <span>风车车的枫叶</span>
      </div>
      <div class="topbar-account topbar-btn">
        <span>jerry9022@qq.com</span>
      </div>
    </el-col>

    <!--中间-->
    <el-col :span="24" class="main">
      <!--左侧导航-->
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <div style="background:#4A5064;text-align:center;color:white;
        height: 30px;line-height:30px;" @click.prevent="collapse">
          <i class="iconfont icon-menufold" v-show="!collapsed"></i>
          <i class="iconfont icon-menuunfold" v-show="collapsed"></i>
        </div>

        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                 unique-opened router v-show="!collapsed" style="border-radius:0px;">
          <template v-for="(item,index) in $router.options.routes" v-if="item.menuShow">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <el-menu-item v-for="(child,key) in item.children" :index="child.path" v-if="child.menuShow">
                {{child.name}}
              </el-menu-item>
            </el-submenu>
            <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
              <i :class="item.iconCls"></i>{{item.children[0].name}}
            </el-menu-item>
          </template>
        </el-menu>

        <!--导航菜单-折叠后-->
        <ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed" style="border-radius:0px;">
          <li v-for="(item,index) in $router.options.routes" v-if="item.menuShow" class="el-submenu item">
            <template v-if="!item.leaf">
              <div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)"
                   @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
              <ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)"
                  @mouseout="showMenu(index,false)">
                <li v-for="(child,keys) in item.children" v-if="child.menuShow" class="el-menu-item"
                    style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''"
                    @click="$router.push(child.path)">{{child.name}}
                </li>
              </ul>
            </template>
            <template v-else>
              <div class="el-submenu__title el-menu-item"
                   :class="$route.path==item.children[0].path?'is-active':''"
                   style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;"
                   @click="$router.push(item.children[0].path)">
                <i :class="item.iconCls"></i>
              </div>
            </template>
          </li>
        </ul>
      </aside>

      <!--右侧内容区-->
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>

  </el-row>
</template>

<script>
export default {
  name: 'home',
  data () {
    return {
      collapsed:false,
    }
  },
  methods: {
			handleOpen() {
				//console.log('handleopen');
			},
			handleClose() {
				//console.log('handleclose');
			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			}
		}
}


</script>
<style>
  .el-menu-item, .el-submenu__title{
    color:#fff;
  }
  .el-submenu .el-menu{
    background-color: #42485B;
  }
  .el-submenu .el-menu-item:hover{
    background-color: #4A5064
  }
  .el-submenu .el-menu-item.is-active:hover, .el-menu-item.is-active:hover {
      background-color: #00C1DE;
      color:#fff;
  }
  .el-submenu__title:hover {
    background-color: #00C1DE;
  }
  .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
      background-color: #00C1DE;
      color:#fff;
  }

</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;

    .topbar-wrap {
      height: 50px;
      line-height: 50px;
      background: #373d41;
      padding: 0px;

      .topbar-btn{
        color:#fff;
      }
      .topbar-btn:hover{
        background-color: #4A5064;
      }
      .topbar-logo {
        float: left;
        text-align: center;
        width: 49px;
        border-right: 1px solid #000;
        line-height: 26px;
      }
      .topbar-title {
        float: left;
        text-align: center;
        width: 129px;
        border-right: 1px solid #000;
      }
      .topbar-account {
        float: right;
        padding-right: 12px;
      }
    }
    .main {
      display: flex;
      position: absolute;
      top: 50px;
      bottom: 0px;
      overflow: hidden;
    }
    aside {
      flex: 0 0 180px;
      width: 180px;
      .el-menu {
        height: 100%;
      }
      .collapsed {
        width: 50px;
        .item {
          position: relative;
        }
        .submenu {
          position: absolute;
          top: 0px;
          left: 50px;
          z-index: 99999;
          height: auto;
          display: none;
        }
      }
      .el-menu {
        background-color: #333744; /*42485B*/
      }
    }
    .menu-collapsed {
      flex: 0 0 50px;
      width: 50px;
    }
    .menu-expanded {
      flex: 0 0 180px;
      width: 180px;
    }

    .content-container {
      background: #fff;
      flex: 1;
      overflow-y: auto;
      padding: 20px;

      .content-wrapper {
        background-color: #fff;
        box-sizing: border-box;
      }
    }
  }
</style>
