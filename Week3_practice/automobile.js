
function Automobile( year, make, model, type ){
    this.year = year; //integer (ex. 2001, 1995)
    this.make = make; //string (ex. Honda, Ford)
    this.model = model; //string (ex. Accord, Focus)
    this.type = type; //string (ex. Pickup, SUV)
    this.logMe = function(output_type){
        if(output_type){
            console.log(this.year + " " + this.make + " " + this.model + " " + this.type);  
        }else{
            console.log(this.year + " " + this.make + " " + this.model);    
        }
        
    }
}

var automobiles = [ 
    new Automobile(1995, "Honda", "Accord", "Sedan"),
    new Automobile(1990, "Ford", "F-150", "Pickup"),
    new Automobile(2000, "GMC", "Tahoe", "SUV"),
    new Automobile(2010, "Toyota", "Tacoma", "Pickup"),
    new Automobile(2005, "Lotus", "Elise", "Roadster"),
    new Automobile(2008, "Subaru", "Outback", "Wagon")
    ];

/*This function sorts arrays using an arbitrary comparator. You pass it a comparator and an array of objects appropriate 
for that comparator and it will return a new array which is sorted with the largest object in index 0 and the smallest in the last index*/
//here i can use a temporary array so we can shift back and forth!
//There can be multiple algorithms/sort we can choose from here
function sortArr( comparator, array ){
    for(var i = 1 ; i < array.length ; i++)
    {
        var j = i;
        while((j > 0) && (comparator(array[j], array[j-1]))) //compares
        {
            var tm_array = array[j]; //sort with tmp_array
            array[j] = array[j-1];
            array[j-1] = tm_array; //swappers
            j--;            
        }
    }
}

/*A comparator takes two arguments and uses some algorithm to compare them. 
If the first argument is larger or greater than the 2nd it returns true,
 otherwise it returns false. Here is an example that works on integers*/


/*For all comparators if cars are 'tied' according to the comparison rules then the order of those 'tied' cars 
is not specified and either can come first*/

/*This compares two automobiles based on their year. Newer cars are "greater" than older cars.*/
function yearComparator(auto1, auto2)
{
    if(auto1.year > auto2.year)
    {
        return true;
    }
    else
    {
        return false;
    }
}

/*This compares two automobiles based on their make. It should be case insensitive and makes which are alphabetically earlier 
in the alphabet are "greater" than ones that come later.*/
function makeComparator(auto1, auto2)
{
    if(auto1.make < auto2.make)
    {
        return true;
    }
    else
    {
        return false;
    }
}
/*This compares two automobiles based on their type. The ordering from "greatest" to "least" is as follows: roadster, pickup, 
suv, wagon, (types not otherwise listed). It should be case insensitive. If two cars are of equal type then the newest one by model 
year should be considered "greater".*/
function typeComparator(auto1, auto2)
{
    var type_order = 
    {
        'roadster': 4,
        'pickup': 3, 
        'suv': 2, 
        'wagon': 1
    }
    var auto1_type = type_order[auto1.type.toLowerCase()];
    var auto2_type = type_order[auto2.type.toLowerCase()];
    
    if(typeof(auto1_type) == 'undefined')
        { auto1_type = 0; }
    if(typeof(auto2_type) == 'undefined')
        { auto2_type = 0; }
    
    if(auto1_type == auto2_type)
    {
        return yearComparator(auto1, auto2);
    }else if(auto1_type > auto2_type)
    {
        return true;
    }else
    {
        return false;
    }
}


function print_auto_array(par1, output_type)
{
    for(index in par1)
    {
        par1[index].logMe(output_type); //whhy no print?
    }  
}

var output_type = true;

console.log("*****");
console.log("The cars sorted by year are:");
sortArr(yearComparator, automobiles);
print_auto_array(automobiles, output_type);

console.log("\nThe cars sorted by make are:");
sortArr(makeComparator, automobiles);
print_auto_array(automobiles, output_type);

console.log("\nThe cars sorted by type are:");
sortArr(typeComparator, automobiles);
print_auto_array(automobiles, output_type);
console.log("*****");
