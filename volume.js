var i_ml = document.getElementById('i_ml');
var i_l = document.getElementById('i_l');
var i_cup = document.getElementById('i_cup');
var i_tbsp = document.getElementById('i_tbsp');
var i_tsp = document.getElementById('i_tsp');
var i_fl_oz = document.getElementById('i_fl_oz');
var i_pt = document.getElementById('i_pt');
var i_gal = document.getElementById('i_gal');

i_ml.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_l.value = i_ml.value * 0.001;
    i_cup.value = i_ml.value * 0.00422675;
    i_tbsp.value = i_ml.value * 0.067628;
    i_tsp.value = i_ml.value * 0.202884;
    i_fl_oz.value = i_ml.value * 0.033814;
    i_pt.value = i_ml.value * 0.00211338;
    i_gal.value = i_ml.value * 0.000264172;
});
i_l.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_l.value * 1000;
    i_cup.value = i_l.value * 4.22675;
    i_tbsp.value = i_l.value * 67.628;
    i_tsp.value = i_l.value * 202.884;
    i_fl_oz.value = i_l.value * 33.814;
    i_pt.value = i_l.value * 2.11338;
    i_gal.value = i_l.value * 0.264172;
});
i_cup.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_cup.value * 236.588;
    i_l.value = i_cup.value * 0.236588;
    i_tbsp.value = i_cup.value * 16;
    i_tsp.value = i_cup.value * 48;
    i_fl_oz.value = i_cup.value * 8;
    i_pt.value = i_cup.value * 0.5;
    i_gal.value = i_cup.value * 0.0625;
});
i_tbsp.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_tbsp.value * 14.7868;
    i_l.value = i_tbsp.value * 0.0147868;
    i_cup.value = i_tbsp.value * 0.0625;
    i_tsp.value = i_tbsp.value * 3;
    i_fl_oz.value = i_tbsp.value * 0.5;
    i_pt.value = i_tbsp.value * 0.03125;
    i_gal.value = i_tbsp.value * 0.00390625;
});
i_tsp.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_tsp.value * 4.92892;
    i_l.value = i_tsp.value * 0.00492892;
    i_cup.value = i_tsp.value * 0.0208333;
    i_tbsp.value = i_tsp.value * 0.333333;
    i_fl_oz.value = i_tsp.value * 0.166667;
    i_pt.value = i_tsp.value * 0.0104167;
    i_gal.value = i_tsp.value * 0.00130208;
});
i_fl_oz.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_fl_oz.value * 29.5735;
    i_l.value = i_fl_oz.value * 0.0295735;
    i_cup.value = i_fl_oz.value * 0.125;
    i_tbsp.value = i_fl_oz.value * 2;
    i_tsp.value = i_fl_oz.value * 6;
    i_pt.value = i_fl_oz.value * 0.0625;
    i_gal.value = i_fl_oz.value * 0.0078125;
});
i_pt.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_pt.value * 473.176;
    i_l.value = i_pt.value * 0.473176;
    i_cup.value = i_pt.value * 2;
    i_tbsp.value = i_pt.value * 32;
    i_tsp.value = i_pt.value * 96;
    i_fl_oz.value = i_pt.value * 16;
    i_gal.value = i_pt.value * 0.125;
});
i_gal.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_ml.value = i_gal.value * 3785.41;
    i_l.value = i_gal.value * 3.78541;
    i_cup.value = i_gal.value * 16;
    i_tbsp.value = i_gal.value * 256;
    i_tsp.value = i_gal.value * 768;
    i_fl_oz.value = i_gal.value * 128;
    i_pt.value = i_gal.value * 8;
});
