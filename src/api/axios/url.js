import Config from '../../store/config'

export default {
  jobs: `${Config.host}/jobs`,
  flows: `${Config.host}/flows`,
  credentials: `${Config.host}/credentials`
}
