import { PrismaClient } from '@prisma/client'

export interface SelectedFields {
  [key: string]: {
    [key: string]: boolean
  }
}

export interface Context {
  prisma: PrismaClient
  selected?: SelectedFields
}
