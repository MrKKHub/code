(function(){
    var Tools = {
        getRandom:function getRandom(min,max){
            max = Math.floor(max);
            min = Math.ceil(min);
            return Math.floor(Math.random()*(max-min+1))+min
        }
    }
    window.Tools = Tools; 
})()