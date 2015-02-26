# fumble

[![npm version](https://badge.fury.io/js/fumble.svg)](http://badge.fury.io/js/fumble)
[![Build Status](https://travis-ci.org/yahoo/fumble.svg?branch=master)](https://travis-ci.org/yahoo/fumble)
[![Dependency Status](https://david-dm.org/yahoo/fumble.svg)](https://david-dm.org/yahoo/fumble)
[![devDependency Status](https://david-dm.org/yahoo/fumble/dev-status.svg)](https://david-dm.org/yahoo/fumble#info=devDependencies)
[![Coverage Status](https://coveralls.io/repos/yahoo/fumble/badge.svg)](https://coveralls.io/r/yahoo/fumble)

[![Join the chat at https://gitter.im/yahoo/fumble](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/yahoo/fumble?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Simple error objects in node. Created specifically to be used with the [fetchr](https://github.com/yahoo/fetchr) library and based on [hapi.js](http://hapijs.com/)' [Boom](https://github.com/hapijs/boom).

![eli manning](http://media2.giphy.com/media/F9AU77Krzw8ta/giphy.gif)

## Usage
```js
var fumble = require('fumble');

var callAndProcess = require('./callAndProcess');

module.exports = require('api').base.service({
    name: 'foo',
    read: function (req, resource, params, context, callback) {
        switch(resource) {
            case this.name: 
                callAndProcess(req, params, context, callback);
                return;
        }
        
        var error = fumble.http.create(400, 'Passed in an invalid resource', {
            debug: [resource]
        });
        
        req.error(error);
        req.debug(error.stack); // nice stack trace
        /**
        * logs:
        * { [HttpError: Bad Request] statusCode: 400, message: 
        * 'Passed in an invalid resource', debug: [ resource ] }
        */

        callback(error);
    }
});
```

## API Docs

### fumble.http
provides a set of utilities for returning HTTP errors. Each method returns an `HttpError` instance, which itself extends the native `Error` class (which means you can access the `stack` prop on your error instance). Each error has the following two props
* `statusCode` {Number} - the HTTP status code (typically 4xx or 5xx).
* `message` {String} - the error message


#### `fumble.http.create ([status=500], [message='Internal Server Error'], [options])`

Generate an `HttpError` object where
* `statusCode` - an HTTP error code number. Must be greater or equal 400
* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
var error = fumble.http.create(400, 'missing params', { debug: [passedInParams] });
```

#### HTTP 4xx Errors
---

##### `fumble.http.badRequest ([message='Bad Request'], [options])`
returns an HTTP status code of **400**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.badRequest('invalid query');

// essentially generates
{
    statusCode: 400,
    message: 'invalid query'
}
```

===

##### `fumble.http.unauthorized ([message='Unauthorized'], [options])` 
returns an HTTP status code of **401**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.unauthorized('not logged in');

// essentially generates
{
    statusCode: 401,
    message: 'not logged in'
}
```

===

##### `fumble.http.forbidden ([message='Forbidden'], [options])` 
returns an HTTP status code of **403**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.forbidden('top secret');

// essentially generates
{
    statusCode: 403,
    message: 'top secret'
}
```

===

##### `fumble.http.notFound ([message='Not Found'], [options])` 
returns an HTTP status code of **404**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.notFound('does not exist');

// essentially generates
{
    statusCode: 404,
    message: 'does not exist'
}
```

===

##### `fumble.http.methodNotAllowed ([message='Method Not Allowed'], [options])` 
returns an HTTP status code of **405**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.methodNotAllowed('not allowed');

// essentially generates
{
    statusCode: 405,
    message: 'not allowed'
}
```

===

##### `fumble.http.proxyAuthenticationRequired ([message='Proxy Authentication Required'], [options])` 
returns an HTTP status code of **407**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.proxyAuthenticationRequired('need to login to foo');

// essentially generates
{
    statusCode: 407,
    message: 'need to login to foo'
}
```

===

##### `fumble.http.conflict ([message='Conflict'], [options])` 
returns an HTTP status code of **409**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.conflict('collision detected');

// essentially generates
{
    statusCode: 409,
    message: 'collision detected'
}
```

===

##### `fumble.http.gone ([message='Gone'], [options])` 
returns an HTTP status code of **410**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.gone('bye bye');

// essentially generates
{
    statusCode: 410,
    message: 'bye bye'
}
```


##### `fumble.http.preconditionFailed ([message='Precondition Failed'], [options])` 
returns an HTTP status code of **412**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.preconditionFailed('missing CLA');

// essentially generates
{
    statusCode: 412,
    message: 'missing CLA'
}
```

===

##### `fumble.http.tooManyRequests ([message='Too Many Requests'], [options])` 
returns an HTTP status code of **429**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.tooManyRequests('slow down');

// essentially generates
{
    statusCode: 429,
    message: 'slow down'
}
```

#### HTTP 5xx Errors
---

##### `fumble.http.internalServerError ([message='Internal Server Error'], [options])` 
returns an HTTP status code of **500**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.internalServerError('unkown error');

// essentially generates
{
    statusCode: 500,
    message: 'unknown error'
}
```

===

##### `fumble.http.notImplemented ([message='Not Implemented'], [options])` 
returns an HTTP status code of **501**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.notImplemented('missing enhancement');

// essentially generates
{
    statusCode: 501,
    message: 'missing enhancement'
}
```

===

##### `fumble.http.badGateway ([message='Bad Gateway'], [options])`
returns an HTTP status code of **502**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.badGateway('mongo error');

// essentially generates
{
    statusCode: 502,
    message: 'mongo error'
}
```
 
===

##### `fumble.http.serviceUnavailable ([message='Service Unavailable'], [options])`
returns an HTTP status code of **503**

* `message` - optional message string.
* `options` - extra options
* `options.debug` - additional error debug info set to `error.debug` property.

```js
fumble.http.serviceUnavailable('feeds are down');

// essentially generates
{
    statusCode: 503,
    message: 'feeds are down'
}
```

## License

This software is free to use under the Yahoo Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.

[LICENSE file]: https://github.com/yahoo/fumble/blob/master/LICENSE.md
