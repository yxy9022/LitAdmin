<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <p>
        <canvas id="canvas01" width="600px" height="40px" style="border: 1px solid #f0f0f0;">
          你的浏览器不支持canvas，请跟换其他浏览器试一试

        </canvas>
      </p>
      <p>
        <el-row :gutter="0">
          <el-col :span="12">
            <canvas id="canvas02" width="200px" height="200px" style="border: 1px solid #f0f0f0;"></canvas>
          </el-col>
          <el-col :span="12">
            <canvas id="canvas022" width="200px" height="200px" style="border: 1px solid #f0f0f0;"></canvas>
          </el-col>
        </el-row>
      </p>
      <div style="display: block;width: 100%;">
        <p style="margin-bottom: 2px;">
          <el-button type="default" @click="rotateImage('left')" size="mini">左旋转</el-button>
          <el-button type="default" @click="rotateImage('right')" size="mini">右旋转</el-button>
        </p>
        <canvas id="canvas03" width="220px" height="220px" style="border: 1px solid #f0f0f0;"></canvas>
      </div>
      <div style="display: block;width: 100%;">
        <p style="margin-bottom: 2px;">
          <el-button type="default" @click="fandongImage()" size="mini">翻转</el-button>
        </p>
        <canvas id="canvas04" width="220px" height="220px" style="border: 1px solid #f0f0f0;"></canvas>
      </div>
    </el-col>
  </el-row>
