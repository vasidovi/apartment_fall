// apply function along x and y axis
function vdo (f) {
    return {
        x: f(...Array.from(arguments).slice(1).map(a => a.x)),
        y: f(...Array.from(arguments).slice(1).map(a => a.y))
    };
}

// Simple collision test
function aabb(ax, ay, ar, bx, by, br) {
    return Math.abs(ax - bx) < (ar + br) / 2 && Math.abs(ay - by) < (ar + br) / 2;
}


function copy(o) {
    var output, v, key;
    output = Array.isArray(o) ? [] : {};
    for (key in o) {
        v = o[key];
        output[key] = (typeof v === "object") ? copy(v) : v;
    }
    return output;
}