function mapScript() {
  console.log("asdasdasd")
}


function highlightFeature(e) {
  console.log(e);
  var layer = e.sourceTarget.options;
  layer.weight = 5;
  layer.color = '#666';
  layer.dashArray = '';
  layer.fillOpacity = 0.7;
  // info.update(e.feature.properties);
}

var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this._div.innerHTML = '<h4>US Population Density</h4>' +  (props ?
    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
    : 'Hover over a state');
};

