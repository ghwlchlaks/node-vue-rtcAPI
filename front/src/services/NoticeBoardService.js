import Api from '@/services/Api'

export default {
  show (boardId, index) {
    return Api().get(`/${boardId}/${index}`)
  },
  add (boardId, stateId, data) {
    return Api().post(`/${boardId}/${stateId}`, data)
  }
}
