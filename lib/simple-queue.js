module.exports = SimpleQueue;

function SimpleQueue() {
    const self = this;

    self.fifo = [];
    self.executing = false;
}

SimpleQueue.prototype.push = function (fn) {
    const self = this;

    self.fifo.push(fn);

    self.maybeNext();
};

SimpleQueue.prototype.maybeNext = function () {
    const self = this;

    if (!self.executing) {
        self.next();
    }
};

SimpleQueue.prototype.next = function () {
    const self = this;

    if (self.fifo.length) {
        const fn = self.fifo.shift();

        self.executing = true;

        fn(function () {
            self.executing = false;

            self.maybeNext();
        });
    }
};
