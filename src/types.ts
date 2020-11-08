import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: any
  // https://paljs.com/plugins/select
  select?: any
}
