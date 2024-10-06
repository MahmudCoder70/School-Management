import { Building } from "./building";
export class School {
    constructor(public schoolId?: number, public schoolName?: string,public schoolLocation?: string,
        public email?: string, public establishedYear?: string,   public buildings?: Building[]

    ) {}
  }