import { unitlist } from './unitlist.js';

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

var autounits = document.getElementById('autounits');

for (var i in unitlist) {
    autounits.innerHTML += '<h3>' + i.toProperCase() + '</h3><ul>';
    for (var j in unitlist[i]) {
        autounits.innerHTML += '<li>' + unitlist[i][j].nice + '</li>';
    }
    autounits.innerHTML += '</ul>';
}