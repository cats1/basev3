export function checkSignType (value) {
  switch (value) {
    case 0:
      return '停用'
    case 1:
      return '启用'
    default:
      return '启用'
  }
}