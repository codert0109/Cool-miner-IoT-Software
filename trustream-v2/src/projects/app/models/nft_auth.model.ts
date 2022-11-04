import { Table, Column, DataType, PrimaryKey, ForeignKey, AutoIncrement } from 'sequelize-typescript';
import BaseModel from './base';

@Table({
  tableName: 'nft_auths'
})
export class NftAuthModel extends BaseModel<NftAuthModel> {
  @PrimaryKey
  @Column({
    allowNull: false
  })
  public nft_id!: number;

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

  // ignored some schema fields.
}