import * as cdk from '@aws-cdk/core';
import {RemovalPolicy} from '@aws-cdk/core';
import {AttributeType, BillingMode, Table} from "@aws-cdk/aws-dynamodb";
import {BankWorkersTable} from "../constants/BankWorkersTable";

export class BankWorkersDataStack extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = new Table(this, BankWorkersTable.TableName, {
            tableName: BankWorkersTable.TableName,
            partitionKey: {
                name: BankWorkersTable.PartitionKey,
                type: AttributeType.STRING
            },
            sortKey: {
                name: BankWorkersTable.UserId,
                type: AttributeType.STRING
            },
            removalPolicy: RemovalPolicy.DESTROY,
            billingMode: BillingMode.PAY_PER_REQUEST
        });

        table.addGlobalSecondaryIndex({
            partitionKey: {
                name: BankWorkersTable.City,
                type: AttributeType.STRING

            },
            sortKey: {
                name: BankWorkersTable.UserId,
                type: AttributeType.STRING
            },
            indexName: "City_UserId"
        });
    }
}
