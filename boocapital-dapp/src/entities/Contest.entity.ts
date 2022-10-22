import Contender from "./Contender.entity";

export default class Contest {
  id: number;
  isRunning: boolean;
  contenders: Contender[]

  constructor(isRunning: boolean, contenders: Contender[], id: number) {
    this.id = id;
    this.isRunning = isRunning;
    this.contenders = contenders;
  }

}
