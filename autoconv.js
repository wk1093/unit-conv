var autoconv = document.getElementById('autoconv');
var autoconvresult = document.getElementById('autoconvresult');
function fixval(val) {
    val = val.replace(/\s+/, ' ');
    val = val.replace(/([0-9]+|[0-9]+\.[0-9]+)([a-zA-Z]+)/, '$1 $2');
    return val;
}

class Unit {
    constructor(to, from, nice) {
        this.to = to;
        this.from = from;
        this.nice = nice;
    }
}

// Thanks GitHub Copilot
unitlist = {
    'length': {
        'nm': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }, 'nm (nanometer [SI])'),
        'um': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'um (micrometer [SI])'),
        'mm': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }, 'mm (millimeter [SI])'),
        'cm': new Unit(function(a) { return a * 1e-2; }, function(a) { return a / 1e-2; }, 'cm (centimeter [SI])'),
        'dm': new Unit(function(a) { return a * 1e-1; }, function(a) { return a / 1e-1; }, 'dm (decimeter [SI])'),
        'm': new Unit(function(a) { return a; }, function(a) { return a; }, 'm (meter [SI])'),
        'dam': new Unit(function(a) { return a * 1e1; }, function(a) { return a / 1e1; }, 'dam (decameter [SI])'),
        'hm': new Unit(function(a) { return a * 1e2; }, function(a) { return a / 1e2; }, 'hm (hectometer [SI])'),
        'km': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }, 'km (kilometer [SI])'),
        'in': new Unit(function(a) { return a * 0.0254; }, function(a) { return a / 0.0254; }, 'in (inch [US])'),
        'ft': new Unit(function(a) { return a * 0.3048; }, function(a) { return a / 0.3048; }, 'ft (foot [US])'),
        'yd': new Unit(function(a) { return a * 0.9144; }, function(a) { return a / 0.9144; }, 'yd (yard [US])'),
        'mi': new Unit(function(a) { return a * 1609.344; }, function(a) { return a / 1609.344; }, 'mi (mile [US])'),
        'nmi': new Unit(function(a) { return a * 1852; }, function(a) { return a / 1852; }, 'nmi (nautical mile [US])'),
    },
    'mass': {
        'mg': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }, 'mg (milligram [SI])'),
        'g': new Unit(function(a) { return a; }, function(a) { return a; }, 'g (gram)'),
        'kg': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }, 'kg (kilogram [SI])'),
        't': new Unit(function(a) { return a * 1e6; }, function(a) { return a / 1e6; }, 't (tonne [SI])'),
        'oz': new Unit(function(a) { return a * 28.349523125; }, function(a) { return a / 28.349523125; }, 'oz (ounce [US])'),
        'lb': new Unit(function(a) { return a * 453.59237; }, function(a) { return a / 453.59237; }, 'lb (pound [US])'),
        'st': new Unit(function(a) { return a * 6350.29318; }, function(a) { return a / 6350.29318; }, 'st (stone [US])'),
    },
    'time': {
        'ns': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }, 'ns (nanosecond [SI])'),
        'us': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'us (microsecond [SI])'),
        'ms': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }, 'ms (millisecond [SI])'),
        's': new Unit(function(a) { return a; }, function(a) { return a; }, 's (second)'),
        'min': new Unit(function(a) { return a * 60; }, function(a) { return a / 60; }, 'min (minute [SI])'),
        'hr': new Unit(function(a) { return a * 3600; }, function(a) { return a / 3600; }, 'hr (hour [SI])'),
        'd': new Unit(function(a) { return a * 86400; }, function(a) { return a / 86400; }, 'd (day [SI])'),
        'wk': new Unit(function(a) { return a * 604800; }, function(a) { return a / 604800; }, 'wk (week [SI])'),
        'mo': new Unit(function(a) { return a * 2629800; }, function(a) { return a / 2629800; }, 'mo (month [SI])'),
        'yr': new Unit(function(a) { return a * 31557600; }, function(a) { return a / 31557600; }, 'yr (year [SI])'),
    },
    'current': {
        'nA': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }, 'nA (nanoampere [SI])'),
        'uA': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'uA (microampere [SI])'),
        'mA': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }, 'mA (milliampere [SI])'),
        'A': new Unit(function(a) { return a; }, function(a) { return a; }, 'A (ampere)'),
        'kA': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }, 'kA (kiloampere [SI])'),
    },
    'temperature': {
        'K': new Unit(function(a) { return a; }, function(a) { return a; }, '\u00B0K (Kelvin [SI])'),
        'C': new Unit(function(a) { return a + 273.15; }, function(a) { return a - 273.15; }, '\u00B0C (Celsius [SI])'),
        'F': new Unit(function(a) { return (a + 459.67) * 5 / 9; }, function(a) { return a * 9 / 5 - 459.67; }, '\u00B0F (Fahrenheit [US])'),
        'R': new Unit(function(a) { return a * 5 / 9; }, function(a) { return a * 9 / 5; }, '\u00B0R (Rankine [US])'),
    },
    'area': {
        'mm2': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'mm\u00B2 (square millimeter [SI])'),
        'cm2': new Unit(function(a) { return a * 1e-4; }, function(a) { return a / 1e-4; }, 'cm\u00B2 (square centimeter [SI])'),
        'm2': new Unit(function(a) { return a; }, function(a) { return a; }, 'm\u00B2 (square meter [SI])'),
        'km2': new Unit(function(a) { return a * 1e6; }, function(a) { return a / 1e6; }, 'km\u00B2 (square kilometer [SI])'),
        'in2': new Unit(function(a) { return a * 0.00064516; }, function(a) { return a / 0.00064516; }, 'in\u00B2 (square inch [US])'),
        'ft2': new Unit(function(a) { return a * 0.09290304; }, function(a) { return a / 0.09290304; }, 'ft\u00B2 (square foot [US])'),
        'yd2': new Unit(function(a) { return a * 0.83612736; }, function(a) { return a / 0.83612736; }, 'yd\u00B2 (square yard [US])'),
        'mi2': new Unit(function(a) { return a * 2589988.110336; }, function(a) { return a / 2589988.110336; }, 'mi\u00B2 (square mile [US])'),
        'ha': new Unit(function(a) { return a * 10000; }, function(a) { return a / 10000; }, 'ha (hectare [SI])'),
        'ac': new Unit(function(a) { return a * 4046.8564224; }, function(a) { return a / 4046.8564224; }, 'ac (acre [US])'),
    },
    'volume': {
        'mm3': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }, 'mm\u00B3 (cubic millimeter [SI])'),
        'cm3': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'cm\u00B3 (cubic centimeter [SI])'),
        'mL': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }, 'mL (milliliter [SI])'),
        'cL': new Unit(function(a) { return a * 1e-5; }, function(a) { return a / 1e-5; }, 'cL (centiliter [SI])'),
        'dL': new Unit(function(a) { return a * 1e-4; }, function(a) { return a / 1e-4; }, 'dL (deciliter [SI])'),
        'L': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }, 'L (liter [SI])'),
        'm3': new Unit(function(a) { return a; }, function(a) { return a; }, 'm\u00B3 (cubic meter [SI])'),
        'km3': new Unit(function(a) { return a * 1e9; }, function(a) { return a / 1e9; }, 'km\u00B3 (cubic kilometer [SI])'),
        'tsp': new Unit(function(a) { return a * 4.92892159375e-6; }, function(a) { return a / 4.92892159375e-6; }, 'tsp (teaspoon [US])'),
        'Tbs': new Unit(function(a) { return a * 1.478676478125e-5; }, function(a) { return a / 1.478676478125e-5; }, 'Tbs (tablespoon [US])'),
        'in3': new Unit(function(a) { return a * 1.6387064e-5; }, function(a) { return a / 1.6387064e-5; }, 'in\u00B3 (cubic inch [US])'),
        'fl-oz': new Unit(function(a) { return a * 2.95735295625e-5; }, function(a) { return a / 2.95735295625e-5; }, 'fl-oz (fluid ounce [US])'),
        'cup': new Unit(function(a) { return a * 0.0002365882365; }, function(a) { return a / 0.0002365882365; }, 'cup (cup [US])'),
        'pnt': new Unit(function(a) { return a * 0.000473176473; }, function(a) { return a / 0.000473176473; }, 'pnt (pint [US])'),
        'qt': new Unit(function(a) { return a * 0.000946352946; }, function(a) { return a / 0.000946352946; }, 'qt (quart [US])'),
        'gal': new Unit(function(a) { return a * 0.003785411784; }, function(a) { return a / 0.003785411784; }, 'gal (gallon [US])'),
        'ft3': new Unit(function(a) { return a * 0.028316846592; }, function(a) { return a / 0.028316846592; }, 'ft\u00B3 (cubic foot [US])'),
        'yd3': new Unit(function(a) { return a * 0.764554857984; }, function(a) { return a / 0.764554857984; }, 'yd\u00B3 (cubic yard [US])'),
        'bbl': new Unit(function(a) { return a * 0.158987294928; }, function(a) { return a / 0.158987294928; }, 'bbl (barrel [US])'),
    },
    'speed': {
        'm/s': new Unit(function(a) { return a; }, function(a) { return a; }, 'm/s (meter per second [SI])'),
        'km/h': new Unit(function(a) { return a / 3.6; }, function(a) { return a * 3.6; }, 'km/h (kilometer per hour [SI])'),
        'mph': new Unit(function(a) { return a / 2.2369362920544; }, function(a) { return a * 2.2369362920544; }, 'mph (mile per hour [US])'),
        'knot': new Unit(function(a) { return a / 1.9438444924406; }, function(a) { return a * 1.9438444924406; }, 'knot (knot [nautical])'),
    },
    'acceleration': {
        'm/s2': new Unit(function(a) { return a; }, function(a) { return a; }, 'm/s\u00B2 (meter per second squared [SI])'),
        'G': new Unit(function(a) { return a * 9.80665; }, function(a) { return a / 9.80665; }, 'G (standard gravity [SI])'),
    },
    'force': {
        'N': new Unit(function(a) { return a; }, function(a) { return a; }, 'N (newton [SI])'),
        'kN': new Unit(function(a) { return a * 1000; }, function(a) { return a / 1000; }, 'kN (kilonewton [SI])'),
        'lbf': new Unit(function(a) { return a * 4.4482216152605; }, function(a) { return a / 4.4482216152605; }, 'lbf (pound-force [US])'),
        'kip': new Unit(function(a) { return a * 4448.2216152605; }, function(a) { return a / 4448.2216152605; }, 'kip (kip [US])'),
    },
    'pressure': {
        'Pa': new Unit(function(a) { return a; }, function(a) { return a; }, 'Pa (pascal [SI])'),
        'kPa': new Unit(function(a) { return a * 1000; }, function(a) { return a / 1000; }, 'kPa (kilopascal [SI])'),
        'MPa': new Unit(function(a) { return a * 1000000; }, function(a) { return a / 1000000; }, 'MPa (megapascal [SI])'),
        'GPa': new Unit(function(a) { return a * 1000000000; }, function(a) { return a / 1000000000; }, 'GPa (gigapascal [SI])'),
        'bar': new Unit(function(a) { return a * 100000; }, function(a) { return a / 100000; }, 'bar (bar [SI])'),
        'torr': new Unit(function(a) { return a * 133.32236842105; }, function(a) { return a / 133.32236842105; }, 'torr (torr [SI])'),
        'psi': new Unit(function(a) { return a * 6894.7572931684; }, function(a) { return a / 6894.7572931684; }, 'psi (pound-force per square inch [US])'),
    },
    'energy': {
        'J': new Unit(function(a) { return a; }, function(a) { return a; }, 'J (joule)'),
        'kJ': new Unit(function(a) { return a * 1000; }, function(a) { return a / 1000; }, 'kJ (kilojoule [SI])'),
        'MJ': new Unit(function(a) { return a * 1000000; }, function(a) { return a / 1000000; }, 'MJ (megajoule [SI])'),
        'GJ': new Unit(function(a) { return a * 1000000000; }, function(a) { return a / 1000000000; }, 'GJ (gigajoule [SI])'),
        'eV': new Unit(function(a) { return a * 1.602176565e-19; }, function(a) { return a / 1.602176565e-19; }, 'eV (electron volt [SI])'),
        'Wh': new Unit(function(a) { return a * 3600; }, function(a) { return a / 3600; }, 'Wh (watt-hour [SI])'),
        'kWh': new Unit(function(a) { return a * 3600000; }, function(a) { return a / 3600000; }, 'kWh (kilowatt-hour [SI])'),
        'MWh': new Unit(function(a) { return a * 3600000000; }, function(a) { return a / 3600000000; }, 'MWh (megawatt-hour [SI])'),
        'GWh': new Unit(function(a) { return a * 3600000000000; }, function(a) { return a / 360; }, 'GWh (gigawatt-hour [SI])'),
        'cal': new Unit(function(a) { return a * 4.1868; }, function(a) { return a / 4.1868; }, 'cal (calorie [SI])'),
        'kcal': new Unit(function(a) { return a * 4186.8; }, function(a) { return a / 4186.8; }, 'kcal (kilocalorie [SI])'),
        'Btu': new Unit(function(a) { return a * 1055.05585262; }, function(a) { return a / 1055.05585262; }, 'Btu (British thermal unit [US])'),
        'kBtu': new Unit(function(a) { return a * 1055055.85262; }, function(a) { return a / 1055055.85262; }, 'kBtu (thousand British thermal unit [US])'),
        'MBtu': new Unit(function(a) { return a * 1055055852.62; }, function(a) { return a / 1055055852.62; }, 'MBtu (million British thermal unit [US])'),
        'therm': new Unit(function(a) { return a * 1055055852620; }, function(a) { return a / 1055055852620; }, 'therm (therm [US])'),
        'ft-lbf': new Unit(function(a) { return a * 1.3558179483314; }, function(a) { return a / 1.3558179483314; }, 'ft-lbf (foot-pound [US])'),
        'in-lbf': new Unit(function(a) { return a * 0.11298482902762; }, function(a) { return a / 0.11298482902762; }, 'in-lbf (inch-pound [US])'),
    },
    'power': {
        'W': new Unit(function(a) { return a; }, function(a) { return a; }, 'W (watt [SI])'),
        'kW': new Unit(function(a) { return a * 1000; }, function(a) { return a / 1000; }, 'kW (kilowatt [SI])'),
        'MW': new Unit(function(a) { return a * 1000000; }, function(a) { return a / 1000000; }, 'MW (megawatt [SI])'),
        'GW': new Unit(function(a) { return a * 1000000000; }, function(a) { return a / 1000000000; }, 'GW (gigawatt [SI])'),
        'hp': new Unit(function(a) { return a * 745.69987158227; }, function(a) { return a / 745.69987158227; }, 'hp (horsepower [US])'),
        'kW-hr': new Unit(function(a) { return a * 3600; }, function(a) { return a / 3600; }, 'kW-hr (kilowatt-hour [SI])'),
        'Btu/h': new Unit(function(a) { return a * 0.29307107017222; }, function(a) { return a / 0.29307107017222; }, 'Btu/h (British thermal unit per hour [SI])'),
        'MBtu/h': new Unit(function(a) { return a * 293.07107017222; }, function(a) { return a / 293.07107017222; }, 'MBtu/h (thousand British thermal unit per hour [SI])'),
        'MBtu/s': new Unit(function(a) { return a * 293071.07017222; }, function(a) { return a / 293071.07017222; }, 'MBtu/s (million British thermal unit per second [SI])'),
        'cal/s': new Unit(function(a) { return a * 0.2388458966275; }, function(a) { return a / 0.2388458966275; }, 'cal/s (calorie per second [SI])'),
        'kcal/s': new Unit(function(a) { return a * 238.8458966275; }, function(a) { return a / 238.8458966275; }, 'kcal/s (kilocalorie per second [SI])'),
        'cal/min': new Unit(function(a) { return a * 14.33094879765; }, function(a) { return a / 14.33094879765; }, 'cal/min (calorie per minute [SI])'),
        'kcal/min': new Unit(function(a) { return a * 14330.94879765; }, function(a) { return a / 14330.94879765; }, 'kcal/min (kilocalorie  per minute [SI])'),
        'ft-lbf/s': new Unit(function(a) { return a * 0.73756214927727; }, function(a) { return a / 0.73756214927727; }, 'ft-lbf/s (foot-pound per second [US])'),
        'ft-lbf/min': new Unit(function(a) { return a * 44.253370614036; }, function(a) { return a / 44.253370614036; }, 'ft-lbf/min (foot-pound per minute [US])'),
        'ft-lbf/h': new Unit(function(a) { return a * 2655.2204237537; }, function(a) { return a / 2655.2204237537; }, 'ft-lbf/h (foot-pound per hour [US])'),
        'in-lbf/s': new Unit(function(a) { return a * 0.061046066536; }, function(a) { return a / 0.061046066536; }, 'in-lbf/s (inch-pound per second [US])'),
        'in-lbf/min': new Unit(function(a) { return a * 3.66272165216; }, function(a) { return a / 3.66272165216; }, 'in-lbf/min (inch-pound per minute [US])'),
        'in-lbf/h': new Unit(function(a) { return a * 219.762099312; }, function(a) { return a / 219.762099312; }, 'in-lbf/h (inch-pound per hour [US])'),
    }
}

