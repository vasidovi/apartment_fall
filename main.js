pc.gameLoop(gameData.interval, last => {

	var state = {
		...last
	};

	var screenSize = pc.screenSize();
	var middle = pc.screenMiddle();

	var gridfactor = Math.floor((screenSize.y - gameData.main.margin * 2) / gameData.main.rows);

	var gameArea = {
		width: gameData.main.cols * gridfactor + gameData.main.margin * 2,
		height: gameData.main.rows * gridfactor + gameData.main.margin * 2
	};

	var center = {
		x: middle.x - gameArea.width / 2,
		y: screenSize.y - gameArea.height
	}

	// Clear screen
	pc.rect(center.x, center.y, gameArea.width, gameArea.height, gameData.colors.background);


	var initialBlock = {
		pos: {
			x: Math.floor(gameData.main.cols / 2),
			y: 0,
		},
		type: Object.keys(gameData.types)[0],
		size: gridfactor
	}

	var block = state.block || initialBlock;


	var moveKey = 'move';
	if (!last.timeStamp[moveKey] ||
		Date.now() - last.timeStamp[moveKey] > gameData.cooldowns.switchColumn) {
		last.timeStamp[moveKey] = Date.now();

		// Move falling block
		var move = {
			x: last.keys.includes('d') ? 1 : (last.keys.includes('a') ? -1 : 0),
			y: last.keys.includes('s') ? 1 : 0,
		};

		if (move.y) {
			block.released = true;
		}

		var obstacleAlongXAxis = state.blocks.find(
			b => block.pos.x + move.x === b.pos.x &&
			block.pos.y + 1 >= b.pos.y);

		if (!obstacleAlongXAxis) {
			block.pos.x += move.x;
			block.pos.x = Math.max(0, block.pos.x);
			block.pos.x = Math.min(gameData.main.cols - 1, block.pos.x);
		}

	}

	var isColision = block.pos.y + 1 >= gameData.main.rows;

	var standingBlock = state.blocks.find(
		b => block.pos.y + 1 >= b.pos.y &&
		block.pos.x === b.pos.x
	);

	if (standingBlock) {
		isColision = true;
	}

	if (isColision) {
		// Restart game
		if (block.pos.x === initialBlock.pos.x && block.pos.y === initialBlock.pos.y) {
			return copy(initialState);
		}
		var savedBlock = copy(block);
		savedBlock.color = gameData.types[block.type].color;
		savedBlock.pos.y = Math.floor(savedBlock.pos.y);
		state.blocks.push(savedBlock);

		block = initialBlock;
		block.type = random(gameData.types)
	} else {
		drawBlock(block, center);
		block.pos.y += gameData.main.blockSpeed * (block.released ? 6 : 1);
	}

	state.blocks.forEach(b => drawBlock(b, center));

	state = {
		...last,
		block,
		move
	}

	return state;
});

function drawBlock(block, center) {
	var img = gameData.types[block.type].img;
	if (img && img.complete) {
		pc.drawImage(
			img,
			block.pos.x * block.size + center.x + gameData.main.margin,
			block.pos.y * block.size + center.y + gameData.main.margin,
			block.size,
			block.size);
	} else {
		pc.rect(block.pos.x * block.size + center.x + gameData.main.margin,
			block.pos.y * block.size + center.y + gameData.main.margin,
			block.size,
			block.size,
			gameData.types[block.type].color);
	}
}