const gameData = {
	main: {
		rows: 9,
        cols: 5,
        blockSpeed: 0.1,
		gridfactor: 20,
		margin: 5,
	},
	interval: 20,
	colors: {
		background: "black",
    },
    types: {
        cafe: {
            color: "yellow",
            src: 'images/cafe.png'
        },
        room: {
            color: "thistle",
            src: 'images/room.png'
        },
        bath: {
            color: 'blue',
            src: 'images/bath.png'
        },
        shop: {
            color: 'green',
            src: 'images/shop.png'
        }
    },
    cooldowns: {
        switchColumn: 150
    }
}

Object.values(gameData.types).forEach(
    t => {
        if (t.src){
            t.img = new Image();
            t.img.src = t.src;
        }
    }
)