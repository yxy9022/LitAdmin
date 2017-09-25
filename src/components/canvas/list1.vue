<template>
  <el-row class="warp">
    <el-col :span="24" class="warp-breadcrum">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><b>首页</b></el-breadcrumb-item>
      </el-breadcrumb>
    </el-col>

    <el-col :span="24" class="warp-main">
      <p style="background: lightblue">画布配置 w=200,h=100+,borderColor=#f0f0f0</p>
      <el-row :gutter="0">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawRect" size="small">画矩形</el-button>
          </p>
          <p>
            <canvas id="myCanvas01" width="200" height="100" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">
          <p class="txtrow">在画布上绘制 150x75 的矩形，从左上角开始 (0,0)。</p>
          <p class="txtrow">let c = document.getElementById("myCanvas01");</p>
          <p class="txtrow">let cxt = c.getContext("2d");</p>
          <p class="txtrow">cxt.fillStyle = '#'+(Math.random()*0xffffff<<0).toString(16); #fillStyle方法将其染色</p>
          <p class="txtrow">cxt.fillRect(0, 0, 150, 75); </p>
        </el-col>
      </el-row>

      <el-row :gutter="0" style="border-top:1px solid #f0f0f0;">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawLine" size="small">画线</el-button>
          </p>
          <p>
            <canvas id="myCanvas02" width="200" height="100" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">
          <p class="txtrow">通过指定从何处开始，在何处结束，来绘制一条线</p>
          <p class="txtrow">let c=document.getElementById("myCanvas02");</p>
          <p class="txtrow">let cxt=c.getContext("2d");</p>
          <p class="txtrow">c.height=c.height; //重设画布高度，清空画布内容</p>
          <p class="txtrow">cxt.moveTo(10,10);</p>
          <p class="txtrow">cxt.lineTo(Math.random()*200,Math.random()*100);</p>
          <p class="txtrow">cxt.lineTo(120,80);</p>
          <p class="txtrow">cxt.stroke();</p>
        </el-col>
      </el-row>

      <el-row :gutter="0" style="border-top:1px solid #f0f0f0;">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawCircle" size="small">画圆</el-button>
          </p>
          <p>
            <canvas id="myCanvas03" width="200" height="100" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">
          <p class="txtrow">通过规定尺寸、颜色和位置，来绘制一个圆</p>
          <p class="txtrow">let c=document.getElementById("myCanvas03");</p>
          <p class="txtrow">let cxt=c.getContext("2d");</p>
          <p class="txtrow">cxt.fillStyle =  '#' + (Math.random() * 0xffffff << 0).toString(16);</p>
          <p class="txtrow">cxt.beginPath();</p>
          <p class="txtrow">cxt.arc(70,50,35,0,Math.PI*2,true); //参考http://www.w3school.com.cn/tags/canvas_arc.asp</p>
          <p class="txtrow">cxt.closePath();</p>
          <p class="txtrow">cxt.fill();</p>
        </el-col>
      </el-row>

      <el-row :gutter="0" style="border-top:1px solid #f0f0f0;">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawLinearGradient" size="small">画渐变背景</el-button>
          </p>
          <p>
            <canvas id="myCanvas04" width="200" height="100" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">
          <p class="txtrow">绘制渐变背景</p>
          <p class="txtrow">let c=document.getElementById("myCanvas04");</p>
          <p class="txtrow">let cxt=c.getContext("2d");</p>
          <p class="txtrow">let grd = cxt.createLinearGradient(0, 0, 200, 100);</p>
          <p class="txtrow">grd.addColorStop(0, this.randomColor());</p>
          <p class="txtrow">grd.addColorStop(1, this.randomColor());</p>
          <p class="txtrow">cxt.fillStyle = grd;</p>
          <p class="txtrow">cxt.fillRect(0, 0, 200, 100);</p>
        </el-col>
      </el-row>

      <el-row :gutter="0" style="border-top:1px solid #f0f0f0;">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawImage" size="small">画图片</el-button>
          </p>
          <p>
            <canvas id="myCanvas05" width="200" height="160" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">
          <p class="txtrow">let c = document.getElementById("myCanvas05");</p>
          <p class="txtrow">c.height = c.height; //重设画布高度，清空画布内容</p>
          <p class="txtrow">let cxt = c.getContext("2d");</p>
          <p class="txtrow">let img = new Image()</p>
          <p class="txtrow">if (this.imageSeq === 1) {</p>
          <p class="txtrow">this.imageSeq = 2;</p>
          <p class="txtrow">img.src = ImageHill</p>
          <p class="txtrow">} else {</p>
          <p class="txtrow">this.imageSeq = 1;</p>
          <p class="txtrow">img.src = ImageBook</p>
          <p class="txtrow">}</p>
          <p class="txtrow">img.onload = function () {</p>
          <p class="txtrow">cxt.drawImage(img, 0, 0);</p>
          <p class="txtrow">};</p>

        </el-col>
      </el-row>

      <el-row :gutter="0" style="border-top:1px solid #f0f0f0;">
        <el-col :span="8">
          <p>
            <el-button type="default" @click="drawEllipse" size="small">画椭圆</el-button>
          </p>
          <p>
            <canvas id="myCanvas06" width="200" height="160" style="border: 1px solid #f0f0f0;"></canvas>
          </p>
        </el-col>
        <el-col :span="16">

        </el-col>
      </el-row>

      <p style="height: 60px"></p>
    </el-col>
  </el-row>
