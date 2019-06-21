export default {
  back: 'Back',
  save: 'Save',
  reset: 'Reset',
  close: 'Close',
  next: 'Next',
  cancel: 'Cancel',
  skip: 'Skip',
  create: 'Create',
  test: 'Test',

  menu_profile: 'Profile',
  menu_system_admin: 'Admin',

  flow: {
    create: 'Create Flow',
    search: 'Search by key words',
    settings: 'Settings',
    config_yml: 'YML Config',

    create_title_name: 'Enter Flow Name',
    create_title_git_url: 'Config Git URL',
    create_title_git_access: 'Config Git Access',
    create_title_git_test: 'Test Git Connection',
    create_title_yml: 'Config YML',

    create_btn_finish: 'Finish',

    hint: {
      name_required: 'Name is required',
      name_size: 'Name must be less than 20 character',
      name_rule: 'Name only accept character of a-z, A-Z, 0-9, _, -',
      name_duplicate: 'Flow name already exists',

      git_skip: 'Setup Git access later',
      git_url_required: 'Git URL is required',
      git_url_format: 'Git URL must be start with https or git@',

      ssh_create: 'click to create new ssh key',
      ssh_email_title: 'Enter the email to create ssh-rsa',
      ssh_email_required: 'Email is required for create ssh-rsa',
      ssh_key_required: 'SSH key is required',
      ssh_public_format: 'Start with ssh-rsa',
      ssh_private_format: 'Start with -----BEGIN RSA PRIVATE KEY-----'
    }
  },

  job: {
    run: 'Run',
    tab: {
      info: 'Info',
      yml: 'Yml',
      logs: 'Logs'
    }
  },

  agent: {
    status: {
      busy: 'busy',
      idle: 'idle',
      offline: 'offline'
    }
  }
}
