module.exports = {
  greeting(req, res) {
    res.send({ text: "hello" });
  },

  create(req, res) {
    res.send({ hi: 'hello' });
  }
};
