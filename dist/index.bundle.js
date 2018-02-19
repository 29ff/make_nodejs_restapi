module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const devConfig = {
  MONGO_URL: 'mongodb://localhost/makeanodejsapi-dev',
  JWT_SECRET: 'noadminhere'
};
const testConfig = { MONGO_URL: 'mongodb://localhost/makeanodejsapi-test' };
const prodConfig = { MONGO_URL: 'mongodb://localhost/makeanodejsapi-prod' };
const defaultConfig = {
  PORT: process.env.PORT || 3000
};

function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;
  }
}

// take defaultConfig and make it a single object
// so, we have concatenated two objects into one

exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(4);

var _middleware = __webpack_require__(5);

var _middleware2 = _interopRequireDefault(_middleware);

var _modules = __webpack_require__(11);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)();

// use middleware
(0, _middleware2.default)(app);
app.get('/', (req, res) => {
  res.send('Hello world!');
});

(0, _modules2.default)(app);

app.listen(_constants2.default.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`Server is running on PORT: ${_constants2.default.PORT} --- Running on ${process.env.NODE_ENV} --- Make something great!`);
  }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(1);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// remove warning with promises
_mongoose2.default.Promise = global.Promise;

// connect database with the url provided
try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}

_mongoose2.default.connection.once('open', () => {
  console.log('MongoDB running');
}).on('error', e => {
  throw e;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(6);

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = __webpack_require__(7);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _compression = __webpack_require__(8);

var _compression2 = _interopRequireDefault(_compression);

var _helmet = __webpack_require__(9);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(58);

var _passport2 = _interopRequireDefault(_passport);

var _util = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({
    extended: true
  }));

  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(12);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  app.use('/api/v1/users', _user2.default);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(0);

var _express2 = _interopRequireDefault(_express);

var _expressValidation = __webpack_require__(44);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user = __webpack_require__(13);

var userController = _interopRequireWildcard(_user);

var _user2 = __webpack_require__(16);

var _user3 = _interopRequireDefault(_user2);

var _auth = __webpack_require__(66);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = new _express2.default.Router();

// signup route
routes.post('/signup', (0, _expressValidation2.default)(_user3.default.signup), userController.signup);

// login route
routes.post('/login', _auth.authLocal, userController.login);

exports.default = routes;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signup = signup;
exports.login = login;

var _user = __webpack_require__(14);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signup(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
}

function login(req, res, next) {
  res.status(200).json(req.user);
  return next();
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(15);

var _validator2 = _interopRequireDefault(_validator);

var _user = __webpack_require__(16);

var _bcryptNodejs = __webpack_require__(51);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const UserSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required!'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  firstName: {
    type: String,
    required: [true, 'First name is required!'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required!'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'User name is required!'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required!'],
    trim: true,
    minlength: [6, 'Password need to be longer!'],
    validate: {
      validator(password) {
        _user.passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password!'
    }
  }
});

UserSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
  }
  return next();
});

UserSchema.methods = {
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenicateUser(password) {
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  }
};

exports.default = _mongoose2.default.model('User', UserSchema);

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordReg = undefined;

var _joi = __webpack_require__(22);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordReg = exports.passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
exports.default = {
  signup: {
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(passwordReg).required(),
    firstName: _joi2.default.string().required(),
    lastName: _joi2.default.string().required(),
    userName: _joi2.default.string().required()
  }
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("hoek");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Ref = __webpack_require__(19);
const Errors = __webpack_require__(21);
let Alternatives = null;                // Delay-loaded to prevent circular dependencies
let Cast = null;


// Declare internals

const internals = {
    Set: __webpack_require__(23)
};


internals.defaults = {
    abortEarly: true,
    convert: true,
    allowUnknown: false,
    skipFunctions: false,
    stripUnknown: false,
    language: {},
    presence: 'optional',
    strip: false,
    noDefaults: false,
    escapeHtml: false

    // context: null
};


module.exports = internals.Any = class {

    constructor() {

        Cast = Cast || __webpack_require__(20);

        this.isJoi = true;
        this._type = 'any';
        this._settings = null;
        this._valids = new internals.Set();
        this._invalids = new internals.Set();
        this._tests = [];
        this._refs = [];
        this._flags = {
            /*
             presence: 'optional',                   // optional, required, forbidden, ignore
             allowOnly: false,
             allowUnknown: undefined,
             default: undefined,
             forbidden: false,
             encoding: undefined,
             insensitive: false,
             trim: false,
             normalize: undefined,                   // NFC, NFD, NFKC, NFKD
             case: undefined,                        // upper, lower
             empty: undefined,
             func: false,
             raw: false
             */
        };

        this._description = null;
        this._unit = null;
        this._notes = [];
        this._tags = [];
        this._examples = [];
        this._meta = [];

        this._inner = {};                           // Hash of arrays of immutable objects
    }

    get schemaType() {

        return this._type;
    }

    createError(type, context, state, options, flags = this._flags) {

        return Errors.create(type, context, state, options, flags);
    }

    createOverrideError(type, context, state, options, message, template) {

        return Errors.create(type, context, state, options, this._flags, message, template);
    }

    checkOptions(options) {

        const Schemas = __webpack_require__(29);
        const result = Schemas.options.validate(options);
        if (result.error) {
            throw new Error(result.error.details[0].message);
        }
    }

    clone() {

        const obj = Object.create(Object.getPrototypeOf(this));

        obj.isJoi = true;
        obj._currentJoi = this._currentJoi;
        obj._type = this._type;
        obj._settings = internals.concatSettings(this._settings);
        obj._baseType = this._baseType;
        obj._valids = Hoek.clone(this._valids);
        obj._invalids = Hoek.clone(this._invalids);
        obj._tests = this._tests.slice();
        obj._refs = this._refs.slice();
        obj._flags = Hoek.clone(this._flags);

        obj._description = this._description;
        obj._unit = this._unit;
        obj._notes = this._notes.slice();
        obj._tags = this._tags.slice();
        obj._examples = this._examples.slice();
        obj._meta = this._meta.slice();

        obj._inner = {};
        const inners = Object.keys(this._inner);
        for (let i = 0; i < inners.length; ++i) {
            const key = inners[i];
            obj._inner[key] = this._inner[key] ? this._inner[key].slice() : null;
        }

        return obj;
    }

    concat(schema) {

        Hoek.assert(schema instanceof internals.Any, 'Invalid schema object');
        Hoek.assert(this._type === 'any' || schema._type === 'any' || schema._type === this._type, 'Cannot merge type', this._type, 'with another type:', schema._type);

        let obj = this.clone();

        if (this._type === 'any' && schema._type !== 'any') {

            // Reset values as if we were "this"
            const tmpObj = schema.clone();
            const keysToRestore = ['_settings', '_valids', '_invalids', '_tests', '_refs', '_flags', '_description', '_unit',
                '_notes', '_tags', '_examples', '_meta', '_inner'];

            for (let i = 0; i < keysToRestore.length; ++i) {
                tmpObj[keysToRestore[i]] = obj[keysToRestore[i]];
            }

            obj = tmpObj;
        }

        obj._settings = obj._settings ? internals.concatSettings(obj._settings, schema._settings) : schema._settings;
        obj._valids.merge(schema._valids, schema._invalids);
        obj._invalids.merge(schema._invalids, schema._valids);
        obj._tests = obj._tests.concat(schema._tests);
        obj._refs = obj._refs.concat(schema._refs);
        Hoek.merge(obj._flags, schema._flags);

        obj._description = schema._description || obj._description;
        obj._unit = schema._unit || obj._unit;
        obj._notes = obj._notes.concat(schema._notes);
        obj._tags = obj._tags.concat(schema._tags);
        obj._examples = obj._examples.concat(schema._examples);
        obj._meta = obj._meta.concat(schema._meta);

        const inners = Object.keys(schema._inner);
        const isObject = obj._type === 'object';
        for (let i = 0; i < inners.length; ++i) {
            const key = inners[i];
            const source = schema._inner[key];
            if (source) {
                const target = obj._inner[key];
                if (target) {
                    if (isObject && key === 'children') {
                        const keys = {};

                        for (let j = 0; j < target.length; ++j) {
                            keys[target[j].key] = j;
                        }

                        for (let j = 0; j < source.length; ++j) {
                            const sourceKey = source[j].key;
                            if (keys[sourceKey] >= 0) {
                                target[keys[sourceKey]] = {
                                    key: sourceKey,
                                    schema: target[keys[sourceKey]].schema.concat(source[j].schema)
                                };
                            }
                            else {
                                target.push(source[j]);
                            }
                        }
                    }
                    else {
                        obj._inner[key] = obj._inner[key].concat(source);
                    }
                }
                else {
                    obj._inner[key] = source.slice();
                }
            }
        }

        return obj;
    }

    _test(name, arg, func, options) {

        const obj = this.clone();
        obj._tests.push({ func, name, arg, options });
        return obj;
    }

    options(options) {

        Hoek.assert(!options.context, 'Cannot override context');
        this.checkOptions(options);

        const obj = this.clone();
        obj._settings = internals.concatSettings(obj._settings, options);
        return obj;
    }

    strict(isStrict) {

        const obj = this.clone();
        obj._settings = obj._settings || {};
        obj._settings.convert = isStrict === undefined ? false : !isStrict;
        return obj;
    }

    raw(isRaw) {

        const value = isRaw === undefined ? true : isRaw;

        if (this._flags.raw === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.raw = value;
        return obj;
    }

    error(err) {

        Hoek.assert(err && (err instanceof Error || typeof err === 'function'), 'Must provide a valid Error object or a function');

        const obj = this.clone();
        obj._flags.error = err;
        return obj;
    }

    allow(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
            obj._invalids.remove(value);
            obj._valids.add(value, obj._refs);
        }
        return obj;
    }

    valid(...values) {

        const obj = this.allow(...values);
        obj._flags.allowOnly = true;
        return obj;
    }

    invalid(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call allow/valid/invalid with undefined');
            obj._valids.remove(value);
            obj._invalids.add(value, obj._refs);
        }

        return obj;
    }

    required() {

        if (this._flags.presence === 'required') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'required';
        return obj;
    }

    optional() {

        if (this._flags.presence === 'optional') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'optional';
        return obj;
    }


    forbidden() {

        if (this._flags.presence === 'forbidden') {
            return this;
        }

        const obj = this.clone();
        obj._flags.presence = 'forbidden';
        return obj;
    }


    strip() {

        if (this._flags.strip) {
            return this;
        }

        const obj = this.clone();
        obj._flags.strip = true;
        return obj;
    }

    applyFunctionToChildren(children, fn, args, root) {

        children = [].concat(children);

        if (children.length !== 1 || children[0] !== '') {
            root = root ? (root + '.') : '';

            const extraChildren = (children[0] === '' ? children.slice(1) : children).map((child) => {

                return root + child;
            });

            throw new Error('unknown key(s) ' + extraChildren.join(', '));
        }

        return this[fn].apply(this, args);
    }

    default(value, description) {

        if (typeof value === 'function' &&
            !Ref.isRef(value)) {

            if (!value.description &&
                description) {

                value.description = description;
            }

            if (!this._flags.func) {
                Hoek.assert(typeof value.description === 'string' && value.description.length > 0, 'description must be provided when default value is a function');
            }
        }

        const obj = this.clone();
        obj._flags.default = value;
        Ref.push(obj._refs, value);
        return obj;
    }

    empty(schema) {

        const obj = this.clone();
        if (schema === undefined) {
            delete obj._flags.empty;
        }
        else {
            obj._flags.empty = Cast.schema(this._currentJoi, schema);
        }
        return obj;
    }

    when(condition, options) {

        Hoek.assert(options && typeof options === 'object', 'Invalid options');
        Hoek.assert(options.then !== undefined || options.otherwise !== undefined, 'options must have at least one of "then" or "otherwise"');

        const then = options.hasOwnProperty('then') ? this.concat(Cast.schema(this._currentJoi, options.then)) : undefined;
        const otherwise = options.hasOwnProperty('otherwise') ? this.concat(Cast.schema(this._currentJoi, options.otherwise)) : undefined;

        Alternatives = Alternatives || __webpack_require__(24);

        const alternativeOptions = { then, otherwise };
        if (Object.prototype.hasOwnProperty.call(options, 'is')) {
            alternativeOptions.is = options.is;
        }
        const obj = Alternatives.when(condition, alternativeOptions);
        obj._flags.presence = 'ignore';
        obj._baseType = this;

        return obj;
    }

    description(desc) {

        Hoek.assert(desc && typeof desc === 'string', 'Description must be a non-empty string');

        const obj = this.clone();
        obj._description = desc;
        return obj;
    }

    notes(notes) {

        Hoek.assert(notes && (typeof notes === 'string' || Array.isArray(notes)), 'Notes must be a non-empty string or array');

        const obj = this.clone();
        obj._notes = obj._notes.concat(notes);
        return obj;
    }

    tags(tags) {

        Hoek.assert(tags && (typeof tags === 'string' || Array.isArray(tags)), 'Tags must be a non-empty string or array');

        const obj = this.clone();
        obj._tags = obj._tags.concat(tags);
        return obj;
    }

    meta(meta) {

        Hoek.assert(meta !== undefined, 'Meta cannot be undefined');

        const obj = this.clone();
        obj._meta = obj._meta.concat(meta);
        return obj;
    }

    example(...args) {

        Hoek.assert(args.length === 1, 'Missing example');
        const value = args[0];

        const obj = this.clone();
        obj._examples.push(value);
        return obj;
    }

    unit(name) {

        Hoek.assert(name && typeof name === 'string', 'Unit name must be a non-empty string');

        const obj = this.clone();
        obj._unit = name;
        return obj;
    }

    _prepareEmptyValue(value) {

        if (typeof value === 'string' && this._flags.trim) {
            return value.trim();
        }

        return value;
    }

    _validate(value, state, options, reference) {

        const originalValue = value;

        // Setup state and settings

        state = state || { key: '', path: [], parent: null, reference };

        if (this._settings) {
            options = internals.concatSettings(options, this._settings);
        }

        let errors = [];
        const finish = () => {

            let finalValue;

            if (value !== undefined) {
                finalValue = this._flags.raw ? originalValue : value;
            }
            else if (options.noDefaults) {
                finalValue = value;
            }
            else if (Ref.isRef(this._flags.default)) {
                finalValue = this._flags.default(state.parent, options);
            }
            else if (typeof this._flags.default === 'function' &&
                !(this._flags.func && !this._flags.default.description)) {

                let args;

                if (state.parent !== null &&
                    this._flags.default.length > 0) {

                    args = [Hoek.clone(state.parent), options];
                }

                const defaultValue = internals._try(this._flags.default, args);
                finalValue = defaultValue.value;
                if (defaultValue.error) {
                    errors.push(this.createError('any.default', { error: defaultValue.error }, state, options));
                }
            }
            else {
                finalValue = Hoek.clone(this._flags.default);
            }

            if (errors.length && typeof this._flags.error === 'function') {
                const change = this._flags.error.call(this, errors);

                if (typeof change === 'string') {
                    errors = [this.createOverrideError('override', { reason: errors }, state, options, change)];
                }
                else {
                    errors = [].concat(change)
                        .map((err) => {

                            return err instanceof Error ?
                                err :
                                this.createOverrideError(err.type || 'override', err.context, state, options, err.message, err.template);
                        });
                }
            }

            return {
                value: this._flags.strip ? undefined : finalValue,
                finalValue,
                errors: errors.length ? errors : null
            };
        };

        if (this._coerce) {
            const coerced = this._coerce.call(this, value, state, options);
            if (coerced.errors) {
                value = coerced.value;
                errors = errors.concat(coerced.errors);
                return finish();                            // Coerced error always aborts early
            }

            value = coerced.value;
        }

        if (this._flags.empty && !this._flags.empty._validate(this._prepareEmptyValue(value), null, internals.defaults).errors) {
            value = undefined;
        }

        // Check presence requirements

        const presence = this._flags.presence || options.presence;
        if (presence === 'optional') {
            if (value === undefined) {
                const isDeepDefault = this._flags.hasOwnProperty('default') && this._flags.default === undefined;
                if (isDeepDefault && this._type === 'object') {
                    value = {};
                }
                else {
                    return finish();
                }
            }
        }
        else if (presence === 'required' &&
            value === undefined) {

            errors.push(this.createError('any.required', null, state, options));
            return finish();
        }
        else if (presence === 'forbidden') {
            if (value === undefined) {
                return finish();
            }

            errors.push(this.createError('any.unknown', null, state, options));
            return finish();
        }

        // Check allowed and denied values using the original value

        if (this._valids.has(value, state, options, this._flags.insensitive)) {
            return finish();
        }

        if (this._invalids.has(value, state, options, this._flags.insensitive)) {
            errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', null, state, options));
            if (options.abortEarly ||
                value === undefined) {          // No reason to keep validating missing value

                return finish();
            }
        }

        // Convert value and validate type

        if (this._base) {
            const base = this._base.call(this, value, state, options);
            if (base.errors) {
                value = base.value;
                errors = errors.concat(base.errors);
                return finish();                            // Base error always aborts early
            }

            if (base.value !== value) {
                value = base.value;

                // Check allowed and denied values using the converted value

                if (this._valids.has(value, state, options, this._flags.insensitive)) {
                    return finish();
                }

                if (this._invalids.has(value, state, options, this._flags.insensitive)) {
                    errors.push(this.createError(value === '' ? 'any.empty' : 'any.invalid', null, state, options));
                    if (options.abortEarly) {
                        return finish();
                    }
                }
            }
        }

        // Required values did not match

        if (this._flags.allowOnly) {
            errors.push(this.createError('any.allowOnly', { valids: this._valids.values({ stripUndefined: true }) }, state, options));
            if (options.abortEarly) {
                return finish();
            }
        }

        // Helper.validate tests

        for (let i = 0; i < this._tests.length; ++i) {
            const test = this._tests[i];
            const ret = test.func.call(this, value, state, options);
            if (ret instanceof Errors.Err) {
                errors.push(ret);
                if (options.abortEarly) {
                    return finish();
                }
            }
            else {
                value = ret;
            }
        }

        return finish();
    }

    _validateWithOptions(value, options, callback) {

        if (options) {
            this.checkOptions(options);
        }

        const settings = internals.concatSettings(internals.defaults, options);
        const result = this._validate(value, null, settings);
        const errors = Errors.process(result.errors, value);

        if (callback) {
            return callback(errors, result.value);
        }

        return {
            error: errors,
            value: result.value,
            then(resolve, reject) {

                if (errors) {
                    return Promise.reject(errors).catch(reject);
                }

                return Promise.resolve(result.value).then(resolve);
            },
            catch(reject) {

                if (errors) {
                    return Promise.reject(errors).catch(reject);
                }

                return Promise.resolve(result.value);
            }
        };
    }

    validate(value, options, callback) {

        if (typeof options === 'function') {
            return this._validateWithOptions(value, null, options);
        }

        return this._validateWithOptions(value, options, callback);
    }

    describe() {

        const description = {
            type: this._type
        };

        const flags = Object.keys(this._flags);
        if (flags.length) {
            if (['empty', 'default', 'lazy', 'label'].some((flag) => this._flags.hasOwnProperty(flag))) {
                description.flags = {};
                for (let i = 0; i < flags.length; ++i) {
                    const flag = flags[i];
                    if (flag === 'empty') {
                        description.flags[flag] = this._flags[flag].describe();
                    }
                    else if (flag === 'default') {
                        if (Ref.isRef(this._flags[flag])) {
                            description.flags[flag] = this._flags[flag].toString();
                        }
                        else if (typeof this._flags[flag] === 'function') {
                            description.flags[flag] = {
                                description: this._flags[flag].description,
                                function   : this._flags[flag]
                            };
                        }
                        else {
                            description.flags[flag] = this._flags[flag];
                        }
                    }
                    else if (flag === 'lazy' || flag === 'label') {
                        // We don't want it in the description
                    }
                    else {
                        description.flags[flag] = this._flags[flag];
                    }
                }
            }
            else {
                description.flags = this._flags;
            }
        }

        if (this._settings) {
            description.options = Hoek.clone(this._settings);
        }

        if (this._baseType) {
            description.base = this._baseType.describe();
        }

        if (this._description) {
            description.description = this._description;
        }

        if (this._notes.length) {
            description.notes = this._notes;
        }

        if (this._tags.length) {
            description.tags = this._tags;
        }

        if (this._meta.length) {
            description.meta = this._meta;
        }

        if (this._examples.length) {
            description.examples = this._examples;
        }

        if (this._unit) {
            description.unit = this._unit;
        }

        const valids = this._valids.values();
        if (valids.length) {
            description.valids = valids.map((v) => {

                return Ref.isRef(v) ? v.toString() : v;
            });
        }

        const invalids = this._invalids.values();
        if (invalids.length) {
            description.invalids = invalids.map((v) => {

                return Ref.isRef(v) ? v.toString() : v;
            });
        }

        description.rules = [];

        for (let i = 0; i < this._tests.length; ++i) {
            const validator = this._tests[i];
            const item = { name: validator.name };

            if (validator.arg !== void 0) {
                item.arg = Ref.isRef(validator.arg) ? validator.arg.toString() : validator.arg;
            }

            const options = validator.options;
            if (options) {
                if (options.hasRef) {
                    item.arg = {};
                    const keys = Object.keys(validator.arg);
                    for (let j = 0; j < keys.length; ++j) {
                        const key = keys[j];
                        const value = validator.arg[key];
                        item.arg[key] = Ref.isRef(value) ? value.toString() : value;
                    }
                }

                if (typeof options.description === 'string') {
                    item.description = options.description;
                }
                else if (typeof options.description === 'function') {
                    item.description = options.description(item.arg);
                }
            }

            description.rules.push(item);
        }

        if (!description.rules.length) {
            delete description.rules;
        }

        const label = this._getLabel();
        if (label) {
            description.label = label;
        }

        return description;
    }

    label(name) {

        Hoek.assert(name && typeof name === 'string', 'Label name must be a non-empty string');

        const obj = this.clone();
        obj._flags.label = name;
        return obj;
    }

    _getLabel(def) {

        return this._flags.label || def;
    }

};


internals.Any.prototype.isImmutable = true;     // Prevents Hoek from deep cloning schema objects

// Aliases

internals.Any.prototype.only = internals.Any.prototype.equal = internals.Any.prototype.valid;
internals.Any.prototype.disallow = internals.Any.prototype.not = internals.Any.prototype.invalid;
internals.Any.prototype.exist = internals.Any.prototype.required;


internals._try = function (fn, args) {

    let err;
    let result;

    try {
        result = fn.apply(null, args);
    }
    catch (e) {
        err = e;
    }

    return {
        value: result,
        error: err
    };
};

internals.concatSettings = function (target, source) {

    // Used to avoid cloning context

    if (!target &&
        !source) {

        return null;
    }

    const obj = Object.assign({}, target);

    if (source) {
        const sKeys = Object.keys(source);
        for (let i = 0; i < sKeys.length; ++i) {
            const key = sKeys[i];
            if (key !== 'language' ||
                !obj.hasOwnProperty(key)) {

                obj[key] = source[key];
            }
            else {
                obj[key] = Hoek.applyToDefaults(obj[key], source[key]);
            }
        }
    }

    return obj;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};


exports.create = function (key, options) {

    Hoek.assert(typeof key === 'string', 'Invalid reference key:', key);

    const settings = Hoek.clone(options);         // options can be reused and modified

    const ref = function (value, validationOptions) {

        return Hoek.reach(ref.isContext ? validationOptions.context : value, ref.key, settings);
    };

    ref.isContext = (key[0] === ((settings && settings.contextPrefix) || '$'));
    ref.key = (ref.isContext ? key.slice(1) : key);
    ref.path = ref.key.split((settings && settings.separator) || '.');
    ref.depth = ref.path.length;
    ref.root = ref.path[0];
    ref.isJoi = true;

    ref.toString = function () {

        return (ref.isContext ? 'context:' : 'ref:') + ref.key;
    };

    return ref;
};


exports.isRef = function (ref) {

    return typeof ref === 'function' && ref.isJoi;
};


