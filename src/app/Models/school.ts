export class School {
    constructor(
    public schoolId?: number,
    public schoolName?: string,
    public schoolLocation?: string,
    public email?: string,
    public establishedYear?: string,  // Use string or Date based on your handling of DateOnly
    public schoolTypeId?: number,
    ){}
   }