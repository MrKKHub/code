(function(){
    var that;
    // 创建食物对象 和 蛇对象 以及地图
    function Game(map){
        this.food = new Food();
        this.snake = new Snake();
        this.map = map;
        that = this;    // 每当开始游戏对象时  通过that来记录保存这个游戏对象 方便其他处使用
    }
    // 把蛇和食物渲染到地图上去
    Game.prototype.start = function(){
        this.food.render(this.map);
        this.snake.render(this.map);
        runSnake();  // 让蛇运动起来
        bindKey();   //键盘控制蛇运动方向
        // 测试move方法
        // this.snake.move();
        // this.snake.render(this.map);
        // this.snake.move();
        // this.snake.render(this.map);
    }
            // 开始游戏的逻辑   
        // 1. 让蛇能自己动起来   私有函数 
        function runSnake(){
            var timer = setInterval(function(){
                that.snake.move(that.food,that.map);
                that.snake.render(that.map);
            // 当蛇头超出边界 游戏结束 清除定时器
            var head = that.snake.body[0];
            var maxX = that.map.offsetWidth / that.snake.width;
            var maxY = that.map.offsetHeight / that.snake.height;
            if(head.x < 0 || head.x >= maxX){
                alert('Game Over!')
                clearInterval(timer)
            }
            if(head.y < 0 || head.y >= maxY){
                window.alert('Game Over!')

                clearInterval(timer)
            }
            },150)
        }
        //2.通过方向键 控制蛇的移动  
        function bindKey(){
            // 给文档注册键盘按下事件
            document.addEventListener('keydown',function(e){
                    // console.log(e.keyCode);
                    switch(e.keyCode){
                            case 38:
                            that.snake.direction = "top";
                            break;
                            case 39:
                            that.snake.direction = "right";
                            break;
                            case 40:
                            that.snake.direction = "bottom";
                            break;
                            case 37:
                            that.snake.direction = "left";
                            break;
                    }
            },false)
        }
        //3.. 蛇遇到食物后的状态 
        //4.. 蛇碰到边界后游戏结束
    window.Game = Game;
})()
 
