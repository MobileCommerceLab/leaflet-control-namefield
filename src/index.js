var L = require('leaflet'),
	Name = require('./name');

L.Util.extend(L.Control, {
	NameSelector: Name.class,
	nameselector: Name.factory
});
