// Example of a middleware which adds attributes to args object (must mutate in place - like Koa context)
// Then modifies the return value (afterware - before sending on)
async function addName (parent, args, context, info, next) {
  args.name = 'Rich'
  args.secret = 'Test number 4'
  const returnVal = await next()
  return JSON.stringify({ returnVal, hacked: true })
}

module.exports = addName
