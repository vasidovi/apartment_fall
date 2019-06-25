function getPixelCanvas(canvas, size, state) {
	const ctx = canvas.getContext('2d');
	canvas.focus();
	return {
		size: size,
		ctx: ctx,
		canvas: canvas,
		state: state,
		rect: function (x, y, width, height, color) {
			ctx.fillStyle = color || 'white';
			ctx.fillRect(
				Math.round(x) * pc.size,
				Math.round(y) * pc.size,
				Math.round(width) * pc.size,
				Math.round(height) * pc.size
			);
		},
		line: function (sx, sy, ex, ey, color) {
			var xlen = ex - sx;
			var ylen = ey - sy;
			var steps = Math.round(Math.max(Math.abs(xlen), Math.abs(ylen)));
			range(steps).map(i => i / steps).forEach(
				i => this.rect(sx + xlen * i, sy + ylen * i, 1, 1, color, ctx)
			);
		},
		listen: function (name, func) {
			canvas.addEventListener(name, function (e) {
				pc.state = func(pc.state, e) || pc.state;
			});
		},
		gameLoop: function (interval, func) {
			setInterval(() => pc.state = func(pc.state) || pc.state, interval);
		},
		screenSize: function () {
			return {
				x: Math.ceil(canvas.clientWidth / this.size),
				y: Math.ceil(canvas.clientHeight / this.size),
			};
		},
		screenMiddle: function () {
			return vdo(a => Math.floor(a / 2), this.screenSize());
		},
	};
}

function range(n) {
	if (n <= 0) return [];
	return range(n - 1).concat([n - 1]);
}

Number.prototype.mod = function (n) {
	return ((this % n) + n) % n;
};

function color(rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var a = rgb[3] || 1;
	return 'rgba(' + [r, g, b, a].join(', ') + ')';
}