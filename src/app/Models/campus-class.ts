import { Class } from "./class";

export class CampusClass {
    constructor(
        public campusId?: number,
        public name?: string,
        public curriculumId?: string,
        public schoolId?: string,
        public shiftId?: string,
        public genderId?: string,
        public classList?: Class[]
        ){}
}
