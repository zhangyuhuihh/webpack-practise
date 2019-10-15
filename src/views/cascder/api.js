import request from '@/utils/requestNewOa'

// POST /oa/web/employeeAccountManagement/selectOrganization
export function selectOrganization(params) {
  return request({
    url: '/employeeAccountManagement/selectOrganization',
    method: 'post',
    params
  })
}

