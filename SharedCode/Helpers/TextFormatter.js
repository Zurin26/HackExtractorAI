const getFullName = (data) => {
  const nameArray = [data.Firstname];

  if(data.MiddleName) {
    nameArray.push(data.MiddleName[0] + '.');
  }

  nameArray.push(data.LastName);

  return nameArray.join(' ');
};

module.exports = {
  getFullName,
}