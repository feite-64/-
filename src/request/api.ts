import { LoginForm } from "@/type/login";
import service from ".";
// 登录列表接口
export function login(data: LoginForm) {
  return service({
    url: '/login',
    method: 'post',
    data
  })
}
// 商品列表接口
export function getGoodsList(){
  return service({
    url: '/goods',
    method: 'get',
  })
}
// 用户列表接口
export function getUserList(){
  return service({
    url: '/user',
    method: 'get',
  })
}
// 角色
export function getRoleList(){
  return service({
    url: '/role',
    method: 'get',
  })
}
// 权限
export function getAuthorityList(){
  return service({
    url: '/authority',
    method: 'get',
  })
}