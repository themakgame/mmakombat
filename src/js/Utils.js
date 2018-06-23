

function GetBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('safari') !== -1) {
        if (ua.indexOf('chrome') > -1) {
            return "chrome";
        } else {
            return 'safari';
        }
    }
    return "other";
}

const calcBday = function (date) {
    try {
        var today = new Date();
        var d = new Date(date);

        var year = today.getFullYear() - d.getFullYear();
        var month = today.getMonth() - d.getMonth();
        var day = today.getDate() - d.getDate();
        var carry = 0;

        if (year < 0)
            return 0;
        if (month <= 0 && day <= 0)
            carry -= 1;

        var age = parseInt(year, 10);
        age += carry;

        return Math.abs(age);
    } catch (err) {
        console.log(err.message);
    }
}


const getRank = function (rank) {

    if (rank === 5000) {
        return 'Unranked';
    }
    else if (rank === 0) {
        return 'Champion';
    }
    else {
        return String(rank);
    }
}

const getWeightClass = function (weight) {

    let ret;
    switch (weight) {
        case 'Women_Featherweight':
            ret = "Featherweight";
            break;
        case 'Women_Flyweight':
            ret = "Flyweight";
            break;
        case 'Light_Heavyweight':
            ret = "Light Heavyweight";
            break;
        case 'Real_Heavyweight':
            ret = "Heavyweight";
            break;
        case 'Women_Strawweight':
            ret = "Strawweight";
            break;
        case 'Women_Bantamweight':
            ret = "Bantamweight";
            break;
        default:
            ret = weight;

    }

    return ret;
}

const jsxInfo = function (obj, fld, callback) {
    let displayVal = '';

    if (obj !== undefined) {
        if (obj !== null) {
            if (fld in obj) {
                if (callback && typeof (callback) === "function") {
                    displayVal = callback(obj[fld]);
                }
                else {
                    if (obj[fld] !== null)
                        displayVal = String(obj[fld]);
                }
            }
        }
    }
    return displayVal;

}

const fighterExists = function (fighter) {

    if (fighter !== undefined) {

        if ('last_name' in fighter) {
            return true;
        }
    }
    return false;
}

exports.calcBday = calcBday;
exports.getRank = getRank;
exports.getWeightClass = getWeightClass;
exports.jsxInfo = jsxInfo;
exports.fighterExists = fighterExists;
exports.GetBrowser = GetBrowser;