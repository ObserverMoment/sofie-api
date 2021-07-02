import { Context } from '../..'
import {
  DiscoverFeatured,
  DiscoverWorkoutCategory,
  DiscoverWorkoutPlanCategory,
} from '../../generated/graphql'

//// Queries ////
export const discoverFeatured = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const discoverFeatured = await prisma.discoverFeatured.findMany({
    select,
  })
  return discoverFeatured as DiscoverFeatured[]
}

export const discoverWorkoutCategories = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const discoverWorkoutCategories =
    await prisma.discoverWorkoutCategory.findMany({
      where: {
        active: true,
      },
      select,
    })
  return discoverWorkoutCategories as DiscoverWorkoutCategory[]
}

export const discoverWorkoutPlanCategories = async (
  r: any,
  a: any,
  { select, prisma }: Context,
) => {
  const discoverWorkoutPlanCategories =
    await prisma.discoverWorkoutPlanCategory.findMany({
      where: {
        active: true,
      },
      select,
    })
  return discoverWorkoutPlanCategories as DiscoverWorkoutPlanCategory[]
}
