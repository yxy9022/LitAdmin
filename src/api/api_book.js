/**
 * Created by jerry on 2017/11/13.
 * 图书相关api
 */
import * as API from './'

export default {

  //查询获取book列表(通过page分页)
  findList: params => {
    return API.GET('/api/v1/books', params)
  },

  //查询获取一条book信息
  findById: id => {
    return API.GET(`/api/v1/books/${id}`)
  },

  add: params => {
    return API.POST(`/api/v1/books`, params)
  },
  update: (id, params) => {
    return API.PUT(`/api/v1/books/${id}`, params)
  },

  //单个删除book
  remove: id => {
    return API.DELETE(`/api/v1/books/${id}`)
  },

  //批量删除，传ids数组
  removeBatch: (ids) => {
    return API.DELETE(`/api/v1/books/batch/${ids}`)
  }

}
