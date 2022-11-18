var i_cm = document.getElementById('i_cm');
var i_in = document.getElementById('i_in');
var i_ft = document.getElementById('i_ft');
var i_yd = document.getElementById('i_yd');
var i_m = document.getElementById('i_m');
var i_km = document.getElementById('i_km');
var i_mi = document.getElementById('i_mi');

i_cm.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_in.value = i_cm.value * 0.393701;
    i_ft.value = i_cm.value * 0.0328084;
    i_yd.value = i_cm.value * 0.0109361;
    i_m.value = i_cm.value * 0.01;
    i_km.value = i_cm.value * 0.00001;
    i_mi.value = i_cm.value * 0.0000062137;
});
i_in.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_in.value * 2.54;
    i_ft.value = i_in.value * 0.0833333;
    i_yd.value = i_in.value * 0.0277778;
    i_m.value= i_in.value * 0.0254;
    i_km.value = i_in.value * 0.0000254;
    i_mi.value = i_in.value * 0.0000157828;
});
i_ft.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_ft.value * 30.48;
    i_in.value = i_ft.value * 12;
    i_yd.value = i_ft.value * 0.333333;
    i_m.value= i_ft.value * 0.3048;
    i_km.value = i_ft.value * 0.0003048;
    i_mi.value = i_ft.value * 0.000189394;
});
i_yd.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_yd.value * 91.44;
    i_in.value = i_yd.value * 36;
    i_ft.value = i_yd.value * 3;
    i_m.value= i_yd.value * 0.9144;
    i_km.value = i_yd.value * 0.0009144;
    i_mi.value = i_yd.value * 0.000568182;
});
i_m.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_m.value * 100;
    i_in.value = i_m.value * 39.3701;
    i_ft.value = i_m.value * 3.28084;
    i_yd.value = i_m.value * 1.09361;
    i_km.value = i_m.value * 0.001;
    i_mi.value = i_m.value * 0.000621371;
});
i_km.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_km.value * 100000;
    i_in.value = i_km.value * 39370.1;
    i_ft.value = i_km.value * 3280.84;
    i_yd.value = i_km.value * 1093.61;
    i_m.value= i_km.value * 1000;
    i_mi.value = i_km.value * 0.621371;
});
i_mi.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_cm.value = i_mi.value * 160934;
    i_in.value = i_mi.value * 63360;
    i_ft.value = i_mi.value * 5280;
    i_yd.value = i_mi.value * 1760;
    i_m.value= i_mi.value * 1609.34;
    i_km.value = i_mi.value * 1.60934;
});
