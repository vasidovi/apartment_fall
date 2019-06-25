const gameData = {
	main: {
		rows: 14,
		cols: 7,
		gridfactor: 20,
		margin: 5,
	},
	interval: 20,
	colors: {
		background: "black",
    },
    types: {
        cafe: {
            color: "red",
            src: 'https://i.imgur.com/tveexXz.png'
        },
        room: {
            color: "green"
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