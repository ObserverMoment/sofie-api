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
export interface WorkoutSectionLapTimes {
  [roundNumber: number]: {
    lapTimeMs?: number
    setLapTimesMs: {
      [setId: string]: number
    }
  }
}

const WorkoutSectionLapTimesSchema = Joi.object().pattern(
  Joi.string(),
  Joi.object({
    lapTimeMs: Joi.number().integer().optional(),
    setLapTimesMs: Joi.object()
      .pattern(Joi.string(), Joi.number().integer())
      .optional(),
  }).or('lapTimeMs', 'setLapTimesMs'),
)

export const validateWorkoutSectionLapTimesMs = (input: any): boolean => {
  const result = WorkoutSectionLapTimesSchema.validate(input)
  if (result.error) {
    console.log(result.error)
    return false
  } else {
    return true
  }
}
