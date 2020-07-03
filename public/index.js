var items = document.querySelectorAll('.new');
    items[0].classList.add('hidden');

function sendData(){
    var name = document.getElementById('myform')[0].value.toUpperCase();
    var mName = document.getElementById('myform')[1].value;
    var stDate = document.getElementById('myform')[2].value;
    var endDate = document.getElementById('myform')[3].value;
    var stAr = stDate.split('-');
    var stDate = stAr[0];
    var stMon = stAr[1].toUpperCase()
    var ndAr = endDate.split('-');
    var ndDate = ndAr[0];
    var ndMon = ndAr[1].toUpperCase()

    var formData = {
        name: name,
        movies:[
            {
                mName: mName,
                stDate: stDate,
                stMon: stMon,
                ndDate: ndDate,
                ndMonth:ndMon
            }
        ] 
        
    }

    var fd = JSON.stringify(formData)

    const http = new XMLHttpRequest()
    http.open('POST', 'http://localhost:3000/selectedMovie')
    http.setRequestHeader('Content-type', 'application/json')
    http.send(fd) 
    http.onload = function() {
        // Do whatever with response
        console.log(http.responseText)
    }
}

function showData(){
    var name = document.getElementById('myform')[0].value.toUpperCase();
    
    $.getJSON(`http://localhost:3000/sm/${name}`, function(d,s){
        console.log(d);
        alert(`hey, ${d.actorName}, you have successfully made ${d.movies.length} crore.`)
        items[0].classList.remove('hidden');
        d.movies.forEach((x) =>{
            var tag = document.createElement("p");
            var text = document.createTextNode(`${x.mName} : from ${x.stDate}-${x.stMon} to ${x.ndDate}-${x.ndMonth}`);
            tag.appendChild(text);
            var element = document.getElementById("fillData");
            element.appendChild(tag);
        })
        console.log(s)
    })
}