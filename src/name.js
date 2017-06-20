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
      var className = 'leaflet-control-nameselector',
          container = L.DomUtil.create('div', className + ' leaflet-bar'),
          icon = L.DomUtil.create('button', className + '-icon', container),
          form = this._form = L.DomUtil.create('div', className + '-form', container),
          inputField;

      this._map = map;
      this._container = container;

      icon.innerHTML = '&nbsp;';
      icon.type = 'button';

      inputField = this._inputField = L.DomUtil.create('input', '', form);
      inputField.type = 'text';
      inputField.placeholder = this.options.placeholder;

      L.DomEvent.addListener(this._inputField, 'keydown', this._keydown, this);
      L.DomEvent.addListener(icon, 'mousedown', this._doNotify, this);

      L.DomEvent.disableClickPropagation(container);

      return container;
    },

    getField: function(){
      return this._inputField.value;
    },

    setField: function(arg){
      this._inputField.value = arg;
      this._doNotify();
    },

    _setField: function(result) {
      result = result.geocode || result;
      this._inputField.value = result.name;
      this._doNotify();

      return this;
    },

    _doNotify: function () {
      this.fire('field-changed', {name: this._inputField.value});
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