function isUnit(val) {
    if (!val) return false;

    // Check if val is in unitlist
    for (var i in unitlist) {
        if (unitlist[i][val]) return true;
    }
    return false;
}

function getTypeOfUnit(val) {
    if (!val) return false;

    // Check if val is in unitlist and return type
    for (var i in unitlist) {
        if (unitlist[i][val]) return i;
    }
    return false;
}

autoconv.addEventListener("keyup", function(event) {
    verify = /([0-9]+|[0-9]+\.[0-9]+)\s*(.*)+/;
    if (verify.test(autoconv.value) && autoconv.value != "" && event.keyCode != 13) {
        autoconv.value = fixval(autoconv.value);
        var val = autoconv.value.split(' ');
        var num = val[0];
        var unit = val[1];
        autoconvresult.innerHTML = "";
        if (unit) {
            if (isUnit(unit)) {
                autoconvresult.innerHTML = num + " " + unitlist[getTypeOfUnit(unit)][unit].nice + " = <br><br>";
                var units = unitlist[getTypeOfUnit(unit)];
                for (const [key, val] of Object.entries(units)) {
                    var BASEVAL = units[unit].to(parseFloat(num));
                    var RESULT = val.from(BASEVAL);
                    autoconvresult.innerHTML += RESULT.toFixed(4) + " " + val.nice + '<br>';
                }
            } else {
                autoconvresult.innerHTML = 'Invalid unit';
            }
        }
    }
});