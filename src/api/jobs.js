import Config from '../store/http'

export default {
  listLatestJobs (flows) {
    const url = `${Config.host}/jobs/status/latest`
    return url
  }
}
