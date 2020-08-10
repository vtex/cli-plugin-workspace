import axios from 'axios'
import boxen from 'boxen'
import ora from 'ora'
import {
  createFlowIssueError,
  createWorkspacesClient,
  SessionManager,
  logger,
  promptConfirm,
  VBase,
  authUrl,
  workspaceUse,
  COLORS,
  Messages,
} from 'vtex'

const { checkForConflicts } = VBase.createClient()
const { promote, get } = createWorkspacesClient()
const { account, workspace: currentWorkspace } = SessionManager.getSingleton()
const workspaceUrl = authUrl()

const throwIfIsMaster = (workspace: string) => {
  if (workspace === 'master') {
    throw createFlowIssueError(Messages.PROMOTE_MASTER_ERROR(workspace))
  }
}

const handleConflict = async () => {
  const conflictsFound = await checkForConflicts()

  if (conflictsFound) {
    await axios.get(workspaceUrl)
  }
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

const promptPromoteConfirm = (workspace: string): Promise<boolean> =>
  promptConfirm(Messages.PROMOTE_PROMPT_CONFIRM(workspace), true)

export default async () => {
  logger.debug(Messages.PROMOTE_INIT, currentWorkspace)

  await isPromotable(currentWorkspace)
  console.log(Messages.PROMOTE_CHECK_WORKSPACE(currentWorkspace, workspaceUrl))
  const promptAnswer = await promptPromoteConfirm(currentWorkspace)

  if (!promptAnswer) {
    logger.info(Messages.PROMOTE_PROMPT_NEGATIVE_ANSWER(currentWorkspace))

    return
  }

  await promote(account, currentWorkspace)
  logger.info(Messages.PROMOTE_SUCCESS(currentWorkspace))

  console.log(
    boxen(Messages.PROMOTE_ASK_FEEDBACK, {
      padding: 1,
      margin: 1,
    })
  )

  await workspaceUse('master')
}