</template>
<script>
  import ImageGirl from "@/assets/images/girl.jpg"

  export default {
    data() {
      return {
        speed: 0,
        startPoint: 0,
        rollback: false,

        pos: 0,
        imageWidth: 150,
        imageHeight: 220,
        imageTimer: null,
        imageLoaded: false,
        imageRotating: false,
        imageSalt: 10,
        num: 0,
        currentImage: null,

        fanImage: null,
        fanState: null
      }
    },
    methods: {
      dong(){
        let that = this;
        let canvas = document.getElementById('canvas01');
        let context = canvas.getContext('2d');
        context.fillStyle = 'red';
        context.beginPath();
        context.arc(20, 20, 20, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();

        setInterval(function () {
          run(context);
        }, 50);

        function run(cxt) {
          that.speed = 5;
          cxt.clearRect(0, 0, 600, 120);
          if (that.startPoint >= 580) {
            that.rollback = true
          } else if (that.startPoint <= 20) {
            that.rollback = false
          }
          if (that.rollback) {
            that.startPoint -= that.speed;
          } else {
            that.startPoint += that.speed;
          }
          cxt.beginPath();
          cxt.arc(that.startPoint, 20, 20, 0, 2 * Math.PI, true);
          cxt.closePath();
          cxt.fill();
        }
      },
      fengChe(){
        let canvas = document.getElementById("canvas02");
        let context = canvas.getContext("2d");
        let num = 0;
        setInterval(function () {
          num += 10
          rotate(context, num);
        }, 100);

        function rotate(cxt, num) {
          //清空矩形区
          cxt.clearRect(0, 0, 400, 400);
          //保存cxt状态
          cxt.save();
          //translate()方法重新映射画布上的 (0,0) 位置。
          cxt.translate(100, 100);
          //rotate()方法旋转当前的绘图。
          cxt.rotate(num * Math.PI / 180);
          //绘制
          draw(cxt);
          //恢复cxt状态
          cxt.restore();
        }

        function draw(cxt) {
          cxt.beginPath();
          cxt.fillStyle = "red";
          cxt.moveTo(0, 0);
          //arcTo() 方法在画布上创建介于两个切线之间的弧/曲线。
          cxt.arcTo(50, -50, 0, -100, 70.7);
          cxt.fill();
          cxt.closePath();
          cxt.beginPath();
          cxt.fillStyle = "yellow";
          cxt.moveTo(0, 0);
          cxt.arcTo(50, 50, 100, 0, 70.7);
          cxt.fill();
          cxt.closePath();
          cxt.beginPath();
          cxt.fillStyle = "blue";
          cxt.moveTo(0, 0);
          cxt.arcTo(-50, 50, 0, 100, 70.7);
          cxt.fill();
          cxt.closePath();
          cxt.beginPath();
          cxt.fillStyle = "green";
          cxt.moveTo(0, 0);
          cxt.arcTo(-50, -50, -100, 0, 70.7);
          cxt.fill();
          cxt.closePath();
        }
      },
      runScale(){
        let c = document.getElementById("canvas022");
        let cxt = c.getContext("2d");
        cxt.translate(100, 100);
        cxt.fillStyle = "green";
        let num = 0;
        let multiple = 1;
        let value = 1;
        setInterval(function () {
          num++;
          if (multiple === 100 || multiple === 0) {
            value *= -1;
          }
          multiple += value;
          /*局面canvas的起始点*/
          cxt.save();
          /*图形倍数(横向放大倍数,纵向放大倍数)*/
          cxt.scale(multiple * 1 / 50, multiple * 1 / 50);
          /*清理屏幕由于圆点被偏移,画布的坐标也跟着发生偏移*/
          cxt.clearRect(-100, -100, c.width, c.height);
          /*旋转弧度*/
          cxt.rotate(num * Math.PI / 180);
          /*偏移旋转中心*/
          cxt.translate(-50, -50);
          /*填充方块*/
          cxt.fillRect(0, 0, 100, 100);
          /*局面canvas的结束点*/
          cxt.restore();
        }, 20);
      },
      rotateImage(orientation){
        if (this.imageRotating)
          return;
        let that = this;
        let c = document.getElementById("canvas03");
        let cxt = c.getContext("2d");
        if (that.imageLoaded && (orientation === "left" || orientation === "right") && !that.imageRotating) {
          if (orientation === "left") {
            let t = this.pos - 1;
            this.pos = t < 0 ? 4 + t : t;
            this.num = (this.pos === 3) ? 360 : (this.pos + 1) * 90
            this.imageSalt = -10;
          } else {
            this.pos = (this.pos + 1) % 4;
            this.num = (this.pos === 0) ? 270 : (this.pos - 1) * 90
            this.imageSalt = 10;
          }
          that.imageRotating = true; //旋转中
          if (!that.imageTimer) {
            that.imageTimer = setInterval(function () {
              that.num += that.imageSalt;
              if (that.num >= 360) that.num = 0;
              runImage(cxt, that.num)
              if (that.num === 0 || that.num === 90 || that.num === 180 || that.num === 270) {
                window.clearInterval(that.imageTimer)
                that.imageTimer = null
                that.imageRotating = false //旋转完成
              }
            }, 50)
          }
        } else {
          cxt.clearRect(0, 0, 220, 220);
          that.currentImage = new Image();
          that.currentImage.src = ImageGirl;
          that.currentImage.onload = function () {
            cxt.drawImage(that.currentImage, 35, 0);
            that.imageLoaded = true;
          }
        }

        function runImage(cxt, num) {
          cxt.clearRect(0, 0, 220, 220);
          cxt.save();
          cxt.translate(110, 110);
          cxt.rotate(num * Math.PI / 180);
          cxt.translate(-110, -110);
          cxt.drawImage(that.currentImage, 35, 0);
          cxt.restore();
        }
      },
      fandongImage(i){
        let that = this;
        let c = document.getElementById("canvas04");
        let ctx = c.getContext("2d");
        if (that.fanState === 1) {
          ctx.save()
          ctx.transform(-1, 0, 0, 1, 0, 0)
          ctx.drawImage(that.fanImage, -150, 0, 150, 220)
          ctx.restore()
          that.fanState = 2;
        } else if(that.fanState === 2) {
          ctx.save()
          ctx.drawImage(that.fanImage, 0, 0)
          ctx.restore()
          that.fanState = 1;
        } else {
          that.fanImage = new Image();
          that.fanImage.src = ImageGirl;
          that.fanImage.onload = function () {
            ctx.drawImage(that.fanImage, 0, 0)
            that.fanState = 1;
          }
        }
      }
    },
    mounted(){
      this.dong();
      this.fengChe();
      this.runScale();
      this.rotateImage();
      this.fandongImage();
    }
  }
</script>
