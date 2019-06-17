export default {
  back: '返回',
  save: '保存',
  reset: '重置',
  close: '关闭',
  next: 'Next',
  cancel: 'Cancel',
  skip: 'skip',

  menu_profile: '个人设置',
  menu_system_admin: '系统管理',

  flow: {
    create: '创建工作流',
    search: '输入关键词搜索',
    settings: '设置',
    config_yml: '配置 YML 工作流',

    hint: {
      name_required: '请输入工作流名称',
      name_size: '工作流名称长度需要小于 20 个字符',
      name_rule: '工作流名称仅可包含 a-z, A-Z, 0-9, _, -',
      name_duplicate: '工作流名称已使用',

      git_url_required: '请输入 Git URL',
      git_url_format: 'Git URL 必须以 https 或 git@ 为开始',

      ssh_create: '点击创建新的 ssh key',
      ssh_key_required: '请输入 SSH key'
    }
  },

  job: {
    run: '开始任务',
    tab: {
      info: 'Info',
      yml: 'Yml',
      logs: 'Logs'
    }
  },

  agent: {
    status: {
      busy: '运行',
      idle: '空闲',
      offline: '离线'
    }
  }
}
