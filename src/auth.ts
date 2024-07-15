import {NextFunction, Response} from "express";
import {Auth0Id} from "./user.id";
import {expressjwt, Params} from "express-jwt";
import {expressJwtSecret, SecretCallbackLong} from "jwks-rsa";
import {config} from "./config";

const createUserAuthMiddleware = (issuerBaseUrl: string) => expressjwt({
    secret: expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: config.requestsPerMinuteCount,
        jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`
    }) as SecretCallbackLong,
    algorithms: ['RS256'],
    issuer: issuerBaseUrl
} as Params);

type Auth0AuthHandlerParams = {
    metadataClaim: string;
    issuerBaseUrl: string;
    logger: { error: (message: string) => void }
    forbiddenError: Error;
    storeCredentials: (id: Auth0Id, metadata: Record<string, unknown>) => Promise<void>;
};

const auth0authHandler = <T>({issuerBaseUrl, logger, forbiddenError, storeCredentials}: Auth0AuthHandlerParams) =>
    async (req: T, res: Response, next: NextFunction): Promise<void> => {
        await createUserAuthMiddleware(issuerBaseUrl)(req, res, (err: string | Error): void => {
            if (err) {
                logger.error(JSON.stringify(err));
                throw forbiddenError;
            }
            storeCredentials(Auth0Id(req.auth.sub), req.auth);
            next();
        });
    };

export {auth0authHandler};
