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
/******/ 	return __webpack_require__(__webpack_require__.s = 50);
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
module.exports = !__webpack_require__(12)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(16);

exports.default = {
  status: {
    loading: false,
    page: 1
  },

  /**
   * Load hottest posts.
   *
   * @param cb
   *
   * @return void
   */
  load: function load() {
    var _this = this;

    var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (this.status.loading) {
      return;
    }

    this.status.loading = true;

    document.querySelector('.hottest-section div i.loading').style.display = '';

    fetch('https://www.cs.ccu.edu.tw/~cys102u/api.php?page=' + this.status.page).then(function (response) {
      response.json().then(function (data) {
        var postsDom = document.querySelector('.hottest-section .posts');

        postsDom.insertAdjacentHTML('beforeend', _this.render(data.result.recs));
        postsDom.querySelectorAll('div.fb-post.fb_iframe_widget').forEach(function (node) {
          node.className = '';
        });

        if (null !== cb) {
          cb(data);
        }

        window.postMessage({ type: 'embed-posts' }, '*');

        document.querySelector('.hottest-section div i.loading').style.display = 'none';

        _this.status.loading = false;
      });

      ++_this.status.page;
    });
  },


  /**
   * Render hottest posts html.
   *
   * @param recs
   *
   * @return string
   */
  render: function render(recs) {
    return recs.reduce(function (html, feed) {
      return html + ('<div class="fb-post" data-href="' + feed.rec.url + '" data-width="350"></div>');
    }, '');
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(31);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _dotProp = __webpack_require__(43);

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
/* 4 */
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
/* 5 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(16);

exports.default = function (keyword) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

  fetch('https://www.cs.ccu.edu.tw/~cys102u/api.php?type=search&keyword=' + keyword + '&page=' + page).then(function (response) {
    response.json().then(function (data) {
      var resultDom = document.querySelector('div.custom-search-bar .result');

      resultDom.querySelector('ul').innerHTML = data.result.recs.reduce(function (acc, rec) {
        rec = rec.rec;

        var content = rec.description || rec.body || rec.page_name;

        return acc + '<li><a href="' + rec.url + '">' + content.substr(0, 30) + '</a></li>';
      }, '');

      resultDom.style.display = 'block';
    });
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (dom) {
  //
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _posts = __webpack_require__(2);

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (dom) {
  dom.innerHTML = '\n<div class="hottest-section">\n  <div style="margin-left: 1.5rem; margin-top: 1rem;">\n    <h1 style="display: inline;">\u71B1\u9580\u52D5\u614B</h1>\n    <i class="fa fa-spinner fa-pulse fa-fw loading" style="color: orange; display: none;"></i>\n  </div>\n  \n  <div class="posts"></div>\n</div>\n';

  _posts2.default.status.page = 1;
  _posts2.default.load();

  document.querySelector('.hottest-section .posts').addEventListener('scroll', function (e) {
    var target = e.target;

    // scrollWidth 整體寬度
    // scrollLeft  滾動距離
    // offsetWidth 可視寬度(含 margin)
    // clientWidth 可視寬度

    if (target.scrollLeft > target.scrollWidth - target.clientWidth * 2.5) {
      _posts2.default.load();
    }
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolean = __webpack_require__(4);

var _boolean2 = _interopRequireDefault(_boolean);

var _config = __webpack_require__(3);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (dom) {
  //
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(34)
  , IE8_DOM_DEFINE = __webpack_require__(39)
  , toPrimitive    = __webpack_require__(41)
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(46)
  , lolcation = __webpack_require__(47)
  , qs = __webpack_require__(45)
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
/* 16 */
/***/ (function(module, exports) {

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1])
      }, this)
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var oldValue = this.map[name]
    this.map[name] = oldValue ? oldValue+','+value : value
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    name = normalizeName(name)
    return this.has(name) ? this.map[name] : null
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value)
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this)
      }
    }
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = String(input)
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);


/***/ }),
/* 17 */
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
  node.innerHTML = '\n' + iconNode('fire', '熱門趨勢') + '\n' + iconNode('bar-chart', '個人統計') + '\n' + iconNode('history', '歷史回顧') + '\n' + iconNode('cog', '設定');

  (0, _upTo2.default)(document.querySelector('div.custom-search-bar'), 'div').append(node);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Insert hooks.js to html dom.
 *
 * @returns void
 */
module.exports = function () {
  var js = document.createElement('script');

  js.src = 'chrome-extension://' + chrome.i18n.getMessage('@@extension_id') + '/hooks.js';

  document.head.append(js);
};

/***/ }),
/* 19 */
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

    document.body.style.overflowY = '';

    document.querySelector('.custom-modal .box .content').innerHTML = '';
  };

  document.querySelector('.custom-modal .background').onclick = closeEvent;
  document.querySelector('.custom-modal .close-button i').onclick = closeEvent;
};

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _search = __webpack_require__(6);

var _search2 = _interopRequireDefault(_search);

var _upTo = __webpack_require__(0);

