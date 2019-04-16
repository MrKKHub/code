(function(){
    var elements = [];     //建立一个空数组 用来记录每次生成的蛇节
    // 创建蛇对象
    function Snake(obj){
        obj = obj || {};
        this.width = obj.width || 20;
        this.height = obj.height || 20;
        // 蛇运动的方向
        this.direction = obj.direction || "right";
        // 蛇的身体  第一个元素是蛇头
        this.body = [
            { x:3,y:2,color:"red"},
            { x:2,y:2,color:"yellow"},
            { x:1,y:2,color:"yellow"},
        ]
    }
    Snake.prototype.render = function(map){
        remove();
        var len = this.body.length;
        for(var i = 0; i < len; i++){
            obj = this.body[i];
            var div = document.createElement('div');
            elements.push(div)    //记录每一次生成的蛇节 存放在数组中
            div.style.position = "absolute";
            div.style.width = this.width + "px";
            div.style.height = this.height + "px";
            div.style.left = obj.x * this.width + "px";
            div.style.top = obj.y * this.height + "px";
            div.style.backgroundColor = obj.color;
            map.appendChild(div);
        }
    }
    // 控制蛇移动的方法
    Snake.prototype.move = function(food,map){
        // 获取蛇的身体 是蛇节每次移动 后一个蛇节移动到前一个蛇节的位置  
            var len = this.body.length;
            for(var i = len-1; i > 0;i--){
                this.body[i].x = this.body[i-1].x;
                this.body[i].y = this.body[i-1].y;
            }
            //获取蛇头的移动
            var head = this.body[0];
            switch(this.direction){
                case 'right':
                    head.x += 1;
                    break;
                case 'left':
                    head.x -= 1;
                    break;
                case 'top':
                    head.y -= 1;
                    break;
                case 'bottom':
                    head.y += 1;
                    break;
            }
            // 判断蛇头是否与食物的坐标重合 如果重合 则吃掉食物并且身子加上一节
            var headX = this.body[0].x * this.width;
            var headY = this.body[0].y * this.height;
            if(headX === food.x && headY === food.y){
                    //增加蛇的长度
                    var len = this.body.length;
                    var last = this.body[len-1];
                    this.body.push({
                        x:last.x,
                        y:last.y,
                        color:last.color
                    })
                    // 重新生成一个小方块
                    food.render(map);
            }
    }
    // 删除蛇节的方法  私有成员 外部访问不了
    function remove(){
        for(var i = elements.length - 1; i >= 0; i--){
            // 删除自身蛇节 
            elements[i].parentNode.removeChild(elements[i]);
            // 删除在数组中记录的蛇节
            elements.splice(i,1);

        }
    }
            // 把Snake暴露给全局对象window
            window.Snake = Snake
})()
// 测试代码
// var map = document.querySelector('#map');
// var snake = new Snake();
// snake.render(map);