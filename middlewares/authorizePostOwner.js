const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Middleware parametrico per autorizzazione modifica/cancellazione di post.
 * - UPDATE: consente a admin, editor, owner
 * - DELETE: consente solo a admin e owner
 * 
 * @param {'update'|'delete'} action - L'azione richiesta
 * @returns {function}
 */
function authorizePostOwner(action) {
  return async function (req, res, next) {
    try {
      const postSlug = req.params.slug;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Recupera il post dal DB con lo slug fornito
      const post = await prisma.post.findUnique({
        where: { slug: postSlug }
      });

      if (!post) {
        return res.status(404).json({ message: 'Post non trovato' });
      }

      if (action === 'update') {
        // Permetti admin, editor, owner
        if (
          userRole === 'admin' ||
          userRole === 'editor' ||
          post.authorId === userId
        ) {
          return next();
        }
      } else if (action === 'delete') {
        // Permetti solo admin, owner
        if (
          userRole === 'admin' ||
          post.authorId === userId
        ) {
          return next();
        }
      }

      return res.status(403).json({
        message:
          'Attenzione! Non si possiedono le credenziali necessarie per questa azione sul post'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = authorizePostOwner;
