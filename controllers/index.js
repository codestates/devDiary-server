module.exports = {
	logout: async (req, res) => {
		req.session.destroy();
		res.status(205).send("logout successfully");
	},
};
