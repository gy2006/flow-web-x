import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export function socket () {
  // 建立连接对象
  // 连接服务端提供的通信接口，连接以后才可以订阅广播消息和个人消息
  const socket = new SockJS('http://47.94.156.230:8080/ws')
  // 获取STOMP子协议的客户端对象
  let stompClient = Stomp.over(socket)
  return stompClient
}
