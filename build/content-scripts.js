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
/******/ 	return __webpack_require__(__webpack_require__.s = 49);
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

__webpack_require__(47);

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
  dom.innerHTML = '\n<div class="hottest-section">\n  <h1 style="margin-left: 1.5rem; margin-top: 1rem;">\u71B1\u9580\u52D5\u614B</h1>\n  <div class="posts"></div>\n</div>\n';

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


var _boolean = __webpack_require__(29);

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

var _defineProperty2 = __webpack_require__(28);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _dotProp = __webpack_require__(41);

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

var anObject       = __webpack_require__(32)
  , IE8_DOM_DEFINE = __webpack_require__(37)
  , toPrimitive    = __webpack_require__(39)
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


var required = __webpack_require__(44)
  , lolcation = __webpack_require__(45)
  , qs = __webpack_require__(43)
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
  node.innerHTML = '\n' + iconNode('fire', '熱門趨勢') + '\n' + iconNode('bar-chart', '個人統計') + '\n' + iconNode('history', '歷史回顧') + '\n' + iconNode('cog', '設定');

  (0, _upTo2.default)(document.querySelector('div.custom-search-bar'), 'div').append(node);
};

/***/ }),
/* 15 */
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
/* 16 */
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
/* 17 */
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
/* 18 */
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
/* 19 */
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

      __webpack_require__(48)("./" + mapping[name])(document.querySelector('.custom-modal .box .content'));
    });
  });
};

/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _config = __webpack_require__(8);

var _config2 = _interopRequireDefault(_config);

var _parseFbid = __webpack_require__(26);

var _parseFbid2 = _interopRequireDefault(_parseFbid);

var _inScreen = __webpack_require__(23);

var _inScreen2 = _interopRequireDefault(_inScreen);

var _isPublic = __webpack_require__(24);

var _isPublic2 = _interopRequireDefault(_isPublic);

var _isSponsored = __webpack_require__(25);

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
/* 22 */,
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(30), __esModule: true };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(27);

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
/* 29 */
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
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(40);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(31);
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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3)
  , document = __webpack_require__(11).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(11)
  , core      = __webpack_require__(9)
  , ctx       = __webpack_require__(33)
  , hide      = __webpack_require__(36)
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(12)
  , createDesc = __webpack_require__(38);
module.exports = __webpack_require__(0) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(0) && !__webpack_require__(10)(function(){
  return Object.defineProperty(__webpack_require__(34)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(35);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(0), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const isObj = __webpack_require__(42);

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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var type = typeof x;
	return x !== null && (type === 'object' || type === 'function');
};


/***/ }),
/* 43 */
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
/* 44 */
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
/* 45 */
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(46)))

/***/ }),
/* 46 */
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
/* 47 */
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
/* 48 */
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
webpackContext.id = 48;


