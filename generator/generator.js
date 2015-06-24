/**
 * This practice just use generator to implement the serial async callback, to avoid the `callback pyramid`
 * @param time
 * @param cb
 */
var delay = function(time, cb) {
    window.setTimeout(function() {
        cb("Slept for "+time);
    }, time);
};

var myDelayGenerator = function* () {
    console.log(yield delay(1000, function(resp) {
        this.next(resp);
    }.bind(this)));

    console.log(yield delay(2000, function(resp) {
        this.next(resp)
    }.bind(this)));
}

var delayGenerator = new myDelayGenerator();
delayGenerator.next();