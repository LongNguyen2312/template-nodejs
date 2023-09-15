// Gọi sang model
const Account = require("../models/account.model");

exports.account = async (req, res) => {
  const data = await Account.get_all();
  res.send(data);
};

exports.detail = async (req, res) => {
  const data = await Account.get_detail(req.params.id);
  res.send(data);
};

exports.add = async (req, res) => {
  const data = await Account.add(req.body);
  res.send(data);
};

exports.update = async (req, res) => {
  const data = await Account.update(req.params.id, req.body);
  res.send(data);
};

exports.delete = async (req, res) => {
  const data = await Account.delete(req.params.id);
  res.send(data);
};
