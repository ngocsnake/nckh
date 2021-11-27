class Helper {
    sum(a) {
        return a + 1;
    }
    floatCheck(float) {
        if (float < 0.07) {
            return 'FN/' + float;
        } else if (float < 0.15) {
            return 'MW/' + float;
        } else if (float < 0.38) {
            return 'FT/' + float;
        } else if (float < 0.45) {
            return 'WW/' + float;
        } else {
            return 'BS/' + float;
        }
    }
}

module.exports = new Helper;