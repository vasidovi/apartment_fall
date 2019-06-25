pc.gameLoop(gameData.interval, last => {

	var state = {
		...last
	};

	var middle = pc.screenMiddle();

	var gameArea = {
		width: gameData.main.cols * gameData.main.gridfactor + gameData.main.margin * 2,
		height: gameData.main.rows * gameData.main.gridfactor + gameData.main.margin * 2
	};

	var center = {
		x: middle.x - gameArea.width / 2,
		y: middle.y - gameArea.height / 2
	}

	pc.rect(center.x, center.y, gameArea.width, gameArea.height, gameData.colors.background);


	var initialBlock = {
		pos: {
			x: Math.floor(gameData.main.cols / 2),
			y: 0,
        },
        type: Object.keys(gameData.types)[0],
		size: gameData.main.gridfactor
	}

	var block = state.block || initialBlock;

	drawBlock(block, center);

	// Move falling block
	var move = {
		x: last.keys.includes('d') ? 1 : (last.keys.includes('a') ? -1 : 0),
		y: last.keys.includes('s') ? 1 : 0,
	};

	// Clear screen
	var screenSize = pc.screenSize();

	var obstacleAlongXAxis = state.blocks.find(
		b => block.pos.x + move.x === b.pos.x &&
		block.pos.y + 1 >= b.pos.y);

	if (!obstacleAlongXAxis) {
		block.pos.x += move.x;
		block.pos.x = Math.max(0, block.pos.x);
		block.pos.x = Math.min(gameData.main.cols - 1, block.pos.x);
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
		var savedBlock = copy(block);
		savedBlock.color = gameData.types[block.type].color;
		savedBlock.pos.y = Math.floor(savedBlock.pos.y);
        state.blocks.push(savedBlock);
        
        block = initialBlock;
        block.type = random(gameData.types)
	} else {
		block.pos.y += 0.14;
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
	pc.rect(block.pos.x * block.size + center.x + gameData.main.margin,
		block.pos.y * block.size + center.y + gameData.main.margin,
		block.size,
		block.size,
		gameData.types[block.type].color);
}