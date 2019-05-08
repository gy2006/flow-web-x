export function status (status) {
  if (status === 'SUCCESS') {
    return 'success'
  }

  if (status === 'TIMEOUT') {
    return 'timeout'
  }

  if (status === 'ENQUEUE') {
    return 'info'
  }

  if (status === 'RUNNING') {
    return 'info'
  }

  if (status === '"PENDING"') {
    return 'timeout'
  }
}