exports.push = function (array, ref) {

    if (exports.isRef(ref) &&
        !ref.isContext) {

        array.push(ref.root);
    }
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Ref = __webpack_require__(19);

// Type modules are delay-loaded to prevent circular dependencies


// Declare internals

const internals = {};


exports.schema = function (Joi, config) {

    if (config !== undefined && config !== null && typeof config === 'object') {

        if (config.isJoi) {
            return config;
        }

        if (Array.isArray(config)) {
            return Joi.alternatives().try(config);
        }

        if (config instanceof RegExp) {
            return Joi.string().regex(config);
        }

        if (config instanceof Date) {
            return Joi.date().valid(config);
        }

        return Joi.object().keys(config);
    }

    if (typeof config === 'string') {
        return Joi.string().valid(config);
    }

    if (typeof config === 'number') {
        return Joi.number().valid(config);
    }

    if (typeof config === 'boolean') {
        return Joi.boolean().valid(config);
    }

    if (Ref.isRef(config)) {
        return Joi.valid(config);
    }

    Hoek.assert(config === null, 'Invalid schema content:', config);

    return Joi.valid(null);
};


exports.ref = function (id) {

    return Ref.isRef(id) ? id : Ref.create(id);
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Language = __webpack_require__(28);


// Declare internals

const internals = {
    annotations: Symbol('joi-annotations')
};

internals.stringify = function (value, wrapArrays) {

    const type = typeof value;

    if (value === null) {
        return 'null';
    }

    if (type === 'string') {
        return value;
    }

    if (value instanceof exports.Err || type === 'function' || type === 'symbol') {
        return value.toString();
    }

    if (type === 'object') {
        if (Array.isArray(value)) {
            let partial = '';

            for (let i = 0; i < value.length; ++i) {
                partial = partial + (partial.length ? ', ' : '') + internals.stringify(value[i], wrapArrays);
            }

            return wrapArrays ? '[' + partial + ']' : partial;
        }

        return value.toString();
    }

    return JSON.stringify(value);
};

exports.Err = class {

    constructor(type, context, state, options, flags, message, template) {

        this.isJoi = true;
        this.type = type;
        this.context = context || {};
        this.context.key = state.path[state.path.length - 1];
        this.context.label = state.key;
        this.path = state.path;
        this.options = options;
        this.flags = flags;
        this.message = message;
        this.template = template;

        const localized = this.options.language;

        if (this.flags.label) {
            this.context.label = this.flags.label;
        }
        else if (localized &&                   // language can be null for arrays exclusion check
            (this.context.label === '' ||
            this.context.label === null)) {
            this.context.label = localized.root || Language.errors.root;
        }
    }

    toString() {

        if (this.message) {
            return this.message;
        }

        let format;

        if (this.template) {
            format = this.template;
        }

        const localized = this.options.language;

        format = format || Hoek.reach(localized, this.type) || Hoek.reach(Language.errors, this.type);

        if (format === undefined) {
            return `Error code "${this.type}" is not defined, your custom type is missing the correct language definition`;
        }

        let wrapArrays = Hoek.reach(localized, 'messages.wrapArrays');
        if (typeof wrapArrays !== 'boolean') {
            wrapArrays = Language.errors.messages.wrapArrays;
        }

        if (format === null) {
            const childrenString = internals.stringify(this.context.reason, wrapArrays);
            if (wrapArrays) {
                return childrenString.slice(1, -1);
            }
            return childrenString;
        }

        const hasKey = /\{\{\!?label\}\}/.test(format);
        const skipKey = format.length > 2 && format[0] === '!' && format[1] === '!';

        if (skipKey) {
            format = format.slice(2);
        }

        if (!hasKey && !skipKey) {
            const localizedKey = Hoek.reach(localized, 'key');
            if (typeof localizedKey === 'string') {
                format = localizedKey + format;
            }
            else {
                format = Hoek.reach(Language.errors, 'key') + format;
            }
        }

        return format.replace(/\{\{(\!?)([^}]+)\}\}/g, ($0, isSecure, name) => {

            const value = Hoek.reach(this.context, name);
            const normalized = internals.stringify(value, wrapArrays);
            return (isSecure && this.options.escapeHtml ? Hoek.escapeHtml(normalized) : normalized);
        });
    }

};


exports.create = function (type, context, state, options, flags, message, template) {

    return new exports.Err(type, context, state, options, flags, message, template);
};


exports.process = function (errors, object) {

    if (!errors || !errors.length) {
        return null;
    }

    // Construct error

    let message = '';
    const details = [];

    const processErrors = function (localErrors, parent) {

        for (let i = 0; i < localErrors.length; ++i) {
            const item = localErrors[i];

            if (item instanceof Error) {
                return item;
            }

            if (item.flags.error && typeof item.flags.error !== 'function') {
                return item.flags.error;
            }

            let itemMessage;
            if (parent === undefined) {
                itemMessage = item.toString();
                message = message + (message ? '. ' : '') + itemMessage;
            }

            // Do not push intermediate errors, we're only interested in leafs

            if (item.context.reason && item.context.reason.length) {
                const override = processErrors(item.context.reason, item.path);
                if (override) {
                    return override;
                }
            }
            else {
                details.push({
                    message: itemMessage || item.toString(),
                    path: item.path,
                    type: item.type,
                    context: item.context
                });
            }
        }
    };

    const override = processErrors(errors);
    if (override) {
        return override;
    }

    const error = new Error(message);
    error.isJoi = true;
    error.name = 'ValidationError';
    error.details = details;
    error._object = object;
    error.annotate = internals.annotate;
    return error;
};


// Inspired by json-stringify-safe
internals.safeStringify = function (obj, spaces) {

    return JSON.stringify(obj, internals.serializer(), spaces);
};

internals.serializer = function () {

    const keys = [];
    const stack = [];

    const cycleReplacer = (key, value) => {

        if (stack[0] === value) {
            return '[Circular ~]';
        }

        return '[Circular ~.' + keys.slice(0, stack.indexOf(value)).join('.') + ']';
    };

    return function (key, value) {

        if (stack.length > 0) {
            const thisPos = stack.indexOf(this);
            if (~thisPos) {
                stack.length = thisPos + 1;
                keys.length = thisPos + 1;
                keys[thisPos] = key;
            }
            else {
                stack.push(this);
                keys.push(key);
            }

            if (~stack.indexOf(value)) {
                value = cycleReplacer.call(this, key, value);
            }
        }
        else {
            stack.push(value);
        }

        if (value) {
            const annotations = value[internals.annotations];
            if (annotations) {
                if (Array.isArray(value)) {
                    const annotated = [];

                    for (let i = 0; i < value.length; ++i) {
                        if (annotations.errors[i]) {
                            annotated.push(`_$idx$_${annotations.errors[i].sort().join(', ')}_$end$_`);
                        }
                        annotated.push(value[i]);
                    }

                    value = annotated;
                }
                else {
                    const errorKeys = Object.keys(annotations.errors);
                    for (let i = 0; i < errorKeys.length; ++i) {
                        const errorKey = errorKeys[i];
                        value[`${errorKey}_$key$_${annotations.errors[errorKey].sort().join(', ')}_$end$_`] = value[errorKey];
                        value[errorKey] = undefined;
                    }

                    const missingKeys = Object.keys(annotations.missing);
                    for (let i = 0; i < missingKeys.length; ++i) {
                        const missingKey = missingKeys[i];
                        value[`_$miss$_${missingKey}|${annotations.missing[missingKey]}_$end$_`] = '__missing__';
                    }
                }

                return value;
            }
        }

        if (value === Infinity || value === -Infinity || Number.isNaN(value) ||
            typeof value === 'function' || typeof value === 'symbol') {
            return '[' + value.toString() + ']';
        }

        return value;
    };
};


internals.annotate = function (stripColorCodes) {

    const redFgEscape = stripColorCodes ? '' : '\u001b[31m';
    const redBgEscape = stripColorCodes ? '' : '\u001b[41m';
    const endColor = stripColorCodes ? '' : '\u001b[0m';

    if (typeof this._object !== 'object') {
        return this.details[0].message;
    }

    const obj = Hoek.clone(this._object || {});

    for (let i = this.details.length - 1; i >= 0; --i) {        // Reverse order to process deepest child first
        const pos = i + 1;
        const error = this.details[i];
        const path = error.path;
        let ref = obj;
        for (let j = 0; ; ++j) {
            const seg = path[j];

            if (ref.isImmutable) {
                ref = ref.clone();                              // joi schemas are not cloned by hoek, we have to take this extra step
            }

            if (j + 1 < path.length &&
                ref[seg] &&
                typeof ref[seg] !== 'string') {

                ref = ref[seg];
            }
            else {
                const refAnnotations = ref[internals.annotations] = ref[internals.annotations] || { errors: {}, missing: {} };
                const value = ref[seg];
                const cacheKey = seg || error.context.label;

                if (value !== undefined) {
                    refAnnotations.errors[cacheKey] = refAnnotations.errors[cacheKey] || [];
                    refAnnotations.errors[cacheKey].push(pos);
                }
                else {
                    refAnnotations.missing[cacheKey] = pos;
                }

                break;
            }
        }
    }

    const replacers = {
        key: /_\$key\$_([, \d]+)_\$end\$_\"/g,
        missing: /\"_\$miss\$_([^\|]+)\|(\d+)_\$end\$_\"\: \"__missing__\"/g,
        arrayIndex: /\s*\"_\$idx\$_([, \d]+)_\$end\$_\",?\n(.*)/g,
        specials: /"\[(NaN|Symbol.*|-?Infinity|function.*|\(.*)\]"/g
    };

    let message = internals.safeStringify(obj, 2)
        .replace(replacers.key, ($0, $1) => `" ${redFgEscape}[${$1}]${endColor}`)
        .replace(replacers.missing, ($0, $1, $2) => `${redBgEscape}"${$1}"${endColor}${redFgEscape} [${$2}]: -- missing --${endColor}`)
        .replace(replacers.arrayIndex, ($0, $1, $2) => `\n${$2} ${redFgEscape}[${$1}]${endColor}`)
        .replace(replacers.specials, ($0, $1) => $1);

    message = `${message}\n${redFgEscape}`;

    for (let i = 0; i < this.details.length; ++i) {
        const pos = i + 1;
        message = `${message}\n[${pos}] ${this.details[i].message}`;
    }

    message = message + endColor;

    return message;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Any = __webpack_require__(18);
const Cast = __webpack_require__(20);
const Errors = __webpack_require__(21);
const Lazy = __webpack_require__(30);
const Ref = __webpack_require__(19);


// Declare internals

const internals = {
    alternatives: __webpack_require__(24),
    array: __webpack_require__(31),
    boolean: __webpack_require__(32),
    binary: __webpack_require__(33),
    date: __webpack_require__(25),
    func: __webpack_require__(34),
    number: __webpack_require__(36),
    object: __webpack_require__(26),
    string: __webpack_require__(37)
};

internals.applyDefaults = function (schema) {

    Hoek.assert(this, 'Must be invoked on a Joi instance.');

    if (this._defaults) {
        schema = this._defaults(schema);
    }

    schema._currentJoi = this;

    return schema;
};

internals.root = function () {

    const any = new Any();

    const root = any.clone();
    Any.prototype._currentJoi = root;
    root._currentJoi = root;

    root.any = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.any() does not allow arguments.');

        return internals.applyDefaults.call(this, any);
    };

    root.alternatives = root.alt = function (...args) {

        const alternatives = internals.applyDefaults.call(this, internals.alternatives);
        return args.length ? alternatives.try.apply(alternatives, args) : alternatives;
    };

    root.array = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.array() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.array);
    };

    root.boolean = root.bool = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.boolean() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.boolean);
    };

    root.binary = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.binary() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.binary);
    };

    root.date = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.date() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.date);
    };

    root.func = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.func() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.func);
    };

    root.number = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.number() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.number);
    };

    root.object = function (...args) {

        const object = internals.applyDefaults.call(this, internals.object);
        return args.length ? object.keys(...args) : object;
    };

    root.string = function (...args) {

        Hoek.assert(args.length === 0, 'Joi.string() does not allow arguments.');

        return internals.applyDefaults.call(this, internals.string);
    };

    root.ref = function (...args) {

        return Ref.create(...args);
    };

    root.isRef = function (ref) {

        return Ref.isRef(ref);
    };

    root.validate = function (value, ...args /*, [schema], [options], callback */) {

        const last = args[args.length - 1];
        const callback = typeof last === 'function' ? last : null;

        const count = args.length - (callback ? 1 : 0);
        if (count === 0) {
            return any.validate(value, callback);
        }

        const options = count === 2 ? args[1] : {};
        const schema = root.compile(args[0]);

        return schema._validateWithOptions(value, options, callback);
    };

    root.describe = function (...args) {

        const schema = args.length ? root.compile(args[0]) : any;
        return schema.describe();
    };

    root.compile = function (schema) {

        try {
            return Cast.schema(this, schema);
        }
        catch (err) {
            if (err.hasOwnProperty('path')) {
                err.message = err.message + '(' + err.path + ')';
            }
            throw err;
        }
    };

    root.assert = function (value, schema, message) {

        root.attempt(value, schema, message);
    };

    root.attempt = function (value, schema, message) {

        const result = root.validate(value, schema);
        const error = result.error;
        if (error) {
            if (!message) {
                if (typeof error.annotate === 'function') {
                    error.message = error.annotate();
                }
                throw error;
            }

            if (!(message instanceof Error)) {
                if (typeof error.annotate === 'function') {
                    error.message = `${message} ${error.annotate()}`;
                }
                throw error;
            }

            throw message;
        }

        return result.value;
    };

    root.reach = function (schema, path) {

        Hoek.assert(schema && schema instanceof Any, 'you must provide a joi schema');
        Hoek.assert(typeof path === 'string', 'path must be a string');

        if (path === '') {
            return schema;
        }

        const parts = path.split('.');
        const children = schema._inner.children;
        if (!children) {
            return;
        }

        const key = parts[0];
        for (let i = 0; i < children.length; ++i) {
            const child = children[i];
            if (child.key === key) {
                return this.reach(child.schema, path.substr(key.length + 1));
            }
        }
    };

    root.lazy = function (fn) {

        return Lazy.set(fn);
    };

    root.defaults = function (fn) {

        Hoek.assert(typeof fn === 'function', 'Defaults must be a function');

        let joi = Object.create(this.any());
        joi = fn(joi);

        Hoek.assert(joi && joi instanceof this.constructor, 'defaults() must return a schema');

        Object.assign(joi, this, joi.clone()); // Re-add the types from `this` but also keep the settings from joi's potential new defaults

        joi._defaults = (schema) => {

            if (this._defaults) {
                schema = this._defaults(schema);
                Hoek.assert(schema instanceof this.constructor, 'defaults() must return a schema');
            }

            schema = fn(schema);
            Hoek.assert(schema instanceof this.constructor, 'defaults() must return a schema');
            return schema;
        };

        return joi;
    };

    root.extend = function (...args) {

        const extensions = Hoek.flatten(args);
        Hoek.assert(extensions.length > 0, 'You need to provide at least one extension');

        this.assert(extensions, root.extensionsSchema);

        const joi = Object.create(this.any());
        Object.assign(joi, this);

        for (let i = 0; i < extensions.length; ++i) {
            let extension = extensions[i];

            if (typeof extension === 'function') {
                extension = extension(joi);
            }

            this.assert(extension, root.extensionSchema);

            const base = (extension.base || this.any()).clone(); // Cloning because we're going to override language afterwards
            const ctor = base.constructor;
            const type = class extends ctor { // eslint-disable-line no-loop-func

                constructor() {

                    super();
                    if (extension.base) {
                        Object.assign(this, base);
                    }

                    this._type = extension.name;

                    if (extension.language) {
                        this._settings = this._settings || { language: {} };
                        this._settings.language = Hoek.applyToDefaults(this._settings.language, {
                            [extension.name]: extension.language
                        });
                    }
                }

            };

            if (extension.coerce) {
                type.prototype._coerce = function (value, state, options) {

                    if (ctor.prototype._coerce) {
                        const baseRet = ctor.prototype._coerce.call(this, value, state, options);

                        if (baseRet.errors) {
                            return baseRet;
                        }

                        value = baseRet.value;
                    }

                    const ret = extension.coerce.call(this, value, state, options);
                    if (ret instanceof Errors.Err) {
                        return { value, errors: ret };
                    }

                    return { value: ret };
                };
            }
            if (extension.pre) {
                type.prototype._base = function (value, state, options) {

                    if (ctor.prototype._base) {
                        const baseRet = ctor.prototype._base.call(this, value, state, options);

                        if (baseRet.errors) {
                            return baseRet;
                        }

                        value = baseRet.value;
                    }

                    const ret = extension.pre.call(this, value, state, options);
                    if (ret instanceof Errors.Err) {
                        return { value, errors: ret };
                    }

                    return { value: ret };
                };
            }

            if (extension.rules) {
                for (let j = 0; j < extension.rules.length; ++j) {
                    const rule = extension.rules[j];
                    const ruleArgs = rule.params ?
                        (rule.params instanceof Any ? rule.params._inner.children.map((k) => k.key) : Object.keys(rule.params)) :
                        [];
                    const validateArgs = rule.params ? Cast.schema(this, rule.params) : null;

                    type.prototype[rule.name] = function (...rArgs) { // eslint-disable-line no-loop-func

                        if (rArgs.length > ruleArgs.length) {
                            throw new Error('Unexpected number of arguments');
                        }

                        let hasRef = false;
                        let arg = {};

                        for (let k = 0; k < ruleArgs.length; ++k) {
                            arg[ruleArgs[k]] = rArgs[k];
                            if (!hasRef && Ref.isRef(rArgs[k])) {
                                hasRef = true;
                            }
                        }

                        if (validateArgs) {
                            arg = joi.attempt(arg, validateArgs);
                        }

                        let schema;
                        if (rule.validate) {
                            const validate = function (value, state, options) {

                                return rule.validate.call(this, arg, value, state, options);
                            };

                            schema = this._test(rule.name, arg, validate, {
                                description: rule.description,
                                hasRef
                            });
                        }
                        else {
                            schema = this.clone();
                        }

                        if (rule.setup) {
                            const newSchema = rule.setup.call(schema, arg);
                            if (newSchema !== undefined) {
                                Hoek.assert(newSchema instanceof Any, `Setup of extension Joi.${this._type}().${rule.name}() must return undefined or a Joi object`);
                                schema = newSchema;
                            }
                        }

                        return schema;
                    };
                }
            }

            if (extension.describe) {
                type.prototype.describe = function () {

                    const description = ctor.prototype.describe.call(this);
                    return extension.describe.call(this, description);
                };
            }

            const instance = new type();
            joi[extension.name] = function () {

                return internals.applyDefaults.call(this, instance);
            };
        }

        return joi;
    };

    root.extensionSchema = internals.object.keys({
        base: internals.object.type(Any, 'Joi object'),
        name: internals.string.required(),
        coerce: internals.func.arity(3),
        pre: internals.func.arity(3),
        language: internals.object,
        describe: internals.func.arity(1),
        rules: internals.array.items(internals.object.keys({
            name: internals.string.required(),
            setup: internals.func.arity(1),
            validate: internals.func.arity(4),
            params: [
                internals.object.pattern(/.*/, internals.object.type(Any, 'Joi object')),
                internals.object.type(internals.object.constructor, 'Joi object')
            ],
            description: [internals.string, internals.func.arity(1)]
        }).or('setup', 'validate'))
    }).strict();

    root.extensionsSchema = internals.array.items([internals.object, internals.func.arity(1)]).strict();

    root.version = __webpack_require__(43).version;

    return root;
};


module.exports = internals.root();


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Ref = __webpack_require__(19);

module.exports = class Set {

    constructor() {

        this._set = [];
    }

    add(value, refs) {

        if (!Ref.isRef(value) && this.has(value, null, null, false)) {

            return;
        }

        if (refs !== undefined) { // If it's a merge, we don't have any refs
            Ref.push(refs, value);
        }

        this._set.push(value);
        return this;
    }

    merge(add, remove) {

        for (let i = 0; i < add._set.length; ++i) {
            this.add(add._set[i]);
        }

        for (let i = 0; i < remove._set.length; ++i) {
            this.remove(remove._set[i]);
        }

        return this;
    }

    remove(value) {

        this._set = this._set.filter((item) => value !== item);
        return this;
    }

    has(value, state, options, insensitive) {

        for (let i = 0; i < this._set.length; ++i) {
            let items = this._set[i];

            if (state && Ref.isRef(items)) { // Only resolve references if there is a state, otherwise it's a merge
                items = items(state.reference || state.parent, options);
            }

            if (!Array.isArray(items)) {
                items = [items];
            }

            for (let j = 0; j < items.length; ++j) {
                const item = items[j];
                if (typeof value !== typeof item) {
                    continue;
                }

                if (value === item ||
                    (value instanceof Date && item instanceof Date && value.getTime() === item.getTime()) ||
                    (insensitive && typeof value === 'string' && value.toLowerCase() === item.toLowerCase()) ||
                    (Buffer.isBuffer(value) && Buffer.isBuffer(item) && value.length === item.length && value.toString('binary') === item.toString('binary'))) {

                    return true;
                }
            }
        }

        return false;
    }

    values(options) {

        if (options && options.stripUndefined) {
            const values = [];

            for (let i = 0; i < this._set.length; ++i) {
                const item = this._set[i];
                if (item !== undefined) {
                    values.push(item);
                }
            }

            return values;
        }

        return this._set.slice();
    }

    slice() {

        const newSet = new Set();
        newSet._set = this._set.slice();

        return newSet;
    }

    concat(source) {

        const newSet = new Set();
        newSet._set = this._set.concat(source._set);

        return newSet;
    }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Any = __webpack_require__(18);
const Cast = __webpack_require__(20);
const Ref = __webpack_require__(19);


// Declare internals

const internals = {};


internals.Alternatives = class extends Any {

    constructor() {

        super();
        this._type = 'alternatives';
        this._invalids.remove(null);
        this._inner.matches = [];
    }

    _base(value, state, options) {

        let errors = [];
        const il = this._inner.matches.length;
        const baseType = this._baseType;

        for (let i = 0; i < il; ++i) {
            const item = this._inner.matches[i];
            if (!item.schema) {
                const schema = item.peek || item.is;
                const input = item.is ? item.ref(state.reference || state.parent, options) : value;
                const failed = schema._validate(input, null, options, state.parent).errors;

                if (failed) {
                    if (item.otherwise) {
                        return item.otherwise._validate(value, state, options);
                    }
                }
                else if (item.then) {
                    return item.then._validate(value, state, options);
                }

                if (i === (il - 1) && baseType) {
                    return baseType._validate(value, state, options);
                }

                continue;
            }

            const result = item.schema._validate(value, state, options);
            if (!result.errors) {     // Found a valid match
                return result;
            }

            errors = errors.concat(result.errors);
        }

        if (errors.length) {
            return { errors: this.createError('alternatives.child', { reason: errors }, state, options) };
        }

        return { errors: this.createError('alternatives.base', null, state, options) };
    }

    try(...schemas) {

        schemas = Hoek.flatten(schemas);
        Hoek.assert(schemas.length, 'Cannot add other alternatives without at least one schema');

        const obj = this.clone();

        for (let i = 0; i < schemas.length; ++i) {
            const cast = Cast.schema(this._currentJoi, schemas[i]);
            if (cast._refs.length) {
                obj._refs = obj._refs.concat(cast._refs);
            }
            obj._inner.matches.push({ schema: cast });
        }

        return obj;
    }

    when(condition, options) {

        let schemaCondition = false;
        Hoek.assert(Ref.isRef(condition) || typeof condition === 'string' || (schemaCondition = condition instanceof Any), 'Invalid condition:', condition);
        Hoek.assert(options, 'Missing options');
        Hoek.assert(typeof options === 'object', 'Invalid options');
        if (schemaCondition) {
            Hoek.assert(!options.hasOwnProperty('is'), '"is" can not be used with a schema condition');
        }
        else {
            Hoek.assert(options.hasOwnProperty('is'), 'Missing "is" directive');
        }
        Hoek.assert(options.then !== undefined || options.otherwise !== undefined, 'options must have at least one of "then" or "otherwise"');

        const obj = this.clone();
        let is;
        if (!schemaCondition) {
            is = Cast.schema(this._currentJoi, options.is);

            if (options.is === null || !(Ref.isRef(options.is) || options.is instanceof Any)) {

                // Only apply required if this wasn't already a schema or a ref, we'll suppose people know what they're doing
                is = is.required();
            }
        }

        const item = {
            ref: schemaCondition ? null : Cast.ref(condition),
            peek: schemaCondition ? condition : null,
            is,
            then: options.then !== undefined ? Cast.schema(this._currentJoi, options.then) : undefined,
            otherwise: options.otherwise !== undefined ? Cast.schema(this._currentJoi, options.otherwise) : undefined
        };

        if (obj._baseType) {

            item.then = item.then && obj._baseType.concat(item.then);
            item.otherwise = item.otherwise && obj._baseType.concat(item.otherwise);
        }

        if (!schemaCondition) {
            Ref.push(obj._refs, item.ref);
            obj._refs = obj._refs.concat(item.is._refs);
        }

        if (item.then && item.then._refs) {
            obj._refs = obj._refs.concat(item.then._refs);
        }

        if (item.otherwise && item.otherwise._refs) {
            obj._refs = obj._refs.concat(item.otherwise._refs);
        }

        obj._inner.matches.push(item);

        return obj;
    }

    describe() {

        const description = Any.prototype.describe.call(this);
        const alternatives = [];
        for (let i = 0; i < this._inner.matches.length; ++i) {
            const item = this._inner.matches[i];
            if (item.schema) {

                // try()

                alternatives.push(item.schema.describe());
            }
            else {

                // when()

                const when = item.is ? {
                    ref: item.ref.toString(),
                    is: item.is.describe()
                } : {
                    peek: item.peek.describe()
                };

                if (item.then) {
                    when.then = item.then.describe();
                }

                if (item.otherwise) {
                    when.otherwise = item.otherwise.describe();
                }

                alternatives.push(when);
            }
        }

        description.alternatives = alternatives;
        return description;
    }

};


module.exports = new internals.Alternatives();


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Ref = __webpack_require__(19);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};

internals.isoDate = /^(?:[-+]\d{2})?(?:\d{4}(?!\d{2}\b))(?:(-?)(?:(?:0[1-9]|1[0-2])(?:\1(?:[12]\d|0[1-9]|3[01]))?|W(?:[0-4]\d|5[0-2])(?:-?[1-7])?|(?:00[1-9]|0[1-9]\d|[12]\d{2}|3(?:[0-5]\d|6[1-6])))(?![T]$|[T][\d]+Z$)(?:[T\s](?:(?:(?:[01]\d|2[0-3])(?:(:?)[0-5]\d)?|24\:?00)(?:[.,]\d+(?!:))?)(?:\2[0-5]\d(?:[.,]\d+)?)?(?:[Z]|(?:[+-])(?:[01]\d|2[0-3])(?::?[0-5]\d)?)?)?)?$/;
internals.invalidDate = new Date('');
internals.isIsoDate = (() => {

    const isoString = internals.isoDate.toString();

    return (date) => {

        return date && (date.toString() === isoString);
    };
})();

internals.Date = class extends Any {

    constructor() {

        super();
        this._type = 'date';
    }

    _base(value, state, options) {

        const result = {
            value: (options.convert && internals.Date.toDate(value, this._flags.format, this._flags.timestamp, this._flags.multiplier)) || value
        };

        if (result.value instanceof Date && !isNaN(result.value.getTime())) {
            result.errors = null;
        }
        else if (!options.convert) {
            result.errors = this.createError('date.strict', null, state, options);
        }
        else {
            let type;
            if (internals.isIsoDate(this._flags.format)) {
                type = 'isoDate';
            }
            else if (this._flags.timestamp) {
                type = `timestamp.${this._flags.timestamp}`;
            }
            else {
                type = 'base';
            }

            result.errors = this.createError(`date.${type}`, null, state, options);
        }

        return result;
    }

    static toDate(value, format, timestamp, multiplier) {

        if (value instanceof Date) {
            return value;
        }

        if (typeof value === 'string' ||
            (typeof value === 'number' && !isNaN(value) && isFinite(value))) {

            if (typeof value === 'string' &&
                /^[+-]?\d+(\.\d+)?$/.test(value)) {

                value = parseFloat(value);
            }

            let date;
            if (format && internals.isIsoDate(format)) {
                date = format.test(value) ? new Date(value) : internals.invalidDate;
            }
            else if (timestamp && multiplier) {
                date = /^\s*$/.test(value) ? internals.invalidDate : new Date(value * multiplier);
            }
            else {
                date = new Date(value);
            }

            if (!isNaN(date.getTime())) {
                return date;
            }
        }

        return null;
    }

    iso() {

        if (this._flags.format === internals.isoDate) {
            return this;
        }

        const obj = this.clone();
        obj._flags.format = internals.isoDate;
        return obj;
    }

    timestamp(type = 'javascript') {

        const allowed = ['javascript', 'unix'];
        Hoek.assert(allowed.includes(type), '"type" must be one of "' + allowed.join('", "') + '"');

        if (this._flags.timestamp === type) {
            return this;
        }

        const obj = this.clone();
        obj._flags.timestamp = type;
        obj._flags.multiplier = type === 'unix' ? 1000 : 1;
        return obj;
    }

    _isIsoDate(value) {

        return internals.isoDate.test(value);
    }

};

internals.compare = function (type, compare) {

    return function (date) {

        const isNow = date === 'now';
        const isRef = Ref.isRef(date);

        if (!isNow && !isRef) {
            date = internals.Date.toDate(date);
        }

        Hoek.assert(date, 'Invalid date format');

        return this._test(type, date, function (value, state, options) {

            let compareTo;
            if (isNow) {
                compareTo = Date.now();
            }
            else if (isRef) {
                compareTo = internals.Date.toDate(date(state.reference || state.parent, options));

                if (!compareTo) {
                    return this.createError('date.ref', { ref: date.key }, state, options);
                }

                compareTo = compareTo.getTime();
            }
            else {
                compareTo = date.getTime();
            }

            if (compare(value.getTime(), compareTo)) {
                return value;
            }

            return this.createError('date.' + type, { limit: new Date(compareTo) }, state, options);
        });
    };
};
internals.Date.prototype.min = internals.compare('min', (value, date) => value >= date);
internals.Date.prototype.max = internals.compare('max', (value, date) => value <= date);


module.exports = new internals.Date();


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const Topo = __webpack_require__(35);
const Any = __webpack_require__(18);
const Errors = __webpack_require__(21);
const Cast = __webpack_require__(20);


// Declare internals

const internals = {};


internals.Object = class extends Any {

    constructor() {

        super();
        this._type = 'object';
        this._inner.children = null;
        this._inner.renames = [];
        this._inner.dependencies = [];
        this._inner.patterns = [];
    }

    _base(value, state, options) {

        let target = value;
        const errors = [];
        const finish = () => {

            return {
                value: target,
                errors: errors.length ? errors : null
            };
        };

        if (typeof value === 'string' &&
            options.convert) {

            value = internals.safeParse(value);
        }

        const type = this._flags.func ? 'function' : 'object';
        if (!value ||
            typeof value !== type ||
            Array.isArray(value)) {

            errors.push(this.createError(type + '.base', null, state, options));
            return finish();
        }

        // Skip if there are no other rules to test

        if (!this._inner.renames.length &&
            !this._inner.dependencies.length &&
            !this._inner.children &&                    // null allows any keys
            !this._inner.patterns.length) {

            target = value;
            return finish();
        }

        // Ensure target is a local copy (parsed) or shallow copy

        if (target === value) {
            if (type === 'object') {
                target = Object.create(Object.getPrototypeOf(value));
            }
            else {
                target = function (...args) {

                    return value.apply(this, args);
                };

                target.prototype = Hoek.clone(value.prototype);
            }

            const valueKeys = Object.keys(value);
            for (let i = 0; i < valueKeys.length; ++i) {
                target[valueKeys[i]] = value[valueKeys[i]];
            }
        }
        else {
            target = value;
        }

        // Rename keys

        const renamed = {};
        for (let i = 0; i < this._inner.renames.length; ++i) {
            const rename = this._inner.renames[i];

            if (rename.isRegExp) {
                const targetKeys = Object.keys(target);
                const matchedTargetKeys = [];

                for (let j = 0; j < targetKeys.length; ++j) {
                    if (rename.from.test(targetKeys[j])) {
                        matchedTargetKeys.push(targetKeys[j]);
                    }
                }

                const allUndefined = matchedTargetKeys.every((key) => target[key] === undefined);
                if (rename.options.ignoreUndefined && allUndefined) {
                    continue;
                }

                if (!rename.options.multiple &&
                    renamed[rename.to]) {

                    errors.push(this.createError('object.rename.regex.multiple', { from: matchedTargetKeys, to: rename.to }, state, options));
                    if (options.abortEarly) {
                        return finish();
                    }
                }

                if (Object.prototype.hasOwnProperty.call(target, rename.to) &&
                    !rename.options.override &&
                    !renamed[rename.to]) {

                    errors.push(this.createError('object.rename.regex.override', { from: matchedTargetKeys, to: rename.to }, state, options));
                    if (options.abortEarly) {
                        return finish();
                    }
                }

                if (allUndefined) {
                    delete target[rename.to];
                }
                else {
                    target[rename.to] = target[matchedTargetKeys[matchedTargetKeys.length - 1]];
                }

                renamed[rename.to] = true;

                if (!rename.options.alias) {
                    for (let j = 0; j < matchedTargetKeys.length; ++j) {
                        delete target[matchedTargetKeys[j]];
                    }
                }
            }
            else {
                if (rename.options.ignoreUndefined && target[rename.from] === undefined) {
                    continue;
                }

                if (!rename.options.multiple &&
                    renamed[rename.to]) {

                    errors.push(this.createError('object.rename.multiple', { from: rename.from, to: rename.to }, state, options));
                    if (options.abortEarly) {
                        return finish();
                    }
                }

                if (Object.prototype.hasOwnProperty.call(target, rename.to) &&
                    !rename.options.override &&
                    !renamed[rename.to]) {

                    errors.push(this.createError('object.rename.override', { from: rename.from, to: rename.to }, state, options));
                    if (options.abortEarly) {
                        return finish();
                    }
                }

                if (target[rename.from] === undefined) {
                    delete target[rename.to];
                }
                else {
                    target[rename.to] = target[rename.from];
                }

                renamed[rename.to] = true;

                if (!rename.options.alias) {
                    delete target[rename.from];
                }
            }
        }

        // Validate schema

        if (!this._inner.children &&            // null allows any keys
            !this._inner.patterns.length &&
            !this._inner.dependencies.length) {

            return finish();
        }

        const unprocessed = Hoek.mapToObject(Object.keys(target));

        if (this._inner.children) {
            const stripProps = [];

            for (let i = 0; i < this._inner.children.length; ++i) {
                const child = this._inner.children[i];
                const key = child.key;
                const item = target[key];

                delete unprocessed[key];

                const localState = { key, path: state.path.concat(key), parent: target, reference: state.reference };
                const result = child.schema._validate(item, localState, options);
                if (result.errors) {
                    errors.push(this.createError('object.child', { key, child: child.schema._getLabel(key), reason: result.errors }, localState, options));

                    if (options.abortEarly) {
                        return finish();
                    }
                }
                else {
                    if (child.schema._flags.strip || (result.value === undefined && result.value !== item)) {
                        stripProps.push(key);
                        target[key] = result.finalValue;
                    }
                    else if (result.value !== undefined) {
                        target[key] = result.value;
                    }
                }
            }

            for (let i = 0; i < stripProps.length; ++i) {
                delete target[stripProps[i]];
            }
        }

        // Unknown keys

        let unprocessedKeys = Object.keys(unprocessed);
        if (unprocessedKeys.length &&
            this._inner.patterns.length) {

            for (let i = 0; i < unprocessedKeys.length; ++i) {
                const key = unprocessedKeys[i];
                const localState = { key, path: state.path.concat(key), parent: target, reference: state.reference };
                const item = target[key];

                for (let j = 0; j < this._inner.patterns.length; ++j) {
                    const pattern = this._inner.patterns[j];

                    if (pattern.regex.test(key)) {
                        delete unprocessed[key];

                        const result = pattern.rule._validate(item, localState, options);
                        if (result.errors) {
                            errors.push(this.createError('object.child', { key, child: pattern.rule._getLabel(key), reason: result.errors }, localState, options));

                            if (options.abortEarly) {
                                return finish();
                            }
                        }

                        target[key] = result.value;
                    }
                }
            }

            unprocessedKeys = Object.keys(unprocessed);
        }

        if ((this._inner.children || this._inner.patterns.length) && unprocessedKeys.length) {
            if ((options.stripUnknown && this._flags.allowUnknown !== true) ||
                options.skipFunctions) {

                const stripUnknown = options.stripUnknown
                    ? (options.stripUnknown === true ? true : !!options.stripUnknown.objects)
                    : false;


                for (let i = 0; i < unprocessedKeys.length; ++i) {
                    const key = unprocessedKeys[i];

                    if (stripUnknown) {
                        delete target[key];
                        delete unprocessed[key];
                    }
                    else if (typeof target[key] === 'function') {
                        delete unprocessed[key];
                    }
                }

                unprocessedKeys = Object.keys(unprocessed);
            }

            if (unprocessedKeys.length &&
                (this._flags.allowUnknown !== undefined ? !this._flags.allowUnknown : !options.allowUnknown)) {

                for (let i = 0; i < unprocessedKeys.length; ++i) {
                    const unprocessedKey = unprocessedKeys[i];
                    errors.push(this.createError('object.allowUnknown', { child: unprocessedKey }, { key: unprocessedKey, path: state.path.concat(unprocessedKey) }, options, {}));
                }
            }
        }

        // Validate dependencies

        for (let i = 0; i < this._inner.dependencies.length; ++i) {
            const dep = this._inner.dependencies[i];
            const err = internals[dep.type].call(this, dep.key !== null && target[dep.key], dep.peers, target, { key: dep.key, path: dep.key === null ? state.path : state.path.concat(dep.key) }, options);
            if (err instanceof Errors.Err) {
                errors.push(err);
                if (options.abortEarly) {
                    return finish();
                }
            }
        }

        return finish();
    }

    keys(schema) {

        Hoek.assert(schema === null || schema === undefined || typeof schema === 'object', 'Object schema must be a valid object');
        Hoek.assert(!schema || !(schema instanceof Any), 'Object schema cannot be a joi schema');

        const obj = this.clone();

        if (!schema) {
            obj._inner.children = null;
            return obj;
        }

        const children = Object.keys(schema);

        if (!children.length) {
            obj._inner.children = [];
            return obj;
        }

        const topo = new Topo();
        if (obj._inner.children) {
            for (let i = 0; i < obj._inner.children.length; ++i) {
                const child = obj._inner.children[i];

                // Only add the key if we are not going to replace it later
                if (!children.includes(child.key)) {
                    topo.add(child, { after: child._refs, group: child.key });
                }
            }
        }

        for (let i = 0; i < children.length; ++i) {
            const key = children[i];
            const child = schema[key];
            try {
                const cast = Cast.schema(this._currentJoi, child);
                topo.add({ key, schema: cast }, { after: cast._refs, group: key });
            }
            catch (castErr) {
                if (castErr.hasOwnProperty('path')) {
                    castErr.path = key + '.' + castErr.path;
                }
                else {
                    castErr.path = key;
                }
                throw castErr;
            }
        }

        obj._inner.children = topo.nodes;

        return obj;
    }

    unknown(allow) {

        const value = allow !== false;

        if (this._flags.allowUnknown === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.allowUnknown = value;
        return obj;
    }

    length(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('length', limit, function (value, state, options) {

            if (Object.keys(value).length === limit) {
                return value;
            }

            return this.createError('object.length', { limit }, state, options);
        });
    }

    min(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('min', limit, function (value, state, options) {

            if (Object.keys(value).length >= limit) {
                return value;
            }

            return this.createError('object.min', { limit }, state, options);
        });
    }

    max(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('max', limit, function (value, state, options) {

            if (Object.keys(value).length <= limit) {
                return value;
            }

            return this.createError('object.max', { limit }, state, options);
        });
    }

    pattern(pattern, schema) {

        Hoek.assert(pattern instanceof RegExp, 'Invalid regular expression');
        Hoek.assert(schema !== undefined, 'Invalid rule');

        pattern = new RegExp(pattern.source, pattern.ignoreCase ? 'i' : undefined);         // Future version should break this and forbid unsupported regex flags

        try {
            schema = Cast.schema(this._currentJoi, schema);
        }
        catch (castErr) {
            if (castErr.hasOwnProperty('path')) {
                castErr.message = castErr.message + '(' + castErr.path + ')';
            }

            throw castErr;
        }


        const obj = this.clone();
        obj._inner.patterns.push({ regex: pattern, rule: schema });
        return obj;
    }

    schema() {

        return this._test('schema', null, function (value, state, options) {

            if (value instanceof Any) {
                return value;
            }

            return this.createError('object.schema', null, state, options);
        });
    }

    with(key, peers) {

        Hoek.assert(arguments.length === 2, 'Invalid number of arguments, expected 2.');

        return this._dependency('with', key, peers);
    }

    without(key, peers) {

        Hoek.assert(arguments.length === 2, 'Invalid number of arguments, expected 2.');

        return this._dependency('without', key, peers);
    }

    xor(...peers) {

        peers = Hoek.flatten(peers);
        return this._dependency('xor', null, peers);
    }

    or(...peers) {

        peers = Hoek.flatten(peers);
        return this._dependency('or', null, peers);
    }

    and(...peers) {

        peers = Hoek.flatten(peers);
        return this._dependency('and', null, peers);
    }

    nand(...peers) {

        peers = Hoek.flatten(peers);
        return this._dependency('nand', null, peers);
    }

    requiredKeys(...children) {

        children = Hoek.flatten(children);
        return this.applyFunctionToChildren(children, 'required');
    }

    optionalKeys(...children) {

        children = Hoek.flatten(children);
        return this.applyFunctionToChildren(children, 'optional');
    }

    forbiddenKeys(...children) {

        children = Hoek.flatten(children);
        return this.applyFunctionToChildren(children, 'forbidden');
    }

    rename(from, to, options) {

        Hoek.assert(typeof from === 'string' || from instanceof RegExp, 'Rename missing the from argument');
        Hoek.assert(typeof to === 'string', 'Rename missing the to argument');
        Hoek.assert(to !== from, 'Cannot rename key to same name:', from);

        for (let i = 0; i < this._inner.renames.length; ++i) {
            Hoek.assert(this._inner.renames[i].from !== from, 'Cannot rename the same key multiple times');
        }

        const obj = this.clone();

        obj._inner.renames.push({
            from,
            to,
            options: Hoek.applyToDefaults(internals.renameDefaults, options || {}),
            isRegExp: from instanceof RegExp
        });

        return obj;
    }

    applyFunctionToChildren(children, fn, args, root) {

        children = [].concat(children);
        Hoek.assert(children.length > 0, 'expected at least one children');

        const groupedChildren = internals.groupChildren(children);
        let obj;

        if ('' in groupedChildren) {
            obj = this[fn].apply(this, args);
            delete groupedChildren[''];
        }
        else {
            obj = this.clone();
        }

        if (obj._inner.children) {
            root = root ? (root + '.') : '';

            for (let i = 0; i < obj._inner.children.length; ++i) {
                const child = obj._inner.children[i];
                const group = groupedChildren[child.key];

                if (group) {
                    obj._inner.children[i] = {
                        key: child.key,
                        _refs: child._refs,
                        schema: child.schema.applyFunctionToChildren(group, fn, args, root + child.key)
                    };

                    delete groupedChildren[child.key];
                }
            }
        }

        const remaining = Object.keys(groupedChildren);
        Hoek.assert(remaining.length === 0, 'unknown key(s)', remaining.join(', '));

        return obj;
    }

    _dependency(type, key, peers) {

        peers = [].concat(peers);
        for (let i = 0; i < peers.length; ++i) {
            Hoek.assert(typeof peers[i] === 'string', type, 'peers must be a string or array of strings');
        }

        const obj = this.clone();
        obj._inner.dependencies.push({ type, key, peers });
        return obj;
    }

    describe(shallow) {

        const description = Any.prototype.describe.call(this);

        if (description.rules) {
            for (let i = 0; i < description.rules.length; ++i) {
                const rule = description.rules[i];
                // Coverage off for future-proof descriptions, only object().assert() is use right now
                if (/* $lab:coverage:off$ */rule.arg &&
                    typeof rule.arg === 'object' &&
                    rule.arg.schema &&
                    rule.arg.ref /* $lab:coverage:on$ */) {
                    rule.arg = {
                        schema: rule.arg.schema.describe(),
                        ref: rule.arg.ref.toString()
                    };
                }
            }
        }

        if (this._inner.children &&
            !shallow) {

            description.children = {};
            for (let i = 0; i < this._inner.children.length; ++i) {
                const child = this._inner.children[i];
                description.children[child.key] = child.schema.describe();
            }
        }

        if (this._inner.dependencies.length) {
            description.dependencies = Hoek.clone(this._inner.dependencies);
        }

        if (this._inner.patterns.length) {
            description.patterns = [];

            for (let i = 0; i < this._inner.patterns.length; ++i) {
                const pattern = this._inner.patterns[i];
                description.patterns.push({ regex: pattern.regex.toString(), rule: pattern.rule.describe() });
            }
        }

        if (this._inner.renames.length > 0) {
            description.renames = Hoek.clone(this._inner.renames);
        }

        return description;
    }

    assert(ref, schema, message) {

        ref = Cast.ref(ref);
        Hoek.assert(ref.isContext || ref.depth > 1, 'Cannot use assertions for root level references - use direct key rules instead');
        message = message || 'pass the assertion test';

        try {
            schema = Cast.schema(this._currentJoi, schema);
        }
        catch (castErr) {
            if (castErr.hasOwnProperty('path')) {
                castErr.message = castErr.message + '(' + castErr.path + ')';
            }

            throw castErr;
        }

        const key = ref.path[ref.path.length - 1];
        const path = ref.path.join('.');

        return this._test('assert', { schema, ref }, function (value, state, options) {

            const result = schema._validate(ref(value), null, options, value);
            if (!result.errors) {
                return value;
            }

            const localState = Hoek.merge({}, state);
            localState.key = key;
            localState.path = ref.path;
            return this.createError('object.assert', { ref: path, message }, localState, options);
        });
    }

    type(constructor, name = constructor.name) {

        Hoek.assert(typeof constructor === 'function', 'type must be a constructor function');
        const typeData = {
            name,
            ctor: constructor
        };

        return this._test('type', typeData, function (value, state, options) {

            if (value instanceof constructor) {
                return value;
            }

            return this.createError('object.type', { type: typeData.name }, state, options);
        });
    }
};

internals.safeParse = function (value) {

    try {
        return JSON.parse(value);
    }
    catch (parseErr) {}

    return value;
};


internals.renameDefaults = {
    alias: false,                   // Keep old value in place
    multiple: false,                // Allow renaming multiple keys into the same target
    override: false                 // Overrides an existing key
};


internals.groupChildren = function (children) {

    children.sort();

    const grouped = {};

    for (let i = 0; i < children.length; ++i) {
        const child = children[i];
        Hoek.assert(typeof child === 'string', 'children must be strings');
        const group = child.split('.')[0];
        const childGroup = grouped[group] = (grouped[group] || []);
        childGroup.push(child.substring(group.length + 1));
    }

    return grouped;
};


internals.keysToLabels = function (schema, keys) {

    const children = schema._inner.children;

    if (!children) {
        return keys;
    }

    const findLabel = function (key) {

        const matchingChild = children.find((child) => child.key === key);
        return matchingChild ? matchingChild.schema._getLabel(key) : key;
    };

    if (Array.isArray(keys)) {
        return keys.map(findLabel);
    }

    return findLabel(keys);
};


internals.with = function (value, peers, parent, state, options) {

    if (value === undefined) {
        return value;
    }

    for (let i = 0; i < peers.length; ++i) {
        const peer = peers[i];
        if (!Object.prototype.hasOwnProperty.call(parent, peer) ||
            parent[peer] === undefined) {

            return this.createError('object.with', {
                main: state.key,
                mainWithLabel: internals.keysToLabels(this, state.key),
                peer,
                peerWithLabel: internals.keysToLabels(this, peer)
            }, state, options);
        }
    }

    return value;
};


internals.without = function (value, peers, parent, state, options) {

    if (value === undefined) {
        return value;
    }

    for (let i = 0; i < peers.length; ++i) {
        const peer = peers[i];
        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
            parent[peer] !== undefined) {

            return this.createError('object.without', {
                main: state.key,
                mainWithLabel: internals.keysToLabels(this, state.key),
                peer,
                peerWithLabel: internals.keysToLabels(this, peer)
            }, state, options);
        }
    }

    return value;
};