var _upTo2 = _interopRequireDefault(_upTo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  node.innerHTML = '\n<form class="search-form">\n  <input id="custom-search-input" type="text" placeholder="Post Search">\n  <i class="fa fa-fw fa-search" aria-hidden="true"></i>\n</form>\n\n<div class="result">\n  <ul></ul>\n</div>';

  dom.append(node);

  document.querySelector('#custom-search-input').addEventListener('input', function (e) {
    if (e.target.value) {
      (0, _search2.default)(e.target.value);
    }
  });

  document.body.addEventListener('click', function (e) {
    var parent = (0, _upTo2.default)(e.target, 'form');

    if (!(parent && 'search-form' === parent.className)) {
      document.querySelector('div.custom-search-bar .result').style.display = 'none';
    }
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  document.querySelectorAll('.custom-button i').forEach(function (node) {
    node.addEventListener('click', function (e) {
      document.body.style.overflowY = 'hidden';
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

      __webpack_require__(49)("./" + mapping[name])(document.querySelector('.custom-modal .box .content'));
    });
  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolean = __webpack_require__(4);

var _boolean2 = _interopRequireDefault(_boolean);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _search = __webpack_require__(6);

var _search2 = _interopRequireDefault(_search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      var keyword = e.target.value;

      document.querySelector('#custom-search-input').value = keyword;

      if (!keyword.length) {
        return;
      }

      _config2.default.get('setting.sync-search', function (sync) {
        if ((0, _boolean2.default)(sync)) {
          (0, _search2.default)(keyword);
        }
      });
    });
  }
};

module.exports = search;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolean = __webpack_require__(4);

var _boolean2 = _interopRequireDefault(_boolean);

var _config = __webpack_require__(3);

var _config2 = _interopRequireDefault(_config);

var _parseFbid = __webpack_require__(29);

var _parseFbid2 = _interopRequireDefault(_parseFbid);

var _inScreen = __webpack_require__(26);

var _inScreen2 = _interopRequireDefault(_inScreen);

var _isPublic = __webpack_require__(27);

var _isPublic2 = _interopRequireDefault(_isPublic);

var _isSponsored = __webpack_require__(28);

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
          return (0, _boolean2.default)(remove) && feed.remove();
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
/* 25 */,
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlParse = __webpack_require__(15);

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

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(30);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(42);
var $Object = __webpack_require__(11).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(33);
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(5)
  , document = __webpack_require__(13).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(13)
  , core      = __webpack_require__(11)
  , ctx       = __webpack_require__(35)
  , hide      = __webpack_require__(38)
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(14)
  , createDesc = __webpack_require__(40);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(12)(function(){
  return Object.defineProperty(__webpack_require__(36)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 40 */
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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(5);
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(37);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', {defineProperty: __webpack_require__(14).f});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(44);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 45 */
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
/* 46 */
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
/* 47 */
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
  URL = URL || __webpack_require__(15);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(48)))

/***/ }),
/* 48 */
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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./history": 7,
	"./history.js": 7,
	"./hottest": 8,
	"./hottest.js": 8,
	"./hottest/posts": 2,
	"./hottest/posts.js": 2,
	"./setting": 9,
	"./setting.js": 9,
	"./statistics": 10,
	"./statistics.js": 10
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
webpackContext.id = 49;


/***/ }),
/* 50 */
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

    __webpack_require__(18)();
    __webpack_require__(20)(dom);
    __webpack_require__(21)(dom);
    __webpack_require__(17)();
    __webpack_require__(19)();

    __webpack_require__(23)();
    __webpack_require__(22)();
    __webpack_require__(24)();
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjU5MDdhOGI5NTJlZTA2N2RjYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3VwLXRvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QvcG9zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jvb2xlYW4vbGliL2Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3NldHRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc3RhdGlzdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi91cmwtcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbmF2YmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9idXR0b24tY2xpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy91c2VyLWZlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaW4tc2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXB1YmxpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1zcG9uc29yZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2RvdC1wcm9wL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaXMtb2JqL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZXF1aXJlcy1wb3J0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vdXJsLXBhcnNlL2xvbGNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBhcmVudE5vZGUiLCJzdGF0dXMiLCJsb2FkaW5nIiwicGFnZSIsImxvYWQiLCJjYiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBvc3RzRG9tIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicmVuZGVyIiwiZGF0YSIsInJlc3VsdCIsInJlY3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm5vZGUiLCJjbGFzc05hbWUiLCJ3aW5kb3ciLCJwb3N0TWVzc2FnZSIsInR5cGUiLCJyZWR1Y2UiLCJodG1sIiwiZmVlZCIsInJlYyIsInVybCIsImdldCIsImtleSIsInBvcyIsImluZGV4T2YiLCJrIiwic2xpY2UiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJpdGVtcyIsImhhc093blByb3BlcnR5Iiwic2V0IiwidmFsIiwiaW5jbHVkZXMiLCJpdGVtIiwic3Vic3RyIiwia2V5d29yZCIsInJlc3VsdERvbSIsImlubmVySFRNTCIsImFjYyIsImNvbnRlbnQiLCJkZXNjcmlwdGlvbiIsImJvZHkiLCJwYWdlX25hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9tIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImUiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInRhYmxlIiwidGl0bGUiLCJzZXR0aW5nIiwiaWQiLCJ2YWx1ZSIsIm4iLCJyZXBsYWNlIiwic2V0VGltZW91dCIsImljb25Ob2RlIiwiaWNvbiIsIm5hbWUiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwianMiLCJzcmMiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImhlYWQiLCJjbG9zZUV2ZW50Iiwib3ZlcmZsb3dZIiwib25jbGljayIsInBhcmVudCIsImlubmVyVGV4dCIsImRhdGFzZXQiLCJ0b29sdGlwQ29udGVudCIsIm1hcHBpbmciLCJsYXN0SW5kZXhPZiIsInJlcXVpcmUiLCJzZWFyY2giLCJmYlNlYXJjaElucHV0cyIsImxlbmd0aCIsInN5bmMiLCJmZWVkcyIsImxhc3RZIiwib25zY3JvbGwiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVtb3ZlIiwiZmJpZCIsImhyZWYiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInNjcm9sbFkiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2NyZWVuIiwidG9wIiwiYm90dG9tIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiaGVpZ2h0IiwicHJpdmFjeSIsImdldEF0dHJpYnV0ZSIsImlzU3BvbnNvcmVkIiwicGFyc2VkVXJscyIsImZyb21VcmwiLCJwYXJzZWQiLCJxdWVyeSIsImVuZHNXaXRoIiwic3RvcnlfZmJpZCIsIm1hdGNoIiwiZXJyb3IiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7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Q0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RDtBQUN2RCxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1QsOEVBQThFO0FBQzlFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOEJBQThCLHVCQUF1QjtBQUNyRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUEsQ0FBUSxFQUFSLEVBQXdDbEMsR0FBeEM7QUFDQWtDLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7O0FBRUFBLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7QUFDQUEsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0Q7QUFDRixDQXRCRCxDIiwiZmlsZSI6ImNvbnRlbnQtc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAyNTkwN2E4Yjk1MmVlMDY3ZGNhMiIsIi8qKlxuICogRmluZCBmaXJzdCBhbmNlc3RvciBvZiBlbCB3aXRoIHRhZ05hbWUgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gZWxcbiAqIEBwYXJhbSB0YWdOYW1lXG4gKiBAcmV0dXJucyB7Kn1cbiAqXG4gKiBAcmVmZXJlbmNlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzY4NTcxMTZcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGVsLCB0YWdOYW1lKSA9PiB7XG4gIHRhZ05hbWUgPSB0YWdOYW1lLnRvTG93ZXJDYXNlKClcblxuICB3aGlsZSAoZWwgJiYgZWwucGFyZW50Tm9kZSkge1xuICAgIGVsID0gZWwucGFyZW50Tm9kZVxuXG4gICAgaWYgKGVsLnRhZ05hbWUgJiYgZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSB0YWdOYW1lKSB7XG4gICAgICByZXR1cm4gZWxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL3VwLXRvLmpzIiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0dXM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBwYWdlOiAxXG4gIH0sXG5cbiAgLyoqXG4gICAqIExvYWQgaG90dGVzdCBwb3N0cy5cbiAgICpcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbG9hZCAoY2IgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSB0cnVlXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG90dGVzdC1zZWN0aW9uIGRpdiBpLmxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJydcblxuICAgIGZldGNoKGBodHRwczovL3d3dy5jcy5jY3UuZWR1LnR3L35jeXMxMDJ1L2FwaS5waHA/cGFnZT0ke3RoaXMuc3RhdHVzLnBhZ2V9YCkudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhID0+IHtcbiAgICAgICAgY29uc3QgcG9zdHNEb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG90dGVzdC1zZWN0aW9uIC5wb3N0cycpXG5cbiAgICAgICAgcG9zdHNEb20uaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0aGlzLnJlbmRlcihkYXRhLnJlc3VsdC5yZWNzKSlcbiAgICAgICAgcG9zdHNEb20ucXVlcnlTZWxlY3RvckFsbCgnZGl2LmZiLXBvc3QuZmJfaWZyYW1lX3dpZGdldCcpLmZvckVhY2gobm9kZSA9PiB7IG5vZGUuY2xhc3NOYW1lID0gJycgfSlcblxuICAgICAgICBpZiAobnVsbCAhPT0gY2IpIHtcbiAgICAgICAgICBjYihkYXRhKVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93LnBvc3RNZXNzYWdlKHsgdHlwZTogJ2VtYmVkLXBvc3RzJyB9LCAnKicpXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiBkaXYgaS5sb2FkaW5nJykuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgfSlcblxuICAgICAgKyt0aGlzLnN0YXR1cy5wYWdlXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogUmVuZGVyIGhvdHRlc3QgcG9zdHMgaHRtbC5cbiAgICpcbiAgICogQHBhcmFtIHJlY3NcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIHJlbmRlciAocmVjcykge1xuICAgIHJldHVybiByZWNzLnJlZHVjZSgoaHRtbCwgZmVlZCkgPT4ge1xuICAgICAgcmV0dXJuIGh0bWwgKyBgPGRpdiBjbGFzcz1cImZiLXBvc3RcIiBkYXRhLWhyZWY9XCIke2ZlZWQucmVjLnVybH1cIiBkYXRhLXdpZHRoPVwiMzUwXCI+PC9kaXY+YFxuICAgIH0sICcnKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0L3Bvc3RzLmpzIiwiaW1wb3J0IGRvdFByb3AgZnJvbSAnZG90LXByb3AnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgLyoqXG4gICAqIEdldCBjb250ZW50IGZyb20gc3RvcmFnZSBhbmQgcGFzcyB0aGUgcmVzdWx0IHRvIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSBjYlxuICAgKlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBnZXQgKGtleSwgY2IgPSBudWxsKSB7XG4gICAgaWYgKG51bGwgPT09IGNiKSB7XG4gICAgICBba2V5LCBjYl0gPSBbJycsIGtleV1cbiAgICB9XG5cbiAgICBjb25zdCBwb3MgPSBrZXkuaW5kZXhPZignLicpXG5cbiAgICBjb25zdCBrID0gKC0xICE9PSBwb3MgPyBrZXkuc2xpY2UoMCwgcG9zKSA6IGtleSkgfHwgbnVsbFxuXG4gICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KGssIGl0ZW1zID0+IHtcbiAgICAgIGlmIChudWxsICE9PSBrICYmIGl0ZW1zLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgIGl0ZW1zID0gaXRlbXNba11cblxuICAgICAgICBpZiAoLTEgIT09IHBvcykge1xuICAgICAgICAgIGl0ZW1zID0gZG90UHJvcC5nZXQoaXRlbXMsIGtleS5zbGljZShwb3MgKyAxKSwge30pXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2IoaXRlbXMpXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogU3RvcmUgY29udGVudCB0byBzdG9yYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ga2V5XG4gICAqIEBwYXJhbSB2YWxcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIHNldCAoa2V5LCB2YWwsIGNiID0gbnVsbCkge1xuICAgIGlmICghIGtleS5pbmNsdWRlcygnLicpKSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5XTogdmFsIH0sIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3MgPSBrZXkuaW5kZXhPZignLicpXG5cbiAgICAgIHRoaXMuZ2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtID0+IHtcbiAgICAgICAgZG90UHJvcC5zZXQoaXRlbSwga2V5LnN1YnN0cihwb3MgKyAxKSwgdmFsKVxuXG4gICAgICAgIHRoaXMuc2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtLCBjYilcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXih0cnVlfHR8eWVzfHl8MSkkL2kudGVzdCh2YWx1ZS50cmltKCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDE7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJvb2xlYW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vbGVhbi9saWIvYm9vbGVhbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICd3aGF0d2ctZmV0Y2gnXG5cbmV4cG9ydCBkZWZhdWx0IChrZXl3b3JkLCBwYWdlID0gMSkgPT4ge1xuICBmZXRjaChgaHR0cHM6Ly93d3cuY3MuY2N1LmVkdS50dy9+Y3lzMTAydS9hcGkucGhwP3R5cGU9c2VhcmNoJmtleXdvcmQ9JHtrZXl3b3JkfSZwYWdlPSR7cGFnZX1gKS50aGVuKHJlc3BvbnNlID0+IHtcbiAgICByZXNwb25zZS5qc29uKCkudGhlbihkYXRhID0+IHtcbiAgICAgIGNvbnN0IHJlc3VsdERvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jdXN0b20tc2VhcmNoLWJhciAucmVzdWx0JylcblxuICAgICAgcmVzdWx0RG9tLnF1ZXJ5U2VsZWN0b3IoJ3VsJykuaW5uZXJIVE1MID0gZGF0YS5yZXN1bHQucmVjcy5yZWR1Y2UoKGFjYywgcmVjKSA9PiB7XG4gICAgICAgIHJlYyA9IHJlYy5yZWNcblxuICAgICAgICBjb25zdCBjb250ZW50ID0gcmVjLmRlc2NyaXB0aW9uIHx8IHJlYy5ib2R5IHx8IHJlYy5wYWdlX25hbWVcblxuICAgICAgICByZXR1cm4gYCR7YWNjfTxsaT48YSBocmVmPVwiJHtyZWMudXJsfVwiPiR7Y29udGVudC5zdWJzdHIoMCwgMzApfTwvYT48L2xpPmBcbiAgICAgIH0sICcnKVxuXG4gICAgICByZXN1bHREb20uc3R5bGUuZGlzcGxheSA9ICdibG9jaydcbiAgICB9KVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9jb21wb25lbnRzL3NlYXJjaC5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICAvL1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaGlzdG9yeS5qcyIsImltcG9ydCBwb3N0cyBmcm9tICcuL2hvdHRlc3QvcG9zdHMnXG5cbm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICBkb20uaW5uZXJIVE1MID0gYFxuPGRpdiBjbGFzcz1cImhvdHRlc3Qtc2VjdGlvblwiPlxuICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6IDEuNXJlbTsgbWFyZ2luLXRvcDogMXJlbTtcIj5cbiAgICA8aDEgc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmU7XCI+54ax6ZaA5YuV5oWLPC9oMT5cbiAgICA8aSBjbGFzcz1cImZhIGZhLXNwaW5uZXIgZmEtcHVsc2UgZmEtZncgbG9hZGluZ1wiIHN0eWxlPVwiY29sb3I6IG9yYW5nZTsgZGlzcGxheTogbm9uZTtcIj48L2k+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cInBvc3RzXCI+PC9kaXY+XG48L2Rpdj5cbmBcblxuICBwb3N0cy5zdGF0dXMucGFnZSA9IDFcbiAgcG9zdHMubG9hZCgpXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiAucG9zdHMnKS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBlID0+IHtcbiAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldFxuXG4gICAgLy8gc2Nyb2xsV2lkdGgg5pW06auU5a+s5bqmXG4gICAgLy8gc2Nyb2xsTGVmdCAg5ru+5YuV6Led6ZuiXG4gICAgLy8gb2Zmc2V0V2lkdGgg5Y+v6KaW5a+s5bqmKOWQqyBtYXJnaW4pXG4gICAgLy8gY2xpZW50V2lkdGgg5Y+v6KaW5a+s5bqmXG5cbiAgICBpZiAodGFyZ2V0LnNjcm9sbExlZnQgPiAodGFyZ2V0LnNjcm9sbFdpZHRoIC0gdGFyZ2V0LmNsaWVudFdpZHRoICogMi41KSkge1xuICAgICAgcG9zdHMubG9hZCgpXG4gICAgfVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaG90dGVzdC5qcyIsImltcG9ydCBib29sZWFuIGZyb20gJ2Jvb2xlYW4nXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmZpZydcbmltcG9ydCB1cFRvIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VwLXRvJ1xuXG5jb25zdCByZW5kZXIgPSBzZXR0aW5nID0+IHtcbiAgY29uc3QgdGFibGUgPSBbXG4gICAgeyB0aXRsZTogJ+eyvumBuOWLleaFiycsIGRlc2NyaXB0aW9uOiAn5pa85YuV5oWL5pmC5aCx5LiK5bWM5YWl5oiR5YCR57K+6YG455qE54ax6ZaA5YuV5oWLJywga2V5OiAnZmVhdHVyZWQtZmVlZCcgfSxcbiAgICB7IHRpdGxlOiAn56e76Zmk5buj5ZGKJywgZGVzY3JpcHRpb246ICfmlrzli5XmhYvmmYLloLHkuIrnp7vpmaTngrrotIrliqnnmoTli5XmhYsnLCBrZXk6ICdyZW1vdmUtYWQnIH0sXG4gICAgeyB0aXRsZTogJ+WQjOatpeaQnOWwiycsIGRlc2NyaXB0aW9uOiAn5pa86IeJ5pu45pCc5bCL5pmC77yM5LiA5Lim5pa85oiR5YCR5bCI5bGs6LOH5paZ5bqr5Lit5pCc5bCLJywga2V5OiAnc3luYy1zZWFyY2gnIH1cbiAgXVxuXG4gIHJldHVybiB0YWJsZS5yZWR1Y2UoKGh0bWwsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaHRtbCArIGBcbjxkaXYgY2xhc3M9XCJzZXR0aW5nLXNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgPGI+JHtpdGVtLnRpdGxlfTwvYj5cbiAgPC9kaXY+XG4gIFxuICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICA8c3Bhbj4ke2l0ZW0uZGVzY3JpcHRpb259PC9zcGFuPlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJvcGVyYXRpb25cIj5cbiAgICA8c3BhbiBjbGFzcz1cInN1Y2Nlc3MtaWNvblwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgXG4gICAgPHNlbGVjdCBpZD1cIiR7aXRlbS5rZXl9XCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCI+T2ZmPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCIgJHtib29sZWFuKHNldHRpbmdbaXRlbS5rZXldKSA/ICdzZWxlY3RlZCcgOiAnJ30+T248L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG48L2Rpdj5gXG4gIH0sICcnKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgY29uZmlnLmdldCgnc2V0dGluZycsIHNldHRpbmcgPT4ge1xuICAgIGRvbS5pbm5lckhUTUwgPSByZW5kZXIoc2V0dGluZylcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tbW9kYWwgLmJveCAuY29udGVudCAuc2V0dGluZy1zZWN0aW9uIC5vcGVyYXRpb24gc2VsZWN0JykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHNldHRpbmdbZS50YXJnZXQuaWRdID0gYm9vbGVhbihlLnRhcmdldC52YWx1ZSlcblxuICAgICAgICBjb25maWcuc2V0KCdzZXR0aW5nJywgc2V0dGluZywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG4gPSB1cFRvKGUudGFyZ2V0LCAnZGl2JykucXVlcnlTZWxlY3Rvcignc3BhbicpXG5cbiAgICAgICAgICBuLmNsYXNzTmFtZSA9IG4uY2xhc3NOYW1lLnJlcGxhY2UoLyA/YW5pL2csICcnKVxuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG4uY2xhc3NOYW1lICs9ICcgYW5pJyB9LCAxKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc2V0dGluZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICAvL1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc3RhdGlzdGljcy5qcyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBsb2xjYXRpb24gPSByZXF1aXJlKCcuL2xvbGNhdGlvbicpXG4gICwgcXMgPSByZXF1aXJlKCdxdWVyeXN0cmluZ2lmeScpXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHBhcnNlIHJ1bGVzIGZvciB0aGUgVVJMIHBhcnNlciwgaXQgaW5mb3JtcyB0aGUgcGFyc2VyXG4gKiBhYm91dDpcbiAqXG4gKiAwLiBUaGUgY2hhciBpdCBOZWVkcyB0byBwYXJzZSwgaWYgaXQncyBhIHN0cmluZyBpdCBzaG91bGQgYmUgZG9uZSB1c2luZ1xuICogICAgaW5kZXhPZiwgUmVnRXhwIHVzaW5nIGV4ZWMgYW5kIE5hTiBtZWFucyBzZXQgYXMgY3VycmVudCB2YWx1ZS5cbiAqIDEuIFRoZSBwcm9wZXJ0eSB3ZSBzaG91bGQgc2V0IHdoZW4gcGFyc2luZyB0aGlzIHZhbHVlLlxuICogMi4gSW5kaWNhdGlvbiBpZiBpdCdzIGJhY2t3YXJkcyBvciBmb3J3YXJkIHBhcnNpbmcsIHdoZW4gc2V0IGFzIG51bWJlciBpdCdzXG4gKiAgICB0aGUgdmFsdWUgb2YgZXh0cmEgY2hhcnMgdGhhdCBzaG91bGQgYmUgc3BsaXQgb2ZmLlxuICogMy4gSW5oZXJpdCBmcm9tIGxvY2F0aW9uIGlmIG5vbiBleGlzdGluZyBpbiB0aGUgcGFyc2VyLlxuICogNC4gYHRvTG93ZXJDYXNlYCB0aGUgcmVzdWx0aW5nIHZhbHVlLlxuICovXG52YXIgcnVsZXMgPSBbXG4gIFsnIycsICdoYXNoJ10sICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJz8nLCAncXVlcnknXSwgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKykkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcmV0dXJuIHtQcm90b2NvbEV4dHJhY3R9IEV4dHJhY3RlZCBpbmZvcm1hdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRyYWN0UHJvdG9jb2woYWRkcmVzcykge1xuICB2YXIgbWF0Y2ggPSBwcm90b2NvbHJlLmV4ZWMoYWRkcmVzcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm90b2NvbDogbWF0Y2hbMV0gPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogJycsXG4gICAgc2xhc2hlczogISFtYXRjaFsyXSxcbiAgICByZXN0OiBtYXRjaFszXVxuICB9O1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSByZWxhdGl2ZSBVUkwgcGF0aG5hbWUgYWdhaW5zdCBhIGJhc2UgVVJMIHBhdGhuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGl2ZSBQYXRobmFtZSBvZiB0aGUgcmVsYXRpdmUgVVJMLlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2UgUGF0aG5hbWUgb2YgdGhlIGJhc2UgVVJMLlxuICogQHJldHVybiB7U3RyaW5nfSBSZXNvbHZlZCBwYXRobmFtZS5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlKHJlbGF0aXZlLCBiYXNlKSB7XG4gIHZhciBwYXRoID0gKGJhc2UgfHwgJy8nKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5jb25jYXQocmVsYXRpdmUuc3BsaXQoJy8nKSlcbiAgICAsIGkgPSBwYXRoLmxlbmd0aFxuICAgICwgbGFzdCA9IHBhdGhbaSAtIDFdXG4gICAgLCB1bnNoaWZ0ID0gZmFsc2VcbiAgICAsIHVwID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHBhdGhbaV0gPT09ICcuJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXRoW2ldID09PSAnLi4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgaWYgKGkgPT09IDApIHVuc2hpZnQgPSB0cnVlO1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1bnNoaWZ0KSBwYXRoLnVuc2hpZnQoJycpO1xuICBpZiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHBhdGgucHVzaCgnJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbignLycpO1xufVxuXG4vKipcbiAqIFRoZSBhY3R1YWwgVVJMIGluc3RhbmNlLiBJbnN0ZWFkIG9mIHJldHVybmluZyBhbiBvYmplY3Qgd2UndmUgb3B0ZWQtaW4gdG9cbiAqIGNyZWF0ZSBhbiBhY3R1YWwgY29uc3RydWN0b3IgYXMgaXQncyBtdWNoIG1vcmUgbWVtb3J5IGVmZmljaWVudCBhbmRcbiAqIGZhc3RlciBhbmQgaXQgcGxlYXNlcyBteSBPQ0QuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jYXRpb24gTG9jYXRpb24gZGVmYXVsdHMgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBwYXJzZXIgUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVVJMKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFVSTCkpIHtcbiAgICByZXR1cm4gbmV3IFVSTChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKTtcbiAgfVxuXG4gIHZhciByZWxhdGl2ZSwgZXh0cmFjdGVkLCBwYXJzZSwgaW5zdHJ1Y3Rpb24sIGluZGV4LCBrZXlcbiAgICAsIGluc3RydWN0aW9ucyA9IHJ1bGVzLnNsaWNlKClcbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jYXRpb25cbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGkgPSAwO1xuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgaWYgc3RhdGVtZW50cyBhbGxvd3MgdGhpcyBtb2R1bGUgdHdvIGhhdmUgY29tcGF0aWJpbGl0eSB3aXRoXG4gIC8vIDIgZGlmZmVyZW50IEFQSTpcbiAgLy9cbiAgLy8gMS4gTm9kZS5qcydzIGB1cmwucGFyc2VgIGFwaSB3aGljaCBhY2NlcHRzIGEgVVJMLCBib29sZWFuIGFzIGFyZ3VtZW50c1xuICAvLyAgICB3aGVyZSB0aGUgYm9vbGVhbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcXVlcnkgc3RyaW5nIHNob3VsZCBhbHNvIGJlIHBhcnNlZC5cbiAgLy9cbiAgLy8gMi4gVGhlIGBVUkxgIGludGVyZmFjZSBvZiB0aGUgYnJvd3NlciB3aGljaCBhY2NlcHRzIGEgVVJMLCBvYmplY3QgYXNcbiAgLy8gICAgYXJndW1lbnRzLiBUaGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0IHZhbHVlcyAvIGZhbGwtYmFja1xuICAvLyAgICBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gIC8vXG4gIGlmICgnb2JqZWN0JyAhPT0gdHlwZSAmJiAnc3RyaW5nJyAhPT0gdHlwZSkge1xuICAgIHBhcnNlciA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJzZXIgJiYgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcnNlcikgcGFyc2VyID0gcXMucGFyc2U7XG5cbiAgbG9jYXRpb24gPSBsb2xjYXRpb24obG9jYXRpb24pO1xuXG4gIC8vXG4gIC8vIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gYmVmb3JlIHJ1bm5pbmcgdGhlIGluc3RydWN0aW9ucy5cbiAgLy9cbiAgZXh0cmFjdGVkID0gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MgfHwgJycpO1xuICByZWxhdGl2ZSA9ICFleHRyYWN0ZWQucHJvdG9jb2wgJiYgIWV4dHJhY3RlZC5zbGFzaGVzO1xuICB1cmwuc2xhc2hlcyA9IGV4dHJhY3RlZC5zbGFzaGVzIHx8IHJlbGF0aXZlICYmIGxvY2F0aW9uLnNsYXNoZXM7XG4gIHVybC5wcm90b2NvbCA9IGV4dHJhY3RlZC5wcm90b2NvbCB8fCBsb2NhdGlvbi5wcm90b2NvbCB8fCAnJztcbiAgYWRkcmVzcyA9IGV4dHJhY3RlZC5yZXN0O1xuXG4gIC8vXG4gIC8vIFdoZW4gdGhlIGF1dGhvcml0eSBjb21wb25lbnQgaXMgYWJzZW50IHRoZSBVUkwgc3RhcnRzIHdpdGggYSBwYXRoXG4gIC8vIGNvbXBvbmVudC5cbiAgLy9cbiAgaWYgKCFleHRyYWN0ZWQuc2xhc2hlcykgaW5zdHJ1Y3Rpb25zWzJdID0gWy8oLiopLywgJ3BhdGhuYW1lJ107XG5cbiAgZm9yICg7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcbiAgICBwYXJzZSA9IGluc3RydWN0aW9uWzBdO1xuICAgIGtleSA9IGluc3RydWN0aW9uWzFdO1xuXG4gICAgaWYgKHBhcnNlICE9PSBwYXJzZSkge1xuICAgICAgdXJsW2tleV0gPSBhZGRyZXNzO1xuICAgIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBwYXJzZSkge1xuICAgICAgaWYgKH4oaW5kZXggPSBhZGRyZXNzLmluZGV4T2YocGFyc2UpKSkge1xuICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBpbnN0cnVjdGlvblsyXSkge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoaW5kZXggKyBpbnN0cnVjdGlvblsyXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpbmRleCA9IHBhcnNlLmV4ZWMoYWRkcmVzcykpKSB7XG4gICAgICB1cmxba2V5XSA9IGluZGV4WzFdO1xuICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXguaW5kZXgpO1xuICAgIH1cblxuICAgIHVybFtrZXldID0gdXJsW2tleV0gfHwgKFxuICAgICAgcmVsYXRpdmUgJiYgaW5zdHJ1Y3Rpb25bM10gPyBsb2NhdGlvbltrZXldIHx8ICcnIDogJydcbiAgICApO1xuXG4gICAgLy9cbiAgICAvLyBIb3N0bmFtZSwgaG9zdCBhbmQgcHJvdG9jb2wgc2hvdWxkIGJlIGxvd2VyY2FzZWQgc28gdGhleSBjYW4gYmUgdXNlZCB0b1xuICAgIC8vIGNyZWF0ZSBhIHByb3BlciBgb3JpZ2luYC5cbiAgICAvL1xuICAgIGlmIChpbnN0cnVjdGlvbls0XSkgdXJsW2tleV0gPSB1cmxba2V5XS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLy9cbiAgLy8gQWxzbyBwYXJzZSB0aGUgc3VwcGxpZWQgcXVlcnkgc3RyaW5nIGluIHRvIGFuIG9iamVjdC4gSWYgd2UncmUgc3VwcGxpZWRcbiAgLy8gd2l0aCBhIGN1c3RvbSBwYXJzZXIgYXMgZnVuY3Rpb24gdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBidWlsZC1pblxuICAvLyBwYXJzZXIuXG4gIC8vXG4gIGlmIChwYXJzZXIpIHVybC5xdWVyeSA9IHBhcnNlcih1cmwucXVlcnkpO1xuXG4gIC8vXG4gIC8vIElmIHRoZSBVUkwgaXMgcmVsYXRpdmUsIHJlc29sdmUgdGhlIHBhdGhuYW1lIGFnYWluc3QgdGhlIGJhc2UgVVJMLlxuICAvL1xuICBpZiAoXG4gICAgICByZWxhdGl2ZVxuICAgICYmIGxvY2F0aW9uLnNsYXNoZXNcbiAgICAmJiB1cmwucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLydcbiAgICAmJiAodXJsLnBhdGhuYW1lICE9PSAnJyB8fCBsb2NhdGlvbi5wYXRobmFtZSAhPT0gJycpXG4gICkge1xuICAgIHVybC5wYXRobmFtZSA9IHJlc29sdmUodXJsLnBhdGhuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICAvL1xuICAvLyBXZSBzaG91bGQgbm90IGFkZCBwb3J0IG51bWJlcnMgaWYgdGhleSBhcmUgYWxyZWFkeSB0aGUgZGVmYXVsdCBwb3J0IG51bWJlclxuICAvLyBmb3IgYSBnaXZlbiBwcm90b2NvbC4gQXMgdGhlIGhvc3QgYWxzbyBjb250YWlucyB0aGUgcG9ydCBudW1iZXIgd2UncmUgZ29pbmdcbiAgLy8gb3ZlcnJpZGUgaXQgd2l0aCB0aGUgaG9zdG5hbWUgd2hpY2ggY29udGFpbnMgbm8gcG9ydCBudW1iZXIuXG4gIC8vXG4gIGlmICghcmVxdWlyZWQodXJsLnBvcnQsIHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICB1cmwucG9ydCA9ICcnO1xuICB9XG5cbiAgLy9cbiAgLy8gUGFyc2UgZG93biB0aGUgYGF1dGhgIGZvciB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAvL1xuICB1cmwudXNlcm5hbWUgPSB1cmwucGFzc3dvcmQgPSAnJztcbiAgaWYgKHVybC5hdXRoKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSB1cmwuYXV0aC5zcGxpdCgnOicpO1xuICAgIHVybC51c2VybmFtZSA9IGluc3RydWN0aW9uWzBdIHx8ICcnO1xuICAgIHVybC5wYXNzd29yZCA9IGluc3RydWN0aW9uWzFdIHx8ICcnO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICAvL1xuICAvLyBUaGUgaHJlZiBpcyBqdXN0IHRoZSBjb21waWxlZCByZXN1bHQuXG4gIC8vXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNoYW5naW5nIHByb3BlcnRpZXMgaW4gdGhlIFVSTCBpbnN0YW5jZSB0b1xuICogaW5zdXJlIHRoYXQgdGhleSBhbGwgcHJvcGFnYXRlIGNvcnJlY3RseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFydCAgICAgICAgICBQcm9wZXJ0eSB3ZSBuZWVkIHRvIGFkanVzdC5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlICAgICAgICAgIFRoZSBuZXdseSBhc3NpZ25lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gZm4gIFdoZW4gc2V0dGluZyB0aGUgcXVlcnksIGl0IHdpbGwgYmUgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIHRvIHBhcnNlIHRoZSBxdWVyeS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gc2V0dGluZyB0aGUgcHJvdG9jb2wsIGRvdWJsZSBzbGFzaCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGZpbmFsIHVybCBpZiBpdCBpcyB0cnVlLlxuICogQHJldHVybnMge1VSTH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICgvOlxcZCskLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHVybC5wb3J0ID0gdmFsdWUucG9wKCk7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlO1xuICAgICAgICB1cmwucG9ydCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3Byb3RvY29sJzpcbiAgICAgIHVybC5wcm90b2NvbCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB1cmwuc2xhc2hlcyA9ICFmbjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aG5hbWUnOlxuICAgICAgdXJsLnBhdGhuYW1lID0gdmFsdWUubGVuZ3RoICYmIHZhbHVlLmNoYXJBdCgwKSAhPT0gJy8nID8gJy8nICsgdmFsdWUgOiB2YWx1ZTtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlucyA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGluc1s0XSkgdXJsW2luc1sxXV0gPSB1cmxbaW5zWzFdXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xuXG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgcHJvcGVydGllcyBiYWNrIGluIHRvIGEgdmFsaWQgYW5kIGZ1bGwgVVJMIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmdpZnkgT3B0aW9uYWwgcXVlcnkgc3RyaW5naWZ5IGZ1bmN0aW9uLlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHN0cmluZ2lmeSkge1xuICBpZiAoIXN0cmluZ2lmeSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygc3RyaW5naWZ5KSBzdHJpbmdpZnkgPSBxcy5zdHJpbmdpZnk7XG5cbiAgdmFyIHF1ZXJ5XG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBwcm90b2NvbCA9IHVybC5wcm90b2NvbDtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuY2hhckF0KHByb3RvY29sLmxlbmd0aCAtIDEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICB2YXIgcmVzdWx0ID0gcHJvdG9jb2wgKyAodXJsLnNsYXNoZXMgPyAnLy8nIDogJycpO1xuXG4gIGlmICh1cmwudXNlcm5hbWUpIHtcbiAgICByZXN1bHQgKz0gdXJsLnVzZXJuYW1lO1xuICAgIGlmICh1cmwucGFzc3dvcmQpIHJlc3VsdCArPSAnOicrIHVybC5wYXNzd29yZDtcbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9XG5cbiAgcmVzdWx0ICs9IHVybC5ob3N0ICsgdXJsLnBhdGhuYW1lO1xuXG4gIHF1ZXJ5ID0gJ29iamVjdCcgPT09IHR5cGVvZiB1cmwucXVlcnkgPyBzdHJpbmdpZnkodXJsLnF1ZXJ5KSA6IHVybC5xdWVyeTtcbiAgaWYgKHF1ZXJ5KSByZXN1bHQgKz0gJz8nICE9PSBxdWVyeS5jaGFyQXQoMCkgPyAnPycrIHF1ZXJ5IDogcXVlcnk7XG5cbiAgaWYgKHVybC5oYXNoKSByZXN1bHQgKz0gdXJsLmhhc2g7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVVJMLnByb3RvdHlwZSA9IHsgc2V0OiBzZXQsIHRvU3RyaW5nOiB0b1N0cmluZyB9O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBVUkwgcGFyc2VyIGFuZCBzb21lIGFkZGl0aW9uYWwgcHJvcGVydGllcyB0aGF0IG1pZ2h0IGJlIHVzZWZ1bCBmb3Jcbi8vIG90aGVycyBvciB0ZXN0aW5nLlxuLy9cblVSTC5leHRyYWN0UHJvdG9jb2wgPSBleHRyYWN0UHJvdG9jb2w7XG5VUkwubG9jYXRpb24gPSBsb2xjYXRpb247XG5VUkwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVUkw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLXBhcnNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSsnLCcrdmFsdWUgOiB2YWx1ZVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHVwVG8gZnJvbSAnLi4vLi4vdXRpbHMvdXAtdG8nXG5cbi8qKlxuICogQ3JlYXRlIGEgZm9udCBhd2Vzb21lIGljb24gbm9kZS5cbiAqXG4gKiBAcGFyYW0gaWNvblxuICogQHBhcmFtIG5hbWVcbiAqXG4gKiBAcmV0dXJucyBzdHJpbmdcbiAqL1xuZnVuY3Rpb24gaWNvbk5vZGUgKGljb24sIG5hbWUpIHtcbiAgcmV0dXJuIGA8aSBjbGFzcz1cImZhIGZhLWZ3IGZhLSR7aWNvbn1cIiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWhvdmVyPVwidG9vbHRpcFwiIGRhdGEtdG9vbHRpcC1kZWxheT1cIjM1MFwiIGRhdGEtdG9vbHRpcC1jb250ZW50PVwiJHtuYW1lfVwiPjwvaT5gXG59XG5cbi8qKlxuICogQWRkIGJ1dHRvbnMgaW4gdGhlIHJpZ2h0IG9mIHNlYXJjaCBiYXIuXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgbm9kZS5jbGFzc05hbWUgPSAnY3VzdG9tLWJ1dHRvbidcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG4ke2ljb25Ob2RlKCdmaXJlJywgJ+eGsemWgOi2qOWLoicpfVxuJHtpY29uTm9kZSgnYmFyLWNoYXJ0JywgJ+WAi+S6uue1seioiCcpfVxuJHtpY29uTm9kZSgnaGlzdG9yeScsICfmrbflj7Llm57poacnKX1cbiR7aWNvbk5vZGUoJ2NvZycsICfoqK3lrponKX1gXG5cbiAgdXBUbyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY3VzdG9tLXNlYXJjaC1iYXInKSwgJ2RpdicpLmFwcGVuZChub2RlKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvYnV0dG9uLmpzIiwiLyoqXG4gKiBJbnNlcnQgaG9va3MuanMgdG8gaHRtbCBkb20uXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3QganMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuXG4gIGpzLnNyYyA9IGBjaHJvbWUtZXh0ZW5zaW9uOi8vJHtjaHJvbWUuaTE4bi5nZXRNZXNzYWdlKCdAQGV4dGVuc2lvbl9pZCcpfS9ob29rcy5qc2BcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChqcylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiLCIvKipcbiAqIEFkZCBtb2RhbC5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tbW9kYWwnXG4gIG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbjxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJib3hcIj5cbiAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDogMXJlbTtcIj5cbiAgICAgIDxiIGlkPVwiY3VzdG9tLW1vZGFsLXRpdGxlXCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCI+PC9iPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1idXR0b25cIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGcgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cbjwvZGl2PmBcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChub2RlKVxuXG4gIGNvbnN0IGNsb3NlRXZlbnQgPSAoKSA9PiB7XG4gICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICcnXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5ib3ggLmNvbnRlbnQnKS5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuYmFja2dyb3VuZCcpLm9uY2xpY2sgPSBjbG9zZUV2ZW50XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwgLmNsb3NlLWJ1dHRvbiBpJykub25jbGljayA9IGNsb3NlRXZlbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL21vZGFsLmpzIiwiLyoqXG4gKiBBZGQgY2xhc3MgdG8gZmFjZWJvb2sgbmF2YmFyLlxuICpcbiAqIEBwYXJhbSBkb21cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZG9tID0+IHtcbiAgZG9tLmNsYXNzTmFtZSArPSAnIGN1c3RvbS1uYXZiYXInXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9uYXZiYXIuanMiLCJpbXBvcnQgc2VhcmNoQXBpIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoJ1xuaW1wb3J0IHVwVG8gZnJvbSAnLi4vLi4vdXRpbHMvdXAtdG8nXG5cbi8qKlxuICogQWRkIHNlYXJjaCBiYXIgaW4gdGhlIHJpZ2h0IG9mIGZhY2Vib29rIHNlYXJjaCBiYXIuXG4gKlxuICogQHBhcmFtIGRvbVxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkb20gPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tc2VhcmNoLWJhcidcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG48Zm9ybSBjbGFzcz1cInNlYXJjaC1mb3JtXCI+XG4gIDxpbnB1dCBpZD1cImN1c3RvbS1zZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUG9zdCBTZWFyY2hcIj5cbiAgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS1zZWFyY2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG48L2Zvcm0+XG5cbjxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cbiAgPHVsPjwvdWw+XG48L2Rpdj5gXG5cbiAgZG9tLmFwcGVuZChub2RlKVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b20tc2VhcmNoLWlucHV0JykuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLnRhcmdldC52YWx1ZSkge1xuICAgICAgc2VhcmNoQXBpKGUudGFyZ2V0LnZhbHVlKVxuICAgIH1cbiAgfSlcblxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gdXBUbyhlLnRhcmdldCwgJ2Zvcm0nKVxuXG4gICAgaWYgKCEgKHBhcmVudCAmJiAoJ3NlYXJjaC1mb3JtJyA9PT0gcGFyZW50LmNsYXNzTmFtZSkpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuY3VzdG9tLXNlYXJjaC1iYXIgLnJlc3VsdCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICB9XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9zZWFyY2gtYmFyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tYnV0dG9uIGknKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1tb2RhbC10aXRsZScpLmlubmVyVGV4dCA9IGUudGFyZ2V0LmRhdGFzZXQudG9vbHRpcENvbnRlbnRcblxuICAgICAgY29uc3QgbWFwcGluZyA9IHtcbiAgICAgICAgJ2ZpcmUnOiAnaG90dGVzdCcsXG4gICAgICAgICdiYXItY2hhcnQnOiAnc3RhdGlzdGljcycsXG4gICAgICAgICdoaXN0b3J5JzogJ2hpc3RvcnknLFxuICAgICAgICAnY29nJzogJ3NldHRpbmcnXG4gICAgICB9XG5cbiAgICAgIGxldCBuYW1lID0gZS50YXJnZXQuY2xhc3NOYW1lXG5cbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cihuYW1lLmxhc3RJbmRleE9mKCdmYS0nKSArIDMpXG5cbiAgICAgIHJlcXVpcmUoJy4vbW9kYWxzLycgKyBtYXBwaW5nW25hbWVdKShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5ib3ggLmNvbnRlbnQnKSlcbiAgICB9KVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9idXR0b24tY2xpY2suanMiLCJpbXBvcnQgYm9vbGVhbiBmcm9tICdib29sZWFuJ1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi91dGlscy9jb25maWcnXG5pbXBvcnQgc2VhcmNoQXBpIGZyb20gJy4uL2NvbXBvbmVudHMvc2VhcmNoJ1xuXG4vKipcbiAqIExpc3RlbiBmb3IgZmFjZWJvb2sgc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuY29uc3Qgc2VhcmNoID0gKCkgPT4ge1xuICBjb25zdCBmYlNlYXJjaElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJxXCJdJylcblxuICBpZiAoMiA+IGZiU2VhcmNoSW5wdXRzLmxlbmd0aCAmJiAhIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNxJykpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChzZWFyY2gsIDEwMDApXG4gIH0gZWxzZSB7XG4gICAgZmJTZWFyY2hJbnB1dHMuaXRlbShmYlNlYXJjaElucHV0cy5sZW5ndGggLSAxKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBjb25zdCBrZXl3b3JkID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1zZWFyY2gtaW5wdXQnKS52YWx1ZSA9IGtleXdvcmRcblxuICAgICAgaWYgKCEga2V5d29yZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbmZpZy5nZXQoJ3NldHRpbmcuc3luYy1zZWFyY2gnLCBzeW5jID0+IHtcbiAgICAgICAgaWYgKGJvb2xlYW4oc3luYykpIHtcbiAgICAgICAgICBzZWFyY2hBcGkoa2V5d29yZClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZhY2Vib29rLXNlYXJjaC5qcyIsImltcG9ydCBib29sZWFuIGZyb20gJ2Jvb2xlYW4nXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uL3V0aWxzL2NvbmZpZydcbmltcG9ydCBwYXJzZUZiaWQgZnJvbSAnLi9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZCdcbmltcG9ydCBpblNjcmVlbiBmcm9tICcuL2ZlZWQtaGVscGVycy9pbi1zY3JlZW4nXG5pbXBvcnQgaXNQdWJsaWMgZnJvbSAnLi9mZWVkLWhlbHBlcnMvaXMtcHVibGljJ1xuaW1wb3J0IGlzU3BvbnNvcmVkIGZyb20gJy4vZmVlZC1oZWxwZXJzL2lzLXNwb25zb3JlZCdcblxubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IGZlZWRzID0gW11cblxuICBsZXQgbGFzdFkgPSAwXG5cbiAgd2luZG93Lm9uc2Nyb2xsID0gKCkgPT4ge1xuICAgIGlmICgnLycgIT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbGFzdFkgPSAwXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltpZF49XCJoeXBlcmZlZWRfc3RvcnlfaWRcIl0nKS5mb3JFYWNoKGZlZWQgPT4ge1xuICAgICAgaWYgKGlzU3BvbnNvcmVkKGZlZWQpKSB7XG4gICAgICAgIHJldHVybiBjb25maWcuZ2V0KCdzZXR0aW5nLnJlbW92ZS1hZCcsIHJlbW92ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGJvb2xlYW4ocmVtb3ZlKSAmJiBmZWVkLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGlzUHVibGljKGZlZWQpKSB7XG4gICAgICAgIGNvbnN0IGZiaWQgPSBwYXJzZUZiaWQoZmVlZC5xdWVyeVNlbGVjdG9yKCdkaXYgc3BhbiBzcGFuIGE6bm90KFtkYXRhLWhvdmVyY2FyZC1wcmVmZXItbW9yZS1jb250ZW50LXNob3ddKScpLmhyZWYpXG5cbiAgICAgICAgaWYgKGZiaWQpIHtcbiAgICAgICAgICBpZiAoISBmZWVkcy5pbmNsdWRlcyhmYmlkKSkge1xuICAgICAgICAgICAgZmVlZHMucHVzaChmYmlkKVxuXG4gICAgICAgICAgICBjb25maWcuc2V0KCdmZWVkcycsIGZlZWRzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpblNjcmVlbihmZWVkKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMCA+IHdpbmRvdy5zY3JvbGxZIC0gbGFzdFkgPyAnYmFjaycgOiAnJywgZmJpZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGFzdFkgPSB3aW5kb3cuc2Nyb2xsWVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL3VzZXItZmVlZC5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIGluIHNjcmVlbiBvciBub3QuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBjb25zdCByZWN0ID0gZmVlZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuXG4gIGNvbnN0IHNjcmVlbiA9IHtcbiAgICB0b3A6IHdpbmRvdy5zY3JvbGxZLFxuICAgIGJvdHRvbTogd2luZG93LnNjcm9sbFkgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0XG4gIH1cblxuICBjb25zdCBlbCA9IHtcbiAgICB0b3A6IGZlZWQub2Zmc2V0VG9wICsgcmVjdC5oZWlnaHQgLyAzLFxuICAgIGJvdHRvbTogZmVlZC5vZmZzZXRUb3AgKyByZWN0LmhlaWdodCAvIDMgKiAyXG4gIH1cblxuICBpZiAoZWwudG9wID4gc2NyZWVuLnRvcCAmJiBlbC50b3AgPCBzY3JlZW4uYm90dG9tKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfSBlbHNlIGlmIChlbC5ib3R0b20gPiBzY3JlZW4udG9wICYmIGVsLmJvdHRvbSA8IHNjcmVlbi5ib3R0b20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pbi1zY3JlZW4uanMiLCIvKipcbiAqIERldGVybWluZSB0aGUgZmVlZCBpcyBwdWJsaWMgb3Igbm90LlxuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGZlZWQpID0+IHtcbiAgbGV0IHByaXZhY3kgPSBmZWVkLnF1ZXJ5U2VsZWN0b3IoJ2FbZGF0YS1ob3Zlcj1cInRvb2x0aXBcIl1bY2xhc3MqPVwiUHJpdmFjeVwiXSwgZGl2W2RhdGEtaG92ZXI9XCJ0b29sdGlwXCJdJylcblxuICBpZiAoISBwcml2YWN5KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBwcml2YWN5ID0gcHJpdmFjeS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdG9vbHRpcC1jb250ZW50JylcblxuICByZXR1cm4gcHJpdmFjeS5pbmNsdWRlcygnUHVibGljJykgfHwgcHJpdmFjeS5pbmNsdWRlcygn5YWs6ZaLJylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXB1YmxpYy5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIHNwb25zb3JlZCBvciBub3QuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBjb25zdCBpc1Nwb25zb3JlZCA9IGZlZWQucXVlcnlTZWxlY3RvcignYVtocmVmXj1cImh0dHBzOi8vbC5mYWNlYm9vay5jb20vbC5waHBcIl0nKVxuXG4gIGlmICghIGlzU3BvbnNvcmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzd2l0Y2ggKGlzU3BvbnNvcmVkLmlubmVyVGV4dCkge1xuICAgIGNhc2UgJ1Nwb25zb3JlZCc6XG4gICAgY2FzZSAn6LSK5YqpJzpcbiAgICBjYXNlICfluoPlkYonOlxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkLmpzIiwiaW1wb3J0IHVybFBhcnNlIGZyb20gJ3VybC1wYXJzZSdcblxuY29uc3QgcGFyc2VkVXJscyA9IHt9XG5cbi8qKlxuICogUGFyc2UgZmJpZCBmcm9tIHVybC5cbiAqXG4gKiBAcmV0dXJucyBzdHJpbmd8bnVsbFxuICovXG5jb25zdCBmcm9tVXJsID0gdXJsID0+IHtcbiAgaWYgKHBhcnNlZFVybHMuaGFzT3duUHJvcGVydHkodXJsKSkge1xuICAgIHJldHVybiBwYXJzZWRVcmxzW3VybF1cbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IHVybFBhcnNlKHVybCwgdHJ1ZSlcbiAgY29uc3QgcXVlcnkgPSBwYXJzZWQucXVlcnlcbiAgY29uc3QgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWUucmVwbGFjZSgvXFwvKyQvLCAnJylcblxuICBsZXQgcmVzdWx0XG5cbiAgaWYgKHBhdGhuYW1lLmVuZHNXaXRoKCc6MycpIHx8IHBhdGhuYW1lLmVuZHNXaXRoKCc6MCcpKSB7XG4gICAgcmVzdWx0ID0gbnVsbFxuICB9IGVsc2UgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KCdzdG9yeV9mYmlkJykpIHtcbiAgICByZXN1bHQgPSBxdWVyeS5zdG9yeV9mYmlkXG4gIH0gZWxzZSBpZiAocXVlcnkuaGFzT3duUHJvcGVydHkoJ2ZiaWQnKSkge1xuICAgIHJlc3VsdCA9IHF1ZXJ5LmZiaWRcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBwYXRobmFtZS5zbGljZShwYXRobmFtZS5sYXN0SW5kZXhPZignLycpICsgMSlcbiAgfVxuXG4gIHBhcnNlZFVybHNbdXJsXSA9IHJlc3VsdFxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBQYXJzZSBmYmlkIGZyb20gZ2l2ZW4gdmFsdWUuXG4gKlxuICogQHJldHVybnMgc3RyaW5nfG51bGxcbiAqL1xuZXhwb3J0IGRlZmF1bHQgdmFsID0+IHtcbiAgaWYgKHZhbC5tYXRjaCgvKFxcYihodHRwcz8pOlxcL1xcL1stQS1aMC05KyZAI1xcLyU/PX5ffCE6LC47XSpbLUEtWjAtOSsmQCNcXC8lPX5ffF0pL2lnKSkge1xuICAgIHJldHVybiBmcm9tVXJsKHZhbClcbiAgfVxuXG4gIGNvbnNvbGUuZXJyb3IoYGZiaWQgdW5rbm93biB0eXBlOiAke3ZhbH1gKVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9wYXJzZS1mYmlkLmpzIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuY29uc3QgaXNPYmogPSByZXF1aXJlKCdpcy1vYmonKTtcblxuZnVuY3Rpb24gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpIHtcblx0Y29uc3QgcGF0aEFyciA9IHBhdGguc3BsaXQoJy4nKTtcblx0Y29uc3QgcGFydHMgPSBbXTtcblxuXHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRsZXQgcCA9IHBhdGhBcnJbaV07XG5cblx0XHR3aGlsZSAocFtwLmxlbmd0aCAtIDFdID09PSAnXFxcXCcgJiYgcGF0aEFycltpICsgMV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cCA9IHAuc2xpY2UoMCwgLTEpICsgJy4nO1xuXHRcdFx0cCArPSBwYXRoQXJyWysraV07XG5cdFx0fVxuXG5cdFx0cGFydHMucHVzaChwKTtcblx0fVxuXG5cdHJldHVybiBwYXJ0cztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGdldChvYmosIHBhdGgsIHZhbHVlKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgPyBvYmogOiB2YWx1ZTtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHBhdGhBcnJbaV0pKSB7XG5cdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BhdGhBcnJbaV1dO1xuXG5cdFx0XHRpZiAob2JqID09PSB1bmRlZmluZWQgfHwgb2JqID09PSBudWxsKSB7XG5cdFx0XHRcdC8vIGBvYmpgIGlzIGVpdGhlciBgdW5kZWZpbmVkYCBvciBgbnVsbGAgc28gd2Ugd2FudCB0byBzdG9wIHRoZSBsb29wLCBhbmRcblx0XHRcdFx0Ly8gaWYgdGhpcyBpcyBub3QgdGhlIGxhc3QgYml0IG9mIHRoZSBwYXRoLCBhbmRcblx0XHRcdFx0Ly8gaWYgaXQgZGlkJ3QgcmV0dXJuIGB1bmRlZmluZWRgXG5cdFx0XHRcdC8vIGl0IHdvdWxkIHJldHVybiBgbnVsbGAgaWYgYG9iamAgaXMgYG51bGxgXG5cdFx0XHRcdC8vIGJ1dCB3ZSB3YW50IGBnZXQoe2ZvbzogbnVsbH0sICdmb28uYmFyJylgIHRvIGVxdWFsIGB1bmRlZmluZWRgLCBvciB0aGUgc3VwcGxpZWQgdmFsdWUsIG5vdCBgbnVsbGBcblx0XHRcdFx0aWYgKGkgIT09IHBhdGhBcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdHJldHVybiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBvYmo7XG5cdH0sXG5cblx0c2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcCA9IHBhdGhBcnJbaV07XG5cblx0XHRcdGlmICghaXNPYmoob2JqW3BdKSkge1xuXHRcdFx0XHRvYmpbcF0gPSB7fTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGkgPT09IHBhdGhBcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRvYmpbcF0gPSB2YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BdO1xuXHRcdH1cblx0fSxcblxuXHRkZWxldGUob2JqLCBwYXRoKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHAgPSBwYXRoQXJyW2ldO1xuXG5cdFx0XHRpZiAoaSA9PT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdGRlbGV0ZSBvYmpbcF07XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0b2JqID0gb2JqW3BdO1xuXG5cdFx0XHRpZiAoIWlzT2JqKG9iaikpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblx0fSxcblxuXHRoYXMob2JqLCBwYXRoKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChpc09iaihvYmopKSB7XG5cdFx0XHRcdGlmICghKHBhdGhBcnJbaV0gaW4gb2JqKSkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG9iaiA9IG9ialtwYXRoQXJyW2ldXTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9kb3QtcHJvcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoeCkge1xuXHR2YXIgdHlwZSA9IHR5cGVvZiB4O1xuXHRyZXR1cm4geCAhPT0gbnVsbCAmJiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJyk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2lzLW9iai9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBTaW1wbGUgcXVlcnkgc3RyaW5nIHBhcnNlci5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIHF1ZXJ5IHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIHBhcnNlZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZyhxdWVyeSkge1xuICB2YXIgcGFyc2VyID0gLyhbXj0/Jl0rKT0/KFteJl0qKS9nXG4gICAgLCByZXN1bHQgPSB7fVxuICAgICwgcGFydDtcblxuICAvL1xuICAvLyBMaXR0bGUgbmlmdHkgcGFyc2luZyBoYWNrLCBsZXZlcmFnZSB0aGUgZmFjdCB0aGF0IFJlZ0V4cC5leGVjIGluY3JlbWVudHNcbiAgLy8gdGhlIGxhc3RJbmRleCBwcm9wZXJ0eSBzbyB3ZSBjYW4gY29udGludWUgZXhlY3V0aW5nIHRoaXMgbG9vcCB1bnRpbCB3ZSd2ZVxuICAvLyBwYXJzZWQgYWxsIHJlc3VsdHMuXG4gIC8vXG4gIGZvciAoO1xuICAgIHBhcnQgPSBwYXJzZXIuZXhlYyhxdWVyeSk7XG4gICAgcmVzdWx0W2RlY29kZVVSSUNvbXBvbmVudChwYXJ0WzFdKV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFydFsyXSlcbiAgKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW107XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkgKyc9JysgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtrZXldKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9xdWVyeXN0cmluZ2lmeS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlJ3JlIHJlcXVpcmVkIHRvIGFkZCBhIHBvcnQgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkZWZhdWx0LXBvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gcG9ydCBQb3J0IG51bWJlciB3ZSBuZWVkIHRvIGNoZWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgd2UgbmVlZCB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGl0IGEgZGVmYXVsdCBwb3J0IGZvciB0aGUgZ2l2ZW4gcHJvdG9jb2xcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcXVpcmVkKHBvcnQsIHByb3RvY29sKSB7XG4gIHByb3RvY29sID0gcHJvdG9jb2wuc3BsaXQoJzonKVswXTtcbiAgcG9ydCA9ICtwb3J0O1xuXG4gIGlmICghcG9ydCkgcmV0dXJuIGZhbHNlO1xuXG4gIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwJzpcbiAgICBjYXNlICd3cyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDgwO1xuXG4gICAgY2FzZSAnaHR0cHMnOlxuICAgIGNhc2UgJ3dzcyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDQ0MztcblxuICAgIGNhc2UgJ2Z0cCc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDIxO1xuXG4gICAgY2FzZSAnZ29waGVyJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNzA7XG5cbiAgICBjYXNlICdmaWxlJzpcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcG9ydCAhPT0gMDtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmVxdWlyZXMtcG9ydC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2xhc2hlcyA9IC9eW0EtWmEtel1bQS1aYS16MC05Ky0uXSo6XFwvXFwvLztcblxuLyoqXG4gKiBUaGVzZSBwcm9wZXJ0aWVzIHNob3VsZCBub3QgYmUgY29waWVkIG9yIGluaGVyaXRlZCBmcm9tLiBUaGlzIGlzIG9ubHkgbmVlZGVkXG4gKiBmb3IgYWxsIG5vbiBibG9iIFVSTCdzIGFzIGEgYmxvYiBVUkwgZG9lcyBub3QgaW5jbHVkZSBhIGhhc2gsIG9ubHkgdGhlXG4gKiBvcmlnaW4uXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZhciBpZ25vcmUgPSB7IGhhc2g6IDEsIHF1ZXJ5OiAxIH1cbiAgLCBVUkw7XG5cbi8qKlxuICogVGhlIGxvY2F0aW9uIG9iamVjdCBkaWZmZXJzIHdoZW4geW91ciBjb2RlIGlzIGxvYWRlZCB0aHJvdWdoIGEgbm9ybWFsIHBhZ2UsXG4gKiBXb3JrZXIgb3IgdGhyb3VnaCBhIHdvcmtlciB1c2luZyBhIGJsb2IuIEFuZCB3aXRoIHRoZSBibG9iYmxlIGJlZ2lucyB0aGVcbiAqIHRyb3VibGUgYXMgdGhlIGxvY2F0aW9uIG9iamVjdCB3aWxsIGNvbnRhaW4gdGhlIFVSTCBvZiB0aGUgYmxvYiwgbm90IHRoZVxuICogbG9jYXRpb24gb2YgdGhlIHBhZ2Ugd2hlcmUgb3VyIGNvZGUgaXMgbG9hZGVkIGluLiBUaGUgYWN0dWFsIG9yaWdpbiBpc1xuICogZW5jb2RlZCBpbiB0aGUgYHBhdGhuYW1lYCBzbyB3ZSBjYW4gdGhhbmtmdWxseSBnZW5lcmF0ZSBhIGdvb2QgXCJkZWZhdWx0XCJcbiAqIGxvY2F0aW9uIGZyb20gaXQgc28gd2UgY2FuIGdlbmVyYXRlIHByb3BlciByZWxhdGl2ZSBVUkwncyBhZ2Fpbi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGxvYyBPcHRpb25hbCBkZWZhdWx0IGxvY2F0aW9uIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IGxvbGNhdGlvbiBvYmplY3QuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvbGNhdGlvbihsb2MpIHtcbiAgbG9jID0gbG9jIHx8IGdsb2JhbC5sb2NhdGlvbiB8fCB7fTtcbiAgVVJMID0gVVJMIHx8IHJlcXVpcmUoJy4vJyk7XG5cbiAgdmFyIGZpbmFsZGVzdGluYXRpb24gPSB7fVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NcbiAgICAsIGtleTtcblxuICBpZiAoJ2Jsb2I6JyA9PT0gbG9jLnByb3RvY29sKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVUkwodW5lc2NhcGUobG9jLnBhdGhuYW1lKSwge30pO1xuICB9IGVsc2UgaWYgKCdzdHJpbmcnID09PSB0eXBlKSB7XG4gICAgZmluYWxkZXN0aW5hdGlvbiA9IG5ldyBVUkwobG9jLCB7fSk7XG4gICAgZm9yIChrZXkgaW4gaWdub3JlKSBkZWxldGUgZmluYWxkZXN0aW5hdGlvbltrZXldO1xuICB9IGVsc2UgaWYgKCdvYmplY3QnID09PSB0eXBlKSB7XG4gICAgZm9yIChrZXkgaW4gbG9jKSB7XG4gICAgICBpZiAoa2V5IGluIGlnbm9yZSkgY29udGludWU7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uW2tleV0gPSBsb2Nba2V5XTtcbiAgICB9XG5cbiAgICBpZiAoZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9IHNsYXNoZXMudGVzdChsb2MuaHJlZik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbmFsZGVzdGluYXRpb247XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3VybC1wYXJzZS9sb2xjYXRpb24uanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2hpc3RvcnlcIjogNyxcblx0XCIuL2hpc3RvcnkuanNcIjogNyxcblx0XCIuL2hvdHRlc3RcIjogOCxcblx0XCIuL2hvdHRlc3QuanNcIjogOCxcblx0XCIuL2hvdHRlc3QvcG9zdHNcIjogMixcblx0XCIuL2hvdHRlc3QvcG9zdHMuanNcIjogMixcblx0XCIuL3NldHRpbmdcIjogOSxcblx0XCIuL3NldHRpbmcuanNcIjogOSxcblx0XCIuL3N0YXRpc3RpY3NcIjogMTAsXG5cdFwiLi9zdGF0aXN0aWNzLmpzXCI6IDEwXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA0OTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHVwVG8gZnJvbSAnLi4vdXRpbHMvdXAtdG8nXG5cbmRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgaWYgKCdpbnRlcmFjdGl2ZScgPT09IGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICBjb25zdCBkb20gPSAoKCkgPT4ge1xuICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwic2VhcmNoXCJdJylcblxuICAgICAgaWYgKCEgZG9tKSB7XG4gICAgICAgIGRvbSA9IHVwVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtyb2xlPVwic2VhcmNoXCJdJyksICdkaXYnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdXBUbyhkb20sICdkaXYnKVxuICAgIH0pKClcblxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL2hvb2snKSgpXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvbmF2YmFyJykoZG9tKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXInKShkb20pXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvYnV0dG9uJykoKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL21vZGFsJykoKVxuXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2gnKSgpXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy9idXR0b24tY2xpY2snKSgpXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy91c2VyLWZlZWQnKSgpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5kZXguanMiXSwic291cmNlUm9vdCI6IiJ9