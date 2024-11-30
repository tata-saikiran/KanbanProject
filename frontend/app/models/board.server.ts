import { Board, User } from '@prisma/client'

import { db } from '~/db.server'

export function getAllPublicProjects() {
  return db.board.findMany({
    where: {
      is_public: true,
    },
    include: {
      user: true,
    },
  })
}

export function getProjectsByUser(user_id: User['id']) {
  return db.board.findMany({
    where: {
      user_id,
    },
    include: {
      user: true,
    },
  })
}

export function getProjectById(id: Board['id']) {
  return db.board.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  })
}
