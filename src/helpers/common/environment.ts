import * as dotEnvConfig from 'dotenv-defaults/config'
import * as dotenvExpand from 'dotenv-expand'

dotenvExpand.expand(dotEnvConfig)

class Environment {
    getEnvironmentString(key: string): string {
        return process.env?.[key] || ''
    }

    getEnvironmentNumber(key: string): number {
        return Number(process.env?.[key]) || 0
    }

}

const environment = new Environment()

const GlobalConfig = {
    APP_PORT: environment.getEnvironmentNumber('APP_PORT'),
    APP_FRONTEND: environment.getEnvironmentString('APP_FRONTEND'),
    APP_COOKIE_SECRET: environment.getEnvironmentString('APP_COOKIE_SECRET'),
    APP_JWT_ACCESS_TOKEN_SECRET: environment.getEnvironmentString('APP_JWT_ACCESS_TOKEN_SECRET'),
    APP_JWT_REFRESH_TOKEN_SECRET: environment.getEnvironmentString('APP_JWT_REFRESH_TOKEN_SECRET'),
    APP_JWT_REFRESH_TOKEN_HEADER: environment.getEnvironmentString('APP_JWT_REFRESH_TOKEN_HEADER'),
    APP_JWT_ACCESS_TOKEN_HEADER: environment.getEnvironmentString('APP_JWT_ACCESS_TOKEN_HEADER'),
    APP_JWT_ACCESS_TOKEN_EXP_MINS: environment.getEnvironmentNumber('APP_JWT_ACCESS_TOKEN_EXP_MINS'),
    APP_JWT_ISSUER: environment.getEnvironmentString('APP_JWT_ISSUER'),
}

const MongoDBConfig = {
    MONGODB_HOST: environment.getEnvironmentString('MONGODB_HOST'),
    MONGODB_PORT: environment.getEnvironmentNumber('MONGODB_PORT'),
    MONGODB_USER: environment.getEnvironmentString('MONGODB_USER'),
    MONGODB_PASS: environment.getEnvironmentString('MONGODB_PASS'),
    MONGODB_DB_NAME: environment.getEnvironmentString('MONGODB_DB_NAME')
}

const RedisConfig = {
    REDIS_HOST: environment.getEnvironmentString('REDIS_HOST'),
    REDIS_PASS: environment.getEnvironmentString('REDIS_PASS'),
    REDIS_PORT: environment.getEnvironmentNumber('REDIS_PORT')
}

const BrevoConfig = {
    BREVO_API_KEY: environment.getEnvironmentString('BREVO_API_KEY'),
    BREVO_SMTP_SERVER: environment.getEnvironmentString('BREVO_SMTP_SERVER'),
    BREVO_SMTP_PORT: environment.getEnvironmentNumber('BREVO_SMTP_PORT'),
    BREVO_SMTP_LOGIN: environment.getEnvironmentString('BREVO_SMTP_LOGIN')
}

export { GlobalConfig, MongoDBConfig, RedisConfig, BrevoConfig }