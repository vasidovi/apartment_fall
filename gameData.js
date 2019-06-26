const gameData = {
	main: {
		rows: 9,
        cols: 5,
        blockSpeed: 0.066,
		gridfactor: 20,
        margin: 5,
        grassX: 20,
	},
	interval: 50,
	colors: {
        background: "#abf",
        grass: "#9b5"
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
    objects: {
        wall: {
            src: 'images/wall.png',
        },
        bush: {
            src: 'images/bush.png',
        },

    },
    cooldowns: {
        switchColumn: 150
    }
}

Object.values({...gameData.types, ...gameData.objects}).forEach(
    t => {
        if (t.src){
            t.img = new Image();
            t.img.src = t.src;
        }
    }
)