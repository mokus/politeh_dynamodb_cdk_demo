import {BankWorkersTable} from "../constants/bankWorkersTable";
import {attribute, hashKey, rangeKey, table} from "@aws/dynamodb-data-mapper-annotations";
import * as shortUUID from "short-uuid";


export interface IBankWorker {
    countryCode: string,
    city: string,
    branchId: string,
    userId: string,
    firstName: string,
    familyName: string,
    address: string
}

@table(BankWorkersTable.TableName)
export class BankWorker implements IBankWorker {

    static getPartitionKey(worker: Partial<IBankWorker>): string {
        return `${worker.countryCode}_${worker.city}_${worker.branchId}`;

    }

    static create(data: Omit<IBankWorker, "userId">): BankWorker {
        const result = new BankWorker();
        Object.assign(result, data);
        result.partitionKey = this.getPartitionKey(data);
        result.userId = shortUUID.generate();
        return result;
    }


    constructor() {

    }

    @hashKey({
        attributeName: BankWorkersTable.PartitionKey,
        attributeType: "S"
    })
    partitionKey: string;

    @attribute({
        attributeName: BankWorkersTable.CountryCode
    })
    countryCode: string;

    @attribute({attributeName: BankWorkersTable.City})
    city: string;

    @attribute({attributeName: BankWorkersTable.BranchId})
    branchId: string;

    @rangeKey({attributeName: BankWorkersTable.UserId})
    userId: string;

    @attribute({attributeName: BankWorkersTable.FirstName})
    firstName: string;

    @attribute({attributeName: BankWorkersTable.FamilyName})
    familyName: string;

    @attribute({attributeName: BankWorkersTable.Address})
    address: string;

}