export async function handleFetchData(response) {
  const { headers } = response
  const contentType = headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  } else {
    return response.text()
  }
}

export function responseWith(body, status) {
  return new Response(body, {
    status,
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8'
    }
  })
}

export const status = {
  Accepted: 202,
  BadRequest: 400,
  InternalError: 500,
  NotFound: 404,
  OK: 200,
  Redirect: 301
}
