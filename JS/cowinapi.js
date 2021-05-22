var click=0;
function getstatus() {
 
  var date = document.querySelector("#date").value;
  var pincode = document.querySelector("#pin").value;
  
  
  async function getcowinapidata(a, b) {
    
    // const url ='https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode='+a+'&date='+b;
    // https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=110001&date=31-03-2021
    const url =
      "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=" +
      a +
      "&date=" +
      b;
    const jsonurl = await fetch(url);
    const getdata = await jsonurl.json();
    const size = Object.keys(getdata.centers).length;
    const cardul = document.getElementById("ulid");
    console.log(getdata);
    
    var text = "Sorry, No Vaccination center is available for booking.";
    if (size != 0) {
      for (var i = 0; i < size; i++) {
        var card = `  <li class="centerdetails">
            <div class="result-element">
              <div class="hospitalname">
                <h5 id="name">${getdata.centers[i].name}</h5>
                <div id="add" class="hospital-address">
                  ${getdata.centers[i].address}
                  <p>${getdata.centers[i].sessions[0].vaccine}</p> 
                  <div class="free"><h6>${getdata.centers[i].fee_type}</h6> 
                  </div>
                </div>
              </div>
              <div class="slotsavail">
              <div class="circle">
              <h6>${getdata.centers[i].sessions[0].min_age_limit + "+"}</h6>
            </div>
                <h5>Slots Available</h5>
                <h6 id="slots">${
                  getdata.centers[i].sessions[0].available_capacity
                }</h6>
              </div>
            </div>
          </li>
        `;
        cardul.innerHTML += card;       
      }
    } else {
      var card = `<div class="notfound"><p class="notfoundtxt">${text}</p></div>`;
      cardul.innerHTML += card;
    }
  }

  getcowinapidata(pincode, date);
 
  var btn = document.getElementById('btn');
  click+=1;
  if(pincode!=null)
  {
    btn.innerText = 'Refresh Page';
  }
  if(click>1)
  {
    window.location.reload();
  }
}

function downloadfile() {
  var refid = document.querySelector("#refid").value;
  async function downloadodf(a) {
    const url =
      "https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download?beneficiary_reference_id=" +
      a;
    // console.log(url);
    // const datajs = await fetch(url);
    // const datajson = await datajs.json();
  }
  downloadodf(refid);
}

function SetMinDate() {
  var now = new Date();
  var day = parseInt(("0" + now.getDate()).slice(-2));
  day = day;
  day = day.toString();
  var month = ("0" + (now.getMonth() + 1)).slice(-2);
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


