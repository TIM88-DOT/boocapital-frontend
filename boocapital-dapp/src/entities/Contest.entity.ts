import Contender from "./Contender.entity";

export default class Contest {
  id: number;
  contenders: Contender[];
  isRunning: boolean;

  constructor(id: number, contenders: Contender[], isRunning: boolean ) {
    this.id = id;
    this.contenders = contenders;
    this.isRunning = isRunning;
  }

}
