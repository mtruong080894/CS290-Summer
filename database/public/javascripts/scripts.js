var scriptForm = document.getElementByID("newWorkout"); //get specific ID of newYorkout

scriptForm.addEventListener("submit", function(e)
{
	e.preventDefault(); // this stops the sbumit button from subb a form
	//reference: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
	var req = new XMLHttpRequest();
	var scriptInsert = '/insert'; //set up page for insert
		var scriptParam = "scriptName="+scriptForm.elements.scriptName.value+
			"&reps="+scriptForm.elements.reps.value+
			"&weight="+scriptForm.elements.weight.value+
			"&date="+scriptForm.elements.date.value+
			"&lbs="+scriptForm.elements.lbs.value;
	//generate
	req.open("GET", scriptInsert + "?" + scriptParam, true); //request to server.GET > Post
	req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	//refernece for above: http://www.w3schools.com/ajax/ajax_xmlhttprequest_send.asp
	req.addEventListener('load', function()
	{
		if(req.status >= 200 & req.status < 400) //check status for errors
		{
			console.log('create req sent');
			var response = JSON.parse(req.responseText);
			var id = response.workouts; //ID tags
			//insertingrows than columns
			var tbl = document.getElementByID("workoutTable"); //table refernece
			var newRow = tbl.insertRow(-1); ///apend table row
			//refernece:http://www.redips.net/javascript/adding-table-rows-and-columns/

			var idCell = document.createElement('td');
			idCell.textContent = id;
			idCell.style.display="none";
			newRow.appendChild(idCell);
			//create cell for reps, weight, date and lbs. 


			var nameCell = document.createElement('td');
			nameCell.textContent = scriptForm.elements.scriptName.value;
			newRow.appendChild(nameCell);
			var repCell = document.createElement('td');
			repCell.textContent = scriptForm.elements.reps.value;
			newRow.appendChild(repCell);
			var lbsCell = document.createElement('td');
			lbsCell.textContent = scriptForm.elements.lbs.value;
			newRow.appendChild(lbsCell);  
			var weightCell = document.createElement('td');
			weightCell.textContent = scriptForm.elements.weight.value;
			newRow.appendChild(weightCell);
			var dateCell = document.createElement('td'); //error here
			dateCell.textContent = scriptForm.elements.date.value; //called data cept for date
			newRow.appendChild(dateCell); 
			var editB = document.createElement('td'); //create button for edit
			editB.innerHTML = '<a href="/updateWorkout?id='+id+'"><input type="button" value="Edit"></a>';
			var deleteB = document.createElement('td');//error here
			deleteB.innerHTML = '<input type="button" value="Delete" onclick="deleteWorkout(\'workoutTable\', this, ' +id+ ')">';
			newRow.appendChild(deleteB);

		}
		else
		{
			console.log('there was an error');
		}
	});
	res.send(scriptInsert + "?" + scriptParam);


});


function deleteWorkout(tbl, currRow, rowID) //delete workout by button 

{
	var table = document.getElementById(tbl);
	var rowCount = table.rows.length; 
	var req = new XMLHttpRequest(); //same as above
	var scriptInsert = '/delete/';


	//load button for delete
	req.open("GET" , scriptInsert + "?id=" + rowID, true); // get request for delete from server
	req.setRequestHeader('Content-Type','application/x-www-form-urlendcoded');
	req.addEventListener('load', function()
	{
		if(req.status >= 200 && req.status <400) //erorr check
		{
			console.log('Delete Request');
		}
		else
		{	
			console.log('Error');
		}
	});
	req.send(scriptInsert + "?id=" + rowID);
	for(var i = 0; i<rowCount; i++)
	{
		var row= table.row[i];
		if(row==currRow.parentNode.parentNode)//week 2/3 lecture
		{
			table.deleteRow(i);
		}	


	}	
}
