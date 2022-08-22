import { getDB } from '@common/dbs/awspostgres'
import { DeviceDataModel } from './device_data.model'
import { DeviceAuthModel } from './device_auth.model'
import { StatusModel } from './status.model'
import { DeviceModel } from './device.model'
import { PROJECT } from '@config/env';

export const db = getDB(PROJECT)
export const deviceDataRepository = db.getRepository(DeviceDataModel)
export const deviceAuthRepository = db.getRepository(DeviceAuthModel)
export const statusRepository = db.getRepository(StatusModel)
export const deviceRepository = db.getRepository(DeviceModel)