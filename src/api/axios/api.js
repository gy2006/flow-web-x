import { fetch } from './fetch'
import api from './url'

export function jobsList (param) {
  return fetch({
    url: `${api.jobs}/${param}`,
    method: 'get'
  })
}

export function createFlow (name) {
  return fetch({
    url: `${api.flows}/${name}`,
    method: 'post'
  })
}

export function getYml (name) {
  return fetch({
    url: `${api.flows}/${name}/yml`,
    method: 'get'
  })
}

export function setYml (name, editor) {
  return fetch({
    url: `${api.flows}/${name}/yml`,
    method: 'patch',
    data: editor,
    headers: {
      'Content-Type': 'text/plain'
    }
  })
}
