import Config from './store/config'

export default {
  listLatestJobs (flows) {
    const url = `${Config.host}/jobs/status/latest`
    return url
  }
}
