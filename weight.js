var i_g = document.getElementById('i_g');
var i_kg = document.getElementById('i_kg');
var i_oz = document.getElementById('i_oz');
var i_lb = document.getElementById('i_lb');
var i_mg = document.getElementById('i_mg');

i_g.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_kg.value = i_g.value * 0.001;
    i_oz.value = i_g.value * 0.035274;
    i_lb.value = i_g.value * 0.00220462;
    i_mg.value = i_g.value * 1000;
});
i_kg.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_g.value = i_kg.value * 1000;
    i_oz.value = i_kg.value * 35.274;
    i_lb.value = i_kg.value * 2.20462;
    i_mg.value = i_kg.value * 1000000;
});
i_oz.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_g.value = i_oz.value * 28.3495;
    i_kg.value = i_oz.value * 0.0283495;
    i_lb.value = i_oz.value * 0.0625;
    i_mg.value = i_oz.value * 28349.5;
});
i_lb.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_g.value = i_lb.value * 453.592;
    i_kg.value = i_lb.value * 0.453592;
    i_oz.value = i_lb.value * 16;
    i_mg.value = i_lb.value * 453592;
});
i_mg.addEventListener("keyup", function(event) {
    event.preventDefault();
    i_g.value = i_mg.value * 0.001;
    i_kg.value = i_mg.value * 0.000001;
    i_oz.value = i_mg.value * 0.000035274;
    i_lb.value = i_mg.value * 0.00000220462;
});
