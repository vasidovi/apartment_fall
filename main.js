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

	var grassW = gridfactor;
	var grassY = screenSize.y - grassW;
	
	var score = state.score;
	
	if (!last.initialized) {
		for (var i = 0; i < screenSize.x / 20; i++) {
			var size = (Math.random() / 2 + 0.5)* gridfactor * 2;
			last.objects.push({
				type: "bush",
				size: size,
				pos: {
					x: Math.random() * screenSize.x - size / 2,
					y: grassY - size
				}
			})
		}

		for (var i = 0; i < screenSize.x / 20; i++) {
			var size = (Math.random() / 2 + 0.5)* gridfactor * 2;
			last.objects.push({
				type: "cloud",
				size: size,
				pos: {
					x: Math.random() * screenSize.x - size / 2,
					y: Math.random() * screenSize.y / 2
				}
			})
		}

		last.initialized = true;
	}


	// Clear screen
	pc.rect(0, 0, screenSize.x, grassY, gameData.colors.background);
	pc.rect(0, grassY, screenSize.x, grassW, gameData.colors.grass)


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

	

	drawObjects(state);
	drawWalls(state, center);
	state.blocks.forEach(b => drawBlock(b, center));

	var thisBonus = last.lastBonus;

	if (isColision) {
		// Restart game
		if (block.pos.x === initialBlock.pos.x && block.pos.y === initialBlock.pos.y) {
			return getInitialState();
		}
		var savedBlock = copy(block);
		savedBlock.color = gameData.types[block.type].color;
		savedBlock.pos.y = Math.floor(savedBlock.pos.y);
		state.blocks.push(savedBlock);
		thisBonus = getPlacementScore(savedBlock,state); 
		score += thisBonus;
		drawBlock(savedBlock, center);

		block = initialBlock;
		block.type = random(gameData.types)
	} else {
		drawBlock(block, center);
		markNeighbours(block, state, center);
		block.pos.y += gameData.main.blockSpeed * (block.released ? 6 : 1);
	}
	
	if (thisBonus){
		var color = (thisBonus > 0) ? "green" : (thisBonus < 0) ? "red" : "black";  
    prinPrintCurrentScore(thisBonus, color, center, gameArea);
	}

	printScore(score, center, gameArea);

	state = {
		...last,
		score,
		lastBonus: thisBonus,
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

function drawWalls(state, center) {
	var screenSize = pc.screenSize();
	
	var leftBlocks = state.blocks.filter(b=>b.pos.x === 0);
	
	pc.ctx.save();
	pc.ctx.scale(-1,1);
	leftBlocks.forEach((b, i) => {
		pc.drawImage(
			gameData.objects.wall.img, 
			- center.x - gameData.main.margin , 
			screenSize.y - gameData.main.margin - b.size * (i + 1),
			b.size,
			b.size
			)
	});
	pc.ctx.restore()
	var rightBlocks = state.blocks.filter(b=>b.pos.x === gameData.main.cols - 1);
	rightBlocks.forEach((b, i) => {
		pc.drawImage(
			gameData.objects.wall.img, 
			center.x + gameData.main.margin + gameData.main.cols * b.size, 
			screenSize.y - gameData.main.margin - b.size * (i + 1),
			b.size,
			b.size
			)
	});
}

function drawObjects(state){
	state.objects.forEach(o => {
		pc.drawImage(
			gameData.objects[o.type].img,
			o.pos.x,
			o.pos.y,
			o.size,
			o.size
		)
	})
}
function prinPrintCurrentScore(score, color, center, gameArea){

	var ctx = pc.ctx;
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = color;
	ctx.textAlign = "right";
	ctx.fillText("$" + score,
		(center.x + gameArea.width - gameData.main.margin) * pc.size,
		(center.y + gameData.main.margin *4 ) * pc.size); 
}

function printScore(score, center, gameArea){
	var ctx = pc.ctx;
	ctx.font = "30px Comic Sans MS";
	ctx.fillStyle = "black";
	ctx.textAlign = "right";
	ctx.fillText("$" + score,
		(center.x + gameArea.width - gameData.main.margin) * pc.size,
		(center.y + gameData.main.margin *2 ) * pc.size); 

}

function markNeighbours(block, state, center){

	var landingHeight = gameData.main.rows - 
	state.blocks.filter(
		b => (block.pos.x === b.pos.x ) 
	).length;

	var neighbours = state.blocks.filter(
		b => (block.pos.x === b.pos.x + 1
		|| block.pos.x === b.pos.x - 1)
		&& landingHeight - 1 === b.pos.y);

		neighbours.forEach( n => { 
			var bonus = gameData.types[n.type].bonus[block.type];
			var options = {
				type: "stroke",
				lineWidth: Math.abs(bonus) + 1
			};
			var color = "white";
			if (bonus > 0){
				color = "green";
			} else if (bonus < 0){
				color = "red";
			}

			pc.rect(n.pos.x * block.size + center.x + gameData.main.margin,
				n.pos.y * block.size + center.y + gameData.main.margin,
				block.size, block.size, color, options);
		})

}

function getPlacementScore(block, state){
	// neighbours to the left and right 
	var neighbours = state.blocks.filter(
		b => (block.pos.x === b.pos.x + 1
		|| block.pos.x === b.pos.x - 1)
		&& block.pos.y === b.pos.y)
		.map( n => n.type);

	var sumBonus = 0;	

	neighbours.forEach( n => 
		sumBonus += gameData.types[n].bonus[block.type]);	
	
	return sumBonus;
}