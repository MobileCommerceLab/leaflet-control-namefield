var L = require('leaflet');

module.exports = {
  class: L.Control.extend({
    options: {
      collapsed: true,
      expand: 'click',
      position: 'topright',
      placeholder: 'Location Name...',
    },

    includes: L.Evented.prototype,

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

      if (this.options.collapsed) {
        if (this.options.expand === 'click') {
          L.DomEvent.addListener(icon, 'click', function(e) {
            if (e.button === 0 && e.detail !== 2) {
              this._toggle();
              this._doNotify();
            }
          }, this);
        } else {
          L.DomEvent.addListener(icon, 'mousedown', this._doNotify, this);
          L.DomEvent.addListener(icon, 'mouseover', this._expand, this);
          L.DomEvent.addListener(inputField, 'mouseout', this._collapse, this);
          this._map.on('movestart', this._collapse, this);
        }
      } else {
        L.DomEvent.addListener(icon, 'click', function() {
          this._doNotify();
        }, this);
        this._expand();
      }
      

      L.DomEvent.disableClickPropagation(container);

      return container;
    },

    _expand: function () {
      L.DomUtil.addClass(this._container, 'leaflet-control-nameselector-expanded');
      this._inputField.select();
      this.fire('expand');
    },

    _collapse: function () {
      this._container.className = this._container.className.replace(' leaflet-control-nameselector-expanded', '');
      this.fire('collapse');
    },

    _toggle: function() {
      if (this._container.className.indexOf('leaflet-control-nameselector-expanded') >= 0) {
        this._collapse();
      } else {
        this._expand();
      }
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