internals.xor = function (value, peers, parent, state, options) {

    const present = [];
    for (let i = 0; i < peers.length; ++i) {
        const peer = peers[i];
        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
            parent[peer] !== undefined) {

            present.push(peer);
        }
    }

    if (present.length === 1) {
        return value;
    }

    const context = { peers, peersWithLabels: internals.keysToLabels(this, peers) };

    if (present.length === 0) {
        return this.createError('object.missing', context, state, options);
    }

    return this.createError('object.xor', context, state, options);
};


internals.or = function (value, peers, parent, state, options) {

    for (let i = 0; i < peers.length; ++i) {
        const peer = peers[i];
        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
            parent[peer] !== undefined) {
            return value;
        }
    }

    return this.createError('object.missing', {
        peers,
        peersWithLabels: internals.keysToLabels(this, peers)
    }, state, options);
};


internals.and = function (value, peers, parent, state, options) {

    const missing = [];
    const present = [];
    const count = peers.length;
    for (let i = 0; i < count; ++i) {
        const peer = peers[i];
        if (!Object.prototype.hasOwnProperty.call(parent, peer) ||
            parent[peer] === undefined) {

            missing.push(peer);
        }
        else {
            present.push(peer);
        }
    }

    const aon = (missing.length === count || present.length === count);

    if (!aon) {

        return this.createError('object.and', {
            present,
            presentWithLabels: internals.keysToLabels(this, present),
            missing,
            missingWithLabels: internals.keysToLabels(this, missing)
        }, state, options);
    }
};


internals.nand = function (value, peers, parent, state, options) {

    const present = [];
    for (let i = 0; i < peers.length; ++i) {
        const peer = peers[i];
        if (Object.prototype.hasOwnProperty.call(parent, peer) &&
            parent[peer] !== undefined) {

            present.push(peer);
        }
    }

    const values = Hoek.clone(peers);
    const main = values.splice(0, 1)[0];
    const allPresent = (present.length === peers.length);
    return allPresent ? this.createError('object.nand', {
        main,
        mainWithLabel: internals.keysToLabels(this, main),
        peers: values,
        peersWithLabels: internals.keysToLabels(this, values)
    }, state, options) : null;
};


module.exports = new internals.Object();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules


// Delcare internals

const internals = {
    rfc3986: {}
};


internals.generate = function () {

    /**
     * elements separated by forward slash ("/") are alternatives.
     */
    const or = '|';

    /**
     * Rule to support zero-padded addresses.
     */
    const zeroPad = '0?';

    /**
     * DIGIT = %x30-39 ; 0-9
     */
    const digit = '0-9';
    const digitOnly = '[' + digit + ']';

    /**
     * ALPHA = %x41-5A / %x61-7A   ; A-Z / a-z
     */
    const alpha = 'a-zA-Z';
    const alphaOnly = '[' + alpha + ']';

    /**
     * IPv4
     * cidr       = DIGIT                ; 0-9
     *            / %x31-32 DIGIT         ; 10-29
     *            / "3" %x30-32           ; 30-32
     */
    internals.rfc3986.ipv4Cidr = digitOnly + or + '[1-2]' + digitOnly + or + '3' + '[0-2]';

    /**
     * IPv6
     * cidr       = DIGIT                 ; 0-9
     *            / %x31-39 DIGIT         ; 10-99
     *            / "1" %x0-1 DIGIT       ; 100-119
     *            / "12" %x0-8            ; 120-128
     */
    internals.rfc3986.ipv6Cidr = '(?:' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + '[01]' + digitOnly + or + '12[0-8])';

    /**
     * HEXDIG = DIGIT / "A" / "B" / "C" / "D" / "E" / "F"
     */
    const hexDigit = digit + 'A-Fa-f';
    const hexDigitOnly = '[' + hexDigit + ']';

    /**
     * unreserved = ALPHA / DIGIT / "-" / "." / "_" / "~"
     */
    const unreserved = alpha + digit + '-\\._~';

    /**
     * sub-delims = "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
     */
    const subDelims = '!\\$&\'\\(\\)\\*\\+,;=';

    /**
     * pct-encoded = "%" HEXDIG HEXDIG
     */
    const pctEncoded = '%' + hexDigit;

    /**
     * pchar = unreserved / pct-encoded / sub-delims / ":" / "@"
     */
    const pchar = unreserved + pctEncoded + subDelims + ':@';
    const pcharOnly = '[' + pchar + ']';

    /**
     * dec-octet   = DIGIT                 ; 0-9
     *            / %x31-39 DIGIT         ; 10-99
     *            / "1" 2DIGIT            ; 100-199
     *            / "2" %x30-34 DIGIT     ; 200-249
     *            / "25" %x30-35          ; 250-255
     */
    const decOctect = '(?:' + zeroPad + zeroPad + digitOnly + or + zeroPad + '[1-9]' + digitOnly + or + '1' + digitOnly + digitOnly + or + '2' + '[0-4]' + digitOnly + or + '25' + '[0-5])';

    /**
     * IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
     */
    internals.rfc3986.IPv4address = '(?:' + decOctect + '\\.){3}' + decOctect;

    /**
     * h16 = 1*4HEXDIG ; 16 bits of address represented in hexadecimal
     * ls32 = ( h16 ":" h16 ) / IPv4address ; least-significant 32 bits of address
     * IPv6address =                            6( h16 ":" ) ls32
     *             /                       "::" 5( h16 ":" ) ls32
     *             / [               h16 ] "::" 4( h16 ":" ) ls32
     *             / [ *1( h16 ":" ) h16 ] "::" 3( h16 ":" ) ls32
     *             / [ *2( h16 ":" ) h16 ] "::" 2( h16 ":" ) ls32
     *             / [ *3( h16 ":" ) h16 ] "::"    h16 ":"   ls32
     *             / [ *4( h16 ":" ) h16 ] "::"              ls32
     *             / [ *5( h16 ":" ) h16 ] "::"              h16
     *             / [ *6( h16 ":" ) h16 ] "::"
     */
    const h16 = hexDigitOnly + '{1,4}';
    const ls32 = '(?:' + h16 + ':' + h16 + '|' + internals.rfc3986.IPv4address + ')';
    const IPv6SixHex = '(?:' + h16 + ':){6}' + ls32;
    const IPv6FiveHex = '::(?:' + h16 + ':){5}' + ls32;
    const IPv6FourHex = '(?:' + h16 + ')?::(?:' + h16 + ':){4}' + ls32;
    const IPv6ThreeHex = '(?:(?:' + h16 + ':){0,1}' + h16 + ')?::(?:' + h16 + ':){3}' + ls32;
    const IPv6TwoHex = '(?:(?:' + h16 + ':){0,2}' + h16 + ')?::(?:' + h16 + ':){2}' + ls32;
    const IPv6OneHex = '(?:(?:' + h16 + ':){0,3}' + h16 + ')?::' + h16 + ':' + ls32;
    const IPv6NoneHex = '(?:(?:' + h16 + ':){0,4}' + h16 + ')?::' + ls32;
    const IPv6NoneHex2 = '(?:(?:' + h16 + ':){0,5}' + h16 + ')?::' + h16;
    const IPv6NoneHex3 = '(?:(?:' + h16 + ':){0,6}' + h16 + ')?::';
    internals.rfc3986.IPv6address = '(?:' + IPv6SixHex + or + IPv6FiveHex + or + IPv6FourHex + or + IPv6ThreeHex + or + IPv6TwoHex + or + IPv6OneHex + or + IPv6NoneHex + or + IPv6NoneHex2 + or + IPv6NoneHex3 + ')';

    /**
     * IPvFuture = "v" 1*HEXDIG "." 1*( unreserved / sub-delims / ":" )
     */
    internals.rfc3986.IPvFuture = 'v' + hexDigitOnly + '+\\.[' + unreserved + subDelims + ':]+';

    /**
     * scheme = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
     */
    internals.rfc3986.scheme = alphaOnly + '[' + alpha + digit + '+-\\.]*';

    /**
     * userinfo = *( unreserved / pct-encoded / sub-delims / ":" )
     */
    const userinfo = '[' + unreserved + pctEncoded + subDelims + ':]*';

    /**
     * IP-literal = "[" ( IPv6address / IPvFuture  ) "]"
     */
    const IPLiteral = '\\[(?:' + internals.rfc3986.IPv6address + or + internals.rfc3986.IPvFuture + ')\\]';

    /**
     * reg-name = *( unreserved / pct-encoded / sub-delims )
     */
    const regName = '[' + unreserved + pctEncoded + subDelims + ']{0,255}';

    /**
     * host = IP-literal / IPv4address / reg-name
     */
    const host = '(?:' + IPLiteral + or + internals.rfc3986.IPv4address + or + regName + ')';

    /**
     * port = *DIGIT
     */
    const port = digitOnly + '*';

    /**
     * authority   = [ userinfo "@" ] host [ ":" port ]
     */
    const authority = '(?:' + userinfo + '@)?' + host + '(?::' + port + ')?';

    /**
     * segment       = *pchar
     * segment-nz    = 1*pchar
     * path          = path-abempty    ; begins with "/" or is empty
     *               / path-absolute   ; begins with "/" but not "//"
     *               / path-noscheme   ; begins with a non-colon segment
     *               / path-rootless   ; begins with a segment
     *               / path-empty      ; zero characters
     * path-abempty  = *( "/" segment )
     * path-absolute = "/" [ segment-nz *( "/" segment ) ]
     * path-rootless = segment-nz *( "/" segment )
     */
    const segment = pcharOnly + '*';
    const segmentNz = pcharOnly + '+';
    const segmentNzNc = '[' + unreserved + pctEncoded + subDelims + '@' + ']+';
    const pathEmpty = '';
    const pathAbEmpty = '(?:\\/' + segment + ')*';
    const pathAbsolute = '\\/(?:' + segmentNz + pathAbEmpty + ')?';
    const pathRootless = segmentNz + pathAbEmpty;
    const pathNoScheme = segmentNzNc + pathAbEmpty;

    /**
     * hier-part = "//" authority path
     */
    internals.rfc3986.hierPart = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty + ')' + or + pathAbsolute + or + pathRootless + ')';

    /**
     * relative-part = "//" authority path-abempty
     *                 / path-absolute
     *                 / path-noscheme
     *                 / path-empty
     */
    internals.rfc3986.relativeRef = '(?:' + '(?:\\/\\/' + authority + pathAbEmpty  + ')' + or + pathAbsolute + or + pathNoScheme + or + pathEmpty + ')';

    /**
     * query = *( pchar / "/" / "?" )
     */
    internals.rfc3986.query = '[' + pchar + '\\/\\?]*(?=#|$)'; //Finish matching either at the fragment part or end of the line.

    /**
     * fragment = *( pchar / "/" / "?" )
     */
    internals.rfc3986.fragment = '[' + pchar + '\\/\\?]*';
};


internals.generate();

module.exports = internals.rfc3986;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules


// Declare internals

const internals = {};


exports.errors = {
    root: 'value',
    key: '"{{!label}}" ',
    messages: {
        wrapArrays: true
    },
    any: {
        unknown: 'is not allowed',
        invalid: 'contains an invalid value',
        empty: 'is not allowed to be empty',
        required: 'is required',
        allowOnly: 'must be one of {{valids}}',
        default: 'threw an error when running default method'
    },
    alternatives: {
        base: 'not matching any of the allowed alternatives',
        child: null
    },
    array: {
        base: 'must be an array',
        includes: 'at position {{pos}} does not match any of the allowed types',
        includesSingle: 'single value of "{{!label}}" does not match any of the allowed types',
        includesOne: 'at position {{pos}} fails because {{reason}}',
        includesOneSingle: 'single value of "{{!label}}" fails because {{reason}}',
        includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
        includesRequiredKnowns: 'does not contain {{knownMisses}}',
        includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
        excludes: 'at position {{pos}} contains an excluded value',
        excludesSingle: 'single value of "{{!label}}" contains an excluded value',
        min: 'must contain at least {{limit}} items',
        max: 'must contain less than or equal to {{limit}} items',
        length: 'must contain {{limit}} items',
        ordered: 'at position {{pos}} fails because {{reason}}',
        orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
        ref: 'references "{{ref}}" which is not a positive integer',
        sparse: 'must not be a sparse array',
        unique: 'position {{pos}} contains a duplicate value'
    },
    boolean: {
        base: 'must be a boolean'
    },
    binary: {
        base: 'must be a buffer or a string',
        min: 'must be at least {{limit}} bytes',
        max: 'must be less than or equal to {{limit}} bytes',
        length: 'must be {{limit}} bytes'
    },
    date: {
        base: 'must be a number of milliseconds or valid date string',
        format: 'must be a string with one of the following formats {{format}}',
        strict: 'must be a valid date',
        min: 'must be larger than or equal to "{{limit}}"',
        max: 'must be less than or equal to "{{limit}}"',
        isoDate: 'must be a valid ISO 8601 date',
        timestamp: {
            javascript: 'must be a valid timestamp or number of milliseconds',
            unix: 'must be a valid timestamp or number of seconds'
        },
        ref: 'references "{{ref}}" which is not a date'
    },
    function: {
        base: 'must be a Function',
        arity: 'must have an arity of {{n}}',
        minArity: 'must have an arity greater or equal to {{n}}',
        maxArity: 'must have an arity lesser or equal to {{n}}',
        ref: 'must be a Joi reference',
        class: 'must be a class'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'must be an object',
        child: '!!child "{{!child}}" fails because {{reason}}',
        min: 'must have at least {{limit}} children',
        max: 'must have less than or equal to {{limit}} children',
        length: 'must have {{limit}} children',
        allowUnknown: '!!"{{!child}}" is not allowed',
        with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
        without: '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
        missing: 'must contain at least one of {{peersWithLabels}}',
        xor: 'contains a conflict between exclusive peers {{peersWithLabels}}',
        or: 'must contain at least one of {{peersWithLabels}}',
        and: 'contains {{presentWithLabels}} without its required peers {{missingWithLabels}}',
        nand: '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
        assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
        rename: {
            multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
            override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists',
            regex: {
                multiple: 'cannot rename children {{from}} because multiple renames are disabled and another key was already renamed to "{{to}}"',
                override: 'cannot rename children {{from}} because override is disabled and target "{{to}}" exists'
            }
        },
        type: 'must be an instance of "{{type}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'must be a number',
        min: 'must be larger than or equal to {{limit}}',
        max: 'must be less than or equal to {{limit}}',
        less: 'must be less than {{limit}}',
        greater: 'must be greater than {{limit}}',
        float: 'must be a float or double',
        integer: 'must be an integer',
        negative: 'must be a negative number',
        positive: 'must be a positive number',
        precision: 'must have no more than {{limit}} decimal places',
        ref: 'references "{{ref}}" which is not a number',
        multiple: 'must be a multiple of {{multiple}}'
    },
    string: {
        base: 'must be a string',
        min: 'length must be at least {{limit}} characters long',
        max: 'length must be less than or equal to {{limit}} characters long',
        length: 'length must be {{limit}} characters long',
        alphanum: 'must only contain alpha-numeric characters',
        token: 'must only contain alpha-numeric and underscore characters',
        regex: {
            base: 'with value "{{!value}}" fails to match the required pattern: {{pattern}}',
            name: 'with value "{{!value}}" fails to match the {{name}} pattern',
            invert: {
                base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
                name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
            }
        },
        email: 'must be a valid email',
        uri: 'must be a valid uri',
        uriRelativeOnly: 'must be a valid relative uri',
        uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
        isoDate: 'must be a valid ISO 8601 date',
        guid: 'must be a valid GUID',
        hex: 'must only contain hexadecimal characters',
        base64: 'must be a valid base64 string',
        hostname: 'must be a valid hostname',
        normalize: 'must be unicode normalized in the {{form}} form',
        lowercase: 'must only contain lowercase characters',
        uppercase: 'must only contain uppercase characters',
        trim: 'must not have leading or trailing whitespace',
        creditCard: 'must be a credit card',
        ref: 'references "{{ref}}" which is not a number',
        ip: 'must be a valid ip address with a {{cidr}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
    }
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Joi = __webpack_require__(22);


// Declare internals

const internals = {};

exports.options = Joi.object({
    abortEarly: Joi.boolean(),
    convert: Joi.boolean(),
    allowUnknown: Joi.boolean(),
    skipFunctions: Joi.boolean(),
    stripUnknown: [Joi.boolean(), Joi.object({ arrays: Joi.boolean(), objects: Joi.boolean() }).or('arrays', 'objects')],
    language: Joi.object(),
    presence: Joi.string().only('required', 'optional', 'forbidden', 'ignore'),
    raw: Joi.boolean(),
    context: Joi.object(),
    strip: Joi.boolean(),
    noDefaults: Joi.boolean(),
    escapeHtml: Joi.boolean()
}).strict();


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};


internals.Lazy = class extends Any {

    constructor() {

        super();
        this._type = 'lazy';
    }

    _base(value, state, options) {

        const result = { value };
        const lazy = this._flags.lazy;

        if (!lazy) {
            result.errors = this.createError('lazy.base', null, state, options);
            return result;
        }

        const schema = lazy();

        if (!(schema instanceof Any)) {
            result.errors = this.createError('lazy.schema', null, state, options);
            return result;
        }

        return schema._validate(value, state, options);
    }

    set(fn) {

        Hoek.assert(typeof fn === 'function', 'You must provide a function as first argument');

        const obj = this.clone();
        obj._flags.lazy = fn;
        return obj;
    }

};

module.exports = new internals.Lazy();


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Cast = __webpack_require__(20);
const Ref = __webpack_require__(19);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};


internals.fastSplice = function (arr, i) {

    let pos = i;
    while (pos < arr.length) {
        arr[pos++] = arr[pos];
    }

    --arr.length;
};


