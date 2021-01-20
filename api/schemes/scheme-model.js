// scheme-model
const db = require('../../data/db-config')

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes')
}

function findById(id) {
  return db('schemes')
  .where({ id })
  .first()
}

async function add(scheme) {
  const [id] = await db('schemes').insert(scheme);
  return findById(id);
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('schemes')
    .where({ id })
    .update(changes, '*');
}

function findSteps(schemeId) {
  return db('steps as p')
    .join('schemes as s', 's.id', 'p.scheme_id')
    .select('p.step_number', 'p.instructions')
    .where('s.id', schemeId)
    .orderBy('p.step_number')
}