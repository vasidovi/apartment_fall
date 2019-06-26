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
        background: "#8bf",
        grass: "#9b5"
    },
    types: {
        cafe: {
            color: "yellow",
            src: 'images/cafe.png',
            bonus: {
                room: 2,
                cafe: -3,
                shop: 1,
                bath: -1,
            }
        },
        room: {
            color: "thistle",
            src: 'images/room.png',
            bonus: {
                room: -3,
                cafe: -2,
                shop: 3,
                bath: 1,
            }
        },
        bath: {
            color: 'blue',
            src: 'images/bath.png',
            bonus: {
                room: 1,
                cafe: -1,
                shop: -1,
                bath: 0,
            }
        },
        shop: {
            color: 'green',
            src: 'images/shop.png',
            bonus: {
                room: 3,
                cafe: 1,
                shop: -4,
                bath: -1,
            }
        }
    },
    objects: {
        wall: {
            src: 'images/wall.png',
        },
        bush: {
            src: 'images/bush.png',
        },
        cloud: {
            src: 'images/cloud.png',
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