import Joi from 'joi'

//////////////////////////////////////////////////////////////
//// Workout Meta Data (Server side only) JSON validation ////
//////////////////////////////////////////////////////////////
const WorkoutMetaDataSchema = Joi.object({
  bodyweightOnly: Joi.boolean().required(),
  moves: Joi.array().items(Joi.string()).required(),
  bodyAreas: Joi.array().items(Joi.string()).required(),
})

export const validateWorkoutMetaData = (input: any): boolean => {
  const result = WorkoutMetaDataSchema.validate(input)
  if (result.error) {
    console.log(result.error)
    return false
  } else {
    return true
  }
}

///////////////////////////////////////////////////////
//// LoggedWorkoutSection.lapTimes JSON validation ////
///////////////////////////////////////////////////////
// export interface WorkoutSectionData {
//   rounds: RoundData[]
// }

// export interface RoundData {
//   timeTakenMs: number
//   sets: SetData[]
// }

// export interface SetData {
//   timeTakenMs: number
//   move: string
//   load: string
//   quantity: string
// }

// const SetDataSchema = Joi.object({
//   timeTakenMs: Joi.number().optional(),
//   move: Joi.string().required(),
//   load: Joi.string().optional(),
//   quantity: Joi.string().required(),
// })

// const RoundDataSchema = Joi.object({
//   timeTakenMs: Joi.number().optional(),
//   sets: Joi.array().items(SetDataSchema).required(),
// })

// const WorkoutSectionDataSchema = Joi.object({
//   rounds: Joi.array().items(RoundDataSchema).required(),
// })

// export const validateWorkoutSectionData = (input: any): boolean => {
//   const result = WorkoutSectionDataSchema.validate(input)
//   if (result.error) {
//     console.log(result.error)
//     return false
//   } else {
//     return true
//   }
// }
