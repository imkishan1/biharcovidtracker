

async function getcovidapiInf(){

    const jsondata2 = await fetch('https://api.covid19india.org/data.json');
    const jsdata2 = await jsondata2.json();
    const dataforchart = jsdata2.statewise;
    const size = Object.keys(dataforchart).length;
    // if(dataforchart[])
    // dataforchart[15];
    // dataforchart.shift();
    // console.log(dataforchart)
    const jsondata3 = await fetch('https://api.covid19india.org/v4/min/data.min.json');
    const dataj = await jsondata3.json();
    dataforchart.splice(31, 1);
    const dis = dataj['BR'].districts;
    const lengdist = Object.keys(dis).length;
    // console.log(dis);
    // console.log(dataj)
    var districts = ['Patna','Araria','Arwal', 'Aurangabad','Banka','Begusarai','Bhagalpur','Bhojpur','Buxar','Darbhanga',
    'East Champaran','Gaya','Gopalganj','Jamui','Jehanabad',
    'Kaimur','Katihar','Khagaria','Kishanganj','Lakhisarai',
    'Madhepura','Madhubani','Munger','Muzaffarpur',
    'Nalanda','Nawada','Purnia','Rohtas','Saharsa','Samastipur','Saran',
    'Sheikhpura','Sheohar','Sitamarhi','Siwan',
    'Supaul','Vaishali','West Champaran']

var active;
var cnf_nav = document.getElementById('vaccine1')
var vac_nav = document.getElementById('vaccine2')
cnf_nav.innerText= `${dataj['BR'].total.vaccinated1.toLocaleString('en-IN')}`
vac_nav.innerText= `${dataj['BR'].total.vaccinated2.toLocaleString('en-IN')}`
const bihar = document.getElementById('bihar');

for(var i=0;i<lengdist;i++)
{
if( dis[districts[i]].delta != null)
{
  
  var conf = dis[districts[i]].total.confirmed;
  var rec = dis[districts[i]].total.recovered;
  var deathsdistric =  dis[districts[i]].total.deceased;
  active=(conf-(rec+deathsdistric));
  if(isNaN(active)==true)
  {
    active='-';
  }

    if(dis[districts[i]].delta.deceased == null)
    {
     
        dis[districts[i]].delta.deceased=0;
    }
    if(dis[districts[i]].delta.confirmed == null)
    {
     
        dis[districts[i]].delta.confirmed=0;
    }
  
    if(dis[districts[i]].delta.tested == null)
    {
     
        dis[districts[i]].delta.tested=0;
    }
    if(dis[districts[i]].delta.recovered == null)
    {
     
        dis[districts[i]].delta.recovered=0;
    }
  
    if(dis[districts[i]].delta.vaccinated1 == null)
    {
        dis[districts[i]].delta.vaccinated1=0;
    }
    if(dis[districts[i]].delta.vaccinated2 == null)
    {
        dis[districts[i]].delta.vaccinated2=0;
    }
  var totalvaccinated = parseInt(dis[districts[i]].total.vaccinated1) + parseInt(dis[districts[i]].total.vaccinated2)
  var deltavaccinated = parseInt(dis[districts[i]].delta.vaccinated1) + parseInt(dis[districts[i]].delta.vaccinated2)
    var template = `<tr class="tablerow">
                     <td class="fixedright color">${districts[i]}</td>
                     <td class="dataletterspacing" > <span class="delta-confirmed"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.confirmed.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> ${active}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed recovered"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.recovered.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed deaths"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.deceased.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(deltavaccinated)}</span><br>${numDifferentiation(totalvaccinated)}</td>
                     <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.tested)}</td>
                     <td class="dataletterspacing"> ${numDifferentiation(dis[districts[i]].meta.population)}</td>
    </tr>`
    bihar.innerHTML += template;
}
else {
 
  var conf = dis[districts[i]].total.confirmed;
  var rec = dis[districts[i]].total.recovered;
  var deathsdistric = dis[districts[i]].total.deceased;
  active=((conf)-(rec+ deathsdistric));
  var totalvaccinated = parseInt(dis[districts[i]].total.vaccinated1) + parseInt(dis[districts[i]].total.vaccinated2)
  // console.log(active);
  var template = `<tr class="tablerow">
                
  <td class="fixedright color">${districts[i]}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${active.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${numDifferentiation(totalvaccinated)}</td>
  <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.tested)}</td>
  <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].meta.population)}</td>
  </tr>`
   bihar.innerHTML += template;
}
}

// Delta data
if(dataj['BR'].delta!=null)
{



const totalconfirmed = document.getElementById('conf');
totalconfirmed.innerText = `${dataj['BR'].total.confirmed.toLocaleString('en-IN')}`;

const deltaconf = document.getElementById('deltacnf');
deltaconf.innerText = `+${dataj['BR'].delta.confirmed.toLocaleString('en-IN')}`;


const totalrecoverd = document.getElementById('recovered');
totalrecoverd.innerText = `${dataj['BR'].total.recovered.toLocaleString('en-IN')}`;

const deltarecov = document.getElementById('deltarecov');
deltarecov.innerText = `+${dataj['BR'].delta.recovered.toLocaleString('en-IN')}`;

const deaths = document.getElementById('deaths');
deaths.innerText = `${dataj['BR'].total.deceased.toLocaleString('en-IN')}`;

const deltadeaths = document.getElementById('deltadeaths');
deltadeaths.innerText = `+${dataj['BR'].delta.deceased.toLocaleString('en-IN')}`;

var active_header = (parseInt(dataj['BR'].total.confirmed) - ( parseInt(dataj['BR'].total.recovered)+ parseInt(dataj['BR'].total.deceased)+1)).toString();
const totalactive = document.getElementById('active');
totalactive.innerText = `${active_header.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

}
else{

for(var i=0;i<size;i++)
{
  if(dataforchart[i].statecode=='BR')
  {
    const totalconfirmed = document.getElementById('conf');
    totalconfirmed.innerText = `${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const totalactive = document.getElementById('active');
   totalactive.innerText = `${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const deltaconf = document.getElementById('deltacnf');
   deltaconf.innerText = `+${dataforchart[i].deltaconfirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;


  const totalrecoverd = document.getElementById('recovered');
  totalrecoverd.innerText = `${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

  const deltarecov = document.getElementById('deltarecov');
  deltarecov.innerText = `+${dataforchart[i].deltarecovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

  const deaths = document.getElementById('deaths');
  deaths.innerText = `${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

  const deltadeaths = document.getElementById('deltadeaths');
  deltadeaths.innerText = `+${dataforchart[i].deltadeaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

  }
  if(dataforchart[i].deltaconfirmed<0 || dataforchart[i].deltarecovered<0 || dataforchart[i].deltadeaths <0)
  {
    var str;
    var msg = document.getElementById('msg');
    if(dataforchart[i].deltaconfirmed<0)
    {
      str="confirmed";
    }
    if(dataforchart[i].deltarecovered<0)
    {
      str="recovery";
    }
    if(dataforchart[i].deltadeaths<0)
    {
      str="deceased";
    }
    msg.innerText =str;
    const warnin = document.querySelector('.warning');
    warnin.style.display = 'block';
  }
}
}
}
getcovidapiInf();

function numDifferentiation (val) {
    if (val >= 10000000) {
      val = (val / 10000000).toFixed(1) + 'Cr';
    } else if (val >= 100000) {
      val = (val / 100000).toFixed(1) + 'L';
    }
    else if(val >= 1000) val = (val/1000).toFixed(1) + 'K';
    return val;
  }

// /v2/appointment/sessions/public/findByPin
// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin