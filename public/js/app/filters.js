app.filter('fltConvertToInt', function() {
    return function(convertint, mount) {
        if (convertint > 12) {
            return parseInt(convertint) + (2592000000 * mount);
        } else {
            return convertint;
        }
    }
});