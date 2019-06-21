export default {
  back: '返回',
  save: '保存',
  reset: '重置',
  close: '关闭',
  next: '下一步',
  cancel: '取消',
  skip: '跳过',
  create: '创建',
  test: '测试',

  menu_profile: '个人设置',
  menu_system_admin: '系统管理',

  flow: {
    create: '创建 Flow',
    search: '输入关键词搜索',
    settings: '设置',
    config_yml: '配置 YML',

    create_title_name: '输入 Flow 名称',
    create_title_git_url: '配置 Git URL',
    create_title_git_access: '配置 Git 权限',
    create_title_git_test: '测试 Git 链接',
    create_title_yml: '配置 YML',

    create_btn_finish: '完成创建',

    hint: {
      name_required: '请输入 Flow 名称',
      name_size: 'Flow 名称长度需要小于 20 个字符',
      name_rule: 'Flow 名称仅可包含 a-z, A-Z, 0-9, _, -',
      name_duplicate: 'Flow 名称已使用',

      git_skip: '稍后配置 Git 仓库链接',
      git_url_required: '请输入 Git URL',
      git_url_format: 'Git URL 必须以 https 或 git@ 为开始',

      ssh_create: '点击创建新的 ssh key',
      ssh_email_title: '请输入创建 ssh-rsa 的邮箱地址',
      ssh_email_required: 'Email 是创建 ssh-rsa 的必填项',
      ssh_key_required: '请输入 SSH key',
      ssh_public_format: 'Start with ssh-rsa',
      ssh_private_format: 'Start with -----BEGIN RSA PRIVATE KEY-----'
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
