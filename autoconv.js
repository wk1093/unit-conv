var autoconv = document.getElementById('autoconv');
var autoconvresult = document.getElementById('autoconvresult');
function fixval(val) {
    val = val.replace(/\s+/, ' ');
    val = val.replace(/([0-9]+|[0-9]+\.[0-9]+)([a-zA-Z]+)/, '$1 $2');
    return val;
}

autoconv.addEventListener("keyup", function(event) {
    verify = /([0-9]+|[0-9]+\.[0-9]+)\s*[a-zA-Z]+/;
    if (verify.test(autoconv.value) && autoconv.value != "" && event.keyCode != 13) {
        autoconv.value = fixval(autoconv.value);
        var val = autoconv.value.split(' ');
        var num = val[0];
        var unit = val[1];
        var conv = {
            // Length
            'cm': {
                'in': function (num) {return num * 0.393701;},
                'ft': function (num) {return num * 0.0328084;},
                'yd': function (num) {return num * 0.0109361;},
                'm': function (num) {return num * 0.01;},
                'km': function (num) {return num * 0.00001;},
                'mi': function (num) {return num * 0.0000062137;}
            },
            'in': {
                'cm': function (num) {return num * 2.54;},
                'ft': function (num) {return num * 0.0833333;},
                'yd': function (num) {return num * 0.0277778;},
                'm': function (num) {return num * 0.0254;},
                'km': function (num) {return num * 0.0000254;},
                'mi': function (num) {return num * 0.0000157828;}
            },
            'ft': {
                'cm': function (num) {return num * 30.48;},
                'in': function (num) {return num * 12;},
                'yd': function (num) {return num * 0.333333;},
                'm': function (num) {return num * 0.3048;},
                'km': function (num) {return num * 0.0003048;},
                'mi': function (num) {return num * 0.000189394;}
            },
            'yd': {
                'cm': function (num) {return num * 91.44;},
                'in': function (num) {return num * 36;},
                'ft': function (num) {return num * 3;},
                'm': function (num) {return num * 0.9144;},
                'km': function (num) {return num * 0.0009144;},
                'mi': function (num) {return num * 0.000568182;}
            },
            'm': {
                'cm': function (num) {return num * 100;},
                'in': function (num) {return num * 39.3701;},
                'ft': function (num) {return num * 3.28084;},
                'yd': function (num) {return num * 1.09361;},
                'km': function (num) {return num * 0.001;},
                'mi': function (num) {return num * 0.000621371;}
            },
            'km': {
                'cm': function (num) {return num * 100000;},
                'in': function (num) {return num * 39370.1;},
                'ft': function (num) {return num * 3280.84;},
                'yd': function (num) {return num * 1093.61;},
                'm': function (num) {return num * 1000;},
                'mi': function (num) {return num * 0.621371;}
            },
            'mi': {
                'cm': function (num) {return num * 160934;},
                'in': function (num) {return num * 63360;},
                'ft': function (num) {return num * 5280;},
                'yd': function (num) {return num * 1760;},
                'm': function (num) {return num * 1609.34;},
                'km': function (num) {return num * 1.60934;}
            },
            // Weight
            'g': {
                'oz': function (num) {return num * 0.035274;},
                'lb': function (num) {return num * 0.00220462;},
                'kg': function (num) {return num * 0.001;},
                't': function (num) {return num * 0.000001;},
                'st': function (num) {return num * 0.000157473;},
                'cwt': function (num) {return num * 0.0000196841;},
                'ton': function (num) {return num * 0.00000110231;}
            },
            'oz': {
                'g': function (num) {return num * 28.3495;},
                'lb': function (num) {return num * 0.0625;},
                'kg': function (num) {return num * 0.0283495;},
                't': function (num) {return num * 0.0000283495;},
                'st': function (num) {return num * 0.00446429;},
                'cwt': function (num) {return num * 0.000558442;},
                'ton': function (num) {return num * 0.00003125;}
            },
            'lb': {
                'g': function (num) {return num * 453.592;},
                'oz': function (num) {return num * 16;},
                'kg': function (num) {return num * 0.453592;},
                't': function (num) {return num * 0.000453592;},
                'st': function (num) {return num * 0.0714286;},
                'cwt': function (num) {return num * 0.00892857;},
                'ton': function (num) {return num * 0.0005;}
            },
            'kg': {
                'g': function (num) {return num * 1000;},
                'oz': function (num) {return num * 35.274;},
                'lb': function (num) {return num * 2.20462;},
                't': function (num) {return num * 0.001;},
                'st': function (num) {return num * 0.157473;},
                'cwt': function (num) {return num * 0.0196841;},
                'ton': function (num) {return num * 0.00110231;}
            },
            't': {
                'g': function (num) {return num * 1000000;},
                'oz': function (num) {return num * 35274;},
                'lb': function (num) {return num * 2204.62;},
                'kg': function (num) {return num * 1000;},
                'st': function (num) {return num * 157.473;},
                'cwt': function (num) {return num * 19.6841;},
                'ton': function (num) {return num * 1.10231;}
            },
            'st': {
                'g': function (num) {return num * 6350.29;},
                'oz': function (num) {return num * 224;},
                'lb': function (num) {return num * 14;},
                'kg': function (num) {return num * 6.35029;},
                't': function (num) {return num * 0.00635029;},
                'cwt': function (num) {return num * 0.125;},
                'ton': function (num) {return num * 0.00694444;}
            },
            'cwt': {
                'g': function (num) {return num * 50802.3;},
                'oz': function (num) {return num * 1792;},
                'lb': function (num) {return num * 112;},
                'kg': function (num) {return num * 50.8023;},
                't': function (num) {return num * 0.0508023;},
                'st': function (num) {return num * 8;},
                'ton': function (num) {return num * 0.0555556;}
            },
            'ton': {
                'g': function (num) {return num * 907184;},
                'oz': function (num) {return num * 32000;},
                'lb': function (num) {return num * 2000;},
                'kg': function (num) {return num * 907.184;},
                't': function (num) {return num * 0.907184;},
                'st': function (num) {return num * 142.857;},
                'cwt': function (num) {return num * 17.8571;}
            },
            // Capacity
            'ml': {
                'tsp': function (num) {return num * 0.202884;},
                'tbsp': function (num) {return num * 0.067628;},
                'fl oz': function (num) {return num * 0.033814;},
                'cup': function (num) {return num * 0.00422675;},
                'pint': function (num) {return num * 0.00211338;},
                'quart': function (num) {return num * 0.00105669;},
                'gal': function (num) {return num * 0.000264172;},
                'l': function (num) {return num * 0.001;},
                'dl': function (num) {return num * 0.01;},
                'hl': function (num) {return num * 0.0001;}
            },
            'tsp': {
                'ml': function (num) {return num * 4.92892;},
                'tbsp': function (num) {return num * 0.333333;},
                'fl oz': function (num) {return num * 0.166667;},
                'cup': function (num) {return num * 0.0208333;},
                'pint': function (num) {return num * 0.0104167;},
                'quart': function (num) {return num * 0.00520833;},
                'gal': function (num) {return num * 0.00130208;},
                'l': function (num) {return num * 0.00492892;},
                'dl': function (num) {return num * 0.0492892;},
                'hl': function (num) {return num * 0.000492892;}
            },
            'tbsp': {
                'ml': function (num) {return num * 14.7868;},
                'tsp': function (num) {return num * 3;},
                'fl oz': function (num) {return num * 0.5;},
                'cup': function (num) {return num * 0.0625;},
                'pint': function (num) {return num * 0.03125;},
                'quart': function (num) {return num * 0.015625;},
                'gal': function (num) {return num * 0.00390625;},
                'l': function (num) {return num * 0.0147868;},
                'dl': function (num) {return num * 0.147868;},
                'hl': function (num) {return num * 0.00147868;}
            },
            'fl oz': {
                'ml': function (num) {return num * 29.5735;},
                'tsp': function (num) {return num * 6;},
                'tbsp': function (num) {return num * 2;},
                'cup': function (num) {return num * 0.125;},
                'pint': function (num) {return num * 0.0625;},
                'quart': function (num) {return num * 0.03125;},
                'gal': function (num) {return num * 0.0078125;},
                'l': function (num) {return num * 0.0295735;},
                'dl': function (num) {return num * 0.295735;},
                'hl': function (num) {return num * 0.00295735;}
            },
            'cup': {
                'ml': function (num) {return num * 236.588;},
                'tsp': function (num) {return num * 48;},
                'tbsp': function (num) {return num * 16;},
                'fl oz': function (num) {return num * 8;},
                'pint': function (num) {return num * 0.5;},
                'quart': function (num) {return num * 0.25;},
                'gal': function (num) {return num * 0.0625;},
                'l': function (num) {return num * 0.236588;},
                'dl': function (num) {return num * 2.36588;},
                'hl': function (num) {return num * 0.0236588;}
            },
            'pint': {
                'ml': function (num) {return num * 473.176;},
                'tsp': function (num) {return num * 96;},
                'tbsp': function (num) {return num * 32;},
                'fl oz': function (num) {return num * 16;},
                'cup': function (num) {return num * 2;},
                'quart': function (num) {return num * 0.5;},
                'gal': function (num) {return num * 0.125;},
                'l': function (num) {return num * 0.473176;},
                'dl': function (num) {return num * 4.73176;},
                'hl': function (num) {return num * 0.0473176;}
            },
            'quart': {
                'ml': function (num) {return num * 946.353;},
                'tsp': function (num) {return num * 192;},
                'tbsp': function (num) {return num * 64;},
                'fl oz': function (num) {return num * 32;},
                'cup': function (num) {return num * 4;},
                'pint': function (num) {return num * 2;},
                'gal': function (num) {return num * 0.25;},
                'l': function (num) {return num * 0.946353;},
                'dl': function (num) {return num * 9.46353;},
                'hl': function (num) {return num * 0.0946353;}
            },
            'gal': {
                'ml': function (num) {return num * 3785.41;},
                'tsp': function (num) {return num * 768;},
                'tbsp': function (num) {return num * 256;},
                'fl oz': function (num) {return num * 128;},
                'cup': function (num) {return num * 16;},
                'pint': function (num) {return num * 8;},
                'quart': function (num) {return num * 4;},
                'l': function (num) {return num * 3.78541;},
                'dl': function (num) {return num * 37.8541;},
                'hl': function (num) {return num * 0.378541;}
            },
            'l': {
                'ml': function (num) {return num * 1000;},
                'tsp': function (num) {return num * 202.884;},
                'tbsp': function (num) {return num * 67.628;},
                'fl oz': function (num) {return num * 33.814;},
                'cup': function (num) {return num * 4.22675;},
                'pint': function (num) {return num * 2.11338;},
                'quart': function (num) {return num * 1.05669;},
                'gal': function (num) {return num * 0.264172;},
                'dl': function (num) {return num * 10;},
                'hl': function (num) {return num * 0.1;}
            },
            'dl': {
                'ml': function (num) {return num * 100;},
                'tsp': function (num) {return num * 20.2884;},
                'tbsp': function (num) {return num * 6.76284;},
                'fl oz': function (num) {return num * 3.38142;},
                'cup': function (num) {return num * 0.422675;},
                'pint': function (num) {return num * 0.211338;},
                'quart': function (num) {return num * 0.105669;},
                'gal': function (num) {return num * 0.0264172;},
                'l': function (num) {return num * 0.1;},
                'hl': function (num) {return num * 0.01;}
            },
            'hl': {
                'ml': function (num) {return num * 10000;},
                'tsp': function (num) {return num * 202.884;},
                'tbsp': function (num) {return num * 67.628;},
                'fl oz': function (num) {return num * 33.814;},
                'cup': function (num) {return num * 4.22675;},
                'pint': function (num) {return num * 2.11338;},
                'quart': function (num) {return num * 1.05669;},
                'gal': function (num) {return num * 0.264172;},
                'l': function (num) {return num * 10;},
                'dl': function (num) {return num * 100;}
            },
            // Temperature
            'c': {
                'F': function (num) {return num * 1.8 + 32.0;},
                'K': function (num) {return num + 273.15;}
            },
            'f': {
                'C': function (num) {return (num - 32.0) / 1.8;},
                'K': function (num) {return (num + 459.67) * 5.0 / 9.0;}
            },
            'k': {
                'C': function (num) {return num - 273.15;},
                'F': function (num) {return num * 9.0 / 5.0 - 459.67;}
            },
            // Speed
            'm/s': {
                'km/h': function (num) {return num * 3.6;},
                'mph': function (num) {return num * 2.23694;},
                'knot': function (num) {return num * 1.94384;}
            },
            'km/h': {
                'm/s': function (num) {return num * 0.277778;},
                'mph': function (num) {return num * 0.621371;},
                'knot': function (num) {return num * 0.539957;}
            },
            'mph': {
                'm/s': function (num) {return num * 0.44704;},
                'km/h': function (num) {return num * 1.60934;},
                'knot': function (num) {return num * 0.868976;}
            },
            'knot': {
                'm/s': function (num) {return num * 0.514444;},
                'km/h': function (num) {return num * 1.852;},
                'mph': function (num) {return num * 1.15078;}
            },
            // Pressure
            'Pa': {
                'hPa': function (num) {return num * 0.01;},
                'kPa': function (num) {return num * 0.001;},
                'MPa': function (num) {return num * 0.000001;},
                'bar': function (num) {return num * 0.00001;},
                'atm': function (num) {return num * 0.00000986923;},
                'torr': function (num) {return num * 0.00750062;},
                'psi': function (num) {return num * 0.000145038;}
            },
            'hPa': {
                'Pa': function (num) {return num * 100;},
                'kPa': function (num) {return num * 0.1;},
                'MPa': function (num) {return num * 0.00001;},
                'bar': function (num) {return num * 0.001;},
                'atm': function (num) {return num * 0.000986923;},
                'torr': function (num) {return num * 0.750062;},
                'psi': function (num) {return num * 0.0145038;}
            },
            'kPa': {
                'Pa': function (num) {return num * 1000;},
                'hPa': function (num) {return num * 10;},
                'MPa': function (num) {return num * 0.001;},
                'bar': function (num) {return num * 0.01;},
                'atm': function (num) {return num * 0.00986923;},
                'torr': function (num) {return num * 7.50062;},
                'psi': function (num) {return num * 0.145038;}
            },
            'MPa': {
                'Pa': function (num) {return num * 1000000;},
                'hPa': function (num) {return num * 10000;},
                'kPa': function (num) {return num * 1000;},
                'bar': function (num) {return num * 10;},
                'atm': function (num) {return num * 9.86923;},
                'torr': function (num) {return num * 7500.62;},
                'psi': function (num) {return num * 145.038;}
            },
            'bar': {
                'Pa': function (num) {return num * 100000;},
                'hPa': function (num) {return num * 1000;},
                'kPa': function (num) {return num * 100;},
                'MPa': function (num) {return num * 0.1;},
                'atm': function (num) {return num * 0.986923;},
                'torr': function (num) {return num * 750.062;},
                'psi': function (num) {return num * 14.5038;}
            },
            'atm': {
                'Pa': function (num) {return num * 101325;},
                'hPa': function (num) {return num * 1013.25;},
                'kPa': function (num) {return num * 101.325;},
                'MPa': function (num) {return num * 0.101325;},
                'bar': function (num) {return num * 1.01325;},
                'torr': function (num) {return num * 760;},
                'psi': function (num) {return num * 14.6959;}
            },
            'torr': {
                'Pa': function (num) {return num * 133.322;},
                'hPa': function (num) {return num * 1.33322;},
                'kPa': function (num) {return num * 0.133322;},
                'MPa': function (num) {return num * 0.000133322;},
                'bar': function (num) {return num * 0.00133322;},
                'atm': function (num) {return num * 0.00131579;},
                'psi': function (num) {return num * 0.0193368;}
            },
            'psi': {
                'Pa': function (num) {return num * 6894.76;},
                'hPa': function (num) {return num * 68.9476;},
                'kPa': function (num) {return num * 6.89476;},
                'MPa': function (num) {return num * 0.00689476;},
                'bar': function (num) {return num * 0.0689476;},
                'atm': function (num) {return num * 0.06804596;},
                'torr': function (num) {return num * 51.7149;}
            }
        };
        autoconvresult.innerHTML = '';
        if (unit) {
            if (unit.toLowerCase() in conv) {
                for (const [key, val] of Object.entries(conv[unit.toLowerCase()])) {
                    autoconvresult.innerHTML += key + ': ' + val(parseFloat(num)).toFixed(4) + '<br>';
                }
            }
        }

    }
});