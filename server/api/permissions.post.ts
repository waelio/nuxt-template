// import { note } from './useNote'

import { getPermissionById } from "~~/server/db/permissions"

export default defineEventHandler(async (event) => {
  // @ts-ignore
  const body = await readBody(event)

  const { permissionID } = body
  if (permissionID) { }
  return {
    permissions: getPermissionById(permissionID)
  }
})