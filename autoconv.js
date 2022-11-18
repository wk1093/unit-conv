var autoconv = document.getElementById('autoconv');
var autoconvresult = document.getElementById('autoconvresult');
function fixval(val) {
    val = val.replace(/\s+/, ' ');
    val = val.replace(/([0-9]+|[0-9]+\.[0-9]+)([a-zA-Z]+)/, '$1 $2');
    return val;
}

class Unit {
    constructor(to, from) {
        this.to = to;
        this.from = from;
    }
}

// Thanks GitHub Copilot
unitlist = {
    'length': {
        'nm': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }),
        'um': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'mm': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }),
        'cm': new Unit(function(a) { return a * 1e-2; }, function(a) { return a / 1e-2; }),
        'dm': new Unit(function(a) { return a * 1e-1; }, function(a) { return a / 1e-1; }),
        'm': new Unit(function(a) { return a; }, function(a) { return a; }),
        'dam': new Unit(function(a) { return a * 1e1; }, function(a) { return a / 1e1; }),
        'hm': new Unit(function(a) { return a * 1e2; }, function(a) { return a / 1e2; }),
        'km': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }),
        'in': new Unit(function(a) { return a * 0.0254; }, function(a) { return a / 0.0254; }),
        'ft': new Unit(function(a) { return a * 0.3048; }, function(a) { return a / 0.3048; }),
        'yd': new Unit(function(a) { return a * 0.9144; }, function(a) { return a / 0.9144; }),
        'mi': new Unit(function(a) { return a * 1609.344; }, function(a) { return a / 1609.344; }),
        'nmi': new Unit(function(a) { return a * 1852; }, function(a) { return a / 1852; }),
    },
    'mass': {
        'mg': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }),
        'g': new Unit(function(a) { return a; }, function(a) { return a; }),
        'kg': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }),
        't': new Unit(function(a) { return a * 1e6; }, function(a) { return a / 1e6; }),
        'oz': new Unit(function(a) { return a * 28.349523125; }, function(a) { return a / 28.349523125; }),
        'lb': new Unit(function(a) { return a * 453.59237; }, function(a) { return a / 453.59237; }),
        'st': new Unit(function(a) { return a * 6350.29318; }, function(a) { return a / 6350.29318; }),
    },
    'time': {
        'ns': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }),
        'us': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'ms': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }),
        's': new Unit(function(a) { return a; }, function(a) { return a; }),
        'min': new Unit(function(a) { return a * 60; }, function(a) { return a / 60; }),
        'h': new Unit(function(a) { return a * 3600; }, function(a) { return a / 3600; }),
        'd': new Unit(function(a) { return a * 86400; }, function(a) { return a / 86400; }),
        'wk': new Unit(function(a) { return a * 604800; }, function(a) { return a / 604800; }),
        'mo': new Unit(function(a) { return a * 2629800; }, function(a) { return a / 2629800; }),
        'yr': new Unit(function(a) { return a * 31557600; }, function(a) { return a / 31557600; }),
    },
    'current': {
        'nA': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }),
        'uA': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'mA': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }),
        'A': new Unit(function(a) { return a; }, function(a) { return a; }),
        'kA': new Unit(function(a) { return a * 1e3; }, function(a) { return a / 1e3; }),
    },
    'temperature': {
        'K': new Unit(function(a) { return a; }, function(a) { return a; }),
        'C': new Unit(function(a) { return a + 273.15; }, function(a) { return a - 273.15; }),
        'F': new Unit(function(a) { return (a + 459.67) * 5 / 9; }, function(a) { return a * 9 / 5 - 459.67; }),
        'R': new Unit(function(a) { return a * 5 / 9; }, function(a) { return a * 9 / 5; }),
    },
    'amount': {
        'mol': new Unit(function(a) { return a; }, function(a) { return a; }),
    },
    'luminous intensity': {
        'cd': new Unit(function(a) { return a; }, function(a) { return a; }),
    },
    'area': {
        'mm2': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'cm2': new Unit(function(a) { return a * 1e-4; }, function(a) { return a / 1e-4; }),
        'm2': new Unit(function(a) { return a; }, function(a) { return a; }),
        'km2': new Unit(function(a) { return a * 1e6; }, function(a) { return a / 1e6; }),
        'in2': new Unit(function(a) { return a * 0.00064516; }, function(a) { return a / 0.00064516; }),
        'ft2': new Unit(function(a) { return a * 0.09290304; }, function(a) { return a / 0.09290304; }),
        'yd2': new Unit(function(a) { return a * 0.83612736; }, function(a) { return a / 0.83612736; }),
        'mi2': new Unit(function(a) { return a * 2589988.110336; }, function(a) { return a / 2589988.110336; }),
        'ha': new Unit(function(a) { return a * 10000; }, function(a) { return a / 10000; }),
        'ac': new Unit(function(a) { return a * 4046.8564224; }, function(a) { return a / 4046.8564224; }),
    },
    'volume': {
        'mm3': new Unit(function(a) { return a * 1e-9; }, function(a) { return a / 1e-9; }),
        'cm3': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'ml': new Unit(function(a) { return a * 1e-6; }, function(a) { return a / 1e-6; }),
        'cl': new Unit(function(a) { return a * 1e-5; }, function(a) { return a / 1e-5; }),
        'dl': new Unit(function(a) { return a * 1e-4; }, function(a) { return a / 1e-4; }),
        'l': new Unit(function(a) { return a * 1e-3; }, function(a) { return a / 1e-3; }),
        'm3': new Unit(function(a) { return a; }, function(a) { return a; }),
        'km3': new Unit(function(a) { return a * 1e9; }, function(a) { return a / 1e9; }),
        'tsp': new Unit(function(a) { return a * 4.92892159375e-6; }, function(a) { return a / 4.92892159375e-6; }),
        'Tbs': new Unit(function(a) { return a * 1.478676478125e-5; }, function(a) { return a / 1.478676478125e-5; }),
        'in3': new Unit(function(a) { return a * 1.6387064e-5; }, function(a) { return a / 1.6387064e-5; }),
        'fl-oz': new Unit(function(a) { return a * 2.95735295625e-5; }, function(a) { return a / 2.95735295625e-5; }),
        'cup': new Unit(function(a) { return a * 0.0002365882365; }, function(a) { return a / 0.0002365882365; }),
        'pnt': new Unit(function(a) { return a * 0.000473176473; }, function(a) { return a / 0.000473176473; }),
        'qt': new Unit(function(a) { return a * 0.000946352946; }, function(a) { return a / 0.000946352946; }),
        'gal': new Unit(function(a) { return a * 0.003785411784; }, function(a) { return a / 0.003785411784; }),
        'ft3': new Unit(function(a) { return a * 0.028316846592; }, function(a) { return a / 0.028316846592; }),
        'yd3': new Unit(function(a) { return a * 0.764554857984; }, function(a) { return a / 0.764554857984; }),
        'bbl': new Unit(function(a) { return a * 0.158987294928; }, function(a) { return a / 0.158987294928; }),
    },
    'speed': {
        'm/s': new Unit(function(a) { return a; }, function(a) { return a; }),
        'km/h': new Unit(function(a) { return a / 3.6; }, function(a) { return a * 3.6; }),
        'mph': new Unit(function(a) { return a / 2.2369362920544; }, function(a) { return a * 2.2369362920544; }),
        'knot': new Unit(function(a) { return a / 1.9438444924406; }, function(a) { return a * 1.9438444924406; }),
    },
    'acceleration': {
        'm/s2': new Unit(function(a) { return a; }, function(a) { return a; }),
        'G': new Unit(function(a) { return a * 9.80665; }, function(a) { return a / 9.80665; }),
    },
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
                autoconvresult.innerHTML = num + " " + unit + " = <br><br>";
                var units = unitlist[getTypeOfUnit(unit)];
                for (const [key, val] of Object.entries(units)) {
                    var BASEVAL = units[unit].to(parseFloat(num));
                    var RESULT = val.from(BASEVAL);
                    autoconvresult.innerHTML += key + ': ' + RESULT.toFixed(4) + '<br>';
                }
            } else {
                autoconvresult.innerHTML = 'Invalid unit';
            }
        }
    }
});