import { getDB } from '@common/dbs/awspostgres'
import { DeviceDataModel } from './device_data.model'
import { PortalAuthModel } from './portal_auth.model'
import { NftAuthModel } from './nft_auth.model'
import { DeviceUptimeModel } from './device_uptime.model'
import { StatusModel } from './status.model'
import { DeviceModel } from './device.model'
import { PROJECT } from '@config/env';

export const db = getDB(PROJECT)
export const deviceDataRepository = db.getRepository(DeviceDataModel)
export const portalAuthRepository = db.getRepository(PortalAuthModel)
export const deviceUptimeRepository = db.getRepository(DeviceUptimeModel)
export const statusRepository = db.getRepository(StatusModel)
export const deviceRepository = db.getRepository(DeviceModel)
export const nftAuthRepository = db.getRepository(NftAuthModel)