internals.Array = class extends Any {

    constructor() {

        super();
        this._type = 'array';
        this._inner.items = [];
        this._inner.ordereds = [];
        this._inner.inclusions = [];
        this._inner.exclusions = [];
        this._inner.requireds = [];
        this._flags.sparse = false;
    }

    _base(value, state, options) {

        const result = {
            value
        };

        if (typeof value === 'string' &&
            options.convert) {

            internals.safeParse(value, result);
        }

        let isArray = Array.isArray(result.value);
        const wasArray = isArray;
        if (options.convert && this._flags.single && !isArray) {
            result.value = [result.value];
            isArray = true;
        }

        if (!isArray) {
            result.errors = this.createError('array.base', null, state, options);
            return result;
        }

        if (this._inner.inclusions.length ||
            this._inner.exclusions.length ||
            this._inner.requireds.length ||
            this._inner.ordereds.length ||
            !this._flags.sparse) {

            // Clone the array so that we don't modify the original
            if (wasArray) {
                result.value = result.value.slice(0);
            }

            result.errors = this._checkItems.call(this, result.value, wasArray, state, options);

            if (result.errors && wasArray && options.convert && this._flags.single) {

                // Attempt a 2nd pass by putting the array inside one.
                const previousErrors = result.errors;

                result.value = [result.value];
                result.errors = this._checkItems.call(this, result.value, wasArray, state, options);

                if (result.errors) {

                    // Restore previous errors and value since this didn't validate either.
                    result.errors = previousErrors;
                    result.value = result.value[0];
                }
            }
        }

        return result;
    }

    _checkItems(items, wasArray, state, options) {

        const errors = [];
        let errored;

        const requireds = this._inner.requireds.slice();
        const ordereds = this._inner.ordereds.slice();
        const inclusions = this._inner.inclusions.concat(requireds);

        let il = items.length;
        for (let i = 0; i < il; ++i) {
            errored = false;
            const item = items[i];
            let isValid = false;
            const key = wasArray ? i : state.key;
            const path = wasArray ? state.path.concat(i) : state.path;
            const localState = { key, path, parent: state.parent, reference: state.reference };
            let res;

            // Sparse

            if (!this._flags.sparse && item === undefined) {
                errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

                if (options.abortEarly) {
                    return errors;
                }

                ordereds.shift();

                continue;
            }

            // Exclusions

            for (let j = 0; j < this._inner.exclusions.length; ++j) {
                res = this._inner.exclusions[j]._validate(item, localState, {});                // Not passing options to use defaults

                if (!res.errors) {
                    errors.push(this.createError(wasArray ? 'array.excludes' : 'array.excludesSingle', { pos: i, value: item }, { key: state.key, path: localState.path }, options));
                    errored = true;

                    if (options.abortEarly) {
                        return errors;
                    }

                    ordereds.shift();

                    break;
                }
            }

            if (errored) {
                continue;
            }

            // Ordered
            if (this._inner.ordereds.length) {
                if (ordereds.length > 0) {
                    const ordered = ordereds.shift();
                    res = ordered._validate(item, localState, options);
                    if (!res.errors) {
                        if (ordered._flags.strip) {
                            internals.fastSplice(items, i);
                            --i;
                            --il;
                        }
                        else if (!this._flags.sparse && res.value === undefined) {
                            errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

                            if (options.abortEarly) {
                                return errors;
                            }

                            continue;
                        }
                        else {
                            items[i] = res.value;
                        }
                    }
                    else {
                        errors.push(this.createError('array.ordered', { pos: i, reason: res.errors, value: item }, { key: state.key, path: localState.path }, options));
                        if (options.abortEarly) {
                            return errors;
                        }
                    }
                    continue;
                }
                else if (!this._inner.items.length) {
                    errors.push(this.createError('array.orderedLength', { pos: i, limit: this._inner.ordereds.length }, { key: state.key, path: localState.path }, options));
                    if (options.abortEarly) {
                        return errors;
                    }
                    continue;
                }
            }

            // Requireds

            const requiredChecks = [];
            let jl = requireds.length;
            for (let j = 0; j < jl; ++j) {
                res = requiredChecks[j] = requireds[j]._validate(item, localState, options);
                if (!res.errors) {
                    items[i] = res.value;
                    isValid = true;
                    internals.fastSplice(requireds, j);
                    --j;
                    --jl;

                    if (!this._flags.sparse && res.value === undefined) {
                        errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));

                        if (options.abortEarly) {
                            return errors;
                        }
                    }

                    break;
                }
            }

            if (isValid) {
                continue;
            }

            // Inclusions

            const stripUnknown = options.stripUnknown
                ? (options.stripUnknown === true ? true : !!options.stripUnknown.arrays)
                : false;

            jl = inclusions.length;
            for (let j = 0; j < jl; ++j) {
                const inclusion = inclusions[j];

                // Avoid re-running requireds that already didn't match in the previous loop
                const previousCheck = requireds.indexOf(inclusion);
                if (previousCheck !== -1) {
                    res = requiredChecks[previousCheck];
                }
                else {
                    res = inclusion._validate(item, localState, options);

                    if (!res.errors) {
                        if (inclusion._flags.strip) {
                            internals.fastSplice(items, i);
                            --i;
                            --il;
                        }
                        else if (!this._flags.sparse && res.value === undefined) {
                            errors.push(this.createError('array.sparse', null, { key: state.key, path: localState.path, pos: i }, options));
                            errored = true;
                        }
                        else {
                            items[i] = res.value;
                        }
                        isValid = true;
                        break;
                    }
                }

                // Return the actual error if only one inclusion defined
                if (jl === 1) {
                    if (stripUnknown) {
                        internals.fastSplice(items, i);
                        --i;
                        --il;
                        isValid = true;
                        break;
                    }

                    errors.push(this.createError(wasArray ? 'array.includesOne' : 'array.includesOneSingle', { pos: i, reason: res.errors, value: item }, { key: state.key, path: localState.path }, options));
                    errored = true;

                    if (options.abortEarly) {
                        return errors;
                    }

                    break;
                }
            }

            if (errored) {
                continue;
            }

            if (this._inner.inclusions.length && !isValid) {
                if (stripUnknown) {
                    internals.fastSplice(items, i);
                    --i;
                    --il;
                    continue;
                }

                errors.push(this.createError(wasArray ? 'array.includes' : 'array.includesSingle', { pos: i, value: item }, { key: state.key, path: localState.path }, options));

                if (options.abortEarly) {
                    return errors;
                }
            }
        }

        if (requireds.length) {
            this._fillMissedErrors.call(this, errors, requireds, state, options);
        }

        if (ordereds.length) {
            this._fillOrderedErrors.call(this, errors, ordereds, state, options);
        }

        return errors.length ? errors : null;
    }

    describe() {

        const description = Any.prototype.describe.call(this);

        if (this._inner.ordereds.length) {
            description.orderedItems = [];

            for (let i = 0; i < this._inner.ordereds.length; ++i) {
                description.orderedItems.push(this._inner.ordereds[i].describe());
            }
        }

        if (this._inner.items.length) {
            description.items = [];

            for (let i = 0; i < this._inner.items.length; ++i) {
                description.items.push(this._inner.items[i].describe());
            }
        }

        return description;
    }

    items(...schemas) {

        const obj = this.clone();

        Hoek.flatten(schemas).forEach((type, index) => {

            try {
                type = Cast.schema(this._currentJoi, type);
            }
            catch (castErr) {
                if (castErr.hasOwnProperty('path')) {
                    castErr.path = index + '.' + castErr.path;
                }
                else {
                    castErr.path = index;
                }
                castErr.message = castErr.message + '(' + castErr.path + ')';
                throw castErr;
            }

            obj._inner.items.push(type);

            if (type._flags.presence === 'required') {
                obj._inner.requireds.push(type);
            }
            else if (type._flags.presence === 'forbidden') {
                obj._inner.exclusions.push(type.optional());
            }
            else {
                obj._inner.inclusions.push(type);
            }
        });

        return obj;
    }

    ordered(...schemas) {

        const obj = this.clone();

        Hoek.flatten(schemas).forEach((type, index) => {

            try {
                type = Cast.schema(this._currentJoi, type);
            }
            catch (castErr) {
                if (castErr.hasOwnProperty('path')) {
                    castErr.path = index + '.' + castErr.path;
                }
                else {
                    castErr.path = index;
                }
                castErr.message = castErr.message + '(' + castErr.path + ')';
                throw castErr;
            }
            obj._inner.ordereds.push(type);
        });

        return obj;
    }

    min(limit) {

        const isRef = Ref.isRef(limit);

        Hoek.assert((Number.isSafeInteger(limit) && limit >= 0) || isRef, 'limit must be a positive integer or reference');

        return this._test('min', limit, function (value, state, options) {

            let compareTo;
            if (isRef) {
                compareTo = limit(state.reference || state.parent, options);

                if (!(Number.isSafeInteger(compareTo) && compareTo >= 0)) {
                    return this.createError('array.ref', { ref: limit.key }, state, options);
                }
            }
            else {
                compareTo = limit;
            }

            if (value.length >= compareTo) {
                return value;
            }

            return this.createError('array.min', { limit, value }, state, options);
        });
    }

    max(limit) {

        const isRef = Ref.isRef(limit);

        Hoek.assert((Number.isSafeInteger(limit) && limit >= 0) || isRef, 'limit must be a positive integer or reference');

        return this._test('max', limit, function (value, state, options) {

            let compareTo;
            if (isRef) {
                compareTo = limit(state.reference || state.parent, options);

                if (!(Number.isSafeInteger(compareTo) && compareTo >= 0)) {
                    return this.createError('array.ref', { ref: limit.key }, state, options);
                }
            }
            else {
                compareTo = limit;
            }

            if (value.length <= compareTo) {
                return value;
            }

            return this.createError('array.max', { limit, value }, state, options);
        });
    }

    length(limit) {

        const isRef = Ref.isRef(limit);

        Hoek.assert((Number.isSafeInteger(limit) && limit >= 0) || isRef, 'limit must be a positive integer or reference');

        return this._test('length', limit, function (value, state, options) {

            let compareTo;
            if (isRef) {
                compareTo = limit(state.reference || state.parent, options);

                if (!(Number.isSafeInteger(compareTo) && compareTo >= 0)) {
                    return this.createError('array.ref', { ref: limit.key }, state, options);
                }
            }
            else {
                compareTo = limit;
            }

            if (value.length === compareTo) {
                return value;
            }

            return this.createError('array.length', { limit, value }, state, options);
        });
    }

    unique(comparator) {

        Hoek.assert(comparator === undefined ||
            typeof comparator === 'function' ||
            typeof comparator === 'string', 'comparator must be a function or a string');

        const settings = {};

        if (typeof comparator === 'string') {
            settings.path = comparator;
        }
        else if (typeof comparator === 'function') {
            settings.comparator = comparator;
        }

        return this._test('unique', settings, function (value, state, options) {

            const found = {
                string: {},
                number: {},
                undefined: {},
                boolean: {},
                object: new Map(),
                function: new Map(),
                custom: new Map()
            };

            const compare = settings.comparator || Hoek.deepEqual;

            for (let i = 0; i < value.length; ++i) {
                const item = settings.path ? Hoek.reach(value[i], settings.path) : value[i];
                const records = settings.comparator ? found.custom : found[typeof item];

                // All available types are supported, so it's not possible to reach 100% coverage without ignoring this line.
                // I still want to keep the test for future js versions with new types (eg. Symbol).
                if (/* $lab:coverage:off$ */ records /* $lab:coverage:on$ */) {
                    if (records instanceof Map) {
                        const entries = records.entries();
                        let current;
                        while (!(current = entries.next()).done) {
                            if (compare(current.value[0], item)) {
                                const localState = {
                                    key: state.key,
                                    path: state.path.concat(i),
                                    parent: state.parent,
                                    reference: state.reference
                                };

                                const context = {
                                    pos: i,
                                    value: value[i],
                                    dupePos: current.value[1],
                                    dupeValue: value[current.value[1]]
                                };

                                if (settings.path) {
                                    context.path = settings.path;
                                }

                                return this.createError('array.unique', context, localState, options);
                            }
                        }

                        records.set(item, i);
                    }
                    else {
                        if (records[item] !== undefined) {
                            const localState = {
                                key: state.key,
                                path: state.path.concat(i),
                                parent: state.parent,
                                reference: state.reference
                            };

                            const context = {
                                pos: i,
                                value: value[i],
                                dupePos: records[item],
                                dupeValue: value[records[item]]
                            };

                            if (settings.path) {
                                context.path = settings.path;
                            }

                            return this.createError('array.unique', context, localState, options);
                        }

                        records[item] = i;
                    }
                }
            }

            return value;
        });
    }

    sparse(enabled) {

        const value = enabled === undefined ? true : !!enabled;

        if (this._flags.sparse === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.sparse = value;
        return obj;
    }

    single(enabled) {

        const value = enabled === undefined ? true : !!enabled;

        if (this._flags.single === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.single = value;
        return obj;
    }

    _fillMissedErrors(errors, requireds, state, options) {

        const knownMisses = [];
        let unknownMisses = 0;
        for (let i = 0; i < requireds.length; ++i) {
            const label = requireds[i]._getLabel();
            if (label) {
                knownMisses.push(label);
            }
            else {
                ++unknownMisses;
            }
        }

        if (knownMisses.length) {
            if (unknownMisses) {
                errors.push(this.createError('array.includesRequiredBoth', { knownMisses, unknownMisses }, { key: state.key, path: state.path }, options));
            }
            else {
                errors.push(this.createError('array.includesRequiredKnowns', { knownMisses }, { key: state.key, path: state.path }, options));
            }
        }
        else {
            errors.push(this.createError('array.includesRequiredUnknowns', { unknownMisses }, { key: state.key, path: state.path }, options));
        }
    }


    _fillOrderedErrors(errors, ordereds, state, options) {

        const requiredOrdereds = [];

        for (let i = 0; i < ordereds.length; ++i) {
            const presence = Hoek.reach(ordereds[i], '_flags.presence');
            if (presence === 'required') {
                requiredOrdereds.push(ordereds[i]);
            }
        }

        if (requiredOrdereds.length) {
            this._fillMissedErrors.call(this, errors, requiredOrdereds, state, options);
        }
    }

};


internals.safeParse = function (value, result) {

    try {
        const converted = JSON.parse(value);
        if (Array.isArray(converted)) {
            result.value = converted;
        }
    }
    catch (e) { }
};


module.exports = new internals.Array();


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {
    Set: __webpack_require__(23)
};


internals.Boolean = class extends Any {
    constructor() {

        super();
        this._type = 'boolean';
        this._flags.insensitive = true;
        this._inner.truthySet = new internals.Set();
        this._inner.falsySet = new internals.Set();
    }

    _base(value, state, options) {

        const result = {
            value
        };

        if (typeof value === 'string' &&
            options.convert) {

            const normalized = this._flags.insensitive ? value.toLowerCase() : value;
            result.value = (normalized === 'true' ? true
                : (normalized === 'false' ? false : value));
        }

        if (typeof result.value !== 'boolean') {
            result.value = (this._inner.truthySet.has(value, null, null, this._flags.insensitive) ? true
                : (this._inner.falsySet.has(value, null, null, this._flags.insensitive) ? false : value));
        }

        result.errors = (typeof result.value === 'boolean') ? null : this.createError('boolean.base', null, state, options);
        return result;
    }

    truthy(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call truthy with undefined');
            obj._inner.truthySet.add(value);
        }
        return obj;
    }

    falsy(...values) {

        const obj = this.clone();
        values = Hoek.flatten(values);
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];

            Hoek.assert(value !== undefined, 'Cannot call falsy with undefined');
            obj._inner.falsySet.add(value);
        }
        return obj;
    }

    insensitive(enabled) {

        const insensitive = enabled === undefined ? true : !!enabled;

        if (this._flags.insensitive === insensitive) {
            return this;
        }

        const obj = this.clone();
        obj._flags.insensitive = insensitive;
        return obj;
    }

    describe() {

        const description = Any.prototype.describe.call(this);
        description.truthy = [true].concat(this._inner.truthySet.values());
        description.falsy = [false].concat(this._inner.falsySet.values());
        return description;
    }
};


module.exports = new internals.Boolean();


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};


internals.Binary = class extends Any {

    constructor() {

        super();
        this._type = 'binary';
    }

    _base(value, state, options) {

        const result = {
            value
        };

        if (typeof value === 'string' &&
            options.convert) {

            try {
                result.value = new Buffer(value, this._flags.encoding);
            }
            catch (e) {
            }
        }

        result.errors = Buffer.isBuffer(result.value) ? null : this.createError('binary.base', null, state, options);
        return result;
    }

    encoding(encoding) {

        Hoek.assert(Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);

        if (this._flags.encoding === encoding) {
            return this;
        }

        const obj = this.clone();
        obj._flags.encoding = encoding;
        return obj;
    }

    min(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('min', limit, function (value, state, options) {

            if (value.length >= limit) {
                return value;
            }

            return this.createError('binary.min', { limit, value }, state, options);
        });
    }

    max(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('max', limit, function (value, state, options) {

            if (value.length <= limit) {
                return value;
            }

            return this.createError('binary.max', { limit, value }, state, options);
        });
    }

    length(limit) {

        Hoek.assert(Number.isSafeInteger(limit) && limit >= 0, 'limit must be a positive integer');

        return this._test('length', limit, function (value, state, options) {

            if (value.length === limit) {
                return value;
            }

            return this.createError('binary.length', { limit, value }, state, options);
        });
    }

};


module.exports = new internals.Binary();


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);
const ObjectType = __webpack_require__(26);
const Ref = __webpack_require__(19);


// Declare internals

const internals = {};


internals.Func = class extends ObjectType.constructor {

    constructor() {

        super();
        this._flags.func = true;
    }

    arity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

        return this._test('arity', n, function (value, state, options) {

            if (value.length === n) {
                return value;
            }

            return this.createError('function.arity', { n }, state, options);
        });
    }

    minArity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n > 0, 'n must be a strict positive integer');

        return this._test('minArity', n, function (value, state, options) {

            if (value.length >= n) {
                return value;
            }

            return this.createError('function.minArity', { n }, state, options);
        });
    }

    maxArity(n) {

        Hoek.assert(Number.isSafeInteger(n) && n >= 0, 'n must be a positive integer');

        return this._test('maxArity', n, function (value, state, options) {

            if (value.length <= n) {
                return value;
            }

            return this.createError('function.maxArity', { n }, state, options);
        });
    }

    ref() {

        return this._test('ref', null, function (value, state, options) {

            if (Ref.isRef(value)) {
                return value;
            }

            return this.createError('function.ref', null, state, options);
        });
    }

    class() {

        return this._test('class', null, function (value, state, options) {

            if ((/^\s*class\s/).test(value.toString())) {
                return value;
            }

            return this.createError('function.class', null, state, options);
        });
    }
};

module.exports = new internals.Func();


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Hoek = __webpack_require__(17);


// Declare internals

const internals = {};


exports = module.exports = internals.Topo = function () {

    this._items = [];
    this.nodes = [];
};


internals.Topo.prototype.add = function (nodes, options) {

    options = options || {};

    // Validate rules

    const before = [].concat(options.before || []);
    const after = [].concat(options.after || []);
    const group = options.group || '?';
    const sort = options.sort || 0;                   // Used for merging only

    Hoek.assert(before.indexOf(group) === -1, 'Item cannot come before itself:', group);
    Hoek.assert(before.indexOf('?') === -1, 'Item cannot come before unassociated items');
    Hoek.assert(after.indexOf(group) === -1, 'Item cannot come after itself:', group);
    Hoek.assert(after.indexOf('?') === -1, 'Item cannot come after unassociated items');

    ([].concat(nodes)).forEach((node, i) => {

        const item = {
            seq: this._items.length,
            sort,
            before,
            after,
            group,
            node
        };

        this._items.push(item);
    });

    // Insert event

    const error = this._sort();
    Hoek.assert(!error, 'item', (group !== '?' ? 'added into group ' + group : ''), 'created a dependencies error');

    return this.nodes;
};


internals.Topo.prototype.merge = function (others) {

    others = [].concat(others);
    for (let i = 0; i < others.length; ++i) {
        const other = others[i];
        if (other) {
            for (let j = 0; j < other._items.length; ++j) {
                const item = Hoek.shallow(other._items[j]);
                this._items.push(item);
            }
        }
    }

    // Sort items

    this._items.sort(internals.mergeSort);
    for (let i = 0; i < this._items.length; ++i) {
        this._items[i].seq = i;
    }

    const error = this._sort();
    Hoek.assert(!error, 'merge created a dependencies error');

    return this.nodes;
};


internals.mergeSort = function (a, b) {

    return a.sort === b.sort ? 0 : (a.sort < b.sort ? -1 : 1);
};


internals.Topo.prototype._sort = function () {

    // Construct graph

    const graph = {};
    const graphAfters = Object.create(null); // A prototype can bungle lookups w/ false positives
    const groups = Object.create(null);

    for (let i = 0; i < this._items.length; ++i) {
        const item = this._items[i];
        const seq = item.seq;                         // Unique across all items
        const group = item.group;

        // Determine Groups

        groups[group] = groups[group] || [];
        groups[group].push(seq);

        // Build intermediary graph using 'before'

        graph[seq] = item.before;

        // Build second intermediary graph with 'after'

        const after = item.after;
        for (let j = 0; j < after.length; ++j) {
            graphAfters[after[j]] = (graphAfters[after[j]] || []).concat(seq);
        }
    }

    // Expand intermediary graph

    let graphNodes = Object.keys(graph);
    for (let i = 0; i < graphNodes.length; ++i) {
        const node = graphNodes[i];
        const expandedGroups = [];

        const graphNodeItems = Object.keys(graph[node]);
        for (let j = 0; j < graphNodeItems.length; ++j) {
            const group = graph[node][graphNodeItems[j]];
            groups[group] = groups[group] || [];

            for (let k = 0; k < groups[group].length; ++k) {
                expandedGroups.push(groups[group][k]);
            }
        }
        graph[node] = expandedGroups;
    }

    // Merge intermediary graph using graphAfters into final graph

    const afterNodes = Object.keys(graphAfters);
    for (let i = 0; i < afterNodes.length; ++i) {
        const group = afterNodes[i];

        if (groups[group]) {
            for (let j = 0; j < groups[group].length; ++j) {
                const node = groups[group][j];
                graph[node] = graph[node].concat(graphAfters[group]);
            }
        }
    }

    // Compile ancestors

    let children;
    const ancestors = {};
    graphNodes = Object.keys(graph);
    for (let i = 0; i < graphNodes.length; ++i) {
        const node = graphNodes[i];
        children = graph[node];

        for (let j = 0; j < children.length; ++j) {
            ancestors[children[j]] = (ancestors[children[j]] || []).concat(node);
        }
    }

    // Topo sort

    const visited = {};
    const sorted = [];

    for (let i = 0; i < this._items.length; ++i) {          // Really looping thru item.seq values out of order
        let next = i;

        if (ancestors[i]) {
            next = null;
            for (let j = 0; j < this._items.length; ++j) {  // As above, these are item.seq values
                if (visited[j] === true) {
                    continue;
                }

                if (!ancestors[j]) {
                    ancestors[j] = [];
                }

                const shouldSeeCount = ancestors[j].length;
                let seenCount = 0;
                for (let k = 0; k < shouldSeeCount; ++k) {
                    if (visited[ancestors[j][k]]) {
                        ++seenCount;
                    }
                }

                if (seenCount === shouldSeeCount) {
                    next = j;
                    break;
                }
            }
        }

        if (next !== null) {
            visited[next] = true;
            sorted.push(next);
        }
    }

    if (sorted.length !== this._items.length) {
        return new Error('Invalid dependencies');
    }

    const seqIndex = {};
    for (let i = 0; i < this._items.length; ++i) {
        const item = this._items[i];
        seqIndex[item.seq] = item;
    }

    const sortedNodes = [];
    this._items = sorted.map((value) => {

        const sortedItem = seqIndex[value];
        sortedNodes.push(sortedItem.node);
        return sortedItem;
    });

    this.nodes = sortedNodes;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Any = __webpack_require__(18);
const Ref = __webpack_require__(19);
const Hoek = __webpack_require__(17);


// Declare internals

const internals = {
    precisionRx: /(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/
};


internals.Number = class extends Any {

    constructor() {

        super();
        this._type = 'number';
        this._invalids.add(Infinity);
        this._invalids.add(-Infinity);
    }

    _base(value, state, options) {

        const result = {
            errors: null,
            value
        };

        if (typeof value === 'string' &&
            options.convert) {

            const number = parseFloat(value);
            result.value = (isNaN(number) || !isFinite(value)) ? NaN : number;
        }

        const isNumber = typeof result.value === 'number' && !isNaN(result.value);

        if (options.convert && 'precision' in this._flags && isNumber) {

            // This is conceptually equivalent to using toFixed but it should be much faster
            const precision = Math.pow(10, this._flags.precision);
            result.value = Math.round(result.value * precision) / precision;
        }

        result.errors = isNumber ? null : this.createError('number.base', null, state, options);
        return result;
    }

    multiple(base) {

        const isRef = Ref.isRef(base);

        if (!isRef) {
            Hoek.assert(typeof base === 'number' && isFinite(base), 'multiple must be a number');
            Hoek.assert(base > 0, 'multiple must be greater than 0');
        }

        return this._test('multiple', base, function (value, state, options) {

            const divisor = isRef ? base(state.reference || state.parent, options) : base;

            if (isRef && (typeof divisor !== 'number' || !isFinite(divisor))) {
                return this.createError('number.ref', { ref: base.key }, state, options);
            }

            if (value % divisor === 0) {
                return value;
            }

            return this.createError('number.multiple', { multiple: base, value }, state, options);
        });
    }

    integer() {

        return this._test('integer', undefined, function (value, state, options) {

            return Number.isSafeInteger(value) ? value : this.createError('number.integer', { value }, state, options);
        });
    }

    negative() {

        return this._test('negative', undefined, function (value, state, options) {

            if (value < 0) {
                return value;
            }

            return this.createError('number.negative', { value }, state, options);
        });
    }

    positive() {

        return this._test('positive', undefined, function (value, state, options) {

            if (value > 0) {
                return value;
            }

            return this.createError('number.positive', { value }, state, options);
        });
    }

    precision(limit) {

        Hoek.assert(Number.isSafeInteger(limit), 'limit must be an integer');
        Hoek.assert(!('precision' in this._flags), 'precision already set');

        const obj = this._test('precision', limit, function (value, state, options) {

            const places = value.toString().match(internals.precisionRx);
            const decimals = Math.max((places[1] ? places[1].length : 0) - (places[2] ? parseInt(places[2], 10) : 0), 0);
            if (decimals <= limit) {
                return value;
            }

            return this.createError('number.precision', { limit, value }, state, options);
        });

        obj._flags.precision = limit;
        return obj;
    }

};


internals.compare = function (type, compare) {

    return function (limit) {

        const isRef = Ref.isRef(limit);
        const isNumber = typeof limit === 'number' && !isNaN(limit);

        Hoek.assert(isNumber || isRef, 'limit must be a number or reference');

        return this._test(type, limit, function (value, state, options) {

            let compareTo;
            if (isRef) {
                compareTo = limit(state.reference || state.parent, options);

                if (!(typeof compareTo === 'number' && !isNaN(compareTo))) {
                    return this.createError('number.ref', { ref: limit.key }, state, options);
                }
            }
            else {
                compareTo = limit;
            }

            if (compare(value, compareTo)) {
                return value;
            }

            return this.createError('number.' + type, { limit: compareTo, value }, state, options);
        });
    };
};


internals.Number.prototype.min = internals.compare('min', (value, limit) => value >= limit);
internals.Number.prototype.max = internals.compare('max', (value, limit) => value <= limit);
internals.Number.prototype.greater = internals.compare('greater', (value, limit) => value > limit);
internals.Number.prototype.less = internals.compare('less', (value, limit) => value < limit);


module.exports = new internals.Number();


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Net = __webpack_require__(38);
const Hoek = __webpack_require__(17);
let Isemail;                            // Loaded on demand
const Any = __webpack_require__(18);
const Ref = __webpack_require__(19);
const JoiDate = __webpack_require__(25);
const Uri = __webpack_require__(39);
const Ip = __webpack_require__(40);

// Declare internals

const internals = {
    uriRegex: Uri.createUriRegex(),
    ipRegex: Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], 'optional'),
    guidBrackets: {
        '{': '}', '[': ']', '(': ')', '': ''
    },
    guidVersions: {
        uuidv1: '1',
        uuidv2: '2',
        uuidv3: '3',
        uuidv4: '4',
        uuidv5: '5'
    },
    cidrPresences: ['required', 'optional', 'forbidden'],
    normalizationForms: ['NFC', 'NFD', 'NFKC', 'NFKD']
};

internals.String = class extends Any {

    constructor() {

        super();
        this._type = 'string';
        this._invalids.add('');
    }

    _base(value, state, options) {

        if (typeof value === 'string' &&
            options.convert) {

            if (this._flags.normalize) {
                value = value.normalize(this._flags.normalize);
            }

            if (this._flags.case) {
                value = (this._flags.case === 'upper' ? value.toLocaleUpperCase() : value.toLocaleLowerCase());
            }

            if (this._flags.trim) {
                value = value.trim();
            }

            if (this._inner.replacements) {

                for (let i = 0; i < this._inner.replacements.length; ++i) {
                    const replacement = this._inner.replacements[i];
                    value = value.replace(replacement.pattern, replacement.replacement);
                }
            }

            if (this._flags.truncate) {
                for (let i = 0; i < this._tests.length; ++i) {
                    const test = this._tests[i];
                    if (test.name === 'max') {
                        value = value.slice(0, test.arg);
                        break;
                    }
                }
            }
        }

        return {
            value,
            errors: (typeof value === 'string') ? null : this.createError('string.base', { value }, state, options)
        };
    }

    insensitive() {

        if (this._flags.insensitive) {
            return this;
        }

        const obj = this.clone();
        obj._flags.insensitive = true;
        return obj;
    }

    creditCard() {

        return this._test('creditCard', undefined, function (value, state, options) {

            let i = value.length;
            let sum = 0;
            let mul = 1;

            while (i--) {
                const char = value.charAt(i) * mul;
                sum = sum + (char - (char > 9) * 9);
                mul = mul ^ 3;
            }

            const check = (sum % 10 === 0) && (sum > 0);
            return check ? value : this.createError('string.creditCard', { value }, state, options);
        });
    }

    regex(pattern, patternOptions) {

        Hoek.assert(pattern instanceof RegExp, 'pattern must be a RegExp');

        const patternObject = {
            pattern: new RegExp(pattern.source, pattern.ignoreCase ? 'i' : undefined)         // Future version should break this and forbid unsupported regex flags
        };

        if (typeof patternOptions === 'string') {
            patternObject.name = patternOptions;
        }
        else if (typeof patternOptions === 'object') {
            patternObject.invert = !!patternOptions.invert;

            if (patternOptions.name) {
                patternObject.name = patternOptions.name;
            }
        }

        const errorCode = ['string.regex', patternObject.invert ? '.invert' : '', patternObject.name ? '.name' : '.base'].join('');

        return this._test('regex', patternObject, function (value, state, options) {

            const patternMatch = patternObject.pattern.test(value);

            if (patternMatch ^ patternObject.invert) {
                return value;
            }

            return this.createError(errorCode, { name: patternObject.name, pattern: patternObject.pattern, value }, state, options);
        });
    }

    alphanum() {

        return this._test('alphanum', undefined, function (value, state, options) {

            if (/^[a-zA-Z0-9]+$/.test(value)) {
                return value;
            }

            return this.createError('string.alphanum', { value }, state, options);
        });
    }

    token() {

        return this._test('token', undefined, function (value, state, options) {

            if (/^\w+$/.test(value)) {
                return value;
            }

            return this.createError('string.token', { value }, state, options);
        });
    }

    email(isEmailOptions) {

        if (isEmailOptions) {
            Hoek.assert(typeof isEmailOptions === 'object', 'email options must be an object');
            Hoek.assert(typeof isEmailOptions.checkDNS === 'undefined', 'checkDNS option is not supported');
            Hoek.assert(typeof isEmailOptions.tldWhitelist === 'undefined' ||
                typeof isEmailOptions.tldWhitelist === 'object', 'tldWhitelist must be an array or object');
            Hoek.assert(
                typeof isEmailOptions.minDomainAtoms === 'undefined' ||
                Number.isSafeInteger(isEmailOptions.minDomainAtoms) &&
                isEmailOptions.minDomainAtoms > 0,
                'minDomainAtoms must be a positive integer'
            );
            Hoek.assert(
                typeof isEmailOptions.errorLevel === 'undefined' ||
                typeof isEmailOptions.errorLevel === 'boolean' ||
                (
                    Number.isSafeInteger(isEmailOptions.errorLevel) &&
                    isEmailOptions.errorLevel >= 0
                ),
                'errorLevel must be a non-negative integer or boolean'
            );
        }

        return this._test('email', isEmailOptions, function (value, state, options) {

            Isemail = Isemail || __webpack_require__(41);

            try {
                const result = Isemail.validate(value, isEmailOptions);
                if (result === true || result === 0) {
                    return value;
                }
            }
            catch (e) { }

            return this.createError('string.email', { value }, state, options);
        });
    }

    ip(ipOptions = {}) {

        let regex = internals.ipRegex;
        Hoek.assert(typeof ipOptions === 'object', 'options must be an object');

        if (ipOptions.cidr) {
            Hoek.assert(typeof ipOptions.cidr === 'string', 'cidr must be a string');
            ipOptions.cidr = ipOptions.cidr.toLowerCase();

            Hoek.assert(Hoek.contain(internals.cidrPresences, ipOptions.cidr), 'cidr must be one of ' + internals.cidrPresences.join(', '));

            // If we only received a `cidr` setting, create a regex for it. But we don't need to create one if `cidr` is "optional" since that is the default
            if (!ipOptions.version && ipOptions.cidr !== 'optional') {
                regex = Ip.createIpRegex(['ipv4', 'ipv6', 'ipvfuture'], ipOptions.cidr);
            }
        }
        else {

            // Set our default cidr strategy
            ipOptions.cidr = 'optional';
        }

        let versions;
        if (ipOptions.version) {
            if (!Array.isArray(ipOptions.version)) {
                ipOptions.version = [ipOptions.version];
            }

            Hoek.assert(ipOptions.version.length >= 1, 'version must have at least 1 version specified');

            versions = [];
            for (let i = 0; i < ipOptions.version.length; ++i) {
                let version = ipOptions.version[i];
                Hoek.assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
                version = version.toLowerCase();
                Hoek.assert(Ip.versions[version], 'version at position ' + i + ' must be one of ' + Object.keys(Ip.versions).join(', '));
                versions.push(version);
            }

            // Make sure we have a set of versions
            versions = Hoek.unique(versions);

            regex = Ip.createIpRegex(versions, ipOptions.cidr);
        }

        return this._test('ip', ipOptions, function (value, state, options) {

            if (regex.test(value)) {
                return value;
            }

            if (versions) {
                return this.createError('string.ipVersion', { value, cidr: ipOptions.cidr, version: versions }, state, options);
            }

            return this.createError('string.ip', { value, cidr: ipOptions.cidr }, state, options);
        });
    }

    uri(uriOptions) {

        let customScheme = '';
        let allowRelative = false;
        let relativeOnly = false;
        let regex = internals.uriRegex;

        if (uriOptions) {
            Hoek.assert(typeof uriOptions === 'object', 'options must be an object');

            if (uriOptions.scheme) {
                Hoek.assert(uriOptions.scheme instanceof RegExp || typeof uriOptions.scheme === 'string' || Array.isArray(uriOptions.scheme), 'scheme must be a RegExp, String, or Array');

                if (!Array.isArray(uriOptions.scheme)) {
                    uriOptions.scheme = [uriOptions.scheme];
                }

                Hoek.assert(uriOptions.scheme.length >= 1, 'scheme must have at least 1 scheme specified');

                // Flatten the array into a string to be used to match the schemes.
                for (let i = 0; i < uriOptions.scheme.length; ++i) {
                    const scheme = uriOptions.scheme[i];
                    Hoek.assert(scheme instanceof RegExp || typeof scheme === 'string', 'scheme at position ' + i + ' must be a RegExp or String');

                    // Add OR separators if a value already exists
                    customScheme = customScheme + (customScheme ? '|' : '');

                    // If someone wants to match HTTP or HTTPS for example then we need to support both RegExp and String so we don't escape their pattern unknowingly.
                    if (scheme instanceof RegExp) {
                        customScheme = customScheme + scheme.source;
                    }
                    else {
                        Hoek.assert(/[a-zA-Z][a-zA-Z0-9+-\.]*/.test(scheme), 'scheme at position ' + i + ' must be a valid scheme');
                        customScheme = customScheme + Hoek.escapeRegex(scheme);
                    }
                }
            }

            if (uriOptions.allowRelative) {
                allowRelative = true;
            }

            if (uriOptions.relativeOnly) {
                relativeOnly = true;
            }
        }

        if (customScheme || allowRelative || relativeOnly) {
            regex = Uri.createUriRegex(customScheme, allowRelative, relativeOnly);
        }

        return this._test('uri', uriOptions, function (value, state, options) {

            if (regex.test(value)) {
                return value;
            }

            if (relativeOnly) {
                return this.createError('string.uriRelativeOnly', { value }, state, options);
            }

            if (customScheme) {
                return this.createError('string.uriCustomScheme', { scheme: customScheme, value }, state, options);
            }

            return this.createError('string.uri', { value }, state, options);
        });
    }

    isoDate() {

        return this._test('isoDate', undefined, function (value, state, options) {

            if (JoiDate._isIsoDate(value)) {
                if (!options.convert) {
                    return value;
                }

                const d = new Date(value);
                if (!isNaN(d.getTime())) {
                    return d.toISOString();
                }
            }

            return this.createError('string.isoDate', { value }, state, options);
        });
    }

    guid(guidOptions) {

        let versionNumbers = '';

        if (guidOptions && guidOptions.version) {
            if (!Array.isArray(guidOptions.version)) {
                guidOptions.version = [guidOptions.version];
            }

            Hoek.assert(guidOptions.version.length >= 1, 'version must have at least 1 valid version specified');
            const versions = new Set();

            for (let i = 0; i < guidOptions.version.length; ++i) {
                let version = guidOptions.version[i];
                Hoek.assert(typeof version === 'string', 'version at position ' + i + ' must be a string');
                version = version.toLowerCase();
                const versionNumber = internals.guidVersions[version];
                Hoek.assert(versionNumber, 'version at position ' + i + ' must be one of ' + Object.keys(internals.guidVersions).join(', '));
                Hoek.assert(!(versions.has(versionNumber)), 'version at position ' + i + ' must not be a duplicate.');

                versionNumbers += versionNumber;
                versions.add(versionNumber);
            }
        }

        const guidRegex = new RegExp(`^([\\[{\\(]?)[0-9A-F]{8}([:-]?)[0-9A-F]{4}\\2?[${versionNumbers || '0-9A-F'}][0-9A-F]{3}\\2?[${versionNumbers ? '89AB' : '0-9A-F'}][0-9A-F]{3}\\2?[0-9A-F]{12}([\\]}\\)]?)$`, 'i');

        return this._test('guid', guidOptions, function (value, state, options) {

            const results = guidRegex.exec(value);

            if (!results) {
                return this.createError('string.guid', { value }, state, options);
            }

            // Matching braces
            if (internals.guidBrackets[results[1]] !== results[results.length - 1]) {
                return this.createError('string.guid', { value }, state, options);
            }

            return value;
        });
    }

    hex() {

        const regex = /^[a-f0-9]+$/i;

        return this._test('hex', regex, function (value, state, options) {

            if (regex.test(value)) {
                return value;
            }

            return this.createError('string.hex', { value }, state, options);
        });
    }

    base64(base64Options = {}) {

        // Validation.
        Hoek.assert(typeof base64Options === 'object', 'base64 options must be an object');
        Hoek.assert(typeof base64Options.paddingRequired === 'undefined' || typeof base64Options.paddingRequired === 'boolean',
            'paddingRequired must be boolean');

        // Determine if padding is required.
        const paddingRequired = base64Options.paddingRequired === false ?
            base64Options.paddingRequired
            : base64Options.paddingRequired || true;

        // Set validation based on preference.
        const regex = paddingRequired ?
            // Padding is required.
            /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/
            // Padding is optional.
            : /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}(==)?|[A-Za-z0-9+\/]{3}=?)?$/;

        return this._test('base64', regex, function (value, state, options) {

            if (regex.test(value)) {
                return value;
            }

            return this.createError('string.base64', { value }, state, options);
        });
    }

    hostname() {

        const regex = /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/;

        return this._test('hostname', undefined, function (value, state, options) {

            if ((value.length <= 255 && regex.test(value)) ||
                Net.isIPv6(value)) {

                return value;
            }

            return this.createError('string.hostname', { value }, state, options);
        });
    }

    normalize(form = 'NFC') {

        Hoek.assert(Hoek.contain(internals.normalizationForms, form), 'normalization form must be one of ' + internals.normalizationForms.join(', '));

        const obj = this._test('normalize', form, function (value, state, options) {

            if (options.convert ||
                value === value.normalize(form)) {

                return value;
            }

            return this.createError('string.normalize', { value, form }, state, options);
        });

        obj._flags.normalize = form;
        return obj;
    }

    lowercase() {

        const obj = this._test('lowercase', undefined, function (value, state, options) {

            if (options.convert ||
                value === value.toLocaleLowerCase()) {

                return value;
            }

            return this.createError('string.lowercase', { value }, state, options);
        });

        obj._flags.case = 'lower';
        return obj;
    }

    uppercase() {

        const obj = this._test('uppercase', undefined, function (value, state, options) {

            if (options.convert ||
                value === value.toLocaleUpperCase()) {

                return value;
            }

            return this.createError('string.uppercase', { value }, state, options);
        });

        obj._flags.case = 'upper';
        return obj;
    }

    trim() {

        const obj = this._test('trim', undefined, function (value, state, options) {

            if (options.convert ||
                value === value.trim()) {

                return value;
            }

            return this.createError('string.trim', { value }, state, options);
        });

        obj._flags.trim = true;
        return obj;
    }

    replace(pattern, replacement) {

        if (typeof pattern === 'string') {
            pattern = new RegExp(Hoek.escapeRegex(pattern), 'g');
        }

        Hoek.assert(pattern instanceof RegExp, 'pattern must be a RegExp');
        Hoek.assert(typeof replacement === 'string', 'replacement must be a String');

        // This can not be considere a test like trim, we can't "reject"
        // anything from this rule, so just clone the current object
        const obj = this.clone();

        if (!obj._inner.replacements) {
            obj._inner.replacements = [];
        }

        obj._inner.replacements.push({
            pattern,
            replacement
        });

        return obj;
    }

    truncate(enabled) {

        const value = enabled === undefined ? true : !!enabled;

        if (this._flags.truncate === value) {
            return this;
        }

        const obj = this.clone();
        obj._flags.truncate = value;
        return obj;
    }

};

