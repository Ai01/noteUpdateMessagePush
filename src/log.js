const log = (err) => {
  if (!err) return;
  console.log(err);
  console.log('=========================');
};

const create_base_error = (description, error) => {
  return { description, error }
};

const create_base_info = (info) => {
  return { info };
}

module.exports = {
  log,
  create_base_error,
  create_base_info
};
