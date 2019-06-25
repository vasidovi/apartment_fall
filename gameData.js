const gameData = {
	main: {
		rows: 14,
        cols: 7,
        blockSpeed: 0.3,
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
            src: 'https://i.imgur.com/CEEhrPd.png'
        },
        room: {
            color: "thistle",
            src: 'https://i.imgur.com/AIuu3RT.png'
        },
        bath: {
            color: 'blue',
            src: 'https://i.imgur.com/WSLGi6h.png'
        },
        shop: {
            color: 'green',
            src: 'https://i.imgur.com/ZUlrBEi.png'
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