internals.compare = function (type, compare) {

    return function (limit, encoding) {

        const isRef = Ref.isRef(limit);

        Hoek.assert((Number.isSafeInteger(limit) && limit >= 0) || isRef, 'limit must be a positive integer or reference');
        Hoek.assert(!encoding || Buffer.isEncoding(encoding), 'Invalid encoding:', encoding);

        return this._test(type, limit, function (value, state, options) {

            let compareTo;
            if (isRef) {
                compareTo = limit(state.reference || state.parent, options);

                if (!Number.isSafeInteger(compareTo)) {
                    return this.createError('string.ref', { ref: limit.key }, state, options);
                }
            }
            else {
                compareTo = limit;
            }

            if (compare(value, compareTo, encoding)) {
                return value;
            }

            return this.createError('string.' + type, { limit: compareTo, value, encoding }, state, options);
        });
    };
};


internals.String.prototype.min = internals.compare('min', (value, limit, encoding) => {

    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
    return length >= limit;
});


internals.String.prototype.max = internals.compare('max', (value, limit, encoding) => {

    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
    return length <= limit;
});


internals.String.prototype.length = internals.compare('length', (value, limit, encoding) => {

    const length = encoding ? Buffer.byteLength(value, encoding) : value.length;
    return length === limit;
});

// Aliases

internals.String.prototype.uuid = internals.String.prototype.guid;

module.exports = new internals.String();


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load Modules

const RFC3986 = __webpack_require__(27);


// Declare internals

const internals = {
    Uri: {
        createUriRegex: function (optionalScheme, allowRelative, relativeOnly) {

            let scheme = RFC3986.scheme;
            let prefix;

            if (relativeOnly) {
                prefix = '(?:' + RFC3986.relativeRef + ')';
            }
            else {
                // If we were passed a scheme, use it instead of the generic one
                if (optionalScheme) {

                    // Have to put this in a non-capturing group to handle the OR statements
                    scheme = '(?:' + optionalScheme + ')';
                }

                const withScheme = '(?:' + scheme + ':' + RFC3986.hierPart + ')';

                prefix = allowRelative ? '(?:' + withScheme + '|' + RFC3986.relativeRef + ')' : withScheme;
            }

            /**
             * URI = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
             *
             * OR
             *
             * relative-ref = relative-part [ "?" query ] [ "#" fragment ]
             */
            return new RegExp('^' + prefix + '(?:\\?' + RFC3986.query + ')?' + '(?:#' + RFC3986.fragment + ')?$');
        }
    }
};


module.exports = internals.Uri;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const RFC3986 = __webpack_require__(27);


// Declare internals

const internals = {
    Ip: {
        cidrs: {
            ipv4: {
                required: '\\/(?:' + RFC3986.ipv4Cidr + ')',
                optional: '(?:\\/(?:' + RFC3986.ipv4Cidr + '))?',
                forbidden: ''
            },
            ipv6: {
                required: '\\/' + RFC3986.ipv6Cidr,
                optional: '(?:\\/' + RFC3986.ipv6Cidr + ')?',
                forbidden: ''
            },
            ipvfuture: {
                required: '\\/' + RFC3986.ipv6Cidr,
                optional: '(?:\\/' + RFC3986.ipv6Cidr + ')?',
                forbidden: ''
            }
        },
        versions: {
            ipv4: RFC3986.IPv4address,
            ipv6: RFC3986.IPv6address,
            ipvfuture: RFC3986.IPvFuture
        }
    }
};


internals.Ip.createIpRegex = function (versions, cidr) {

    let regex;
    for (let i = 0; i < versions.length; ++i) {
        const version = versions[i];
        if (!regex) {
            regex = '^(?:' + internals.Ip.versions[version] + internals.Ip.cidrs[version][cidr];
        }
        else {
            regex += '|' + internals.Ip.versions[version] + internals.Ip.cidrs[version][cidr];
        }
    }

    return new RegExp(regex + ')$');
};

module.exports = internals.Ip;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Punycode = __webpack_require__(42);

// Declare internals

const internals = {
    hasOwn: Object.prototype.hasOwnProperty,
    indexOf: Array.prototype.indexOf,
    defaultThreshold: 16,
    maxIPv6Groups: 8,

    categories: {
        valid: 1,
        dnsWarn: 7,
        rfc5321: 15,
        cfws: 31,
        deprecated: 63,
        rfc5322: 127,
        error: 255
    },

    diagnoses: {

        // Address is valid

        valid: 0,

        // Address is valid for SMTP but has unusual elements

        rfc5321TLD: 9,
        rfc5321TLDNumeric: 10,
        rfc5321QuotedString: 11,
        rfc5321AddressLiteral: 12,

        // Address is valid for message, but must be modified for envelope

        cfwsComment: 17,
        cfwsFWS: 18,

        // Address contains non-ASCII when the allowUnicode option is false
        // Has to be > internals.defaultThreshold so that it's rejected
        // without an explicit errorLevel:
        undesiredNonAscii: 25,

        // Address contains deprecated elements, but may still be valid in some contexts

        deprecatedLocalPart: 33,
        deprecatedFWS: 34,
        deprecatedQTEXT: 35,
        deprecatedQP: 36,
        deprecatedComment: 37,
        deprecatedCTEXT: 38,
        deprecatedIPv6: 39,
        deprecatedCFWSNearAt: 49,

        // Address is only valid according to broad definition in RFC 5322, but is otherwise invalid

        rfc5322Domain: 65,
        rfc5322TooLong: 66,
        rfc5322LocalTooLong: 67,
        rfc5322DomainTooLong: 68,
        rfc5322LabelTooLong: 69,
        rfc5322DomainLiteral: 70,
        rfc5322DomainLiteralOBSDText: 71,
        rfc5322IPv6GroupCount: 72,
        rfc5322IPv62x2xColon: 73,
        rfc5322IPv6BadCharacter: 74,
        rfc5322IPv6MaxGroups: 75,
        rfc5322IPv6ColonStart: 76,
        rfc5322IPv6ColonEnd: 77,

        // Address is invalid for any purpose

        errExpectingDTEXT: 129,
        errNoLocalPart: 130,
        errNoDomain: 131,
        errConsecutiveDots: 132,
        errATEXTAfterCFWS: 133,
        errATEXTAfterQS: 134,
        errATEXTAfterDomainLiteral: 135,
        errExpectingQPair: 136,
        errExpectingATEXT: 137,
        errExpectingQTEXT: 138,
        errExpectingCTEXT: 139,
        errBackslashEnd: 140,
        errDotStart: 141,
        errDotEnd: 142,
        errDomainHyphenStart: 143,
        errDomainHyphenEnd: 144,
        errUnclosedQuotedString: 145,
        errUnclosedComment: 146,
        errUnclosedDomainLiteral: 147,
        errFWSCRLFx2: 148,
        errFWSCRLFEnd: 149,
        errCRNoLF: 150,
        errUnknownTLD: 160,
        errDomainTooShort: 161
    },

    components: {
        localpart: 0,
        domain: 1,
        literal: 2,
        contextComment: 3,
        contextFWS: 4,
        contextQuotedString: 5,
        contextQuotedPair: 6
    }
};


internals.specials = function () {

    const specials = '()<>[]:;@\\,."';        // US-ASCII visible characters not valid for atext (http://tools.ietf.org/html/rfc5322#section-3.2.3)
    const lookup = new Array(0x100);
    lookup.fill(false);

    for (let i = 0; i < specials.length; ++i) {
        lookup[specials.codePointAt(i)] = true;
    }

    return function (code) {

        return lookup[code];
    };
}();

internals.c0Controls = function () {

    const lookup = new Array(0x100);
    lookup.fill(false);

    // add C0 control characters

    for (let i = 0; i < 33; ++i) {
        lookup[i] = true;
    }

    return function (code) {

        return lookup[code];
    };
}();

internals.c1Controls = function () {

    const lookup = new Array(0x100);
    lookup.fill(false);

    // add C1 control characters

    for (let i = 127; i < 160; ++i) {
        lookup[i] = true;
    }

    return function (code) {

        return lookup[code];
    };
}();

internals.regex = {
    ipV4: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipV6: /^[a-fA-F\d]{0,4}$/
};

// $lab:coverage:off$
internals.nulNormalize = function (email) {

    let emailPieces = email.split('\u0000');
    emailPieces = emailPieces.map((string) => {

        return string.normalize('NFC');
    });

    return emailPieces.join('\u0000');
};
// $lab:coverage:on$


internals.checkIpV6 = function (items) {

    return items.every((value) => internals.regex.ipV6.test(value));
};


internals.validDomain = function (tldAtom, options) {

    if (options.tldBlacklist) {
        if (Array.isArray(options.tldBlacklist)) {
            return internals.indexOf.call(options.tldBlacklist, tldAtom) === -1;
        }

        return !internals.hasOwn.call(options.tldBlacklist, tldAtom);
    }

    if (Array.isArray(options.tldWhitelist)) {
        return internals.indexOf.call(options.tldWhitelist, tldAtom) !== -1;
    }

    return internals.hasOwn.call(options.tldWhitelist, tldAtom);
};


/**
 * Check that an email address conforms to RFCs 5321, 5322, 6530 and others
 *
 * We distinguish clearly between a Mailbox as defined by RFC 5321 and an
 * addr-spec as defined by RFC 5322. Depending on the context, either can be
 * regarded as a valid email address. The RFC 5321 Mailbox specification is
 * more restrictive (comments, white space and obsolete forms are not allowed).
 *
 * @param {string} email The email address to check. See README for specifics.
 * @param {Object} options The (optional) options:
 *   {*} errorLevel Determines the boundary between valid and invalid
 *     addresses.
 *   {*} tldBlacklist The set of domains to consider invalid.
 *   {*} tldWhitelist The set of domains to consider valid.
 *   {*} allowUnicode Whether to allow non-ASCII characters, defaults to true.
 *   {*} minDomainAtoms The minimum number of domain atoms which must be present
 *     for the address to be valid.
 * @param {function(number|boolean)} callback The (optional) callback handler.
 * @return {*}
 */

