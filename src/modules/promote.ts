import { Messages } from '../lib/constants/Messages'
import axios, { AxiosError } from 'axios'
import boxen from 'boxen'
import ora from 'ora'
import {
  createFlowIssueError,
  createWorkspacesClient,
  SessionManager,
  logger,
  promptConfirm,
  authUrl,
  workspaceUse,
  VBase,
  COLORS,
} from 'vtex'

import { MineWinsConflictsResolver } from '@vtex/api'

const vbase = VBase.createClient(undefined, {
  timeout: 120 * 1000,
})

const { promote, get } = createWorkspacesClient()
const { account, workspace: currentWorkspace } = SessionManager.getSingleton()
const workspaceUrl = authUrl()

const throwIfIsMaster = (workspace: string) => {
  if (workspace === 'master') {
    throw createFlowIssueError(Messages.PROMOTE_MASTER_ERROR(workspace))
  }
}

/* This function is very specific to solve conflicts in the pages graphql app.
 The primary conflict resolution strategy at the file level
 is insufficient for safely resolving conflicts in the pages GraphQL application.
 All conflicts resolved here is using a mineWins strategy at the content json level.
*/
const handleConflict = async () => {
  // Forcing rebase to avoid conflicts
  await axios.get(workspaceUrl)

  // @vtex/api expects a full implementation of the client, so we need to cast it to any.
  // The partial implementation is enough to solve conflicts.
  const conflictsResolver = new MineWinsConflictsResolver((vbase as Partial<VBase>) as any, 'userData', '')

  return conflictsResolver.resolveAll()
}

const isPromotable = async (workspace: string) => {
  const spinner = ora(Messages.PROMOTE_SPINNER_START).start()

  spinner.color = COLORS.MAGENTA

  throwIfIsMaster(workspace)

  const meta = await get(account, currentWorkspace)

  if (!meta.production) {
    throw createFlowIssueError(Messages.PROMOTE_NOT_PRODUCTION_ERROR(workspace))
  }

  await handleConflict()

  spinner.succeed()
}

const parseInternalBucket = (internalBucket: string): string | null => {
  const [vendor, app, bucket] = internalBucket.split('.')

  return bucket != null ? Messages.CONFLICTING_BUCKET_DESCRIPTOR(bucket, `${vendor}.${app}`) : null
}

const parseConflictMessage = (message: string): string[] => {
  const [, buckets] = message.split(':')
  const internalBuckets = buckets.split(',').map((bucket) => bucket.trim())

  return internalBuckets.map(parseInternalBucket).filter((bucket) => bucket != null) as string[]
}

const handleConflictOnPromote = (workspace: string, e: AxiosError) => {
  if (e.response?.status !== 409) throw e
  const buckets = parseConflictMessage(e.response.data.message)

  console.log(Messages.PROMOTE_CONFLICT_ERROR(workspace, buckets))
}

const handlePromoteSuccess = async () => {
  logger.info(Messages.PROMOTE_SUCCESS(currentWorkspace))

  console.log(
    boxen(Messages.PROMOTE_ASK_FEEDBACK, {
      padding: 1,
      margin: 1,
    })
  )

  await workspaceUse('master')
}

const promptPromoteConfirm = (workspace: string): Promise<boolean> =>
  promptConfirm(Messages.PROMOTE_PROMPT_CONFIRM(workspace), true)

export default async (conflictResolutionStrategy: string) => {
  logger.debug(Messages.PROMOTE_INIT, currentWorkspace)

  await isPromotable(currentWorkspace)
  console.log(Messages.PROMOTE_CHECK_WORKSPACE(currentWorkspace, workspaceUrl))
  const promptAnswer = await promptPromoteConfirm(currentWorkspace)

  if (!promptAnswer) {
    logger.info(Messages.PROMOTE_PROMPT_NEGATIVE_ANSWER(currentWorkspace))

    return
  }

  await promote(account, currentWorkspace, conflictResolutionStrategy)
    .then(handlePromoteSuccess)
    .catch((e: AxiosError) => handleConflictOnPromote(currentWorkspace, e))
}
