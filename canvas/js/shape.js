function shape(canvas,copy,cobj,xp){
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.xp=xp;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.historys=[];
    this.type="line";
    this.style="stroke";
    this.border="#000";
    this.fill="#000";
    this.linewidth=1;
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    this.xpsize=10;

}
shape.prototype={
    init:function(){
        this.cobj.strokeStyle=this.border;
        this.cobj.fillStyle=this.fill;
        this.cobj.lineWidth=this.linewidth;
        this.xp.display="none";
    },
    draw:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historys.length>0){
                    that.cobj.putImageData(that.historys[that.historys.length-1],0,0);
                }
                that[that.type](startx,starty,endx,endy);

            };

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y)
        that.cobj[that.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },

    jiao:function(x,y,x1,y1){
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(Math.cos(angle * i) * r + x, Math.sin(angle * i) * r + y);
            }else{
                this.cobj.lineTo(Math.cos(angle * i) * r1 + x, Math.sin(angle * i) * r1 + y);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historys.length>0){
                    that.cobj.putImageData(that.historys[that.historys.length-1],0,0);
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();

            };

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    clear:function(){
        var that=this;

        this.copy.onmousemove=function(e){
            var mx= e.offsetX;
            var my= e.offsetY;
            var lefts=mx-that.xpsize/2;
            var tops =my-that.xpsize/2;
            //console.log(lefts)
            if(lefts<0){
                lefts=0;
            }
            if(tops<0){
                tops=0;
            }
            if(lefts>that.width-that.xpsize){
                lefts=that.width-that.xpsize;
            }
            if(tops>that.height-that.xpsize){
                tops=that.height-that.xpsize;
            }
            that.xp.style.cssText="display:block;left:"+lefts+"px;top:"+tops+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;";
        };

        that.copy.onmousedown=function(e){
            //alert(1)
            that.copy.onmousemove=function(e){
                var mx= e.offsetX;
                var my= e.offsetY;
                var lefts=mx-that.xpsize/2;
                var tops =my-that.xpsize/2;
                if(lefts<0){
                    lefts=0;
                }
                if(tops<0){
                    tops=0;
                }
                if(lefts>that.width-that.xpsize){
                    lefts=that.width-that.xpsize;
                }
                if(tops>that.height-that.xpsize){
                    tops=that.height-that.xpsize;
                }
                that.xp.style.cssText="display:block;left:"+lefts+"px;top:"+tops+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;";
                that.cobj.clearRect(lefts,tops,that.xpsize,that.xpsize)
            };

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.clear();
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));

            }
        }

    }

};

