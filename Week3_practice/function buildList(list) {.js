/*
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        result.push( function() {alert(item + ' ' + list[i])} ); 
        *******error is here that i is not in the scope **********
        fix by using what we learned about scoping and also the bind function.
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
} */
function buildList(list) {
    var result = [];
    for (var i = 0; i < list.length; i++) {
        var item = 'item' + list[i];
        /*alert displays the error message*/
        result.push(function(index){alert(item + ' ' + list[index])}.bind(null,i))
    }
    return result;
}
 
function testList() {
    var fnlist = buildList([1,2,3]);
    // using j only to help prevent confusion - could use i
    for (var j = 0; j < fnlist.length; j++) {
        fnlist[j]();
    }
}