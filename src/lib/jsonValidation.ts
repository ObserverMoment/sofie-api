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