/***/ }),
/* 49 */
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

    __webpack_require__(15)();
    __webpack_require__(17)(dom);
    __webpack_require__(18)(dom);
    __webpack_require__(14)();
    __webpack_require__(16)();

    __webpack_require__(20)();
    __webpack_require__(19)();
    __webpack_require__(21)();
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDhjOGQ5MGNhYTRiZmM0MjgzMzUiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL3VwLXRvLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hvdHRlc3QvcG9zdHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL2hpc3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaG90dGVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9zZXR0aW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzL3N0YXRpc3RpY3MuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3V0aWxzL2NvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJ3ZWJwYWNrOi8vLy4vfi91cmwtcGFyc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2hvb2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbmF2YmFyLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL3NlYXJjaC1iYXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9idXR0b24tY2xpY2suanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mYWNlYm9vay1zZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy91c2VyLWZlZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaW4tc2NyZWVuLmpzIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2lzLXB1YmxpYy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1zcG9uc29yZWQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvcGFyc2UtZmJpZC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYmFiZWwtcnVudGltZS9oZWxwZXJzL2RlZmluZVByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vYm9vbGVhbi9saWIvYm9vbGVhbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJ3ZWJwYWNrOi8vLy4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwid2VicGFjazovLy8uL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9kb3QtcHJvcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lzLW9iai9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3F1ZXJ5c3RyaW5naWZ5L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vcmVxdWlyZXMtcG9ydC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L3VybC1wYXJzZS9sb2xjYXRpb24uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscyBeXFwuXFwvLiokIiwid2VicGFjazovLy8uL3NyYy9jb250ZW50LXNjcmlwdHMvaW5kZXguanMiXSwibmFtZXMiOlsiZWwiLCJ0YWdOYW1lIiwidG9Mb3dlckNhc2UiLCJwYXJlbnROb2RlIiwic3RhdHVzIiwibG9hZGluZyIsInBhZ2UiLCJsb2FkIiwiY2IiLCJmZXRjaCIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwb3N0c0RvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImluc2VydEFkamFjZW50SFRNTCIsInJlbmRlciIsImRhdGEiLCJyZXN1bHQiLCJyZWNzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJub2RlIiwiY2xhc3NOYW1lIiwid2luZG93IiwicG9zdE1lc3NhZ2UiLCJ0eXBlIiwicmVkdWNlIiwiaHRtbCIsImZlZWQiLCJyZWMiLCJ1cmwiLCJtb2R1bGUiLCJleHBvcnRzIiwiZG9tIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRhcmdldCIsImUiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsV2lkdGgiLCJjbGllbnRXaWR0aCIsInNldHRpbmciLCJ0YWJsZSIsInRpdGxlIiwiZGVzY3JpcHRpb24iLCJrZXkiLCJpdGVtIiwiZ2V0IiwiaWQiLCJ2YWx1ZSIsInNldCIsIm4iLCJyZXBsYWNlIiwic2V0VGltZW91dCIsInBvcyIsImluZGV4T2YiLCJrIiwic2xpY2UiLCJjaHJvbWUiLCJzdG9yYWdlIiwibG9jYWwiLCJpdGVtcyIsImhhc093blByb3BlcnR5IiwidmFsIiwiaW5jbHVkZXMiLCJzdWJzdHIiLCJpY29uTm9kZSIsImljb24iLCJuYW1lIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZCIsImpzIiwic3JjIiwiaTE4biIsImdldE1lc3NhZ2UiLCJoZWFkIiwic3R5bGUiLCJkaXNwbGF5IiwiYm9keSIsImNsb3NlRXZlbnQiLCJvdmVyZmxvd1kiLCJvbmNsaWNrIiwiaW5uZXJUZXh0IiwiZGF0YXNldCIsInRvb2x0aXBDb250ZW50IiwibWFwcGluZyIsImxhc3RJbmRleE9mIiwicmVxdWlyZSIsInNlYXJjaCIsImZiU2VhcmNoSW5wdXRzIiwibGVuZ3RoIiwiZmVlZHMiLCJsYXN0WSIsIm9uc2Nyb2xsIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInJlbW92ZSIsImZiaWQiLCJocmVmIiwicHVzaCIsImNvbnNvbGUiLCJsb2ciLCJzY3JvbGxZIiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInNjcmVlbiIsInRvcCIsImJvdHRvbSIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudEhlaWdodCIsIm9mZnNldFRvcCIsImhlaWdodCIsInByaXZhY3kiLCJnZXRBdHRyaWJ1dGUiLCJpc1Nwb25zb3JlZCIsInBhcnNlZFVybHMiLCJmcm9tVXJsIiwicGFyc2VkIiwicXVlcnkiLCJlbmRzV2l0aCIsInN0b3J5X2ZiaWQiLCJtYXRjaCIsImVycm9yIiwib25yZWFkeXN0YXRlY2hhbmdlIiwicmVhZHlTdGF0ZSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBLGlDQUFpQyxRQUFRLGdCQUFnQixVQUFVLEdBQUc7QUFDdEUsQ0FBQyxFOzs7Ozs7Ozs7Ozs7O0FDSEQ7Ozs7Ozs7OztrQkFTZSxVQUFDQSxFQUFELEVBQUtDLE9BQUwsRUFBaUI7QUFDOUJB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVEO0FBQ3ZELFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVCw4RUFBOEU7QUFDOUU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4QkFBOEIsdUJBQXVCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0EsdUNBQXVDLDBCQUEwQjtBQUNqRTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLDBCQUEwQixlQUFlO0FBQ3hFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUM1Y0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDMUJBOzs7Ozs7QUFFQW5ELFNBQVMrRyxrQkFBVCxHQUE4QixZQUFNO0FBQ2xDLE1BQUksa0JBQWtCL0csU0FBU2dILFVBQS9CLEVBQTJDO0FBQ3pDLFFBQU0zRixNQUFPLFlBQU07QUFDakIsVUFBSUEsTUFBTXJCLFNBQVNDLGFBQVQsQ0FBdUIsb0JBQXZCLENBQVY7O0FBRUEsVUFBSSxDQUFFb0IsR0FBTixFQUFXO0FBQ1RBLGNBQU0sb0JBQUtyQixTQUFTQyxhQUFULENBQXVCLHFCQUF2QixDQUFMLEVBQW9ELEtBQXBELENBQU47QUFDRDs7QUFFRCxhQUFPLG9CQUFLb0IsR0FBTCxFQUFVLEtBQVYsQ0FBUDtBQUNELEtBUlcsRUFBWjs7QUFVQXNELElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVIsRUFBb0N0RCxHQUFwQztBQUNBc0QsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSLEVBQXdDdEQsR0FBeEM7QUFDQXNELElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7O0FBRUFBLElBQUEsbUJBQUFBLENBQVEsRUFBUjtBQUNBQSxJQUFBLG1CQUFBQSxDQUFRLEVBQVI7QUFDQUEsSUFBQSxtQkFBQUEsQ0FBUSxFQUFSO0FBQ0Q7QUFDRixDQXRCRCxDIiwiZmlsZSI6ImNvbnRlbnQtc2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQ5KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwOGM4ZDkwY2FhNGJmYzQyODMzNSIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBGaW5kIGZpcnN0IGFuY2VzdG9yIG9mIGVsIHdpdGggdGFnTmFtZSBvciB1bmRlZmluZWQgaWYgbm90IGZvdW5kLlxuICpcbiAqIEBwYXJhbSBlbFxuICogQHBhcmFtIHRhZ05hbWVcbiAqIEByZXR1cm5zIHsqfVxuICpcbiAqIEByZWZlcmVuY2UgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjg1NzExNlxuICovXG5leHBvcnQgZGVmYXVsdCAoZWwsIHRhZ05hbWUpID0+IHtcbiAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxuXG4gIHdoaWxlIChlbCAmJiBlbC5wYXJlbnROb2RlKSB7XG4gICAgZWwgPSBlbC5wYXJlbnROb2RlXG5cbiAgICBpZiAoZWwudGFnTmFtZSAmJiBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IHRhZ05hbWUpIHtcbiAgICAgIHJldHVybiBlbFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvdXRpbHMvdXAtdG8uanMiLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdGF0dXM6IHtcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBwYWdlOiAxXG4gIH0sXG5cbiAgLyoqXG4gICAqIExvYWQgaG90dGVzdCBwb3N0cy5cbiAgICpcbiAgICogQHBhcmFtIGNiXG4gICAqXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgbG9hZCAoY2IgPSBudWxsKSB7XG4gICAgaWYgKHRoaXMuc3RhdHVzLmxvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSB0cnVlXG5cbiAgICBmZXRjaChgaHR0cHM6Ly93d3cuY3MuY2N1LmVkdS50dy9+Y3lzMTAydS9hcGkucGhwP3BhZ2U9JHt0aGlzLnN0YXR1cy5wYWdlfWApLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGNvbnN0IHBvc3RzRG9tID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdHRlc3Qtc2VjdGlvbiAucG9zdHMnKVxuXG4gICAgICAgIHBvc3RzRG9tLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdGhpcy5yZW5kZXIoZGF0YS5yZXN1bHQucmVjcykpXG4gICAgICAgIHBvc3RzRG9tLnF1ZXJ5U2VsZWN0b3JBbGwoJ2Rpdi5mYi1wb3N0LmZiX2lmcmFtZV93aWRnZXQnKS5mb3JFYWNoKG5vZGUgPT4geyBub2RlLmNsYXNzTmFtZSA9ICcnIH0pXG5cbiAgICAgICAgaWYgKG51bGwgIT09IGNiKSB7XG4gICAgICAgICAgY2IoZGF0YSlcbiAgICAgICAgfVxuXG4gICAgICAgIHdpbmRvdy5wb3N0TWVzc2FnZSh7IHR5cGU6ICdlbWJlZC1wb3N0cycgfSwgJyonKVxuXG4gICAgICAgIHRoaXMuc3RhdHVzLmxvYWRpbmcgPSBmYWxzZVxuICAgICAgfSlcblxuICAgICAgKyt0aGlzLnN0YXR1cy5wYWdlXG4gICAgfSlcbiAgfSxcblxuICAvKipcbiAgICogUmVuZGVyIGhvdHRlc3QgcG9zdHMgaHRtbC5cbiAgICpcbiAgICogQHBhcmFtIHJlY3NcbiAgICpcbiAgICogQHJldHVybiBzdHJpbmdcbiAgICovXG4gIHJlbmRlciAocmVjcykge1xuICAgIHJldHVybiByZWNzLnJlZHVjZSgoaHRtbCwgZmVlZCkgPT4ge1xuICAgICAgcmV0dXJuIGh0bWwgKyBgPGRpdiBjbGFzcz1cImZiLXBvc3RcIiBkYXRhLWhyZWY9XCIke2ZlZWQucmVjLnVybH1cIiBkYXRhLXdpZHRoPVwiMzUwXCI+PC9kaXY+YFxuICAgIH0sICcnKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0L3Bvc3RzLmpzIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICAvL1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvaGlzdG9yeS5qcyIsImltcG9ydCBwb3N0cyBmcm9tICcuL2hvdHRlc3QvcG9zdHMnXG5cbm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICBkb20uaW5uZXJIVE1MID0gYFxuPGRpdiBjbGFzcz1cImhvdHRlc3Qtc2VjdGlvblwiPlxuICA8aDEgc3R5bGU9XCJtYXJnaW4tbGVmdDogMS41cmVtOyBtYXJnaW4tdG9wOiAxcmVtO1wiPueGsemWgOWLleaFizwvaDE+XG4gIDxkaXYgY2xhc3M9XCJwb3N0c1wiPjwvZGl2PlxuPC9kaXY+XG5gXG5cbiAgcG9zdHMuc3RhdHVzLnBhZ2UgPSAxXG4gIHBvc3RzLmxvYWQoKVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3R0ZXN0LXNlY3Rpb24gLnBvc3RzJykuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZS50YXJnZXRcblxuICAgIC8vIHNjcm9sbFdpZHRoIOaVtOmrlOWvrOW6plxuICAgIC8vIHNjcm9sbExlZnQgIOa7vuWLlei3nembolxuICAgIC8vIG9mZnNldFdpZHRoIOWPr+imluWvrOW6pijlkKsgbWFyZ2luKVxuICAgIC8vIGNsaWVudFdpZHRoIOWPr+imluWvrOW6plxuXG4gICAgaWYgKHRhcmdldC5zY3JvbGxMZWZ0ID4gKHRhcmdldC5zY3JvbGxXaWR0aCAtIHRhcmdldC5jbGllbnRXaWR0aCAqIDIpKSB7XG4gICAgICBwb3N0cy5sb2FkKClcbiAgICB9XG4gIH0pXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL21vZGFscy9ob3R0ZXN0LmpzIiwiaW1wb3J0IGJvb2xlYW4gZnJvbSAnYm9vbGVhbidcbmltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vLi4vdXRpbHMvY29uZmlnJ1xuaW1wb3J0IHVwVG8gZnJvbSAnLi4vLi4vLi4vdXRpbHMvdXAtdG8nXG5cbmNvbnN0IHJlbmRlciA9IChzZXR0aW5nKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gW1xuICAgIHsgdGl0bGU6ICfnsr7pgbjli5XmhYsnLCBkZXNjcmlwdGlvbjogJ+aWvOWLleaFi+aZguWgseS4iuW1jOWFpeaIkeWAkeeyvumBuOeahOeGsemWgOWLleaFiycsIGtleTogJ2ZlYXR1cmVkLWZlZWQnIH0sXG4gICAgeyB0aXRsZTogJ+enu+mZpOW7o+WRiicsIGRlc2NyaXB0aW9uOiAn5pa85YuV5oWL5pmC5aCx5LiK56e76Zmk54K66LSK5Yqp55qE5YuV5oWLJywga2V5OiAncmVtb3ZlLWFkJyB9LFxuICAgIHsgdGl0bGU6ICflkIzmraXmkJzlsIsnLCBkZXNjcmlwdGlvbjogJ+aWvOiHieabuOaQnOWwi+aZgu+8jOS4gOS4puaWvOaIkeWAkeWwiOWxrOizh+aWmeW6q+S4reaQnOWwiycsIGtleTogJ3N5bmMtc2VhcmNoJyB9XG4gIF1cblxuICByZXR1cm4gdGFibGUucmVkdWNlKChodG1sLCBpdGVtKSA9PiB7XG4gICAgcmV0dXJuIGh0bWwgKyBgXG48ZGl2IGNsYXNzPVwic2V0dGluZy1zZWN0aW9uXCI+XG4gIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxuICAgIDxiPiR7aXRlbS50aXRsZX08L2I+XG4gIDwvZGl2PlxuICBcbiAgPGRpdiBjbGFzcz1cImRlc2NyaXB0aW9uXCI+XG4gICAgPHNwYW4+JHtpdGVtLmRlc2NyaXB0aW9ufTwvc3Bhbj5cbiAgPC9kaXY+XG4gIFxuICA8ZGl2IGNsYXNzPVwib3BlcmF0aW9uXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzdWNjZXNzLWljb25cIj5cbiAgICAgIDxpIGNsYXNzPVwiZmEgZmEtY2hlY2tcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XG4gICAgPC9zcGFuPlxuICAgIFxuICAgIDxzZWxlY3QgaWQ9XCIke2l0ZW0ua2V5fVwiPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMFwiPk9mZjwvb3B0aW9uPlxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiMVwiICR7Ym9vbGVhbihzZXR0aW5nW2l0ZW0ua2V5XSkgPyAnc2VsZWN0ZWQnIDogJyd9Pk9uPC9vcHRpb24+XG4gICAgPC9zZWxlY3Q+XG4gIDwvZGl2PlxuPC9kaXY+YFxuICB9LCAnJylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSAoZG9tKSA9PiB7XG4gIGNvbmZpZy5nZXQoJ3NldHRpbmcnLCAoc2V0dGluZykgPT4ge1xuICAgIGRvbS5pbm5lckhUTUwgPSByZW5kZXIoc2V0dGluZylcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tbW9kYWwgLmJveCAuY29udGVudCAuc2V0dGluZy1zZWN0aW9uIC5vcGVyYXRpb24gc2VsZWN0JykuZm9yRWFjaChub2RlID0+IHtcbiAgICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICAgIHNldHRpbmdbZS50YXJnZXQuaWRdID0gYm9vbGVhbihlLnRhcmdldC52YWx1ZSlcblxuICAgICAgICBjb25maWcuc2V0KCdzZXR0aW5nJywgc2V0dGluZywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG4gPSB1cFRvKGUudGFyZ2V0LCAnZGl2JykucXVlcnlTZWxlY3Rvcignc3BhbicpXG5cbiAgICAgICAgICBuLmNsYXNzTmFtZSA9IG4uY2xhc3NOYW1lLnJlcGxhY2UoLyA/YW5pL2csICcnKVxuXG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7IG4uY2xhc3NOYW1lICs9ICcgYW5pJyB9LCAxKVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc2V0dGluZy5qcyIsIm1vZHVsZS5leHBvcnRzID0gKGRvbSkgPT4ge1xuICAvL1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9tb2RhbHMvc3RhdGlzdGljcy5qcyIsImltcG9ydCBkb3RQcm9wIGZyb20gJ2RvdC1wcm9wJ1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIC8qKlxuICAgKiBHZXQgY29udGVudCBmcm9tIHN0b3JhZ2UgYW5kIHBhc3MgdGhlIHJlc3VsdCB0byBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gY2JcbiAgICpcbiAgICogQHJldHVybnMgdm9pZFxuICAgKi9cbiAgZ2V0IChrZXksIGNiID0gbnVsbCkge1xuICAgIGlmIChudWxsID09PSBjYikge1xuICAgICAgW2tleSwgY2JdID0gWycnLCBrZXldXG4gICAgfVxuXG4gICAgY29uc3QgcG9zID0ga2V5LmluZGV4T2YoJy4nKVxuXG4gICAgY29uc3QgayA9ICgtMSAhPT0gcG9zID8ga2V5LnNsaWNlKDAsIHBvcykgOiBrZXkpIHx8IG51bGxcblxuICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldChrLCBpdGVtcyA9PiB7XG4gICAgICBpZiAobnVsbCAhPT0gayAmJiBpdGVtcy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICBpdGVtcyA9IGl0ZW1zW2tdXG5cbiAgICAgICAgaWYgKC0xICE9PSBwb3MpIHtcbiAgICAgICAgICBpdGVtcyA9IGRvdFByb3AuZ2V0KGl0ZW1zLCBrZXkuc2xpY2UocG9zICsgMSksIHt9KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNiKGl0ZW1zKVxuICAgIH0pXG4gIH0sXG5cbiAgLyoqXG4gICAqIFN0b3JlIGNvbnRlbnQgdG8gc3RvcmFnZS5cbiAgICpcbiAgICogQHBhcmFtIGtleVxuICAgKiBAcGFyYW0gdmFsXG4gICAqIEBwYXJhbSBjYlxuICAgKlxuICAgKiBAcmV0dXJucyB2b2lkXG4gICAqL1xuICBzZXQgKGtleSwgdmFsLCBjYiA9IG51bGwpIHtcbiAgICBpZiAoISBrZXkuaW5jbHVkZXMoJy4nKSkge1xuICAgICAgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KHsgW2tleV06IHZhbCB9LCBjYilcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgcG9zID0ga2V5LmluZGV4T2YoJy4nKVxuXG4gICAgICB0aGlzLmdldChrZXkuc2xpY2UoMCwgcG9zKSwgaXRlbSA9PiB7XG4gICAgICAgIGRvdFByb3Auc2V0KGl0ZW0sIGtleS5zdWJzdHIocG9zICsgMSksIHZhbClcblxuICAgICAgICB0aGlzLnNldChrZXkuc2xpY2UoMCwgcG9zKSwgaXRlbSwgY2IpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3V0aWxzL2NvbmZpZy5qcyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1aXJlZCA9IHJlcXVpcmUoJ3JlcXVpcmVzLXBvcnQnKVxuICAsIGxvbGNhdGlvbiA9IHJlcXVpcmUoJy4vbG9sY2F0aW9uJylcbiAgLCBxcyA9IHJlcXVpcmUoJ3F1ZXJ5c3RyaW5naWZ5JylcbiAgLCBwcm90b2NvbHJlID0gL14oW2Etel1bYS16MC05ListXSo6KT8oXFwvXFwvKT8oW1xcU1xcc10qKS9pO1xuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgcGFyc2UgcnVsZXMgZm9yIHRoZSBVUkwgcGFyc2VyLCBpdCBpbmZvcm1zIHRoZSBwYXJzZXJcbiAqIGFib3V0OlxuICpcbiAqIDAuIFRoZSBjaGFyIGl0IE5lZWRzIHRvIHBhcnNlLCBpZiBpdCdzIGEgc3RyaW5nIGl0IHNob3VsZCBiZSBkb25lIHVzaW5nXG4gKiAgICBpbmRleE9mLCBSZWdFeHAgdXNpbmcgZXhlYyBhbmQgTmFOIG1lYW5zIHNldCBhcyBjdXJyZW50IHZhbHVlLlxuICogMS4gVGhlIHByb3BlcnR5IHdlIHNob3VsZCBzZXQgd2hlbiBwYXJzaW5nIHRoaXMgdmFsdWUuXG4gKiAyLiBJbmRpY2F0aW9uIGlmIGl0J3MgYmFja3dhcmRzIG9yIGZvcndhcmQgcGFyc2luZywgd2hlbiBzZXQgYXMgbnVtYmVyIGl0J3NcbiAqICAgIHRoZSB2YWx1ZSBvZiBleHRyYSBjaGFycyB0aGF0IHNob3VsZCBiZSBzcGxpdCBvZmYuXG4gKiAzLiBJbmhlcml0IGZyb20gbG9jYXRpb24gaWYgbm9uIGV4aXN0aW5nIGluIHRoZSBwYXJzZXIuXG4gKiA0LiBgdG9Mb3dlckNhc2VgIHRoZSByZXN1bHRpbmcgdmFsdWUuXG4gKi9cbnZhciBydWxlcyA9IFtcbiAgWycjJywgJ2hhc2gnXSwgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnPycsICdxdWVyeSddLCAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBbJy8nLCAncGF0aG5hbWUnXSwgICAgICAgICAgICAgICAgICAgIC8vIEV4dHJhY3QgZnJvbSB0aGUgYmFjay5cbiAgWydAJywgJ2F1dGgnLCAxXSwgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGZyb250LlxuICBbTmFOLCAnaG9zdCcsIHVuZGVmaW5lZCwgMSwgMV0sICAgICAgIC8vIFNldCBsZWZ0IG92ZXIgdmFsdWUuXG4gIFsvOihcXGQrKSQvLCAncG9ydCcsIHVuZGVmaW5lZCwgMV0sICAgIC8vIFJlZ0V4cCB0aGUgYmFjay5cbiAgW05hTiwgJ2hvc3RuYW1lJywgdW5kZWZpbmVkLCAxLCAxXSAgICAvLyBTZXQgbGVmdCBvdmVyLlxuXTtcblxuLyoqXG4gKiBAdHlwZWRlZiBQcm90b2NvbEV4dHJhY3RcbiAqIEB0eXBlIE9iamVjdFxuICogQHByb3BlcnR5IHtTdHJpbmd9IHByb3RvY29sIFByb3RvY29sIG1hdGNoZWQgaW4gdGhlIFVSTCwgaW4gbG93ZXJjYXNlLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBzbGFzaGVzIGB0cnVlYCBpZiBwcm90b2NvbCBpcyBmb2xsb3dlZCBieSBcIi8vXCIsIGVsc2UgYGZhbHNlYC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSByZXN0IFJlc3Qgb2YgdGhlIFVSTCB0aGF0IGlzIG5vdCBwYXJ0IG9mIHRoZSBwcm90b2NvbC5cbiAqL1xuXG4vKipcbiAqIEV4dHJhY3QgcHJvdG9jb2wgaW5mb3JtYXRpb24gZnJvbSBhIFVSTCB3aXRoL3dpdGhvdXQgZG91YmxlIHNsYXNoIChcIi8vXCIpLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIGV4dHJhY3QgZnJvbS5cbiAqIEByZXR1cm4ge1Byb3RvY29sRXh0cmFjdH0gRXh0cmFjdGVkIGluZm9ybWF0aW9uLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RQcm90b2NvbChhZGRyZXNzKSB7XG4gIHZhciBtYXRjaCA9IHByb3RvY29scmUuZXhlYyhhZGRyZXNzKTtcblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBtYXRjaFsxXSA/IG1hdGNoWzFdLnRvTG93ZXJDYXNlKCkgOiAnJyxcbiAgICBzbGFzaGVzOiAhIW1hdGNoWzJdLFxuICAgIHJlc3Q6IG1hdGNoWzNdXG4gIH07XG59XG5cbi8qKlxuICogUmVzb2x2ZSBhIHJlbGF0aXZlIFVSTCBwYXRobmFtZSBhZ2FpbnN0IGEgYmFzZSBVUkwgcGF0aG5hbWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHJlbGF0aXZlIFBhdGhuYW1lIG9mIHRoZSByZWxhdGl2ZSBVUkwuXG4gKiBAcGFyYW0ge1N0cmluZ30gYmFzZSBQYXRobmFtZSBvZiB0aGUgYmFzZSBVUkwuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlc29sdmVkIHBhdGhuYW1lLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlc29sdmUocmVsYXRpdmUsIGJhc2UpIHtcbiAgdmFyIHBhdGggPSAoYmFzZSB8fCAnLycpLnNwbGl0KCcvJykuc2xpY2UoMCwgLTEpLmNvbmNhdChyZWxhdGl2ZS5zcGxpdCgnLycpKVxuICAgICwgaSA9IHBhdGgubGVuZ3RoXG4gICAgLCBsYXN0ID0gcGF0aFtpIC0gMV1cbiAgICAsIHVuc2hpZnQgPSBmYWxzZVxuICAgICwgdXAgPSAwO1xuXG4gIHdoaWxlIChpLS0pIHtcbiAgICBpZiAocGF0aFtpXSA9PT0gJy4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICB9IGVsc2UgaWYgKHBhdGhbaV0gPT09ICcuLicpIHtcbiAgICAgIHBhdGguc3BsaWNlKGksIDEpO1xuICAgICAgdXArKztcbiAgICB9IGVsc2UgaWYgKHVwKSB7XG4gICAgICBpZiAoaSA9PT0gMCkgdW5zaGlmdCA9IHRydWU7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgaWYgKHVuc2hpZnQpIHBhdGgudW5zaGlmdCgnJyk7XG4gIGlmIChsYXN0ID09PSAnLicgfHwgbGFzdCA9PT0gJy4uJykgcGF0aC5wdXNoKCcnKTtcblxuICByZXR1cm4gcGF0aC5qb2luKCcvJyk7XG59XG5cbi8qKlxuICogVGhlIGFjdHVhbCBVUkwgaW5zdGFuY2UuIEluc3RlYWQgb2YgcmV0dXJuaW5nIGFuIG9iamVjdCB3ZSd2ZSBvcHRlZC1pbiB0b1xuICogY3JlYXRlIGFuIGFjdHVhbCBjb25zdHJ1Y3RvciBhcyBpdCdzIG11Y2ggbW9yZSBtZW1vcnkgZWZmaWNpZW50IGFuZFxuICogZmFzdGVyIGFuZCBpdCBwbGVhc2VzIG15IE9DRC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2NhdGlvbiBMb2NhdGlvbiBkZWZhdWx0cyBmb3IgcmVsYXRpdmUgcGF0aHMuXG4gKiBAcGFyYW0ge0Jvb2xlYW58RnVuY3Rpb259IHBhcnNlciBQYXJzZXIgZm9yIHRoZSBxdWVyeSBzdHJpbmcuXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBVUkwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcikge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVVJMKSkge1xuICAgIHJldHVybiBuZXcgVVJMKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpO1xuICB9XG5cbiAgdmFyIHJlbGF0aXZlLCBleHRyYWN0ZWQsIHBhcnNlLCBpbnN0cnVjdGlvbiwgaW5kZXgsIGtleVxuICAgICwgaW5zdHJ1Y3Rpb25zID0gcnVsZXMuc2xpY2UoKVxuICAgICwgdHlwZSA9IHR5cGVvZiBsb2NhdGlvblxuICAgICwgdXJsID0gdGhpc1xuICAgICwgaSA9IDA7XG5cbiAgLy9cbiAgLy8gVGhlIGZvbGxvd2luZyBpZiBzdGF0ZW1lbnRzIGFsbG93cyB0aGlzIG1vZHVsZSB0d28gaGF2ZSBjb21wYXRpYmlsaXR5IHdpdGhcbiAgLy8gMiBkaWZmZXJlbnQgQVBJOlxuICAvL1xuICAvLyAxLiBOb2RlLmpzJ3MgYHVybC5wYXJzZWAgYXBpIHdoaWNoIGFjY2VwdHMgYSBVUkwsIGJvb2xlYW4gYXMgYXJndW1lbnRzXG4gIC8vICAgIHdoZXJlIHRoZSBib29sZWFuIGluZGljYXRlcyB0aGF0IHRoZSBxdWVyeSBzdHJpbmcgc2hvdWxkIGFsc28gYmUgcGFyc2VkLlxuICAvL1xuICAvLyAyLiBUaGUgYFVSTGAgaW50ZXJmYWNlIG9mIHRoZSBicm93c2VyIHdoaWNoIGFjY2VwdHMgYSBVUkwsIG9iamVjdCBhc1xuICAvLyAgICBhcmd1bWVudHMuIFRoZSBzdXBwbGllZCBvYmplY3Qgd2lsbCBiZSB1c2VkIGFzIGRlZmF1bHQgdmFsdWVzIC8gZmFsbC1iYWNrXG4gIC8vICAgIGZvciByZWxhdGl2ZSBwYXRocy5cbiAgLy9cbiAgaWYgKCdvYmplY3QnICE9PSB0eXBlICYmICdzdHJpbmcnICE9PSB0eXBlKSB7XG4gICAgcGFyc2VyID0gbG9jYXRpb247XG4gICAgbG9jYXRpb24gPSBudWxsO1xuICB9XG5cbiAgaWYgKHBhcnNlciAmJiAnZnVuY3Rpb24nICE9PSB0eXBlb2YgcGFyc2VyKSBwYXJzZXIgPSBxcy5wYXJzZTtcblxuICBsb2NhdGlvbiA9IGxvbGNhdGlvbihsb2NhdGlvbik7XG5cbiAgLy9cbiAgLy8gRXh0cmFjdCBwcm90b2NvbCBpbmZvcm1hdGlvbiBiZWZvcmUgcnVubmluZyB0aGUgaW5zdHJ1Y3Rpb25zLlxuICAvL1xuICBleHRyYWN0ZWQgPSBleHRyYWN0UHJvdG9jb2woYWRkcmVzcyB8fCAnJyk7XG4gIHJlbGF0aXZlID0gIWV4dHJhY3RlZC5wcm90b2NvbCAmJiAhZXh0cmFjdGVkLnNsYXNoZXM7XG4gIHVybC5zbGFzaGVzID0gZXh0cmFjdGVkLnNsYXNoZXMgfHwgcmVsYXRpdmUgJiYgbG9jYXRpb24uc2xhc2hlcztcbiAgdXJsLnByb3RvY29sID0gZXh0cmFjdGVkLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sIHx8ICcnO1xuICBhZGRyZXNzID0gZXh0cmFjdGVkLnJlc3Q7XG5cbiAgLy9cbiAgLy8gV2hlbiB0aGUgYXV0aG9yaXR5IGNvbXBvbmVudCBpcyBhYnNlbnQgdGhlIFVSTCBzdGFydHMgd2l0aCBhIHBhdGhcbiAgLy8gY29tcG9uZW50LlxuICAvL1xuICBpZiAoIWV4dHJhY3RlZC5zbGFzaGVzKSBpbnN0cnVjdGlvbnNbMl0gPSBbLyguKikvLCAncGF0aG5hbWUnXTtcblxuICBmb3IgKDsgaSA8IGluc3RydWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgIGluc3RydWN0aW9uID0gaW5zdHJ1Y3Rpb25zW2ldO1xuICAgIHBhcnNlID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAga2V5ID0gaW5zdHJ1Y3Rpb25bMV07XG5cbiAgICBpZiAocGFyc2UgIT09IHBhcnNlKSB7XG4gICAgICB1cmxba2V5XSA9IGFkZHJlc3M7XG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhcnNlKSB7XG4gICAgICBpZiAofihpbmRleCA9IGFkZHJlc3MuaW5kZXhPZihwYXJzZSkpKSB7XG4gICAgICAgIGlmICgnbnVtYmVyJyA9PT0gdHlwZW9mIGluc3RydWN0aW9uWzJdKSB7XG4gICAgICAgICAgdXJsW2tleV0gPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZShpbmRleCArIGluc3RydWN0aW9uWzJdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKGluZGV4ID0gcGFyc2UuZXhlYyhhZGRyZXNzKSkpIHtcbiAgICAgIHVybFtrZXldID0gaW5kZXhbMV07XG4gICAgICBhZGRyZXNzID0gYWRkcmVzcy5zbGljZSgwLCBpbmRleC5pbmRleCk7XG4gICAgfVxuXG4gICAgdXJsW2tleV0gPSB1cmxba2V5XSB8fCAoXG4gICAgICByZWxhdGl2ZSAmJiBpbnN0cnVjdGlvblszXSA/IGxvY2F0aW9uW2tleV0gfHwgJycgOiAnJ1xuICAgICk7XG5cbiAgICAvL1xuICAgIC8vIEhvc3RuYW1lLCBob3N0IGFuZCBwcm90b2NvbCBzaG91bGQgYmUgbG93ZXJjYXNlZCBzbyB0aGV5IGNhbiBiZSB1c2VkIHRvXG4gICAgLy8gY3JlYXRlIGEgcHJvcGVyIGBvcmlnaW5gLlxuICAgIC8vXG4gICAgaWYgKGluc3RydWN0aW9uWzRdKSB1cmxba2V5XSA9IHVybFtrZXldLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICAvL1xuICAvLyBBbHNvIHBhcnNlIHRoZSBzdXBwbGllZCBxdWVyeSBzdHJpbmcgaW4gdG8gYW4gb2JqZWN0LiBJZiB3ZSdyZSBzdXBwbGllZFxuICAvLyB3aXRoIGEgY3VzdG9tIHBhcnNlciBhcyBmdW5jdGlvbiB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBkZWZhdWx0IGJ1aWxkLWluXG4gIC8vIHBhcnNlci5cbiAgLy9cbiAgaWYgKHBhcnNlcikgdXJsLnF1ZXJ5ID0gcGFyc2VyKHVybC5xdWVyeSk7XG5cbiAgLy9cbiAgLy8gSWYgdGhlIFVSTCBpcyByZWxhdGl2ZSwgcmVzb2x2ZSB0aGUgcGF0aG5hbWUgYWdhaW5zdCB0aGUgYmFzZSBVUkwuXG4gIC8vXG4gIGlmIChcbiAgICAgIHJlbGF0aXZlXG4gICAgJiYgbG9jYXRpb24uc2xhc2hlc1xuICAgICYmIHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJ1xuICAgICYmICh1cmwucGF0aG5hbWUgIT09ICcnIHx8IGxvY2F0aW9uLnBhdGhuYW1lICE9PSAnJylcbiAgKSB7XG4gICAgdXJsLnBhdGhuYW1lID0gcmVzb2x2ZSh1cmwucGF0aG5hbWUsIGxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuICBpZiAodXJsLmF1dGgpIHtcbiAgICBpbnN0cnVjdGlvbiA9IHVybC5hdXRoLnNwbGl0KCc6Jyk7XG4gICAgdXJsLnVzZXJuYW1lID0gaW5zdHJ1Y3Rpb25bMF0gfHwgJyc7XG4gICAgdXJsLnBhc3N3b3JkID0gaW5zdHJ1Y3Rpb25bMV0gfHwgJyc7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIC8vXG4gIC8vIFRoZSBocmVmIGlzIGp1c3QgdGhlIGNvbXBpbGVkIHJlc3VsdC5cbiAgLy9cbiAgdXJsLmhyZWYgPSB1cmwudG9TdHJpbmcoKTtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGNvbnZlbmllbmNlIG1ldGhvZCBmb3IgY2hhbmdpbmcgcHJvcGVydGllcyBpbiB0aGUgVVJMIGluc3RhbmNlIHRvXG4gKiBpbnN1cmUgdGhhdCB0aGV5IGFsbCBwcm9wYWdhdGUgY29ycmVjdGx5LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJ0ICAgICAgICAgIFByb3BlcnR5IHdlIG5lZWQgdG8gYWRqdXN0LlxuICogQHBhcmFtIHtNaXhlZH0gdmFsdWUgICAgICAgICAgVGhlIG5ld2x5IGFzc2lnbmVkIHZhbHVlLlxuICogQHBhcmFtIHtCb29sZWFufEZ1bmN0aW9ufSBmbiAgV2hlbiBzZXR0aW5nIHRoZSBxdWVyeSwgaXQgd2lsbCBiZSB0aGUgZnVuY3Rpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZWQgdG8gcGFyc2UgdGhlIHF1ZXJ5LlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgV2hlbiBzZXR0aW5nIHRoZSBwcm90b2NvbCwgZG91YmxlIHNsYXNoIHdpbGwgYmVcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZWQgZnJvbSB0aGUgZmluYWwgdXJsIGlmIGl0IGlzIHRydWUuXG4gKiBAcmV0dXJucyB7VVJMfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gc2V0KHBhcnQsIHZhbHVlLCBmbikge1xuICB2YXIgdXJsID0gdGhpcztcblxuICBzd2l0Y2ggKHBhcnQpIHtcbiAgICBjYXNlICdxdWVyeSc6XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSAoZm4gfHwgcXMucGFyc2UpKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvcnQnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICghcmVxdWlyZWQodmFsdWUsIHVybC5wcm90b2NvbCkpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgICAgIHVybFtwYXJ0XSA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZSArJzonKyB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHVybC5wb3J0KSB2YWx1ZSArPSAnOicrIHVybC5wb3J0O1xuICAgICAgdXJsLmhvc3QgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKC86XFxkKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlID0gdmFsdWUuc3BsaXQoJzonKTtcbiAgICAgICAgdXJsLnBvcnQgPSB2YWx1ZS5wb3AoKTtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWUuam9pbignOicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsLmhvc3RuYW1lID0gdmFsdWU7XG4gICAgICAgIHVybC5wb3J0ID0gJyc7XG4gICAgICB9XG5cbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAncHJvdG9jb2wnOlxuICAgICAgdXJsLnByb3RvY29sID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIHVybC5zbGFzaGVzID0gIWZuO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwYXRobmFtZSc6XG4gICAgICB1cmwucGF0aG5hbWUgPSB2YWx1ZS5sZW5ndGggJiYgdmFsdWUuY2hhckF0KDApICE9PSAnLycgPyAnLycgKyB2YWx1ZSA6IHZhbHVlO1xuXG4gICAgICBicmVhaztcblxuICAgIGRlZmF1bHQ6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwub3JpZ2luID0gdXJsLnByb3RvY29sICYmIHVybC5ob3N0ICYmIHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6J1xuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBwcm9wZXJ0aWVzIGJhY2sgaW4gdG8gYSB2YWxpZCBhbmQgZnVsbCBVUkwgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZ2lmeSBPcHRpb25hbCBxdWVyeSBzdHJpbmdpZnkgZnVuY3Rpb24uXG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc3RyaW5naWZ5KSB7XG4gIGlmICghc3RyaW5naWZ5IHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBzdHJpbmdpZnkpIHN0cmluZ2lmeSA9IHFzLnN0cmluZ2lmeTtcblxuICB2YXIgcXVlcnlcbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIHByb3RvY29sID0gdXJsLnByb3RvY29sO1xuXG4gIGlmIChwcm90b2NvbCAmJiBwcm90b2NvbC5jaGFyQXQocHJvdG9jb2wubGVuZ3RoIC0gMSkgIT09ICc6JykgcHJvdG9jb2wgKz0gJzonO1xuXG4gIHZhciByZXN1bHQgPSBwcm90b2NvbCArICh1cmwuc2xhc2hlcyA/ICcvLycgOiAnJyk7XG5cbiAgaWYgKHVybC51c2VybmFtZSkge1xuICAgIHJlc3VsdCArPSB1cmwudXNlcm5hbWU7XG4gICAgaWYgKHVybC5wYXNzd29yZCkgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH1cblxuICByZXN1bHQgKz0gdXJsLmhvc3QgKyB1cmwucGF0aG5hbWU7XG5cbiAgcXVlcnkgPSAnb2JqZWN0JyA9PT0gdHlwZW9mIHVybC5xdWVyeSA/IHN0cmluZ2lmeSh1cmwucXVlcnkpIDogdXJsLnF1ZXJ5O1xuICBpZiAocXVlcnkpIHJlc3VsdCArPSAnPycgIT09IHF1ZXJ5LmNoYXJBdCgwKSA/ICc/JysgcXVlcnkgOiBxdWVyeTtcblxuICBpZiAodXJsLmhhc2gpIHJlc3VsdCArPSB1cmwuaGFzaDtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5VUkwucHJvdG90eXBlID0geyBzZXQ6IHNldCwgdG9TdHJpbmc6IHRvU3RyaW5nIH07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIFVSTCBwYXJzZXIgYW5kIHNvbWUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIHRoYXQgbWlnaHQgYmUgdXNlZnVsIGZvclxuLy8gb3RoZXJzIG9yIHRlc3RpbmcuXG4vL1xuVVJMLmV4dHJhY3RQcm90b2NvbCA9IGV4dHJhY3RQcm90b2NvbDtcblVSTC5sb2NhdGlvbiA9IGxvbGNhdGlvbjtcblVSTC5xcyA9IHFzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVSTDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi91cmwtcGFyc2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB1cFRvIGZyb20gJy4uLy4uL3V0aWxzL3VwLXRvJ1xuXG4vKipcbiAqIENyZWF0ZSBhIGZvbnQgYXdlc29tZSBpY29uIG5vZGUuXG4gKlxuICogQHBhcmFtIGljb25cbiAqIEBwYXJhbSBuYW1lXG4gKlxuICogQHJldHVybnMgc3RyaW5nXG4gKi9cbmZ1bmN0aW9uIGljb25Ob2RlIChpY29uLCBuYW1lKSB7XG4gIHJldHVybiBgPGkgY2xhc3M9XCJmYSBmYS1mdyBmYS0ke2ljb259XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1ob3Zlcj1cInRvb2x0aXBcIiBkYXRhLXRvb2x0aXAtZGVsYXk9XCIzNTBcIiBkYXRhLXRvb2x0aXAtY29udGVudD1cIiR7bmFtZX1cIj48L2k+YFxufVxuXG4vKipcbiAqIEFkZCBidXR0b25zIGluIHRoZSByaWdodCBvZiBzZWFyY2ggYmFyLlxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIG5vZGUuY2xhc3NOYW1lID0gJ2N1c3RvbS1idXR0b24nXG4gIG5vZGUuaW5uZXJIVE1MID0gYFxuJHtpY29uTm9kZSgnZmlyZScsICfnhrHploDotqjli6InKX1cbiR7aWNvbk5vZGUoJ2Jhci1jaGFydCcsICflgIvkurrntbHoqIgnKX1cbiR7aWNvbk5vZGUoJ2hpc3RvcnknLCAn5q235Y+y5Zue6aGnJyl9XG4ke2ljb25Ob2RlKCdjb2cnLCAn6Kit5a6aJyl9YFxuXG4gIHVwVG8oZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZGl2LmN1c3RvbS1zZWFyY2gtYmFyJyksICdkaXYnKS5hcHBlbmQobm9kZSlcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvaW5pdGlhbGl6YXRpb25zL2J1dHRvbi5qcyIsIi8qKlxuICogSW5zZXJ0IGhvb2tzLmpzIHRvIGh0bWwgZG9tLlxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGNvbnN0IGpzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0JylcblxuICBqcy5zcmMgPSBgY2hyb21lLWV4dGVuc2lvbjovLyR7Y2hyb21lLmkxOG4uZ2V0TWVzc2FnZSgnQEBleHRlbnNpb25faWQnKX0vaG9va3MuanNgXG5cbiAgZG9jdW1lbnQuaGVhZC5hcHBlbmQoanMpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9ob29rLmpzIiwiLyoqXG4gKiBBZGQgbW9kYWwuXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3Qgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgbm9kZS5jbGFzc05hbWUgPSAnY3VzdG9tLW1vZGFsJ1xuICBub2RlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgbm9kZS5pbm5lckhUTUwgPSBgXG48ZGl2IGNsYXNzPVwiYmFja2dyb3VuZFwiPjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiYm94XCI+XG4gIDxkaXYgY2xhc3M9XCJoZWFkZXJcIj5cbiAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWxlZnQ6IDFyZW07XCI+XG4gICAgICA8YiBpZD1cImN1c3RvbS1tb2RhbC10aXRsZVwiIHN0eWxlPVwiZm9udC1zaXplOiAxNnB4O1wiPjwvYj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtYnV0dG9uXCI+XG4gICAgICA8aSBjbGFzcz1cImZhIGZhLWxnIGZhLXRpbWVzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgXG4gIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+PC9kaXY+XG48L2Rpdj5gXG5cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmQobm9kZSlcblxuICBjb25zdCBjbG9zZUV2ZW50ID0gKCkgPT4ge1xuICAgIG5vZGUuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvd1kgPSAnJ1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmN1c3RvbS1tb2RhbCAuYm94IC5jb250ZW50JykuaW5uZXJIVE1MID0gJydcbiAgfVxuXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwgLmJhY2tncm91bmQnKS5vbmNsaWNrID0gY2xvc2VFdmVudFxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5jbG9zZS1idXR0b24gaScpLm9uY2xpY2sgPSBjbG9zZUV2ZW50XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9tb2RhbC5qcyIsIi8qKlxuICogQWRkIGNsYXNzIHRvIGZhY2Vib29rIG5hdmJhci5cbiAqXG4gKiBAcGFyYW0gZG9tXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRvbSA9PiB7XG4gIGRvbS5jbGFzc05hbWUgKz0gJyBjdXN0b20tbmF2YmFyJ1xufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9pbml0aWFsaXphdGlvbnMvbmF2YmFyLmpzIiwiLyoqXG4gKiBBZGQgc2VhcmNoIGJhciBpbiB0aGUgcmlnaHQgb2YgZmFjZWJvb2sgc2VhcmNoIGJhci5cbiAqXG4gKiBAcGFyYW0gZG9tXG4gKlxuICogQHJldHVybnMgdm9pZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGRvbSA9PiB7XG4gIGNvbnN0IG5vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXG4gIG5vZGUuY2xhc3NOYW1lID0gJ2N1c3RvbS1zZWFyY2gtYmFyJ1xuICBub2RlLmlubmVySFRNTCA9IGBcbjxmb3JtPlxuICA8ZGl2PlxuICAgIDxpbnB1dCBpZD1cImN1c3RvbS1zZWFyY2gtaW5wdXRcIiB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIERCXCI+XG4gIDwvZGl2PlxuPC9mb3JtPmBcblxuICBkb20uYXBwZW5kKG5vZGUpXG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luaXRpYWxpemF0aW9ucy9zZWFyY2gtYmFyLmpzIiwibW9kdWxlLmV4cG9ydHMgPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jdXN0b20tYnV0dG9uIGknKS5mb3JFYWNoKG5vZGUgPT4ge1xuICAgIG5vZGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXN0b20tbW9kYWwnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1c3RvbS1tb2RhbC10aXRsZScpLmlubmVyVGV4dCA9IGUudGFyZ2V0LmRhdGFzZXQudG9vbHRpcENvbnRlbnRcblxuICAgICAgY29uc3QgbWFwcGluZyA9IHtcbiAgICAgICAgJ2ZpcmUnOiAnaG90dGVzdCcsXG4gICAgICAgICdiYXItY2hhcnQnOiAnc3RhdGlzdGljcycsXG4gICAgICAgICdoaXN0b3J5JzogJ2hpc3RvcnknLFxuICAgICAgICAnY29nJzogJ3NldHRpbmcnXG4gICAgICB9XG5cbiAgICAgIGxldCBuYW1lID0gZS50YXJnZXQuY2xhc3NOYW1lXG5cbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cihuYW1lLmxhc3RJbmRleE9mKCdmYS0nKSArIDMpXG5cbiAgICAgIHJlcXVpcmUoJy4vbW9kYWxzLycgKyBtYXBwaW5nW25hbWVdKShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VzdG9tLW1vZGFsIC5ib3ggLmNvbnRlbnQnKSlcbiAgICB9KVxuICB9KVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9idXR0b24tY2xpY2suanMiLCIvKipcbiAqIExpc3RlbiBmb3IgZmFjZWJvb2sgc2VhcmNoLlxuICpcbiAqIEByZXR1cm5zIHZvaWRcbiAqL1xuY29uc3Qgc2VhcmNoID0gKCkgPT4ge1xuICBjb25zdCBmYlNlYXJjaElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0W25hbWU9XCJxXCJdJylcblxuICBpZiAoMiA+IGZiU2VhcmNoSW5wdXRzLmxlbmd0aCAmJiAhIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNxJykpIHtcbiAgICB3aW5kb3cuc2V0VGltZW91dChzZWFyY2gsIDEwMDApXG4gIH0gZWxzZSB7XG4gICAgZmJTZWFyY2hJbnB1dHMuaXRlbShmYlNlYXJjaElucHV0cy5sZW5ndGggLSAxKS5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY3VzdG9tLXNlYXJjaC1pbnB1dCcpLnZhbHVlID0gZS50YXJnZXQudmFsdWVcbiAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2VhcmNoXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZhY2Vib29rLXNlYXJjaC5qcyIsImltcG9ydCBjb25maWcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnJ1xuaW1wb3J0IHBhcnNlRmJpZCBmcm9tICcuL2ZlZWQtaGVscGVycy9wYXJzZS1mYmlkJ1xuaW1wb3J0IGluU2NyZWVuIGZyb20gJy4vZmVlZC1oZWxwZXJzL2luLXNjcmVlbidcbmltcG9ydCBpc1B1YmxpYyBmcm9tICcuL2ZlZWQtaGVscGVycy9pcy1wdWJsaWMnXG5pbXBvcnQgaXNTcG9uc29yZWQgZnJvbSAnLi9mZWVkLWhlbHBlcnMvaXMtc3BvbnNvcmVkJ1xuXG5tb2R1bGUuZXhwb3J0cyA9ICgpID0+IHtcbiAgY29uc3QgZmVlZHMgPSBbXVxuXG4gIGxldCBsYXN0WSA9IDBcblxuICB3aW5kb3cub25zY3JvbGwgPSAoKSA9PiB7XG4gICAgaWYgKCcvJyAhPT0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKSB7XG4gICAgICBsYXN0WSA9IDBcblxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnZGl2W2lkXj1cImh5cGVyZmVlZF9zdG9yeV9pZFwiXScpLmZvckVhY2goZmVlZCA9PiB7XG4gICAgICBpZiAoaXNTcG9uc29yZWQoZmVlZCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5nZXQoJ3NldHRpbmcucmVtb3ZlLWFkJywgcmVtb3ZlID0+IHtcbiAgICAgICAgICByZXR1cm4gcmVtb3ZlICYmIGZlZWQucmVtb3ZlKClcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAoaXNQdWJsaWMoZmVlZCkpIHtcbiAgICAgICAgY29uc3QgZmJpZCA9IHBhcnNlRmJpZChmZWVkLnF1ZXJ5U2VsZWN0b3IoJ2RpdiBzcGFuIHNwYW4gYTpub3QoW2RhdGEtaG92ZXJjYXJkLXByZWZlci1tb3JlLWNvbnRlbnQtc2hvd10pJykuaHJlZilcblxuICAgICAgICBpZiAoZmJpZCkge1xuICAgICAgICAgIGlmICghIGZlZWRzLmluY2x1ZGVzKGZiaWQpKSB7XG4gICAgICAgICAgICBmZWVkcy5wdXNoKGZiaWQpXG5cbiAgICAgICAgICAgIGNvbmZpZy5zZXQoJ2ZlZWRzJywgZmVlZHMpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGluU2NyZWVuKGZlZWQpKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygwID4gd2luZG93LnNjcm9sbFkgLSBsYXN0WSA/ICdiYWNrJyA6ICcnLCBmYmlkKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBsYXN0WSA9IHdpbmRvdy5zY3JvbGxZXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvdXNlci1mZWVkLmpzIiwiLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGZlZWQgaXMgaW4gc2NyZWVuIG9yIG5vdC5cbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmZWVkKSA9PiB7XG4gIGNvbnN0IHJlY3QgPSBmZWVkLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG5cbiAgY29uc3Qgc2NyZWVuID0ge1xuICAgIHRvcDogd2luZG93LnNjcm9sbFksXG4gICAgYm90dG9tOiB3aW5kb3cuc2Nyb2xsWSArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHRcbiAgfVxuXG4gIGNvbnN0IGVsID0ge1xuICAgIHRvcDogZmVlZC5vZmZzZXRUb3AgKyByZWN0LmhlaWdodCAvIDMsXG4gICAgYm90dG9tOiBmZWVkLm9mZnNldFRvcCArIHJlY3QuaGVpZ2h0IC8gMyAqIDJcbiAgfVxuXG4gIGlmIChlbC50b3AgPiBzY3JlZW4udG9wICYmIGVsLnRvcCA8IHNjcmVlbi5ib3R0b20pIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9IGVsc2UgaWYgKGVsLmJvdHRvbSA+IHNjcmVlbi50b3AgJiYgZWwuYm90dG9tIDwgc2NyZWVuLmJvdHRvbSkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL2luLXNjcmVlbi5qcyIsIi8qKlxuICogRGV0ZXJtaW5lIHRoZSBmZWVkIGlzIHB1YmxpYyBvciBub3QuXG4gKlxuICogQHJldHVybnMgYm9vbGVhblxuICovXG5leHBvcnQgZGVmYXVsdCAoZmVlZCkgPT4ge1xuICBsZXQgcHJpdmFjeSA9IGZlZWQucXVlcnlTZWxlY3RvcignYVtkYXRhLWhvdmVyPVwidG9vbHRpcFwiXVtjbGFzcyo9XCJQcml2YWN5XCJdLCBkaXZbZGF0YS1ob3Zlcj1cInRvb2x0aXBcIl0nKVxuXG4gIGlmICghIHByaXZhY3kpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHByaXZhY3kgPSBwcml2YWN5LmdldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLWNvbnRlbnQnKVxuXG4gIHJldHVybiBwcml2YWN5LmluY2x1ZGVzKCdQdWJsaWMnKSB8fCBwcml2YWN5LmluY2x1ZGVzKCflhazplosnKVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2NvbnRlbnQtc2NyaXB0cy9tb25pdG9ycy9mZWVkLWhlbHBlcnMvaXMtcHVibGljLmpzIiwiLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGZlZWQgaXMgc3BvbnNvcmVkIG9yIG5vdC5cbiAqXG4gKiBAcmV0dXJucyBib29sZWFuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IChmZWVkKSA9PiB7XG4gIGNvbnN0IGlzU3BvbnNvcmVkID0gZmVlZC5xdWVyeVNlbGVjdG9yKCdhW2hyZWZePVwiaHR0cHM6Ly9sLmZhY2Vib29rLmNvbS9sLnBocFwiXScpXG5cbiAgaWYgKCEgaXNTcG9uc29yZWQpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIHN3aXRjaCAoaXNTcG9uc29yZWQuaW5uZXJUZXh0KSB7XG4gICAgY2FzZSAnU3BvbnNvcmVkJzpcbiAgICBjYXNlICfotIrliqknOlxuICAgIGNhc2UgJ+W6g+WRiic6XG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL21vbml0b3JzL2ZlZWQtaGVscGVycy9pcy1zcG9uc29yZWQuanMiLCJpbXBvcnQgdXJsUGFyc2UgZnJvbSAndXJsLXBhcnNlJ1xuXG5jb25zdCBwYXJzZWRVcmxzID0ge31cblxuLyoqXG4gKiBQYXJzZSBmYmlkIGZyb20gdXJsLlxuICpcbiAqIEByZXR1cm5zIHN0cmluZ3xudWxsXG4gKi9cbmNvbnN0IGZyb21VcmwgPSB1cmwgPT4ge1xuICBpZiAocGFyc2VkVXJscy5oYXNPd25Qcm9wZXJ0eSh1cmwpKSB7XG4gICAgcmV0dXJuIHBhcnNlZFVybHNbdXJsXVxuICB9XG5cbiAgY29uc3QgcGFyc2VkID0gdXJsUGFyc2UodXJsLCB0cnVlKVxuICBjb25zdCBxdWVyeSA9IHBhcnNlZC5xdWVyeVxuICBjb25zdCBwYXRobmFtZSA9IHBhcnNlZC5wYXRobmFtZS5yZXBsYWNlKC9cXC8rJC8sICcnKVxuXG4gIGxldCByZXN1bHRcblxuICBpZiAocGF0aG5hbWUuZW5kc1dpdGgoJzozJykgfHwgcGF0aG5hbWUuZW5kc1dpdGgoJzowJykpIHtcbiAgICByZXN1bHQgPSBudWxsXG4gIH0gZWxzZSBpZiAocXVlcnkuaGFzT3duUHJvcGVydHkoJ3N0b3J5X2ZiaWQnKSkge1xuICAgIHJlc3VsdCA9IHF1ZXJ5LnN0b3J5X2ZiaWRcbiAgfSBlbHNlIGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eSgnZmJpZCcpKSB7XG4gICAgcmVzdWx0ID0gcXVlcnkuZmJpZFxuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9IHBhdGhuYW1lLnNsaWNlKHBhdGhuYW1lLmxhc3RJbmRleE9mKCcvJykgKyAxKVxuICB9XG5cbiAgcGFyc2VkVXJsc1t1cmxdID0gcmVzdWx0XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIFBhcnNlIGZiaWQgZnJvbSBnaXZlbiB2YWx1ZS5cbiAqXG4gKiBAcmV0dXJucyBzdHJpbmd8bnVsbFxuICovXG5leHBvcnQgZGVmYXVsdCB2YWwgPT4ge1xuICBpZiAodmFsLm1hdGNoKC8oXFxiKGh0dHBzPyk6XFwvXFwvWy1BLVowLTkrJkAjXFwvJT89fl98ITosLjtdKlstQS1aMC05KyZAI1xcLyU9fl98XSkvaWcpKSB7XG4gICAgcmV0dXJuIGZyb21VcmwodmFsKVxuICB9XG5cbiAgY29uc29sZS5lcnJvcihgZmJpZCB1bmtub3duIHR5cGU6ICR7dmFsfWApXG5cbiAgcmV0dXJuIG51bGxcbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvZmVlZC1oZWxwZXJzL3BhcnNlLWZiaWQuanMiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYm9vbGVhbiA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAvXih0cnVlfHR8eWVzfHl8MSkkL2kudGVzdCh2YWx1ZS50cmltKCkpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDE7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnYm9vbGVhbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJvb2xlYW47XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vYm9vbGVhbi9saWIvYm9vbGVhbi5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eS5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLXByaW1pdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5LmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5jb25zdCBpc09iaiA9IHJlcXVpcmUoJ2lzLW9iaicpO1xuXG5mdW5jdGlvbiBnZXRQYXRoU2VnbWVudHMocGF0aCkge1xuXHRjb25zdCBwYXRoQXJyID0gcGF0aC5zcGxpdCgnLicpO1xuXHRjb25zdCBwYXJ0cyA9IFtdO1xuXG5cdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdGxldCBwID0gcGF0aEFycltpXTtcblxuXHRcdHdoaWxlIChwW3AubGVuZ3RoIC0gMV0gPT09ICdcXFxcJyAmJiBwYXRoQXJyW2kgKyAxXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwID0gcC5zbGljZSgwLCAtMSkgKyAnLic7XG5cdFx0XHRwICs9IHBhdGhBcnJbKytpXTtcblx0XHR9XG5cblx0XHRwYXJ0cy5wdXNoKHApO1xuXHR9XG5cblx0cmV0dXJuIHBhcnRzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z2V0KG9iaiwgcGF0aCwgdmFsdWUpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZCA/IG9iaiA6IHZhbHVlO1xuXHRcdH1cblxuXHRcdGNvbnN0IHBhdGhBcnIgPSBnZXRQYXRoU2VnbWVudHMocGF0aCk7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHBhdGhBcnIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmICghT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKG9iaiwgcGF0aEFycltpXSkpIHtcblx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcGF0aEFycltpXV07XG5cblx0XHRcdGlmIChvYmogPT09IHVuZGVmaW5lZCB8fCBvYmogPT09IG51bGwpIHtcblx0XHRcdFx0Ly8gYG9iamAgaXMgZWl0aGVyIGB1bmRlZmluZWRgIG9yIGBudWxsYCBzbyB3ZSB3YW50IHRvIHN0b3AgdGhlIGxvb3AsIGFuZFxuXHRcdFx0XHQvLyBpZiB0aGlzIGlzIG5vdCB0aGUgbGFzdCBiaXQgb2YgdGhlIHBhdGgsIGFuZFxuXHRcdFx0XHQvLyBpZiBpdCBkaWQndCByZXR1cm4gYHVuZGVmaW5lZGBcblx0XHRcdFx0Ly8gaXQgd291bGQgcmV0dXJuIGBudWxsYCBpZiBgb2JqYCBpcyBgbnVsbGBcblx0XHRcdFx0Ly8gYnV0IHdlIHdhbnQgYGdldCh7Zm9vOiBudWxsfSwgJ2Zvby5iYXInKWAgdG8gZXF1YWwgYHVuZGVmaW5lZGAsIG9yIHRoZSBzdXBwbGllZCB2YWx1ZSwgbm90IGBudWxsYFxuXHRcdFx0XHRpZiAoaSAhPT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZhbHVlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fSxcblxuXHRzZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuXHRcdGlmICghaXNPYmoob2JqKSB8fCB0eXBlb2YgcGF0aCAhPT0gJ3N0cmluZycpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCBwYXRoQXJyID0gZ2V0UGF0aFNlZ21lbnRzKHBhdGgpO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoQXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRjb25zdCBwID0gcGF0aEFycltpXTtcblxuXHRcdFx0aWYgKCFpc09iaihvYmpbcF0pKSB7XG5cdFx0XHRcdG9ialtwXSA9IHt9O1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaSA9PT0gcGF0aEFyci5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdG9ialtwXSA9IHZhbHVlO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcF07XG5cdFx0fVxuXHR9LFxuXG5cdGRlbGV0ZShvYmosIHBhdGgpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0Y29uc3QgcCA9IHBhdGhBcnJbaV07XG5cblx0XHRcdGlmIChpID09PSBwYXRoQXJyLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0ZGVsZXRlIG9ialtwXTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRvYmogPSBvYmpbcF07XG5cblx0XHRcdGlmICghaXNPYmoob2JqKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdGhhcyhvYmosIHBhdGgpIHtcblx0XHRpZiAoIWlzT2JqKG9iaikgfHwgdHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Y29uc3QgcGF0aEFyciA9IGdldFBhdGhTZWdtZW50cyhwYXRoKTtcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aEFyci5sZW5ndGg7IGkrKykge1xuXHRcdFx0aWYgKGlzT2JqKG9iaikpIHtcblx0XHRcdFx0aWYgKCEocGF0aEFycltpXSBpbiBvYmopKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0b2JqID0gb2JqW3BhdGhBcnJbaV1dO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2RvdC1wcm9wL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh4KSB7XG5cdHZhciB0eXBlID0gdHlwZW9mIHg7XG5cdHJldHVybiB4ICE9PSBudWxsICYmICh0eXBlID09PSAnb2JqZWN0JyB8fCB0eXBlID09PSAnZnVuY3Rpb24nKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vaXMtb2JqL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFNpbXBsZSBxdWVyeSBzdHJpbmcgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBxdWVyeSBUaGUgcXVlcnkgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgcGFyc2VkLlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5nKHF1ZXJ5KSB7XG4gIHZhciBwYXJzZXIgPSAvKFtePT8mXSspPT8oW14mXSopL2dcbiAgICAsIHJlc3VsdCA9IHt9XG4gICAgLCBwYXJ0O1xuXG4gIC8vXG4gIC8vIExpdHRsZSBuaWZ0eSBwYXJzaW5nIGhhY2ssIGxldmVyYWdlIHRoZSBmYWN0IHRoYXQgUmVnRXhwLmV4ZWMgaW5jcmVtZW50c1xuICAvLyB0aGUgbGFzdEluZGV4IHByb3BlcnR5IHNvIHdlIGNhbiBjb250aW51ZSBleGVjdXRpbmcgdGhpcyBsb29wIHVudGlsIHdlJ3ZlXG4gIC8vIHBhcnNlZCBhbGwgcmVzdWx0cy5cbiAgLy9cbiAgZm9yICg7XG4gICAgcGFydCA9IHBhcnNlci5leGVjKHF1ZXJ5KTtcbiAgICByZXN1bHRbZGVjb2RlVVJJQ29tcG9uZW50KHBhcnRbMV0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYXJ0WzJdKVxuICApO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIGEgcXVlcnkgc3RyaW5nIHRvIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIE9iamVjdCB0aGF0IHNob3VsZCBiZSB0cmFuc2Zvcm1lZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBwcmVmaXggT3B0aW9uYWwgcHJlZml4LlxuICogQHJldHVybnMge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cbmZ1bmN0aW9uIHF1ZXJ5c3RyaW5naWZ5KG9iaiwgcHJlZml4KSB7XG4gIHByZWZpeCA9IHByZWZpeCB8fCAnJztcblxuICB2YXIgcGFpcnMgPSBbXTtcblxuICAvL1xuICAvLyBPcHRpb25hbGx5IHByZWZpeCB3aXRoIGEgJz8nIGlmIG5lZWRlZFxuICAvL1xuICBpZiAoJ3N0cmluZycgIT09IHR5cGVvZiBwcmVmaXgpIHByZWZpeCA9ICc/JztcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcGFpcnMucHVzaChlbmNvZGVVUklDb21wb25lbnQoa2V5KSArJz0nKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2tleV0pKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcGFpcnMubGVuZ3RoID8gcHJlZml4ICsgcGFpcnMuam9pbignJicpIDogJyc7XG59XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5leHBvcnRzLnN0cmluZ2lmeSA9IHF1ZXJ5c3RyaW5naWZ5O1xuZXhwb3J0cy5wYXJzZSA9IHF1ZXJ5c3RyaW5nO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3F1ZXJ5c3RyaW5naWZ5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2sgaWYgd2UncmUgcmVxdWlyZWQgdG8gYWRkIGEgcG9ydCBudW1iZXIuXG4gKlxuICogQHNlZSBodHRwczovL3VybC5zcGVjLndoYXR3Zy5vcmcvI2RlZmF1bHQtcG9ydFxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBwb3J0IFBvcnQgbnVtYmVyIHdlIG5lZWQgdG8gY2hlY2tcbiAqIEBwYXJhbSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCB3ZSBuZWVkIHRvIGNoZWNrIGFnYWluc3QuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSXMgaXQgYSBkZWZhdWx0IHBvcnQgZm9yIHRoZSBnaXZlbiBwcm90b2NvbFxuICogQGFwaSBwcml2YXRlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcmVxdWlyZWQocG9ydCwgcHJvdG9jb2wpIHtcbiAgcHJvdG9jb2wgPSBwcm90b2NvbC5zcGxpdCgnOicpWzBdO1xuICBwb3J0ID0gK3BvcnQ7XG5cbiAgaWYgKCFwb3J0KSByZXR1cm4gZmFsc2U7XG5cbiAgc3dpdGNoIChwcm90b2NvbCkge1xuICAgIGNhc2UgJ2h0dHAnOlxuICAgIGNhc2UgJ3dzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gODA7XG5cbiAgICBjYXNlICdodHRwcyc6XG4gICAgY2FzZSAnd3NzJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNDQzO1xuXG4gICAgY2FzZSAnZnRwJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gMjE7XG5cbiAgICBjYXNlICdnb3BoZXInOlxuICAgIHJldHVybiBwb3J0ICE9PSA3MDtcblxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBwb3J0ICE9PSAwO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yZXF1aXJlcy1wb3J0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCc7XG5cbnZhciBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vO1xuXG4vKipcbiAqIFRoZXNlIHByb3BlcnRpZXMgc2hvdWxkIG5vdCBiZSBjb3BpZWQgb3IgaW5oZXJpdGVkIGZyb20uIFRoaXMgaXMgb25seSBuZWVkZWRcbiAqIGZvciBhbGwgbm9uIGJsb2IgVVJMJ3MgYXMgYSBibG9iIFVSTCBkb2VzIG5vdCBpbmNsdWRlIGEgaGFzaCwgb25seSB0aGVcbiAqIG9yaWdpbi5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmFyIGlnbm9yZSA9IHsgaGFzaDogMSwgcXVlcnk6IDEgfVxuICAsIFVSTDtcblxuLyoqXG4gKiBUaGUgbG9jYXRpb24gb2JqZWN0IGRpZmZlcnMgd2hlbiB5b3VyIGNvZGUgaXMgbG9hZGVkIHRocm91Z2ggYSBub3JtYWwgcGFnZSxcbiAqIFdvcmtlciBvciB0aHJvdWdoIGEgd29ya2VyIHVzaW5nIGEgYmxvYi4gQW5kIHdpdGggdGhlIGJsb2JibGUgYmVnaW5zIHRoZVxuICogdHJvdWJsZSBhcyB0aGUgbG9jYXRpb24gb2JqZWN0IHdpbGwgY29udGFpbiB0aGUgVVJMIG9mIHRoZSBibG9iLCBub3QgdGhlXG4gKiBsb2NhdGlvbiBvZiB0aGUgcGFnZSB3aGVyZSBvdXIgY29kZSBpcyBsb2FkZWQgaW4uIFRoZSBhY3R1YWwgb3JpZ2luIGlzXG4gKiBlbmNvZGVkIGluIHRoZSBgcGF0aG5hbWVgIHNvIHdlIGNhbiB0aGFua2Z1bGx5IGdlbmVyYXRlIGEgZ29vZCBcImRlZmF1bHRcIlxuICogbG9jYXRpb24gZnJvbSBpdCBzbyB3ZSBjYW4gZ2VuZXJhdGUgcHJvcGVyIHJlbGF0aXZlIFVSTCdzIGFnYWluLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gbG9jIE9wdGlvbmFsIGRlZmF1bHQgbG9jYXRpb24gb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gbG9sY2F0aW9uIG9iamVjdC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9sY2F0aW9uKGxvYykge1xuICBsb2MgPSBsb2MgfHwgZ2xvYmFsLmxvY2F0aW9uIHx8IHt9O1xuICBVUkwgPSBVUkwgfHwgcmVxdWlyZSgnLi8nKTtcblxuICB2YXIgZmluYWxkZXN0aW5hdGlvbiA9IHt9XG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY1xuICAgICwga2V5O1xuXG4gIGlmICgnYmxvYjonID09PSBsb2MucHJvdG9jb2wpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVSTCh1bmVzY2FwZShsb2MucGF0aG5hbWUpLCB7fSk7XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGUpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVSTChsb2MsIHt9KTtcbiAgICBmb3IgKGtleSBpbiBpZ25vcmUpIGRlbGV0ZSBmaW5hbGRlc3RpbmF0aW9uW2tleV07XG4gIH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGUpIHtcbiAgICBmb3IgKGtleSBpbiBsb2MpIHtcbiAgICAgIGlmIChrZXkgaW4gaWdub3JlKSBjb250aW51ZTtcbiAgICAgIGZpbmFsZGVzdGluYXRpb25ba2V5XSA9IGxvY1trZXldO1xuICAgIH1cblxuICAgIGlmIChmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID0gc2xhc2hlcy50ZXN0KGxvYy5ocmVmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmluYWxkZXN0aW5hdGlvbjtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vdXJsLXBhcnNlL2xvbGNhdGlvbi5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGhlYWRlcnMpKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24oaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgICAgfSwgdGhpcylcbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLm1hcFtuYW1lXVxuICAgIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSsnLCcrdmFsdWUgOiB2YWx1ZVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgICBpZiAodGhpcy5tYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB0aGlzLm1hcFtuYW1lXSwgbmFtZSwgdGhpcylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChuYW1lKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IGl0ZW1zLnB1c2godmFsdWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIEhlYWRlcnMucHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl0gPSBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzXG4gIH1cblxuICBmdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gICAgaWYgKGJvZHkuYm9keVVzZWQpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKSlcbiAgICB9XG4gICAgYm9keS5ib2R5VXNlZCA9IHRydWVcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICByZWFkZXIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICAgIH1cbiAgICAgIHJlYWRlci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNBcnJheUJ1ZmZlcihibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRCbG9iQXNUZXh0KGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzVGV4dChibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQXJyYXlCdWZmZXJBc1RleHQoYnVmKSB7XG4gICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYpXG4gICAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aWV3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGFyc1tpXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUodmlld1tpXSlcbiAgICB9XG4gICAgcmV0dXJuIGNoYXJzLmpvaW4oJycpXG4gIH1cblxuICBmdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgICBpZiAoYnVmLnNsaWNlKSB7XG4gICAgICByZXR1cm4gYnVmLnNsaWNlKDApXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmLmJ5dGVMZW5ndGgpXG4gICAgICB2aWV3LnNldChuZXcgVWludDhBcnJheShidWYpKVxuICAgICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gQm9keSgpIHtcbiAgICB0aGlzLmJvZHlVc2VkID0gZmFsc2VcblxuICAgIHRoaXMuX2luaXRCb2R5ID0gZnVuY3Rpb24oYm9keSkge1xuICAgICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgICBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYmxvYiAmJiBCbG9iLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmZvcm1EYXRhICYmIEZvcm1EYXRhLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlGb3JtRGF0YSA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keS50b1N0cmluZygpXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgc3VwcG9ydC5ibG9iICYmIGlzRGF0YVZpZXcoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAgIC8vIElFIDEwLTExIGNhbid0IGhhbmRsZSBhIERhdGFWaWV3IGJvZHkuXG4gICAgICAgIHRoaXMuX2JvZHlJbml0ID0gbmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pXG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSkpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnN1bWVkKHRoaXMpIHx8IFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHJlYWRCbG9iQXNUZXh0KHRoaXMuX2JvZHlCbG9iKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyB0ZXh0JylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBSZXF1ZXN0KSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5ICYmIGlucHV0Ll9ib2R5SW5pdCAhPSBudWxsKSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gU3RyaW5nKGlucHV0KVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgvXFxyP1xcbi8pLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3doYXR3Zy1mZXRjaC9mZXRjaC5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2hpc3RvcnlcIjogNCxcblx0XCIuL2hpc3RvcnkuanNcIjogNCxcblx0XCIuL2hvdHRlc3RcIjogNSxcblx0XCIuL2hvdHRlc3QuanNcIjogNSxcblx0XCIuL2hvdHRlc3QvcG9zdHNcIjogMixcblx0XCIuL2hvdHRlc3QvcG9zdHMuanNcIjogMixcblx0XCIuL3NldHRpbmdcIjogNixcblx0XCIuL3NldHRpbmcuanNcIjogNixcblx0XCIuL3N0YXRpc3RpY3NcIjogNyxcblx0XCIuL3N0YXRpc3RpY3MuanNcIjogN1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNDg7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb250ZW50LXNjcmlwdHMvbW9uaXRvcnMvbW9kYWxzIF5cXC5cXC8uKiRcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB1cFRvIGZyb20gJy4uL3V0aWxzL3VwLXRvJ1xuXG5kb2N1bWVudC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gIGlmICgnaW50ZXJhY3RpdmUnID09PSBkb2N1bWVudC5yZWFkeVN0YXRlKSB7XG4gICAgY29uc3QgZG9tID0gKCgpID0+IHtcbiAgICAgIGxldCBkb20gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXZbcm9sZT1cInNlYXJjaFwiXScpXG5cbiAgICAgIGlmICghIGRvbSkge1xuICAgICAgICBkb20gPSB1cFRvKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm1bcm9sZT1cInNlYXJjaFwiXScpLCAnZGl2JylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwVG8oZG9tLCAnZGl2JylcbiAgICB9KSgpXG5cbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9ob29rJykoKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL25hdmJhcicpKGRvbSlcbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9zZWFyY2gtYmFyJykoZG9tKVxuICAgIHJlcXVpcmUoJy4vaW5pdGlhbGl6YXRpb25zL2J1dHRvbicpKClcbiAgICByZXF1aXJlKCcuL2luaXRpYWxpemF0aW9ucy9tb2RhbCcpKClcblxuICAgIHJlcXVpcmUoJy4vbW9uaXRvcnMvZmFjZWJvb2stc2VhcmNoJykoKVxuICAgIHJlcXVpcmUoJy4vbW9uaXRvcnMvYnV0dG9uLWNsaWNrJykoKVxuICAgIHJlcXVpcmUoJy4vbW9uaXRvcnMvdXNlci1mZWVkJykoKVxuICB9XG59XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvY29udGVudC1zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==