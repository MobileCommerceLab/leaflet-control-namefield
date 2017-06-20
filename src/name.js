var L = require('leaflet');

module.exports = {
  class: L.Control.extend({
    options: {
      position: 'topright',
      placeholder: 'Location Name...',
    },

    includes: L.Mixin.Events,

    initialize: function (options) {
      L.Util.setOptions(this, options);
    },

    onAdd: function (map) {
      var className = 'leaflet-control-geocoder-nameselector',
          container = L.DomUtil.create('div', className + ' leaflet-bar'),
          form = this._form = L.DomUtil.create('div', className + '-form', container);

      this._map = map;
      this._container = container;

      this._inputField = L.DomUtil.create('input', '', form);
      this._inputField.type = 'text';
      this._inputField.placeholder = this.options.placeholder;

      L.DomEvent.addListener(this._inputField, 'keydown', this._keydown, this);

      L.DomEvent.disableClickPropagation(container);

      //Fill in the name field automatically the first time you do a geocode search.
      this._map.once('markgeocode', this._setName, this);


      return container;
    },

    _setName: function(result) {
      result = result.geocode || result;
      this._inputField.value = result.name;
      this._doNotify();

      return this;
    },

    _doNotify: function () {
      //Alert the map that this control is connected to that the name field changed.
      this._map.fire('name-changed', {name: this._inputField.value});
    },

    _keydown: function(e) {
      var _this = this;

      switch (e.keyCode) {
      // Escape
      case 27:
        break;
      // Up
      case 38:
        L.DomEvent.preventDefault(e);
        break;
      // Up
      case 40:
        L.DomEvent.preventDefault(e);
        break;
      // Enter
      case 13:
        L.DomEvent.preventDefault(e);
        this._doNotify();
        break;
      default:

      }
    }
  }),
  factory: function(options) {
    return new L.Control.NameSelector(options);
  }
};
