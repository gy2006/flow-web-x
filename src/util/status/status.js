export function status (status) {
  if (status === 'SUCCESS') {
    return 'success'
  } else if (status === 'TIMEOUT') {
    return 'timeout'
  } else if (status === 'ENQUEUE') {
    return 'info'
  } else if (status === 'RUNNING') {
    return 'info'
  }
}
