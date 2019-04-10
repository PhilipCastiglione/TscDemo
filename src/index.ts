import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {User} from "./entity/User";
import {Flange} from "./entity/Flange";
import * as _ from "lodash";

async function createUser(connection: Connection) {
    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
}

async function createFlanges(connection: Connection) {
    console.log("Getting the user...");
    const user = await connection.getRepository(User).findOne(1);
    console.log("Giving the user some flanges...");
    const flange1 = new Flange();
    flange1.description = "This flange is the best flange"
    flange1.usesBeforeSelfDestruction = 100;
    flange1.isFun = true;
    const flange2 = new Flange();
    flange2.description = "This flange is an alright flange"
    flange2.usesBeforeSelfDestruction = 10;
    flange2.isFun = true;
    const flange3 = new Flange();
    flange3.description = "This flange is truly the worst flange"
    flange3.usesBeforeSelfDestruction = 1;
    flange3.isFun = false;
    user.flanges = [flange1, flange2, flange3]
    await connection.manager.save(user);
    // these aren't needed because of cascade
    // await connection.manager.save(flange1);
    // await connection.manager.save(flange2);
    // await connection.manager.save(flange3);
}

function lodashThings(): string {
    return _.join(['a', 'b', 'c'], ',');
}

createConnection().then(async connection => {

    // await createUser(connection);
    // await createFlanges(connection);

    console.log("Loading users from the database...");
    const users = await connection
        .getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.flanges", "flanges")
        .getMany();
    console.log("Loaded users: ", users);

    console.log("Loading flanges from the database...");
    const flanges = await connection
        .getRepository(Flange)
        .createQueryBuilder("flange")
        .leftJoinAndSelect("flange.user", "user")
        .getMany();
    console.log("Loaded flanges: ", flanges);

    console.log("Pointlessly using lodash, but typed!", lodashThings());

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
