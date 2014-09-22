'use strict';

function _toRoman(num, uppercase) {
  var r = '';
  var decimals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  var roman = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  for (var i = 0; i < decimals.length; i++) {
    while (num >= decimals[i]) {
      r += roman[i];
      num -= decimals[i];
    }
  }

  return _.isUndefined(uppercase) ? r.toLowerCase() : r;
}

function _toLetter(num, uppercase) {
  var numeric = (num - 1) % 26;
  var letter = String.fromCharCode(97 + numeric);
  if (!_.isUndefined(uppercase)) {
    letter =  letter.toUpperCase();
  }
  var num2 = Math.floor((num - 1) / 26);
  if (num2 > 0) {
    return _toLetter(num2, uppercase) + letter;
  } else {
    return letter;
  }
}

function numberConverter(CONVERTER_ABBR) {
  var converter = {};

  converter.convert = function (num, format, uppercase) {
    if (!_.isNumber(num) || _.isUndefined(format) || num <= 0) {
      return num;
    }

    var result = null;
    switch (format) {
      case CONVERTER_ABBR.TO_ROMAN: {
        result = _toRoman(num, uppercase);
        break;
      }
      case CONVERTER_ABBR.TO_LETTER: {
        result = _toLetter(num, uppercase);
        break
      }
      default: {
        result = num; // format not supported
      }
    }

    return result;
  };

  converter.toRoman = function (num, uppercase) {
    return this.convert(num, CONVERTER_ABBR.TO_ROMAN, uppercase);
  };

  converter.toLetter = function (num, uppercase) {
    return this.convert(num, CONVERTER_ABBR.TO_LETTER, uppercase);
  };

  return converter;
}

function numberConverterFilter(numberConverter) {
  return numberConverter.convert;
}

/**
 * @ngdoc module
 * @name angular.filters
 * @description
 * Provide service and filter to convert number in roman number or letter.
 */

angular.module('angularNumberConverter', [])
  .factory('numberConverter', ['CONVERTER_ABBR', numberConverter])
  .filter('numberConverter', ['numberConverter', numberConverterFilter])
  .constant('CONVERTER_ABBR', {
    "TO_ROMAN": "I",
    "TO_LETTER": "A"
  })
;