</template>
<script>
  import ImageHill from "@/assets/images/hill.png"
  import ImageBook from "@/assets/images/book.png"

  export default {
    data() {
      return {
        imageSeq: 1
      }
    },
    methods: {
      drawRect(){
        //画矩形
        let c = document.getElementById("myCanvas01");
        let cxt = c.getContext("2d");
        cxt.fillStyle = this.randomColor();
        cxt.fillRect(0, 0, 150, 75);
      },
      drawLine(){
        //画线
        let c = document.getElementById("myCanvas02");
        let cxt = c.getContext("2d");
        c.height = c.height; //重设画布高度，清空画布内容
        cxt.moveTo(10, 10);
        cxt.lineTo(Math.random() * 200, Math.random() * 100);
        cxt.lineTo(120, 80);
        cxt.stroke();
      },
      drawCircle(){
        //通过规定尺寸、颜色和位置，来绘制一个圆：
        let c = document.getElementById("myCanvas03");
        let cxt = c.getContext("2d");
        cxt.fillStyle = this.randomColor();
        cxt.beginPath();
        cxt.arc(70, 50, 35, 0, Math.PI * 2, true);
        cxt.closePath();
        cxt.fill();
      },
      drawLinearGradient(){
        //画渐变背景
        let c = document.getElementById("myCanvas04");
        let cxt = c.getContext("2d");
        let grd = cxt.createLinearGradient(0, 0, 200, 100);
        grd.addColorStop(0, this.randomColor());
        grd.addColorStop(1, this.randomColor());
        cxt.fillStyle = grd;
        cxt.fillRect(0, 0, 200, 100);
      },
      drawImage(){
        //绘制图像
        let c = document.getElementById("myCanvas05");
        let cxt = c.getContext("2d");
        cxt.clearRect(0, 0, 200, 160);
        let img = new Image();
        if (this.imageSeq === 1) {
          this.imageSeq = 2;
          img.src = ImageHill
        } else {
          this.imageSeq = 1;
          img.src = ImageBook
        }
        img.onload = function () {
          cxt.drawImage(img, 0, 0);
        };
      },
      randomColor(){
        return '#' + (Math.random() * 0xffffff << 0).toString(16)
      },
      drawEllipse(){
        let c = document.getElementById("myCanvas06");
        let ctx = c.getContext("2d");
        ctx.clearRect(0, 0, 200, 160);

        for (let i = 40; i < 160; i = i + 20) {
          ctx.save()
          ctx.fillStyle = this.randomColor();
          ctx.beginPath();
          ctx.translate(i, 40);
          ctx.rotate(0);
          ctx.scale(2.5, 2);
          ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }

        for (let i = 50; i < 130; i = i + 20) {
          ctx.save()
          ctx.fillStyle = this.randomColor();
          ctx.beginPath();
          ctx.translate(150, i);
          ctx.rotate(90 * Math.PI / 180);
          ctx.scale(2.5, 2);
          ctx.arc(0, 0, 10, 0, Math.PI * 2, true);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    },
    mounted(){
      this.drawRect();
      this.drawLine();
      this.drawCircle();
      this.drawLinearGradient();
      this.drawImage();
      this.drawEllipse();
    }
  }
</script>
<style scoped>
  .txtrow {
    margin-top: 5px;
    margin-bottom: 5px;
    font-size: 13px;
  }
</style>
