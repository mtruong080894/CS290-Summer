
document.addEventListener('DOMContentLoaded', loader);

function loader() {
    loadbutton();
    loadbuttonHttp();
}
httpbinBaseUri = "http://httpbin.org";
httpbinPostUri = httpbinBaseUri + "/post"; //my post? 

function loadbuttonHttp() 
{
    document.getElementById('submit').addEventListener('click', function (event) {
       
        document.getElementById('response').textContent = "";

        var sendText = document.getElementById('httpbinInputField').value;
        var req = new XMLHttpRequest();
        req.open("POST", httpbinPostUri, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function() { //Reference: http://www.w3schools.com/ajax/ajax_xmlhttprequest_onreadystatechange.asp
            if(req.status >= 200 && req.status < 400) {
                var pJson = JSON.parse(req.responseText);
                var pText = JSON.stringify(pJson.json);
                if(pText === 'null')
                    document.getElementById('response').textContent = 'Invalid JSON';
                else
                    document.getElementById('response').textContent = pText;
            }
        });
        req.send(sendText);
        event.preventDefault();
    })
}