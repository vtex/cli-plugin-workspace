import workspaceInfo from '../../modules/info'
import { CustomCommand } from 'vtex'

export default class WorkspaceInfo extends CustomCommand {
  static description = 'Display information about the current workspace'

  static examples = ['vtex workspace info']

  static flags = {
    ...CustomCommand.globalFlags,
  }

  static args = []

  async run() {
    this.parse(WorkspaceInfo)

    await workspaceInfo()
  }
}
