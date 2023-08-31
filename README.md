Heat Load Discomfort Index

and

its applications via Shelly H&T sensors

by

**Meir Rom**

**Introduction**

This project combines Calculations and Categorization of some well-known
Heat-Load (or Heat-Stress) indices with continuous real-time
measurements taken from Shelly H&T or Shelly Plus H&T devices.

Following Epstein and Moran (2006), and Vacellio (2022) Heat-Stress has
an important impact on our lives. It can seriously affect the
productivity and the health of the individual and diminish tolerance to
other environmental hazards. Translation of Heat Load into meaningful
measures e.g., indices is a well-documented scientific area and also
widely used in various fields such as: industrial physiology, sport
events, military trainings and many more.

Here, we focus on two known indices: *The Wet-Bulb Temperature (WT)*,
Vacellio (2022), Żuławińska (2023) and the *Discomfort Index (DI)***,**
discussed deeply by Epstein and Moran (2006). Those Indices are
accurately estimated using ordinary measures of temperature (or Dry
Temperature, *DT*) and relative humidity (*RH*).

*The WT* Index is the temperature read by a special thermometer that is
wrapped in water-soaked fabric and ventilated. It has many applications
discussed by Vacellio (2022), but its main affect relates to evaporation
limitations in most living organisms. Vecellio et al. (2023) deeply
discuss the evaporative limitations and hazards on human bodies when the
WT approaches to 35°C .

Here we accurately estimate the *WT*. The function
*wetTempCalc*(*DT,RH*) \[wetTempCalc.js\] returns the *WT* value for
each pair of argument measures (DT,RH) using the Stull approximating
formula (Stull, 2011). This function is also invoked in the main script
of the *DI* calculation.

*The DI* uses the average of *WT* and *DT* as an individual index of
heat stress and also as an accurate estimate of the well-known *Wet-Bulb
Globe Temperature (WBGT),* which takes into account additional outdoor
conditions such as direct radiation; see Epstein and Moran (2006) for
more details.

Following Epstein and Moran (2006), we categorize each *DI* result into
4+1 hierarchical categories: "No Heat Stress", "Mild", "Moderate" and
"Severe Heat Discomfort"; and additional category, "Extreme Dangerous
Heat Conditions" which unfortunately is being reached too often
nowadays, due to the climate change.

**\
**

**Main Script:** *Heat-Load-Discomfort-Index/src/app.js*

The main script *app.js* is run on Shelly Plus 1PM. It links thru the
cloud and gets the time, *DT* and *RH* values from a pre-specified
Shelly HT (or Plus HT) sensor. The *WT* and *DI* are then calculated,
and *DI* is categorized. Timer is set by default to 5 minutes for cycle
repetition.

Output in console contains two rows and looks like the following
message:

\[*Device Name*\]: Time: 14:58, \*\*\* Extreme Dangerous Heat Conditions
\*\*\* (DI: 33.1)

Dry Temperature: 38.38, Relative Humidity: 42, Wet-Bulb Temperature:
27.8

**API**

User must define the following properties in the CONSTANTS section of
main script ***app.js***:

SERVER: User server's url, - can be found in Shelly app,

AUTH_KEY: User authentication key - can be found in Shelly app.

HT_TYPE: \"HT\" for Gen 1 Shelly HT sensor \-\--OR \-\-- \"HTP\" for
Gen2 Shelly Plus HT sensor,

DEVICE_ID: Can be found in Shelly app for the specific sensor,

HT_NAME: pick any useful name to identify the sensor,

TEMP_UNIT: choose between \"C\" (Default: Celsius) to "F" (Fahrenheit),

TIMER_RECALL_IN_MINUTES: Repetition cycle for engaging the HT (or Plus
HT) sensor.

**Notes and Suggestions for Future Developments**

1.  Running and testing the script on *Shelly Plus 1PM* is the author
    self-limitation (*Shelly Plus 1PM* is the only Gen 2 device owned by
    the author). It is recommended to install the main script on *Shelly
    Plus Plug S* device. In that case it is advisable to add an
    "*alertColor(DI)"* function to enable a colored alert for each *DI*
    category, in addition to the message given in console. For example,
    when the *DI* category is set to "*Extreme Dangerous Heat
    Conditions"*, the plug may change its color to dark red. This kind
    of function has been discussed and published many times in the
    *Scripting Course but* is not given here since it cannot be tested.

2.  Since the pair (*DT*, *RH)* is the only input data needed for
    constructing our indices, it is quite straightforward to engage
    forecasts of such data and construct forecasts of *WT and DI* in
    various locations*.*

3.  Using our script, the historical data of (*DT*, *RH*) can be easily
    converted to (*WT*, *DI*) and be populated in the same way and same
    figures as shown in Shelly app for HT sensors. Using historical
    virtual data of (*WT*, *DI*) can lead to Statistical surveys and
    analyses on the environmental living conditions in specific
    locations.

4.  All papers that were referenced here are saved in sub-folder \\
    scientific-papers \\

**References**

Epstein, Y. and Moran, D., S., "Thermal Comfort and the Heat Stress
Indices", Industrial Health (2006).

Stull, R., "Wet-Bulb Temperature from Relative Humidity and Air
Temperature", Journal of Applied Meteorology and Climatology, 50,(2011)

Daniel J. Vecellio, S. Tony Wolf, Rachel M. Cottle, and W. Larry
Kenney ["Evaluating the 35°C wet-bulb temperature adaptability threshold
for young, healthy subjects (PSU HEAT
Project**)**"](https://journals.physiology.org/doi/abs/10.1152/japplphysiol.00738.2021) Journal
of Applied Physiology (2022)

Żuławińska Julia, "The Wet-Bulb Calculator",
<https://www.omnicalculator.com/physics/wet-bulb#how-to-calculate-the-wet-bulb-temperature>,
OMNI Calculator (2023)
