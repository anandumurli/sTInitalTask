// $(document).ready(function(){
    
// });

function sendData(){
    var name = document.getElementById('myform')[0].value;
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
        'name': name, 
        'mName': mName,
        'stDate': stDate,
        'stMon': stMon,
        'ndDate': ndDate,
        'ndMonth':ndMon
        
    }

    var fd = JSON.stringify(formData)
    console.log(' some data was sent', fd)
}