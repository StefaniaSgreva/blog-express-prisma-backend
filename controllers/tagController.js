const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const NotFoundError = require('../exceptions/NotFoundError');

// Recupera tutti i tag
async function index(req, res, next) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { createdAt: 'asc' }
    });
    res.json(tags);
  } catch (err) {
    next(err);
  }
}

// Recupera un singolo tag tramite ID
async function show(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundError();
    res.json(tag);
  } catch (err) {
    next(err);
  }
}

// Crea un nuovo tag
async function store(req, res, next) {
  const data = req.body;
  try {
    const newTag = await prisma.tag.create({ data });
    res.status(201).json(newTag);
  } catch (err) {
    next(err);
  }
}

// Aggiorna un tag tramite ID
async function update(req, res, next) {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundError();

    const updatedTag = await prisma.tag.update({
      where: { id },
      data,
    });
    res.json(updatedTag);
  } catch (err) {
    next(err);
  }
}

// Elimina un tag tramite ID
async function destroy(req, res, next) {
  const id = parseInt(req.params.id);
  try {
    const tag = await prisma.tag.findUnique({ where: { id } });
    if (!tag) throw new NotFoundError();

    await prisma.tag.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy
};
