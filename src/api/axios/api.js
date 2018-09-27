import { fetch } from './fetch'
import api from './url'

export function jobsList (param, size, page) {
  return fetch({
    url: `${api.jobs}/${param}?size=${size}&page=${page}`,
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

export function deleteFlow (name) {
  return fetch({
    url: `${api.flows}/${name}`,
    method: 'delete'
  })
}

export function jobRun (name) {
  return fetch({
    url: `${api.jobs}/run`,
    method: 'post',
    data: {
      flow: name
    }
  })
}

export function jobDetail (name, num) {
  return fetch({
    url: `${api.jobs}/${name}/${num}`,
    method: 'get'
  })
}

export function jobSteps (name, num) {
  return fetch({
    url: `${api.jobs}/${name}/${num}/steps`,
    method: 'get'
  })
}