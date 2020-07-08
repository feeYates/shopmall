import {request1} from './request'
 
export function getSort() {
  return request1({
    url: '/category'
  })
}

export function getSubSort(maitKey) {
  return request1({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}

export function getSortDetail(miniWallkey, type) {
  return request1({
    url: '/subcategory/detail',
    params: {
      miniWallkey,
      type
    }
  })
}