// === Keep track of keystrokes ===
pc.listen('keydown', (last, e) => {

    var key = e.key.toLowerCase();

    if (!last.timeStamp[key]){
        last.timeStamp[key] = Date.now();
    }
    
    if (Date.now() - last.timeStamp[key] > 150) {
        last.timeStamp[key] = Date.now();
        return {
        ...last,
        keys: last.keys.concat([key])
        };
    } else {
        return last;
    } 

});

pc.listen('keyup', (last, e) => {
    var key = e.key.toLowerCase();
    return {
        ...last,
        keys: last.keys.filter(x => key != x)
    };
});
