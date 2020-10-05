module.exports = (io) => {
	io.on("connection", (socket) => {
		const id = socket.handshake.query.id;
		socket.join(id);
		console.log("user connected with id: ", id);
		socket.on("transaction", ({ title, message, receiverId }) => {
			socket.broadcast
				.to(receiverId)
				.emit("transaction", { title, message });
		});
	});
};
