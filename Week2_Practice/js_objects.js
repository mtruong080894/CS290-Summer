//Js_objects
//Requirements: function deepEqual, takes 2 inputs === True if value 
//are same, recursive.  

function deepEqual(a,b) 
{
//two inputs ob ojects
	if (a === b)  return true; //this is true when these share same value prop.
	if (a ==  null || typeof a !="object" || b == null || typeof b !="object" ) //Null =/ null
		return false; //this checks if they dont equal

	var a_count = 0, b_count = 0; //counters for loop iteration
	for(var properties in a)
		a_count++;
	for( var properties in b) 
	{
		b_count++;
	
	if(!(properties in a) || !deepEqual(a[properties], b[properties]))
		return false;
	}
return a_count === b_count;
}

//given test case
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true
