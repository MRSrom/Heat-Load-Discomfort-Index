/******************  U S E R   Definitions   ***************************/
const SERVER = "...";    /* Fill here your Server Address - use Shelly app to find this property */
const AUTH_KEY = "..."; /* Fill here your Authentication Key - use Shelly app to find this property */
//
const HT_TYPE= "HT"; /*"HT" for Gen 1 (Shelly HT) ---OR --- "HTP" for Gen2  (Shelly Plus HT) */
const DEVICE_ID = "..." ;  /* Change here device id - use Shelly app to find this property */
const HT_NAME= "...";  /* pick your own device name */
const TEMPֹֹֹ_UNIT="C"; /* choose between "C" or "F" */
//
const TIMER_RECALL_IN_MINUTES=5;  /* Change here time interval - in minutes */
//
/******************  E N D   U S E R   Definitions   ***************************/
//           B e g i n  of  P r o g r a m e
let urlHT=SERVER+"/device/status?id=" + DEVICE_ID+ "&auth_key=" + AUTH_KEY; 
//
function tempUnitConversion(temp){
  // Conversion to Fahrenheit units
   return (32+temp*9/5);
}
 function wetTempCalc(DT,RH){  
//Estimate the Wet-Bulb Temperature using Dry Temperature (DT) and Relative Humidity (RH) via the Stull formula [Stull(2011)]
  let coef=[0.151977,8.313659,1.676331,0.00391838,0.023101,4.686035];
  let arg1=DT*Math.atan(coef[0]*Math.sqrt(RH+coef[1]));
  let arg2=Math.atan(DT+RH);
  let arg3=Math.atan(RH-coef[2]);
  let arg4=coef[3]*Math.pow(RH,1.5)*Math.atan(coef[4]*RH);
  let arg5=coef[5];
  let WT=arg1+arg2-arg3+arg4-arg5;
  return WT
}
//
function heatLoadDiscofortIndex(temperature,humidity){
// Return the Wet-Bulb temperature and the Discomfort Index  
  let wetTemp=wetTempCalc(temperature,humidity);
  let HLI=0.5*(wetTemp+temperature);
  return([wetTemp.toFixed(1),HLI.toFixed(1)]);
}
//
function disComfortStatus(DI){
// Categorize DI into hierarchy status categories. 
//Based on Epstein & Moran (2006) with update for the highest category.
 let status=" No Heat Sress! ";
 if (DI > 22 & DI <= 24){
   status=" Mild Heat Discomfort";
 }
 if (DI > 24 & DI <= 28){
   status=" Moderate Heat Discomfort";
 }
 if (DI > 28 & DI <= 32){
   status=" Severe Heat Discomfort";
 }
  if (DI > 32){
   status=" Extreme Dangerous Heat Conditions  ";
 }
   return(status);
}
 //
function SensorHT(sensorData){  
   Shelly.call("HTTP.GET",{"url":sensorData.url},function(result){
     let response=JSON.parse(result.body);
// 
    if (sensorData.type=="HT"){  /* Gen1 HT Sensors */
     let time=response.data.device_status.time;    
     let dryTemp=response.data.device_status.tmp.tC;
     let deviceHumid=response.data.device_status.hum.value;
    } else if (sensorData.type=="HTP"){ /* Gen2 HT Plus Sensors */
        let time=response.data.device_status.sys.time;    
        let dryTemp=response.data.device_status["temperature:0"].tC;
        let deviceHumid=response.data.device_status["humidity:0"].rh;
    }   else { /* in case of wrong key input */ 
          console.log("Wrong Sensor Type");
          Timer.clear(T1);
          return;
    }
    let WT_DI=heatLoadDiscofortIndex(dryTemp,deviceHumid);
    let WT=WT_DI[0];
    let DI=WT_DI[1];
    let heatStatus=disComfortStatus(DI);
    if (TEMP_UNIT=="F"){ /* convert temperatures to Fahrenheit */
      dryTemp=tempUnitConversion(dryTemp);
      DI=tempUnitConversion(DI);
      WT=tempUnitConversion(WT);
    }
    
    console.log(sensorData.id+":   Time: "+time+",  *** "+heatStatus+" *** (DI: "+DI+")");
    console.log("Dry Temperature: "+dryTemp+",  Relative Humidity: "+deviceHumid+",  Wet-Bulb Temperature: "+WT);
    console.log("");
 });
}
// Constructors of Sensors
function sensorConstruct(url,type,id){
  this.url=url;
  this.type=type;
  this.id=id;
}
//
let uDataHT = new sensorConstruct(urlHT,HT_TYPE,HT_NAME);
//
let timerVal=TIMER_RECALL_IN_MINUTES*1000*60;
T1=Timer.set(timerVal,true,SensorHT,uDataHT);