exports.validate = internals.validate = function (email, options, callback) {

    options = options || {};
    email = internals.normalize(email);

    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (typeof callback !== 'function') {
        callback = null;
    }

    let diagnose;
    let threshold;

    if (typeof options.errorLevel === 'number') {
        diagnose = true;
        threshold = options.errorLevel;
    }
    else {
        diagnose = !!options.errorLevel;
        threshold = internals.diagnoses.valid;
    }

    if (options.tldWhitelist) {
        if (typeof options.tldWhitelist === 'string') {
            options.tldWhitelist = [options.tldWhitelist];
        }
        else if (typeof options.tldWhitelist !== 'object') {
            throw new TypeError('expected array or object tldWhitelist');
        }
    }

    if (options.tldBlacklist) {
        if (typeof options.tldBlacklist === 'string') {
            options.tldBlacklist = [options.tldBlacklist];
        }
        else if (typeof options.tldBlacklist !== 'object') {
            throw new TypeError('expected array or object tldBlacklist');
        }
    }

    if (options.minDomainAtoms && (options.minDomainAtoms !== ((+options.minDomainAtoms) | 0) || options.minDomainAtoms < 0)) {
        throw new TypeError('expected positive integer minDomainAtoms');
    }

    let maxResult = internals.diagnoses.valid;
    const updateResult = (value) => {

        if (value > maxResult) {
            maxResult = value;
        }
    };

    const allowUnicode = options.allowUnicode === undefined || !!options.allowUnicode;
    if (!allowUnicode && /[^\x00-\x7f]/.test(email)) {
        updateResult(internals.diagnoses.undesiredNonAscii);
    }

    const context = {
        now: internals.components.localpart,
        prev: internals.components.localpart,
        stack: [internals.components.localpart]
    };

    let prevToken = '';

    const parseData = {
        local: '',
        domain: ''
    };
    const atomData = {
        locals: [''],
        domains: ['']
    };

    let elementCount = 0;
    let elementLength = 0;
    let crlfCount = 0;
    let charCode;

    let hyphenFlag = false;
    let assertEnd = false;

    const emailLength = email.length;

    let token;                                      // Token is used outside the loop, must declare similarly
    for (let i = 0; i < emailLength; i += token.length) {
        // Utilize codepoints to account for Unicode surrogate pairs
        token = String.fromCodePoint(email.codePointAt(i));

        switch (context.now) {
            // Local-part
            case internals.components.localpart:
                // http://tools.ietf.org/html/rfc5322#section-3.4.1
                //   local-part      =   dot-atom / quoted-string / obs-local-part
                //
                //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
                //
                //   dot-atom-text   =   1*atext *("." 1*atext)
                //
                //   quoted-string   =   [CFWS]
                //                       DQUOTE *([FWS] qcontent) [FWS] DQUOTE
                //                       [CFWS]
                //
                //   obs-local-part  =   word *("." word)
                //
                //   word            =   atom / quoted-string
                //
                //   atom            =   [CFWS] 1*atext [CFWS]
                switch (token) {
                    // Comment
                    case '(':
                        if (elementLength === 0) {
                            // Comments are OK at the beginning of an element
                            updateResult(elementCount === 0 ? internals.diagnoses.cfwsComment : internals.diagnoses.deprecatedComment);
                        }
                        else {
                            updateResult(internals.diagnoses.cfwsComment);
                            // Cannot start a comment in an element, should be end
                            assertEnd = true;
                        }

                        context.stack.push(context.now);
                        context.now = internals.components.contextComment;
                        break;

                        // Next dot-atom element
                    case '.':
                        if (elementLength === 0) {
                            // Another dot, already?
                            updateResult(elementCount === 0 ? internals.diagnoses.errDotStart : internals.diagnoses.errConsecutiveDots);
                        }
                        else {
                            // The entire local-part can be a quoted string for RFC 5321; if one atom is quoted it's an RFC 5322 obsolete form
                            if (assertEnd) {
                                updateResult(internals.diagnoses.deprecatedLocalPart);
                            }

                            // CFWS & quoted strings are OK again now we're at the beginning of an element (although they are obsolete forms)
                            assertEnd = false;
                            elementLength = 0;
                            ++elementCount;
                            parseData.local += token;
                            atomData.locals[elementCount] = '';
                        }

                        break;

                        // Quoted string
                    case '"':
                        if (elementLength === 0) {
                            // The entire local-part can be a quoted string for RFC 5321; if one atom is quoted it's an RFC 5322 obsolete form
                            updateResult(elementCount === 0 ? internals.diagnoses.rfc5321QuotedString : internals.diagnoses.deprecatedLocalPart);

                            parseData.local += token;
                            atomData.locals[elementCount] += token;
                            elementLength += Buffer.byteLength(token, 'utf8');

                            // Quoted string must be the entire element
                            assertEnd = true;
                            context.stack.push(context.now);
                            context.now = internals.components.contextQuotedString;
                        }
                        else {
                            updateResult(internals.diagnoses.errExpectingATEXT);
                        }

                        break;

                        // Folding white space
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            // Fatal error
                            updateResult(internals.diagnoses.errCRNoLF);
                            break;
                        }

                        // Fallthrough

                    case ' ':
                    case '\t':
                        if (elementLength === 0) {
                            updateResult(elementCount === 0 ? internals.diagnoses.cfwsFWS : internals.diagnoses.deprecatedFWS);
                        }
                        else {
                            // We can't start FWS in the middle of an element, better be end
                            assertEnd = true;
                        }

                        context.stack.push(context.now);
                        context.now = internals.components.contextFWS;
                        prevToken = token;
                        break;

                    case '@':
                        // At this point we should have a valid local-part
                        // $lab:coverage:off$
                        if (context.stack.length !== 1) {
                            throw new Error('unexpected item on context stack');
                        }
                        // $lab:coverage:on$

                        if (parseData.local.length === 0) {
                            // Fatal error
                            updateResult(internals.diagnoses.errNoLocalPart);
                        }
                        else if (elementLength === 0) {
                            // Fatal error
                            updateResult(internals.diagnoses.errDotEnd);
                        }
                        // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.1 the maximum total length of a user name or other local-part is 64
                        //    octets
                        else if (Buffer.byteLength(parseData.local, 'utf8') > 64) {
                            updateResult(internals.diagnoses.rfc5322LocalTooLong);
                        }
                        // http://tools.ietf.org/html/rfc5322#section-3.4.1 comments and folding white space SHOULD NOT be used around "@" in the
                        //    addr-spec
                        //
                        // http://tools.ietf.org/html/rfc2119
                        // 4. SHOULD NOT this phrase, or the phrase "NOT RECOMMENDED" mean that there may exist valid reasons in particular
                        //    circumstances when the particular behavior is acceptable or even useful, but the full implications should be understood
                        //    and the case carefully weighed before implementing any behavior described with this label.
                        else if (context.prev === internals.components.contextComment || context.prev === internals.components.contextFWS) {
                            updateResult(internals.diagnoses.deprecatedCFWSNearAt);
                        }

                        // Clear everything down for the domain parsing
                        context.now = internals.components.domain;
                        context.stack[0] = internals.components.domain;
                        elementCount = 0;
                        elementLength = 0;
                        assertEnd = false; // CFWS can only appear at the end of the element
                        break;

                        // ATEXT
                    default:
                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
                        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
                        //            "!" / "#" /     ;  characters not including
                        //            "$" / "%" /     ;  specials.  Used for atoms.
                        //            "&" / "'" /
                        //            "*" / "+" /
                        //            "-" / "/" /
                        //            "=" / "?" /
                        //            "^" / "_" /
                        //            "`" / "{" /
                        //            "|" / "}" /
                        //            "~"
                        if (assertEnd) {
                            // We have encountered atext where it is no longer valid
                            switch (context.prev) {
                                case internals.components.contextComment:
                                case internals.components.contextFWS:
                                    updateResult(internals.diagnoses.errATEXTAfterCFWS);
                                    break;

                                case internals.components.contextQuotedString:
                                    updateResult(internals.diagnoses.errATEXTAfterQS);
                                    break;

                                    // $lab:coverage:off$
                                default:
                                    throw new Error('more atext found where none is allowed, but unrecognized prev context: ' + context.prev);
                                    // $lab:coverage:on$
                            }
                        }
                        else {
                            context.prev = context.now;
                            charCode = token.codePointAt(0);

                            // Especially if charCode == 10
                            if (internals.specials(charCode) || internals.c0Controls(charCode) || internals.c1Controls(charCode)) {

                                // Fatal error
                                updateResult(internals.diagnoses.errExpectingATEXT);
                            }

                            parseData.local += token;
                            atomData.locals[elementCount] += token;
                            elementLength += Buffer.byteLength(token, 'utf8');
                        }
                }

                break;

            case internals.components.domain:
                // http://tools.ietf.org/html/rfc5322#section-3.4.1
                //   domain          =   dot-atom / domain-literal / obs-domain
                //
                //   dot-atom        =   [CFWS] dot-atom-text [CFWS]
                //
                //   dot-atom-text   =   1*atext *("." 1*atext)
                //
                //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
                //
                //   dtext           =   %d33-90 /          ; Printable US-ASCII
                //                       %d94-126 /         ;  characters not including
                //                       obs-dtext          ;  "[", "]", or "\"
                //
                //   obs-domain      =   atom *("." atom)
                //
                //   atom            =   [CFWS] 1*atext [CFWS]

                // http://tools.ietf.org/html/rfc5321#section-4.1.2
                //   Mailbox        = Local-part "@" ( Domain / address-literal )
                //
                //   Domain         = sub-domain *("." sub-domain)
                //
                //   address-literal  = "[" ( IPv4-address-literal /
                //                    IPv6-address-literal /
                //                    General-address-literal ) "]"
                //                    ; See Section 4.1.3

                // http://tools.ietf.org/html/rfc5322#section-3.4.1
                //      Note: A liberal syntax for the domain portion of addr-spec is
                //      given here.  However, the domain portion contains addressing
                //      information specified by and used in other protocols (e.g.,
                //      [RFC1034], [RFC1035], [RFC1123], [RFC5321]).  It is therefore
                //      incumbent upon implementations to conform to the syntax of
                //      addresses for the context in which they are used.
                //
                // is_email() author's note: it's not clear how to interpret this in
                // he context of a general email address validator. The conclusion I
                // have reached is this: "addressing information" must comply with
                // RFC 5321 (and in turn RFC 1035), anything that is "semantically
                // invisible" must comply only with RFC 5322.
                switch (token) {
                    // Comment
                    case '(':
                        if (elementLength === 0) {
                            // Comments at the start of the domain are deprecated in the text, comments at the start of a subdomain are obs-domain
                            // http://tools.ietf.org/html/rfc5322#section-3.4.1
                            updateResult(elementCount === 0 ? internals.diagnoses.deprecatedCFWSNearAt : internals.diagnoses.deprecatedComment);
                        }
                        else {
                            // We can't start a comment mid-element, better be at the end
                            assertEnd = true;
                            updateResult(internals.diagnoses.cfwsComment);
                        }

                        context.stack.push(context.now);
                        context.now = internals.components.contextComment;
                        break;

                        // Next dot-atom element
                    case '.':
                        const punycodeLength = Punycode.encode(atomData.domains[elementCount]).length;
                        if (elementLength === 0) {
                            // Another dot, already? Fatal error.
                            updateResult(elementCount === 0 ? internals.diagnoses.errDotStart : internals.diagnoses.errConsecutiveDots);
                        }
                        else if (hyphenFlag) {
                            // Previous subdomain ended in a hyphen. Fatal error.
                            updateResult(internals.diagnoses.errDomainHyphenEnd);
                        }
                        else if (punycodeLength > 63) {
                            // RFC 5890 specifies that domain labels that are encoded using the Punycode algorithm
                            // must adhere to the <= 63 octet requirement.
                            // This includes string prefixes from the Punycode algorithm.
                            //
                            // https://tools.ietf.org/html/rfc5890#section-2.3.2.1
                            // labels          63 octets or less

                            updateResult(internals.diagnoses.rfc5322LabelTooLong);
                        }

                        // CFWS is OK again now we're at the beginning of an element (although
                        // it may be obsolete CFWS)
                        assertEnd = false;
                        elementLength = 0;
                        ++elementCount;
                        atomData.domains[elementCount] = '';
                        parseData.domain += token;

                        break;

                        // Domain literal
                    case '[':
                        if (parseData.domain.length === 0) {
                            // Domain literal must be the only component
                            assertEnd = true;
                            elementLength += Buffer.byteLength(token, 'utf8');
                            context.stack.push(context.now);
                            context.now = internals.components.literal;
                            parseData.domain += token;
                            atomData.domains[elementCount] += token;
                            parseData.literal = '';
                        }
                        else {
                            // Fatal error
                            updateResult(internals.diagnoses.errExpectingATEXT);
                        }

                        break;

                        // Folding white space
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            // Fatal error
                            updateResult(internals.diagnoses.errCRNoLF);
                            break;
                        }

                        // Fallthrough

                    case ' ':
                    case '\t':
                        if (elementLength === 0) {
                            updateResult(elementCount === 0 ? internals.diagnoses.deprecatedCFWSNearAt : internals.diagnoses.deprecatedFWS);
                        }
                        else {
                            // We can't start FWS in the middle of an element, so this better be the end
                            updateResult(internals.diagnoses.cfwsFWS);
                            assertEnd = true;
                        }

                        context.stack.push(context.now);
                        context.now = internals.components.contextFWS;
                        prevToken = token;
                        break;

                        // This must be ATEXT
                    default:
                        // RFC 5322 allows any atext...
                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
                        //    atext = ALPHA / DIGIT / ; Printable US-ASCII
                        //            "!" / "#" /     ;  characters not including
                        //            "$" / "%" /     ;  specials.  Used for atoms.
                        //            "&" / "'" /
                        //            "*" / "+" /
                        //            "-" / "/" /
                        //            "=" / "?" /
                        //            "^" / "_" /
                        //            "`" / "{" /
                        //            "|" / "}" /
                        //            "~"

                        // But RFC 5321 only allows letter-digit-hyphen to comply with DNS rules
                        //   (RFCs 1034 & 1123)
                        // http://tools.ietf.org/html/rfc5321#section-4.1.2
                        //   sub-domain     = Let-dig [Ldh-str]
                        //
                        //   Let-dig        = ALPHA / DIGIT
                        //
                        //   Ldh-str        = *( ALPHA / DIGIT / "-" ) Let-dig
                        //
                        if (assertEnd) {
                            // We have encountered ATEXT where it is no longer valid
                            switch (context.prev) {
                                case internals.components.contextComment:
                                case internals.components.contextFWS:
                                    updateResult(internals.diagnoses.errATEXTAfterCFWS);
                                    break;

                                case internals.components.literal:
                                    updateResult(internals.diagnoses.errATEXTAfterDomainLiteral);
                                    break;

                                    // $lab:coverage:off$
                                default:
                                    throw new Error('more atext found where none is allowed, but unrecognized prev context: ' + context.prev);
                                    // $lab:coverage:on$
                            }
                        }

                        charCode = token.codePointAt(0);
                        // Assume this token isn't a hyphen unless we discover it is
                        hyphenFlag = false;

                        if (internals.specials(charCode) || internals.c0Controls(charCode) || internals.c1Controls(charCode)) {
                            // Fatal error
                            updateResult(internals.diagnoses.errExpectingATEXT);
                        }
                        else if (token === '-') {
                            if (elementLength === 0) {
                                // Hyphens cannot be at the beginning of a subdomain, fatal error
                                updateResult(internals.diagnoses.errDomainHyphenStart);
                            }

                            hyphenFlag = true;
                        }
                        // Check if it's a neither a number nor a latin/unicode letter
                        else if (charCode < 48 || (charCode > 122 && charCode < 192) || (charCode > 57 && charCode < 65) || (charCode > 90 && charCode < 97)) {
                            // This is not an RFC 5321 subdomain, but still OK by RFC 5322
                            updateResult(internals.diagnoses.rfc5322Domain);
                        }

                        parseData.domain += token;
                        atomData.domains[elementCount] += token;
                        elementLength += Buffer.byteLength(token, 'utf8');
                }

                break;

                // Domain literal
            case internals.components.literal:
                // http://tools.ietf.org/html/rfc5322#section-3.4.1
                //   domain-literal  =   [CFWS] "[" *([FWS] dtext) [FWS] "]" [CFWS]
                //
                //   dtext           =   %d33-90 /          ; Printable US-ASCII
                //                       %d94-126 /         ;  characters not including
                //                       obs-dtext          ;  "[", "]", or "\"
                //
                //   obs-dtext       =   obs-NO-WS-CTL / quoted-pair
                switch (token) {
                    // End of domain literal
                    case ']':
                        if (maxResult < internals.categories.deprecated) {
                            // Could be a valid RFC 5321 address literal, so let's check

                            // http://tools.ietf.org/html/rfc5321#section-4.1.2
                            //   address-literal  = "[" ( IPv4-address-literal /
                            //                    IPv6-address-literal /
                            //                    General-address-literal ) "]"
                            //                    ; See Section 4.1.3
                            //
                            // http://tools.ietf.org/html/rfc5321#section-4.1.3
                            //   IPv4-address-literal  = Snum 3("."  Snum)
                            //
                            //   IPv6-address-literal  = "IPv6:" IPv6-addr
                            //
                            //   General-address-literal  = Standardized-tag ":" 1*dcontent
                            //
                            //   Standardized-tag  = Ldh-str
                            //                     ; Standardized-tag MUST be specified in a
                            //                     ; Standards-Track RFC and registered with IANA
                            //
                            //   dcontent      = %d33-90 / ; Printable US-ASCII
                            //                 %d94-126 ; excl. "[", "\", "]"
                            //
                            //   Snum          = 1*3DIGIT
                            //                 ; representing a decimal integer
                            //                 ; value in the range 0 through 255
                            //
                            //   IPv6-addr     = IPv6-full / IPv6-comp / IPv6v4-full / IPv6v4-comp
                            //
                            //   IPv6-hex      = 1*4HEXDIG
                            //
                            //   IPv6-full     = IPv6-hex 7(":" IPv6-hex)
                            //
                            //   IPv6-comp     = [IPv6-hex *5(":" IPv6-hex)] "::"
                            //                 [IPv6-hex *5(":" IPv6-hex)]
                            //                 ; The "::" represents at least 2 16-bit groups of
                            //                 ; zeros.  No more than 6 groups in addition to the
                            //                 ; "::" may be present.
                            //
                            //   IPv6v4-full   = IPv6-hex 5(":" IPv6-hex) ":" IPv4-address-literal
                            //
                            //   IPv6v4-comp   = [IPv6-hex *3(":" IPv6-hex)] "::"
                            //                 [IPv6-hex *3(":" IPv6-hex) ":"]
                            //                 IPv4-address-literal
                            //                 ; The "::" represents at least 2 16-bit groups of
                            //                 ; zeros.  No more than 4 groups in addition to the
                            //                 ; "::" and IPv4-address-literal may be present.

                            let index = -1;
                            let addressLiteral = parseData.literal;
                            const matchesIP = internals.regex.ipV4.exec(addressLiteral);

                            // Maybe extract IPv4 part from the end of the address-literal
                            if (matchesIP) {
                                index = matchesIP.index;
                                if (index !== 0) {
                                    // Convert IPv4 part to IPv6 format for futher testing
                                    addressLiteral = addressLiteral.slice(0, index) + '0:0';
                                }
                            }

                            if (index === 0) {
                                // Nothing there except a valid IPv4 address, so...
                                updateResult(internals.diagnoses.rfc5321AddressLiteral);
                            }
                            else if (addressLiteral.slice(0, 5).toLowerCase() !== 'ipv6:') {
                                updateResult(internals.diagnoses.rfc5322DomainLiteral);
                            }
                            else {
                                const match = addressLiteral.slice(5);
                                let maxGroups = internals.maxIPv6Groups;
                                const groups = match.split(':');
                                index = match.indexOf('::');

                                if (!~index) {
                                    // Need exactly the right number of groups
                                    if (groups.length !== maxGroups) {
                                        updateResult(internals.diagnoses.rfc5322IPv6GroupCount);
                                    }
                                }
                                else if (index !== match.lastIndexOf('::')) {
                                    updateResult(internals.diagnoses.rfc5322IPv62x2xColon);
                                }
                                else {
                                    if (index === 0 || index === match.length - 2) {
                                        // RFC 4291 allows :: at the start or end of an address with 7 other groups in addition
                                        ++maxGroups;
                                    }

                                    if (groups.length > maxGroups) {
                                        updateResult(internals.diagnoses.rfc5322IPv6MaxGroups);
                                    }
                                    else if (groups.length === maxGroups) {
                                        // Eliding a single "::"
                                        updateResult(internals.diagnoses.deprecatedIPv6);
                                    }
                                }

                                // IPv6 testing strategy
                                if (match[0] === ':' && match[1] !== ':') {
                                    updateResult(internals.diagnoses.rfc5322IPv6ColonStart);
                                }
                                else if (match[match.length - 1] === ':' && match[match.length - 2] !== ':') {
                                    updateResult(internals.diagnoses.rfc5322IPv6ColonEnd);
                                }
                                else if (internals.checkIpV6(groups)) {
                                    updateResult(internals.diagnoses.rfc5321AddressLiteral);
                                }
                                else {
                                    updateResult(internals.diagnoses.rfc5322IPv6BadCharacter);
                                }
                            }
                        }
                        else {
                            updateResult(internals.diagnoses.rfc5322DomainLiteral);
                        }

                        parseData.domain += token;
                        atomData.domains[elementCount] += token;
                        elementLength += Buffer.byteLength(token, 'utf8');
                        context.prev = context.now;
                        context.now = context.stack.pop();
                        break;

                    case '\\':
                        updateResult(internals.diagnoses.rfc5322DomainLiteralOBSDText);
                        context.stack.push(context.now);
                        context.now = internals.components.contextQuotedPair;
                        break;

                        // Folding white space
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            updateResult(internals.diagnoses.errCRNoLF);
                            break;
                        }

                        // Fallthrough

                    case ' ':
                    case '\t':
                        updateResult(internals.diagnoses.cfwsFWS);

                        context.stack.push(context.now);
                        context.now = internals.components.contextFWS;
                        prevToken = token;
                        break;

                        // DTEXT
                    default:
                        // http://tools.ietf.org/html/rfc5322#section-3.4.1
                        //   dtext         =   %d33-90 /  ; Printable US-ASCII
                        //                     %d94-126 / ;  characters not including
                        //                     obs-dtext  ;  "[", "]", or "\"
                        //
                        //   obs-dtext     =   obs-NO-WS-CTL / quoted-pair
                        //
                        //   obs-NO-WS-CTL =   %d1-8 /    ; US-ASCII control
                        //                     %d11 /     ;  characters that do not
                        //                     %d12 /     ;  include the carriage
                        //                     %d14-31 /  ;  return, line feed, and
                        //                     %d127      ;  white space characters
                        charCode = token.codePointAt(0);

                        // '\r', '\n', ' ', and '\t' have already been parsed above
                        if ((charCode !== 127 && internals.c1Controls(charCode)) || charCode === 0 || token === '[') {
                            // Fatal error
                            updateResult(internals.diagnoses.errExpectingDTEXT);
                            break;
                        }
                        else if (internals.c0Controls(charCode) || charCode === 127) {
                            updateResult(internals.diagnoses.rfc5322DomainLiteralOBSDText);
                        }

                        parseData.literal += token;
                        parseData.domain += token;
                        atomData.domains[elementCount] += token;
                        elementLength += Buffer.byteLength(token, 'utf8');
                }

                break;

                // Quoted string
            case internals.components.contextQuotedString:
                // http://tools.ietf.org/html/rfc5322#section-3.2.4
                //   quoted-string = [CFWS]
                //                   DQUOTE *([FWS] qcontent) [FWS] DQUOTE
                //                   [CFWS]
                //
                //   qcontent      = qtext / quoted-pair
                switch (token) {
                    // Quoted pair
                    case '\\':
                        context.stack.push(context.now);
                        context.now = internals.components.contextQuotedPair;
                        break;

                        // Folding white space. Spaces are allowed as regular characters inside a quoted string - it's only FWS if we include '\t' or '\r\n'
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            // Fatal error
                            updateResult(internals.diagnoses.errCRNoLF);
                            break;
                        }

                        // Fallthrough

                    case '\t':
                        // http://tools.ietf.org/html/rfc5322#section-3.2.2
                        //   Runs of FWS, comment, or CFWS that occur between lexical tokens in
                        //   a structured header field are semantically interpreted as a single
                        //   space character.

                        // http://tools.ietf.org/html/rfc5322#section-3.2.4
                        //   the CRLF in any FWS/CFWS that appears within the quoted-string [is]
                        //   semantically "invisible" and therefore not part of the
                        //   quoted-string

                        parseData.local += ' ';
                        atomData.locals[elementCount] += ' ';
                        elementLength += Buffer.byteLength(token, 'utf8');

                        updateResult(internals.diagnoses.cfwsFWS);
                        context.stack.push(context.now);
                        context.now = internals.components.contextFWS;
                        prevToken = token;
                        break;

                        // End of quoted string
                    case '"':
                        parseData.local += token;
                        atomData.locals[elementCount] += token;
                        elementLength += Buffer.byteLength(token, 'utf8');
                        context.prev = context.now;
                        context.now = context.stack.pop();
                        break;

                        // QTEXT
                    default:
                        // http://tools.ietf.org/html/rfc5322#section-3.2.4
                        //   qtext          =   %d33 /             ; Printable US-ASCII
                        //                      %d35-91 /          ;  characters not including
                        //                      %d93-126 /         ;  "\" or the quote character
                        //                      obs-qtext
                        //
                        //   obs-qtext      =   obs-NO-WS-CTL
                        //
                        //   obs-NO-WS-CTL  =   %d1-8 /            ; US-ASCII control
                        //                      %d11 /             ;  characters that do not
                        //                      %d12 /             ;  include the carriage
                        //                      %d14-31 /          ;  return, line feed, and
                        //                      %d127              ;  white space characters
                        charCode = token.codePointAt(0);

                        if ((charCode !== 127 && internals.c1Controls(charCode)) || charCode === 0 || charCode === 10) {
                            updateResult(internals.diagnoses.errExpectingQTEXT);
                        }
                        else if (internals.c0Controls(charCode) || charCode === 127) {
                            updateResult(internals.diagnoses.deprecatedQTEXT);
                        }

                        parseData.local += token;
                        atomData.locals[elementCount] += token;
                        elementLength += Buffer.byteLength(token, 'utf8');
                }

                // http://tools.ietf.org/html/rfc5322#section-3.4.1
                //   If the string can be represented as a dot-atom (that is, it contains
                //   no characters other than atext characters or "." surrounded by atext
                //   characters), then the dot-atom form SHOULD be used and the quoted-
                //   string form SHOULD NOT be used.

                break;
                // Quoted pair
            case internals.components.contextQuotedPair:
                // http://tools.ietf.org/html/rfc5322#section-3.2.1
                //   quoted-pair     =   ("\" (VCHAR / WSP)) / obs-qp
                //
                //   VCHAR           =  %d33-126   ; visible (printing) characters
                //   WSP             =  SP / HTAB  ; white space
                //
                //   obs-qp          =   "\" (%d0 / obs-NO-WS-CTL / LF / CR)
                //
                //   obs-NO-WS-CTL   =   %d1-8 /   ; US-ASCII control
                //                       %d11 /    ;  characters that do not
                //                       %d12 /    ;  include the carriage
                //                       %d14-31 / ;  return, line feed, and
                //                       %d127     ;  white space characters
                //
                // i.e. obs-qp       =  "\" (%d0-8, %d10-31 / %d127)
                charCode = token.codePointAt(0);

                if (charCode !== 127 &&  internals.c1Controls(charCode)) {
                    // Fatal error
                    updateResult(internals.diagnoses.errExpectingQPair);
                }
                else if ((charCode < 31 && charCode !== 9) || charCode === 127) {
                    // ' ' and '\t' are allowed
                    updateResult(internals.diagnoses.deprecatedQP);
                }

                // At this point we know where this qpair occurred so we could check to see if the character actually needed to be quoted at all.
                // http://tools.ietf.org/html/rfc5321#section-4.1.2
                //   the sending system SHOULD transmit the form that uses the minimum quoting possible.

                context.prev = context.now;
                // End of qpair
                context.now = context.stack.pop();
                const escapeToken = '\\' + token;

                switch (context.now) {
                    case internals.components.contextComment:
                        break;

                    case internals.components.contextQuotedString:
                        parseData.local += escapeToken;
                        atomData.locals[elementCount] += escapeToken;

                        // The maximum sizes specified by RFC 5321 are octet counts, so we must include the backslash
                        elementLength += 2;
                        break;

                    case internals.components.literal:
                        parseData.domain += escapeToken;
                        atomData.domains[elementCount] += escapeToken;

                        // The maximum sizes specified by RFC 5321 are octet counts, so we must include the backslash
                        elementLength += 2;
                        break;

                        // $lab:coverage:off$
                    default:
                        throw new Error('quoted pair logic invoked in an invalid context: ' + context.now);
                        // $lab:coverage:on$
                }
                break;

                // Comment
            case internals.components.contextComment:
                // http://tools.ietf.org/html/rfc5322#section-3.2.2
                //   comment  = "(" *([FWS] ccontent) [FWS] ")"
                //
                //   ccontent = ctext / quoted-pair / comment
                switch (token) {
                    // Nested comment
                    case '(':
                        // Nested comments are ok
                        context.stack.push(context.now);
                        context.now = internals.components.contextComment;
                        break;

                        // End of comment
                    case ')':
                        context.prev = context.now;
                        context.now = context.stack.pop();
                        break;

                        // Quoted pair
                    case '\\':
                        context.stack.push(context.now);
                        context.now = internals.components.contextQuotedPair;
                        break;

                        // Folding white space
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            // Fatal error
                            updateResult(internals.diagnoses.errCRNoLF);
                            break;
                        }

                        // Fallthrough

                    case ' ':
                    case '\t':
                        updateResult(internals.diagnoses.cfwsFWS);

                        context.stack.push(context.now);
                        context.now = internals.components.contextFWS;
                        prevToken = token;
                        break;

                        // CTEXT
                    default:
                        // http://tools.ietf.org/html/rfc5322#section-3.2.3
                        //   ctext         = %d33-39 /  ; Printable US-ASCII
                        //                   %d42-91 /  ;  characters not including
                        //                   %d93-126 / ;  "(", ")", or "\"
                        //                   obs-ctext
                        //
                        //   obs-ctext     = obs-NO-WS-CTL
                        //
                        //   obs-NO-WS-CTL = %d1-8 /    ; US-ASCII control
                        //                   %d11 /     ;  characters that do not
                        //                   %d12 /     ;  include the carriage
                        //                   %d14-31 /  ;  return, line feed, and
                        //                   %d127      ;  white space characters
                        charCode = token.codePointAt(0);

                        if (charCode === 0 || charCode === 10 || (charCode !== 127 && internals.c1Controls(charCode))) {
                            // Fatal error
                            updateResult(internals.diagnoses.errExpectingCTEXT);
                            break;
                        }
                        else if (internals.c0Controls(charCode) || charCode === 127) {
                            updateResult(internals.diagnoses.deprecatedCTEXT);
                        }
                }

                break;

                // Folding white space
            case internals.components.contextFWS:
                // http://tools.ietf.org/html/rfc5322#section-3.2.2
                //   FWS     =   ([*WSP CRLF] 1*WSP) /  obs-FWS
                //                                   ; Folding white space

                // But note the erratum:
                // http://www.rfc-editor.org/errata_search.php?rfc=5322&eid=1908:
                //   In the obsolete syntax, any amount of folding white space MAY be
                //   inserted where the obs-FWS rule is allowed.  This creates the
                //   possibility of having two consecutive "folds" in a line, and
                //   therefore the possibility that a line which makes up a folded header
                //   field could be composed entirely of white space.
                //
                //   obs-FWS =   1*([CRLF] WSP)

                if (prevToken === '\r') {
                    if (token === '\r') {
                        // Fatal error
                        updateResult(internals.diagnoses.errFWSCRLFx2);
                        break;
                    }

                    if (++crlfCount > 1) {
                        // Multiple folds => obsolete FWS
                        updateResult(internals.diagnoses.deprecatedFWS);
                    }
                    else {
                        crlfCount = 1;
                    }
                }

                switch (token) {
                    case '\r':
                        if (emailLength === ++i || email[i] !== '\n') {
                            // Fatal error
                            updateResult(internals.diagnoses.errCRNoLF);
                        }

                        break;

                    case ' ':
                    case '\t':
                        break;

                    default:
                        if (prevToken === '\r') {
                            // Fatal error
                            updateResult(internals.diagnoses.errFWSCRLFEnd);
                        }

                        crlfCount = 0;

                        // End of FWS
                        context.prev = context.now;
                        context.now = context.stack.pop();

                        // Look at this token again in the parent context
                        --i;
                }

                prevToken = token;
                break;

                // Unexpected context
                // $lab:coverage:off$
            default:
                throw new Error('unknown context: ' + context.now);
                // $lab:coverage:on$
        } // Primary state machine

        if (maxResult > internals.categories.rfc5322) {
            // Fatal error, no point continuing
            break;
        }
    } // Token loop

    // Check for errors
    if (maxResult < internals.categories.rfc5322) {
        const punycodeLength = Punycode.encode(parseData.domain).length;
        // Fatal errors
        if (context.now === internals.components.contextQuotedString) {
            updateResult(internals.diagnoses.errUnclosedQuotedString);
        }
        else if (context.now === internals.components.contextQuotedPair) {
            updateResult(internals.diagnoses.errBackslashEnd);
        }
        else if (context.now === internals.components.contextComment) {
            updateResult(internals.diagnoses.errUnclosedComment);
        }
        else if (context.now === internals.components.literal) {
            updateResult(internals.diagnoses.errUnclosedDomainLiteral);
        }
        else if (token === '\r') {
            updateResult(internals.diagnoses.errFWSCRLFEnd);
        }
        else if (parseData.domain.length === 0) {
            updateResult(internals.diagnoses.errNoDomain);
        }
        else if (elementLength === 0) {
            updateResult(internals.diagnoses.errDotEnd);
        }
        else if (hyphenFlag) {
            updateResult(internals.diagnoses.errDomainHyphenEnd);
        }

        // Other errors
        else if (punycodeLength > 255) {
            // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.2
            //   The maximum total length of a domain name or number is 255 octets.
            updateResult(internals.diagnoses.rfc5322DomainTooLong);
        }
        else if (Buffer.byteLength(parseData.local, 'utf8') + punycodeLength + /* '@' */ 1 > 254) {
            // http://tools.ietf.org/html/rfc5321#section-4.1.2
            //   Forward-path   = Path
            //
            //   Path           = "<" [ A-d-l ":" ] Mailbox ">"
            //
            // http://tools.ietf.org/html/rfc5321#section-4.5.3.1.3
            //   The maximum total length of a reverse-path or forward-path is 256 octets (including the punctuation and element separators).
            //
            // Thus, even without (obsolete) routing information, the Mailbox can only be 254 characters long. This is confirmed by this verified
            // erratum to RFC 3696:
            //
            // http://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
            //   However, there is a restriction in RFC 2821 on the length of an address in MAIL and RCPT commands of 254 characters.  Since
            //   addresses that do not fit in those fields are not normally useful, the upper limit on address lengths should normally be considered
            //   to be 254.
            updateResult(internals.diagnoses.rfc5322TooLong);
        }
        else if (elementLength > 63) {
            // http://tools.ietf.org/html/rfc1035#section-2.3.4
            // labels   63 octets or less
            updateResult(internals.diagnoses.rfc5322LabelTooLong);
        }
        else if (options.minDomainAtoms && atomData.domains.length < options.minDomainAtoms) {
            updateResult(internals.diagnoses.errDomainTooShort);
        }
        else if (options.tldWhitelist || options.tldBlacklist) {
            const tldAtom = atomData.domains[elementCount];

            if (!internals.validDomain(tldAtom, options)) {
                updateResult(internals.diagnoses.errUnknownTLD);
            }
        }
    } // Check for errors

    // Finish
    if (maxResult < internals.categories.dnsWarn) {
        // Per RFC 5321, domain atoms are limited to letter-digit-hyphen, so we only need to check code <= 57 to check for a digit
        const code = atomData.domains[elementCount].codePointAt(0);

        if (code <= 57) {
            updateResult(internals.diagnoses.rfc5321TLDNumeric);
        }
    }

    if (maxResult < threshold) {
        maxResult = internals.diagnoses.valid;
    }

    const finishResult = diagnose ? maxResult : maxResult < internals.defaultThreshold;

    if (callback) {
        callback(finishResult);
    }

    return finishResult;
};


exports.diagnoses = internals.validate.diagnoses = (function () {

    const diag = {};
    const keys = Object.keys(internals.diagnoses);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        diag[key] = internals.diagnoses[key];
    }

    return diag;
})();


exports.normalize = internals.normalize = function (email) {

    // $lab:coverage:off$
    if (process.version[1] === '4' && email.indexOf('\u0000') >= 0) {
        return internals.nulNormalize(email);
    }
    // $lab:coverage:on$


    return email.normalize('NFC');
};


/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = require("punycode");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = {"name":"joi","description":"Object schema validation","version":"13.1.2","homepage":"https://github.com/hapijs/joi","repository":"git://github.com/hapijs/joi","main":"lib/index.js","keywords":["hapi","schema","validation"],"engines":{"node":">=8.9.0"},"dependencies":{"hoek":"5.x.x","isemail":"3.x.x","topo":"3.x.x"},"devDependencies":{"code":"5.x.x","hapitoc":"1.x.x","lab":"15.x.x"},"scripts":{"test":"lab -t 100 -a code -L","test-debug":"lab -a code","test-cov-html":"lab -r html -o coverage.html -a code","toc":"hapitoc","version":"npm run toc && git add API.md README.md"},"license":"BSD-3-Clause"}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Joi = __webpack_require__(22);
var assignIn = __webpack_require__(45);
var find = __webpack_require__(46);
var defaults = __webpack_require__(47);
var ValidationError = __webpack_require__(48);

var defaultOptions = {
  contextRequest: false,
  allowUnknownHeaders: true,
  allowUnknownBody: true,
  allowUnknownQuery: true,
  allowUnknownParams: true,
  allowUnknownCookies: true,
  status: 400,
  statusText: 'Bad Request'
};
var globalOptions = {};

// maps the corresponding request object to an `express-validation` option
var unknownMap = {
  headers: 'allowUnknownHeaders',
  body: 'allowUnknownBody',
  query: 'allowUnknownQuery',
  params: 'allowUnknownParams',
  cookies: 'allowUnknownCookies'
};

exports = module.exports = function (schema) {
  if (!schema) throw new Error('Please provide a validation schema');

  return function (req, res, next)  {
    var errors = [];

    // Set default options
    var options = defaults({}, schema.options || {}, globalOptions, defaultOptions);

    // NOTE: mutates `errors`
    ['headers', 'body', 'query', 'params', 'cookies'].forEach(function (key) {
      var allowUnknown = options[unknownMap[key]];
      var entireContext = options.contextRequest ? req : null;
      if (schema[key]) validate(errors, req[key], schema[key], key, allowUnknown, entireContext);
    });

    if (errors && errors.length === 0) return next();

    return next(new ValidationError(errors, options));
  };
};

exports.ValidationError = ValidationError;

exports.options = function (opts) {
  if (!opts) {
    globalOptions = {};
    return;
  }

  globalOptions = defaults({}, globalOptions, opts);
};

/**
 * validate checks the current `Request` for validations
 * NOTE: mutates `request` in case the object is valid.
 */
