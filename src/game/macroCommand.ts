import { ICommand } from './ICommand.interface';

export class MacroCommand implements ICommand {
  public commands: ICommand[];

  constructor(commands: ICommand[]) {
    this.commands = commands;
  }

  execute(): void {
    for (const command of this.commands) {
      command.execute();
    }
  }
}
