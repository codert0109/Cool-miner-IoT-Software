import { getDB } from '@common/dbs/awspostgres'
import { DeviceDataModel } from './device_data.model'
import { PortalAuthModel } from './portal_auth.model'
import { NftAuthModel } from './nft_auth.model'
import { DeviceUptimeModel } from './device_uptime.model'
import { StatusModel } from './status.model'
import { PROJECT } from '@config/env';
import { CameraModel } from './camera.model'
import { P1Model } from './p1.model'
import { P2Model } from './p2.model'
import { P3Model } from './p3.model'
import { KeyStatusModel } from './key_status.model'

export const db = getDB(PROJECT)
export const deviceDataRepository = db.getRepository(DeviceDataModel)
export const portalAuthRepository = db.getRepository(PortalAuthModel)
export const deviceUptimeRepository = db.getRepository(DeviceUptimeModel)
export const statusRepository = db.getRepository(StatusModel)
export const nftAuthRepository = db.getRepository(NftAuthModel)
export const cameraRepository = db.getRepository(CameraModel)
export const keystatusRepository = db.getRepository(KeyStatusModel)
export const P = [
    db.getRepository(P1Model),
    db.getRepository(P2Model),
    db.getRepository(P3Model),
]