function validate (errObj, request, schema, location, allowUnknown, context) {
  if (!request || !schema) return;

  var joiOptions = {
    context: context || request,
    allowUnknown: allowUnknown,
    abortEarly: false
  };

  Joi.validate(request, schema, joiOptions, function (errors, value) {
    if (!errors || errors.details.length === 0) {
      assignIn(request, value); // joi responses are parsed into JSON
      return;
    }
    errors.details.forEach(function (error) {
      var errorExists = find(errObj, function (item) {
        if (item && item.field === error.path && item.location === location) {
          item.messages.push(error.message);
          item.types.push(error.type);
          return item;
        }
        return;
      });

      if (!errorExists) {
        errObj.push({
          field: error.path,
          location: location,
          messages: [error.message],
          types: [error.type]
        });
      }

    });
  });
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("lodash/assignIn");

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = require("lodash/find");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("lodash/defaults");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var map = __webpack_require__(49);
var flatten = __webpack_require__(50);

function ValidationError (errors, options) {
  this.message = 'validation error';
  this.errors = errors;
  this.flatten = options.flatten;
  this.status = options.status;
  this.statusText = options.statusText;
};
ValidationError.prototype = Object.create(Error.prototype);

ValidationError.prototype.toString = function () {
  return JSON.stringify(this.toJSON());
};

ValidationError.prototype.toJSON = function () {
  if (this.flatten) return flatten(map(this.errors, 'messages'));
  return {
    status: this.status,
    statusText: this.statusText,
    errors: this.errors
  };
};

module.exports = ValidationError;


/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("lodash/map");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("lodash/flatten");

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var crypto = __webpack_require__(52);

var BCRYPT_SALT_LEN = 16;

var GENSALT_DEFAULT_LOG2_ROUNDS = 10;
var BLOWFISH_NUM_ROUNDS = 16;

var MAX_EXECUTION_TIME = 100;
var P_orig = [0x243f6a88, 0x85a308d3, 0x13198a2e, 0x03707344, 0xa4093822,
		0x299f31d0, 0x082efa98, 0xec4e6c89, 0x452821e6, 0x38d01377,
		0xbe5466cf, 0x34e90c6c, 0xc0ac29b7, 0xc97c50dd, 0x3f84d5b5,
		0xb5470917, 0x9216d5d9, 0x8979fb1b];
var S_orig = [0xd1310ba6, 0x98dfb5ac, 0x2ffd72db, 0xd01adfb7, 0xb8e1afed,
		0x6a267e96, 0xba7c9045, 0xf12c7f99, 0x24a19947, 0xb3916cf7,
		0x0801f2e2, 0x858efc16, 0x636920d8, 0x71574e69, 0xa458fea3,
		0xf4933d7e, 0x0d95748f, 0x728eb658, 0x718bcd58, 0x82154aee,
		0x7b54a41d, 0xc25a59b5, 0x9c30d539, 0x2af26013, 0xc5d1b023,
		0x286085f0, 0xca417918, 0xb8db38ef, 0x8e79dcb0, 0x603a180e,
		0x6c9e0e8b, 0xb01e8a3e, 0xd71577c1, 0xbd314b27, 0x78af2fda,
		0x55605c60, 0xe65525f3, 0xaa55ab94, 0x57489862, 0x63e81440,
		0x55ca396a, 0x2aab10b6, 0xb4cc5c34, 0x1141e8ce, 0xa15486af,
		0x7c72e993, 0xb3ee1411, 0x636fbc2a, 0x2ba9c55d, 0x741831f6,
		0xce5c3e16, 0x9b87931e, 0xafd6ba33, 0x6c24cf5c, 0x7a325381,
		0x28958677, 0x3b8f4898, 0x6b4bb9af, 0xc4bfe81b, 0x66282193,
		0x61d809cc, 0xfb21a991, 0x487cac60, 0x5dec8032, 0xef845d5d,
		0xe98575b1, 0xdc262302, 0xeb651b88, 0x23893e81, 0xd396acc5,
		0x0f6d6ff3, 0x83f44239, 0x2e0b4482, 0xa4842004, 0x69c8f04a,
		0x9e1f9b5e, 0x21c66842, 0xf6e96c9a, 0x670c9c61, 0xabd388f0,
		0x6a51a0d2, 0xd8542f68, 0x960fa728, 0xab5133a3, 0x6eef0b6c,
		0x137a3be4, 0xba3bf050, 0x7efb2a98, 0xa1f1651d, 0x39af0176,
		0x66ca593e, 0x82430e88, 0x8cee8619, 0x456f9fb4, 0x7d84a5c3,
		0x3b8b5ebe, 0xe06f75d8, 0x85c12073, 0x401a449f, 0x56c16aa6,
		0x4ed3aa62, 0x363f7706, 0x1bfedf72, 0x429b023d, 0x37d0d724,
		0xd00a1248, 0xdb0fead3, 0x49f1c09b, 0x075372c9, 0x80991b7b,
		0x25d479d8, 0xf6e8def7, 0xe3fe501a, 0xb6794c3b, 0x976ce0bd,
		0x04c006ba, 0xc1a94fb6, 0x409f60c4, 0x5e5c9ec2, 0x196a2463,
		0x68fb6faf, 0x3e6c53b5, 0x1339b2eb, 0x3b52ec6f, 0x6dfc511f,
		0x9b30952c, 0xcc814544, 0xaf5ebd09, 0xbee3d004, 0xde334afd,
		0x660f2807, 0x192e4bb3, 0xc0cba857, 0x45c8740f, 0xd20b5f39,
		0xb9d3fbdb, 0x5579c0bd, 0x1a60320a, 0xd6a100c6, 0x402c7279,
		0x679f25fe, 0xfb1fa3cc, 0x8ea5e9f8, 0xdb3222f8, 0x3c7516df,
		0xfd616b15, 0x2f501ec8, 0xad0552ab, 0x323db5fa, 0xfd238760,
		0x53317b48, 0x3e00df82, 0x9e5c57bb, 0xca6f8ca0, 0x1a87562e,
		0xdf1769db, 0xd542a8f6, 0x287effc3, 0xac6732c6, 0x8c4f5573,
		0x695b27b0, 0xbbca58c8, 0xe1ffa35d, 0xb8f011a0, 0x10fa3d98,
		0xfd2183b8, 0x4afcb56c, 0x2dd1d35b, 0x9a53e479, 0xb6f84565,
		0xd28e49bc, 0x4bfb9790, 0xe1ddf2da, 0xa4cb7e33, 0x62fb1341,
		0xcee4c6e8, 0xef20cada, 0x36774c01, 0xd07e9efe, 0x2bf11fb4,
		0x95dbda4d, 0xae909198, 0xeaad8e71, 0x6b93d5a0, 0xd08ed1d0,
		0xafc725e0, 0x8e3c5b2f, 0x8e7594b7, 0x8ff6e2fb, 0xf2122b64,
		0x8888b812, 0x900df01c, 0x4fad5ea0, 0x688fc31c, 0xd1cff191,
		0xb3a8c1ad, 0x2f2f2218, 0xbe0e1777, 0xea752dfe, 0x8b021fa1,
		0xe5a0cc0f, 0xb56f74e8, 0x18acf3d6, 0xce89e299, 0xb4a84fe0,
		0xfd13e0b7, 0x7cc43b81, 0xd2ada8d9, 0x165fa266, 0x80957705,
		0x93cc7314, 0x211a1477, 0xe6ad2065, 0x77b5fa86, 0xc75442f5,
		0xfb9d35cf, 0xebcdaf0c, 0x7b3e89a0, 0xd6411bd3, 0xae1e7e49,
		0x00250e2d, 0x2071b35e, 0x226800bb, 0x57b8e0af, 0x2464369b,
		0xf009b91e, 0x5563911d, 0x59dfa6aa, 0x78c14389, 0xd95a537f,
		0x207d5ba2, 0x02e5b9c5, 0x83260376, 0x6295cfa9, 0x11c81968,
		0x4e734a41, 0xb3472dca, 0x7b14a94a, 0x1b510052, 0x9a532915,
		0xd60f573f, 0xbc9bc6e4, 0x2b60a476, 0x81e67400, 0x08ba6fb5,
		0x571be91f, 0xf296ec6b, 0x2a0dd915, 0xb6636521, 0xe7b9f9b6,
		0xff34052e, 0xc5855664, 0x53b02d5d, 0xa99f8fa1, 0x08ba4799,
		0x6e85076a, 0x4b7a70e9, 0xb5b32944, 0xdb75092e, 0xc4192623,
		0xad6ea6b0, 0x49a7df7d, 0x9cee60b8, 0x8fedb266, 0xecaa8c71,
		0x699a17ff, 0x5664526c, 0xc2b19ee1, 0x193602a5, 0x75094c29,
		0xa0591340, 0xe4183a3e, 0x3f54989a, 0x5b429d65, 0x6b8fe4d6,
		0x99f73fd6, 0xa1d29c07, 0xefe830f5, 0x4d2d38e6, 0xf0255dc1,
		0x4cdd2086, 0x8470eb26, 0x6382e9c6, 0x021ecc5e, 0x09686b3f,
		0x3ebaefc9, 0x3c971814, 0x6b6a70a1, 0x687f3584, 0x52a0e286,
		0xb79c5305, 0xaa500737, 0x3e07841c, 0x7fdeae5c, 0x8e7d44ec,
		0x5716f2b8, 0xb03ada37, 0xf0500c0d, 0xf01c1f04, 0x0200b3ff,
		0xae0cf51a, 0x3cb574b2, 0x25837a58, 0xdc0921bd, 0xd19113f9,
		0x7ca92ff6, 0x94324773, 0x22f54701, 0x3ae5e581, 0x37c2dadc,
		0xc8b57634, 0x9af3dda7, 0xa9446146, 0x0fd0030e, 0xecc8c73e,
		0xa4751e41, 0xe238cd99, 0x3bea0e2f, 0x3280bba1, 0x183eb331,
		0x4e548b38, 0x4f6db908, 0x6f420d03, 0xf60a04bf, 0x2cb81290,
		0x24977c79, 0x5679b072, 0xbcaf89af, 0xde9a771f, 0xd9930810,
		0xb38bae12, 0xdccf3f2e, 0x5512721f, 0x2e6b7124, 0x501adde6,
		0x9f84cd87, 0x7a584718, 0x7408da17, 0xbc9f9abc, 0xe94b7d8c,
		0xec7aec3a, 0xdb851dfa, 0x63094366, 0xc464c3d2, 0xef1c1847,
		0x3215d908, 0xdd433b37, 0x24c2ba16, 0x12a14d43, 0x2a65c451,
		0x50940002, 0x133ae4dd, 0x71dff89e, 0x10314e55, 0x81ac77d6,
		0x5f11199b, 0x043556f1, 0xd7a3c76b, 0x3c11183b, 0x5924a509,
		0xf28fe6ed, 0x97f1fbfa, 0x9ebabf2c, 0x1e153c6e, 0x86e34570,
		0xeae96fb1, 0x860e5e0a, 0x5a3e2ab3, 0x771fe71c, 0x4e3d06fa,
		0x2965dcb9, 0x99e71d0f, 0x803e89d6, 0x5266c825, 0x2e4cc978,
		0x9c10b36a, 0xc6150eba, 0x94e2ea78, 0xa5fc3c53, 0x1e0a2df4,
		0xf2f74ea7, 0x361d2b3d, 0x1939260f, 0x19c27960, 0x5223a708,
		0xf71312b6, 0xebadfe6e, 0xeac31f66, 0xe3bc4595, 0xa67bc883,
		0xb17f37d1, 0x018cff28, 0xc332ddef, 0xbe6c5aa5, 0x65582185,
		0x68ab9802, 0xeecea50f, 0xdb2f953b, 0x2aef7dad, 0x5b6e2f84,
		0x1521b628, 0x29076170, 0xecdd4775, 0x619f1510, 0x13cca830,
		0xeb61bd96, 0x0334fe1e, 0xaa0363cf, 0xb5735c90, 0x4c70a239,
		0xd59e9e0b, 0xcbaade14, 0xeecc86bc, 0x60622ca7, 0x9cab5cab,
		0xb2f3846e, 0x648b1eaf, 0x19bdf0ca, 0xa02369b9, 0x655abb50,
		0x40685a32, 0x3c2ab4b3, 0x319ee9d5, 0xc021b8f7, 0x9b540b19,
		0x875fa099, 0x95f7997e, 0x623d7da8, 0xf837889a, 0x97e32d77,
		0x11ed935f, 0x16681281, 0x0e358829, 0xc7e61fd6, 0x96dedfa1,
		0x7858ba99, 0x57f584a5, 0x1b227263, 0x9b83c3ff, 0x1ac24696,
		0xcdb30aeb, 0x532e3054, 0x8fd948e4, 0x6dbc3128, 0x58ebf2ef,
		0x34c6ffea, 0xfe28ed61, 0xee7c3c73, 0x5d4a14d9, 0xe864b7e3,
		0x42105d14, 0x203e13e0, 0x45eee2b6, 0xa3aaabea, 0xdb6c4f15,
		0xfacb4fd0, 0xc742f442, 0xef6abbb5, 0x654f3b1d, 0x41cd2105,
		0xd81e799e, 0x86854dc7, 0xe44b476a, 0x3d816250, 0xcf62a1f2,
		0x5b8d2646, 0xfc8883a0, 0xc1c7b6a3, 0x7f1524c3, 0x69cb7492,
		0x47848a0b, 0x5692b285, 0x095bbf00, 0xad19489d, 0x1462b174,
		0x23820e00, 0x58428d2a, 0x0c55f5ea, 0x1dadf43e, 0x233f7061,
		0x3372f092, 0x8d937e41, 0xd65fecf1, 0x6c223bdb, 0x7cde3759,
		0xcbee7460, 0x4085f2a7, 0xce77326e, 0xa6078084, 0x19f8509e,
		0xe8efd855, 0x61d99735, 0xa969a7aa, 0xc50c06c2, 0x5a04abfc,
		0x800bcadc, 0x9e447a2e, 0xc3453484, 0xfdd56705, 0x0e1e9ec9,
		0xdb73dbd3, 0x105588cd, 0x675fda79, 0xe3674340, 0xc5c43465,
		0x713e38d8, 0x3d28f89e, 0xf16dff20, 0x153e21e7, 0x8fb03d4a,
		0xe6e39f2b, 0xdb83adf7, 0xe93d5a68, 0x948140f7, 0xf64c261c,
		0x94692934, 0x411520f7, 0x7602d4f7, 0xbcf46b2e, 0xd4a20068,
		0xd4082471, 0x3320f46a, 0x43b7d4b7, 0x500061af, 0x1e39f62e,
		0x97244546, 0x14214f74, 0xbf8b8840, 0x4d95fc1d, 0x96b591af,
		0x70f4ddd3, 0x66a02f45, 0xbfbc09ec, 0x03bd9785, 0x7fac6dd0,
		0x31cb8504, 0x96eb27b3, 0x55fd3941, 0xda2547e6, 0xabca0a9a,
		0x28507825, 0x530429f4, 0x0a2c86da, 0xe9b66dfb, 0x68dc1462,
		0xd7486900, 0x680ec0a4, 0x27a18dee, 0x4f3ffea2, 0xe887ad8c,
		0xb58ce006, 0x7af4d6b6, 0xaace1e7c, 0xd3375fec, 0xce78a399,
		0x406b2a42, 0x20fe9e35, 0xd9f385b9, 0xee39d7ab, 0x3b124e8b,
		0x1dc9faf7, 0x4b6d1856, 0x26a36631, 0xeae397b2, 0x3a6efa74,
		0xdd5b4332, 0x6841e7f7, 0xca7820fb, 0xfb0af54e, 0xd8feb397,
		0x454056ac, 0xba489527, 0x55533a3a, 0x20838d87, 0xfe6ba9b7,
		0xd096954b, 0x55a867bc, 0xa1159a58, 0xcca92963, 0x99e1db33,
		0xa62a4a56, 0x3f3125f9, 0x5ef47e1c, 0x9029317c, 0xfdf8e802,
		0x04272f70, 0x80bb155c, 0x05282ce3, 0x95c11548, 0xe4c66d22,
		0x48c1133f, 0xc70f86dc, 0x07f9c9ee, 0x41041f0f, 0x404779a4,
		0x5d886e17, 0x325f51eb, 0xd59bc0d1, 0xf2bcc18f, 0x41113564,
		0x257b7834, 0x602a9c60, 0xdff8e8a3, 0x1f636c1b, 0x0e12b4c2,
		0x02e1329e, 0xaf664fd1, 0xcad18115, 0x6b2395e0, 0x333e92e1,
		0x3b240b62, 0xeebeb922, 0x85b2a20e, 0xe6ba0d99, 0xde720c8c,
		0x2da2f728, 0xd0127845, 0x95b794fd, 0x647d0862, 0xe7ccf5f0,
		0x5449a36f, 0x877d48fa, 0xc39dfd27, 0xf33e8d1e, 0x0a476341,
		0x992eff74, 0x3a6f6eab, 0xf4f8fd37, 0xa812dc60, 0xa1ebddf8,
		0x991be14c, 0xdb6e6b0d, 0xc67b5510, 0x6d672c37, 0x2765d43b,
		0xdcd0e804, 0xf1290dc7, 0xcc00ffa3, 0xb5390f92, 0x690fed0b,
		0x667b9ffb, 0xcedb7d9c, 0xa091cf0b, 0xd9155ea3, 0xbb132f88,
		0x515bad24, 0x7b9479bf, 0x763bd6eb, 0x37392eb3, 0xcc115979,
		0x8026e297, 0xf42e312d, 0x6842ada7, 0xc66a2b3b, 0x12754ccc,
		0x782ef11c, 0x6a124237, 0xb79251e7, 0x06a1bbe6, 0x4bfb6350,
		0x1a6b1018, 0x11caedfa, 0x3d25bdd8, 0xe2e1c3c9, 0x44421659,
		0x0a121386, 0xd90cec6e, 0xd5abea2a, 0x64af674e, 0xda86a85f,
		0xbebfe988, 0x64e4c3fe, 0x9dbc8057, 0xf0f7c086, 0x60787bf8,
		0x6003604d, 0xd1fd8346, 0xf6381fb0, 0x7745ae04, 0xd736fccc,
		0x83426b33, 0xf01eab71, 0xb0804187, 0x3c005e5f, 0x77a057be,
		0xbde8ae24, 0x55464299, 0xbf582e61, 0x4e58f48f, 0xf2ddfda2,
		0xf474ef38, 0x8789bdc2, 0x5366f9c3, 0xc8b38e74, 0xb475f255,
		0x46fcd9b9, 0x7aeb2661, 0x8b1ddf84, 0x846a0e79, 0x915f95e2,
		0x466e598e, 0x20b45770, 0x8cd55591, 0xc902de4c, 0xb90bace1,
		0xbb8205d0, 0x11a86248, 0x7574a99e, 0xb77f19b6, 0xe0a9dc09,
		0x662d09a1, 0xc4324633, 0xe85a1f02, 0x09f0be8c, 0x4a99a025,
		0x1d6efe10, 0x1ab93d1d, 0x0ba5a4df, 0xa186f20f, 0x2868f169,
		0xdcb7da83, 0x573906fe, 0xa1e2ce9b, 0x4fcd7f52, 0x50115e01,
		0xa70683fa, 0xa002b5c4, 0x0de6d027, 0x9af88c27, 0x773f8641,
		0xc3604c06, 0x61a806b5, 0xf0177a28, 0xc0f586e0, 0x006058aa,
		0x30dc7d62, 0x11e69ed7, 0x2338ea63, 0x53c2dd94, 0xc2c21634,
		0xbbcbee56, 0x90bcb6de, 0xebfc7da1, 0xce591d76, 0x6f05e409,
		0x4b7c0188, 0x39720a3d, 0x7c927c24, 0x86e3725f, 0x724d9db9,
		0x1ac15bb4, 0xd39eb8fc, 0xed545578, 0x08fca5b5, 0xd83d7cd3,
		0x4dad0fc4, 0x1e50ef5e, 0xb161e6f8, 0xa28514d9, 0x6c51133c,
		0x6fd5c7e7, 0x56e14ec4, 0x362abfce, 0xddc6c837, 0xd79a3234,
		0x92638212, 0x670efa8e, 0x406000e0, 0x3a39ce37, 0xd3faf5cf,
		0xabc27737, 0x5ac52d1b, 0x5cb0679e, 0x4fa33742, 0xd3822740,
		0x99bc9bbe, 0xd5118e9d, 0xbf0f7315, 0xd62d1c7e, 0xc700c47b,
		0xb78c1b6b, 0x21a19045, 0xb26eb1be, 0x6a366eb4, 0x5748ab2f,
		0xbc946e79, 0xc6a376d2, 0x6549c2c8, 0x530ff8ee, 0x468dde7d,
		0xd5730a1d, 0x4cd04dc6, 0x2939bbdb, 0xa9ba4650, 0xac9526e8,
		0xbe5ee304, 0xa1fad5f0, 0x6a2d519a, 0x63ef8ce2, 0x9a86ee22,
		0xc089c2b8, 0x43242ef6, 0xa51e03aa, 0x9cf2d0a4, 0x83c061ba,
		0x9be96a4d, 0x8fe51550, 0xba645bd6, 0x2826a2f9, 0xa73a3ae1,
		0x4ba99586, 0xef5562e9, 0xc72fefd3, 0xf752f7da, 0x3f046f69,
		0x77fa0a59, 0x80e4a915, 0x87b08601, 0x9b09e6ad, 0x3b3ee593,
		0xe990fd5a, 0x9e34d797, 0x2cf0b7d9, 0x022b8b51, 0x96d5ac3a,
		0x017da67d, 0xd1cf3ed6, 0x7c7d2d28, 0x1f9f25cf, 0xadf2b89b,
		0x5ad6b472, 0x5a88f54c, 0xe029ac71, 0xe019a5e6, 0x47b0acfd,
		0xed93fa9b, 0xe8d3c48d, 0x283b57cc, 0xf8d56629, 0x79132e28,
		0x785f0191, 0xed756055, 0xf7960e44, 0xe3d35e8c, 0x15056dd4,
		0x88f46dba, 0x03a16125, 0x0564f0bd, 0xc3eb9e15, 0x3c9057a2,
		0x97271aec, 0xa93a072a, 0x1b3f6d9b, 0x1e6321f5, 0xf59c66fb,
		0x26dcf319, 0x7533d928, 0xb155fdf5, 0x03563482, 0x8aba3cbb,
		0x28517711, 0xc20ad9f8, 0xabcc5167, 0xccad925f, 0x4de81751,
		0x3830dc8e, 0x379d5862, 0x9320f991, 0xea7a90c2, 0xfb3e7bce,
		0x5121ce64, 0x774fbe32, 0xa8b6e37e, 0xc3293d46, 0x48de5369,
		0x6413e680, 0xa2ae0810, 0xdd6db224, 0x69852dfd, 0x09072166,
		0xb39a460a, 0x6445c0dd, 0x586cdecf, 0x1c20c8ae, 0x5bbef7dd,
		0x1b588d40, 0xccd2017f, 0x6bb4e3bb, 0xdda26a7e, 0x3a59ff45,
		0x3e350a44, 0xbcb4cdd5, 0x72eacea8, 0xfa6484bb, 0x8d6612ae,
		0xbf3c6f47, 0xd29be463, 0x542f5d9e, 0xaec2771b, 0xf64e6370,
		0x740e0d8d, 0xe75b1357, 0xf8721671, 0xaf537d5d, 0x4040cb08,
		0x4eb4e2cc, 0x34d2466a, 0x0115af84, 0xe1b00428, 0x95983a1d,
		0x06b89fb4, 0xce6ea048, 0x6f3f3b82, 0x3520ab82, 0x011a1d4b,
		0x277227f8, 0x611560b1, 0xe7933fdc, 0xbb3a792b, 0x344525bd,
		0xa08839e1, 0x51ce794b, 0x2f32c9b7, 0xa01fbac9, 0xe01cc87e,
		0xbcc7d1f6, 0xcf0111c3, 0xa1e8aac7, 0x1a908749, 0xd44fbd9a,
		0xd0dadecb, 0xd50ada38, 0x0339c32a, 0xc6913667, 0x8df9317c,
		0xe0b12b4f, 0xf79e59b7, 0x43f5bb3a, 0xf2d519ff, 0x27d9459c,
		0xbf97222c, 0x15e6fc2a, 0x0f91fc71, 0x9b941525, 0xfae59361,
		0xceb69ceb, 0xc2a86459, 0x12baa8d1, 0xb6c1075e, 0xe3056a0c,
		0x10d25065, 0xcb03a442, 0xe0ec6e0e, 0x1698db3b, 0x4c98a0be,
		0x3278e964, 0x9f1f9532, 0xe0d392df, 0xd3a0342b, 0x8971f21e,
		0x1b0a7441, 0x4ba3348c, 0xc5be7120, 0xc37632d8, 0xdf359f8d,
		0x9b992f2e, 0xe60b6f47, 0x0fe3f11d, 0xe54cda54, 0x1edad891,
		0xce6279cf, 0xcd3e7e6f, 0x1618b166, 0xfd2c1d05, 0x848fd2c5,
		0xf6fb2299, 0xf523f357, 0xa6327623, 0x93a83531, 0x56cccd02,
		0xacf08162, 0x5a75ebb5, 0x6e163697, 0x88d273cc, 0xde966292,
		0x81b949d0, 0x4c50901b, 0x71c65614, 0xe6c6c7bd, 0x327a140a,
		0x45e1d006, 0xc3f27b9a, 0xc9aa53fd, 0x62a80f00, 0xbb25bfe2,
		0x35bdd2f6, 0x71126905, 0xb2040222, 0xb6cbcf7c, 0xcd769c2b,
		0x53113ec0, 0x1640e3d3, 0x38abbd60, 0x2547adf0, 0xba38209c,
		0xf746ce76, 0x77afa1c5, 0x20756060, 0x85cbfe4e, 0x8ae88dd8,
		0x7aaaf9b0, 0x4cf9aa7e, 0x1948c25c, 0x02fb8a8c, 0x01c36ae4,
		0xd6ebe1f9, 0x90d4f869, 0xa65cdea0, 0x3f09252d, 0xc208e69f,
		0xb74e6132, 0xce77e25b, 0x578fdfe3, 0x3ac372e6];
var bf_crypt_ciphertext = [0x4f727068, 0x65616e42, 0x65686f6c, 0x64657253,
		0x63727944, 0x6f756274];
var base64_code = ['.', '/', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
		'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
		'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
		'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
		'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8',
		'9'];
var index_64 = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
		-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 1,
		54, 55, 56, 57, 58, 59, 60, 61, 62, 63, -1, -1, -1, -1, -1, -1, -1,
		2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, -1, -1, -1, -1, -1, -1, 28, 29, 30, 31,
		32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
		49, 50, 51, 52, 53, -1, -1, -1, -1, -1];

function getByte(c) {
	var ret = 0;
	try {
		var b = c.charCodeAt(0);
	} catch (err) {
		b = c;
	}
	if (b > 127) {
		return -128 + (b % 128);
	} else {
		return b;
	}
};

