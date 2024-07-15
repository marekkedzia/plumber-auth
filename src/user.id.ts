import {Opaque} from "ts-opaque";
import {config} from "./config";
import {throwPlumberError} from "./utils/throw.plumber.error";

type Auth0Id = Opaque<string, "auth0-id">

function Auth0Id(id: string): Auth0Id {
    const authOIdRegex = config.auth0IdRegex
    if (!authOIdRegex.test(id)) {
        throwPlumberError(`Invalid Auth0 ID: ${id}`)
    }

    return id as Auth0Id;
}

const UserId = Auth0Id;

export {Auth0Id, UserId};
