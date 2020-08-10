import { Workspaces } from '@vtex/api'
import chalk from 'chalk'
import { contains, flatten, head, tail } from 'ramda'
import { createWorkspacesClient, SessionManager, logger, promptConfirm, workspaceUse } from 'vtex'

const promptWorkspaceDeletion = (names: string[]) =>
  promptConfirm(
    `Are you sure you want to delete workspace${names.length > 1 ? 's' : ''} ${chalk.green(names.join(', '))}?`,
    true
  )

export const deleteWorkspaces = async (
  workspacesClient: Workspaces,
  account: string,
  names = []
): Promise<string[]> => {
  const name = head(names)
  const decNames = tail(names)

  if (names.length === 0) {
    return []
  }

  logger.debug('Starting to delete workspace', name)
  try {
    // @ts-ignore
    await workspacesClient.delete(account, name)
    logger.info(`Workspace ${chalk.green(name)} deleted ${chalk.green('successfully')}`)

    // @ts-ignore
    return flatten([name, await deleteWorkspaces(workspacesClient, account, decNames)])
  } catch (err) {
    logger.warn(`Workspace ${chalk.green(name)} was ${chalk.red('not')} deleted`)
    logger.error(`Error ${err.response.status}: ${err.response.statusText}. ${err.response.data.message}`)

    return deleteWorkspaces(workspacesClient, account, decNames)
  }
}

// @ts-ignore
export default async (names: string[], options) => {
  const preConfirm = options.y || options.yes
  const force = options.f || options.force
  const { account, workspace } = SessionManager.getSingleton()

  logger.debug(`Deleting workspace${names.length > 1 ? 's' : ''}:`, names.join(', '))

  if (!force && contains(workspace, names)) {
    return logger.error(
      `You are currently using the workspace ${chalk.green(workspace)}, please change your workspace before deleting`
    )
  }

  if (!preConfirm && !(await promptWorkspaceDeletion(names))) {
    return
  }

  const workspacesClient = createWorkspacesClient()
  // @ts-ignore
  const deleted = await deleteWorkspaces(workspacesClient, account, names)

  if (contains(workspace, deleted)) {
    logger.warn(`The workspace you were using was deleted`)

    return workspaceUse('master')
  }
}
