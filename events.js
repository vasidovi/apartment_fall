// === Keep track of keystrokes ===
pc.listen('keydown', (last, e) => {

	var key = e.key.toLowerCase();

	if (['a', 'd', 's'].includes(key)) {
		delete last.timeStamp['move'];
	}

	return {
		...last,
		keys: last.keys.concat([key])
	};

});

pc.listen('keyup', (last, e) => {
	var key = e.key.toLowerCase();
	return {
		...last,
		keys: last.keys.filter(x => key != x)
	};
});