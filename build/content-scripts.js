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
/******/ 	return __webpack_require__(__webpack_require__.s = 48);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(10)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(46);

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
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
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


var _posts = __webpack_require__(2);

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (dom) {
  dom.innerHTML = '\n<div class="hottest-section">\n  <div class="posts"></div>\n</div>\n';

  _posts2.default.status.page = 1;
  _posts2.default.load();

  document.querySelector('.hottest-section .posts').addEventListener('scroll', function (e) {
    var target = e.target;

    // scrollWidth 整體寬度
    // scrollLeft  滾動距離
    // offsetWidth 可視寬度(含 margin)
    // clientWidth 可視寬度

    if (target.scrollLeft > target.scrollWidth - target.clientWidth * 2) {
      _posts2.default.load();
    }
  });
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _boolean = __webpack_require__(28);

var _boolean2 = _interopRequireDefault(_boolean);

var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _upTo = __webpack_require__(1);

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


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(27);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _dotProp = __webpack_require__(40);

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
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 11 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(31)
  , IE8_DOM_DEFINE = __webpack_require__(36)
  , toPrimitive    = __webpack_require__(38)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(0) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(43)
  , lolcation = __webpack_require__(44)
  , qs = __webpack_require__(42)
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _upTo = __webpack_require__(1);

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
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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

      __webpack_require__(47)("./" + mapping[name])(document.querySelector('.custom-modal .box .content'));
    });
  });
};

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _parseFbid = __webpack_require__(25);

var _parseFbid2 = _interopRequireDefault(_parseFbid);

var _inScreen = __webpack_require__(22);

var _inScreen2 = _interopRequireDefault(_inScreen);

var _isPublic = __webpack_require__(23);

var _isPublic2 = _interopRequireDefault(_isPublic);

var _isSponsored = __webpack_require__(24);

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
/* 21 */,
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _urlParse = __webpack_require__(13);

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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(29), __esModule: true };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(26);

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
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(39);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(30);
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3)
  , document = __webpack_require__(11).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(11)
  , core      = __webpack_require__(9)
  , ctx       = __webpack_require__(32)
  , hide      = __webpack_require__(35)
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(12)
  , createDesc = __webpack_require__(37);
module.exports = __webpack_require__(0) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(0) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(33)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(34);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(0), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(41);

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
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 42 */
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
/* 43 */
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
/* 44 */
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
  URL = URL || __webpack_require__(13);

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(45)))

/***/ }),
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./history": 4,
	"./history.js": 4,
	"./hottest": 5,
	"./hottest.js": 5,
	"./hottest/posts": 2,
	"./hottest/posts.js": 2,
	"./setting": 6,
	"./setting.js": 6,
	"./statistics": 7,
	"./statistics.js": 7
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
webpackContext.id = 47;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _upTo = __webpack_require__(1);

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

    __webpack_require__(50)();
    __webpack_require__(16)(dom);
    __webpack_require__(17)(dom);
    __webpack_require__(14)();
    __webpack_require__(15)();

    __webpack_require__(19)();
    __webpack_require__(18)();
    __webpack_require__(20)();
  }
};

/***/ }),
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Insert hooks.js to html dom.
 *
 * @returns void
 */
