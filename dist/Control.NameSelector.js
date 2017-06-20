(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.leafletControlNamefield = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null),
	Name = _dereq_('./name');

L.Util.extend(L.Control, {
	NameSelector: Name["class"],
	nameselector: Name.factory
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./name":2}],2:[function(_dereq_,module,exports){
(function (global){
var L = (typeof window !== "undefined" ? window['L'] : typeof global !== "undefined" ? global['L'] : null);

module.exports = {
  "class": L.Control.extend({
    options: {
      collapsed: true,
      expand: 'click',
      position: 'topright',
      placeholder: 'Location Name...'
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});