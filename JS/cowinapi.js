function getstatus()
{
    var date = document.querySelector('#date').value;
    var pincode = document.querySelector("#pin").value;
       async function getcowinapidata(a,b){
        const url ='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+a+'&date='+b;
        const jsonurl = await fetch(url);
        const getdata = await jsonurl.json();
        console.log(getdata);
        const size = Object.keys(getdata.sessions).length;
        console.log(size);
        const cardul = document.getElementById('ulid');
        for(var i =0;i<size;i++)
        {
            var card = `  <li class="centerdetails">
            <div class="result-element">
              <div class="hospitalname">
                <h5 id="name">${getdata.sessions[i].name}</h5>
                <div id="add" class="hospital-address">
                  ${getdata.sessions[i].address}
                </div>
              </div>
              <div class="slotsavail">
                <h5>Slots Available</h5>
                <h6 id="slots">${getdata.sessions[i].available_capacity}</h6>
              </div>
            </div>
          </li>`
          cardul.innerHTML +=card;

        }
    
        
    }
    getcowinapidata(pincode,date);
}



function SetMinDate() {
    var now = new Date();
    var day = parseInt(("0" + now.getDate()).slice(-2));
    day = day+1;
    day = day.toString();
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#date').val(today);
    $('#date').attr('min', today);
}
SetMinDate();

var date = document.getElementById('date').value;
var pincode = document.getElementById("pin").value;


