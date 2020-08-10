import workspacePromote from '../../modules/promote'
import { CustomCommand } from 'vtex'

export default class WorkspacePromote extends CustomCommand {
  static description = 'Promote this workspace to master'

  static aliases = ['promote']

  static examples = ['vtex workspace promote', 'vtex promote']

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = []

  async run() {
    this.parse(WorkspacePromote)

    await workspacePromote()
  }
}
