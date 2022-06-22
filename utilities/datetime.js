/**
 * @file utils datetime.js
 * @author Rizky Adji Pangestu
 */

const datetime = function () {
  let date = new Date();
  return (
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDay().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString()
  );
};

module.exports = datetime;