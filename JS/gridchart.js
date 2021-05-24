

async function getcovidapiInf(){

    const jsondata2 = await fetch('https://api.covid19india.org/data.json');
    const jsdata2 = await jsondata2.json();
    const dataforchart = jsdata2.statewise;
    const size = Object.keys(dataforchart).length;
  

    // if(dataforchart[])
    // dataforchart[15];
    // dataforchart.shift();
    const jsondata3 = await fetch('https://api.covid19india.org/v4/min/data.min.json');
    const dataj = await jsondata3.json();
    dataforchart.splice(31, 1);

    console.log(dataj);
    const dis = dataj['BR'].districts;
    const lengdist = Object.keys(dis).length;
    // console.log(dis);
    var districts = ['Araria','Arwal', 'Aurangabad','Banka','Begusarai','Bhagalpur','Bhojpur','Buxar','Darbhanga',
    'East Champaran','Gaya','Gopalganj','Jamui','Jehanabad',
    'Kaimur','Katihar','Khagaria','Kishanganj','Lakhisarai',
    'Madhepura','Madhubani','Munger','Muzaffarpur',
    'Nalanda','Nawada','Patna','Purnia','Rohtas','Saharsa','Samastipur','Saran',
    'Sheikhpura','Sheohar','Sitamarhi','Siwan',
    'Supaul','Vaishali','West Champaran']

var active;

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
  
    if(dis[districts[i]].delta.tested == null)
    {
     
        dis[districts[i]].delta.tested=0;
    }
  
    if(dis[districts[i]].delta.vaccinated == null)
    {
     
        dis[districts[i]].delta.vaccinated=0;
    }
  
    var template = `<tr class="tablerow">
                     <td class="fixedright color">${districts[i]}</td>
                     <td class="dataletterspacing" > <span class="delta-confirmed"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.confirmed.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> ${active}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed recovered"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.recovered.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed deaths"><i class="fas fa-arrow-up"></i>${dis[districts[i]].delta.deceased.toLocaleString('en-IN')}</span><br>${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed vaccinated"><i class="fas fa-arrow-up"></i>${numDifferentiation(dis[districts[i]].delta.vaccinated)}</span><br>${numDifferentiation(dis[districts[i]].total.vaccinated)}</td>
                     <td class="dataletterspacing"> <span class="delta-confirmed tests"><i class="fas fa-arrow-up"></i>${numDifferentiation(dis[districts[i]].delta.tested)}</span><br>${numDifferentiation(dis[districts[i]].total.tested)}</td>
                     <td class="dataletterspacing"> ${numDifferentiation(dis[districts[i]].meta.population)}</td>
    </tr>`
    bihar.innerHTML += template;
}
else {
 
  var conf = dis[districts[i]].total.confirmed;
  var rec = dis[districts[i]].total.recovered;
  var deathsdistric = dis[districts[i]].total.deceased;
  active=((conf)-(rec+ deathsdistric));
  // console.log(active);
  var template = `<tr class="tablerow">
                
  <td class="fixedright color">${districts[i]}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.confirmed.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${active.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.recovered.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${dis[districts[i]].total.deceased.toLocaleString('en-IN')}</td>
  <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.vaccinated)}</td>
  <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].total.tested)}</td>
  <td class="dataletterspacing">${numDifferentiation(dis[districts[i]].meta.population)}</td>
  </tr>`
   bihar.innerHTML += template;
}
}

for(var i=0;i<size;i++)
{
  if(dataforchart[i].statecode=='BR')
  {
   const totalconfirmed = document.getElementById('conf');
   totalconfirmed.innerText = `${dataforchart[i].confirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const deltaconf = document.getElementById('deltacnf');
   deltaconf.innerText = `+${dataforchart[i].deltaconfirmed.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const totalactive = document.getElementById('active');
   totalactive.innerText = `${dataforchart[i].active.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const totalrecoverd = document.getElementById('recovered');
   totalrecoverd.innerText = `${dataforchart[i].recovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const deltarecov = document.getElementById('deltarecov');
   deltarecov.innerText = `+${dataforchart[i].deltarecovered.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const deaths = document.getElementById('deaths');
   deaths.innerText = `${dataforchart[i].deaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;

   const deltadeaths = document.getElementById('deltadeaths');
   deltadeaths.innerText = `+${dataforchart[i].deltadeaths.replace(/(\d)(?=(\d\d)+\d$)/g, "$1,")}`;


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

// .toLocaleString('en-IN')

// /v2/appointment/sessions/public/findByPin
// https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin