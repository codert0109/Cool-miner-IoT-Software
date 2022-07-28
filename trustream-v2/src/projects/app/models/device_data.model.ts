import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';
import { DeviceModel } from './device.model';

@Table({
  tableName: 'device_data'
})
export class DeviceDataModel extends BaseModel<DeviceDataModel> {
  @PrimaryKey
  @Column({
    type: DataType.STRING(64)
  })
  public id!: string;

  // @ForeignKey(() => DeviceModel)
  @Column({
    allowNull: false,
    type: DataType.STRING(64)
  })
  public address!: string;

  @Column({
    allowNull: false
  })
  public timestamp!: number;

  @Column({
    allowNull: false
  })
  public pedestrains!: number;

  @Column({
    allowNull: false
  })
  public cars!: number;

  @Column({
    allowNull: false
  })
  public bus!: number;

  @Column({
    allowNull: false
  })
  public truck!: number;

  @Column({
    allowNull: false
  })
  public total!: number;

  @Column({
    allowNull: false
  })
  public city!: string;  

  @Column({
    allowNull: false
  })
  public region!: string;  

  @Column({
    allowNull: false
  })
  public postalcode!: string;  

  @Column({
    allowNull: false
  })
  public country!: string;  

  @Column({
    allowNull: false
  })
  public continent!: string;  

  @Column({
    allowNull: false
  })
  public coordinates!: string;  
}