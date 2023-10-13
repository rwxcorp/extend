import { handleFetchData, responseWith, status } from './utils.js'

function getRandomLine(text, queries) {
  const lines = text.split('\n')
  const filteredLines = lines.filter(
    (line) => !(!line.trim() || line.trim().startsWith('#'))
  )

  if (filteredLines.length === 0) {
    throw new Error('No valid lines found in the text')
  }

  const randomIndex = Math.floor(Math.random() * filteredLines.length)
  const randomLine = filteredLines[randomIndex]
  const parsed = parseText(randomLine, queries)

  return parsed
}

function parseText(text, queries) {
  const variables = text.match(/\$\((\w+)\)/g)

  if (variables) {
    for (const variable of variables) {
      const key = variable.slice(2, -1)

      if (
        queries[key] === null ||
        queries[key] === '' ||
        typeof queries[key] === 'undefined'
      ) {
        throw new Error(`Data for variable $(${key}) is null or undefined`)
      }
    }
  }

  const { channel, randuser, randnum, target, user } = queries
  const args =
    queries.args === null ||
    queries.args === '' ||
    typeof queries.args === 'undefined'
      ? []
      : queries.args.split(',').map((arg) => arg.trim())

  let parsed = text
    .replaceAll('$(channel)', channel)
    .replaceAll('$(randuser)', randuser)
    .replaceAll('$(randnum)', randnum)
    .replaceAll('$(target)', target)
    .replaceAll('$(user)', user)
    .replace(/\$\(args\.([1-9][0-9]*)\)/g, (match, index) => {
      const argIndex = parseInt(index)
      if (argIndex < 1 || argIndex > args.length) {
        throw new Error(`$(args.${argIndex}) is null or undefined`)
      }

      const argValue = args[argIndex - 1]
      if (
        argValue === null ||
        argValue === '' ||
        typeof argValue === 'undefined'
      ) {
        throw new Error(
          `Data for custom variable $(args.${argIndex}) is null or undefined`
        )
      }

      return argValue
    })

  return parsed
}

export default async function pastebin({ req }) {
  const paste = req.params.paste
  const queries = req.query

  try {
    const data = await fetch(`https://pastebin.com/raw/${paste}`, {
      headers: {
        'access-control-allow-origin': '*'
      }
    })

    if (data?.status != status.OK) {
      return responseWith('Pastebin not found', status.NotFound)
    }

    const text = await handleFetchData(data)
    const randomLine = getRandomLine(text, queries)

    return responseWith(randomLine, status.OK)
  } catch (error) {
    console.log(error)
    return responseWith(error.message, status.BadRequest)
  }
}