module.exports = function () {
  var js = document.createElement('script');

  js.src = 'chrome-extension://fhejeipcphchemncfcobjcaccjgjbefm/hooks.js';

  document.head.append(js);
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmM4ZTlmMjdhMDE5OTc3NmQ2YzQiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3VwLXRvLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QvcG9zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaG90dGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zZXR0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3N0YXRpc3RpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi91cmwtcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL21vZGFsLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL25hdmJhci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9zZWFyY2gtYmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvYnV0dG9uLWNsaWNrLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmFjZWJvb2stc2VhcmNoLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvdXNlci1mZWVkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2luLXNjcmVlbi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1wdWJsaWMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL3BhcnNlLWZiaWQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2Jvb2xlYW4vbGliL2Jvb2xlYW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vZG90LXByb3AvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9pcy1vYmovaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9xdWVyeXN0cmluZ2lmeS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlcXVpcmVzLXBvcnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi91cmwtcGFyc2UvbG9sY2F0aW9uLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vfi93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMgXlxcLlxcLy4qJCIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiXSwibmFtZXMiOlsiZWwiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJwYXJlbnROb2RlIiwic3RhdHVzIiwibG9hZGluZyIsInBhZ2UiLCJsb2FkIiwiY2IiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwb3N0c0RvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluc2VydEFkamFjZW50SFRNTCIsInJlbmRlciIsImRhdGEiLCJyZXN1bHQiLCJyZWNzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJub2RlIiwiY2xhc3NOYW1lIiwid2luZG93IiwicG9zdE1lc3NhZ2UiLCJ0eXBlIiwicmVkdWNlIiwiaHRtbCIsImZlZWQiLCJyZWMiLCJ1cmwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9tIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImUiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNldHRpbmciLCJ0YWJsZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJrZXkiLCJpdGVtIiwiZ2V0IiwiaWQiLCJ2YWx1ZSIsInNldCIsIm4iLCJyZXBsYWNlIiwic2V0VGltZW91dCIsInBvcyIsImluZGV4T2YiLCJrIiwic2xpY2UiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJpdGVtcyIsImhhc093blByb3BlcnR5IiwidmFsIiwiaW5jbHVkZXMiLCJzdWJzdHIiLCJpY29uTm9kZSIsImljb24iLCJuYW1lIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsInN0eWxlIiwiZGlzcGxheSIsImJvZHkiLCJjbG9zZUV2ZW50Iiwib3ZlcmZsb3dZIiwib25jbGljayIsImlubmVyVGV4dCIsImRhdGFzZXQiLCJ0b29sdGlwQ29udGVudCIsIm1hcHBpbmciLCJsYXN0SW5kZXhPZiIsInJlcXVpcmUiLCJzZWFyY2giLCJmYlNlYXJjaElucHV0cyIsImxlbmd0aCIsImZlZWRzIiwibGFzdFkiLCJvbnNjcm9sbCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJyZW1vdmUiLCJmYmlkIiwiaHJlZiIsInB1c2giLCJjb25zb2xlIiwibG9nIiwic2Nyb2xsWSIsInJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJzY3JlZW4iLCJ0b3AiLCJib3R0b20iLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRIZWlnaHQiLCJvZmZzZXRUb3AiLCJoZWlnaHQiLCJwcml2YWN5IiwiZ2V0QXR0cmlidXRlIiwiaXNTcG9uc29yZWQiLCJwYXJzZWRVcmxzIiwiZnJvbVVybCIsInBhcnNlZCIsInF1ZXJ5IiwiZW5kc1dpdGgiLCJzdG9yeV9mYmlkIiwibWF0Y2giLCJlcnJvciIsIm9ucmVhZHlzdGF0ZWNoYW5nZSIsInJlYWR5U3RhdGUiLCJqcyIsInNyYyIsImhlYWQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDaEVBO0FBQ0E7QUFDQSxpQ0FBaUMsUUFBUSxnQkFBZ0IsVUFBVSxHQUFHO0FBQ3RFLENBQUMsRTs7Ozs7Ozs7Ozs7OztBQ0hEOzs7Ozs7Ozs7a0JBU2UsVUFBQ0EsRUFBRCxFQUFLQyxPQUFMLEVBQWlCO0FBQzlCQSxZQUFVQSxRQUFRQyxXQUFSLEVB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O0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNULDhFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix1QkFBdUI7QUFDckQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx1Q0FBdUMsMEJBQTBCO0FBQ2pFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQkFBK0IsMEJBQTBCLGVBQWU7QUFDeEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQzVjRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUMxQkE7Ozs7OztBQUVBbkQsU0FBUzBHLGtCQUFULEdBQThCLFlBQU07QUFDbEMsTUFBSSxrQkFBa0IxRyxTQUFTMkcsVUFBL0IsRUFBMkM7QUFDekMsUUFBTXRGLE1BQU8sWUFBTTtBQUNqQixVQUFJQSxNQUFNckIsU0FBU0MsYUFBVCxDQUF1QixvQkFBdkIsQ0FBVjs7QUFFQSxVQUFJLENBQUVvQixHQUFOLEVBQVc7QUFDVEEsY0FBTSxvQkFBS3JCLFNBQVNDLGFBQVQsQ0FBdUIscUJBQXZCLENBQUwsRUFBb0QsS0FBcEQsQ0FBTjtBQUNEOztBQUVELGFBQU8sb0JBQUtvQixHQUFMLEVBQVUsS0FBVixDQUFQO0FBQ0QsS0FSVyxFQUFaOztBQVVBaUQsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0FBLElBQUEsbUJBQUFBLENBQVEsRUFBUixFQUFvQ2pELEdBQXBDO0FBQ0FpRCxJQUFBLG1CQUFBQSxDQUFRLEVBQVIsRUFBd0NqRCxHQUF4QztBQUNBaUQsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0FBLElBQUEsbUJBQUFBLENBQVEsRUFBUjs7QUFFQUEsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0FBLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7QUFDRDtBQUNGLENBdEJELEM7Ozs7Ozs7Ozs7QUNGQTs7Ozs7QUFLQW5ELE9BQU9DLE9BQVAsR0FBaUIsWUFBTTtBQUNyQixNQUFNd0YsS0FBSzVHLFNBQVN5RCxhQUFULENBQXVCLFFBQXZCLENBQVg7O0FBRUFtRCxLQUFHQyxHQUFILEdBQVMsOERBQVQ7O0FBRUE3RyxXQUFTOEcsSUFBVCxDQUFjcEQsTUFBZCxDQUFxQmtELEVBQXJCO0FBQ0QsQ0FORCxDIiwiZmlsZSI6ImNvbnRlbnQtc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ4KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiYzhlOWYyN2EwMTk5Nzc2ZDZjNCIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaW5kIGZpcnN0IGFuY2VzdG9yIG9mIGVsIHdpdGggdGFnTmFtZSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSBlbFxuICogQHBhcmFtIHRhZ05hbWVcbiAqIEByZXR1cm5zIHsqfVxuICpcbiAqIEByZWZlcmVuY2UgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjg1NzExNlxuICovXG5leHBvcnQgZGVmYXVsdCAoZWwsIHRhZ05hbWUpID0+IHtcbiAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXG4gIHdoaWxlIChlbCAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgZWwgPSBlbC5wYXJlbnROb2RlXG5cbiAgICBpZiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiBlbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXAtdG8uanMiLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0dXM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBwYWdlOiAxXG4gIH0sXG5cbiAgLyoqXG4gICAqIExvYWQgaG90dGVzdCBwb3N0cy5cbiAgICpcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbG9hZCAoY2IgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSB0cnVlXG5cbiAgICBmZXRjaChgaHR0cHM6Ly93d3cuY3MuY2N1LmVkdS50dy9+Y3lzMTAydS9hcGkucGhwP3BhZ2U9JHt0aGlzLnN0YXR1cy5wYWdlfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3RzRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiAucG9zdHMnKVxuXG4gICAgICAgIHBvc3RzRG9tLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5yZW5kZXIoZGF0YS5yZXN1bHQucmVjcykpXG4gICAgICAgIHBvc3RzRG9tLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5mYi1wb3N0LmZiX2lmcmFtZV93aWRnZXQnKS5mb3JFYWNoKG5vZGUgPT4geyBub2RlLmNsYXNzTmFtZSA9ICcnIH0pXG5cbiAgICAgICAgaWYgKG51bGwgIT09IGNiKSB7XG4gICAgICAgICAgY2IoZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlbWJlZC1wb3N0cycgfSwgJyonKVxuXG4gICAgICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgfSlcblxuICAgICAgKyt0aGlzLnN0YXR1cy5wYWdlXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogUmVuZGVyIGhvdHRlc3QgcG9zdHMgaHRtbC5cbiAgICpcbiAgICogQHBhcmFtIHJlY3NcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIHJlbmRlciAocmVjcykge1xuICAgIHJldHVybiByZWNzLnJlZHVjZSgoaHRtbCwgZmVlZCkgPT4ge1xuICAgICAgcmV0dXJuIGh0bWwgKyBgPGRpdiBjbGFzcz1cImZiLXBvc3RcIiBkYXRhLWhyZWY9XCIke2ZlZWQucmVjLnVybH1cIiBkYXRhLXdpZHRoPVwiMzUwXCI+PC9kaXY+YFxuICAgIH0sICcnKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0L3Bvc3RzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICAvL1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaGlzdG9yeS5qcyIsImltcG9ydCBwb3N0cyBmcm9tICcuL2hvdHRlc3QvcG9zdHMnXG5cbm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICBkb20uaW5uZXJIVE1MID0gYFxuPGRpdiBjbGFzcz1cImhvdHRlc3Qtc2VjdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwicG9zdHNcIj48L2Rpdj5cbjwvZGl2PlxuYFxuXG4gIHBvc3RzLnN0YXR1cy5wYWdlID0gMVxuICBwb3N0cy5sb2FkKClcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG90dGVzdC1zZWN0aW9uIC5wb3N0cycpLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGUgPT4ge1xuICAgIGNvbnN0IHRhcmdldCA9IGUudGFyZ2V0XG5cbiAgICAvLyBzY3JvbGxXaWR0aCDmlbTpq5Tlr6zluqZcbiAgICAvLyBzY3JvbGxMZWZ0ICDmu77li5Xot53pm6JcbiAgICAvLyBvZmZzZXRXaWR0aCDlj6/oppblr6zluqYo5ZCrIG1hcmdpbilcbiAgICAvLyBjbGllbnRXaWR0aCDlj6/oppblr6zluqZcblxuICAgIGlmICh0YXJnZXQuc2Nyb2xsTGVmdCA+ICh0YXJnZXQuc2Nyb2xsV2lkdGggLSB0YXJnZXQuY2xpZW50V2lkdGggKiAyKSkge1xuICAgICAgcG9zdHMubG9hZCgpXG4gICAgfVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaG90dGVzdC5qcyIsImltcG9ydCBib29sZWFuIGZyb20gJ2Jvb2xlYW4nXG5pbXBvcnQgY29uZmlnIGZyb20gJy4uLy4uLy4uL3V0aWxzL2NvbmZpZydcbmltcG9ydCB1cFRvIGZyb20gJy4uLy4uLy4uL3V0aWxzL3VwLXRvJ1xuXG5jb25zdCByZW5kZXIgPSAoc2V0dGluZykgPT4ge1xuICBjb25zdCB0YWJsZSA9IFtcbiAgICB7IHRpdGxlOiAn57K+6YG45YuV5oWLJywgZGVzY3JpcHRpb246ICfmlrzli5XmhYvmmYLloLHkuIrltYzlhaXmiJHlgJHnsr7pgbjnmoTnhrHploDli5XmhYsnLCBrZXk6ICdmZWF0dXJlZC1mZWVkJyB9LFxuICAgIHsgdGl0bGU6ICfnp7vpmaTlu6PlkYonLCBkZXNjcmlwdGlvbjogJ+aWvOWLleaFi+aZguWgseS4iuenu+mZpOeCuui0iuWKqeeahOWLleaFiycsIGtleTogJ3JlbW92ZS1hZCcgfSxcbiAgICB7IHRpdGxlOiAn5ZCM5q2l5pCc5bCLJywgZGVzY3JpcHRpb246ICfmlrzoh4nmm7jmkJzlsIvmmYLvvIzkuIDkuKbmlrzmiJHlgJHlsIjlsazos4fmlpnluqvkuK3mkJzlsIsnLCBrZXk6ICdzeW5jLXNlYXJjaCcgfVxuICBdXG5cbiAgcmV0dXJuIHRhYmxlLnJlZHVjZSgoaHRtbCwgaXRlbSkgPT4ge1xuICAgIHJldHVybiBodG1sICsgYFxuPGRpdiBjbGFzcz1cInNldHRpbmctc2VjdGlvblwiPlxuICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cbiAgICA8Yj4ke2l0ZW0udGl0bGV9PC9iPlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJkZXNjcmlwdGlvblwiPlxuICAgIDxzcGFuPiR7aXRlbS5kZXNjcmlwdGlvbn08L3NwYW4+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cIm9wZXJhdGlvblwiPlxuICAgIDxzcGFuIGNsYXNzPVwic3VjY2Vzcy1pY29uXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWNoZWNrXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvc3Bhbj5cbiAgICBcbiAgICA8c2VsZWN0IGlkPVwiJHtpdGVtLmtleX1cIj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjBcIj5PZmY8L29wdGlvbj5cbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIjFcIiAke2Jvb2xlYW4oc2V0dGluZ1tpdGVtLmtleV0pID8gJ3NlbGVjdGVkJyA6ICcnfT5Pbjwvb3B0aW9uPlxuICAgIDwvc2VsZWN0PlxuICA8L2Rpdj5cbjwvZGl2PmBcbiAgfSwgJycpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICBjb25maWcuZ2V0KCdzZXR0aW5nJywgKHNldHRpbmcpID0+IHtcbiAgICBkb20uaW5uZXJIVE1MID0gcmVuZGVyKHNldHRpbmcpXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY3VzdG9tLW1vZGFsIC5ib3ggLmNvbnRlbnQgLnNldHRpbmctc2VjdGlvbiAub3BlcmF0aW9uIHNlbGVjdCcpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgICBub2RlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgICBzZXR0aW5nW2UudGFyZ2V0LmlkXSA9IGJvb2xlYW4oZS50YXJnZXQudmFsdWUpXG5cbiAgICAgICAgY29uZmlnLnNldCgnc2V0dGluZycsIHNldHRpbmcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBuID0gdXBUbyhlLnRhcmdldCwgJ2RpdicpLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuXG4gICAgICAgICAgbi5jbGFzc05hbWUgPSBuLmNsYXNzTmFtZS5yZXBsYWNlKC8gP2FuaS9nLCAnJylcblxuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBuLmNsYXNzTmFtZSArPSAnIGFuaScgfSwgMSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSlcbiAgfSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3NldHRpbmcuanMiLCJtb2R1bGUuZXhwb3J0cyA9IChkb20pID0+IHtcbiAgLy9cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3N0YXRpc3RpY3MuanMiLCJpbXBvcnQgZG90UHJvcCBmcm9tICdkb3QtcHJvcCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICAvKipcbiAgICogR2V0IGNvbnRlbnQgZnJvbSBzdG9yYWdlIGFuZCBwYXNzIHRoZSByZXN1bHQgdG8gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm5zIHZvaWRcbiAgICovXG4gIGdldCAoa2V5LCBjYiA9IG51bGwpIHtcbiAgICBpZiAobnVsbCA9PT0gY2IpIHtcbiAgICAgIFtrZXksIGNiXSA9IFsnJywga2V5XVxuICAgIH1cblxuICAgIGNvbnN0IHBvcyA9IGtleS5pbmRleE9mKCcuJylcblxuICAgIGNvbnN0IGsgPSAoLTEgIT09IHBvcyA/IGtleS5zbGljZSgwLCBwb3MpIDoga2V5KSB8fCBudWxsXG5cbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoaywgaXRlbXMgPT4ge1xuICAgICAgaWYgKG51bGwgIT09IGsgJiYgaXRlbXMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgaXRlbXMgPSBpdGVtc1trXVxuXG4gICAgICAgIGlmICgtMSAhPT0gcG9zKSB7XG4gICAgICAgICAgaXRlbXMgPSBkb3RQcm9wLmdldChpdGVtcywga2V5LnNsaWNlKHBvcyArIDEpLCB7fSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjYihpdGVtcylcbiAgICB9KVxuICB9LFxuXG4gIC8qKlxuICAgKiBTdG9yZSBjb250ZW50IHRvIHN0b3JhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSBrZXlcbiAgICogQHBhcmFtIHZhbFxuICAgKiBAcGFyYW0gY2JcbiAgICpcbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgc2V0IChrZXksIHZhbCwgY2IgPSBudWxsKSB7XG4gICAgaWYgKCEga2V5LmluY2x1ZGVzKCcuJykpIHtcbiAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldCh7IFtrZXldOiB2YWwgfSwgY2IpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHBvcyA9IGtleS5pbmRleE9mKCcuJylcblxuICAgICAgdGhpcy5nZXQoa2V5LnNsaWNlKDAsIHBvcyksIGl0ZW0gPT4ge1xuICAgICAgICBkb3RQcm9wLnNldChpdGVtLCBrZXkuc3Vic3RyKHBvcyArIDEpLCB2YWwpXG5cbiAgICAgICAgdGhpcy5zZXQoa2V5LnNsaWNlKDAsIHBvcyksIGl0ZW0sIGNiKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy91dGlscy9jb25maWcuanMiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVxdWlyZWQgPSByZXF1aXJlKCdyZXF1aXJlcy1wb3J0JylcbiAgLCBsb2xjYXRpb24gPSByZXF1aXJlKCcuL2xvbGNhdGlvbicpXG4gICwgcXMgPSByZXF1aXJlKCdxdWVyeXN0cmluZ2lmeScpXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFNcXHNdKikvaTtcblxuLyoqXG4gKiBUaGVzZSBhcmUgdGhlIHBhcnNlIHJ1bGVzIGZvciB0aGUgVVJMIHBhcnNlciwgaXQgaW5mb3JtcyB0aGUgcGFyc2VyXG4gKiBhYm91dDpcbiAqXG4gKiAwLiBUaGUgY2hhciBpdCBOZWVkcyB0byBwYXJzZSwgaWYgaXQncyBhIHN0cmluZyBpdCBzaG91bGQgYmUgZG9uZSB1c2luZ1xuICogICAgaW5kZXhPZiwgUmVnRXhwIHVzaW5nIGV4ZWMgYW5kIE5hTiBtZWFucyBzZXQgYXMgY3VycmVudCB2YWx1ZS5cbiAqIDEuIFRoZSBwcm9wZXJ0eSB3ZSBzaG91bGQgc2V0IHdoZW4gcGFyc2luZyB0aGlzIHZhbHVlLlxuICogMi4gSW5kaWNhdGlvbiBpZiBpdCdzIGJhY2t3YXJkcyBvciBmb3J3YXJkIHBhcnNpbmcsIHdoZW4gc2V0IGFzIG51bWJlciBpdCdzXG4gKiAgICB0aGUgdmFsdWUgb2YgZXh0cmEgY2hhcnMgdGhhdCBzaG91bGQgYmUgc3BsaXQgb2ZmLlxuICogMy4gSW5oZXJpdCBmcm9tIGxvY2F0aW9uIGlmIG5vbiBleGlzdGluZyBpbiB0aGUgcGFyc2VyLlxuICogNC4gYHRvTG93ZXJDYXNlYCB0aGUgcmVzdWx0aW5nIHZhbHVlLlxuICovXG52YXIgcnVsZXMgPSBbXG4gIFsnIycsICdoYXNoJ10sICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJz8nLCAncXVlcnknXSwgICAgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKykkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcmV0dXJuIHtQcm90b2NvbEV4dHJhY3R9IEV4dHJhY3RlZCBpbmZvcm1hdGlvbi5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBleHRyYWN0UHJvdG9jb2woYWRkcmVzcykge1xuICB2YXIgbWF0Y2ggPSBwcm90b2NvbHJlLmV4ZWMoYWRkcmVzcyk7XG5cbiAgcmV0dXJuIHtcbiAgICBwcm90b2NvbDogbWF0Y2hbMV0gPyBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpIDogJycsXG4gICAgc2xhc2hlczogISFtYXRjaFsyXSxcbiAgICByZXN0OiBtYXRjaFszXVxuICB9O1xufVxuXG4vKipcbiAqIFJlc29sdmUgYSByZWxhdGl2ZSBVUkwgcGF0aG5hbWUgYWdhaW5zdCBhIGJhc2UgVVJMIHBhdGhuYW1lLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSByZWxhdGl2ZSBQYXRobmFtZSBvZiB0aGUgcmVsYXRpdmUgVVJMLlxuICogQHBhcmFtIHtTdHJpbmd9IGJhc2UgUGF0aG5hbWUgb2YgdGhlIGJhc2UgVVJMLlxuICogQHJldHVybiB7U3RyaW5nfSBSZXNvbHZlZCBwYXRobmFtZS5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlKHJlbGF0aXZlLCBiYXNlKSB7XG4gIHZhciBwYXRoID0gKGJhc2UgfHwgJy8nKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5jb25jYXQocmVsYXRpdmUuc3BsaXQoJy8nKSlcbiAgICAsIGkgPSBwYXRoLmxlbmd0aFxuICAgICwgbGFzdCA9IHBhdGhbaSAtIDFdXG4gICAgLCB1bnNoaWZ0ID0gZmFsc2VcbiAgICAsIHVwID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHBhdGhbaV0gPT09ICcuJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXRoW2ldID09PSAnLi4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgaWYgKGkgPT09IDApIHVuc2hpZnQgPSB0cnVlO1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1bnNoaWZ0KSBwYXRoLnVuc2hpZnQoJycpO1xuICBpZiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHBhdGgucHVzaCgnJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbignLycpO1xufVxuXG4vKipcbiAqIFRoZSBhY3R1YWwgVVJMIGluc3RhbmNlLiBJbnN0ZWFkIG9mIHJldHVybmluZyBhbiBvYmplY3Qgd2UndmUgb3B0ZWQtaW4gdG9cbiAqIGNyZWF0ZSBhbiBhY3R1YWwgY29uc3RydWN0b3IgYXMgaXQncyBtdWNoIG1vcmUgbWVtb3J5IGVmZmljaWVudCBhbmRcbiAqIGZhc3RlciBhbmQgaXQgcGxlYXNlcyBteSBPQ0QuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBwYXJzZS5cbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jYXRpb24gTG9jYXRpb24gZGVmYXVsdHMgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBwYXJzZXIgUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gVVJMKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFVSTCkpIHtcbiAgICByZXR1cm4gbmV3IFVSTChhZGRyZXNzLCBsb2NhdGlvbiwgcGFyc2VyKTtcbiAgfVxuXG4gIHZhciByZWxhdGl2ZSwgZXh0cmFjdGVkLCBwYXJzZSwgaW5zdHJ1Y3Rpb24sIGluZGV4LCBrZXlcbiAgICAsIGluc3RydWN0aW9ucyA9IHJ1bGVzLnNsaWNlKClcbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jYXRpb25cbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGkgPSAwO1xuXG4gIC8vXG4gIC8vIFRoZSBmb2xsb3dpbmcgaWYgc3RhdGVtZW50cyBhbGxvd3MgdGhpcyBtb2R1bGUgdHdvIGhhdmUgY29tcGF0aWJpbGl0eSB3aXRoXG4gIC8vIDIgZGlmZmVyZW50IEFQSTpcbiAgLy9cbiAgLy8gMS4gTm9kZS5qcydzIGB1cmwucGFyc2VgIGFwaSB3aGljaCBhY2NlcHRzIGEgVVJMLCBib29sZWFuIGFzIGFyZ3VtZW50c1xuICAvLyAgICB3aGVyZSB0aGUgYm9vbGVhbiBpbmRpY2F0ZXMgdGhhdCB0aGUgcXVlcnkgc3RyaW5nIHNob3VsZCBhbHNvIGJlIHBhcnNlZC5cbiAgLy9cbiAgLy8gMi4gVGhlIGBVUkxgIGludGVyZmFjZSBvZiB0aGUgYnJvd3NlciB3aGljaCBhY2NlcHRzIGEgVVJMLCBvYmplY3QgYXNcbiAgLy8gICAgYXJndW1lbnRzLiBUaGUgc3VwcGxpZWQgb2JqZWN0IHdpbGwgYmUgdXNlZCBhcyBkZWZhdWx0IHZhbHVlcyAvIGZhbGwtYmFja1xuICAvLyAgICBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gIC8vXG4gIGlmICgnb2JqZWN0JyAhPT0gdHlwZSAmJiAnc3RyaW5nJyAhPT0gdHlwZSkge1xuICAgIHBhcnNlciA9IGxvY2F0aW9uO1xuICAgIGxvY2F0aW9uID0gbnVsbDtcbiAgfVxuXG4gIGlmIChwYXJzZXIgJiYgJ2Z1bmN0aW9uJyAhPT0gdHlwZW9mIHBhcnNlcikgcGFyc2VyID0gcXMucGFyc2U7XG5cbiAgbG9jYXRpb24gPSBsb2xjYXRpb24obG9jYXRpb24pO1xuXG4gIC8vXG4gIC8vIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gYmVmb3JlIHJ1bm5pbmcgdGhlIGluc3RydWN0aW9ucy5cbiAgLy9cbiAgZXh0cmFjdGVkID0gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MgfHwgJycpO1xuICByZWxhdGl2ZSA9ICFleHRyYWN0ZWQucHJvdG9jb2wgJiYgIWV4dHJhY3RlZC5zbGFzaGVzO1xuICB1cmwuc2xhc2hlcyA9IGV4dHJhY3RlZC5zbGFzaGVzIHx8IHJlbGF0aXZlICYmIGxvY2F0aW9uLnNsYXNoZXM7XG4gIHVybC5wcm90b2NvbCA9IGV4dHJhY3RlZC5wcm90b2NvbCB8fCBsb2NhdGlvbi5wcm90b2NvbCB8fCAnJztcbiAgYWRkcmVzcyA9IGV4dHJhY3RlZC5yZXN0O1xuXG4gIC8vXG4gIC8vIFdoZW4gdGhlIGF1dGhvcml0eSBjb21wb25lbnQgaXMgYWJzZW50IHRoZSBVUkwgc3RhcnRzIHdpdGggYSBwYXRoXG4gIC8vIGNvbXBvbmVudC5cbiAgLy9cbiAgaWYgKCFleHRyYWN0ZWQuc2xhc2hlcykgaW5zdHJ1Y3Rpb25zWzJdID0gWy8oLiopLywgJ3BhdGhuYW1lJ107XG5cbiAgZm9yICg7IGkgPCBpbnN0cnVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICBpbnN0cnVjdGlvbiA9IGluc3RydWN0aW9uc1tpXTtcbiAgICBwYXJzZSA9IGluc3RydWN0aW9uWzBdO1xuICAgIGtleSA9IGluc3RydWN0aW9uWzFdO1xuXG4gICAgaWYgKHBhcnNlICE9PSBwYXJzZSkge1xuICAgICAgdXJsW2tleV0gPSBhZGRyZXNzO1xuICAgIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiBwYXJzZSkge1xuICAgICAgaWYgKH4oaW5kZXggPSBhZGRyZXNzLmluZGV4T2YocGFyc2UpKSkge1xuICAgICAgICBpZiAoJ251bWJlcicgPT09IHR5cGVvZiBpbnN0cnVjdGlvblsyXSkge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoaW5kZXggKyBpbnN0cnVjdGlvblsyXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpbmRleCA9IHBhcnNlLmV4ZWMoYWRkcmVzcykpKSB7XG4gICAgICB1cmxba2V5XSA9IGluZGV4WzFdO1xuICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXguaW5kZXgpO1xuICAgIH1cblxuICAgIHVybFtrZXldID0gdXJsW2tleV0gfHwgKFxuICAgICAgcmVsYXRpdmUgJiYgaW5zdHJ1Y3Rpb25bM10gPyBsb2NhdGlvbltrZXldIHx8ICcnIDogJydcbiAgICApO1xuXG4gICAgLy9cbiAgICAvLyBIb3N0bmFtZSwgaG9zdCBhbmQgcHJvdG9jb2wgc2hvdWxkIGJlIGxvd2VyY2FzZWQgc28gdGhleSBjYW4gYmUgdXNlZCB0b1xuICAgIC8vIGNyZWF0ZSBhIHByb3BlciBgb3JpZ2luYC5cbiAgICAvL1xuICAgIGlmIChpbnN0cnVjdGlvbls0XSkgdXJsW2tleV0gPSB1cmxba2V5XS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgLy9cbiAgLy8gQWxzbyBwYXJzZSB0aGUgc3VwcGxpZWQgcXVlcnkgc3RyaW5nIGluIHRvIGFuIG9iamVjdC4gSWYgd2UncmUgc3VwcGxpZWRcbiAgLy8gd2l0aCBhIGN1c3RvbSBwYXJzZXIgYXMgZnVuY3Rpb24gdXNlIHRoYXQgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdCBidWlsZC1pblxuICAvLyBwYXJzZXIuXG4gIC8vXG4gIGlmIChwYXJzZXIpIHVybC5xdWVyeSA9IHBhcnNlcih1cmwucXVlcnkpO1xuXG4gIC8vXG4gIC8vIElmIHRoZSBVUkwgaXMgcmVsYXRpdmUsIHJlc29sdmUgdGhlIHBhdGhuYW1lIGFnYWluc3QgdGhlIGJhc2UgVVJMLlxuICAvL1xuICBpZiAoXG4gICAgICByZWxhdGl2ZVxuICAgICYmIGxvY2F0aW9uLnNsYXNoZXNcbiAgICAmJiB1cmwucGF0aG5hbWUuY2hhckF0KDApICE9PSAnLydcbiAgICAmJiAodXJsLnBhdGhuYW1lICE9PSAnJyB8fCBsb2NhdGlvbi5wYXRobmFtZSAhPT0gJycpXG4gICkge1xuICAgIHVybC5wYXRobmFtZSA9IHJlc29sdmUodXJsLnBhdGhuYW1lLCBsb2NhdGlvbi5wYXRobmFtZSk7XG4gIH1cblxuICAvL1xuICAvLyBXZSBzaG91bGQgbm90IGFkZCBwb3J0IG51bWJlcnMgaWYgdGhleSBhcmUgYWxyZWFkeSB0aGUgZGVmYXVsdCBwb3J0IG51bWJlclxuICAvLyBmb3IgYSBnaXZlbiBwcm90b2NvbC4gQXMgdGhlIGhvc3QgYWxzbyBjb250YWlucyB0aGUgcG9ydCBudW1iZXIgd2UncmUgZ29pbmdcbiAgLy8gb3ZlcnJpZGUgaXQgd2l0aCB0aGUgaG9zdG5hbWUgd2hpY2ggY29udGFpbnMgbm8gcG9ydCBudW1iZXIuXG4gIC8vXG4gIGlmICghcmVxdWlyZWQodXJsLnBvcnQsIHVybC5wcm90b2NvbCkpIHtcbiAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZTtcbiAgICB1cmwucG9ydCA9ICcnO1xuICB9XG5cbiAgLy9cbiAgLy8gUGFyc2UgZG93biB0aGUgYGF1dGhgIGZvciB0aGUgdXNlcm5hbWUgYW5kIHBhc3N3b3JkLlxuICAvL1xuICB1cmwudXNlcm5hbWUgPSB1cmwucGFzc3dvcmQgPSAnJztcbiAgaWYgKHVybC5hdXRoKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSB1cmwuYXV0aC5zcGxpdCgnOicpO1xuICAgIHVybC51c2VybmFtZSA9IGluc3RydWN0aW9uWzBdIHx8ICcnO1xuICAgIHVybC5wYXNzd29yZCA9IGluc3RydWN0aW9uWzFdIHx8ICcnO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICAvL1xuICAvLyBUaGUgaHJlZiBpcyBqdXN0IHRoZSBjb21waWxlZCByZXN1bHQuXG4gIC8vXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNoYW5naW5nIHByb3BlcnRpZXMgaW4gdGhlIFVSTCBpbnN0YW5jZSB0b1xuICogaW5zdXJlIHRoYXQgdGhleSBhbGwgcHJvcGFnYXRlIGNvcnJlY3RseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFydCAgICAgICAgICBQcm9wZXJ0eSB3ZSBuZWVkIHRvIGFkanVzdC5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlICAgICAgICAgIFRoZSBuZXdseSBhc3NpZ25lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gZm4gIFdoZW4gc2V0dGluZyB0aGUgcXVlcnksIGl0IHdpbGwgYmUgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIHRvIHBhcnNlIHRoZSBxdWVyeS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gc2V0dGluZyB0aGUgcHJvdG9jb2wsIGRvdWJsZSBzbGFzaCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGZpbmFsIHVybCBpZiBpdCBpcyB0cnVlLlxuICogQHJldHVybnMge1VSTH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHNldChwYXJ0LCB2YWx1ZSwgZm4pIHtcbiAgdmFyIHVybCA9IHRoaXM7XG5cbiAgc3dpdGNoIChwYXJ0KSB7XG4gICAgY2FzZSAncXVlcnknOlxuICAgICAgaWYgKCdzdHJpbmcnID09PSB0eXBlb2YgdmFsdWUgJiYgdmFsdWUubGVuZ3RoKSB7XG4gICAgICAgIHZhbHVlID0gKGZuIHx8IHFzLnBhcnNlKSh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwb3J0JzpcbiAgICAgIHVybFtwYXJ0XSA9IHZhbHVlO1xuXG4gICAgICBpZiAoIXJlcXVpcmVkKHZhbHVlLCB1cmwucHJvdG9jb2wpKSB7XG4gICAgICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgICAgICB1cmxbcGFydF0gPSAnJztcbiAgICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWUgKyc6JysgdmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdG5hbWUnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICh1cmwucG9ydCkgdmFsdWUgKz0gJzonKyB1cmwucG9ydDtcbiAgICAgIHVybC5ob3N0ID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2hvc3QnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICgvOlxcZCskLy50ZXN0KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgICAgIHVybC5wb3J0ID0gdmFsdWUucG9wKCk7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlLmpvaW4oJzonKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC5ob3N0bmFtZSA9IHZhbHVlO1xuICAgICAgICB1cmwucG9ydCA9ICcnO1xuICAgICAgfVxuXG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3Byb3RvY29sJzpcbiAgICAgIHVybC5wcm90b2NvbCA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB1cmwuc2xhc2hlcyA9ICFmbjtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncGF0aG5hbWUnOlxuICAgICAgdXJsLnBhdGhuYW1lID0gdmFsdWUubGVuZ3RoICYmIHZhbHVlLmNoYXJBdCgwKSAhPT0gJy8nID8gJy8nICsgdmFsdWUgOiB2YWx1ZTtcblxuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gIH1cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHJ1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGlucyA9IHJ1bGVzW2ldO1xuXG4gICAgaWYgKGluc1s0XSkgdXJsW2luc1sxXV0gPSB1cmxbaW5zWzFdXS50b0xvd2VyQ2FzZSgpO1xuICB9XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAmJiB1cmwuaG9zdCAmJiB1cmwucHJvdG9jb2wgIT09ICdmaWxlOidcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICB1cmwuaHJlZiA9IHVybC50b1N0cmluZygpO1xuXG4gIHJldHVybiB1cmw7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgcHJvcGVydGllcyBiYWNrIGluIHRvIGEgdmFsaWQgYW5kIGZ1bGwgVVJMIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzdHJpbmdpZnkgT3B0aW9uYWwgcXVlcnkgc3RyaW5naWZ5IGZ1bmN0aW9uLlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHN0cmluZ2lmeSkge1xuICBpZiAoIXN0cmluZ2lmeSB8fCAnZnVuY3Rpb24nICE9PSB0eXBlb2Ygc3RyaW5naWZ5KSBzdHJpbmdpZnkgPSBxcy5zdHJpbmdpZnk7XG5cbiAgdmFyIHF1ZXJ5XG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBwcm90b2NvbCA9IHVybC5wcm90b2NvbDtcblxuICBpZiAocHJvdG9jb2wgJiYgcHJvdG9jb2wuY2hhckF0KHByb3RvY29sLmxlbmd0aCAtIDEpICE9PSAnOicpIHByb3RvY29sICs9ICc6JztcblxuICB2YXIgcmVzdWx0ID0gcHJvdG9jb2wgKyAodXJsLnNsYXNoZXMgPyAnLy8nIDogJycpO1xuXG4gIGlmICh1cmwudXNlcm5hbWUpIHtcbiAgICByZXN1bHQgKz0gdXJsLnVzZXJuYW1lO1xuICAgIGlmICh1cmwucGFzc3dvcmQpIHJlc3VsdCArPSAnOicrIHVybC5wYXNzd29yZDtcbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9XG5cbiAgcmVzdWx0ICs9IHVybC5ob3N0ICsgdXJsLnBhdGhuYW1lO1xuXG4gIHF1ZXJ5ID0gJ29iamVjdCcgPT09IHR5cGVvZiB1cmwucXVlcnkgPyBzdHJpbmdpZnkodXJsLnF1ZXJ5KSA6IHVybC5xdWVyeTtcbiAgaWYgKHF1ZXJ5KSByZXN1bHQgKz0gJz8nICE9PSBxdWVyeS5jaGFyQXQoMCkgPyAnPycrIHF1ZXJ5IDogcXVlcnk7XG5cbiAgaWYgKHVybC5oYXNoKSByZXN1bHQgKz0gdXJsLmhhc2g7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuVVJMLnByb3RvdHlwZSA9IHsgc2V0OiBzZXQsIHRvU3RyaW5nOiB0b1N0cmluZyB9O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBVUkwgcGFyc2VyIGFuZCBzb21lIGFkZGl0aW9uYWwgcHJvcGVydGllcyB0aGF0IG1pZ2h0IGJlIHVzZWZ1bCBmb3Jcbi8vIG90aGVycyBvciB0ZXN0aW5nLlxuLy9cblVSTC5leHRyYWN0UHJvdG9jb2wgPSBleHRyYWN0UHJvdG9jb2w7XG5VUkwubG9jYXRpb24gPSBsb2xjYXRpb247XG5VUkwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVUkw7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLXBhcnNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgdXBUbyBmcm9tICcuLi8uLi91dGlscy91cC10bydcblxuLyoqXG4gKiBDcmVhdGUgYSBmb250IGF3ZXNvbWUgaWNvbiBub2RlLlxuICpcbiAqIEBwYXJhbSBpY29uXG4gKiBAcGFyYW0gbmFtZVxuICpcbiAqIEByZXR1cm5zIHN0cmluZ1xuICovXG5mdW5jdGlvbiBpY29uTm9kZSAoaWNvbiwgbmFtZSkge1xuICByZXR1cm4gYDxpIGNsYXNzPVwiZmEgZmEtZncgZmEtJHtpY29ufVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEtaG92ZXI9XCJ0b29sdGlwXCIgZGF0YS10b29sdGlwLWRlbGF5PVwiMzUwXCIgZGF0YS10b29sdGlwLWNvbnRlbnQ9XCIke25hbWV9XCI+PC9pPmBcbn1cblxuLyoqXG4gKiBBZGQgYnV0dG9ucyBpbiB0aGUgcmlnaHQgb2Ygc2VhcmNoIGJhci5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tYnV0dG9uJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbiR7aWNvbk5vZGUoJ2ZpcmUnLCAn54ax6ZaA57KJ5bCIJyl9XG4ke2ljb25Ob2RlKCdiYXItY2hhcnQnLCAn5YCL5Lq657Wx6KiIJyl9XG4ke2ljb25Ob2RlKCdoaXN0b3J5JywgJ+att+WPsuWbnumhpycpfVxuJHtpY29uTm9kZSgnY29nJywgJ+ioreWumicpfWBcblxuICB1cFRvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdi5jdXN0b20tc2VhcmNoLWJhcicpLCAnZGl2JykuYXBwZW5kKG5vZGUpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9idXR0b24uanMiLCIvKipcbiAqIEFkZCBtb2RhbC5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcblxuICBub2RlLmNsYXNzTmFtZSA9ICdjdXN0b20tbW9kYWwnXG4gIG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbjxkaXYgY2xhc3M9XCJiYWNrZ3JvdW5kXCI+PC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJib3hcIj5cbiAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tbGVmdDogMXJlbTtcIj5cbiAgICAgIDxiIGlkPVwiY3VzdG9tLW1vZGFsLXRpdGxlXCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCI+PC9iPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjbG9zZS1idXR0b25cIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtbGcgZmEtdGltZXNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cImNvbnRlbnRcIj48L2Rpdj5cbjwvZGl2PmBcblxuICBkb2N1bWVudC5ib2R5LmFwcGVuZChub2RlKVxuXG4gIGNvbnN0IGNsb3NlRXZlbnQgPSAoKSA9PiB7XG4gICAgbm9kZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93WSA9ICcnXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5ib3ggLmNvbnRlbnQnKS5pbm5lckhUTUwgPSAnJ1xuICB9XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuYmFja2dyb3VuZCcpLm9uY2xpY2sgPSBjbG9zZUV2ZW50XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwgLmNsb3NlLWJ1dHRvbiBpJykub25jbGljayA9IGNsb3NlRXZlbnRcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL21vZGFsLmpzIiwiLyoqXG4gKiBBZGQgY2xhc3MgdG8gZmFjZWJvb2sgbmF2YmFyLlxuICpcbiAqIEBwYXJhbSBkb21cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZG9tID0+IHtcbiAgZG9tLmNsYXNzTmFtZSArPSAnIGN1c3RvbS1uYXZiYXInXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9uYXZiYXIuanMiLCIvKipcbiAqIEFkZCBzZWFyY2ggYmFyIGluIHRoZSByaWdodCBvZiBmYWNlYm9vayBzZWFyY2ggYmFyLlxuICpcbiAqIEBwYXJhbSBkb21cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZG9tID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgbm9kZS5jbGFzc05hbWUgPSAnY3VzdG9tLXNlYXJjaC1iYXInXG4gIG5vZGUuaW5uZXJIVE1MID0gYFxuPGZvcm0+XG4gIDxkaXY+XG4gICAgPGlucHV0IGlkPVwiY3VzdG9tLXNlYXJjaC1pbnB1dFwiIHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggREJcIj5cbiAgPC9kaXY+XG48L2Zvcm0+YFxuXG4gIGRvbS5hcHBlbmQobm9kZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXIuanMiLCJtb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmN1c3RvbS1idXR0b24gaScpLmZvckVhY2gobm9kZSA9PiB7XG4gICAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VzdG9tLW1vZGFsLXRpdGxlJykuaW5uZXJUZXh0ID0gZS50YXJnZXQuZGF0YXNldC50b29sdGlwQ29udGVudFxuXG4gICAgICBjb25zdCBtYXBwaW5nID0ge1xuICAgICAgICAnZmlyZSc6ICdob3R0ZXN0JyxcbiAgICAgICAgJ2Jhci1jaGFydCc6ICdzdGF0aXN0aWNzJyxcbiAgICAgICAgJ2hpc3RvcnknOiAnaGlzdG9yeScsXG4gICAgICAgICdjb2cnOiAnc2V0dGluZydcbiAgICAgIH1cblxuICAgICAgbGV0IG5hbWUgPSBlLnRhcmdldC5jbGFzc05hbWVcblxuICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKG5hbWUubGFzdEluZGV4T2YoJ2ZhLScpICsgMylcblxuICAgICAgcmVxdWlyZSgnLi9tb2RhbHMvJyArIG1hcHBpbmdbbmFtZV0pKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwgLmJveCAuY29udGVudCcpKVxuICAgIH0pXG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2J1dHRvbi1jbGljay5qcyIsIi8qKlxuICogTGlzdGVuIGZvciBmYWNlYm9vayBzZWFyY2guXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5jb25zdCBzZWFyY2ggPSAoKSA9PiB7XG4gIGNvbnN0IGZiU2VhcmNoSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbbmFtZT1cInFcIl0nKVxuXG4gIGlmICgyID4gZmJTZWFyY2hJbnB1dHMubGVuZ3RoICYmICEgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3EnKSkge1xuICAgIHdpbmRvdy5zZXRUaW1lb3V0KHNlYXJjaCwgMTAwMClcbiAgfSBlbHNlIHtcbiAgICBmYlNlYXJjaElucHV0cy5pdGVtKGZiU2VhcmNoSW5wdXRzLmxlbmd0aCAtIDEpLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjdXN0b20tc2VhcmNoLWlucHV0JykudmFsdWUgPSBlLnRhcmdldC52YWx1ZVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZWFyY2hcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmFjZWJvb2stc2VhcmNoLmpzIiwiaW1wb3J0IGNvbmZpZyBmcm9tICcuLi8uLi91dGlscy9jb25maWcnXG5pbXBvcnQgcGFyc2VGYmlkIGZyb20gJy4vZmVlZC1oZWxwZXJzL3BhcnNlLWZiaWQnXG5pbXBvcnQgaW5TY3JlZW4gZnJvbSAnLi9mZWVkLWhlbHBlcnMvaW4tc2NyZWVuJ1xuaW1wb3J0IGlzUHVibGljIGZyb20gJy4vZmVlZC1oZWxwZXJzL2lzLXB1YmxpYydcbmltcG9ydCBpc1Nwb25zb3JlZCBmcm9tICcuL2ZlZWQtaGVscGVycy9pcy1zcG9uc29yZWQnXG5cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBmZWVkcyA9IFtdXG5cbiAgbGV0IGxhc3RZID0gMFxuXG4gIHdpbmRvdy5vbnNjcm9sbCA9ICgpID0+IHtcbiAgICBpZiAoJy8nICE9PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpIHtcbiAgICAgIGxhc3RZID0gMFxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdkaXZbaWRePVwiaHlwZXJmZWVkX3N0b3J5X2lkXCJdJykuZm9yRWFjaChmZWVkID0+IHtcbiAgICAgIGlmIChpc1Nwb25zb3JlZChmZWVkKSkge1xuICAgICAgICByZXR1cm4gY29uZmlnLmdldCgnc2V0dGluZy5yZW1vdmUtYWQnLCByZW1vdmUgPT4ge1xuICAgICAgICAgIHJldHVybiByZW1vdmUgJiYgZmVlZC5yZW1vdmUoKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmIChpc1B1YmxpYyhmZWVkKSkge1xuICAgICAgICBjb25zdCBmYmlkID0gcGFyc2VGYmlkKGZlZWQucXVlcnlTZWxlY3RvcignZGl2IHNwYW4gc3BhbiBhOm5vdChbZGF0YS1ob3ZlcmNhcmQtcHJlZmVyLW1vcmUtY29udGVudC1zaG93XSknKS5ocmVmKVxuXG4gICAgICAgIGlmIChmYmlkKSB7XG4gICAgICAgICAgaWYgKCEgZmVlZHMuaW5jbHVkZXMoZmJpZCkpIHtcbiAgICAgICAgICAgIGZlZWRzLnB1c2goZmJpZClcblxuICAgICAgICAgICAgY29uZmlnLnNldCgnZmVlZHMnLCBmZWVkcylcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaW5TY3JlZW4oZmVlZCkpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKDAgPiB3aW5kb3cuc2Nyb2xsWSAtIGxhc3RZID8gJ2JhY2snIDogJycsIGZiaWQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcblxuICAgIGxhc3RZID0gd2luZG93LnNjcm9sbFlcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy91c2VyLWZlZWQuanMiLCIvKipcbiAqIERldGVybWluZSB0aGUgZmVlZCBpcyBpbiBzY3JlZW4gb3Igbm90LlxuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGZlZWQpID0+IHtcbiAgY29uc3QgcmVjdCA9IGZlZWQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcblxuICBjb25zdCBzY3JlZW4gPSB7XG4gICAgdG9wOiB3aW5kb3cuc2Nyb2xsWSxcbiAgICBib3R0b206IHdpbmRvdy5zY3JvbGxZICsgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuICB9XG5cbiAgY29uc3QgZWwgPSB7XG4gICAgdG9wOiBmZWVkLm9mZnNldFRvcCArIHJlY3QuaGVpZ2h0IC8gMyxcbiAgICBib3R0b206IGZlZWQub2Zmc2V0VG9wICsgcmVjdC5oZWlnaHQgLyAzICogMlxuICB9XG5cbiAgaWYgKGVsLnRvcCA+IHNjcmVlbi50b3AgJiYgZWwudG9wIDwgc2NyZWVuLmJvdHRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH0gZWxzZSBpZiAoZWwuYm90dG9tID4gc2NyZWVuLnRvcCAmJiBlbC5ib3R0b20gPCBzY3JlZW4uYm90dG9tKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaW4tc2NyZWVuLmpzIiwiLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGZlZWQgaXMgcHVibGljIG9yIG5vdC5cbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmZWVkKSA9PiB7XG4gIGxldCBwcml2YWN5ID0gZmVlZC5xdWVyeVNlbGVjdG9yKCdhW2RhdGEtaG92ZXI9XCJ0b29sdGlwXCJdW2NsYXNzKj1cIlByaXZhY3lcIl0sIGRpdltkYXRhLWhvdmVyPVwidG9vbHRpcFwiXScpXG5cbiAgaWYgKCEgcHJpdmFjeSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgcHJpdmFjeSA9IHByaXZhY3kuZ2V0QXR0cmlidXRlKCdkYXRhLXRvb2x0aXAtY29udGVudCcpXG5cbiAgcmV0dXJuIHByaXZhY3kuaW5jbHVkZXMoJ1B1YmxpYycpIHx8IHByaXZhY3kuaW5jbHVkZXMoJ+WFrOmWiycpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1wdWJsaWMuanMiLCIvKipcbiAqIERldGVybWluZSB0aGUgZmVlZCBpcyBzcG9uc29yZWQgb3Igbm90LlxuICpcbiAqIEByZXR1cm5zIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgKGZlZWQpID0+IHtcbiAgY29uc3QgaXNTcG9uc29yZWQgPSBmZWVkLnF1ZXJ5U2VsZWN0b3IoJ2FbaHJlZl49XCJodHRwczovL2wuZmFjZWJvb2suY29tL2wucGhwXCJdJylcblxuICBpZiAoISBpc1Nwb25zb3JlZCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgc3dpdGNoIChpc1Nwb25zb3JlZC5pbm5lclRleHQpIHtcbiAgICBjYXNlICdTcG9uc29yZWQnOlxuICAgIGNhc2UgJ+i0iuWKqSc6XG4gICAgY2FzZSAn5bqD5ZGKJzpcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXNwb25zb3JlZC5qcyIsImltcG9ydCB1cmxQYXJzZSBmcm9tICd1cmwtcGFyc2UnXG5cbmNvbnN0IHBhcnNlZFVybHMgPSB7fVxuXG4vKipcbiAqIFBhcnNlIGZiaWQgZnJvbSB1cmwuXG4gKlxuICogQHJldHVybnMgc3RyaW5nfG51bGxcbiAqL1xuY29uc3QgZnJvbVVybCA9IHVybCA9PiB7XG4gIGlmIChwYXJzZWRVcmxzLmhhc093blByb3BlcnR5KHVybCkpIHtcbiAgICByZXR1cm4gcGFyc2VkVXJsc1t1cmxdXG4gIH1cblxuICBjb25zdCBwYXJzZWQgPSB1cmxQYXJzZSh1cmwsIHRydWUpXG4gIGNvbnN0IHF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5XG4gIGNvbnN0IHBhdGhuYW1lID0gcGFyc2VkLnBhdGhuYW1lLnJlcGxhY2UoL1xcLyskLywgJycpXG5cbiAgbGV0IHJlc3VsdFxuXG4gIGlmIChwYXRobmFtZS5lbmRzV2l0aCgnOjMnKSB8fCBwYXRobmFtZS5lbmRzV2l0aCgnOjAnKSkge1xuICAgIHJlc3VsdCA9IG51bGxcbiAgfSBlbHNlIGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eSgnc3RvcnlfZmJpZCcpKSB7XG4gICAgcmVzdWx0ID0gcXVlcnkuc3RvcnlfZmJpZFxuICB9IGVsc2UgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KCdmYmlkJykpIHtcbiAgICByZXN1bHQgPSBxdWVyeS5mYmlkXG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gcGF0aG5hbWUuc2xpY2UocGF0aG5hbWUubGFzdEluZGV4T2YoJy8nKSArIDEpXG4gIH1cblxuICBwYXJzZWRVcmxzW3VybF0gPSByZXN1bHRcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogUGFyc2UgZmJpZCBmcm9tIGdpdmVuIHZhbHVlLlxuICpcbiAqIEByZXR1cm5zIHN0cmluZ3xudWxsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHZhbCA9PiB7XG4gIGlmICh2YWwubWF0Y2goLyhcXGIoaHR0cHM/KTpcXC9cXC9bLUEtWjAtOSsmQCNcXC8lPz1+X3whOiwuO10qWy1BLVowLTkrJkAjXFwvJT1+X3xdKS9pZykpIHtcbiAgICByZXR1cm4gZnJvbVVybCh2YWwpXG4gIH1cblxuICBjb25zb2xlLmVycm9yKGBmYmlkIHVua25vd24gdHlwZTogJHt2YWx9YClcblxuICByZXR1cm4gbnVsbFxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBib29sZWFuID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIC9eKHRydWV8dHx5ZXN8eXwxKSQvaS50ZXN0KHZhbHVlLnRyaW0oKSk7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdib29sZWFuJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYm9vbGVhbjtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9ib29sZWFuL2xpYi9ib29sZWFuLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcbmNvbnN0IGlzT2JqID0gcmVxdWlyZSgnaXMtb2JqJyk7XG5cbmZ1bmN0aW9uIGdldFBhdGhTZWdtZW50cyhwYXRoKSB7XG5cdGNvbnN0IHBhdGhBcnIgPSBwYXRoLnNwbGl0KCcuJyk7XG5cdGNvbnN0IHBhcnRzID0gW107XG5cblx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0bGV0IHAgPSBwYXRoQXJyW2ldO1xuXG5cdFx0d2hpbGUgKHBbcC5sZW5ndGggLSAxXSA9PT0gJ1xcXFwnICYmIHBhdGhBcnJbaSArIDFdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHAgPSBwLnNsaWNlKDAsIC0xKSArICcuJztcblx0XHRcdHAgKz0gcGF0aEFyclsrK2ldO1xuXHRcdH1cblxuXHRcdHBhcnRzLnB1c2gocCk7XG5cdH1cblxuXHRyZXR1cm4gcGFydHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRnZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmICghaXNPYmoob2JqKSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkID8gb2JqIDogdmFsdWU7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKCFPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBwYXRoQXJyW2ldKSkge1xuXHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdG9iaiA9IG9ialtwYXRoQXJyW2ldXTtcblxuXHRcdFx0aWYgKG9iaiA9PT0gdW5kZWZpbmVkIHx8IG9iaiA9PT0gbnVsbCkge1xuXHRcdFx0XHQvLyBgb2JqYCBpcyBlaXRoZXIgYHVuZGVmaW5lZGAgb3IgYG51bGxgIHNvIHdlIHdhbnQgdG8gc3RvcCB0aGUgbG9vcCwgYW5kXG5cdFx0XHRcdC8vIGlmIHRoaXMgaXMgbm90IHRoZSBsYXN0IGJpdCBvZiB0aGUgcGF0aCwgYW5kXG5cdFx0XHRcdC8vIGlmIGl0IGRpZCd0IHJldHVybiBgdW5kZWZpbmVkYFxuXHRcdFx0XHQvLyBpdCB3b3VsZCByZXR1cm4gYG51bGxgIGlmIGBvYmpgIGlzIGBudWxsYFxuXHRcdFx0XHQvLyBidXQgd2Ugd2FudCBgZ2V0KHtmb286IG51bGx9LCAnZm9vLmJhcicpYCB0byBlcXVhbCBgdW5kZWZpbmVkYCwgb3IgdGhlIHN1cHBsaWVkIHZhbHVlLCBub3QgYG51bGxgXG5cdFx0XHRcdGlmIChpICE9PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0XHRyZXR1cm4gdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gb2JqO1xuXHR9LFxuXG5cdHNldChvYmosIHBhdGgsIHZhbHVlKSB7XG5cdFx0aWYgKCFpc09iaihvYmopIHx8IHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGNvbnN0IHAgPSBwYXRoQXJyW2ldO1xuXG5cdFx0XHRpZiAoIWlzT2JqKG9ialtwXSkpIHtcblx0XHRcdFx0b2JqW3BdID0ge307XG5cdFx0XHR9XG5cblx0XHRcdGlmIChpID09PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0b2JqW3BdID0gdmFsdWU7XG5cdFx0XHR9XG5cblx0XHRcdG9iaiA9IG9ialtwXTtcblx0XHR9XG5cdH0sXG5cblx0ZGVsZXRlKG9iaiwgcGF0aCkge1xuXHRcdGlmICghaXNPYmoob2JqKSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwID0gcGF0aEFycltpXTtcblxuXHRcdFx0aWYgKGkgPT09IHBhdGhBcnIubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRkZWxldGUgb2JqW3BdO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdG9iaiA9IG9ialtwXTtcblxuXHRcdFx0aWYgKCFpc09iaihvYmopKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHR9XG5cdH0sXG5cblx0aGFzKG9iaiwgcGF0aCkge1xuXHRcdGlmICghaXNPYmoob2JqKSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRpZiAoaXNPYmoob2JqKSkge1xuXHRcdFx0XHRpZiAoIShwYXRoQXJyW2ldIGluIG9iaikpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRvYmogPSBvYmpbcGF0aEFycltpXV07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vZG90LXByb3AvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0Jztcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHgpIHtcblx0dmFyIHR5cGUgPSB0eXBlb2YgeDtcblx0cmV0dXJuIHggIT09IG51bGwgJiYgKHR5cGUgPT09ICdvYmplY3QnIHx8IHR5cGUgPT09ICdmdW5jdGlvbicpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9pcy1vYmovaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogU2ltcGxlIHF1ZXJ5IHN0cmluZyBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmcocXVlcnkpIHtcbiAgdmFyIHBhcnNlciA9IC8oW149PyZdKyk9PyhbXiZdKikvZ1xuICAgICwgcmVzdWx0ID0ge31cbiAgICAsIHBhcnQ7XG5cbiAgLy9cbiAgLy8gTGl0dGxlIG5pZnR5IHBhcnNpbmcgaGFjaywgbGV2ZXJhZ2UgdGhlIGZhY3QgdGhhdCBSZWdFeHAuZXhlYyBpbmNyZW1lbnRzXG4gIC8vIHRoZSBsYXN0SW5kZXggcHJvcGVydHkgc28gd2UgY2FuIGNvbnRpbnVlIGV4ZWN1dGluZyB0aGlzIGxvb3AgdW50aWwgd2UndmVcbiAgLy8gcGFyc2VkIGFsbCByZXN1bHRzLlxuICAvL1xuICBmb3IgKDtcbiAgICBwYXJ0ID0gcGFyc2VyLmV4ZWMocXVlcnkpO1xuICAgIHJlc3VsdFtkZWNvZGVVUklDb21wb25lbnQocGFydFsxXSldID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRbMl0pXG4gICk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gYSBxdWVyeSBzdHJpbmcgdG8gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHRoYXQgc2hvdWxkIGJlIHRyYW5zZm9ybWVkLlxuICogQHBhcmFtIHtTdHJpbmd9IHByZWZpeCBPcHRpb25hbCBwcmVmaXguXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmdpZnkob2JqLCBwcmVmaXgpIHtcbiAgcHJlZml4ID0gcHJlZml4IHx8ICcnO1xuXG4gIHZhciBwYWlycyA9IFtdO1xuXG4gIC8vXG4gIC8vIE9wdGlvbmFsbHkgcHJlZml4IHdpdGggYSAnPycgaWYgbmVlZGVkXG4gIC8vXG4gIGlmICgnc3RyaW5nJyAhPT0gdHlwZW9mIHByZWZpeCkgcHJlZml4ID0gJz8nO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsnPScrIGVuY29kZVVSSUNvbXBvbmVudChvYmpba2V5XSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYWlycy5sZW5ndGggPyBwcmVmaXggKyBwYWlycy5qb2luKCcmJykgOiAnJztcbn1cblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbmV4cG9ydHMuc3RyaW5naWZ5ID0gcXVlcnlzdHJpbmdpZnk7XG5leHBvcnRzLnBhcnNlID0gcXVlcnlzdHJpbmc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcXVlcnlzdHJpbmdpZnkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiB3ZSdyZSByZXF1aXJlZCB0byBhZGQgYSBwb3J0IG51bWJlci5cbiAqXG4gKiBAc2VlIGh0dHBzOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jZGVmYXVsdC1wb3J0XG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHBvcnQgUG9ydCBudW1iZXIgd2UgbmVlZCB0byBjaGVja1xuICogQHBhcmFtIHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIHdlIG5lZWQgdG8gY2hlY2sgYWdhaW5zdC5cbiAqIEByZXR1cm5zIHtCb29sZWFufSBJcyBpdCBhIGRlZmF1bHQgcG9ydCBmb3IgdGhlIGdpdmVuIHByb3RvY29sXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXF1aXJlZChwb3J0LCBwcm90b2NvbCkge1xuICBwcm90b2NvbCA9IHByb3RvY29sLnNwbGl0KCc6JylbMF07XG4gIHBvcnQgPSArcG9ydDtcblxuICBpZiAoIXBvcnQpIHJldHVybiBmYWxzZTtcblxuICBzd2l0Y2ggKHByb3RvY29sKSB7XG4gICAgY2FzZSAnaHR0cCc6XG4gICAgY2FzZSAnd3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA4MDtcblxuICAgIGNhc2UgJ2h0dHBzJzpcbiAgICBjYXNlICd3c3MnOlxuICAgIHJldHVybiBwb3J0ICE9PSA0NDM7XG5cbiAgICBjYXNlICdmdHAnOlxuICAgIHJldHVybiBwb3J0ICE9PSAyMTtcblxuICAgIGNhc2UgJ2dvcGhlcic6XG4gICAgcmV0dXJuIHBvcnQgIT09IDcwO1xuXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHBvcnQgIT09IDA7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3JlcXVpcmVzLXBvcnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0JztcblxudmFyIHNsYXNoZXMgPSAvXltBLVphLXpdW0EtWmEtejAtOSstLl0qOlxcL1xcLy87XG5cbi8qKlxuICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgbm90IGJlIGNvcGllZCBvciBpbmhlcml0ZWQgZnJvbS4gVGhpcyBpcyBvbmx5IG5lZWRlZFxuICogZm9yIGFsbCBub24gYmxvYiBVUkwncyBhcyBhIGJsb2IgVVJMIGRvZXMgbm90IGluY2x1ZGUgYSBoYXNoLCBvbmx5IHRoZVxuICogb3JpZ2luLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaWdub3JlID0geyBoYXNoOiAxLCBxdWVyeTogMSB9XG4gICwgVVJMO1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvYmplY3QgZGlmZmVycyB3aGVuIHlvdXIgY29kZSBpcyBsb2FkZWQgdGhyb3VnaCBhIG5vcm1hbCBwYWdlLFxuICogV29ya2VyIG9yIHRocm91Z2ggYSB3b3JrZXIgdXNpbmcgYSBibG9iLiBBbmQgd2l0aCB0aGUgYmxvYmJsZSBiZWdpbnMgdGhlXG4gKiB0cm91YmxlIGFzIHRoZSBsb2NhdGlvbiBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBVUkwgb2YgdGhlIGJsb2IsIG5vdCB0aGVcbiAqIGxvY2F0aW9uIG9mIHRoZSBwYWdlIHdoZXJlIG91ciBjb2RlIGlzIGxvYWRlZCBpbi4gVGhlIGFjdHVhbCBvcmlnaW4gaXNcbiAqIGVuY29kZWQgaW4gdGhlIGBwYXRobmFtZWAgc28gd2UgY2FuIHRoYW5rZnVsbHkgZ2VuZXJhdGUgYSBnb29kIFwiZGVmYXVsdFwiXG4gKiBsb2NhdGlvbiBmcm9tIGl0IHNvIHdlIGNhbiBnZW5lcmF0ZSBwcm9wZXIgcmVsYXRpdmUgVVJMJ3MgYWdhaW4uXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2MgT3B0aW9uYWwgZGVmYXVsdCBsb2NhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBsb2xjYXRpb24gb2JqZWN0LlxuICogQGFwaSBwdWJsaWNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2xjYXRpb24obG9jKSB7XG4gIGxvYyA9IGxvYyB8fCBnbG9iYWwubG9jYXRpb24gfHwge307XG4gIFVSTCA9IFVSTCB8fCByZXF1aXJlKCcuLycpO1xuXG4gIHZhciBmaW5hbGRlc3RpbmF0aW9uID0ge31cbiAgICAsIHR5cGUgPSB0eXBlb2YgbG9jXG4gICAgLCBrZXk7XG5cbiAgaWYgKCdibG9iOicgPT09IGxvYy5wcm90b2NvbCkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKHVuZXNjYXBlKGxvYy5wYXRobmFtZSksIHt9KTtcbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZSkge1xuICAgIGZpbmFsZGVzdGluYXRpb24gPSBuZXcgVVJMKGxvYywge30pO1xuICAgIGZvciAoa2V5IGluIGlnbm9yZSkgZGVsZXRlIGZpbmFsZGVzdGluYXRpb25ba2V5XTtcbiAgfSBlbHNlIGlmICgnb2JqZWN0JyA9PT0gdHlwZSkge1xuICAgIGZvciAoa2V5IGluIGxvYykge1xuICAgICAgaWYgKGtleSBpbiBpZ25vcmUpIGNvbnRpbnVlO1xuICAgICAgZmluYWxkZXN0aW5hdGlvbltrZXldID0gbG9jW2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZpbmFsZGVzdGluYXRpb24uc2xhc2hlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPSBzbGFzaGVzLnRlc3QobG9jLmhyZWYpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmaW5hbGRlc3RpbmF0aW9uO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwtcGFyc2UvbG9sY2F0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIihmdW5jdGlvbihzZWxmKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICBpZiAoc2VsZi5mZXRjaCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN1cHBvcnQgPSB7XG4gICAgc2VhcmNoUGFyYW1zOiAnVVJMU2VhcmNoUGFyYW1zJyBpbiBzZWxmLFxuICAgIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICAgIGJsb2I6ICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmICdCbG9iJyBpbiBzZWxmICYmIChmdW5jdGlvbigpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBCbG9iKClcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KSgpLFxuICAgIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gICAgYXJyYXlCdWZmZXI6ICdBcnJheUJ1ZmZlcicgaW4gc2VsZlxuICB9XG5cbiAgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIpIHtcbiAgICB2YXIgdmlld0NsYXNzZXMgPSBbXG4gICAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQ2NEFycmF5XSdcbiAgICBdXG5cbiAgICB2YXIgaXNEYXRhVmlldyA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG4gICAgfVxuXG4gICAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID0gQXJyYXlCdWZmZXIuaXNWaWV3IHx8IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiB2aWV3Q2xhc3Nlcy5pbmRleE9mKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKSA+IC0xXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgbmFtZSA9IFN0cmluZyhuYW1lKVxuICAgIH1cbiAgICBpZiAoL1teYS16MC05XFwtIyQlJicqKy5cXF5fYHx+XS9pLnRlc3QobmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgICB9XG4gICAgcmV0dXJuIG5hbWUudG9Mb3dlckNhc2UoKVxuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplVmFsdWUodmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgLy8gQnVpbGQgYSBkZXN0cnVjdGl2ZSBpdGVyYXRvciBmb3IgdGhlIHZhbHVlIGxpc3RcbiAgZnVuY3Rpb24gaXRlcmF0b3JGb3IoaXRlbXMpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gaXRlbXMuc2hpZnQoKVxuICAgICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgICAgaXRlcmF0b3JbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlcmF0b3JcbiAgfVxuXG4gIGZ1bmN0aW9uIEhlYWRlcnMoaGVhZGVycykge1xuICAgIHRoaXMubWFwID0ge31cblxuICAgIGlmIChoZWFkZXJzIGluc3RhbmNlb2YgSGVhZGVycykge1xuICAgICAgaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoaGVhZGVycykpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQoaGVhZGVyWzBdLCBoZWFkZXJbMV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoaGVhZGVycykuZm9yRWFjaChmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIGhlYWRlcnNbbmFtZV0pXG4gICAgICB9LCB0aGlzKVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICB2YWx1ZSA9IG5vcm1hbGl6ZVZhbHVlKHZhbHVlKVxuICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gICAgdGhpcy5tYXBbbmFtZV0gPSBvbGRWYWx1ZSA/IG9sZFZhbHVlKycsJyt2YWx1ZSA6IHZhbHVlXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgICByZXR1cm4gdGhpcy5oYXMobmFtZSkgPyB0aGlzLm1hcFtuYW1lXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcy5tYXApIHtcbiAgICAgIGlmICh0aGlzLm1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51cmwgPSBTdHJpbmcoaW5wdXQpXG4gICAgfVxuXG4gICAgdGhpcy5jcmVkZW50aWFscyA9IG9wdGlvbnMuY3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscyB8fCAnb21pdCdcbiAgICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKG9wdGlvbnMuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gICAgdGhpcy5tb2RlID0gb3B0aW9ucy5tb2RlIHx8IHRoaXMubW9kZSB8fCBudWxsXG4gICAgdGhpcy5yZWZlcnJlciA9IG51bGxcblxuICAgIGlmICgodGhpcy5tZXRob2QgPT09ICdHRVQnIHx8IHRoaXMubWV0aG9kID09PSAnSEVBRCcpICYmIGJvZHkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgICB9XG4gICAgdGhpcy5faW5pdEJvZHkoYm9keSlcbiAgfVxuXG4gIFJlcXVlc3QucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXF1ZXN0KHRoaXMsIHsgYm9keTogdGhpcy5fYm9keUluaXQgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VIZWFkZXJzKHJhd0hlYWRlcnMpIHtcbiAgICB2YXIgaGVhZGVycyA9IG5ldyBIZWFkZXJzKClcbiAgICByYXdIZWFkZXJzLnNwbGl0KC9cXHI/XFxuLykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vd2hhdHdnLWZldGNoL2ZldGNoLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vaGlzdG9yeVwiOiA0LFxuXHRcIi4vaGlzdG9yeS5qc1wiOiA0LFxuXHRcIi4vaG90dGVzdFwiOiA1LFxuXHRcIi4vaG90dGVzdC5qc1wiOiA1LFxuXHRcIi4vaG90dGVzdC9wb3N0c1wiOiAyLFxuXHRcIi4vaG90dGVzdC9wb3N0cy5qc1wiOiAyLFxuXHRcIi4vc2V0dGluZ1wiOiA2LFxuXHRcIi4vc2V0dGluZy5qc1wiOiA2LFxuXHRcIi4vc3RhdGlzdGljc1wiOiA3LFxuXHRcIi4vc3RhdGlzdGljcy5qc1wiOiA3XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXJcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA0NztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMgXlxcLlxcLy4qJFxuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHVwVG8gZnJvbSAnLi4vdXRpbHMvdXAtdG8nXG5cbmRvY3VtZW50Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgaWYgKCdpbnRlcmFjdGl2ZScgPT09IGRvY3VtZW50LnJlYWR5U3RhdGUpIHtcbiAgICBjb25zdCBkb20gPSAoKCkgPT4ge1xuICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Rpdltyb2xlPVwic2VhcmNoXCJdJylcblxuICAgICAgaWYgKCEgZG9tKSB7XG4gICAgICAgIGRvbSA9IHVwVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybVtyb2xlPVwic2VhcmNoXCJdJyksICdkaXYnKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdXBUbyhkb20sICdkaXYnKVxuICAgIH0pKClcblxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL2hvb2snKSgpXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvbmF2YmFyJykoZG9tKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXInKShkb20pXG4gICAgcmVxdWlyZSgnLi9pbml0aWFsaXphdGlvbnMvYnV0dG9uJykoKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL21vZGFsJykoKVxuXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2gnKSgpXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy9idXR0b24tY2xpY2snKSgpXG4gICAgcmVxdWlyZSgnLi9tb25pdG9ycy91c2VyLWZlZWQnKSgpXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5kZXguanMiLCIvKipcbiAqIEluc2VydCBob29rcy5qcyB0byBodG1sIGRvbS5cbiAqXG4gKiBAcmV0dXJucyB2b2lkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCkgPT4ge1xuICBjb25zdCBqcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG5cbiAganMuc3JjID0gJ2Nocm9tZS1leHRlbnNpb246Ly9maGVqZWlwY3BoY2hlbW5jZmNvYmpjYWNjamdqYmVmbS9ob29rcy5qcydcblxuICBkb2N1bWVudC5oZWFkLmFwcGVuZChqcylcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiXSwic291cmNlUm9vdCI6IiJ9