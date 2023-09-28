const { Todo } = require("../models");

const get_todo = (req, res) => {
  Todo.findAll().then((result) => {
    res.json({ data: result });
  });
};
const post_todo = async (req, res) => {
  const { title } = req.body;
  Todo.create({ title }).then(() => {
    res.json({ result: true });
  });
};
const patch_todo = (req, res) => {
  if (req.body.done === undefined) {
    const { id, title } = req.body;
    Todo.update({ title }, { where: { id: id } }).then(() => {
      res.json({ result: true });
    });
  } else {
    const { id, done } = req.body;
    console.log(done);
    Todo.update({ done: done.done }, { where: { id: id.id } }).then(() => {
      res.json({ result: true });
    });
  }
};
const delete_todo = (req, res) => {
  const { id } = req.body;
  Todo.destroy({
    where: { id: id.id },
  }).then(() => {
    res.json({ result: true });
  });
};

module.exports = { get_todo, post_todo, patch_todo, delete_todo };
