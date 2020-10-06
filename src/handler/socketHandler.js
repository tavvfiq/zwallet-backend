module.exports = (io) => {
	io.on("connection", (socket) => {
		const id = socket.handshake.query.id;
		socket.join(id);
		console.log("user connected with id: ", id);
	});
};
