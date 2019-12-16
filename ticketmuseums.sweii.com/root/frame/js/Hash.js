/*
  *  javascript·ºÐÍÀà¿â.
*/
var Hash = function(h){    
    this._data = new Object();
}
    function Hash$clear(){
        delete this._data;
        this._data = new Object();    
    }        
    function Hash$add(key,value){
        if(!key || typeof(value) === 'undefined') return false;                
        this._data[key] = {key: key,value: value};
        return true;
    }
    function Hash$addRange(h){
        for(var key in h._data){
            var item = h._data[key];
            if(typeof(item) !== 'undefined'){
                this.add(item.key,item.value);
            }
        }
    }
    function Hash$remove(key){
        if(!key) return undefined;
        var item = this._data[key];    
        delete this._data[key];
        return item;
    }
    function Hash$removeAt(index){
        if(isNaN(index)) return undefined;
        var i = 0;        
        for(var key in this._data){
            if(i == index){
                return this.remove(key);
            }
            i++;
        }
        return undefined;
    }
    function Hash$removeRange(startIndex,endIndex){
        if(isNaN(startIndex) || isNaN(endIndex)) return undefined;
        var i = 0;
        var h = new Hash();
        for(var key in this._data){
            if(i >= startIndex && i<= endIndex){
                h.add(key,this.remove(key).value);
            }
            i++;
        }
        return h;
    }    
    function Hash$getCount(){
        var i = 0;
        for(var key in this._data) i++;       
        return i;
    }
    function Hash$forEach(method,instance){
        var i = 0;
        for(var key in this._data){
            var item = this._data[key];
            if(typeof(item) !== 'undefined'){
                method.call(instance, item, i, this);
                i++;
            }else{
                delete this._data[key];
            }
        }
    }
    function Hash$getKeys(){
        var arr = new Array();
        for (var key in this._data){
            var item = this._data[key];
            arr.push(item.key);
        }
        return arr;
    }
    function Hash$getValues(){
        var arr = new Array();
        for (var key in this._data){
            var item = this._data[key];
            arr.push(item.value);
        }
        return arr;        
    }
    function Hash$getItem(key){
        if(!key) return undefined;
        var item = this._data[key];
        if (typeof(item) !== 'undefined'){
            return item.value;                        
        }else{
            delete this._data[key];
            return undefined;
        }        
    }
    function Hash$containsKey(key){        
        if(typeof(this.getItem(key)) !== 'undefined'){
            return true;
        }
        return false;
    }
    function Hash$containsValue(value){
        for(var key in this._data){        
            if(value === this._data[key].value){
                return true;
            }
        }
        return false;    
    }
Hash.prototype = {
    _data : null,
    _keys : null,
    clear : Hash$clear,
    add : Hash$add,
    addRange : Hash$addRange,
    remove : Hash$remove,
    removeAt : Hash$removeAt,
    removeRange : Hash$removeRange,
    getCount : Hash$getCount,
    forEach : Hash$forEach,
    getKeys : Hash$getKeys,
    getValues : Hash$getValues,
    getItem: Hash$getItem,
    containsKey: Hash$containsKey, 
    containsValue: Hash$containsValue
}
Hash.__typeName = 'Hash';
Hash.__class = true;