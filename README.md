# VTEX CLI Plugin Workspace

Extend the `vtex` toolbelt!

## Developing

1. Clone `vtex/toolbelt` and follow the steps on the Contributing section.
2. Clone/Create a plugin with this template.
3. Change the template name under this project's `package.json`.
2. Run `yarn link` on this project.
3. Now run `vtex link @vtex/cli-plugin-template` (or the new name) on the `vtex/toolbelt` project.
4. Run `yarn watch` on the `vtex/toolbelt`
5. Test the command on a VTEX IO app with `vtex-test hello`

For more information, read [Ocliff Docs](https://oclif.io/docs/introduction).

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
![npm](https://img.shields.io/npm/v/@vtex/cli-plugin-workspace)

<!-- toc -->
* [VTEX CLI Plugin Workspace](#vtex-cli-plugin-workspace)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @vtex/cli-plugin-workspace
$ oclif-example COMMAND
running command...
$ oclif-example (-v|--version|version)
@vtex/cli-plugin-workspace/1.0.0-beta.0 linux-x64 node-v12.20.1
$ oclif-example --help [COMMAND]
USAGE
  $ oclif-example COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]`](#oclif-example-workspacedelete-workspace1-ithworkspace)
* [`oclif-example workspace:list`](#oclif-example-workspacelist)
* [`oclif-example workspace:promote`](#oclif-example-workspacepromote)
* [`oclif-example workspace:reset [WORKSPACENAME]`](#oclif-example-workspacereset-workspacename)
* [`oclif-example workspace:status [WORKSPACENAME]`](#oclif-example-workspacestatus-workspacename)
* [`oclif-example workspace:use WORKSPACE`](#oclif-example-workspaceuse-workspace)

## `oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]`

Delete one or many workspaces

```
USAGE
  $ oclif-example workspace:delete WORKSPACE1 [ITHWORKSPACE]

OPTIONS
  -f, --force    Ignore if you're currently using the workspace
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  -y, --yes      Answer yes to confirmation prompts
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex workspace delete workspaceName
  vtex workspace delete workspaceName1 workspaceName2
```

_See code: [build/commands/workspace/delete.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/delete.ts)_

## `oclif-example workspace:list`

List workspaces on this account

```
USAGE
  $ oclif-example workspace:list

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example workspace:ls

EXAMPLES
  vtex workspace list
  vtex workspace ls
```

_See code: [build/commands/workspace/list.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/list.ts)_

## `oclif-example workspace:promote`

Promote this workspace to master

```
USAGE
  $ oclif-example workspace:promote

OPTIONS
  -h, --help
      show CLI help

  -v, --verbose
      Show debug level logs

  --conflict=master|mine|abort
      [default: master] Defines how to handle data conflict between workspaces.
      - master: Keeps data from master unchanged when there are conflicts. Workspace conflicting data is discarded.
      - mine: Overrides the data on master with the one of the workspace when there is conflict. Any changes on 
      conflicting data made on master will be lost.
      - abort: Aborts the workspace promotion when any data conflict is detected.

  --trace
      Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example promote

EXAMPLES
  vtex workspace promote
  vtex promote
```

_See code: [build/commands/workspace/promote.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/promote.ts)_

## `oclif-example workspace:reset [WORKSPACENAME]`

Delete and recreate a workspace

```
USAGE
  $ oclif-example workspace:reset [WORKSPACENAME]

OPTIONS
  -h, --help        show CLI help
  -p, --production  Re-create the workspace as a production one
  -v, --verbose     Show debug level logs
  -y, --yes         Answer yes to confirmation prompts
  --trace           Ensure all requests to VTEX IO are traced

EXAMPLES
  vtex workspace reset
  vtex workspace reset workspaceName
```

_See code: [build/commands/workspace/reset.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/reset.ts)_

## `oclif-example workspace:status [WORKSPACENAME]`

Display information about a workspace

```
USAGE
  $ oclif-example workspace:status [WORKSPACENAME]

OPTIONS
  -h, --help     show CLI help
  -v, --verbose  Show debug level logs
  --trace        Ensure all requests to VTEX IO are traced

EXAMPLE
  vtex workspace status
```

_See code: [build/commands/workspace/status.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/status.ts)_

## `oclif-example workspace:use WORKSPACE`

Use a workspace to perform operations

```
USAGE
  $ oclif-example workspace:use WORKSPACE

OPTIONS
  -h, --help        show CLI help
  -p, --production  Create the workspace as production if it does not exist or is reset
  -r, --reset       Resets workspace before using it
  -v, --verbose     Show debug level logs
  --trace           Ensure all requests to VTEX IO are traced

ALIASES
  $ oclif-example use

EXAMPLES
  vtex workspace use workspaceName
  vtex use workspaceName
```

_See code: [build/commands/workspace/use.ts](https://github.com/vtex/cli-plugin-workspace/blob/v1.0.0-beta.0/build/commands/workspace/use.ts)_
<!-- commandsstop -->
