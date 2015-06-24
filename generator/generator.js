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

/**
 * use generator to implement
 * @type {number}
 */
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


/**
 * use Promise to implement the same functionality
 */
new Promise(function(resolve) {
    delay(1000, function(resp) {
        resolve(resp);
    })
}).then(function(resp) {
        console.log(resp)
        return new Promise(function(resolve) {
            delay(2000, function(resp) {
                resolve(resp);
            })
        });
    }).then(function(resp) {
        console.log(resp)
    });