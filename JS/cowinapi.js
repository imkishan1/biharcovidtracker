function getstatus() {
 
  var date = document.querySelector("#date").value;
  var pincode = document.querySelector("#pin").value;  
  async function getcowinapidata(a, b) {
    // const url ='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+a+'&date='+b;
    // https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=110001&date=31-03-2021
    const url ="https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
      a +
      "&date=" +
      b;
    const jsonurl = await fetch(url);
    const getdata = await jsonurl.json();
    const size = Object.keys(getdata.centers).length;
    const cardul = document.getElementById("ulid");
    // console.log(getdata);
    var text = "Sorry, No Vaccination center is available for booking.";
    $('#ulid .centerdetails').empty().append();
    if (size != 0) {
      for (var i = 0; i < size; i++) {
        var sessions_size = Object.keys(getdata.centers[i].sessions).length;
        for(var j =0;j<sessions_size;j++){
        var card = `  <li class="centerdetails">
            <div class="result-element">
              <div class="hospitalname">
                <h5 id="name">${getdata.centers[i].name}</h5>
                <div id="add" class="hospital-address">
                  ${getdata.centers[i].address}
                  <p>${getdata.centers[i].sessions[j].vaccine}</p> 
                  <div class="free"><h6>${getdata.centers[i].fee_type}</h6> 
                  </div>
                </div>
              </div>
              <div class="slotsavail">
              <div class="circle">
              <h6>${getdata.centers[i].sessions[j].min_age_limit + "+"}</h6>
            </div>
                <h5>Slots Available</h5>
                <h6 id="slots">${
                  getdata.centers[i].sessions[j].available_capacity
                }</h6>
              </div>
            </div>
          </li>
        `;
        cardul.innerHTML += card;       
      }
    }
    } else {
      $('#ulid .centerdetails').empty().append();
        var card = `<li class="centerdetails"><div class="notfound"><p class="notfoundtxt">${text}</p></div></li>`;
      cardul.innerHTML += card;
    
   
      // $('#ulid .notfoundtxt').empty().append();
     
      
    }
  }
 
  
  //  if(pincode==false)
  //  {
  //    click=0;
  //  }
  //  else {
  //    var btn = document.getElementById('btn');
  //    btn.innerText = 'Refresh Page';
  //    click+=1;
  //    if(click>1)
  //    {
  //      window.location.reload();
  //    }
  //  }
  getcowinapidata(pincode, date);
 

}

function downloadfile() {
  var refid = document.querySelector("#refid").value;
  async function downloadodf(a) {
    const url =
      "https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id="+a;
    // console.log(url);
    // const datajs = await fetch(url);
    // const datajson = await datajs.json();
  }
  downloadodf(refid);
}

function SetMinDate() {
  var now = new Date();
  // console.log(now);
  var day = parseInt(("0" + now.getDate()).slice(-2));
  var month = parseInt(("0" + (now.getMonth() + 1)).slice(-2));
  // console.log(day);
  // if(day==31){
  //   day="01";
  // }
  // else{
  //   day = day+1;
  // }
  if(day==30 && ( month==2 || month==4 || month==6 ||month==9 || month==11))
  {
    day="01";
    month+=1;
  }
  else if(day==31){
    day="01";
    month+=1;
  }
  else{
    day = day+1;
  }
  month = month.toString();
  day = day.toString();
  // var month = ("0" + (now.getMonth() + 1)).slice(-2);
  var year = now.getFullYear();
  var today = day + "-" + month + "-" + year;
  $("#date").val(today);
  $("#date").attr("min", today);
}
SetMinDate();

var date = document.getElementById("date").value;
var pincode = document.getElementById("pin").value;

document.getElementById("pin").addEventListener("blur", validateZip);

function validateZip() {
  const zip = document.getElementById("pin");
  const re = /^[0-9]{6}(-[0-9])?$/;

  if (!re.test(zip.value)) {
    pin.classList.add("is-invalid");
    pin.classList.remove("is-valid");
  } else {
    pin.classList.add("is-valid");
    pin.classList.remove("is-invalid");
  }
}


