export function flowNameRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.name_required'),
    v => (/^[A-Za-z0-9_-]+$/g.test(v)) || vue.$t('flow.hint.name_rule'),
    v => (v.length >= 1 && v.length <= 20) || vue.$t('flow.hint.name_size'),
  ]
}

export function gitUrlRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.git_url_required'),
    v => (/(^(http|https):\/\/)|(^git@)/g.test(v))
      || vue.$t('flow.hint.git_url_format')
  ]
}

export function sshEmailRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_email_required')
  ]
}

export function sshPublicKeyRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_key_required'),
    v => (/(^ssh-rsa)/g.test(v)) || vue.$t('flow.hint.ssh_public_format')
  ]
}

export function sshPrivateKeyRules (vue) {
  return [
    v => !!v || vue.$t('flow.hint.ssh_key_required'),
    v => (/(^-----BEGIN RSA PRIVATE KEY-----)/g.test(v))
      || vue.$t('flow.hint.ssh_private_format')
  ]
}
