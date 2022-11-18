import { unitlist } from './unitlist.js';

var autoconv = document.getElementById('autoconv');
var autoconvresult = document.getElementById('autoconvresult');
function fixval(val) {
    val = val.replace(/\s+/, ' ');
    val = val.replace(/([0-9]+|[0-9]+\.[0-9]+)([a-zA-Z]+)/, '$1 $2');
    return val;
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
    var verify = /([0-9]+|[0-9]+\.[0-9]+)\s*(.*)+/;
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
autoconvresult.innerHTML = '';