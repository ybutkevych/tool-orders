define([], function () {
    var set = function(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    };

    var get = function(key) {
        return localStorage.getItem(key);
    };

    var getObject = function(key) {
        return JSON.parse(localStorage.getItem(key));
    };

    var remove = function(key) {
        localStorage.removeItem(key);
    };

    var pushToArray = function(key, value) {
        var currentData = getObject(key) || [];
        currentData.push(value);
        remove(key);
        set(key, currentData);
    };

    var getAllKeys = function () {
        var keys = [];
        for (var prop in localStorage) {
            if (localStorage.hasOwnProperty(prop)) {
                keys.push(prop);
            }
        }

        return keys;
    };

    var getByPrefix = function(keyPrefix) {
        var allKeys = getAllKeys();
        var result = [];

        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            if (strStartsWith(key, keyPrefix)) {
                result.push(get(key));
            }
        }

        return result;
    };

    var removeByPrefix = function(keyPrefix) {
        var allKeys = getAllKeys();

        for (var i = 0; i < allKeys.length; i++) {
            var key = allKeys[i];
            if (strStartsWith(key, keyPrefix)) {
                remove(key);
            }
        }
    };

    var strStartsWith = function(str, prefix) {
        return str.substring(0, prefix.length) === prefix;
    };

    return {
        set: set,
        get: get,
        getObject: getObject,
        pushToArray: pushToArray,
        remove: remove,
        getAllKeys: getAllKeys,
        getByPrefix: getByPrefix,
        removeByPrefix: removeByPrefix
    };
});
