export default {
  'code': 200,
  'message': 'success',
  'data': {
    'content': [
      {
        'id': '5cd2e62b3c09c31298cbbddb',
        'createdAt': 1557325355148,
        'updatedAt': 1557326050903,
        'createdBy': '5cd2df8f3c09c31298cbbdd8',
        'key': '5cd2e0613c09c31298cbbdd9-2',
        'flowId': '5cd2e0613c09c31298cbbdd9',
        'buildNumber': 2,
        'trigger': 'API',
        'status': 'SUCCESS',
        'expireAt': 1557328955147,
        'agentSelector': {
          'tags': [
            'local'
          ]
        },
        'currentPath': 'demo',
        'context': {
          'FLOWCI_SERVER_URL': '127.0.0.1',
          'FLOWCI_FLOW_NAME': 'demo',
          'FLOWCI_JOB_TRIGGER': 'API',
          'FLOWCI_JOB_BUILD_NUM': '2',
          'FLOWCI_JOB_STATUS': 'SUCCESS',
          'FLOWCI_GIT_REPO': 'flow.ci',
          'FLOWCI_GIT_COMMIT_ID': '532849578cee3c633ec5023bb2bee6570cc6f906',
          'FLOWCI_GIT_COMMIT_MESSAGE': 'Merge pull request #30 from yunheli/hotfix/delete_docker_builder',
          'FLOWCI_GIT_COMMIT_TIME': '2017-08-08T11:19:05+08:00',
          'FLOWCI_GIT_COMMIT_URL': 'https://github.com/yang-guo-2016/Test/commit/40d0dd6e8e942643d794d7ed8d27610fb8729914',
          'FLOWCI_GIT_AUTHOR': 'gy@fir.im',
          'FLOWCI_GIT_BRANCH': 'develop'
        }
      },
      {
        'id': '5cd2e17e3c09c31298cbbdda',
        'createdAt': 1557324158538,
        'updatedAt': 1557389030836,
        'createdBy': '5cd2df8f3c09c31298cbbdd8',
        'key': '5cd2e0613c09c31298cbbdd9-1',
        'flowId': '5cd2e0613c09c31298cbbdd9',
        'buildNumber': 1,
        'trigger': 'PUSH',
        'status': 'RUNNING',
        'expireAt': 1557327758527,
        'agentSelector': {
          'tags': [
            'local'
          ]
        },
        'currentPath': 'demo',
        'context': {
          'FLOWCI_SERVER_URL': '127.0.0.1',
          'FLOWCI_FLOW_NAME': 'demo',
          'FLOWCI_JOB_TRIGGER': 'PUSH',
          'FLOWCI_JOB_BUILD_NUM': '1',
          'FLOWCI_JOB_STATUS': 'RUNNING',
          'FLOWCI_GIT_REPO': 'flow.ci'
        }
      }
    ],
    'pageable': {
      'sort': {
        'sorted': true,
        'unsorted': false
      },
      'pageSize': 20,
      'pageNumber': 0,
      'offset': 0,
      'paged': true,
      'unpaged': false
    },
    'last': true,
    'totalPages': 1,
    'totalElements': 2,
    'first': true,
    'sort': {
      'sorted': true,
      'unsorted': false
    },
    'numberOfElements': 2,
    'size': 20,
    'number': 0
  }
}
