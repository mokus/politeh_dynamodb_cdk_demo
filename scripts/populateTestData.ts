import {DataMapper} from "@aws/dynamodb-data-mapper";
import {DynamoDB} from "aws-sdk";
import {CountryCode} from "../data/countryCode";
import {testDataConfig} from "./testData";
import {generateName} from "fantasy-name-generator/dist/util/nameGenerator";
import {BankWorker} from "../data/bankWorker";
import {AppConstants} from "../constants/appConstants";

const mapper = new DataMapper({
    client: new DynamoDB({
        region: AppConstants.Region
    }),
});

populate();


async function populate() {
    for (const country in CountryCode) {
        await populateCountry(country);
    }
}

async function populateCountry(country: string) {
    for (let i = 0; i < testDataConfig.cities; i++) {
        const cityName = generateName("elf", {gender: "female", allowMultipleNames: true});
        const users = Array.from(populateCity(country, cityName as string))

        console.log(`--====${country} ${cityName} ===---- users: `, users.length);
        for await (const persisted of mapper.batchPut(users)) {
            // console.log(persisted);
        }

    }
}

function* populateCity(country: string, cityName: string) {
    for (let i = 0; i < testDataConfig.branches; i++) {
        const branchName = generateName("elf", {gender: "female", allowMultipleNames: true});

        for (const user of getUsers(country, cityName, branchName as string))
            yield user;
    }
}

function* getUsers(country: string, cityName: string, branchName: string) {
    for (let i = 0; i < testDataConfig.users; i++) {
        const firstName = generateName("elf", {gender: "female", allowMultipleNames: false});
        const lastName = generateName("elf", {gender: "female", allowMultipleNames: false});
        const address = "Test Address";

        const user = BankWorker.create({
            countryCode: country,
            city: cityName,
            branchId: branchName,
            firstName: firstName as string,
            familyName: lastName as string,
            address: address
        })

        yield user;
    }
}




