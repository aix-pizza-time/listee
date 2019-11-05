const _timestamp = (milliseconds = true, _date = new Date()) => {
    let date = _date.toLocaleDateString('en-GB').replace(/\//g,'-');
    let time = _date.toLocaleTimeString('en-GB').replace(/:/g,'-');
    return `${date}-${time}${milliseconds ? "-" + _date.getMilliseconds(): ""}`; 
}

module.exports = _timestamp;