<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum" style="overflow-x: hidden;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <p style="margin-top: 0px; margin-bottom: 5px;color: #555;font-size: 14px;">
        space(空格键)控制开始、暂停。↑↓←→(上下左右方向键)控制蛇的移动方向。R键控制重玩。</p>
      <p style="margin-top: 5px; margin-bottom: 0px;">
        得分：<span style="color: red;padding-right: 15px;">{{snake.length - 3}}</span>
        游戏状态：<span style="color: red;">{{statusText}}</span>
      </p>
      <p style="margin-top: 5px;">
        <canvas id="canvas01" width="600px" height="400px" style="border: 1px solid teal">
          你的浏览器不支持canvas，请跟换其他浏览器试一试

        </canvas>
      </p>
    </el-col>
  </el-row>
</template>
<script>
  import _ from "lodash"

  export default {
    data() {
      return {
        snake: [],
        status: "", //
        food: [],
        timer: null,
        direction: "right" //up,down,left right
      }
    },
    methods: {
      initPlat(){
        let that = this;
        that.snake = [[230, 170], [210, 170], [190, 170]];
        that.food = [];
        that.status = "";
        that.timer = null;
        that.direction = "right";
        that.createFood();
        that.drawSnake();
//        that.run();
      },
      run(){
        let that = this;
        if (!that.timer) {
          that.timer = setInterval(function () {

            let next = null;
            //前进就是加一个头，并删除最后一点
            let x0 = that.snake[0][0];
            let y0 = that.snake[0][1];
            //计算蛇头下个位置
            if (that.direction === "left") {
              next = [x0 - 20, y0];
            } else if (that.direction === "up") {
              next = [x0, y0 - 20];
              that.snake.unshift();
            } else if (that.direction === "down") {
              next = [x0, y0 + 20];
              that.snake.unshift();
            } else if (that.direction === "right") {
              next = [x0 + 20, y0]
            }
            if (next[0] <= 0 || next[0] >= 600 || next[1] <= 0 || next[1] >= 400) {
              //如果下个位置超出游戏区域，game over
              clearInterval(that.timer);
              that.timer = null;
              that.status = "over"
            } else if (_.some(that.snake, function (item) {
                return item[0] === next[0] && item[1] === next[1]
              })) {
              //装着自己了也game over
              clearInterval(that.timer);
              that.timer = null;
              that.status = "over"
            } else {
              that.snake.unshift(next);

              if (that.food && that.food.length && that.snake[0][0] === that.food[0] && that.snake[0][1] === that.food[1]) {
                //吃了食物
                that.createFood();
              } else {
                that.snake.splice(that.snake.length - 1, 1);
              }
            }
            that.drawSnake()
          }, 200)
        }
      },
      createFood(){
        let that = this;
        let arr = _.filter(that.point, function (item) {
          return item.u === false;
        })
        let one = _.sample(arr)
        that.food = [one.x, one.y]
      },
      drawSnake(){
        //清空区域
        this.ctx.clearRect(0, 0, 600, 400);

        //画背景
//        this.ctx.save();
//        let grd = this.ctx.createLinearGradient(0, 0, 600, 400);
//        grd.addColorStop(0, "aliceblue");
//        grd.addColorStop(1, "#cfe2f3");
//        this.ctx.fillStyle = grd;
//        this.ctx.fillRect(0, 0, 600, 400);
//        this.ctx.restore();

        //画网格线
        this.ctx.save();
        this.ctx.beginPath();
        for (let i = 20; i < 600; i = i + 20) {
          this.ctx.moveTo(i, 0);
          this.ctx.lineTo(i, 400);
          this.ctx.strokeStyle = "#f0f0f0";
          this.ctx.stroke();
        }
        for (let j = 20; j < 400; j = j + 20) {
          this.ctx.moveTo(0, j);
          this.ctx.lineTo(600, j);
          this.ctx.strokeStyle = "#f0f0f0";
          this.ctx.stroke();
        }
        this.ctx.restore();

        //画食物
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "green";
        this.ctx.fillRect(this.food[0] - 10, this.food[1] - 10, 20, 20);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();

        //画蛇身
        this.ctx.save();
        this.ctx.fillStyle = "deepskyblue";
//        this.ctx.strokeStyle = "#00f";//边框颜色
        this.ctx.beginPath();
        for (let i = 1; i < this.snake.length; i++) {
          this.ctx.fillRect(this.snake[i][0] - 10, this.snake[i][1] - 10, 20, 20);
          this.ctx.closePath();
//          this.ctx.strokeRect(this.snake[i][0] - 10, this.snake[i][1] - 10, 20, 20);
//          this.ctx.closePath();
        }
        //画蛇头
        if (this.direction === "left") {
          this.ctx.arc(this.snake[0][0], this.snake[0][1], 10, 270, Math.PI, true);
          this.ctx.fillRect(this.snake[0][0], this.snake[0][1] - 10, 10, 20);
          this.ctx.arc(this.snake[this.snake.length - 1][0], this.snake[this.snake.length - 1][1], 10, 270, Math.PI, true);
        } else if (this.direction === "up") {
          this.ctx.arc(this.snake[0][0], this.snake[0][1], 10, 0, Math.PI, true);
          this.ctx.fillRect(this.snake[0][0] - 10, this.snake[0][1], 20, 10);
        } else if (this.direction === "right") {
          this.ctx.arc(this.snake[0][0], this.snake[0][1], 10, 90, Math.PI, true);
          this.ctx.fillRect(this.snake[0][0] - 10, this.snake[0][1] - 10, 10, 20);
        } else if (this.direction === "down") {
          this.ctx.arc(this.snake[0][0], this.snake[0][1], 10, 180, Math.PI, true);
          this.ctx.fillRect(this.snake[0][0] - 10, this.snake[0][1] - 10, 20, 10);
        }
        this.ctx.fill();
        this.ctx.restore();

        //画眼睛(白眼圈)
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#fff";
        if (this.direction === "left") {
          this.ctx.arc(this.snake[0][0] - 2, this.snake[0][1] - 4, 3, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] - 2, this.snake[0][1] + 4, 3, 0, Math.PI * 2, true);
        } else if (this.direction === "up") {
          this.ctx.arc(this.snake[0][0] - 4, this.snake[0][1] - 2, 3, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 4, this.snake[0][1] - 2, 3, 0, Math.PI * 2, true);
        } else if (this.direction === "right") {
          this.ctx.arc(this.snake[0][0] + 2, this.snake[0][1] - 4, 3, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 2, this.snake[0][1] + 4, 3, 0, Math.PI * 2, true);
        } else if (this.direction === "down") {
          this.ctx.arc(this.snake[0][0] - 4, this.snake[0][1] + 2, 3, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 4, this.snake[0][1] + 2, 3, 0, Math.PI * 2, true);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();

        //画眼睛(黑眼珠)
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.fillStyle = "#000";
        if (this.direction === "left") {
          this.ctx.arc(this.snake[0][0] - 2, this.snake[0][1] - 4, 2, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] - 2, this.snake[0][1] + 4, 2, 0, Math.PI * 2, true);
        } else if (this.direction === "up") {
          this.ctx.arc(this.snake[0][0] - 4, this.snake[0][1] - 2, 2, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 4, this.snake[0][1] - 2, 2, 0, Math.PI * 2, true);
        } else if (this.direction === "right") {
          this.ctx.arc(this.snake[0][0] + 2, this.snake[0][1] - 4, 2, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 2, this.snake[0][1] + 4, 2, 0, Math.PI * 2, true);
        } else if (this.direction === "down") {
          this.ctx.arc(this.snake[0][0] - 4, this.snake[0][1] + 2, 2, 0, Math.PI * 2, true);
          this.ctx.arc(this.snake[0][0] + 4, this.snake[0][1] + 2, 2, 0, Math.PI * 2, true);
        }
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
      }
    },
    computed: {
      statusText(){
        switch (this.status) {
          case "running":
            return "进行中...";
          case "pause":
            return "暂停中";
          case  "over":
            return "游戏结束"
          default:
            return "等待开始"
        }
      },
      point(){
        let plat = [];
        for (let i = 10; i < 600; i = i + 20) {
          for (let j = 10; j < 400; j = j + 20) {
            if (_.some(this.snake, function (item) {
                return item[0] === i && item[1] === j
              })) {
              plat.push({
                x: i,
                y: j,
                u: true
              })
            } else {
              plat.push({
                x: i,
                y: j,
                u: false
              })
            }
          }
        }
        return plat;
      },
      ctx(){
        return document.getElementById("canvas01").getContext("2d");
      }
    },
    mounted(){
      let that = this;
      that.initPlat();
//      console.log(that.point)
      document.onkeydown = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        if (e) {
          switch (e.keyCode) {
            case 27:
              // 按 Esc
              break;
            case 82:
              //按R键重玩
              if (that.timer) {
                clearInterval(that.timer)
                that.timer = null
              }
              that.initPlat();
              break
            case 13:
              // 按Enter
              break;
            case 32:
              // 按space
              if (that.status === "running") {
                if (that.timer) {
                  clearInterval(that.timer)
                  that.timer = null
                }
                that.status = "pause";
              } else if (that.status === "pause" || that.status === "") {
                that.status = "running";
                that.run();
              }
              break;
            case 37:
              // 按左方向
              if (!(that.snake[0][0] - 20 === that.snake[1][0] && that.snake[0][1] === that.snake[1][1])) {
                that.direction = "left";
              }
              break;
            case 38:
              // 按上方向
              if (!(that.snake[0][0] === that.snake[1][0] && that.snake[0][1] - 20 === that.snake[1][1])) {
                that.direction = "up";
              }
              break;
            case 39:
              // 按右方向
              if (!(that.snake[0][0] + 20 === that.snake[1][0] && that.snake[0][1] === that.snake[1][1])) {
                that.direction = "right";
              }
              break;
            case 40:
              // 按下方向
              if (!(that.snake[0][0] === that.snake[1][0] && that.snake[0][1] + 20 === that.snake[1][1])) {
                that.direction = "down";
              }
              break;
            default:
              break;
          }
        }
      };
    }
  }
</script>
