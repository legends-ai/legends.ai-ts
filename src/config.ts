import * as path from 'path'

export const PORT = process.env.PORT || 7448
export const HOST = process.env.WEBSITE_HOSTNAME || `localhost:${PORT}`
export const HELIOS_HOST = process.env.HELIOS_HOST || 'http://helios.dev.asuna.io'
export const GEOLITE_PATH = path.join(__dirname,'../geodata/GeoLite2-Country.mmdb')

export const DEFAULT_REGION = 'KR'