function encode_base64(d, len) {
	var off = 0;
	var rs = [];
	var c1;
	var c2;
	if (len <= 0 || len > d.length)
		throw "Invalid len";
	while (off < len) {
		c1 = d[off++] & 0xff;
		rs.push(base64_code[(c1 >> 2) & 0x3f]);
		c1 = (c1 & 0x03) << 4;
		if (off >= len) {
			rs.push(base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 4) & 0x0f;
		rs.push(base64_code[c1 & 0x3f]);
		c1 = (c2 & 0x0f) << 2;
		if (off >= len) {
			rs.push(base64_code[c1 & 0x3f]);
			break;
		}
		c2 = d[off++] & 0xff;
		c1 |= (c2 >> 6) & 0x03;
		rs.push(base64_code[c1 & 0x3f]);
		rs.push(base64_code[c2 & 0x3f]);
	}
	return rs.join('');
};

function char64(x) {
	var code = x.charCodeAt(0);
	if (code < 0 || code > index_64.length) {
		return -1;
	}
	return index_64[code];
};

function decode_base64(s, maxolen) {
	var off = 0;
	var slen = s.length;
	var olen = 0;
	var rs = [];
	var c1, c2, c3, c4, o;
	if (maxolen <= 0) throw "Invalid maxolen";
	while (off < slen - 1 && olen < maxolen) {
		c1 = char64(s.charAt(off++));
		c2 = char64(s.charAt(off++));
		if (c1 == -1 || c2 == -1) {
			break;
		}
		o = getByte(c1 << 2);
		o |= (c2 & 0x30) >> 4;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c3 = char64(s.charAt(off++));
		if (c3 == -1) {
			break;
		}
		o = getByte((c2 & 0x0f) << 4);
		o |= (c3 & 0x3c) >> 2;
		rs.push(String.fromCharCode(o));
		if (++olen >= maxolen || off >= slen) {
			break;
		}
		c4 = char64(s.charAt(off++));
		o = getByte((c3 & 0x03) << 6);
		o |= c4;
		rs.push(String.fromCharCode(o));
		++olen;
	}
	var ret = [];
	for (off = 0; off < olen; off++) {
		ret.push(getByte(rs[off]));
	}
	return ret;
};

function encipher(lr, off, P, S) {
	var i;
	var n;
	var l = lr[off];
	var r = lr[off + 1];

	l ^= P[0];
	for (i = 0; i <= BLOWFISH_NUM_ROUNDS - 2;) {
		// Feistel substitution on left word
		n = S[(l >> 24) & 0xff];
		n += S[0x100 | ((l >> 16) & 0xff)];
		n ^= S[0x200 | ((l >> 8) & 0xff)];
		n += S[0x300 | (l & 0xff)];
		r ^= n ^ P[++i];

		// Feistel substitution on right word
		n = S[(r >> 24) & 0xff];
		n += S[0x100 | ((r >> 16) & 0xff)];
		n ^= S[0x200 | ((r >> 8) & 0xff)];
		n += S[0x300 | (r & 0xff)];
		l ^= n ^ P[++i];
	}
	lr[off] = r ^ P[BLOWFISH_NUM_ROUNDS + 1];
	lr[off + 1] = l;
	return lr;
};

function streamtoword(data, offp) {
	var i;
	var word = 0;
	for (i = 0; i < 4; i++) {
		word = (word << 8) | (data[offp] & 0xff);
		offp = (offp + 1) % data.length;
	}
	return {key:word, offp:offp};
};

function key(key, P, S) {
	var i;
	var offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = P.length;
	var slen = S.length;

	for (i = 0; i < plen; i++) {
		var sw = streamtoword(key, offp);
		offp = sw.offp;
		P[i] = P[i] ^ sw.key;
	}
	for (i = 0; i < plen; i += 2) {
		lr = encipher(lr, 0, P, S);
		P[i] = lr[0];
		P[i + 1] = lr[1];
	}

	for (i = 0; i < slen; i += 2) {
		lr = encipher(lr, 0, P, S);
		S[i] = lr[0];
		S[i + 1] = lr[1];
	}
};

function ekskey(data, key, P, S) {
	var i;
	var offp = 0;
	var lr = new Array(0x00000000, 0x00000000);
	var plen = P.length;
	var slen = S.length;
	var sw;

	for (i = 0; i < plen; i++) {
		sw = streamtoword(key, offp);
		offp = sw.offp;
		P[i] = P[i] ^ sw.key;
	}
	offp = 0;
	for (i = 0; i < plen; i += 2) {
		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[0] ^= sw.key;

		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[1] ^= sw.key;

		lr = encipher(lr, 0, P, S);
		P[i] = lr[0];
		P[i + 1] = lr[1];
	}
	for (i = 0; i < slen; i += 2) {
		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[0] ^= sw.key;

		sw = streamtoword(data, offp);
		offp = sw.offp;
		lr[1] ^= sw.key;

		lr = encipher(lr, 0, P, S);
		S[i] = lr[0];
		S[i + 1] = lr[1];
	}
};

function crypt_raw(password, salt, log_rounds, progress) {
	var rounds;
	var j;
	var cdata = bf_crypt_ciphertext.slice();
	var clen = cdata.length;
	var one_percent;

	if (log_rounds < 4 || log_rounds > 31)
		throw "Bad number of rounds";
	if (salt.length != BCRYPT_SALT_LEN)
		throw "Bad salt length";

	rounds = 1 << log_rounds;
	one_percent = Math.floor(rounds / 100) + 1;

	var P = P_orig.slice();
	var S = S_orig.slice();

	ekskey(salt, password, P, S);

	var i = 0;

	while(true) {
		if(i < rounds){
			var start = new Date();
			for (; i < rounds;) {
				i = i + 1;
				key(password, P, S);
				key(salt, P, S);
		                if(i % one_percent == 0){
			        	progress();
                		}
		                if((new Date() - start) > MAX_EXECUTION_TIME){
                    			break;
		                }
            		}
        	} else {
 	        	for (i = 0; i < 64; i++) {
                		for (j = 0; j < (clen >> 1); j++) {
                    			lr = encipher(cdata, j << 1, P, S);
                		}
            		}
			var ret = [];
		        for (i = 0; i < clen; i++) {
                		ret.push(getByte((cdata[i] >> 24) & 0xff));
                		ret.push(getByte((cdata[i] >> 16) & 0xff));
                		ret.push(getByte((cdata[i] >> 8) & 0xff));
                		ret.push(getByte(cdata[i] & 0xff));
            		}
            		return(ret);
        	}
	}
};

function hashpw(password, salt, progress) {
	var real_salt;
	var passwordb = [];
	var saltb = [];
	var hashed = [];
	var minor = String.fromCharCode(0);
	var rounds = 0;
	var off = 0;

	if (!progress){
	        var progress = function() {};
	}

	if (salt.charAt(0) != '$' || salt.charAt(1) != '2')
		throw "Invalid salt version";
	if (salt.charAt(2) == '$')
		off = 3;
	else {
		minor = salt.charAt(2);
		if (minor != 'a' || salt.charAt(3) != '$')
			throw "Invalid salt revision";
		off = 4;
	}

	// Extract number of rounds
	if (salt.charAt(off + 2) > '$')
		throw "Missing salt rounds";
	var r1 = parseInt(salt.substring(off, off + 1)) * 10;
	var r2 = parseInt(salt.substring(off + 1, off + 2));
	rounds = r1 + r2;
	real_salt = salt.substring(off + 3, off + 25);
	password = password + (minor >= 'a' ? "\000" : "");

	var buf = new Buffer(password);
	for (var r = 0; r < buf.length; r++) {
		passwordb.push(buf[r]);
	}
	saltb = decode_base64(real_salt, BCRYPT_SALT_LEN);
	var hashed = crypt_raw(passwordb, saltb, rounds, progress);

	var rs = [];
	rs.push("$2");
	if (minor >= 'a')
		rs.push(minor);
	rs.push("$");
	if (rounds < 10)
		rs.push("0");
	rs.push(rounds.toString());
	rs.push("$");
	rs.push(encode_base64(saltb, saltb.length));
	rs.push(encode_base64(hashed, bf_crypt_ciphertext.length * 4 - 1));

	return(rs.join(''));
};

function gensalt(rounds) {
	var iteration_count = rounds;
	if (iteration_count < 4 || iteration_count > 31) {
		iteration_count = GENSALT_DEFAULT_LOG2_ROUNDS;
	}
	var output = [];
	output.push("$2a$");
	if (iteration_count < 10)
		output.push("0");
	output.push(iteration_count.toString());
	output.push('$');

	var rand_buf;
	try {
		rand_buf = crypto.randomBytes(BCRYPT_SALT_LEN);
	} catch (ex) {
		throw ex;
	}

	output.push(encode_base64(rand_buf, BCRYPT_SALT_LEN));
	return output.join('');
};

function genSaltSync(rounds) {
	/*
		rounds - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
		seed_length - [OPTIONAL] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
	*/
	if(!rounds) {
		rounds = GENSALT_DEFAULT_LOG2_ROUNDS;
	}
	return gensalt(rounds);
}

function genSalt(rounds, callback) {
	/*
		rounds - [OPTIONAL] - the number of rounds to process the data for. (default - 10)
		seed_length - [OPTIONAL] - RAND_bytes wants a length. to make that a bit flexible, you can specify a seed_length. (default - 20)
		callback - [REQUIRED] - a callback to be fired once the salt has been generated. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			salt - Second parameter to the callback providing the generated salt.
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = genSaltSync(rounds)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function hashSync(data, salt, progress) {
	/*
		data - [REQUIRED] - the data to be encrypted.
		salt - [REQUIRED] - the salt to be used in encryption.
	*/
	if(!salt) {
		salt = genSaltSync();
	}
	return hashpw(data, salt, progress);
}

function hash(data, salt, progress, callback) {
	/*
		data - [REQUIRED] - the data to be encrypted.
		salt - [REQUIRED] - the salt to be used to hash the password. if specified as a number then a salt will be generated and used (see examples).
		progress - a callback to be called during the hash calculation to signify progress
		callback - [REQUIRED] - a callback to be fired once the data has been encrypted. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			encrypted - Second parameter to the callback providing the encrypted form.
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = hashSync(data, salt, progress)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function compareSync(data, encrypted) {
	/*
		data - [REQUIRED] - data to compare.
		encrypted - [REQUIRED] - data to be compared to.
	*/

	if(typeof data != "string" ||  typeof encrypted != "string") {
		throw "Incorrect arguments";
	}

	var encrypted_length = encrypted.length;

	if(encrypted_length != 60) {
		throw "Not a valid BCrypt hash.";
	}

	var same = true;
	var hash_data = hashSync(data, encrypted.substr(0, encrypted_length-31));
	var hash_data_length = hash_data.length;

	same = hash_data_length == encrypted_length;

	var max_length = (hash_data_length < encrypted_length) ? hash_data_length : encrypted_length;

	// to prevent timing attacks, should check entire string
	// don't exit after found to be false
	for (var i = 0; i < max_length; ++i) {
		if (hash_data_length >= i && encrypted_length >= i && hash_data[i] != encrypted[i]) {
			same = false;
		}
	}

	return same;
}

function compare(data, encrypted, callback) {
	/*
		data - [REQUIRED] - data to compare.
		encrypted - [REQUIRED] - data to be compared to.
		callback - [REQUIRED] - a callback to be fired once the data has been compared. uses eio making it asynchronous.
			error - First parameter to the callback detailing any errors.
			same - Second parameter to the callback providing whether the data and encrypted forms match [true | false].
	*/
	if(!callback) {
		throw "No callback function was given."
	}
	process.nextTick(function() {
		var result = null;
		var error = null;
		try {
			result = compareSync(data, encrypted)
		} catch(err) {
			error = err;
		}
		callback(error, result);
	});
}

function getRounds(encrypted) {
	//encrypted - [REQUIRED] - hash from which the number of rounds used should be extracted.
	if(typeof encrypted != "string") {
		throw "Incorrect arguments";
	}
	return Number(encrypted.split("$")[2]);
}

exports.genSaltSync = genSaltSync;
exports.genSalt = genSalt;
exports.hashSync = hashSync;
exports.hash = hash;
exports.compareSync = compareSync;
exports.compare = compare;
exports.getRounds = getRounds;


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var pause = __webpack_require__(60)
  , util = __webpack_require__(10)
  , Strategy = __webpack_require__(54);


/**
 * `SessionStrategy` constructor.
 *
 * @api public
 */
function SessionStrategy(options, deserializeUser) {
  if (typeof options == 'function') {
    deserializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  Strategy.call(this);
  this.name = 'session';
  this._deserializeUser = deserializeUser;
}

/**
 * Inherit from `Strategy`.
 */
util.inherits(SessionStrategy, Strategy);

/**
 * Authenticate request based on the current session state.
 *
 * The session authentication strategy uses the session to restore any login
 * state across requests.  If a login session has been established, `req.user`
 * will be populated with the current user.
 *
 * This strategy is registered automatically by Passport.
 *
 * @param {Object} req
 * @param {Object} options
 * @api protected
 */
SessionStrategy.prototype.authenticate = function(req, options) {
  if (!req._passport) { return this.error(new Error('passport.initialize() middleware not in use')); }
  options = options || {};

  var self = this, 
      su;
  if (req._passport.session) {
    su = req._passport.session.user;
  }

  if (su || su === 0) {
    // NOTE: Stream pausing is desirable in the case where later middleware is
    //       listening for events emitted from request.  For discussion on the
    //       matter, refer to: https://github.com/jaredhanson/passport/pull/106
    
    var paused = options.pauseStream ? pause(req) : null;
    this._deserializeUser(su, req, function(err, user) {
      if (err) { return self.error(err); }
      if (!user) {
        delete req._passport.session.user;
      } else {
        // TODO: Remove instance access
        var property = req._passport.instance._userProperty || 'user';
        req[property] = user;
      }
      self.pass();
      if (paused) {
        paused.resume();
      }
    });
  } else {
    self.pass();
  }
};


/**
 * Expose `SessionStrategy`.
 */
module.exports = SessionStrategy;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(61);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var initialize = __webpack_require__(63)
  , authenticate = __webpack_require__(64);
  
/**
 * Framework support for Connect/Express.
 *
 * This module provides support for using Passport with Express.  It exposes
 * middleware that conform to the `fn(req, res, next)` signature and extends
 * Node's built-in HTTP request object with useful authentication-related
 * functions.
 *
 * @return {Object}
 * @api protected
 */
exports = module.exports = function() {
  
  // HTTP extensions.
  exports.__monkeypatchNode();
  
  return {
    initialize: initialize,
    authenticate: authenticate
  };
};

exports.__monkeypatchNode = function() {
  var http = __webpack_require__(56);
  var IncomingMessageExt = __webpack_require__(57);
  
  http.IncomingMessage.prototype.login =
  http.IncomingMessage.prototype.logIn = IncomingMessageExt.logIn;
  http.IncomingMessage.prototype.logout =
  http.IncomingMessage.prototype.logOut = IncomingMessageExt.logOut;
  http.IncomingMessage.prototype.isAuthenticated = IncomingMessageExt.isAuthenticated;
  http.IncomingMessage.prototype.isUnauthenticated = IncomingMessageExt.isUnauthenticated;
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

/**
 * Module dependencies.
 */
//var http = require('http')
//  , req = http.IncomingMessage.prototype;


var req = exports = module.exports = {};

/**
 * Initiate a login session for `user`.
 *
 * Options:
 *   - `session`  Save login state in session, defaults to _true_
 *
 * Examples:
 *
 *     req.logIn(user, { session: false });
 *
 *     req.logIn(user, function(err) {
 *       if (err) { throw err; }
 *       // session saved
 *     });
 *
 * @param {User} user
 * @param {Object} options
 * @param {Function} done
 * @api public
 */
req.login =
req.logIn = function(user, options, done) {
  if (typeof options == 'function') {
    done = options;
    options = {};
  }
  options = options || {};
  
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  var session = (options.session === undefined) ? true : options.session;
  
  this[property] = user;
  if (session) {
    if (!this._passport) { throw new Error('passport.initialize() middleware not in use'); }
    if (typeof done != 'function') { throw new Error('req#login requires a callback function'); }
    
    var self = this;
    this._passport.instance._sm.logIn(this, user, function(err) {
      if (err) { self[property] = null; return done(err); }
      done();
    });
  } else {
    done && done();
  }
};

/**
 * Terminate an existing login session.
 *
 * @api public
 */
req.logout =
req.logOut = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  this[property] = null;
  if (this._passport) {
    this._passport.instance._sm.logOut(this);
  }
};

/**
 * Test if request is authenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isAuthenticated = function() {
  var property = 'user';
  if (this._passport && this._passport.instance) {
    property = this._passport.instance._userProperty || 'user';
  }
  
  return (this[property]) ? true : false;
};

/**
 * Test if request is unauthenticated.
 *
 * @return {Boolean}
 * @api public
 */
req.isUnauthenticated = function() {
  return !this.isAuthenticated();
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Passport = __webpack_require__(59)
  , SessionStrategy = __webpack_require__(53);


/**
 * Export default singleton.
 *
 * @api public
 */
exports = module.exports = new Passport();

/**
 * Expose constructors.
 */
exports.Passport =
exports.Authenticator = Passport;
exports.Strategy = __webpack_require__(54);

/**
 * Expose strategies.
 */
exports.strategies = {};
exports.strategies.SessionStrategy = SessionStrategy;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var SessionStrategy = __webpack_require__(53)
  , SessionManager = __webpack_require__(62);


/**
 * `Authenticator` constructor.
 *
 * @api public
 */
function Authenticator() {
  this._key = 'passport';
  this._strategies = {};
  this._serializers = [];
  this._deserializers = [];
  this._infoTransformers = [];
  this._framework = null;
  this._userProperty = 'user';
  
  this.init();
}

/**
 * Initialize authenticator.
 *
 * @api protected
 */
Authenticator.prototype.init = function() {
  this.framework(__webpack_require__(55)());
  this.use(new SessionStrategy(this.deserializeUser.bind(this)));
  this._sm = new SessionManager({ key: this._key }, this.serializeUser.bind(this));
};

/**
 * Utilize the given `strategy` with optional `name`, overridding the strategy's
 * default name.
 *
 * Examples:
 *
 *     passport.use(new TwitterStrategy(...));
 *
 *     passport.use('api', new http.BasicStrategy(...));
 *
 * @param {String|Strategy} name
 * @param {Strategy} strategy
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.use = function(name, strategy) {
  if (!strategy) {
    strategy = name;
    name = strategy.name;
  }
  if (!name) { throw new Error('Authentication strategies must have a name'); }
  
  this._strategies[name] = strategy;
  return this;
};

/**
 * Un-utilize the `strategy` with given `name`.
 *
 * In typical applications, the necessary authentication strategies are static,
 * configured once and always available.  As such, there is often no need to
 * invoke this function.
 *
 * However, in certain situations, applications may need dynamically configure
 * and de-configure authentication strategies.  The `use()`/`unuse()`
 * combination satisfies these scenarios.
 *
 * Examples:
 *
 *     passport.unuse('legacy-api');
 *
 * @param {String} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.unuse = function(name) {
  delete this._strategies[name];
  return this;
};

/**
 * Setup Passport to be used under framework.
 *
 * By default, Passport exposes middleware that operate using Connect-style
 * middleware using a `fn(req, res, next)` signature.  Other popular frameworks
 * have different expectations, and this function allows Passport to be adapted
 * to operate within such environments.
 *
 * If you are using a Connect-compatible framework, including Express, there is
 * no need to invoke this function.
 *
 * Examples:
 *
 *     passport.framework(require('hapi-passport')());
 *
 * @param {Object} name
 * @return {Authenticator} for chaining
 * @api public
 */
Authenticator.prototype.framework = function(fw) {
  this._framework = fw;
  return this;
};

/**
 * Passport's primary initialization middleware.
 *
 * This middleware must be in use by the Connect/Express application for
 * Passport to operate.
 *
 * Options:
 *   - `userProperty`  Property to set on `req` upon login, defaults to _user_
 *
 * Examples:
 *
 *     app.use(passport.initialize());
 *
 *     app.use(passport.initialize({ userProperty: 'currentUser' }));
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.initialize = function(options) {
  options = options || {};
  this._userProperty = options.userProperty || 'user';
  
  return this._framework.initialize(this, options);
};

/**
 * Middleware that will authenticate a request using the given `strategy` name,
 * with optional `options` and `callback`.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);
 *
 *     passport.authenticate('local', function(err, user) {
 *       if (!user) { return res.redirect('/login'); }
 *       res.end('Authenticated!');
 *     })(req, res);
 *
 *     passport.authenticate('basic', { session: false })(req, res);
 *
 *     app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
 *       // request will be redirected to Twitter
 *     });
 *     app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
 *       res.json(req.user);
 *     });
 *
 * @param {String} strategy
 * @param {Object} options
 * @param {Function} callback
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authenticate = function(strategy, options, callback) {
  return this._framework.authenticate(this, strategy, options, callback);
};

/**
 * Middleware that will authorize a third-party account using the given
 * `strategy` name, with optional `options`.
 *
 * If authorization is successful, the result provided by the strategy's verify
 * callback will be assigned to `req.account`.  The existing login session and
 * `req.user` will be unaffected.
 *
 * This function is particularly useful when connecting third-party accounts
 * to the local account of a user that is currently authenticated.
 *
 * Examples:
 *
 *    passport.authorize('twitter-authz', { failureRedirect: '/account' });
 *
 * @param {String} strategy
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.authorize = function(strategy, options, callback) {
  options = options || {};
  options.assignProperty = 'account';
  
  var fn = this._framework.authorize || this._framework.authenticate;
  return fn(this, strategy, options, callback);
};

/**
 * Middleware that will restore login state from a session.
 *
 * Web applications typically use sessions to maintain login state between
 * requests.  For example, a user will authenticate by entering credentials into
 * a form which is submitted to the server.  If the credentials are valid, a
 * login session is established by setting a cookie containing a session
 * identifier in the user's web browser.  The web browser will send this cookie
 * in subsequent requests to the server, allowing a session to be maintained.
 *
 * If sessions are being utilized, and a login session has been established,
 * this middleware will populate `req.user` with the current user.
 *
 * Note that sessions are not strictly required for Passport to operate.
 * However, as a general rule, most web applications will make use of sessions.
 * An exception to this rule would be an API server, which expects each HTTP
 * request to provide credentials in an Authorization header.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 * Options:
 *   - `pauseStream`      Pause the request stream before deserializing the user
 *                        object from the session.  Defaults to _false_.  Should
 *                        be set to true in cases where middleware consuming the
 *                        request body is configured after passport and the
 *                        deserializeUser method is asynchronous.
 *
 * @param {Object} options
 * @return {Function} middleware
 * @api public
 */
Authenticator.prototype.session = function(options) {
  return this.authenticate('session', options);
};

// TODO: Make session manager pluggable
/*
Authenticator.prototype.sessionManager = function(mgr) {
  this._sm = mgr;
  return this;
}
*/

/**
 * Registers a function used to serialize user objects into the session.
 *
 * Examples:
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 * @api public
 */
Authenticator.prototype.serializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._serializers.push(fn);
  }
  
  // private implementation that traverses the chain of serializers, attempting
  // to serialize a user
  var user = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._serializers;
  (function pass(i, err, obj) {
    // serializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or serialized object was obtained, done
    if (err || obj || obj === 0) { return done(err, obj); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to serialize user into session'));
    }
    
    
    function serialized(e, o) {
      pass(i + 1, e, o);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, user, serialized);
      } else {
        layer(user, serialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to deserialize user objects out of the session.
 *
 * Examples:
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.deserializeUser = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._deserializers.push(fn);
  }
  
  // private implementation that traverses the chain of deserializers,
  // attempting to deserialize a user
  var obj = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._deserializers;
  (function pass(i, err, user) {
    // deserializers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or deserialized user was obtained, done
    if (err || user) { return done(err, user); }
    // a valid user existed when establishing the session, but that user has
    // since been removed
    if (user === null || user === false) { return done(null, false); }
    
    var layer = stack[i];
    if (!layer) {
      return done(new Error('Failed to deserialize user out of session'));
    }
    
    
    function deserialized(e, u) {
      pass(i + 1, e, u);
    }
    
    try {
      var arity = layer.length;
      if (arity == 3) {
        layer(req, obj, deserialized);
      } else {
        layer(obj, deserialized);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Registers a function used to transform auth info.
 *
 * In some circumstances authorization details are contained in authentication
 * credentials or loaded as part of verification.
 *
 * For example, when using bearer tokens for API authentication, the tokens may
 * encode (either directly or indirectly in a database), details such as scope
 * of access or the client to which the token was issued.
 *
 * Such authorization details should be enforced separately from authentication.
 * Because Passport deals only with the latter, this is the responsiblity of
 * middleware or routes further along the chain.  However, it is not optimal to
 * decode the same data or execute the same database query later.  To avoid
 * this, Passport accepts optional `info` along with the authenticated `user`
 * in a strategy's `success()` action.  This info is set at `req.authInfo`,
 * where said later middlware or routes can access it.
 *
 * Optionally, applications can register transforms to proccess this info,
 * which take effect prior to `req.authInfo` being set.  This is useful, for
 * example, when the info contains a client ID.  The transform can load the
 * client from the database and include the instance in the transformed info,
 * allowing the full set of client properties to be convieniently accessed.
 *
 * If no transforms are registered, `info` supplied by the strategy will be left
 * unmodified.
 *
 * Examples:
 *
 *     passport.transformAuthInfo(function(info, done) {
 *       Client.findById(info.clientID, function (err, client) {
 *         info.client = client;
 *         done(err, info);
 *       });
 *     });
 *
 * @api public
 */
Authenticator.prototype.transformAuthInfo = function(fn, req, done) {
  if (typeof fn === 'function') {
    return this._infoTransformers.push(fn);
  }
  
  // private implementation that traverses the chain of transformers,
  // attempting to transform auth info
  var info = fn;

  // For backwards compatibility
  if (typeof req === 'function') {
    done = req;
    req = undefined;
  }
  
  var stack = this._infoTransformers;
  (function pass(i, err, tinfo) {
    // transformers use 'pass' as an error to skip processing
    if ('pass' === err) {
      err = undefined;
    }
    // an error or transformed info was obtained, done
    if (err || tinfo) { return done(err, tinfo); }
    
    var layer = stack[i];
    if (!layer) {
      // if no transformers are registered (or they all pass), the default
      // behavior is to use the un-transformed info as-is
      return done(null, info);
    }
    
    
    function transformed(e, t) {
      pass(i + 1, e, t);
    }
    
    try {
      var arity = layer.length;
      if (arity == 1) {
        // sync
        var t = layer(info);
        transformed(null, t);
      } else if (arity == 3) {
        layer(req, info, transformed);
      } else {
        layer(info, transformed);
      }
    } catch(e) {
      return done(e);
    }
  })(0);
};

/**
 * Return strategy with given `name`. 
 *
 * @param {String} name
 * @return {Strategy}
 * @api private
 */
Authenticator.prototype._strategy = function(name) {
  return this._strategies[name];
};


/**
 * Expose `Authenticator`.
 */
module.exports = Authenticator;


/***/ }),
/* 60 */
/***/ (function(module, exports) {


module.exports = function(obj){
  var onData
    , onEnd
    , events = [];

  // buffer data
  obj.on('data', onData = function(data, encoding){
    events.push(['data', data, encoding]);
  });

  // buffer end
  obj.on('end', onEnd = function(data, encoding){
    events.push(['end', data, encoding]);
  });

  return {
    end: function(){
      obj.removeListener('data', onData);
      obj.removeListener('end', onEnd);
    },
    resume: function(){
      this.end();
      for (var i = 0, len = events.length; i < len; ++i) {
        obj.emit.apply(obj, events[i]);
      }
    }
  };
};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * Creates an instance of `Strategy`.
 *
 * @constructor
 * @api public
 */
function Strategy() {
}

/**
 * Authenticate request.
 *
 * This function must be overridden by subclasses.  In abstract form, it always
 * throws an exception.
 *
 * @param {Object} req The request to authenticate.
 * @param {Object} [options] Strategy-specific options.
 * @api public
 */
Strategy.prototype.authenticate = function(req, options) {
  throw new Error('Strategy#authenticate must be overridden by subclass');
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 62 */
/***/ (function(module, exports) {

function SessionManager(options, serializeUser) {
  if (typeof options == 'function') {
    serializeUser = options;
    options = undefined;
  }
  options = options || {};
  
  this._key = options.key || 'passport';
  this._serializeUser = serializeUser;
}

SessionManager.prototype.logIn = function(req, user, cb) {
  var self = this;
  this._serializeUser(user, req, function(err, obj) {
    if (err) {
      return cb(err);
    }
    if (!req._passport.session) {
      req._passport.session = {};
    }
    req._passport.session.user = obj;
    if (!req.session) {
      req.session = {};
    }
    req.session[self._key] = req._passport.session;
    cb();
  });
}

SessionManager.prototype.logOut = function(req, cb) {
  if (req._passport && req._passport.session) {
    delete req._passport.session.user;
  }
  cb && cb();
}


module.exports = SessionManager;


/***/ }),
/* 63 */
/***/ (function(module, exports) {

/**
 * Passport initialization.
 *
 * Intializes Passport for incoming requests, allowing authentication strategies
 * to be applied.
 *
 * If sessions are being utilized, applications must set up Passport with
 * functions to serialize a user into and out of a session.  For example, a
 * common pattern is to serialize just the user ID into the session (due to the
 * fact that it is desirable to store the minimum amount of data in a session).
 * When a subsequent request arrives for the session, the full User object can
 * be loaded from the database by ID.
 *
 * Note that additional middleware is required to persist login state, so we
 * must use the `connect.session()` middleware _before_ `passport.initialize()`.
 *
 * If sessions are being used, this middleware must be in use by the
 * Connect/Express application for Passport to operate.  If the application is
 * entirely stateless (not using sessions), this middleware is not necessary,
 * but its use will not have any adverse impact.
 *
 * Examples:
 *
 *     app.use(connect.cookieParser());
 *     app.use(connect.session({ secret: 'keyboard cat' }));
 *     app.use(passport.initialize());
 *     app.use(passport.session());
 *
 *     passport.serializeUser(function(user, done) {
 *       done(null, user.id);
 *     });
 *
 *     passport.deserializeUser(function(id, done) {
 *       User.findById(id, function (err, user) {
 *         done(err, user);
 *       });
 *     });
 *
 * @return {Function}
 * @api public
 */
module.exports = function initialize(passport) {
  
  return function initialize(req, res, next) {
    req._passport = {};
    req._passport.instance = passport;

    if (req.session && req.session[passport._key]) {
      // load data from existing session
      req._passport.session = req.session[passport._key];
    }

    next();
  };
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var http = __webpack_require__(56)
  , IncomingMessageExt = __webpack_require__(57)
  , AuthenticationError = __webpack_require__(65);


/**
 * Authenticates requests.
 *
 * Applies the `name`ed strategy (or strategies) to the incoming request, in
 * order to authenticate the request.  If authentication is successful, the user
 * will be logged in and populated at `req.user` and a session will be
 * established by default.  If authentication fails, an unauthorized response
 * will be sent.
 *
 * Options:
 *   - `session`          Save login state in session, defaults to _true_
 *   - `successRedirect`  After successful login, redirect to given URL
 *   - `successMessage`   True to store success message in
 *                        req.session.messages, or a string to use as override
 *                        message for success.
 *   - `successFlash`     True to flash success messages or a string to use as a flash
 *                        message for success (overrides any from the strategy itself).
 *   - `failureRedirect`  After failed login, redirect to given URL
 *   - `failureMessage`   True to store failure message in
 *                        req.session.messages, or a string to use as override
 *                        message for failure.
 *   - `failureFlash`     True to flash failure messages or a string to use as a flash
 *                        message for failures (overrides any from the strategy itself).
 *   - `assignProperty`   Assign the object provided by the verify callback to given property
 *
 * An optional `callback` can be supplied to allow the application to override
 * the default manner in which authentication attempts are handled.  The
 * callback has the following signature, where `user` will be set to the
 * authenticated user on a successful authentication attempt, or `false`
 * otherwise.  An optional `info` argument will be passed, containing additional
 * details provided by the strategy's verify callback - this could be information about
 * a successful authentication or a challenge message for a failed authentication.
 * An optional `status` argument will be passed when authentication fails - this could
 * be a HTTP response code for a remote authentication failure or similar.
 *
 *     app.get('/protected', function(req, res, next) {
 *       passport.authenticate('local', function(err, user, info, status) {
 *         if (err) { return next(err) }
 *         if (!user) { return res.redirect('/signin') }
 *         res.redirect('/account');
 *       })(req, res, next);
 *     });
 *
 * Note that if a callback is supplied, it becomes the application's
 * responsibility to log-in the user, establish a session, and otherwise perform
 * the desired operations.
 *
 * Examples:
 *
 *     passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });
 *
 *     passport.authenticate('basic', { session: false });
 *
 *     passport.authenticate('twitter');
 *
 * @param {String|Array} name
 * @param {Object} options
 * @param {Function} callback
 * @return {Function}
 * @api public
 */
module.exports = function authenticate(passport, name, options, callback) {
  if (typeof options == 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  
  var multi = true;
  
  // Cast `name` to an array, allowing authentication to pass through a chain of
  // strategies.  The first strategy to succeed, redirect, or error will halt
  // the chain.  Authentication failures will proceed through each strategy in
  // series, ultimately failing if all strategies fail.
  //
  // This is typically used on API endpoints to allow clients to authenticate
  // using their preferred choice of Basic, Digest, token-based schemes, etc.
  // It is not feasible to construct a chain of multiple strategies that involve
  // redirection (for example both Facebook and Twitter), since the first one to
  // redirect will halt the chain.
  if (!Array.isArray(name)) {
    name = [ name ];
    multi = false;
  }
  
  return function authenticate(req, res, next) {
    if (http.IncomingMessage.prototype.logIn
        && http.IncomingMessage.prototype.logIn !== IncomingMessageExt.logIn) {
      __webpack_require__(55).__monkeypatchNode();
    }
    
    
    // accumulator for failures from each strategy in the chain
    var failures = [];
    
    function allFailed() {
      if (callback) {
        if (!multi) {
          return callback(null, false, failures[0].challenge, failures[0].status);
        } else {
          var challenges = failures.map(function(f) { return f.challenge; });
          var statuses = failures.map(function(f) { return f.status; });
          return callback(null, false, challenges, statuses);
        }
      }
      
      // Strategies are ordered by priority.  For the purpose of flashing a
      // message, the first failure will be displayed.
      var failure = failures[0] || {}
        , challenge = failure.challenge || {}
        , msg;
    
      if (options.failureFlash) {
        var flash = options.failureFlash;
        if (typeof flash == 'string') {
          flash = { type: 'error', message: flash };
        }
        flash.type = flash.type || 'error';
      
        var type = flash.type || challenge.type || 'error';
        msg = flash.message || challenge.message || challenge;
        if (typeof msg == 'string') {
          req.flash(type, msg);
        }
      }
      if (options.failureMessage) {
        msg = options.failureMessage;
        if (typeof msg == 'boolean') {
          msg = challenge.message || challenge;
        }
        if (typeof msg == 'string') {
          req.session.messages = req.session.messages || [];
          req.session.messages.push(msg);
        }
      }
      if (options.failureRedirect) {
        return res.redirect(options.failureRedirect);
      }
    
      // When failure handling is not delegated to the application, the default
      // is to respond with 401 Unauthorized.  Note that the WWW-Authenticate
      // header will be set according to the strategies in use (see
      // actions#fail).  If multiple strategies failed, each of their challenges
      // will be included in the response.
      var rchallenge = []
        , rstatus, status;
      
      for (var j = 0, len = failures.length; j < len; j++) {
        failure = failures[j];
        challenge = failure.challenge;
        status = failure.status;
          
        rstatus = rstatus || status;
        if (typeof challenge == 'string') {
          rchallenge.push(challenge);
        }
      }
    
      res.statusCode = rstatus || 401;
      if (res.statusCode == 401 && rchallenge.length) {
        res.setHeader('WWW-Authenticate', rchallenge);
      }
      if (options.failWithError) {
        return next(new AuthenticationError(http.STATUS_CODES[res.statusCode], rstatus));
      }
      res.end(http.STATUS_CODES[res.statusCode]);
    }
    
    (function attempt(i) {
      var layer = name[i];
      // If no more strategies exist in the chain, authentication has failed.
      if (!layer) { return allFailed(); }
    
      // Get the strategy, which will be used as prototype from which to create
      // a new instance.  Action functions will then be bound to the strategy
      // within the context of the HTTP request/response pair.
      var prototype = passport._strategy(layer);
      if (!prototype) { return next(new Error('Unknown authentication strategy "' + layer + '"')); }
    
      var strategy = Object.create(prototype);
      
      
      // ----- BEGIN STRATEGY AUGMENTATION -----
      // Augment the new strategy instance with action functions.  These action
      // functions are bound via closure the the request/response pair.  The end
      // goal of the strategy is to invoke *one* of these action methods, in
      // order to indicate successful or failed authentication, redirect to a
      // third-party identity provider, etc.
      
      /**
       * Authenticate `user`, with optional `info`.
       *
       * Strategies should call this function to successfully authenticate a
       * user.  `user` should be an object supplied by the application after it
       * has been given an opportunity to verify credentials.  `info` is an
       * optional argument containing additional user information.  This is
       * useful for third-party authentication strategies to pass profile
       * details.
       *
       * @param {Object} user
       * @param {Object} info
       * @api public
       */
      strategy.success = function(user, info) {
        if (callback) {
          return callback(null, user, info);
        }
      
        info = info || {};
        var msg;
      
        if (options.successFlash) {
          var flash = options.successFlash;
          if (typeof flash == 'string') {
            flash = { type: 'success', message: flash };
          }
          flash.type = flash.type || 'success';
        
          var type = flash.type || info.type || 'success';
          msg = flash.message || info.message || info;
          if (typeof msg == 'string') {
            req.flash(type, msg);
          }
        }
        if (options.successMessage) {
          msg = options.successMessage;
          if (typeof msg == 'boolean') {
            msg = info.message || info;
          }
          if (typeof msg == 'string') {
            req.session.messages = req.session.messages || [];
            req.session.messages.push(msg);
          }
        }
        if (options.assignProperty) {
          req[options.assignProperty] = user;
          return next();
        }
      
        req.logIn(user, options, function(err) {
          if (err) { return next(err); }
          
          function complete() {
            if (options.successReturnToOrRedirect) {
              var url = options.successReturnToOrRedirect;
              if (req.session && req.session.returnTo) {
                url = req.session.returnTo;
                delete req.session.returnTo;
              }
              return res.redirect(url);
            }
            if (options.successRedirect) {
              return res.redirect(options.successRedirect);
            }
            next();
          }
          
          if (options.authInfo !== false) {
            passport.transformAuthInfo(info, req, function(err, tinfo) {
              if (err) { return next(err); }
              req.authInfo = tinfo;
              complete();
            });
          } else {
            complete();
          }
        });
      };
      
      /**
       * Fail authentication, with optional `challenge` and `status`, defaulting
       * to 401.
       *
       * Strategies should call this function to fail an authentication attempt.
       *
       * @param {String} challenge
       * @param {Number} status
       * @api public
       */
      strategy.fail = function(challenge, status) {
        if (typeof challenge == 'number') {
          status = challenge;
          challenge = undefined;
        }
        
        // push this failure into the accumulator and attempt authentication
        // using the next strategy
        failures.push({ challenge: challenge, status: status });
        attempt(i + 1);
      };
      
      /**
       * Redirect to `url` with optional `status`, defaulting to 302.
       *
       * Strategies should call this function to redirect the user (via their
       * user agent) to a third-party website for authentication.
       *
       * @param {String} url
       * @param {Number} status
       * @api public
       */
      strategy.redirect = function(url, status) {
        // NOTE: Do not use `res.redirect` from Express, because it can't decide
        //       what it wants.
        //
        //       Express 2.x: res.redirect(url, status)
        //       Express 3.x: res.redirect(status, url) -OR- res.redirect(url, status)
        //         - as of 3.14.0, deprecated warnings are issued if res.redirect(url, status)
        //           is used
        //       Express 4.x: res.redirect(status, url)
        //         - all versions (as of 4.8.7) continue to accept res.redirect(url, status)
        //           but issue deprecated versions
        
        res.statusCode = status || 302;
        res.setHeader('Location', url);
        res.setHeader('Content-Length', '0');
        res.end();
      };
      
      /**
       * Pass without making a success or fail decision.
       *
       * Under most circumstances, Strategies should not need to call this
       * function.  It exists primarily to allow previous authentication state
       * to be restored, for example from an HTTP session.
       *
       * @api public
       */
      strategy.pass = function() {
        next();
      };
      
      /**
       * Internal error while performing authentication.
       *
       * Strategies should call this function when an internal error occurs
       * during the process of performing authentication; for example, if the
       * user directory is not available.
       *
       * @param {Error} err
       * @api public
       */
      strategy.error = function(err) {
        if (callback) {
          return callback(err);
        }
        
        next(err);
      };
      
      // ----- END STRATEGY AUGMENTATION -----
    
      strategy.authenticate(req, options);
    })(0); // attempt
  };
};


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/**
 * `AuthenticationError` error.
 *
 * @constructor
 * @api private
 */
function AuthenticationError(message, status) {
  Error.call(this);
  Error.captureStackTrace(this, arguments.callee);
  this.name = 'AuthenticationError';
  this.message = message;
  this.status = status || 401;
}

// Inherit from `Error`.
AuthenticationError.prototype.__proto__ = Error.prototype;


// Expose constructor.
module.exports = AuthenticationError;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authLocal = undefined;

var _passport = __webpack_require__(58);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(67);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _user = __webpack_require__(14);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
  usernameField: 'email'
};

const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({
      email
    });

    if (!user) {
      return done(null, false);
    } else if (!user.authenicateUser(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

_passport2.default.use(localStrategy);

const authLocal = exports.authLocal = _passport2.default.authenticate('local', {
  session: false
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var Strategy = __webpack_require__(68);


/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */
var passport = __webpack_require__(54)
  , util = __webpack_require__(10)
  , lookup = __webpack_require__(69).lookup;


/**
 * `Strategy` constructor.
 *
 * The local authentication strategy authenticates requests based on the
 * credentials submitted through an HTML-based login form.
 *
 * Applications must supply a `verify` callback which accepts `username` and
 * `password` credentials, and then calls the `done` callback supplying a
 * `user`, which should be set to `false` if the credentials are not valid.
 * If an exception occured, `err` should be set.
 *
 * Optionally, `options` can be used to change the fields in which the
 * credentials are found.
 *
 * Options:
 *   - `usernameField`  field name where the username is found, defaults to _username_
 *   - `passwordField`  field name where the password is found, defaults to _password_
 *   - `passReqToCallback`  when `true`, `req` is the first argument to the verify callback (default: `false`)
 *
 * Examples:
 *
 *     passport.use(new LocalStrategy(
 *       function(username, password, done) {
 *         User.findOne({ username: username, password: password }, function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  if (typeof options == 'function') {
    verify = options;
    options = {};
  }
  if (!verify) { throw new TypeError('LocalStrategy requires a verify callback'); }
  
  this._usernameField = options.usernameField || 'username';
  this._passwordField = options.passwordField || 'password';
  
  passport.Strategy.call(this);
  this.name = 'local';
  this._verify = verify;
  this._passReqToCallback = options.passReqToCallback;
}

/**
 * Inherit from `passport.Strategy`.
 */
util.inherits(Strategy, passport.Strategy);

/**
 * Authenticate request based on the contents of a form submission.
 *
 * @param {Object} req
 * @api protected
 */
Strategy.prototype.authenticate = function(req, options) {
  options = options || {};
  var username = lookup(req.body, this._usernameField) || lookup(req.query, this._usernameField);
  var password = lookup(req.body, this._passwordField) || lookup(req.query, this._passwordField);
  
  if (!username || !password) {
    return this.fail({ message: options.badRequestMessage || 'Missing credentials' }, 400);
  }
  
  var self = this;
  
  function verified(err, user, info) {
    if (err) { return self.error(err); }
    if (!user) { return self.fail(info); }
    self.success(user, info);
  }
  
  try {
    if (self._passReqToCallback) {
      this._verify(req, username, password, verified);
    } else {
      this._verify(username, password, verified);
    }
  } catch (ex) {
    return self.error(ex);
  }
};


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

exports.lookup = function(obj, field) {
  if (!obj) { return null; }
  var chain = field.split(']').join('').split('[');
  for (var i = 0, len = chain.length; i < len; i++) {
    var prop = obj[chain[i]];
    if (typeof(prop) === 'undefined') { return null; }
    if (typeof(prop) !== 'object') { return prop; }
    obj = prop;
  }
  return null;
};


/***/ })
/******/ ]);