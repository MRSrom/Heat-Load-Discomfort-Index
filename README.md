# Heat Load Discomfort Index

and

its applications via Shelly H&T devices

by

**Meir Rom**

**Introduction**

This project combines Calculations and Categorization of some well-known Heat-Load (or Heat-Stress) indices with continuous real-time measurements taken from Shelly H&T or Shelly Plus H&T devices.

Following Epstein and Moran (2006), and Vacellio (2022) Heat-Stress has an important impact on our lives. It can seriously affect the productivity and the health of the individual and diminish tolerance to other environmental hazards. Translation of Heat Load into meaningful measures e.g. indices is a well-documented scientific area and also widely used in various fields such as: industrial physiology, sport events, military trainings and many more.

Here, we focus on two known indices: _The Wet-Bulb Temperature (WT)_, Vacellio (2022), Żuławińska (2023) and the _Discomfort Index (DI)_ **,** discusseddeeply byEpstein and Moran (2006). Those Indices are accurately estimated using ordinary measures of temperature (or Dry Temperature, _DT_) and relative humidity (_RH_).

_The WT_ Index is the temperature read by a special thermometer that is wrapped in water-soaked fabric and ventilated. It has many applications discussed by Vacellio (2022) but the main affect relates to evaporation limitations in most living organisms. Vecellio et al. (2023) deeply discuss the evaporative limitations and hazards on human bodies when the WT approaches to 35°C .

Here we accurately estimate the _WT_. The function _wetTempCalc_(_DT,RH_) [wetTempCalc.js] returns the _WT_ value for each pair of argument measures (DT,RH) using the Stull approximating formula (Stull, 2011).

_The DI_uses the average of _WT_ and _DT_ as an individual index of heat stress and also as an accurate estimate of the well-known _Wet-Bulb Globe Temperature (WBGT),_which takes into account additional outdoor conditions such as direct radiation.

Following Epstein and Moran (2006), we categorize each _DI_ result into 4+1 hierarchical categories: "No Heat Stress", "Mild", "Moderate" and "Severe Heat Discomfort"; and additional category, "Extreme Dangerous Heat Conditions" which unfortunately is being reaches too often nowadays, due to the climate change.

**Main Script:** _ **app.js** _

The main script _app.js_ is run on Shelly Plus 1PM. It links thru the cloud and gets the time, _DT_ and _RH_ values from a pre-specified Shelly HT (or Plus HT) device. The _WT_ and _DI_ are then calculated and _DI_ is categorized. Timer is set by default to 5 minutes cycle for repetition.

Output in console contains two rows and looks like the following message:

[_Device Name_]: Time: 14:58, \*\*\* Extreme Dangerous Heat Conditions \*\*\* (DI: 33.1)

Dry Temperature: 38.38, Relative Humidity: 42, Wet-Bulb Temperature: 27.8

**API**

User must define the following properties in main script _app.js_ constants:

SERVER: Server url, - can be found in Shelly app,

AUTH\_KEY: Authentication key - can be found in Shelly app.

HT\_TYPE: "HT" for Gen 1 ---OR --- "HTP" for Gen2 devices,

DEVICE\_ID: can be found in Shelly app in the specific device

HT\_NAME: pick any useful strings to identify the device

TEMP\_UNIT: choose between "C" (Default :Celsius) to "F".

TIMER\_RECALL\_IN\_MINUTES: Repetition cycle for engaging the HT (or Plus HT) device

**References**

Epstein, Y. and Moran, D., S., "Thermal Comfort and the Heat Stress Indices", Industrial Health (2006).

Stull, R., "Wet-Bulb Temperature from Relative Humidity and Air Temperature", Journal of Applied Meteorology and Climatology, 50,(2011)

Daniel J. Vecellio, S. Tony Wolf, Rachel M. Cottle, and W. Larry Kenney ["Evaluating the 35°C wet-bulb temperature adaptability threshold for young, healthy subjects (PSU HEAT Project](https://journals.physiology.org/doi/abs/10.1152/japplphysiol.00738.2021)[**)**"](https://journals.physiology.org/doi/abs/10.1152/japplphysiol.00738.2021) Journal of Applied Physiology (2022)

Żuławińska Julia, "The Wet-Bulb Calculator", [https://www.omnicalculator.com/physics/wet-bulb#how-to-calculate-the-wet-bulb-temperature](https://www.omnicalculator.com/physics/wet-bulb#how-to-calculate-the-wet-bulb-temperature), OMNI Calculator (2023)
