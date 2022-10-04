import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';
import { DeviceModel } from './device.model';

@Table({
  tableName: 'device_auths'
})
export class PortalAuthModel extends BaseModel<PortalAuthModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(64)
  })
  public id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  public address!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  public session_id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  public nounce!: string;

  // ignored some schema fields.
}