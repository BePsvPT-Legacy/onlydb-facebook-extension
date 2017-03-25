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
 * @return {*}|null
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

    // 防止 race condition
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

        // 透過 postMessage 呼叫 facebook sdk 來渲染動態
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
   * @return void
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
   * @return void
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

/**
 * Fetch search api.
 *
 * @param keyword
 * @param page
 *
 * @return void
 */
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

/**
 * Open hottest modal.
 *
 * @param dom
 *
 * @return void
 */
module.exports = function (dom) {
  dom.innerHTML = '\n<div class="hottest-section">\n  <div style="margin-left: 1.5rem; margin-top: 1rem;">\n    <h1 style="display: inline;">\u71B1\u9580\u52D5\u614B</h1>\n    <i class="fa fa-spinner fa-pulse fa-fw loading" style="color: orange; display: none;"></i>\n  </div>\n  \n  <div class="posts"></div>\n</div>\n';

  _posts2.default.status.page = 1;
  _posts2.default.load();

  // 瀑布流
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

/**
 * Render setting html dom.
 *
 * @param setting
 *
 * @return string
 */
var render = function render(setting) {
  var table = [{ title: '精選動態', description: '於動態時報上嵌入我們精選的熱門動態', key: 'featured-feed' }, { title: '移除廣告', description: '於動態時報上移除為贊助的動態', key: 'remove-ad' }, { title: '同步搜尋', description: '於臉書搜尋時，一並於我們專屬資料庫中搜尋', key: 'sync-search' }];

  return table.reduce(function (html, item) {
    return html + ('\n<div class="setting-section">\n  <div class="title">\n    <b>' + item.title + '</b>\n  </div>\n  \n  <div class="description">\n    <span>' + item.description + '</span>\n  </div>\n  \n  <div class="operation">\n    <span class="success-icon">\n      <i class="fa fa-check" aria-hidden="true"></i>\n    </span>\n    \n    <select id="' + item.key + '">\n        <option value="0">Off</option>\n        <option value="1" ' + ((0, _boolean2.default)(setting[item.key]) ? 'selected' : '') + '>On</option>\n    </select>\n  </div>\n</div>');
  }, '');
};

/**
 * Open setting modal.
 *
 * @param dom
 *
 * @return void
 */
module.exports = function (dom) {
  _config2.default.get('setting', function (setting) {
    dom.innerHTML = render(setting);

    // 監聽設定更改
    document.querySelectorAll('.custom-modal .box .content .setting-section .operation select').forEach(function (node) {
      node.addEventListener('change', function (e) {
        setting[e.target.id] = (0, _boolean2.default)(e.target.value);

        _config2.default.set('setting', setting, function () {
          // 綠色打勾的動畫特效
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
 * Create font awesome icon node.
 *
 * @param icon
 * @param name
 *
 * @return string
 */
function iconNode(icon, name) {
  return '<i class="fa fa-fw fa-' + icon + '" aria-hidden="true" data-hover="tooltip" data-tooltip-delay="350" data-tooltip-content="' + name + '"></i>';
}

/**
 * Add buttons on the right of search bar.
 *
 * @return void
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
 * 因安全限制，無法直接呼叫 facebook js function，
 * 因此將 hooks.js 新增到頁面中，透過 postMessage
 * 來間接達成此目的。
 *
 * @return void
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
 * @return void
 */
module.exports = function () {
  var node = document.createElement('div');

  node.className = 'custom-modal';
  node.style.display = 'none';
  node.innerHTML = '\n<div class="background"></div>\n\n<div class="box">\n  <div class="header">\n    <div style="margin-left: 1rem;">\n      <b id="custom-modal-title" style="font-size: 16px;"></b>\n    </div>\n    <div class="close-button">\n      <i class="fa fa-lg fa-times" aria-hidden="true"></i>\n    </div>\n  </div>\n  \n  <div class="content"></div>\n</div>';

  document.body.append(node);

  // 當 modal 關閉時，顯示 body 的滾動條以及清空 modal content
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
 * @return void
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
 * Add search bar on the right of facebook search bar.
 *
 * @param dom
 *
 * @return void
 */
module.exports = function (dom) {
  var node = document.createElement('div');

  node.className = 'custom-search-bar';
  node.innerHTML = '\n<form class="search-form">\n  <input id="custom-search-input" type="text" placeholder="Post Search">\n  <i class="fa fa-fw fa-search" aria-hidden="true"></i>\n</form>\n\n<div class="result">\n  <ul></ul>\n</div>';

  dom.append(node);

  // 當搜尋框的值是 truthy 則呼叫 search api
  document.querySelector('#custom-search-input').addEventListener('input', function (e) {
    if (e.target.value) {
      (0, _search2.default)(e.target.value);
    }
  });

  // 當點擊搜尋框外的區域，隱藏搜尋結果
  document.body.addEventListener('click', function (e) {
    var parent = (0, _upTo2.default)(e.target, 'form');

    // upTo 可能回傳 null，因此需先確保 parent 是 truthy
    if (!(parent && 'search-form' === parent.className)) {
      document.querySelector('div.custom-search-bar .result').style.display = 'none';
    }
  });
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Listen for button click.
 *
 * @return void
 */
module.exports = function () {
  document.querySelectorAll('.custom-button i').forEach(function (node) {
    node.addEventListener('click', function (e) {
      // 當點擊 plugin 的按鈕時，隱藏 body 的滾動條，
      // 避免滑鼠在 modal 外滾動時捲動頁面
      document.body.style.overflowY = 'hidden';
      document.querySelector('.custom-modal').style.display = 'block';
      document.querySelector('#custom-modal-title').innerText = e.target.dataset.tooltipContent;

      var mapping = {
        'fire': 'hottest',
        'bar-chart': 'statistics',
        'history': 'history',
        'cog': 'setting'
      };

      // 透過 button 的 class 來判斷點擊的按鈕，載入相對的 modal
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
 * @return void
 */
var search = function search() {
  var fbSearchInputs = document.querySelectorAll('input[name="q"]');

  // facebook 頁面載入過程中，html dom 會更動，因此必須等到 length 大於 2
  // 而 #q 則是繁體中文時才會有的 id，出現時即代表頁面載入完成
  if (2 > fbSearchInputs.length && !document.querySelector('#q')) {
    window.setTimeout(search, 1000);
  } else {
    // 監聽 facebook 自有的搜尋框
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

/**
 * Listen for user feeds.
 *
 * @return void
 */
module.exports = function () {
  var feeds = [];

  var lastY = 0;

  window.onscroll = function () {
    // 確保只在主畫面運行
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
 * @return boolean
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
 * @return boolean
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
 * @return boolean
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
 * @return string|null
 */
var fromUrl = function fromUrl(url) {
  // 已分析過的網址就直接從快取拿
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
 * @return string|null
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjViZDBiNGQ1MTg5Y2I2NjcxZjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3VwLXRvLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QvcG9zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jvb2xlYW4vbGliL2Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvY29tcG9uZW50cy9zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaGlzdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3NldHRpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc3RhdGlzdGljcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi91cmwtcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbmF2YmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9idXR0b24tY2xpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy91c2VyLWZlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaW4tc2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXB1YmxpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1zcG9uc29yZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fcHJvcGVydHktZGVzYy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2RvdC1wcm9wL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaXMtb2JqL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcXVlcnlzdHJpbmdpZnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZXF1aXJlcy1wb3J0L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vdXJsLXBhcnNlL2xvbGNhdGlvbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzIF5cXC5cXC8uKiQiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6WyJlbCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsInBhcmVudE5vZGUiLCJzdGF0dXMiLCJsb2FkaW5nIiwicGFnZSIsImxvYWQiLCJjYiIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInN0eWxlIiwiZGlzcGxheSIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInBvc3RzRG9tIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwicmVuZGVyIiwiZGF0YSIsInJlc3VsdCIsInJlY3MiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm5vZGUiLCJjbGFzc05hbWUiLCJ3aW5kb3ciLCJwb3N0TWVzc2FnZSIsInR5cGUiLCJyZWR1Y2UiLCJodG1sIiwiZmVlZCIsInJlYyIsInVybCIsImdldCIsImtleSIsInBvcyIsImluZGV4T2YiLCJrIiwic2xpY2UiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJpdGVtcyIsImhhc093blByb3BlcnR5Iiwic2V0IiwidmFsIiwiaW5jbHVkZXMiLCJpdGVtIiwic3Vic3RyIiwia2V5d29yZCIsInJlc3VsdERvbSIsImlubmVySFRNTCIsImFjYyIsImNvbnRlbnQiLCJkZXNjcmlwdGlvbiIsImJvZHkiLCJwYWdlX25hbWUiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9tIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImUiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInRhYmxlIiwidGl0bGUiLCJzZXR0aW5nIiwiaWQiLCJ2YWx1ZSIsIm4iLCJyZXBsYWNlIiwic2V0VGltZW91dCIsImljb25Ob2RlIiwiaWNvbiIsIm5hbWUiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kIiwianMiLCJzcmMiLCJpMThuIiwiZ2V0TWVzc2FnZSIsImhlYWQiLCJjbG9zZUV2ZW50Iiwib3ZlcmZsb3dZIiwib25jbGljayIsInBhcmVudCIsImlubmVyVGV4dCIsImRhdGFzZXQiLCJ0b29sdGlwQ29udGVudCIsIm1hcHBpbmciLCJsYXN0SW5kZXhPZiIsInJlcXVpcmUiLCJzZWFyY2giLCJmYlNlYXJjaElucHV0cyIsImxlbmd0aCIsInN5bmMiLCJmZWVkcyIsImxhc3RZIiwib25zY3JvbGwiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicmVtb3ZlIiwiZmJpZCIsImhyZWYiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsInNjcm9sbFkiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwic2NyZWVuIiwidG9wIiwiYm90dG9tIiwiZG9jdW1lbnRFbGVtZW50IiwiY2xpZW50SGVpZ2h0Iiwib2Zmc2V0VG9wIiwiaGVpZ2h0IiwicHJpdmFjeSIsImdldEF0dHJpYnV0ZSIsImlzU3BvbnNvcmVkIiwicGFyc2VkVXJscyIsImZyb21VcmwiLCJwYXJzZWQiLCJxdWVyeSIsImVuZHNXaXRoIiwic3RvcnlfZmJpZCIsIm1hdGNoIiwiZXJyb3IiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbURBQTJDLGNBQWM7O0FBRXpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7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LENBQU47QUFDRDs7QUFFRCxhQUFPLG9CQUFLbUQsR0FBTCxFQUFVLEtBQVYsQ0FBUDtBQUNELEtBUlcsRUFBWjs7QUFVQWtDLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVIsRUFBb0NsQyxHQUFwQztBQUNBa0MsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSLEVBQXdDbEMsR0FBeEM7QUFDQWtDLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7O0FBRUFBLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7QUFDQUEsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0Q7QUFDRixDQXRCRCxDIiwiZmlsZSI6ImNvbnRlbnQtc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDUwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmNWJkMGI0ZDUxODljYjY2NzFmNiIsIi8qKlxuICogRmluZCBmaXJzdCBhbmNlc3RvciBvZiBlbCB3aXRoIHRhZ05hbWUgb3IgdW5kZWZpbmVkIGlmIG5vdCBmb3VuZC5cbiAqXG4gKiBAcGFyYW0gZWxcbiAqIEBwYXJhbSB0YWdOYW1lXG4gKiBAcmV0dXJuIHsqfXxudWxsXG4gKlxuICogQHJlZmVyZW5jZSBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS82ODU3MTE2XG4gKi9cbmV4cG9ydCBkZWZhdWx0IChlbCwgdGFnTmFtZSkgPT4ge1xuICB0YWdOYW1lID0gdGFnTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgd2hpbGUgKGVsICYmIGVsLnBhcmVudE5vZGUpIHtcbiAgICBlbCA9IGVsLnBhcmVudE5vZGVcblxuICAgIGlmIChlbC50YWdOYW1lICYmIGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZSkge1xuICAgICAgcmV0dXJuIGVsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy91cC10by5qcyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICd3aGF0d2ctZmV0Y2gnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3RhdHVzOiB7XG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgcGFnZTogMVxuICB9LFxuXG4gIC8qKlxuICAgKiBMb2FkIGhvdHRlc3QgcG9zdHMuXG4gICAqXG4gICAqIEBwYXJhbSBjYlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIGxvYWQgKGNiID0gbnVsbCkge1xuICAgIC8vIOmYsuatoiByYWNlIGNvbmRpdGlvblxuICAgIGlmICh0aGlzLnN0YXR1cy5sb2FkaW5nKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLnN0YXR1cy5sb2FkaW5nID0gdHJ1ZVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiBkaXYgaS5sb2FkaW5nJykuc3R5bGUuZGlzcGxheSA9ICcnXG5cbiAgICBmZXRjaChgaHR0cHM6Ly93d3cuY3MuY2N1LmVkdS50dy9+Y3lzMTAydS9hcGkucGhwP3BhZ2U9JHt0aGlzLnN0YXR1cy5wYWdlfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3RzRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiAucG9zdHMnKVxuXG4gICAgICAgIHBvc3RzRG9tLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5yZW5kZXIoZGF0YS5yZXN1bHQucmVjcykpXG4gICAgICAgIHBvc3RzRG9tLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5mYi1wb3N0LmZiX2lmcmFtZV93aWRnZXQnKS5mb3JFYWNoKG5vZGUgPT4geyBub2RlLmNsYXNzTmFtZSA9ICcnIH0pXG5cbiAgICAgICAgaWYgKG51bGwgIT09IGNiKSB7XG4gICAgICAgICAgY2IoZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOmAj+mBjiBwb3N0TWVzc2FnZSDlkbzlj6sgZmFjZWJvb2sgc2RrIOS+hua4suafk+WLleaFi1xuICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoeyB0eXBlOiAnZW1iZWQtcG9zdHMnIH0sICcqJylcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG90dGVzdC1zZWN0aW9uIGRpdiBpLmxvYWRpbmcnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgICAgdGhpcy5zdGF0dXMubG9hZGluZyA9IGZhbHNlXG4gICAgICB9KVxuXG4gICAgICArK3RoaXMuc3RhdHVzLnBhZ2VcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBSZW5kZXIgaG90dGVzdCBwb3N0cyBodG1sLlxuICAgKlxuICAgKiBAcGFyYW0gcmVjc1xuICAgKlxuICAgKiBAcmV0dXJuIHN0cmluZ1xuICAgKi9cbiAgcmVuZGVyIChyZWNzKSB7XG4gICAgcmV0dXJuIHJlY3MucmVkdWNlKChodG1sLCBmZWVkKSA9PiB7XG4gICAgICByZXR1cm4gaHRtbCArIGA8ZGl2IGNsYXNzPVwiZmItcG9zdFwiIGRhdGEtaHJlZj1cIiR7ZmVlZC5yZWMudXJsfVwiIGRhdGEtd2lkdGg9XCIzNTBcIj48L2Rpdj5gXG4gICAgfSwgJycpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QvcG9zdHMuanMiLCJpbXBvcnQgZG90UHJvcCBmcm9tICdkb3QtcHJvcCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogR2V0IGNvbnRlbnQgZnJvbSBzdG9yYWdlIGFuZCBwYXNzIHRoZSByZXN1bHQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgZ2V0IChrZXksIGNiID0gbnVsbCkge1xuICAgIGlmIChudWxsID09PSBjYikge1xuICAgICAgW2tleSwgY2JdID0gWycnLCBrZXldXG4gICAgfVxuXG4gICAgY29uc3QgcG9zID0ga2V5LmluZGV4T2YoJy4nKVxuXG4gICAgY29uc3QgayA9ICgtMSAhPT0gcG9zID8ga2V5LnNsaWNlKDAsIHBvcykgOiBrZXkpIHx8IG51bGxcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChrLCBpdGVtcyA9PiB7XG4gICAgICBpZiAobnVsbCAhPT0gayAmJiBpdGVtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpdGVtcyA9IGl0ZW1zW2tdXG5cbiAgICAgICAgaWYgKC0xICE9PSBwb3MpIHtcbiAgICAgICAgICBpdGVtcyA9IGRvdFByb3AuZ2V0KGl0ZW1zLCBrZXkuc2xpY2UocG9zICsgMSksIHt9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiKGl0ZW1zKVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0b3JlIGNvbnRlbnQgdG8gc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsXG4gICAqIEBwYXJhbSBjYlxuICAgKlxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIHNldCAoa2V5LCB2YWwsIGNiID0gbnVsbCkge1xuICAgIGlmICghIGtleS5pbmNsdWRlcygnLicpKSB7XG4gICAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBba2V5XTogdmFsIH0sIGNiKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBwb3MgPSBrZXkuaW5kZXhPZignLicpXG5cbiAgICAgIHRoaXMuZ2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtID0+IHtcbiAgICAgICAgZG90UHJvcC5zZXQoaXRlbSwga2V5LnN1YnN0cihwb3MgKyAxKSwgdmFsKVxuXG4gICAgICAgIHRoaXMuc2V0KGtleS5zbGljZSgwLCBwb3MpLCBpdGVtLCBjYilcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvY29uZmlnLmpzIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXih0cnVlfHR8eWVzfHl8MSkkL2kudGVzdCh2YWx1ZS50cmltKCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDE7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJvb2xlYW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vbGVhbi9saWIvYm9vbGVhbi5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICd3aGF0d2ctZmV0Y2gnXG5cbi8qKlxuICogRmV0Y2ggc2VhcmNoIGFwaS5cbiAqXG4gKiBAcGFyYW0ga2V5d29yZFxuICogQHBhcmFtIHBhZ2VcbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGtleXdvcmQsIHBhZ2UgPSAxKSA9PiB7XG4gIGZldGNoKGBodHRwczovL3d3dy5jcy5jY3UuZWR1LnR3L35jeXMxMDJ1L2FwaS5waHA/dHlwZT1zZWFyY2gma2V5d29yZD0ke2tleXdvcmR9JnBhZ2U9JHtwYWdlfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGRhdGEgPT4ge1xuICAgICAgY29uc3QgcmVzdWx0RG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmN1c3RvbS1zZWFyY2gtYmFyIC5yZXN1bHQnKVxuXG4gICAgICByZXN1bHREb20ucXVlcnlTZWxlY3RvcigndWwnKS5pbm5lckhUTUwgPSBkYXRhLnJlc3VsdC5yZWNzLnJlZHVjZSgoYWNjLCByZWMpID0+IHtcbiAgICAgICAgcmVjID0gcmVjLnJlY1xuXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWMuZGVzY3JpcHRpb24gfHwgcmVjLmJvZHkgfHwgcmVjLnBhZ2VfbmFtZVxuXG4gICAgICAgIHJldHVybiBgJHthY2N9PGxpPjxhIGhyZWY9XCIke3JlYy51cmx9XCI+JHtjb250ZW50LnN1YnN0cigwLCAzMCl9PC9hPjwvbGk+YFxuICAgICAgfSwgJycpXG5cbiAgICAgIHJlc3VsdERvbS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIH0pXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2NvbXBvbmVudHMvc2VhcmNoLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoZG9tKSA9PiB7XG4gIC8vXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9oaXN0b3J5LmpzIiwiaW1wb3J0IHBvc3RzIGZyb20gJy4vaG90dGVzdC9wb3N0cydcblxuLyoqXG4gKiBPcGVuIGhvdHRlc3QgbW9kYWwuXG4gKlxuICogQHBhcmFtIGRvbVxuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgZG9tLmlubmVySFRNTCA9IGBcbjxkaXYgY2xhc3M9XCJob3R0ZXN0LXNlY3Rpb25cIj5cbiAgPGRpdiBzdHlsZT1cIm1hcmdpbi1sZWZ0OiAxLjVyZW07IG1hcmdpbi10b3A6IDFyZW07XCI+XG4gICAgPGgxIHN0eWxlPVwiZGlzcGxheTogaW5saW5lO1wiPueGsemWgOWLleaFizwvaDE+XG4gICAgPGkgY2xhc3M9XCJmYSBmYS1zcGlubmVyIGZhLXB1bHNlIGZhLWZ3IGxvYWRpbmdcIiBzdHlsZT1cImNvbG9yOiBvcmFuZ2U7IGRpc3BsYXk6IG5vbmU7XCI+PC9pPlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJwb3N0c1wiPjwvZGl2PlxuPC9kaXY+XG5gXG5cbiAgcG9zdHMuc3RhdHVzLnBhZ2UgPSAxXG4gIHBvc3RzLmxvYWQoKVxuXG4gIC8vIOeAkeW4g+a1gVxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG90dGVzdC1zZWN0aW9uIC5wb3N0cycpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGUgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XG5cbiAgICAvLyBzY3JvbGxXaWR0aCDmlbTpq5Tlr6zluqZcbiAgICAvLyBzY3JvbGxMZWZ0ICDmu77li5Xot53pm6JcbiAgICAvLyBvZmZzZXRXaWR0aCDlj6/oppblr6zluqYo5ZCrIG1hcmdpbilcbiAgICAvLyBjbGllbnRXaWR0aCDlj6/oppblr6zluqZcblxuICAgIGlmICh0YXJnZXQuc2Nyb2xsTGVmdCA+ICh0YXJnZXQuc2Nyb2xsV2lkdGggLSB0YXJnZXQuY2xpZW50V2lkdGggKiAyLjUpKSB7XG4gICAgICBwb3N0cy5sb2FkKClcbiAgICB9XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0LmpzIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSAnYm9vbGVhbidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29uZmlnJ1xuaW1wb3J0IHVwVG8gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXAtdG8nXG5cbi8qKlxuICogUmVuZGVyIHNldHRpbmcgaHRtbCBkb20uXG4gKlxuICogQHBhcmFtIHNldHRpbmdcbiAqXG4gKiBAcmV0dXJuIHN0cmluZ1xuICovXG5jb25zdCByZW5kZXIgPSBzZXR0aW5nID0+IHtcbiAgY29uc3QgdGFibGUgPSBbXG4gICAgeyB0aXRsZTogJ+eyvumBuOWLleaFiycsIGRlc2NyaXB0aW9uOiAn5pa85YuV5oWL5pmC5aCx5LiK5bWM5YWl5oiR5YCR57K+6YG455qE54ax6ZaA5YuV5oWLJywga2V5OiAnZmVhdHVyZWQtZmVlZCcgfSxcbiAgICB7IHRpdGxlOiAn56e76Zmk5buj5ZGKJywgZGVzY3JpcHRpb246ICfmlrzli5XmhYvmmYLloLHkuIrnp7vpmaTngrrotIrliqnnmoTli5XmhYsnLCBrZXk6ICdyZW1vdmUtYWQnIH0sXG4gICAgeyB0aXRsZTogJ+WQjOatpeaQnOWwiycsIGRlc2NyaXB0aW9uOiAn5pa86IeJ5pu45pCc5bCL5pmC77yM5LiA5Lim5pa85oiR5YCR5bCI5bGs6LOH5paZ5bqr5Lit5pCc5bCLJywga2V5OiAnc3luYy1zZWFyY2gnIH1cbiAgXVxuXG4gIHJldHVybiB0YWJsZS5yZWR1Y2UoKGh0bWwsIGl0ZW0pID0+IHtcbiAgICByZXR1cm4gaHRtbCArIGBcbjxkaXYgY2xhc3M9XCJzZXR0aW5nLXNlY3Rpb25cIj5cbiAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XG4gICAgPGI+JHtpdGVtLnRpdGxlfTwvYj5cbiAgPC9kaXY+XG4gIFxuICA8ZGl2IGNsYXNzPVwiZGVzY3JpcHRpb25cIj5cbiAgICA8c3Bhbj4ke2l0ZW0uZGVzY3JpcHRpb259PC9zcGFuPlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJvcGVyYXRpb25cIj5cbiAgICA8c3BhbiBjbGFzcz1cInN1Y2Nlc3MtaWNvblwiPlxuICAgICAgPGkgY2xhc3M9XCJmYSBmYS1jaGVja1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cbiAgICA8L3NwYW4+XG4gICAgXG4gICAgPHNlbGVjdCBpZD1cIiR7aXRlbS5rZXl9XCI+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIwXCI+T2ZmPC9vcHRpb24+XG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCIxXCIgJHtib29sZWFuKHNldHRpbmdbaXRlbS5rZXldKSA/ICdzZWxlY3RlZCcgOiAnJ30+T248L29wdGlvbj5cbiAgICA8L3NlbGVjdD5cbiAgPC9kaXY+XG48L2Rpdj5gXG4gIH0sICcnKVxufVxuXG4vKipcbiAqIE9wZW4gc2V0dGluZyBtb2RhbC5cbiAqXG4gKiBAcGFyYW0gZG9tXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICBjb25maWcuZ2V0KCdzZXR0aW5nJywgc2V0dGluZyA9PiB7XG4gICAgZG9tLmlubmVySFRNTCA9IHJlbmRlcihzZXR0aW5nKVxuXG4gICAgLy8g55uj6IG96Kit5a6a5pu05pS5XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1tb2RhbCAuYm94IC5jb250ZW50IC5zZXR0aW5nLXNlY3Rpb24gLm9wZXJhdGlvbiBzZWxlY3QnKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgICAgICAgc2V0dGluZ1tlLnRhcmdldC5pZF0gPSBib29sZWFuKGUudGFyZ2V0LnZhbHVlKVxuXG4gICAgICAgIGNvbmZpZy5zZXQoJ3NldHRpbmcnLCBzZXR0aW5nLCAoKSA9PiB7XG4gICAgICAgICAgLy8g57ag6Imy5omT5Yu+55qE5YuV55Wr54m55pWIXG4gICAgICAgICAgY29uc3QgbiA9IHVwVG8oZS50YXJnZXQsICdkaXYnKS5xdWVyeVNlbGVjdG9yKCdzcGFuJylcblxuICAgICAgICAgIG4uY2xhc3NOYW1lID0gbi5jbGFzc05hbWUucmVwbGFjZSgvID9hbmkvZywgJycpXG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbi5jbGFzc05hbWUgKz0gJyBhbmknIH0sIDEpXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0pXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zZXR0aW5nLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoZG9tKSA9PiB7XG4gIC8vXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zdGF0aXN0aWNzLmpzIiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1aXJlZCA9IHJlcXVpcmUoJ3JlcXVpcmVzLXBvcnQnKVxuICAsIGxvbGNhdGlvbiA9IHJlcXVpcmUoJy4vbG9sY2F0aW9uJylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBwcm90b2NvbHJlID0gL14oW2Etel1bYS16MC05ListXSo6KT8oXFwvXFwvKT8oW1xcU1xcc10qKS9pO1xuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgcGFyc2UgcnVsZXMgZm9yIHRoZSBVUkwgcGFyc2VyLCBpdCBpbmZvcm1zIHRoZSBwYXJzZXJcbiAqIGFib3V0OlxuICpcbiAqIDAuIFRoZSBjaGFyIGl0IE5lZWRzIHRvIHBhcnNlLCBpZiBpdCdzIGEgc3RyaW5nIGl0IHNob3VsZCBiZSBkb25lIHVzaW5nXG4gKiAgICBpbmRleE9mLCBSZWdFeHAgdXNpbmcgZXhlYyBhbmQgTmFOIG1lYW5zIHNldCBhcyBjdXJyZW50IHZhbHVlLlxuICogMS4gVGhlIHByb3BlcnR5IHdlIHNob3VsZCBzZXQgd2hlbiBwYXJzaW5nIHRoaXMgdmFsdWUuXG4gKiAyLiBJbmRpY2F0aW9uIGlmIGl0J3MgYmFja3dhcmRzIG9yIGZvcndhcmQgcGFyc2luZywgd2hlbiBzZXQgYXMgbnVtYmVyIGl0J3NcbiAqICAgIHRoZSB2YWx1ZSBvZiBleHRyYSBjaGFycyB0aGF0IHNob3VsZCBiZSBzcGxpdCBvZmYuXG4gKiAzLiBJbmhlcml0IGZyb20gbG9jYXRpb24gaWYgbm9uIGV4aXN0aW5nIGluIHRoZSBwYXJzZXIuXG4gKiA0LiBgdG9Mb3dlckNhc2VgIHRoZSByZXN1bHRpbmcgdmFsdWUuXG4gKi9cbnZhciBydWxlcyA9IFtcbiAgWycjJywgJ2hhc2gnXSwgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnPycsICdxdWVyeSddLCAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJy8nLCAncGF0aG5hbWUnXSwgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWydAJywgJ2F1dGgnLCAxXSwgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGZyb250LlxuICBbTmFOLCAnaG9zdCcsIHVuZGVmaW5lZCwgMSwgMV0sICAgICAgIC8vIFNldCBsZWZ0IG92ZXIgdmFsdWUuXG4gIFsvOihcXGQrKSQvLCAncG9ydCcsIHVuZGVmaW5lZCwgMV0sICAgIC8vIFJlZ0V4cCB0aGUgYmFjay5cbiAgW05hTiwgJ2hvc3RuYW1lJywgdW5kZWZpbmVkLCAxLCAxXSAgICAvLyBTZXQgbGVmdCBvdmVyLlxuXTtcblxuLyoqXG4gKiBAdHlwZWRlZiBQcm90b2NvbEV4dHJhY3RcbiAqIEB0eXBlIE9iamVjdFxuICogQHByb3BlcnR5IHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIG1hdGNoZWQgaW4gdGhlIFVSTCwgaW4gbG93ZXJjYXNlLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBzbGFzaGVzIGB0cnVlYCBpZiBwcm90b2NvbCBpcyBmb2xsb3dlZCBieSBcIi8vXCIsIGVsc2UgYGZhbHNlYC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSByZXN0IFJlc3Qgb2YgdGhlIFVSTCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBwcm90b2NvbC5cbiAqL1xuXG4vKipcbiAqIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gZnJvbSBhIFVSTCB3aXRoL3dpdGhvdXQgZG91YmxlIHNsYXNoIChcIi8vXCIpLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIGV4dHJhY3QgZnJvbS5cbiAqIEByZXR1cm4ge1Byb3RvY29sRXh0cmFjdH0gRXh0cmFjdGVkIGluZm9ybWF0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RQcm90b2NvbChhZGRyZXNzKSB7XG4gIHZhciBtYXRjaCA9IHByb3RvY29scmUuZXhlYyhhZGRyZXNzKTtcblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJyxcbiAgICBzbGFzaGVzOiAhIW1hdGNoWzJdLFxuICAgIHJlc3Q6IG1hdGNoWzNdXG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIHJlbGF0aXZlIFVSTCBwYXRobmFtZSBhZ2FpbnN0IGEgYmFzZSBVUkwgcGF0aG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aXZlIFBhdGhuYW1lIG9mIHRoZSByZWxhdGl2ZSBVUkwuXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZSBQYXRobmFtZSBvZiB0aGUgYmFzZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlc29sdmVkIHBhdGhuYW1lLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmUocmVsYXRpdmUsIGJhc2UpIHtcbiAgdmFyIHBhdGggPSAoYmFzZSB8fCAnLycpLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmNvbmNhdChyZWxhdGl2ZS5zcGxpdCgnLycpKVxuICAgICwgaSA9IHBhdGgubGVuZ3RoXG4gICAgLCBsYXN0ID0gcGF0aFtpIC0gMV1cbiAgICAsIHVuc2hpZnQgPSBmYWxzZVxuICAgICwgdXAgPSAwO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAocGF0aFtpXSA9PT0gJy4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKHBhdGhbaV0gPT09ICcuLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBpZiAoaSA9PT0gMCkgdW5zaGlmdCA9IHRydWU7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgaWYgKHVuc2hpZnQpIHBhdGgudW5zaGlmdCgnJyk7XG4gIGlmIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgcGF0aC5wdXNoKCcnKTtcblxuICByZXR1cm4gcGF0aC5qb2luKCcvJyk7XG59XG5cbi8qKlxuICogVGhlIGFjdHVhbCBVUkwgaW5zdGFuY2UuIEluc3RlYWQgb2YgcmV0dXJuaW5nIGFuIG9iamVjdCB3ZSd2ZSBvcHRlZC1pbiB0b1xuICogY3JlYXRlIGFuIGFjdHVhbCBjb25zdHJ1Y3RvciBhcyBpdCdzIG11Y2ggbW9yZSBtZW1vcnkgZWZmaWNpZW50IGFuZFxuICogZmFzdGVyIGFuZCBpdCBwbGVhc2VzIG15IE9DRC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2NhdGlvbiBMb2NhdGlvbiBkZWZhdWx0cyBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHBhcnNlciBQYXJzZXIgZm9yIHRoZSBxdWVyeSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBVUkwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVVJMKSkge1xuICAgIHJldHVybiBuZXcgVVJMKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpO1xuICB9XG5cbiAgdmFyIHJlbGF0aXZlLCBleHRyYWN0ZWQsIHBhcnNlLCBpbnN0cnVjdGlvbiwgaW5kZXgsIGtleVxuICAgICwgaW5zdHJ1Y3Rpb25zID0gcnVsZXMuc2xpY2UoKVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NhdGlvblxuICAgICwgdXJsID0gdGhpc1xuICAgICwgaSA9IDA7XG5cbiAgLy9cbiAgLy8gVGhlIGZvbGxvd2luZyBpZiBzdGF0ZW1lbnRzIGFsbG93cyB0aGlzIG1vZHVsZSB0d28gaGF2ZSBjb21wYXRpYmlsaXR5IHdpdGhcbiAgLy8gMiBkaWZmZXJlbnQgQVBJOlxuICAvL1xuICAvLyAxLiBOb2RlLmpzJ3MgYHVybC5wYXJzZWAgYXBpIHdoaWNoIGFjY2VwdHMgYSBVUkwsIGJvb2xlYW4gYXMgYXJndW1lbnRzXG4gIC8vICAgIHdoZXJlIHRoZSBib29sZWFuIGluZGljYXRlcyB0aGF0IHRoZSBxdWVyeSBzdHJpbmcgc2hvdWxkIGFsc28gYmUgcGFyc2VkLlxuICAvL1xuICAvLyAyLiBUaGUgYFVSTGAgaW50ZXJmYWNlIG9mIHRoZSBicm93c2VyIHdoaWNoIGFjY2VwdHMgYSBVUkwsIG9iamVjdCBhc1xuICAvLyAgICBhcmd1bWVudHMuIFRoZSBzdXBwbGllZCBvYmplY3Qgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHQgdmFsdWVzIC8gZmFsbC1iYWNrXG4gIC8vICAgIGZvciByZWxhdGl2ZSBwYXRocy5cbiAgLy9cbiAgaWYgKCdvYmplY3QnICE9PSB0eXBlICYmICdzdHJpbmcnICE9PSB0eXBlKSB7XG4gICAgcGFyc2VyID0gbG9jYXRpb247XG4gICAgbG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgaWYgKHBhcnNlciAmJiAnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyc2VyKSBwYXJzZXIgPSBxcy5wYXJzZTtcblxuICBsb2NhdGlvbiA9IGxvbGNhdGlvbihsb2NhdGlvbik7XG5cbiAgLy9cbiAgLy8gRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBiZWZvcmUgcnVubmluZyB0aGUgaW5zdHJ1Y3Rpb25zLlxuICAvL1xuICBleHRyYWN0ZWQgPSBleHRyYWN0UHJvdG9jb2woYWRkcmVzcyB8fCAnJyk7XG4gIHJlbGF0aXZlID0gIWV4dHJhY3RlZC5wcm90b2NvbCAmJiAhZXh0cmFjdGVkLnNsYXNoZXM7XG4gIHVybC5zbGFzaGVzID0gZXh0cmFjdGVkLnNsYXNoZXMgfHwgcmVsYXRpdmUgJiYgbG9jYXRpb24uc2xhc2hlcztcbiAgdXJsLnByb3RvY29sID0gZXh0cmFjdGVkLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sIHx8ICcnO1xuICBhZGRyZXNzID0gZXh0cmFjdGVkLnJlc3Q7XG5cbiAgLy9cbiAgLy8gV2hlbiB0aGUgYXV0aG9yaXR5IGNvbXBvbmVudCBpcyBhYnNlbnQgdGhlIFVSTCBzdGFydHMgd2l0aCBhIHBhdGhcbiAgLy8gY29tcG9uZW50LlxuICAvL1xuICBpZiAoIWV4dHJhY3RlZC5zbGFzaGVzKSBpbnN0cnVjdGlvbnNbMl0gPSBbLyguKikvLCAncGF0aG5hbWUnXTtcblxuICBmb3IgKDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIHBhcnNlID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAga2V5ID0gaW5zdHJ1Y3Rpb25bMV07XG5cbiAgICBpZiAocGFyc2UgIT09IHBhcnNlKSB7XG4gICAgICB1cmxba2V5XSA9IGFkZHJlc3M7XG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhcnNlKSB7XG4gICAgICBpZiAofihpbmRleCA9IGFkZHJlc3MuaW5kZXhPZihwYXJzZSkpKSB7XG4gICAgICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGluc3RydWN0aW9uWzJdKSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZShpbmRleCArIGluc3RydWN0aW9uWzJdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKGluZGV4ID0gcGFyc2UuZXhlYyhhZGRyZXNzKSkpIHtcbiAgICAgIHVybFtrZXldID0gaW5kZXhbMV07XG4gICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleC5pbmRleCk7XG4gICAgfVxuXG4gICAgdXJsW2tleV0gPSB1cmxba2V5XSB8fCAoXG4gICAgICByZWxhdGl2ZSAmJiBpbnN0cnVjdGlvblszXSA/IGxvY2F0aW9uW2tleV0gfHwgJycgOiAnJ1xuICAgICk7XG5cbiAgICAvL1xuICAgIC8vIEhvc3RuYW1lLCBob3N0IGFuZCBwcm90b2NvbCBzaG91bGQgYmUgbG93ZXJjYXNlZCBzbyB0aGV5IGNhbiBiZSB1c2VkIHRvXG4gICAgLy8gY3JlYXRlIGEgcHJvcGVyIGBvcmlnaW5gLlxuICAgIC8vXG4gICAgaWYgKGluc3RydWN0aW9uWzRdKSB1cmxba2V5XSA9IHVybFtrZXldLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvL1xuICAvLyBBbHNvIHBhcnNlIHRoZSBzdXBwbGllZCBxdWVyeSBzdHJpbmcgaW4gdG8gYW4gb2JqZWN0LiBJZiB3ZSdyZSBzdXBwbGllZFxuICAvLyB3aXRoIGEgY3VzdG9tIHBhcnNlciBhcyBmdW5jdGlvbiB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJ1aWxkLWluXG4gIC8vIHBhcnNlci5cbiAgLy9cbiAgaWYgKHBhcnNlcikgdXJsLnF1ZXJ5ID0gcGFyc2VyKHVybC5xdWVyeSk7XG5cbiAgLy9cbiAgLy8gSWYgdGhlIFVSTCBpcyByZWxhdGl2ZSwgcmVzb2x2ZSB0aGUgcGF0aG5hbWUgYWdhaW5zdCB0aGUgYmFzZSBVUkwuXG4gIC8vXG4gIGlmIChcbiAgICAgIHJlbGF0aXZlXG4gICAgJiYgbG9jYXRpb24uc2xhc2hlc1xuICAgICYmIHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJ1xuICAgICYmICh1cmwucGF0aG5hbWUgIT09ICcnIHx8IGxvY2F0aW9uLnBhdGhuYW1lICE9PSAnJylcbiAgKSB7XG4gICAgdXJsLnBhdGhuYW1lID0gcmVzb2x2ZSh1cmwucGF0aG5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuICBpZiAodXJsLmF1dGgpIHtcbiAgICBpbnN0cnVjdGlvbiA9IHVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgdXJsLnVzZXJuYW1lID0gaW5zdHJ1Y3Rpb25bMF0gfHwgJyc7XG4gICAgdXJsLnBhc3N3b3JkID0gaW5zdHJ1Y3Rpb25bMV0gfHwgJyc7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIC8vXG4gIC8vIFRoZSBocmVmIGlzIGp1c3QgdGhlIGNvbXBpbGVkIHJlc3VsdC5cbiAgLy9cbiAgdXJsLmhyZWYgPSB1cmwudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY2hhbmdpbmcgcHJvcGVydGllcyBpbiB0aGUgVVJMIGluc3RhbmNlIHRvXG4gKiBpbnN1cmUgdGhhdCB0aGV5IGFsbCBwcm9wYWdhdGUgY29ycmVjdGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJ0ICAgICAgICAgIFByb3BlcnR5IHdlIG5lZWQgdG8gYWRqdXN0LlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgICAgICAgICAgVGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBmbiAgV2hlbiBzZXR0aW5nIHRoZSBxdWVyeSwgaXQgd2lsbCBiZSB0aGUgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgdG8gcGFyc2UgdGhlIHF1ZXJ5LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hlbiBzZXR0aW5nIHRoZSBwcm90b2NvbCwgZG91YmxlIHNsYXNoIHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZmluYWwgdXJsIGlmIGl0IGlzIHRydWUuXG4gKiBAcmV0dXJucyB7VVJMfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gc2V0KHBhcnQsIHZhbHVlLCBmbikge1xuICB2YXIgdXJsID0gdGhpcztcblxuICBzd2l0Y2ggKHBhcnQpIHtcbiAgICBjYXNlICdxdWVyeSc6XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSAoZm4gfHwgcXMucGFyc2UpKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvcnQnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICghcmVxdWlyZWQodmFsdWUsIHVybC5wcm90b2NvbCkpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgICAgIHVybFtwYXJ0XSA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZSArJzonKyB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHVybC5wb3J0KSB2YWx1ZSArPSAnOicrIHVybC5wb3J0O1xuICAgICAgdXJsLmhvc3QgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKC86XFxkKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgdXJsLnBvcnQgPSB2YWx1ZS5wb3AoKTtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWUuam9pbignOicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWU7XG4gICAgICAgIHVybC5wb3J0ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncHJvdG9jb2wnOlxuICAgICAgdXJsLnByb3RvY29sID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHVybC5zbGFzaGVzID0gIWZuO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwYXRobmFtZSc6XG4gICAgICB1cmwucGF0aG5hbWUgPSB2YWx1ZS5sZW5ndGggJiYgdmFsdWUuY2hhckF0KDApICE9PSAnLycgPyAnLycgKyB2YWx1ZSA6IHZhbHVlO1xuXG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIGJhY2sgaW4gdG8gYSB2YWxpZCBhbmQgZnVsbCBVUkwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZ2lmeSBPcHRpb25hbCBxdWVyeSBzdHJpbmdpZnkgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc3RyaW5naWZ5KSB7XG4gIGlmICghc3RyaW5naWZ5IHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBzdHJpbmdpZnkpIHN0cmluZ2lmeSA9IHFzLnN0cmluZ2lmeTtcblxuICB2YXIgcXVlcnlcbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIHByb3RvY29sID0gdXJsLnByb3RvY29sO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5jaGFyQXQocHJvdG9jb2wubGVuZ3RoIC0gMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIHZhciByZXN1bHQgPSBwcm90b2NvbCArICh1cmwuc2xhc2hlcyA/ICcvLycgOiAnJyk7XG5cbiAgaWYgKHVybC51c2VybmFtZSkge1xuICAgIHJlc3VsdCArPSB1cmwudXNlcm5hbWU7XG4gICAgaWYgKHVybC5wYXNzd29yZCkgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH1cblxuICByZXN1bHQgKz0gdXJsLmhvc3QgKyB1cmwucGF0aG5hbWU7XG5cbiAgcXVlcnkgPSAnb2JqZWN0JyA9PT0gdHlwZW9mIHVybC5xdWVyeSA/IHN0cmluZ2lmeSh1cmwucXVlcnkpIDogdXJsLnF1ZXJ5O1xuICBpZiAocXVlcnkpIHJlc3VsdCArPSAnPycgIT09IHF1ZXJ5LmNoYXJBdCgwKSA/ICc/JysgcXVlcnkgOiBxdWVyeTtcblxuICBpZiAodXJsLmhhc2gpIHJlc3VsdCArPSB1cmwuaGFzaDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5VUkwucHJvdG90eXBlID0geyBzZXQ6IHNldCwgdG9TdHJpbmc6IHRvU3RyaW5nIH07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIFVSTCBwYXJzZXIgYW5kIHNvbWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgbWlnaHQgYmUgdXNlZnVsIGZvclxuLy8gb3RoZXJzIG9yIHRlc3RpbmcuXG4vL1xuVVJMLmV4dHJhY3RQcm90b2NvbCA9IGV4dHJhY3RQcm90b2NvbDtcblVSTC5sb2NhdGlvbiA9IGxvbGNhdGlvbjtcblVSTC5xcyA9IHFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVSTDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwtcGFyc2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICByYXdIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdXBUbyBmcm9tICcuLi8uLi91dGlscy91cC10bydcblxuLyoqXG4gKiBDcmVhdGUgZm9udCBhd2Vzb21lIGljb24gbm9kZS5cbiAqXG4gKiBAcGFyYW0gaWNvblxuICogQHBhcmFtIG5hbWVcbiAqXG4gKiBAcmV0dXJuIHN0cmluZ1xuICovXG5mdW5jdGlvbiBpY29uTm9kZSAoaWNvbiwgbmFtZSkge1xuICByZXR1cm4gYDxpIGNsYXNzPVwiZmEgZmEtZncgZmEtJHtpY29ufVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaG92ZXI9XCJ0b29sdGlwXCIgZGF0YS10b29sdGlwLWRlbGF5PVwiMzUwXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCIke25hbWV9XCI+PC9pPmBcbn1cblxuLyoqXG4gKiBBZGQgYnV0dG9ucyBvbiB0aGUgcmlnaHQgb2Ygc2VhcmNoIGJhci5cbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIG5vZGUuY2xhc3NOYW1lID0gJ2N1c3RvbS1idXR0b24nXG4gIG5vZGUuaW5uZXJIVE1MID0gYFxuJHtpY29uTm9kZSgnZmlyZScsICfnhrHploDotqjli6InKX1cbiR7aWNvbk5vZGUoJ2Jhci1jaGFydCcsICflgIvkurrntbHoqIgnKX1cbiR7aWNvbk5vZGUoJ2hpc3RvcnknLCAn5q235Y+y5Zue6aGnJyl9XG4ke2ljb25Ob2RlKCdjb2cnLCAn6Kit5a6aJyl9YFxuXG4gIHVwVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmN1c3RvbS1zZWFyY2gtYmFyJyksICdkaXYnKS5hcHBlbmQobm9kZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2J1dHRvbi5qcyIsIi8qKlxuICogSW5zZXJ0IGhvb2tzLmpzIHRvIGh0bWwgZG9tLlxuICpcbiAqIOWboOWuieWFqOmZkOWItu+8jOeEoeazleebtOaOpeWRvOWPqyBmYWNlYm9vayBqcyBmdW5jdGlvbu+8jFxuICog5Zug5q2k5bCHIGhvb2tzLmpzIOaWsOWinuWIsOmggemdouS4re+8jOmAj+mBjiBwb3N0TWVzc2FnZVxuICog5L6G6ZaT5o6l6YGU5oiQ5q2k55uu55qE44CCXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBqcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG5cbiAganMuc3JjID0gYGNocm9tZS1leHRlbnNpb246Ly8ke2Nocm9tZS5pMThuLmdldE1lc3NhZ2UoJ0BAZXh0ZW5zaW9uX2lkJyl9L2hvb2tzLmpzYFxuXG4gIGRvY3VtZW50LmhlYWQuYXBwZW5kKGpzKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvaG9vay5qcyIsIi8qKlxuICogQWRkIG1vZGFsLlxuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgbm9kZS5jbGFzc05hbWUgPSAnY3VzdG9tLW1vZGFsJ1xuICBub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG48ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiYm94XCI+XG4gIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6IDFyZW07XCI+XG4gICAgICA8YiBpZD1cImN1c3RvbS1tb2RhbC10aXRsZVwiIHN0eWxlPVwiZm9udC1zaXplOiAxNnB4O1wiPjwvYj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWxnIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XG48L2Rpdj5gXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQobm9kZSlcblxuICAvLyDnlbYgbW9kYWwg6Zec6ZaJ5pmC77yM6aGv56S6IGJvZHkg55qE5ru+5YuV5qKd5Lul5Y+K5riF56m6IG1vZGFsIGNvbnRlbnRcbiAgY29uc3QgY2xvc2VFdmVudCA9ICgpID0+IHtcbiAgICBub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gJydcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwgLmJveCAuY29udGVudCcpLmlubmVySFRNTCA9ICcnXG4gIH1cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5iYWNrZ3JvdW5kJykub25jbGljayA9IGNsb3NlRXZlbnRcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuY2xvc2UtYnV0dG9uIGknKS5vbmNsaWNrID0gY2xvc2VFdmVudFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbW9kYWwuanMiLCIvKipcbiAqIEFkZCBjbGFzcyB0byBmYWNlYm9vayBuYXZiYXIuXG4gKlxuICogQHBhcmFtIGRvbVxuICpcbiAqIEByZXR1cm4gdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRvbSA9PiB7XG4gIGRvbS5jbGFzc05hbWUgKz0gJyBjdXN0b20tbmF2YmFyJ1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbmF2YmFyLmpzIiwiaW1wb3J0IHNlYXJjaEFwaSBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaCdcbmltcG9ydCB1cFRvIGZyb20gJy4uLy4uL3V0aWxzL3VwLXRvJ1xuXG4vKipcbiAqIEFkZCBzZWFyY2ggYmFyIG9uIHRoZSByaWdodCBvZiBmYWNlYm9vayBzZWFyY2ggYmFyLlxuICpcbiAqIEBwYXJhbSBkb21cbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBkb20gPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tc2VhcmNoLWJhcidcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG48Zm9ybSBjbGFzcz1cInNlYXJjaC1mb3JtXCI+XG4gIDxpbnB1dCBpZD1cImN1c3RvbS1zZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUG9zdCBTZWFyY2hcIj5cbiAgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS1zZWFyY2hcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG48L2Zvcm0+XG5cbjxkaXYgY2xhc3M9XCJyZXN1bHRcIj5cbiAgPHVsPjwvdWw+XG48L2Rpdj5gXG5cbiAgZG9tLmFwcGVuZChub2RlKVxuXG4gIC8vIOeVtuaQnOWwi+ahhueahOWAvOaYryB0cnV0aHkg5YmH5ZG85Y+rIHNlYXJjaCBhcGlcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1zZWFyY2gtaW5wdXQnKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LnZhbHVlKSB7XG4gICAgICBzZWFyY2hBcGkoZS50YXJnZXQudmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIC8vIOeVtum7nuaTiuaQnOWwi+ahhuWklueahOWNgOWfn++8jOmaseiXj+aQnOWwi+e1kOaenFxuICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3QgcGFyZW50ID0gdXBUbyhlLnRhcmdldCwgJ2Zvcm0nKVxuXG4gICAgLy8gdXBUbyDlj6/og73lm57lgrMgbnVsbO+8jOWboOatpOmcgOWFiOeiuuS/nSBwYXJlbnQg5pivIHRydXRoeVxuICAgIGlmICghIChwYXJlbnQgJiYgKCdzZWFyY2gtZm9ybScgPT09IHBhcmVudC5jbGFzc05hbWUpKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmN1c3RvbS1zZWFyY2gtYmFyIC5yZXN1bHQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvc2VhcmNoLWJhci5qcyIsIi8qKlxuICogTGlzdGVuIGZvciBidXR0b24gY2xpY2suXG4gKlxuICogQHJldHVybiB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLWJ1dHRvbiBpJykuZm9yRWFjaChub2RlID0+IHtcbiAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICAvLyDnlbbpu57mk4ogcGx1Z2luIOeahOaMiemIleaZgu+8jOmaseiXjyBib2R5IOeahOa7vuWLleaine+8jFxuICAgICAgLy8g6YG/5YWN5ruR6byg5ZyoIG1vZGFsIOWklua7vuWLleaZguaNsuWLlemggemdolxuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VzdG9tLW1vZGFsLXRpdGxlJykuaW5uZXJUZXh0ID0gZS50YXJnZXQuZGF0YXNldC50b29sdGlwQ29udGVudFxuXG4gICAgICBjb25zdCBtYXBwaW5nID0ge1xuICAgICAgICAnZmlyZSc6ICdob3R0ZXN0JyxcbiAgICAgICAgJ2Jhci1jaGFydCc6ICdzdGF0aXN0aWNzJyxcbiAgICAgICAgJ2hpc3RvcnknOiAnaGlzdG9yeScsXG4gICAgICAgICdjb2cnOiAnc2V0dGluZydcbiAgICAgIH1cblxuICAgICAgLy8g6YCP6YGOIGJ1dHRvbiDnmoQgY2xhc3Mg5L6G5Yik5pa36bue5pOK55qE5oyJ6YiV77yM6LyJ5YWl55u45bCN55qEIG1vZGFsXG4gICAgICBsZXQgbmFtZSA9IGUudGFyZ2V0LmNsYXNzTmFtZVxuXG4gICAgICBuYW1lID0gbmFtZS5zdWJzdHIobmFtZS5sYXN0SW5kZXhPZignZmEtJykgKyAzKVxuXG4gICAgICByZXF1aXJlKCcuL21vZGFscy8nICsgbWFwcGluZ1tuYW1lXSkoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuYm94IC5jb250ZW50JykpXG4gICAgfSlcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvYnV0dG9uLWNsaWNrLmpzIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSAnYm9vbGVhbidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnJ1xuaW1wb3J0IHNlYXJjaEFwaSBmcm9tICcuLi9jb21wb25lbnRzL3NlYXJjaCdcblxuLyoqXG4gKiBMaXN0ZW4gZm9yIGZhY2Vib29rIHNlYXJjaC5cbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xuY29uc3Qgc2VhcmNoID0gKCkgPT4ge1xuICBjb25zdCBmYlNlYXJjaElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJxXCJdJylcblxuICAvLyBmYWNlYm9vayDpoIHpnaLovInlhaXpgY7nqIvkuK3vvIxodG1sIGRvbSDmnIPmm7Tli5XvvIzlm6DmraTlv4XpoIjnrYnliLAgbGVuZ3RoIOWkp+aWvCAyXG4gIC8vIOiAjCAjcSDliYfmmK/nuYHpq5TkuK3mlofmmYLmiY3mnIPmnInnmoQgaWTvvIzlh7rnj77mmYLljbPku6PooajpoIHpnaLovInlhaXlrozmiJBcbiAgaWYgKDIgPiBmYlNlYXJjaElucHV0cy5sZW5ndGggJiYgISBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcScpKSB7XG4gICAgd2luZG93LnNldFRpbWVvdXQoc2VhcmNoLCAxMDAwKVxuICB9IGVsc2Uge1xuICAgIC8vIOebo+iBvSBmYWNlYm9vayDoh6rmnInnmoTmkJzlsIvmoYZcbiAgICBmYlNlYXJjaElucHV0cy5pdGVtKGZiU2VhcmNoSW5wdXRzLmxlbmd0aCAtIDEpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNvbnN0IGtleXdvcmQgPSBlLnRhcmdldC52YWx1ZVxuXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VzdG9tLXNlYXJjaC1pbnB1dCcpLnZhbHVlID0ga2V5d29yZFxuXG4gICAgICBpZiAoISBrZXl3b3JkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uZmlnLmdldCgnc2V0dGluZy5zeW5jLXNlYXJjaCcsIHN5bmMgPT4ge1xuICAgICAgICBpZiAoYm9vbGVhbihzeW5jKSkge1xuICAgICAgICAgIHNlYXJjaEFwaShrZXl3b3JkKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWFyY2hcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmFjZWJvb2stc2VhcmNoLmpzIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSAnYm9vbGVhbidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnJ1xuaW1wb3J0IHBhcnNlRmJpZCBmcm9tICcuL2ZlZWQtaGVscGVycy9wYXJzZS1mYmlkJ1xuaW1wb3J0IGluU2NyZWVuIGZyb20gJy4vZmVlZC1oZWxwZXJzL2luLXNjcmVlbidcbmltcG9ydCBpc1B1YmxpYyBmcm9tICcuL2ZlZWQtaGVscGVycy9pcy1wdWJsaWMnXG5pbXBvcnQgaXNTcG9uc29yZWQgZnJvbSAnLi9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkJ1xuXG4vKipcbiAqIExpc3RlbiBmb3IgdXNlciBmZWVkcy5cbiAqXG4gKiBAcmV0dXJuIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IGZlZWRzID0gW11cblxuICBsZXQgbGFzdFkgPSAwXG5cbiAgd2luZG93Lm9uc2Nyb2xsID0gKCkgPT4ge1xuICAgIC8vIOeiuuS/neWPquWcqOS4u+eVq+mdoumBi+ihjFxuICAgIGlmICgnLycgIT09IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSkge1xuICAgICAgbGFzdFkgPSAwXG5cbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2RpdltpZF49XCJoeXBlcmZlZWRfc3RvcnlfaWRcIl0nKS5mb3JFYWNoKGZlZWQgPT4ge1xuICAgICAgaWYgKGlzU3BvbnNvcmVkKGZlZWQpKSB7XG4gICAgICAgIHJldHVybiBjb25maWcuZ2V0KCdzZXR0aW5nLnJlbW92ZS1hZCcsIHJlbW92ZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIGJvb2xlYW4ocmVtb3ZlKSAmJiBmZWVkLnJlbW92ZSgpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGlzUHVibGljKGZlZWQpKSB7XG4gICAgICAgIGNvbnN0IGZiaWQgPSBwYXJzZUZiaWQoZmVlZC5xdWVyeVNlbGVjdG9yKCdkaXYgc3BhbiBzcGFuIGE6bm90KFtkYXRhLWhvdmVyY2FyZC1wcmVmZXItbW9yZS1jb250ZW50LXNob3ddKScpLmhyZWYpXG5cbiAgICAgICAgaWYgKGZiaWQpIHtcbiAgICAgICAgICBpZiAoISBmZWVkcy5pbmNsdWRlcyhmYmlkKSkge1xuICAgICAgICAgICAgZmVlZHMucHVzaChmYmlkKVxuXG4gICAgICAgICAgICBjb25maWcuc2V0KCdmZWVkcycsIGZlZWRzKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpblNjcmVlbihmZWVkKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coMCA+IHdpbmRvdy5zY3JvbGxZIC0gbGFzdFkgPyAnYmFjaycgOiAnJywgZmJpZClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuXG4gICAgbGFzdFkgPSB3aW5kb3cuc2Nyb2xsWVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL3VzZXItZmVlZC5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIGluIHNjcmVlbiBvciBub3QuXG4gKlxuICogQHJldHVybiBib29sZWFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmZWVkKSA9PiB7XG4gIGNvbnN0IHJlY3QgPSBmZWVkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgY29uc3Qgc2NyZWVuID0ge1xuICAgIHRvcDogd2luZG93LnNjcm9sbFksXG4gICAgYm90dG9tOiB3aW5kb3cuc2Nyb2xsWSArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgfVxuXG4gIGNvbnN0IGVsID0ge1xuICAgIHRvcDogZmVlZC5vZmZzZXRUb3AgKyByZWN0LmhlaWdodCAvIDMsXG4gICAgYm90dG9tOiBmZWVkLm9mZnNldFRvcCArIHJlY3QuaGVpZ2h0IC8gMyAqIDJcbiAgfVxuXG4gIGlmIChlbC50b3AgPiBzY3JlZW4udG9wICYmIGVsLnRvcCA8IHNjcmVlbi5ib3R0b20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2UgaWYgKGVsLmJvdHRvbSA+IHNjcmVlbi50b3AgJiYgZWwuYm90dG9tIDwgc2NyZWVuLmJvdHRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2luLXNjcmVlbi5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIHB1YmxpYyBvciBub3QuXG4gKlxuICogQHJldHVybiBib29sZWFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmZWVkKSA9PiB7XG4gIGxldCBwcml2YWN5ID0gZmVlZC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtaG92ZXI9XCJ0b29sdGlwXCJdW2NsYXNzKj1cIlByaXZhY3lcIl0sIGRpdltkYXRhLWhvdmVyPVwidG9vbHRpcFwiXScpXG5cbiAgaWYgKCEgcHJpdmFjeSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcHJpdmFjeSA9IHByaXZhY3kuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtY29udGVudCcpXG5cbiAgcmV0dXJuIHByaXZhY3kuaW5jbHVkZXMoJ1B1YmxpYycpIHx8IHByaXZhY3kuaW5jbHVkZXMoJ+WFrOmWiycpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1wdWJsaWMuanMiLCIvKipcbiAqIERldGVybWluZSB0aGUgZmVlZCBpcyBzcG9uc29yZWQgb3Igbm90LlxuICpcbiAqIEByZXR1cm4gYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBjb25zdCBpc1Nwb25zb3JlZCA9IGZlZWQucXVlcnlTZWxlY3RvcignYVtocmVmXj1cImh0dHBzOi8vbC5mYWNlYm9vay5jb20vbC5waHBcIl0nKVxuXG4gIGlmICghIGlzU3BvbnNvcmVkKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBzd2l0Y2ggKGlzU3BvbnNvcmVkLmlubmVyVGV4dCkge1xuICAgIGNhc2UgJ1Nwb25zb3JlZCc6XG4gICAgY2FzZSAn6LSK5YqpJzpcbiAgICBjYXNlICfluoPlkYonOlxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkLmpzIiwiaW1wb3J0IHVybFBhcnNlIGZyb20gJ3VybC1wYXJzZSdcblxuY29uc3QgcGFyc2VkVXJscyA9IHt9XG5cbi8qKlxuICogUGFyc2UgZmJpZCBmcm9tIHVybC5cbiAqXG4gKiBAcmV0dXJuIHN0cmluZ3xudWxsXG4gKi9cbmNvbnN0IGZyb21VcmwgPSB1cmwgPT4ge1xuICAvLyDlt7LliIbmnpDpgY7nmoTntrLlnYDlsLHnm7TmjqXlvp7lv6vlj5bmi79cbiAgaWYgKHBhcnNlZFVybHMuaGFzT3duUHJvcGVydHkodXJsKSkge1xuICAgIHJldHVybiBwYXJzZWRVcmxzW3VybF1cbiAgfVxuXG4gIGNvbnN0IHBhcnNlZCA9IHVybFBhcnNlKHVybCwgdHJ1ZSlcbiAgY29uc3QgcXVlcnkgPSBwYXJzZWQucXVlcnlcbiAgY29uc3QgcGF0aG5hbWUgPSBwYXJzZWQucGF0aG5hbWUucmVwbGFjZSgvXFwvKyQvLCAnJylcblxuICBsZXQgcmVzdWx0XG5cbiAgaWYgKHBhdGhuYW1lLmVuZHNXaXRoKCc6MycpIHx8IHBhdGhuYW1lLmVuZHNXaXRoKCc6MCcpKSB7XG4gICAgcmVzdWx0ID0gbnVsbFxuICB9IGVsc2UgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KCdzdG9yeV9mYmlkJykpIHtcbiAgICByZXN1bHQgPSBxdWVyeS5zdG9yeV9mYmlkXG4gIH0gZWxzZSBpZiAocXVlcnkuaGFzT3duUHJvcGVydHkoJ2ZiaWQnKSkge1xuICAgIHJlc3VsdCA9IHF1ZXJ5LmZiaWRcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSBwYXRobmFtZS5zbGljZShwYXRobmFtZS5sYXN0SW5kZXhPZignLycpICsgMSlcbiAgfVxuXG4gIHBhcnNlZFVybHNbdXJsXSA9IHJlc3VsdFxuXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBQYXJzZSBmYmlkIGZyb20gZ2l2ZW4gdmFsdWUuXG4gKlxuICogQHJldHVybiBzdHJpbmd8bnVsbFxuICovXG5leHBvcnQgZGVmYXVsdCB2YWwgPT4ge1xuICBpZiAodmFsLm1hdGNoKC8oXFxiKGh0dHBzPyk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcpKSB7XG4gICAgcmV0dXJuIGZyb21VcmwodmFsKVxuICB9XG5cbiAgY29uc29sZS5lcnJvcihgZmJpZCB1bmtub3duIHR5cGU6ICR7dmFsfWApXG5cbiAgcmV0dXJuIG51bGxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL3BhcnNlLWZiaWQuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5jb25zdCBpc09iaiA9IHJlcXVpcmUoJ2lzLW9iaicpO1xuXG5mdW5jdGlvbiBnZXRQYXRoU2VnbWVudHMocGF0aCkge1xuXHRjb25zdCBwYXRoQXJyID0gcGF0aC5zcGxpdCgnLicpO1xuXHRjb25zdCBwYXJ0cyA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBwID0gcGF0aEFycltpXTtcblxuXHRcdHdoaWxlIChwW3AubGVuZ3RoIC0gMV0gPT09ICdcXFxcJyAmJiBwYXRoQXJyW2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwID0gcC5zbGljZSgwLCAtMSkgKyAnLic7XG5cdFx0XHRwICs9IHBhdGhBcnJbKytpXTtcblx0XHR9XG5cblx0XHRwYXJ0cy5wdXNoKHApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnRzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG9iaiA6IHZhbHVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgcGF0aEFycltpXSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcGF0aEFycltpXV07XG5cblx0XHRcdGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHtcblx0XHRcdFx0Ly8gYG9iamAgaXMgZWl0aGVyIGB1bmRlZmluZWRgIG9yIGBudWxsYCBzbyB3ZSB3YW50IHRvIHN0b3AgdGhlIGxvb3AsIGFuZFxuXHRcdFx0XHQvLyBpZiB0aGlzIGlzIG5vdCB0aGUgbGFzdCBiaXQgb2YgdGhlIHBhdGgsIGFuZFxuXHRcdFx0XHQvLyBpZiBpdCBkaWQndCByZXR1cm4gYHVuZGVmaW5lZGBcblx0XHRcdFx0Ly8gaXQgd291bGQgcmV0dXJuIGBudWxsYCBpZiBgb2JqYCBpcyBgbnVsbGBcblx0XHRcdFx0Ly8gYnV0IHdlIHdhbnQgYGdldCh7Zm9vOiBudWxsfSwgJ2Zvby5iYXInKWAgdG8gZXF1YWwgYHVuZGVmaW5lZGAsIG9yIHRoZSBzdXBwbGllZCB2YWx1ZSwgbm90IGBudWxsYFxuXHRcdFx0XHRpZiAoaSAhPT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRzZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmICghaXNPYmoob2JqKSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwID0gcGF0aEFycltpXTtcblxuXHRcdFx0aWYgKCFpc09iaihvYmpbcF0pKSB7XG5cdFx0XHRcdG9ialtwXSA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaSA9PT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdG9ialtwXSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcF07XG5cdFx0fVxuXHR9LFxuXG5cdGRlbGV0ZShvYmosIHBhdGgpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcCA9IHBhdGhBcnJbaV07XG5cblx0XHRcdGlmIChpID09PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZGVsZXRlIG9ialtwXTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcF07XG5cblx0XHRcdGlmICghaXNPYmoob2JqKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhhcyhvYmosIHBhdGgpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGlzT2JqKG9iaikpIHtcblx0XHRcdFx0aWYgKCEocGF0aEFycltpXSBpbiBvYmopKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0b2JqID0gb2JqW3BhdGhBcnJbaV1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2RvdC1wcm9wL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4KSB7XG5cdHZhciB0eXBlID0gdHlwZW9mIHg7XG5cdHJldHVybiB4ICE9PSBudWxsICYmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaXMtb2JqL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFNpbXBsZSBxdWVyeSBzdHJpbmcgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5nKHF1ZXJ5KSB7XG4gIHZhciBwYXJzZXIgPSAvKFtePT8mXSspPT8oW14mXSopL2dcbiAgICAsIHJlc3VsdCA9IHt9XG4gICAgLCBwYXJ0O1xuXG4gIC8vXG4gIC8vIExpdHRsZSBuaWZ0eSBwYXJzaW5nIGhhY2ssIGxldmVyYWdlIHRoZSBmYWN0IHRoYXQgUmVnRXhwLmV4ZWMgaW5jcmVtZW50c1xuICAvLyB0aGUgbGFzdEluZGV4IHByb3BlcnR5IHNvIHdlIGNhbiBjb250aW51ZSBleGVjdXRpbmcgdGhpcyBsb29wIHVudGlsIHdlJ3ZlXG4gIC8vIHBhcnNlZCBhbGwgcmVzdWx0cy5cbiAgLy9cbiAgZm9yICg7XG4gICAgcGFydCA9IHBhcnNlci5leGVjKHF1ZXJ5KTtcbiAgICByZXN1bHRbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRbMV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0WzJdKVxuICApO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgcXVlcnkgc3RyaW5nIHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXggT3B0aW9uYWwgcHJlZml4LlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5naWZ5KG9iaiwgcHJlZml4KSB7XG4gIHByZWZpeCA9IHByZWZpeCB8fCAnJztcblxuICB2YXIgcGFpcnMgPSBbXTtcblxuICAvL1xuICAvLyBPcHRpb25hbGx5IHByZWZpeCB3aXRoIGEgJz8nIGlmIG5lZWRlZFxuICAvL1xuICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBwcmVmaXgpIHByZWZpeCA9ICc/JztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArJz0nKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFpcnMubGVuZ3RoID8gcHJlZml4ICsgcGFpcnMuam9pbignJicpIDogJyc7XG59XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5leHBvcnRzLnN0cmluZ2lmeSA9IHF1ZXJ5c3RyaW5naWZ5O1xuZXhwb3J0cy5wYXJzZSA9IHF1ZXJ5c3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5naWZ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UncmUgcmVxdWlyZWQgdG8gYWRkIGEgcG9ydCBudW1iZXIuXG4gKlxuICogQHNlZSBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RlZmF1bHQtcG9ydFxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBwb3J0IFBvcnQgbnVtYmVyIHdlIG5lZWQgdG8gY2hlY2tcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgaXQgYSBkZWZhdWx0IHBvcnQgZm9yIHRoZSBnaXZlbiBwcm90b2NvbFxuICogQGFwaSBwcml2YXRlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVxdWlyZWQocG9ydCwgcHJvdG9jb2wpIHtcbiAgcHJvdG9jb2wgPSBwcm90b2NvbC5zcGxpdCgnOicpWzBdO1xuICBwb3J0ID0gK3BvcnQ7XG5cbiAgaWYgKCFwb3J0KSByZXR1cm4gZmFsc2U7XG5cbiAgc3dpdGNoIChwcm90b2NvbCkge1xuICAgIGNhc2UgJ2h0dHAnOlxuICAgIGNhc2UgJ3dzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gODA7XG5cbiAgICBjYXNlICdodHRwcyc6XG4gICAgY2FzZSAnd3NzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNDQzO1xuXG4gICAgY2FzZSAnZnRwJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gMjE7XG5cbiAgICBjYXNlICdnb3BoZXInOlxuICAgIHJldHVybiBwb3J0ICE9PSA3MDtcblxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwb3J0ICE9PSAwO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZXF1aXJlcy1wb3J0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vO1xuXG4vKipcbiAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIG5vdCBiZSBjb3BpZWQgb3IgaW5oZXJpdGVkIGZyb20uIFRoaXMgaXMgb25seSBuZWVkZWRcbiAqIGZvciBhbGwgbm9uIGJsb2IgVVJMJ3MgYXMgYSBibG9iIFVSTCBkb2VzIG5vdCBpbmNsdWRlIGEgaGFzaCwgb25seSB0aGVcbiAqIG9yaWdpbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIGlnbm9yZSA9IHsgaGFzaDogMSwgcXVlcnk6IDEgfVxuICAsIFVSTDtcblxuLyoqXG4gKiBUaGUgbG9jYXRpb24gb2JqZWN0IGRpZmZlcnMgd2hlbiB5b3VyIGNvZGUgaXMgbG9hZGVkIHRocm91Z2ggYSBub3JtYWwgcGFnZSxcbiAqIFdvcmtlciBvciB0aHJvdWdoIGEgd29ya2VyIHVzaW5nIGEgYmxvYi4gQW5kIHdpdGggdGhlIGJsb2JibGUgYmVnaW5zIHRoZVxuICogdHJvdWJsZSBhcyB0aGUgbG9jYXRpb24gb2JqZWN0IHdpbGwgY29udGFpbiB0aGUgVVJMIG9mIHRoZSBibG9iLCBub3QgdGhlXG4gKiBsb2NhdGlvbiBvZiB0aGUgcGFnZSB3aGVyZSBvdXIgY29kZSBpcyBsb2FkZWQgaW4uIFRoZSBhY3R1YWwgb3JpZ2luIGlzXG4gKiBlbmNvZGVkIGluIHRoZSBgcGF0aG5hbWVgIHNvIHdlIGNhbiB0aGFua2Z1bGx5IGdlbmVyYXRlIGEgZ29vZCBcImRlZmF1bHRcIlxuICogbG9jYXRpb24gZnJvbSBpdCBzbyB3ZSBjYW4gZ2VuZXJhdGUgcHJvcGVyIHJlbGF0aXZlIFVSTCdzIGFnYWluLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jIE9wdGlvbmFsIGRlZmF1bHQgbG9jYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gbG9sY2F0aW9uIG9iamVjdC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9sY2F0aW9uKGxvYykge1xuICBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uIHx8IHt9O1xuICBVUkwgPSBVUkwgfHwgcmVxdWlyZSgnLi8nKTtcblxuICB2YXIgZmluYWxkZXN0aW5hdGlvbiA9IHt9XG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY1xuICAgICwga2V5O1xuXG4gIGlmICgnYmxvYjonID09PSBsb2MucHJvdG9jb2wpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVSTCh1bmVzY2FwZShsb2MucGF0aG5hbWUpLCB7fSk7XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGUpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVSTChsb2MsIHt9KTtcbiAgICBmb3IgKGtleSBpbiBpZ25vcmUpIGRlbGV0ZSBmaW5hbGRlc3RpbmF0aW9uW2tleV07XG4gIH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGUpIHtcbiAgICBmb3IgKGtleSBpbiBsb2MpIHtcbiAgICAgIGlmIChrZXkgaW4gaWdub3JlKSBjb250aW51ZTtcbiAgICAgIGZpbmFsZGVzdGluYXRpb25ba2V5XSA9IGxvY1trZXldO1xuICAgIH1cblxuICAgIGlmIChmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID0gc2xhc2hlcy50ZXN0KGxvYy5ocmVmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmluYWxkZXN0aW5hdGlvbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLXBhcnNlL2xvbGNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vaGlzdG9yeVwiOiA3LFxuXHRcIi4vaGlzdG9yeS5qc1wiOiA3LFxuXHRcIi4vaG90dGVzdFwiOiA4LFxuXHRcIi4vaG90dGVzdC5qc1wiOiA4LFxuXHRcIi4vaG90dGVzdC9wb3N0c1wiOiAyLFxuXHRcIi4vaG90dGVzdC9wb3N0cy5qc1wiOiAyLFxuXHRcIi4vc2V0dGluZ1wiOiA5LFxuXHRcIi4vc2V0dGluZy5qc1wiOiA5LFxuXHRcIi4vc3RhdGlzdGljc1wiOiAxMCxcblx0XCIuL3N0YXRpc3RpY3MuanNcIjogMTBcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDQ5O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscyBeXFwuXFwvLiokXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdXBUbyBmcm9tICcuLi91dGlscy91cC10bydcblxuZG9jdW1lbnQub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICBpZiAoJ2ludGVyYWN0aXZlJyA9PT0gZG9jdW1lbnQucmVhZHlTdGF0ZSkge1xuICAgIGNvbnN0IGRvbSA9ICgoKSA9PiB7XG4gICAgICBsZXQgZG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2W3JvbGU9XCJzZWFyY2hcIl0nKVxuXG4gICAgICBpZiAoISBkb20pIHtcbiAgICAgICAgZG9tID0gdXBUbyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtW3JvbGU9XCJzZWFyY2hcIl0nKSwgJ2RpdicpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1cFRvKGRvbSwgJ2RpdicpXG4gICAgfSkoKVxuXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvaG9vaycpKClcbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9uYXZiYXInKShkb20pXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvc2VhcmNoLWJhcicpKGRvbSlcbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9idXR0b24nKSgpXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvbW9kYWwnKSgpXG5cbiAgICByZXF1aXJlKCcuL21vbml0b3JzL2ZhY2Vib29rLXNlYXJjaCcpKClcbiAgICByZXF1aXJlKCcuL21vbml0b3JzL2J1dHRvbi1jbGljaycpKClcbiAgICByZXF1aXJlKCcuL21vbml0b3JzL3VzZXItZmVlZCcpKClcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbmRleC5qcyJdLCJzb3VyY2VSb290IjoiIn0=