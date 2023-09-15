const client = require("../common/connect");

const Account = (account) => {
  this.id = account.id;
  this.name = account.name;
  this.sex = account.sex;
};

Account.get_all = async () => {
  try {
    const res = await client.query("SELECT * FROM account");
    return JSON.stringify({ success: true, data: res?.rows, error: null });
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

Account.get_detail = async (id) => {
  try {
    const res = await client.query(
      `SELECT * FROM account a WHERE a.id = '${id}'`
    );
    return JSON.stringify({ success: true, data: res?.rows?.[0], error: null });
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

Account.add = async (data) => {
  try {
    const checkNameExists = await client.query(
      `SELECT count(*) FROM account a WHERE a.name = '${data.name}'`
    );
    if (checkNameExists?.rows?.[0]?.count === "0") {
      const res = await client.query(
        `INSERT INTO account (name, sex) VALUES ('${data?.name}', ${data?.sex})`
      );
      return JSON.stringify({
        success: true,
        data: res?.rows?.[0],
        error: null,
      });
    } else {
      return JSON.stringify({
        success: false,
        data: null,
        error: "Name already exists",
      });
    }
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

Account.update = async (id, data) => {
  if (Object.keys(data).length) {
    let arrField = Object.keys(data);
    arrField.forEach((e, i, arr) => {
      arr[i] = `${e} = ${e === "name" ? `'${data[e]}'` : data[e]}`;
    });
    try {
      await client.query(
        `UPDATE account SET ${arrField.join(", ")} WHERE id = '${id}'`
      );
      return JSON.stringify({ success: true, data: null, error: null });
    } catch (error) {
      return JSON.stringify({ success: false, data: null, error: error });
    }
  } else {
    return JSON.stringify({
      success: false,
      data: null,
      error: "Data cannot be empty",
    });
  }
};

Account.delete = async (id) => {
  try {
    await client.query(`DELETE FROM account a WHERE a.id = '${id}'`);
    return JSON.stringify({ success: true, data: null, error: null });
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

module.exports = Account;
