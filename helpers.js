// apply function along x and y axis
function vdo(f) {
	return {
		x: f(...Array.from(arguments).slice(1).map(a => a.x)),
		y: f(...Array.from(arguments).slice(1).map(a => a.y))
	};
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

function random(arr = []) {

	if (!(arr instanceof Array)) {
		arr = Object.keys(arr);
	}

	return arr.length > 0 
		? arr[Math.floor(Math.random() * arr.length)]
		: undefined;
}