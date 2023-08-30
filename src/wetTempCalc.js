function wetTempCalc(DT, RH) {
    //Estimate the Wet-Bulb Temperature using Dry Temperature (DT) and Relative Humidity (RH) via the Stull formula [Stull(2011)]
    let coef = [0.151977, 8.313659, 1.676331, 0.00391838, 0.023101, 4.686035];
    let arg1 = DT * Math.atan(coef[0] * Math.sqrt(RH + coef[1]));
    let arg2 = Math.atan(DT + RH);
    let arg3 = Math.atan(RH - coef[2]);
    let arg4 = coef[3] * Math.pow(RH, 1.5) * Math.atan(coef[4] * RH);
    let arg5 = coef[5];
    let WT = arg1 + arg2 - arg3 + arg4 - arg5;
    return WT
}

console.log("Result:", wetTempCalc(38, 65));
