# TexType
Find the data type by regular expression

## Install
```shell
npm install textype
```

## How to use
### is public ip ?
```node
var textype = require('textype');
var data = '10.10.221.15';
textype.isPublicIP(data);
```
### is e-mail ?
```node
var textype = require('textype');
var data = 'service@tanpopo.cc';
textype.isEmail(data);
```
### is number ?
```node
var textype = require('textype');
var data = '10452.70';
textype.isNumber(data);
```
### is JSON ?
```node
var textype = require('textype');
var data = '[9, 'b', false]';
textype.isJSON(data);
```
### get multi-type
```node
var textype = require('textype');
var data;
textype.multiType(data);
```
