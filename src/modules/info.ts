import chalk from 'chalk'
import { createWorkspacesClient, SessionManager, logger } from 'vtex'

const { get } = createWorkspacesClient()

// @ts-ignore
const pretty = (p) => (p ? chalk.green('true') : chalk.red('false'))

export default async () => {
  const { account, workspace: currentWorkspace } = SessionManager.getSingleton()

  const meta = await get(account, currentWorkspace)
  const weight = currentWorkspace === 'master' ? 100 : meta.weight

  return logger.info(
    `Workspace: name=${chalk.green(currentWorkspace)} production=${pretty(meta.production)} weight=${weight}`
  )
}
