import { ApolloError } from 'apollo-server-errors'
import { Context } from '../..'
import {
  MutationAddDocumentToSkillArgs,
  MutationCreateSkillArgs,
  MutationDeleteSkillByIdArgs,
  MutationRemoveDocumentFromSkillArgs,
  MutationUpdateSkillArgs,
  Skill,
} from '../../generated/graphql'
import { deleteFiles } from '../../lib/uploadcare'
import { checkUserOwnsObject } from '../utils'

////// Mutations //////
export const createSkill = async (
  r: any,
  { data }: MutationCreateSkillArgs,
  { authedUserId, select, prisma }: Context,
) => {
  const skill = await prisma.skill.create({
    data: {
      ...data,
      User: {
        connect: { id: authedUserId },
      },
    },
    select,
  })

  if (skill) {
    return skill as Skill
  } else {
    throw new ApolloError('createSkill: There was an issue.')
  }
}

export const updateSkill = async (
  r: any,
  { data }: MutationUpdateSkillArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'skill', authedUserId, prisma)

  const skill = await prisma.skill.update({
    where: { id: data.id },
    data: {
      ...data,
      name: data.name || undefined,
    },
    select,
  })

  if (skill) {
    return skill as Skill
  } else {
    throw new ApolloError('updateSkill: There was an issue.')
  }
}

export const deleteSkillById = async (
  r: any,
  { id }: MutationDeleteSkillByIdArgs,
  { authedUserId, prisma }: Context,
) => {
  await checkUserOwnsObject(id, 'skill', authedUserId, prisma)

  const deleted = await prisma.skill.delete({
    where: { id },
    select: {
      id: true,
      documentUri: true,
    },
  })

  if (deleted) {
    if (deleted.documentUri) {
      await deleteFiles([deleted.documentUri])
    }
    return deleted.id
  } else {
    throw new ApolloError('deleteSkillById: There was an issue.')
  }
}

export const addDocumentToSkill = async (
  r: any,
  { data }: MutationAddDocumentToSkillArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'skill', authedUserId, prisma)

  const skill = await prisma.skill.update({
    where: {
      id: data.id,
    },
    data: {
      documentUri: data.uri,
    },
    select,
  })

  if (skill) {
    return skill as Skill
  } else {
    throw new ApolloError('addDocumentToSkill: There was an issue.')
  }
}

export const removeDocumentFromSkill = async (
  r: any,
  { data }: MutationRemoveDocumentFromSkillArgs,
  { authedUserId, select, prisma }: Context,
) => {
  await checkUserOwnsObject(data.id, 'skill', authedUserId, prisma)

  const prev = await prisma.skill.findUnique({
    where: { id: data.id },
    select: {
      documentUri: true,
    },
  })

  if (!prev) {
    throw new ApolloError('we were not able to retrieve the Skill for update.')
  }

  const skill = await prisma.skill.update({
    where: {
      id: data.id,
    },
    data: {
      documentUri: null,
    },
    select,
  })

  if (skill) {
    // Media cleanup
    if (prev.documentUri) {
      await deleteFiles([prev.documentUri])
    }
    return skill as Skill
  } else {
    throw new ApolloError('removeDocumentFromSkill: There was an issue.')
  }
}
