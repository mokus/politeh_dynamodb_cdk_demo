export class BankWorkersTable {

    static readonly TableName = "BankWorkers";

    static readonly PartitionKey = "Country_City_BranchId";

    static readonly CountryCode = "CountryCode";

    static readonly City = "City";

    static readonly BranchId = "BranchId";

    static readonly UserId = "UserId";
    static readonly FirstName = "FirstName";
    static readonly FamilyName = "FamilyName";
    static readonly Address = "Address";
}