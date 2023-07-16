// import { note } from './useNote'
import { getPermissionById } from "~~/server/db/permissions"
import { _sniffId } from 'waelio-utils'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const id = _sniffId(query)
  const { data: permission } = await getPermissionById(id)

  return {
    permission
  }
})