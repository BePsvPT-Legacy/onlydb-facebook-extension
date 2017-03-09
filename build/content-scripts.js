/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 45);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Find first ancestor of el with tagName or undefined if not found.
 *
 * @param el
 * @param tagName
 * @returns {*}
 *
 * @reference http://stackoverflow.com/a/6857116
 */
exports.default = function (el, tagName) {
  tagName = tagName.toLowerCase();

  while (el && el.parentNode) {
    el = el.parentNode;

    if (el.tagName && el.tagName.toLowerCase() === tagName) {
      return el;
    }
  }

  return null;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(9)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (dom) {
  //
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (dom) {
  //
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolean = __webpack_require__(26);

var _boolean2 = _interopRequireDefault(_boolean);

var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _upTo = __webpack_require__(0);

var _upTo2 = _interopRequireDefault(_upTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(setting) {
  var table = [{ title: '精選動態', description: '於動態時報上嵌入我們精選的熱門動態', key: 'featured-feed' }, { title: '移除廣告', description: '於動態時報上移除為贊助的動態', key: 'remove-ad' }, { title: '同步搜尋', description: '於臉書搜尋時，一並於我們專屬資料庫中搜尋', key: 'sync-search' }];

  return table.reduce(function (html, item) {
    return html + ('\n<div class="setting-section">\n  <div class="title">\n    <b>' + item.title + '</b>\n  </div>\n  \n  <div class="description">\n    <span>' + item.description + '</span>\n  </div>\n  \n  <div class="operation">\n    <span class="success-icon">\n      <i class="fa fa-check" aria-hidden="true"></i>\n    </span>\n    \n    <select id="' + item.key + '">\n        <option value="0">Off</option>\n        <option value="1" ' + ((0, _boolean2.default)(setting[item.key]) ? 'selected' : '') + '>On</option>\n    </select>\n  </div>\n</div>');
  }, '');
};

module.exports = function (dom) {
  _config2.default.get('setting', function (setting) {
    dom.innerHTML = render(setting);

    document.querySelectorAll('.custom-modal .box .content .setting-section .operation select').forEach(function (node) {
      node.addEventListener('change', function (e) {
        setting[e.target.id] = (0, _boolean2.default)(e.target.value);

        _config2.default.set('setting', setting, function () {
          var n = (0, _upTo2.default)(e.target, 'div').querySelector('span');

          n.className = n.className.replace(/ ?ani/g, '');

          setTimeout(function () {
            n.className += ' ani';
          }, 1);
        });
      });
    });
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (dom) {
  //
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(25);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _dotProp = __webpack_require__(38);

var _dotProp2 = _interopRequireDefault(_dotProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  /**
   * Get content from storage and pass the result to callback function.
   *
   * @param key
   * @param cb
   *
   * @returns void
   */
  get: function get(key) {
    var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    if (null === cb) {
      var _ref = ['', key];
      key = _ref[0];
      cb = _ref[1];
    }

    var pos = key.indexOf('.');

    var k = (-1 !== pos ? key.slice(0, pos) : key) || null;

    chrome.storage.local.get(k, function (items) {
      if (null !== k && items.hasOwnProperty(k)) {
        items = items[k];

        if (-1 !== pos) {
          items = _dotProp2.default.get(items, key.slice(pos + 1), {});
        }
      }

      cb(items);
    });
  },


  /**
   * Store content to storage.
   *
   * @param key
   * @param val
   * @param cb
   *
   * @returns void
   */
  set: function set(key, val) {
    var _this = this;

    var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    if (!key.includes('.')) {
      chrome.storage.local.set((0, _defineProperty3.default)({}, key, val), cb);
    } else {
      var pos = key.indexOf('.');

      this.get(key.slice(0, pos), function (item) {
        _dotProp2.default.set(item, key.substr(pos + 1), val);

        _this.set(key.slice(0, pos), item, cb);
      });
    }
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(29)
  , IE8_DOM_DEFINE = __webpack_require__(34)
  , toPrimitive    = __webpack_require__(36)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(41)
  , lolcation = __webpack_require__(42)
  , qs = __webpack_require__(40)
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i;

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @api private
 */
function extractProtocol(address) {
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @api private
 */
function resolve(relative, base) {
  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} location Location defaults for relative paths.
 * @param {Boolean|Function} parser Parser for the query string.
 * @api public
 */
function URL(address, location, parser) {
  if (!(this instanceof URL)) {
    return new URL(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[2] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];
    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL}
 * @api public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
      url.pathname = value.length && value.charAt(0) !== '/' ? '/' + value : value;

      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
};

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String}
 * @api public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

URL.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
URL.extractProtocol = extractProtocol;
URL.location = lolcation;
URL.qs = qs;

module.exports = URL;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _upTo = __webpack_require__(0);

var _upTo2 = _interopRequireDefault(_upTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a font awesome icon node.
 *
 * @param icon
 * @param name
 *
 * @returns string
 */
function iconNode(icon, name) {
  return '<i class="fa fa-fw fa-' + icon + '" aria-hidden="true" data-hover="tooltip" data-tooltip-delay="350" data-tooltip-content="' + name + '"></i>';
}

/**
 * Add buttons in the right of search bar.
 *
 * @returns void
 */
module.exports = function () {
  var node = document.createElement('div');

  node.className = 'custom-button';
  node.innerHTML = '\n' + iconNode('fire', '熱門粉專') + '\n' + iconNode('bar-chart', '個人統計') + '\n' + iconNode('history', '歷史回顧') + '\n' + iconNode('cog', '設定');

  (0, _upTo2.default)(document.querySelector('div.custom-search-bar'), 'div').append(node);
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Add modal.
 *
 * @returns void
 */
module.exports = function () {
  var node = document.createElement('div');

  node.className = 'custom-modal';
  node.style.display = 'none';
  node.innerHTML = '\n<div class="background"></div>\n\n<div class="box">\n  <div class="header">\n    <div style="margin-left: 1rem;">\n      <b id="custom-modal-title" style="font-size: 16px;"></b>\n    </div>\n    <div class="close-button">\n      <i class="fa fa-lg fa-times" aria-hidden="true"></i>\n    </div>\n  </div>\n  \n  <div class="content"></div>\n</div>';

  document.body.append(node);

  var closeEvent = function closeEvent() {
    node.style.display = 'none';
  };

  document.querySelector('.custom-modal .background').onclick = closeEvent;
  document.querySelector('.custom-modal .close-button i').onclick = closeEvent;
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Add class to facebook navbar.
 *
 * @param dom
 *
 * @returns void
 */
module.exports = function (dom) {
  dom.className += ' custom-navbar';
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Add search bar in the right of facebook search bar.
 *
 * @param dom
 *
 * @returns void
 */
module.exports = function (dom) {
  var node = document.createElement('div');

  node.className = 'custom-search-bar';
  node.innerHTML = '\n<form>\n  <div>\n    <input id="custom-search-input" type="text" placeholder="Search DB">\n  </div>\n</form>';

  dom.append(node);
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  document.querySelectorAll('.custom-button i').forEach(function (node) {
    node.addEventListener('click', function (e) {
      document.querySelector('.custom-modal').style.display = 'block';
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent;

      var mapping = {
        'fire': 'hottest',
        'bar-chart': 'statistics',
        'history': 'history',
        'cog': 'setting'
      };

      var name = e.target.className;

      name = name.substr(name.lastIndexOf('fa-') + 3);

      __webpack_require__(44)("./" + mapping[name])(document.querySelector('.custom-modal .box .content'));
    });
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Listen for facebook search.
 *
 * @returns void
 */
var search = function search() {
  var fbSearchInputs = document.querySelectorAll('input[name="q"]');

  if (2 > fbSearchInputs.length && !document.querySelector('#q')) {
    window.setTimeout(search, 1000);
  } else {
    fbSearchInputs.item(fbSearchInputs.length - 1).addEventListener('input', function (e) {
      document.querySelector('#custom-search-input').value = e.target.value;
    });
  }
};

module.exports = search;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(7);

var _config2 = _interopRequireDefault(_config);

var _parseFbid = __webpack_require__(46);

var _parseFbid2 = _interopRequireDefault(_parseFbid);

var _inScreen = __webpack_require__(21);

var _inScreen2 = _interopRequireDefault(_inScreen);

var _isPublic = __webpack_require__(22);

var _isPublic2 = _interopRequireDefault(_isPublic);

var _isSponsored = __webpack_require__(23);

var _isSponsored2 = _interopRequireDefault(_isSponsored);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function () {
  var feeds = [];

  var lastY = 0;

  window.onscroll = function () {
    if ('/' !== window.location.pathname) {
      lastY = 0;

      return;
    }

    document.querySelectorAll('div[id^="hyperfeed_story_id"]').forEach(function (feed) {
      if ((0, _isSponsored2.default)(feed)) {
        return _config2.default.get('setting.remove-ad', function (remove) {
          return remove && feed.remove();
        });
      } else if ((0, _isPublic2.default)(feed)) {
        var fbid = (0, _parseFbid2.default)(feed.querySelector('div span span a:not([data-hovercard-prefer-more-content-show])').href);

        if (fbid) {
          if (!feeds.includes(fbid)) {
            feeds.push(fbid);

            _config2.default.set('feeds', feeds);
          }

          if ((0, _inScreen2.default)(feed)) {
            console.log(0 > window.scrollY - lastY ? 'back' : '', fbid);
          }
        }
      }
    });

    lastY = window.scrollY;
  };
};

/***/ }),
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Determine the feed is in screen or not.
 *
 * @returns boolean
 */
exports.default = function (feed) {
  var rect = feed.getBoundingClientRect();

  var screen = {
    top: window.scrollY,
    bottom: window.scrollY + document.documentElement.clientHeight
  };

  var el = {
    top: feed.offsetTop + rect.height / 3,
    bottom: feed.offsetTop + rect.height / 3 * 2
  };

  if (el.top > screen.top && el.top < screen.bottom) {
    return true;
  } else if (el.bottom > screen.top && el.bottom < screen.bottom) {
    return true;
  }

  return false;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Determine the feed is public or not.
 *
 * @returns boolean
 */
exports.default = function (feed) {
  var privacy = feed.querySelector('a[data-hover="tooltip"][class*="Privacy"], div[data-hover="tooltip"]');

  if (!privacy) {
    return false;
  }

  privacy = privacy.getAttribute('data-tooltip-content');

  return privacy.includes('Public') || privacy.includes('公開');
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Determine the feed is sponsored or not.
 *
 * @returns boolean
 */
exports.default = function (feed) {
  var isSponsored = feed.querySelector('a[href^="https://l.facebook.com/l.php"]');

  if (!isSponsored) {
    return false;
  }

  switch (isSponsored.innerText) {
    case 'Sponsored':
    case '贊助':
    case '広告':
      return true;

    default:
      return false;
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(27), __esModule: true };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(24);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var boolean = function (value) {
  if (typeof value === 'string') {
    return /^(true|t|yes|y|1)$/i.test(value.trim());
  }

  if (typeof value === 'number') {
    return value === 1;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return false;
};

module.exports = boolean;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(37);
var $Object = __webpack_require__(8).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(28);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , document = __webpack_require__(10).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(10)
  , core      = __webpack_require__(8)
  , ctx       = __webpack_require__(30)
  , hide      = __webpack_require__(33)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(11)
  , createDesc = __webpack_require__(35);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(9)(function(){
  return Object.defineProperty(__webpack_require__(31)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(32);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(39);

function getPathSegments(path) {
	const pathArr = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArr.length; i++) {
		let p = pathArr[i];

		while (p[p.length - 1] === '\\' && pathArr[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArr[++i];
		}

		parts.push(p);
	}

	return parts;
}

module.exports = {
	get(obj, path, value) {
		if (!isObj(obj) || typeof path !== 'string') {
			return value === undefined ? obj : value;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			if (!Object.prototype.propertyIsEnumerable.call(obj, pathArr[i])) {
				return value;
			}

			obj = obj[pathArr[i]];

			if (obj === undefined || obj === null) {
				// `obj` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `obj` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArr.length - 1) {
					return value;
				}

				break;
			}
		}

		return obj;
	},

	set(obj, path, value) {
		if (!isObj(obj) || typeof path !== 'string') {
			return;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			const p = pathArr[i];

			if (!isObj(obj[p])) {
				obj[p] = {};
			}

			if (i === pathArr.length - 1) {
				obj[p] = value;
			}

			obj = obj[p];
		}
	},

	delete(obj, path) {
		if (!isObj(obj) || typeof path !== 'string') {
			return;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			const p = pathArr[i];

			if (i === pathArr.length - 1) {
				delete obj[p];
				return;
			}

			obj = obj[p];

			if (!isObj(obj)) {
				return;
			}
		}
	},

	has(obj, path) {
		if (!isObj(obj) || typeof path !== 'string') {
			return false;
		}

		const pathArr = getPathSegments(path);

		for (let i = 0; i < pathArr.length; i++) {
			if (isObj(obj)) {
				if (!(pathArr[i] in obj)) {
					return false;
				}

				obj = obj[pathArr[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  //
  // Little nifty parsing hack, leverage the fact that RegExp.exec increments
  // the lastIndex property so we can continue executing this loop until we've
  // parsed all results.
  //
  for (;
    part = parser.exec(query);
    result[decodeURIComponent(part[1])] = decodeURIComponent(part[2])
  );

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = [];

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (var key in obj) {
    if (has.call(obj, key)) {
      pairs.push(encodeURIComponent(key) +'='+ encodeURIComponent(obj[key]));
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 }
  , URL;

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @api public
 */
module.exports = function lolcation(loc) {
  loc = loc || global.location || {};
  URL = URL || __webpack_require__(12);

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new URL(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new URL(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),
/* 43 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./history": 3,
	"./history.js": 3,
	"./hottest": 4,
	"./hottest.js": 4,
	"./setting": 5,
	"./setting.js": 5,
	"./statistics": 6,
	"./statistics.js": 6
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 44;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _upTo = __webpack_require__(0);

var _upTo2 = _interopRequireDefault(_upTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.onreadystatechange = function () {
  if ('interactive' === document.readyState) {
    var dom = function () {
      var dom = document.querySelector('div[role="search"]');

      if (!dom) {
        dom = (0, _upTo2.default)(document.querySelector('form[role="search"]'), 'div');
      }

      return (0, _upTo2.default)(dom, 'div');
    }();

    __webpack_require__(15)(dom);
    __webpack_require__(16)(dom);
    __webpack_require__(13)();
    __webpack_require__(14)();

    __webpack_require__(18)();
    __webpack_require__(17)();
    __webpack_require__(19)();
  }
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlParse = __webpack_require__(12);

var _urlParse2 = _interopRequireDefault(_urlParse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parsedUrls = {};

/**
 * Parse fbid from url.
 *
 * @returns string|null
 */
var fromUrl = function fromUrl(url) {
  if (parsedUrls.hasOwnProperty(url)) {
    return parsedUrls[url];
  }

  var parsed = (0, _urlParse2.default)(url, true);
  var query = parsed.query;
  var pathname = parsed.pathname.replace(/\/+$/, '');

  var result = void 0;

  if (pathname.endsWith(':3') || pathname.endsWith(':0')) {
    result = null;
  } else if (query.hasOwnProperty('story_fbid')) {
    result = query.story_fbid;
  } else if (query.hasOwnProperty('fbid')) {
    result = query.fbid;
  } else {
    result = pathname.slice(pathname.lastIndexOf('/') + 1);
  }

  parsedUrls[url] = result;

  return result;
};

/**
 * Parse fbid from given value.
 *
 * @returns string|null
 */

exports.default = function (val) {
  if (val.match(/(\b(https?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig)) {
    return fromUrl(val);
  }

  console.error('fbid unknown type: ' + val);

  return null;
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYTMwZjg2ZjM3MmI3NGMxNzI2YmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3VwLXRvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9oaXN0b3J5LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc2V0dGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zdGF0aXN0aWNzLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy9jb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwid2VicGFjazovLy8uL34vdXJsLXBhcnNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9tb2RhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9uYXZiYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvc2VhcmNoLWJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2J1dHRvbi1jbGljay5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZhY2Vib29rLXNlYXJjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL3VzZXItZmVlZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pbi1zY3JlZW4uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtcHVibGljLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXNwb25zb3JlZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYm9vbGVhbi9saWIvYm9vbGVhbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kb3QtcHJvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLW9iai9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5naWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVxdWlyZXMtcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3VybC1wYXJzZS9sb2xjYXRpb24uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyJdLCJuYW1lcyI6WyJlbCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBhcmVudE5vZGUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9tIiwicmVuZGVyIiwic2V0dGluZyIsInRhYmxlIiwidGl0bGUiLCJkZXNjcmlwdGlvbiIsImtleSIsInJlZHVjZSIsImh0bWwiLCJpdGVtIiwiZ2V0IiwiaW5uZXJIVE1MIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm5vZGUiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsImlkIiwidmFsdWUiLCJzZXQiLCJuIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTmFtZSIsInJlcGxhY2UiLCJzZXRUaW1lb3V0IiwiY2IiLCJwb3MiLCJpbmRleE9mIiwiayIsInNsaWNlIiwiY2hyb21lIiwic3RvcmFnZSIsImxvY2FsIiwiaXRlbXMiLCJoYXNPd25Qcm9wZXJ0eSIsInZhbCIsImluY2x1ZGVzIiwic3Vic3RyIiwiaWNvbk5vZGUiLCJpY29uIiwibmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmQiLCJzdHlsZSIsImRpc3BsYXkiLCJib2R5IiwiY2xvc2VFdmVudCIsIm9uY2xpY2siLCJpbm5lclRleHQiLCJkYXRhc2V0IiwidG9vbHRpcENvbnRlbnQiLCJtYXBwaW5nIiwibGFzdEluZGV4T2YiLCJyZXF1aXJlIiwic2VhcmNoIiwiZmJTZWFyY2hJbnB1dHMiLCJsZW5ndGgiLCJ3aW5kb3ciLCJmZWVkcyIsImxhc3RZIiwib25zY3JvbGwiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwiZmVlZCIsInJlbW92ZSIsImZiaWQiLCJocmVmIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJzY3JvbGxZIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNjcmVlbiIsInRvcCIsImJvdHRvbSIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsIm9mZnNldFRvcCIsImhlaWdodCIsInByaXZhY3kiLCJnZXRBdHRyaWJ1dGUiLCJpc1Nwb25zb3JlZCIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJwYXJzZWRVcmxzIiwiZnJvbVVybCIsInVybCIsInBhcnNlZCIsInF1ZXJ5IiwicmVzdWx0IiwiZW5kc1dpdGgi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TixDQUFxQixZQUFyQixDQUFKLEVBQXdDO0FBQzdDd0QsYUFBU0QsTUFBTUcsVUFBZjtBQUNELEdBRk0sTUFFQSxJQUFJSCxNQUFNdkQsY0FBTixDQUFxQixNQUFyQixDQUFKLEVBQWtDO0FBQ3ZDd0QsYUFBU0QsTUFBTXhCLElBQWY7QUFDRCxHQUZNLE1BRUE7QUFDTHlCLGFBQVM1QixTQUFTakMsS0FBVCxDQUFlaUMsU0FBU1YsV0FBVCxDQUFxQixHQUFyQixJQUE0QixDQUEzQyxDQUFUO0FBQ0Q7O0FBRURpQyxhQUFXRSxHQUFYLElBQWtCRyxNQUFsQjs7QUFFQSxTQUFPQSxNQUFQO0FBQ0QsQ0F4QkQ7O0FBMEJBOzs7Ozs7a0JBS2UsZUFBTztBQUNwQixNQUFJdkQsSUFBSTBELEtBQUosQ0FBVSxvRUFBVixDQUFKLEVBQXFGO0FBQ25GLFdBQU9QLFFBQVFuRCxHQUFSLENBQVA7QUFDRDs7QUFFRGlDLFVBQVEwQixLQUFSLHlCQUFvQzNELEdBQXBDOztBQUVBLFNBQU8sSUFBUDtBQUNELEMiLCJmaWxlIjoiY29udGVudC1zY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNDUpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGEzMGY4NmYzNzJiNzRjMTcyNmJiIiwiLyoqXG4gKiBGaW5kIGZpcnN0IGFuY2VzdG9yIG9mIGVsIHdpdGggdGFnTmFtZSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSBlbFxuICogQHBhcmFtIHRhZ05hbWVcbiAqIEByZXR1cm5zIHsqfVxuICpcbiAqIEByZWZlcmVuY2UgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjg1NzExNlxuICovXG5leHBvcnQgZGVmYXVsdCAoZWwsIHRhZ05hbWUpID0+IHtcbiAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXG4gIHdoaWxlIChlbCAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgZWwgPSBlbC5wYXJlbnROb2RlXG5cbiAgICBpZiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiBlbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXAtdG8uanMiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgLy9cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hpc3RvcnkuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgLy9cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QuanMiLCJpbXBvcnQgYm9vbGVhbiBmcm9tICdib29sZWFuJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi8uLi91dGlscy9jb25maWcnXG5pbXBvcnQgdXBUbyBmcm9tICcuLi8uLi8uLi91dGlscy91cC10bydcblxuY29uc3QgcmVuZGVyID0gKHNldHRpbmcpID0+IHtcbiAgY29uc3QgdGFibGUgPSBbXG4gICAgeyB0aXRsZTogJ+eyvumBuOWLleaFiycsIGRlc2NyaXB0aW9uOiAn5pa85YuV5oWL5pmC5aCx5LiK5bWM5YWl5oiR5YCR57K+6YG455qE54ax6ZaA5YuV5oWLJywga2V5OiAnZmVhdHVyZWQtZmVlZCcgfSxcbiAgICB7IHRpdGxlOiAn56e76Zmk5buj5ZGKJywgZGVzY3JpcHRpb246ICfmlrzli5XmhYvmmYLloLHkuIrnp7vpmaTngrrotIrliqnnmoTli5XmhYsnLCBrZXk6ICdyZW1vdmUtYWQnIH0sXG4gICAgeyB0aXRsZTogJ+WQjOatpeaQnOWwiycsIGRlc2NyaXB0aW9uOiAn5pa86IeJ5pu45pCc5bCL5pmC77yM5LiA5Lim5pa85oiR5YCR5bCI5bGs6LOH5paZ5bqr5Lit5pCc5bCLJywga2V5OiAnc3luYy1zZWFyY2gnIH1cbiAgXVxuXG4gIHJldHVybiB0YWJsZS5yZWR1Y2UoKGh0bWwsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaHRtbCArIGBcbjxkaXYgY2xhc3M9XCJzZXR0aW5nLXNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgPGI+JHtpdGVtLnRpdGxlfTwvYj5cbiAgPC9kaXY+XG4gIFxuICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICA8c3Bhbj4ke2l0ZW0uZGVzY3JpcHRpb259PC9zcGFuPlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJvcGVyYXRpb25cIj5cbiAgICA8c3BhbiBjbGFzcz1cInN1Y2Nlc3MtaWNvblwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgXG4gICAgPHNlbGVjdCBpZD1cIiR7aXRlbS5rZXl9XCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCI+T2ZmPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCIgJHtib29sZWFuKHNldHRpbmdbaXRlbS5rZXldKSA/ICdzZWxlY3RlZCcgOiAnJ30+T248L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG48L2Rpdj5gXG4gIH0sICcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgY29uZmlnLmdldCgnc2V0dGluZycsIChzZXR0aW5nKSA9PiB7XG4gICAgZG9tLmlubmVySFRNTCA9IHJlbmRlcihzZXR0aW5nKVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1tb2RhbCAuYm94IC5jb250ZW50IC5zZXR0aW5nLXNlY3Rpb24gLm9wZXJhdGlvbiBzZWxlY3QnKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgc2V0dGluZ1tlLnRhcmdldC5pZF0gPSBib29sZWFuKGUudGFyZ2V0LnZhbHVlKVxuXG4gICAgICAgIGNvbmZpZy5zZXQoJ3NldHRpbmcnLCBzZXR0aW5nLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbiA9IHVwVG8oZS50YXJnZXQsICdkaXYnKS5xdWVyeVNlbGVjdG9yKCdzcGFuJylcblxuICAgICAgICAgIG4uY2xhc3NOYW1lID0gbi5jbGFzc05hbWUucmVwbGFjZSgvID9hbmkvZywgJycpXG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbi5jbGFzc05hbWUgKz0gJyBhbmknIH0sIDEpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zZXR0aW5nLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoZG9tKSA9PiB7XG4gIC8vXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zdGF0aXN0aWNzLmpzIiwiaW1wb3J0IGRvdFByb3AgZnJvbSAnZG90LXByb3AnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEdldCBjb250ZW50IGZyb20gc3RvcmFnZSBhbmQgcGFzcyB0aGUgcmVzdWx0IHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSBjYlxuICAgKlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBnZXQgKGtleSwgY2IgPSBudWxsKSB7XG4gICAgaWYgKG51bGwgPT09IGNiKSB7XG4gICAgICBba2V5LCBjYl0gPSBbJycsIGtleV1cbiAgICB9XG5cbiAgICBjb25zdCBwb3MgPSBrZXkuaW5kZXhPZignLicpXG5cbiAgICBjb25zdCBrID0gKC0xICE9PSBwb3MgPyBrZXkuc2xpY2UoMCwgcG9zKSA6IGtleSkgfHwgbnVsbFxuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGssIGl0ZW1zID0+IHtcbiAgICAgIGlmIChudWxsICE9PSBrICYmIGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGl0ZW1zID0gaXRlbXNba11cblxuICAgICAgICBpZiAoLTEgIT09IHBvcykge1xuICAgICAgICAgIGl0ZW1zID0gZG90UHJvcC5nZXQoaXRlbXMsIGtleS5zbGljZShwb3MgKyAxKSwge30pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2IoaXRlbXMpXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogU3RvcmUgY29udGVudCB0byBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWxcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHNldCAoa2V5LCB2YWwsIGNiID0gbnVsbCkge1xuICAgIGlmICghIGtleS5pbmNsdWRlcygnLicpKSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5XTogdmFsIH0sIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3MgPSBrZXkuaW5kZXhPZignLicpXG5cbiAgICAgIHRoaXMuZ2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtID0+IHtcbiAgICAgICAgZG90UHJvcC5zZXQoaXRlbSwga2V5LnN1YnN0cihwb3MgKyAxKSwgdmFsKVxuXG4gICAgICAgIHRoaXMuc2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtLCBjYilcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvY29uZmlnLmpzIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBsb2xjYXRpb24gPSByZXF1aXJlKCcuL2xvbGNhdGlvbicpXG4gICwgcXMgPSByZXF1aXJlKCdxdWVyeXN0cmluZ2lmeScpXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHBhcnNlIHJ1bGVzIGZvciB0aGUgVVJMIHBhcnNlciwgaXQgaW5mb3JtcyB0aGUgcGFyc2VyXG4gKiBhYm91dDpcbiAqXG4gKiAwLiBUaGUgY2hhciBpdCBOZWVkcyB0byBwYXJzZSwgaWYgaXQncyBhIHN0cmluZyBpdCBzaG91bGQgYmUgZG9uZSB1c2luZ1xuICogICAgaW5kZXhPZiwgUmVnRXhwIHVzaW5nIGV4ZWMgYW5kIE5hTiBtZWFucyBzZXQgYXMgY3VycmVudCB2YWx1ZS5cbiAqIDEuIFRoZSBwcm9wZXJ0eSB3ZSBzaG91bGQgc2V0IHdoZW4gcGFyc2luZyB0aGlzIHZhbHVlLlxuICogMi4gSW5kaWNhdGlvbiBpZiBpdCdzIGJhY2t3YXJkcyBvciBmb3J3YXJkIHBhcnNpbmcsIHdoZW4gc2V0IGFzIG51bWJlciBpdCdzXG4gKiAgICB0aGUgdmFsdWUgb2YgZXh0cmEgY2hhcnMgdGhhdCBzaG91bGQgYmUgc3BsaXQgb2ZmLlxuICogMy4gSW5oZXJpdCBmcm9tIGxvY2F0aW9uIGlmIG5vbiBleGlzdGluZyBpbiB0aGUgcGFyc2VyLlxuICogNC4gYHRvTG93ZXJDYXNlYCB0aGUgcmVzdWx0aW5nIHZhbHVlLlxuICovXG52YXIgcnVsZXMgPSBbXG4gIFsnIycsICdoYXNoJ10sICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJz8nLCAncXVlcnknXSwgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKykkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcmV0dXJuIHtQcm90b2NvbEV4dHJhY3R9IEV4dHJhY3RlZCBpbmZvcm1hdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRyYWN0UHJvdG9jb2woYWRkcmVzcykge1xuICB2YXIgbWF0Y2ggPSBwcm90b2NvbHJlLmV4ZWMoYWRkcmVzcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm90b2NvbDogbWF0Y2hbMV0gPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogJycsXG4gICAgc2xhc2hlczogISFtYXRjaFsyXSxcbiAgICByZXN0OiBtYXRjaFszXVxuICB9O1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSByZWxhdGl2ZSBVUkwgcGF0aG5hbWUgYWdhaW5zdCBhIGJhc2UgVVJMIHBhdGhuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGl2ZSBQYXRobmFtZSBvZiB0aGUgcmVsYXRpdmUgVVJMLlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2UgUGF0aG5hbWUgb2YgdGhlIGJhc2UgVVJMLlxuICogQHJldHVybiB7U3RyaW5nfSBSZXNvbHZlZCBwYXRobmFtZS5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlKHJlbGF0aXZlLCBiYXNlKSB7XG4gIHZhciBwYXRoID0gKGJhc2UgfHwgJy8nKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5jb25jYXQocmVsYXRpdmUuc3BsaXQoJy8nKSlcbiAgICAsIGkgPSBwYXRoLmxlbmd0aFxuICAgICwgbGFzdCA9IHBhdGhbaSAtIDFdXG4gICAgLCB1bnNoaWZ0ID0gZmFsc2VcbiAgICAsIHVwID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHBhdGhbaV0gPT09ICcuJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXRoW2ldID09PSAnLi4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgaWYgKGkgPT09IDApIHVuc2hpZnQgPSB0cnVlO1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1bnNoaWZ0KSBwYXRoLnVuc2hpZnQoJycpO1xuICBpZiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHBhdGgucHVzaCgnJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbignLycpO1xufVxuXG4vKipcbiAqIFRoZSBhY3R1YWwgVVJMIGluc3RhbmNlLiBJbnN0ZWFkIG9mIHJldHVybmluZyBhbiBvYmplY3Qgd2UndmUgb3B0ZWQtaW4gdG9cbiAqIGNyZWF0ZSBhbiBhY3R1YWwgY29uc3RydWN0b3IgYXMgaXQncyBtdWNoIG1vcmUgbWVtb3J5IGVmZmljaWVudCBhbmRcbiAqIGZhc3RlciBhbmQgaXQgcGxlYXNlcyBteSBPQ0QuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jYXRpb24gTG9jYXRpb24gZGVmYXVsdHMgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBwYXJzZXIgUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVVJMKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFVSTCkpIHtcbiAgICByZXR1cm4gbmV3IFVSTChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKTtcbiAgfVxuXG4gIHZhciByZWxhdGl2ZSwgZXh0cmFjdGVkLCBwYXJzZSwgaW5zdHJ1Y3Rpb24sIGluZGV4LCBrZXlcbiAgICAsIGluc3RydWN0aW9ucyA9IHJ1bGVzLnNsaWNlKClcbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jYXRpb25cbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGkgPSAwO1xuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgaWYgc3RhdGVtZW50cyBhbGxvd3MgdGhpcyBtb2R1bGUgdHdvIGhhdmUgY29tcGF0aWJpbGl0eSB3aXRoXG4gIC8vIDIgZGlmZmVyZW50IEFQSTpcbiAgLy9cbiAgLy8gMS4gTm9kZS5qcydzIGB1cmwucGFyc2VgIGFwaSB3aGljaCBhY2NlcHRzIGEgVVJMLCBib29sZWFuIGFzIGFyZ3VtZW50c1xuICAvLyAgICB3aGVyZSB0aGUgYm9vbGVhbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcXVlcnkgc3RyaW5nIHNob3VsZCBhbHNvIGJlIHBhcnNlZC5cbiAgLy9cbiAgLy8gMi4gVGhlIGBVUkxgIGludGVyZmFjZSBvZiB0aGUgYnJvd3NlciB3aGljaCBhY2NlcHRzIGEgVVJMLCBvYmplY3QgYXNcbiAgLy8gICAgYXJndW1lbnRzLiBUaGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0IHZhbHVlcyAvIGZhbGwtYmFja1xuICAvLyAgICBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gIC8vXG4gIGlmICgnb2JqZWN0JyAhPT0gdHlwZSAmJiAnc3RyaW5nJyAhPT0gdHlwZSkge1xuICAgIHBhcnNlciA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJzZXIgJiYgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcnNlcikgcGFyc2VyID0gcXMucGFyc2U7XG5cbiAgbG9jYXRpb24gPSBsb2xjYXRpb24obG9jYXRpb24pO1xuXG4gIC8vXG4gIC8vIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gYmVmb3JlIHJ1bm5pbmcgdGhlIGluc3RydWN0aW9ucy5cbiAgLy9cbiAgZXh0cmFjdGVkID0gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MgfHwgJycpO1xuICByZWxhdGl2ZSA9ICFleHRyYWN0ZWQucHJvdG9jb2wgJiYgIWV4dHJhY3RlZC5zbGFzaGVzO1xuICB1cmwuc2xhc2hlcyA9IGV4dHJhY3RlZC5zbGFzaGVzIHx8IHJlbGF0aXZlICYmIGxvY2F0aW9uLnNsYXNoZXM7XG4gIHVybC5wcm90b2NvbCA9IGV4dHJhY3RlZC5wcm90b2NvbCB8fCBsb2NhdGlvbi5wcm90b2NvbCB8fCAnJztcbiAgYWRkcmVzcyA9IGV4dHJhY3RlZC5yZXN0O1xuXG4gIC8vXG4gIC8vIFdoZW4gdGhlIGF1dGhvcml0eSBjb21wb25lbnQgaXMgYWJzZW50IHRoZSBVUkwgc3RhcnRzIHdpdGggYSBwYXRoXG4gIC8vIGNvbXBvbmVudC5cbiAgLy9cbiAgaWYgKCFleHRyYWN0ZWQuc2xhc2hlcykgaW5zdHJ1Y3Rpb25zWzJdID0gWy8oLiopLywgJ3BhdGhuYW1lJ107XG5cbiAgZm9yICg7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcbiAgICBwYXJzZSA9IGluc3RydWN0aW9uWzBdO1xuICAgIGtleSA9IGluc3RydWN0aW9uWzFdO1xuXG4gICAgaWYgKHBhcnNlICE9PSBwYXJzZSkge1xuICAgICAgdXJsW2tleV0gPSBhZGRyZXNzO1xuICAgIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBwYXJzZSkge1xuICAgICAgaWYgKH4oaW5kZXggPSBhZGRyZXNzLmluZGV4T2YocGFyc2UpKSkge1xuICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBpbnN0cnVjdGlvblsyXSkge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoaW5kZXggKyBpbnN0cnVjdGlvblsyXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpbmRleCA9IHBhcnNlLmV4ZWMoYWRkcmVzcykpKSB7XG4gICAgICB1cmxba2V5XSA9IGluZGV4WzFdO1xuICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXguaW5kZXgpO1xuICAgIH1cblxuICAgIHVybFtrZXldID0gdXJsW2tleV0gfHwgKFxuICAgICAgcmVsYXRpdmUgJiYgaW5zdHJ1Y3Rpb25bM10gPyBsb2NhdGlvbltrZXldIHx8ICcnIDogJydcbiAgICApO1xuXG4gICAgLy9cbiAgICAvLyBIb3N0bmFtZSwgaG9zdCBhbmQgcHJvdG9jb2wgc2hvdWxkIGJlIGxvd2VyY2FzZWQgc28gdGhleSBjYW4gYmUgdXNlZCB0b1xuICAgIC8vIGNyZWF0ZSBhIHByb3BlciBgb3JpZ2luYC5cbiAgICAvL1xuICAgIGlmIChpbnN0cnVjdGlvbls0XSkgdXJsW2tleV0gPSB1cmxba2V5XS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLy9cbiAgLy8gQWxzbyBwYXJzZSB0aGUgc3VwcGxpZWQgcXVlcnkgc3RyaW5nIGluIHRvIGFuIG9iamVjdC4gSWYgd2UncmUgc3VwcGxpZWRcbiAgLy8gd2l0aCBhIGN1c3RvbSBwYXJzZXIgYXMgZnVuY3Rpb24gdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBidWlsZC1pblxuICAvLyBwYXJzZXIuXG4gIC8vXG4gIGlmIChwYXJzZXIpIHVybC5xdWVyeSA9IHBhcnNlcih1cmwucXVlcnkpO1xuXG4gIC8vXG4gIC8vIElmIHRoZSBVUkwgaXMgcmVsYXRpdmUsIHJlc29sdmUgdGhlIHBhdGhuYW1lIGFnYWluc3QgdGhlIGJhc2UgVVJMLlxuICAvL1xuICBpZiAoXG4gICAgICByZWxhdGl2ZVxuICAgICYmIGxvY2F0aW9uLnNsYXNoZXNcbiAgICAmJiB1cmwucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLydcbiAgICAmJiAodXJsLnBhdGhuYW1lICE9PSAnJyB8fCBsb2NhdGlvbi5wYXRobmFtZSAhPT0gJycpXG4gICkge1xuICAgIHVybC5wYXRobmFtZSA9IHJlc29sdmUodXJsLnBhdGhuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICAvL1xuICAvLyBXZSBzaG91bGQgbm90IGFkZCBwb3J0IG51bWJlcnMgaWYgdGhleSBhcmUgYWxyZWFkeSB0aGUgZGVmYXVsdCBwb3J0IG51bWJlclxuICAvLyBmb3IgYSBnaXZlbiBwcm90b2NvbC4gQXMgdGhlIGhvc3QgYWxzbyBjb250YWlucyB0aGUgcG9ydCBudW1iZXIgd2UncmUgZ29pbmdcbiAgLy8gb3ZlcnJpZGUgaXQgd2l0aCB0aGUgaG9zdG5hbWUgd2hpY2ggY29udGFpbnMgbm8gcG9ydCBudW1iZXIuXG4gIC8vXG4gIGlmICghcmVxdWlyZWQodXJsLnBvcnQsIHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICB1cmwucG9ydCA9ICcnO1xuICB9XG5cbiAgLy9cbiAgLy8gUGFyc2UgZG93biB0aGUgYGF1dGhgIGZvciB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAvL1xuICB1cmwudXNlcm5hbWUgPSB1cmwucGFzc3dvcmQgPSAnJztcbiAgaWYgKHVybC5hdXRoKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSB1cmwuYXV0aC5zcGxpdCgnOicpO1xuICAgIHVybC51c2VybmFtZSA9IGluc3RydWN0aW9uWzBdIHx8ICcnO1xuICAgIHVybC5wYXNzd29yZCA9IGluc3RydWN0aW9uWzFdIHx8ICcnO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICAvL1xuICAvLyBUaGUgaHJlZiBpcyBqdXN0IHRoZSBjb21waWxlZCByZXN1bHQuXG4gIC8vXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNoYW5naW5nIHByb3BlcnRpZXMgaW4gdGhlIFVSTCBpbnN0YW5jZSB0b1xuICogaW5zdXJlIHRoYXQgdGhleSBhbGwgcHJvcGFnYXRlIGNvcnJlY3RseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFydCAgICAgICAgICBQcm9wZXJ0eSB3ZSBuZWVkIHRvIGFkanVzdC5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlICAgICAgICAgIFRoZSBuZXdseSBhc3NpZ25lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gZm4gIFdoZW4gc2V0dGluZyB0aGUgcXVlcnksIGl0IHdpbGwgYmUgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIHRvIHBhcnNlIHRoZSBxdWVyeS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gc2V0dGluZyB0aGUgcHJvdG9jb2wsIGRvdWJsZSBzbGFzaCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGZpbmFsIHVybCBpZiBpdCBpcyB0cnVlLlxuICogQHJldHVybnMge1VSTH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICgvOlxcZCskLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHVybC5wb3J0ID0gdmFsdWUucG9wKCk7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlO1xuICAgICAgICB1cmwucG9ydCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3Byb3RvY29sJzpcbiAgICAgIHVybC5wcm90b2NvbCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB1cmwuc2xhc2hlcyA9ICFmbjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aG5hbWUnOlxuICAgICAgdXJsLnBhdGhuYW1lID0gdmFsdWUubGVuZ3RoICYmIHZhbHVlLmNoYXJBdCgwKSAhPT0gJy8nID8gJy8nICsgdmFsdWUgOiB2YWx1ZTtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlucyA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGluc1s0XSkgdXJsW2luc1sxXV0gPSB1cmxbaW5zWzFdXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xuXG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgcHJvcGVydGllcyBiYWNrIGluIHRvIGEgdmFsaWQgYW5kIGZ1bGwgVVJMIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmdpZnkgT3B0aW9uYWwgcXVlcnkgc3RyaW5naWZ5IGZ1bmN0aW9uLlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHN0cmluZ2lmeSkge1xuICBpZiAoIXN0cmluZ2lmeSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygc3RyaW5naWZ5KSBzdHJpbmdpZnkgPSBxcy5zdHJpbmdpZnk7XG5cbiAgdmFyIHF1ZXJ5XG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBwcm90b2NvbCA9IHVybC5wcm90b2NvbDtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuY2hhckF0KHByb3RvY29sLmxlbmd0aCAtIDEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICB2YXIgcmVzdWx0ID0gcHJvdG9jb2wgKyAodXJsLnNsYXNoZXMgPyAnLy8nIDogJycpO1xuXG4gIGlmICh1cmwudXNlcm5hbWUpIHtcbiAgICByZXN1bHQgKz0gdXJsLnVzZXJuYW1lO1xuICAgIGlmICh1cmwucGFzc3dvcmQpIHJlc3VsdCArPSAnOicrIHVybC5wYXNzd29yZDtcbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9XG5cbiAgcmVzdWx0ICs9IHVybC5ob3N0ICsgdXJsLnBhdGhuYW1lO1xuXG4gIHF1ZXJ5ID0gJ29iamVjdCcgPT09IHR5cGVvZiB1cmwucXVlcnkgPyBzdHJpbmdpZnkodXJsLnF1ZXJ5KSA6IHVybC5xdWVyeTtcbiAgaWYgKHF1ZXJ5KSByZXN1bHQgKz0gJz8nICE9PSBxdWVyeS5jaGFyQXQoMCkgPyAnPycrIHF1ZXJ5IDogcXVlcnk7XG5cbiAgaWYgKHVybC5oYXNoKSByZXN1bHQgKz0gdXJsLmhhc2g7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVVJMLnByb3RvdHlwZSA9IHsgc2V0OiBzZXQsIHRvU3RyaW5nOiB0b1N0cmluZyB9O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBVUkwgcGFyc2VyIGFuZCBzb21lIGFkZGl0aW9uYWwgcHJvcGVydGllcyB0aGF0IG1pZ2h0IGJlIHVzZWZ1bCBmb3Jcbi8vIG90aGVycyBvciB0ZXN0aW5nLlxuLy9cblVSTC5leHRyYWN0UHJvdG9jb2wgPSBleHRyYWN0UHJvdG9jb2w7XG5VUkwubG9jYXRpb24gPSBsb2xjYXRpb247XG5VUkwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVUkw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLXBhcnNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdXBUbyBmcm9tICcuLi8uLi91dGlscy91cC10bydcblxuLyoqXG4gKiBDcmVhdGUgYSBmb250IGF3ZXNvbWUgaWNvbiBub2RlLlxuICpcbiAqIEBwYXJhbSBpY29uXG4gKiBAcGFyYW0gbmFtZVxuICpcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5mdW5jdGlvbiBpY29uTm9kZSAoaWNvbiwgbmFtZSkge1xuICByZXR1cm4gYDxpIGNsYXNzPVwiZmEgZmEtZncgZmEtJHtpY29ufVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaG92ZXI9XCJ0b29sdGlwXCIgZGF0YS10b29sdGlwLWRlbGF5PVwiMzUwXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCIke25hbWV9XCI+PC9pPmBcbn1cblxuLyoqXG4gKiBBZGQgYnV0dG9ucyBpbiB0aGUgcmlnaHQgb2Ygc2VhcmNoIGJhci5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tYnV0dG9uJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbiR7aWNvbk5vZGUoJ2ZpcmUnLCAn54ax6ZaA57KJ5bCIJyl9XG4ke2ljb25Ob2RlKCdiYXItY2hhcnQnLCAn5YCL5Lq657Wx6KiIJyl9XG4ke2ljb25Ob2RlKCdoaXN0b3J5JywgJ+att+WPsuWbnumhpycpfVxuJHtpY29uTm9kZSgnY29nJywgJ+ioreWumicpfWBcblxuICB1cFRvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jdXN0b20tc2VhcmNoLWJhcicpLCAnZGl2JykuYXBwZW5kKG5vZGUpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9idXR0b24uanMiLCIvKipcbiAqIEFkZCBtb2RhbC5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tbW9kYWwnXG4gIG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbjxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJib3hcIj5cbiAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDogMXJlbTtcIj5cbiAgICAgIDxiIGlkPVwiY3VzdG9tLW1vZGFsLXRpdGxlXCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCI+PC9iPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1idXR0b25cIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGcgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cbjwvZGl2PmBcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChub2RlKVxuXG4gIGNvbnN0IGNsb3NlRXZlbnQgPSAoKSA9PiB7XG4gICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5iYWNrZ3JvdW5kJykub25jbGljayA9IGNsb3NlRXZlbnRcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuY2xvc2UtYnV0dG9uIGknKS5vbmNsaWNrID0gY2xvc2VFdmVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbW9kYWwuanMiLCIvKipcbiAqIEFkZCBjbGFzcyB0byBmYWNlYm9vayBuYXZiYXIuXG4gKlxuICogQHBhcmFtIGRvbVxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkb20gPT4ge1xuICBkb20uY2xhc3NOYW1lICs9ICcgY3VzdG9tLW5hdmJhcidcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL25hdmJhci5qcyIsIi8qKlxuICogQWRkIHNlYXJjaCBiYXIgaW4gdGhlIHJpZ2h0IG9mIGZhY2Vib29rIHNlYXJjaCBiYXIuXG4gKlxuICogQHBhcmFtIGRvbVxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkb20gPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tc2VhcmNoLWJhcidcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG48Zm9ybT5cbiAgPGRpdj5cbiAgICA8aW5wdXQgaWQ9XCJjdXN0b20tc2VhcmNoLWlucHV0XCIgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlNlYXJjaCBEQlwiPlxuICA8L2Rpdj5cbjwvZm9ybT5gXG5cbiAgZG9tLmFwcGVuZChub2RlKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvc2VhcmNoLWJhci5qcyIsIm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLWJ1dHRvbiBpJykuZm9yRWFjaChub2RlID0+IHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsJykuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b20tbW9kYWwtdGl0bGUnKS5pbm5lclRleHQgPSBlLnRhcmdldC5kYXRhc2V0LnRvb2x0aXBDb250ZW50XG5cbiAgICAgIGNvbnN0IG1hcHBpbmcgPSB7XG4gICAgICAgICdmaXJlJzogJ2hvdHRlc3QnLFxuICAgICAgICAnYmFyLWNoYXJ0JzogJ3N0YXRpc3RpY3MnLFxuICAgICAgICAnaGlzdG9yeSc6ICdoaXN0b3J5JyxcbiAgICAgICAgJ2NvZyc6ICdzZXR0aW5nJ1xuICAgICAgfVxuXG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZVxuXG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIobmFtZS5sYXN0SW5kZXhPZignZmEtJykgKyAzKVxuXG4gICAgICByZXF1aXJlKCcuL21vZGFscy8nICsgbWFwcGluZ1tuYW1lXSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuYm94IC5jb250ZW50JykpXG4gICAgfSlcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvYnV0dG9uLWNsaWNrLmpzIiwiLyoqXG4gKiBMaXN0ZW4gZm9yIGZhY2Vib29rIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbmNvbnN0IHNlYXJjaCA9ICgpID0+IHtcbiAgY29uc3QgZmJTZWFyY2hJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFtuYW1lPVwicVwiXScpXG5cbiAgaWYgKDIgPiBmYlNlYXJjaElucHV0cy5sZW5ndGggJiYgISBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcScpKSB7XG4gICAgd2luZG93LnNldFRpbWVvdXQoc2VhcmNoLCAxMDAwKVxuICB9IGVsc2Uge1xuICAgIGZiU2VhcmNoSW5wdXRzLml0ZW0oZmJTZWFyY2hJbnB1dHMubGVuZ3RoIC0gMSkuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1zZWFyY2gtaW5wdXQnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlXG4gICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNlYXJjaFxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2guanMiLCJpbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZydcbmltcG9ydCBwYXJzZUZiaWQgZnJvbSAnLi9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZCdcbmltcG9ydCBpblNjcmVlbiBmcm9tICcuL2ZlZWQtaGVscGVycy9pbi1zY3JlZW4nXG5pbXBvcnQgaXNQdWJsaWMgZnJvbSAnLi9mZWVkLWhlbHBlcnMvaXMtcHVibGljJ1xuaW1wb3J0IGlzU3BvbnNvcmVkIGZyb20gJy4vZmVlZC1oZWxwZXJzL2lzLXNwb25zb3JlZCdcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IGZlZWRzID0gW11cblxuICBsZXQgbGFzdFkgPSAwXG5cbiAgd2luZG93Lm9uc2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICgnLycgIT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbGFzdFkgPSAwXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltpZF49XCJoeXBlcmZlZWRfc3RvcnlfaWRcIl0nKS5mb3JFYWNoKGZlZWQgPT4ge1xuICAgICAgaWYgKGlzU3BvbnNvcmVkKGZlZWQpKSB7XG4gICAgICAgIHJldHVybiBjb25maWcuZ2V0KCdzZXR0aW5nLnJlbW92ZS1hZCcsIHJlbW92ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlbW92ZSAmJiBmZWVkLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGlzUHVibGljKGZlZWQpKSB7XG4gICAgICAgIGNvbnN0IGZiaWQgPSBwYXJzZUZiaWQoZmVlZC5xdWVyeVNlbGVjdG9yKCdkaXYgc3BhbiBzcGFuIGE6bm90KFtkYXRhLWhvdmVyY2FyZC1wcmVmZXItbW9yZS1jb250ZW50LXNob3ddKScpLmhyZWYpXG5cbiAgICAgICAgaWYgKGZiaWQpIHtcbiAgICAgICAgICBpZiAoISBmZWVkcy5pbmNsdWRlcyhmYmlkKSkge1xuICAgICAgICAgICAgZmVlZHMucHVzaChmYmlkKVxuXG4gICAgICAgICAgICBjb25maWcuc2V0KCdmZWVkcycsIGZlZWRzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpblNjcmVlbihmZWVkKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMCA+IHdpbmRvdy5zY3JvbGxZIC0gbGFzdFkgPyAnYmFjaycgOiAnJywgZmJpZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGFzdFkgPSB3aW5kb3cuc2Nyb2xsWVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL3VzZXItZmVlZC5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIGluIHNjcmVlbiBvciBub3QuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBjb25zdCByZWN0ID0gZmVlZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIGNvbnN0IHNjcmVlbiA9IHtcbiAgICB0b3A6IHdpbmRvdy5zY3JvbGxZLFxuICAgIGJvdHRvbTogd2luZG93LnNjcm9sbFkgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cblxuICBjb25zdCBlbCA9IHtcbiAgICB0b3A6IGZlZWQub2Zmc2V0VG9wICsgcmVjdC5oZWlnaHQgLyAzLFxuICAgIGJvdHRvbTogZmVlZC5vZmZzZXRUb3AgKyByZWN0LmhlaWdodCAvIDMgKiAyXG4gIH1cblxuICBpZiAoZWwudG9wID4gc2NyZWVuLnRvcCAmJiBlbC50b3AgPCBzY3JlZW4uYm90dG9tKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChlbC5ib3R0b20gPiBzY3JlZW4udG9wICYmIGVsLmJvdHRvbSA8IHNjcmVlbi5ib3R0b20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pbi1zY3JlZW4uanMiLCIvKipcbiAqIERldGVybWluZSB0aGUgZmVlZCBpcyBwdWJsaWMgb3Igbm90LlxuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGZlZWQpID0+IHtcbiAgbGV0IHByaXZhY3kgPSBmZWVkLnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1ob3Zlcj1cInRvb2x0aXBcIl1bY2xhc3MqPVwiUHJpdmFjeVwiXSwgZGl2W2RhdGEtaG92ZXI9XCJ0b29sdGlwXCJdJylcblxuICBpZiAoISBwcml2YWN5KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwcml2YWN5ID0gcHJpdmFjeS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC1jb250ZW50JylcblxuICByZXR1cm4gcHJpdmFjeS5pbmNsdWRlcygnUHVibGljJykgfHwgcHJpdmFjeS5pbmNsdWRlcygn5YWs6ZaLJylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXB1YmxpYy5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIHNwb25zb3JlZCBvciBub3QuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBjb25zdCBpc1Nwb25zb3JlZCA9IGZlZWQucXVlcnlTZWxlY3RvcignYVtocmVmXj1cImh0dHBzOi8vbC5mYWNlYm9vay5jb20vbC5waHBcIl0nKVxuXG4gIGlmICghIGlzU3BvbnNvcmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzd2l0Y2ggKGlzU3BvbnNvcmVkLmlubmVyVGV4dCkge1xuICAgIGNhc2UgJ1Nwb25zb3JlZCc6XG4gICAgY2FzZSAn6LSK5YqpJzpcbiAgICBjYXNlICfluoPlkYonOlxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJvb2xlYW4gPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gL14odHJ1ZXx0fHllc3x5fDEpJC9pLnRlc3QodmFsdWUudHJpbSgpKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAxO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBib29sZWFuO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2Jvb2xlYW4vbGliL2Jvb2xlYW4uanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgaXNPYmogPSByZXF1aXJlKCdpcy1vYmonKTtcblxuZnVuY3Rpb24gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpIHtcblx0Y29uc3QgcGF0aEFyciA9IHBhdGguc3BsaXQoJy4nKTtcblx0Y29uc3QgcGFydHMgPSBbXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgcCA9IHBhdGhBcnJbaV07XG5cblx0XHR3aGlsZSAocFtwLmxlbmd0aCAtIDFdID09PSAnXFxcXCcgJiYgcGF0aEFycltpICsgMV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cCA9IHAuc2xpY2UoMCwgLTEpICsgJy4nO1xuXHRcdFx0cCArPSBwYXRoQXJyWysraV07XG5cdFx0fVxuXG5cdFx0cGFydHMucHVzaChwKTtcblx0fVxuXG5cdHJldHVybiBwYXJ0cztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGdldChvYmosIHBhdGgsIHZhbHVlKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyBvYmogOiB2YWx1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHBhdGhBcnJbaV0pKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BhdGhBcnJbaV1dO1xuXG5cdFx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdC8vIGBvYmpgIGlzIGVpdGhlciBgdW5kZWZpbmVkYCBvciBgbnVsbGAgc28gd2Ugd2FudCB0byBzdG9wIHRoZSBsb29wLCBhbmRcblx0XHRcdFx0Ly8gaWYgdGhpcyBpcyBub3QgdGhlIGxhc3QgYml0IG9mIHRoZSBwYXRoLCBhbmRcblx0XHRcdFx0Ly8gaWYgaXQgZGlkJ3QgcmV0dXJuIGB1bmRlZmluZWRgXG5cdFx0XHRcdC8vIGl0IHdvdWxkIHJldHVybiBgbnVsbGAgaWYgYG9iamAgaXMgYG51bGxgXG5cdFx0XHRcdC8vIGJ1dCB3ZSB3YW50IGBnZXQoe2ZvbzogbnVsbH0sICdmb28uYmFyJylgIHRvIGVxdWFsIGB1bmRlZmluZWRgLCBvciB0aGUgc3VwcGxpZWQgdmFsdWUsIG5vdCBgbnVsbGBcblx0XHRcdFx0aWYgKGkgIT09IHBhdGhBcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0c2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcCA9IHBhdGhBcnJbaV07XG5cblx0XHRcdGlmICghaXNPYmoob2JqW3BdKSkge1xuXHRcdFx0XHRvYmpbcF0gPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGkgPT09IHBhdGhBcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRvYmpbcF0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BdO1xuXHRcdH1cblx0fSxcblxuXHRkZWxldGUob2JqLCBwYXRoKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHAgPSBwYXRoQXJyW2ldO1xuXG5cdFx0XHRpZiAoaSA9PT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGRlbGV0ZSBvYmpbcF07XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BdO1xuXG5cdFx0XHRpZiAoIWlzT2JqKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRoYXMob2JqLCBwYXRoKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChpc09iaihvYmopKSB7XG5cdFx0XHRcdGlmICghKHBhdGhBcnJbaV0gaW4gb2JqKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG9iaiA9IG9ialtwYXRoQXJyW2ldXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kb3QtcHJvcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCkge1xuXHR2YXIgdHlwZSA9IHR5cGVvZiB4O1xuXHRyZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzLW9iai9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBTaW1wbGUgcXVlcnkgc3RyaW5nIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIHBhcnNlZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZyhxdWVyeSkge1xuICB2YXIgcGFyc2VyID0gLyhbXj0/Jl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICAvL1xuICAvLyBMaXR0bGUgbmlmdHkgcGFyc2luZyBoYWNrLCBsZXZlcmFnZSB0aGUgZmFjdCB0aGF0IFJlZ0V4cC5leGVjIGluY3JlbWVudHNcbiAgLy8gdGhlIGxhc3RJbmRleCBwcm9wZXJ0eSBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW5nIHRoaXMgbG9vcCB1bnRpbCB3ZSd2ZVxuICAvLyBwYXJzZWQgYWxsIHJlc3VsdHMuXG4gIC8vXG4gIGZvciAoO1xuICAgIHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSk7XG4gICAgcmVzdWx0W2RlY29kZVVSSUNvbXBvbmVudChwYXJ0WzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydFsyXSlcbiAgKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW107XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyc9JysgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZ2lmeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlJ3JlIHJlcXVpcmVkIHRvIGFkZCBhIHBvcnQgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkZWZhdWx0LXBvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gcG9ydCBQb3J0IG51bWJlciB3ZSBuZWVkIHRvIGNoZWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgd2UgbmVlZCB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGl0IGEgZGVmYXVsdCBwb3J0IGZvciB0aGUgZ2l2ZW4gcHJvdG9jb2xcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcXVpcmVkKHBvcnQsIHByb3RvY29sKSB7XG4gIHByb3RvY29sID0gcHJvdG9jb2wuc3BsaXQoJzonKVswXTtcbiAgcG9ydCA9ICtwb3J0O1xuXG4gIGlmICghcG9ydCkgcmV0dXJuIGZhbHNlO1xuXG4gIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwJzpcbiAgICBjYXNlICd3cyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDgwO1xuXG4gICAgY2FzZSAnaHR0cHMnOlxuICAgIGNhc2UgJ3dzcyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDQ0MztcblxuICAgIGNhc2UgJ2Z0cCc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDIxO1xuXG4gICAgY2FzZSAnZ29waGVyJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNzA7XG5cbiAgICBjYXNlICdmaWxlJzpcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcG9ydCAhPT0gMDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVxdWlyZXMtcG9ydC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xhc2hlcyA9IC9eW0EtWmEtel1bQS1aYS16MC05Ky0uXSo6XFwvXFwvLztcblxuLyoqXG4gKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBub3QgYmUgY29waWVkIG9yIGluaGVyaXRlZCBmcm9tLiBUaGlzIGlzIG9ubHkgbmVlZGVkXG4gKiBmb3IgYWxsIG5vbiBibG9iIFVSTCdzIGFzIGEgYmxvYiBVUkwgZG9lcyBub3QgaW5jbHVkZSBhIGhhc2gsIG9ubHkgdGhlXG4gKiBvcmlnaW4uXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpZ25vcmUgPSB7IGhhc2g6IDEsIHF1ZXJ5OiAxIH1cbiAgLCBVUkw7XG5cbi8qKlxuICogVGhlIGxvY2F0aW9uIG9iamVjdCBkaWZmZXJzIHdoZW4geW91ciBjb2RlIGlzIGxvYWRlZCB0aHJvdWdoIGEgbm9ybWFsIHBhZ2UsXG4gKiBXb3JrZXIgb3IgdGhyb3VnaCBhIHdvcmtlciB1c2luZyBhIGJsb2IuIEFuZCB3aXRoIHRoZSBibG9iYmxlIGJlZ2lucyB0aGVcbiAqIHRyb3VibGUgYXMgdGhlIGxvY2F0aW9uIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIFVSTCBvZiB0aGUgYmxvYiwgbm90IHRoZVxuICogbG9jYXRpb24gb2YgdGhlIHBhZ2Ugd2hlcmUgb3VyIGNvZGUgaXMgbG9hZGVkIGluLiBUaGUgYWN0dWFsIG9yaWdpbiBpc1xuICogZW5jb2RlZCBpbiB0aGUgYHBhdGhuYW1lYCBzbyB3ZSBjYW4gdGhhbmtmdWxseSBnZW5lcmF0ZSBhIGdvb2QgXCJkZWZhdWx0XCJcbiAqIGxvY2F0aW9uIGZyb20gaXQgc28gd2UgY2FuIGdlbmVyYXRlIHByb3BlciByZWxhdGl2ZSBVUkwncyBhZ2Fpbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGxvYyBPcHRpb25hbCBkZWZhdWx0IGxvY2F0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvbGNhdGlvbiBvYmplY3QuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvbGNhdGlvbihsb2MpIHtcbiAgbG9jID0gbG9jIHx8IGdsb2JhbC5sb2NhdGlvbiB8fCB7fTtcbiAgVVJMID0gVVJMIHx8IHJlcXVpcmUoJy4vJyk7XG5cbiAgdmFyIGZpbmFsZGVzdGluYXRpb24gPSB7fVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NcbiAgICAsIGtleTtcblxuICBpZiAoJ2Jsb2I6JyA9PT0gbG9jLnByb3RvY29sKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVUkwodW5lc2NhcGUobG9jLnBhdGhuYW1lKSwge30pO1xuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVUkwobG9jLCB7fSk7XG4gICAgZm9yIChrZXkgaW4gaWdub3JlKSBkZWxldGUgZmluYWxkZXN0aW5hdGlvbltrZXldO1xuICB9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlKSB7XG4gICAgZm9yIChrZXkgaW4gbG9jKSB7XG4gICAgICBpZiAoa2V5IGluIGlnbm9yZSkgY29udGludWU7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uW2tleV0gPSBsb2Nba2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9IHNsYXNoZXMudGVzdChsb2MuaHJlZik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbmFsZGVzdGluYXRpb247XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3VybC1wYXJzZS9sb2xjYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2hpc3RvcnlcIjogMyxcblx0XCIuL2hpc3RvcnkuanNcIjogMyxcblx0XCIuL2hvdHRlc3RcIjogNCxcblx0XCIuL2hvdHRlc3QuanNcIjogNCxcblx0XCIuL3NldHRpbmdcIjogNSxcblx0XCIuL3NldHRpbmcuanNcIjogNSxcblx0XCIuL3N0YXRpc3RpY3NcIjogNixcblx0XCIuL3N0YXRpc3RpY3MuanNcIjogNlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNDQ7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB1cFRvIGZyb20gJy4uL3V0aWxzL3VwLXRvJ1xuXG5kb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gIGlmICgnaW50ZXJhY3RpdmUnID09PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgY29uc3QgZG9tID0gKCgpID0+IHtcbiAgICAgIGxldCBkb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cInNlYXJjaFwiXScpXG5cbiAgICAgIGlmICghIGRvbSkge1xuICAgICAgICBkb20gPSB1cFRvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bcm9sZT1cInNlYXJjaFwiXScpLCAnZGl2JylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwVG8oZG9tLCAnZGl2JylcbiAgICB9KSgpXG5cbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9uYXZiYXInKShkb20pXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvc2VhcmNoLWJhcicpKGRvbSlcbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9idXR0b24nKSgpXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvbW9kYWwnKSgpXG5cbiAgICByZXF1aXJlKCcuL21vbml0b3JzL2ZhY2Vib29rLXNlYXJjaCcpKClcbiAgICByZXF1aXJlKCcuL21vbml0b3JzL2J1dHRvbi1jbGljaycpKClcbiAgICByZXF1aXJlKCcuL21vbml0b3JzL3VzZXItZmVlZCcpKClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbmRleC5qcyIsImltcG9ydCB1cmxQYXJzZSBmcm9tICd1cmwtcGFyc2UnXG5cbmNvbnN0IHBhcnNlZFVybHMgPSB7fVxuXG4vKipcbiAqIFBhcnNlIGZiaWQgZnJvbSB1cmwuXG4gKlxuICogQHJldHVybnMgc3RyaW5nfG51bGxcbiAqL1xuY29uc3QgZnJvbVVybCA9IHVybCA9PiB7XG4gIGlmIChwYXJzZWRVcmxzLmhhc093blByb3BlcnR5KHVybCkpIHtcbiAgICByZXR1cm4gcGFyc2VkVXJsc1t1cmxdXG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB1cmxQYXJzZSh1cmwsIHRydWUpXG4gIGNvbnN0IHF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5XG4gIGNvbnN0IHBhdGhuYW1lID0gcGFyc2VkLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyskLywgJycpXG5cbiAgbGV0IHJlc3VsdFxuXG4gIGlmIChwYXRobmFtZS5lbmRzV2l0aCgnOjMnKSB8fCBwYXRobmFtZS5lbmRzV2l0aCgnOjAnKSkge1xuICAgIHJlc3VsdCA9IG51bGxcbiAgfSBlbHNlIGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eSgnc3RvcnlfZmJpZCcpKSB7XG4gICAgcmVzdWx0ID0gcXVlcnkuc3RvcnlfZmJpZFxuICB9IGVsc2UgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KCdmYmlkJykpIHtcbiAgICByZXN1bHQgPSBxdWVyeS5mYmlkXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gcGF0aG5hbWUuc2xpY2UocGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpXG4gIH1cblxuICBwYXJzZWRVcmxzW3VybF0gPSByZXN1bHRcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogUGFyc2UgZmJpZCBmcm9tIGdpdmVuIHZhbHVlLlxuICpcbiAqIEByZXR1cm5zIHN0cmluZ3xudWxsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHZhbCA9PiB7XG4gIGlmICh2YWwubWF0Y2goLyhcXGIoaHR0cHM/KTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZykpIHtcbiAgICByZXR1cm4gZnJvbVVybCh2YWwpXG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBmYmlkIHVua25vd24gdHlwZTogJHt2YWx9YClcblxuICByZXR1cm4gbnVsbFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyJdLCJzb3VyY2VSb290IjoiIn0=