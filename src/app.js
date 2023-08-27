//******************  U S E R   Definitions   ***************************
const SERVER = "";
const AUTH_KEY = "";
/********************************************************************************/
const HT_TYPE= "HT"; /*"HT" for Gen 1 ---OR --- "HTP" for Gen2 */
const DEVICE_ID = "439fa1" ; 
const HT_NAME= "Balcony"; 
    // OR
//const HT_TYPE= "HTP"; // "HT" for Gen1 or "HTP" for Gen2
//const DEVICE_ID= "c049ef8b1370" ;     // HT Gen2 
//const HT_NAME= "Bedroom"; /* Optional */
/*******************************************************************************/
const TIMER_RECALL_IN_MINUTES=0.25;  // optional
/*******************************************************************************/
//           B e g i n  of  P r o g r a m e
let urlHT=SERVER+"/device/status?id=" + DEVICE_ID+ "&auth_key=" + AUTH_KEY; 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
//----------------------------------------------------------------------
function heatLoadDiscofortIndex(temperature,humidity){
 let wetTemp=wetTempCalc(temperature,humidity);
 let HLI=0.5*(wetTemp+temperature).toFixed(1);
 return(HLI);
}
///////////////////////////////////////////////////////////////////////////////////////////
function disComfortStatus(DI){
 let status="No Heat Sress! ";
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
   status=" Extremely Heat Conditions  ";
 }
   return(status);
}
 //------------------------------------------------------------------------------------------
function SensorHT(sensorData){  
   Shelly.call("HTTP.GET",{"url":sensorData.url},function(result){
     let response=JSON.parse(result.body);
// 
    if (sensorData.type=="HT"){  /* Gen1 HT Sensors */
     let unixTime=response.data.device_status.unixtime;
     let time=response.data.device_status.time;    
     let deviceTemp=response.data.device_status.tmp.tC;
     let deviceHumid=response.data.device_status.hum.value;
    } else if (sensorData.type=="HTP"){ /* Gen2 HT Plus Sensors */
        let unixTime=response.data.device_status.sys.unixtime;
        let time=response.data.device_status.sys.time;    
        let deviceTemp=response.data.device_status["temperature:0"].tC;
        let deviceHumid=response.data.device_status["humidity:0"].rh;
    }   else { 
          console.log("Wrong Sensor Type");
          Timer.clear(T1);
          return;
    }
     let heatDI=heatLoadDiscofortIndex(deviceTemp,deviceHumid);
     let heatStatus=disComfortStatus(heatDI);
     
     console.log(sensorData.id+":   Time: "+time+",  Heat Load Discomfort Index:",heatDI,",  Staus:",heatStatus);
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