// 通过自调用函数  变为局部作用域 避免与其他文件命名冲突
(function(){
    var elements = []  // 记录上一次产生的食物

    // 订制食物
    function Food(obj){
        obj = obj || {};
        this.width = obj.width || 20;
        this.height = obj.height || 20;
        this.x = obj.x || 0;
        this.y = obj.y || 0;
        this.backgroundColor = obj.backgroundColor || "red";
    }
    // 初始化食物样式 并渲染到页面中
    Food.prototype.render = function(map){
        remove();
        this.x = Tools.getRandom(0,map.offsetWidth / this.width - 1)*this.width;
        this.y = Tools.getRandom(0,map.offsetHeight / this.height - 1)*this.height;
        var div = document.createElement('div');
        div.style.position = "absolute";
        div.style.width = this.width + "px";
        div.style.height = this.height + "px";
        div.style.top = this.y + "px";
        div.style.left = this.x + "px";
        div.style.backgroundColor = this.backgroundColor;
        map.appendChild(div);
        // 添加进数组 方便查找删除
        elements.push(div);
    }
    
    // 删除数组里的元素(食物)
    function remove(){
        for(var i = elements.length - 1; i >= 0; i--){
            // 通过找到父元素 然后调用removeChild() 方法 删除自己
            elements[i].parentNode.removeChild(elements[i])
            // 删除数组中的元素
            elements.splice(i,1);
        }
    }
    // 将Food 暴露给 window 全局 使得可以在外部用过window.Food 拿到
    window.Food = Food
})()
// 测试
// var map = document.querySelector('#map');
// var food = new Food();
// food.render(map);
