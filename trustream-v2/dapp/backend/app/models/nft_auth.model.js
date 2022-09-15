module.exports = (sequelize, Sequelize) => {
  const NFT_Auth = sequelize.define("nft_auth", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nft_id: {
      type : Sequelize.STRING
    },
    session_id: {
      type : Sequelize.STRING
    },
    session_start : {
      type : Sequelize.DATE
    },
    created_at: {
      type: Sequelize.DATE
    },
    updated_at : {
      type: Sequelize.DATE
    }
  });

  return NFT_Auth;
};
