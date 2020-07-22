const accAdd = async (A, B) => {
    var r1,r2,m;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2))
    return (arg1*m+arg2*m)/m
}

const sumBigNumber = async (a, b) => {
    var res = '',
        temp = 0;
    a = a.toString().split('');
    b = b.toString().split('');
    while (a.length || b.length || temp) {
        temp += ~~a.pop() + ~~b.pop();
        res = (temp % 10) + res;
        temp = temp > 9;
    }
    return res.replace(/^0+/, '');
}

const reduce = async (a, b) => {
    console.log("a:"+a)
    console.log("b:"+b)
    a = a.toString().split('');
    b = b.toString().split('');
    var aMaxb = a.length > b.length; // 标记A是否大于B
    if(a.length == b.length)
    {
        for(var i=0, len=a.length; i<len; i++)
        {
            if(a[i] == b[i]) continue;
            aMaxb = a[i] > b[i];
            break;
        }
    }
    if(!aMaxb){
        a = [b, b = a][0]; // 只要A不比B大都交换
    }
    var result = '';
    while(a.length)
    {
        var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
        if(temp >= 0) {
            result = temp + result;
        } else{
            result = temp + 10 + result;
            a[a.length-1]--; // 由于已经保证了a一定大于等于b，所以不存在a[i-1]为undefined的情况
        }
    }
    var resultEnd = (aMaxb?'':'-') + result.replace(/^0*/g, '');// 去掉前面可能的无效0
    if(resultEnd === '-'){
        resultEnd = '0'
    }
    return resultEnd;
}

module.exports = {
    reduce,
    sumBigNumber,
    accAdd
}
