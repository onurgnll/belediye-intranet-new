'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Personel extends Model {
    static associate(models) {
      // Define associations here if needed
      Personel.belongsTo(models.Mudurlukler, {
        foreignKey: 'Bolum',
        as: 'department' // Alias for the association
      });
      Personel.belongsTo(models.OgrenimDurumu, {
        foreignKey: 'OgrenimDurumu',
        as: 'ogrenim' // Alias for the association
      });
    }
  }
  
  Personel.init({
    ID: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    KartNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    KartNo2: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    SicilNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Adi: {
      type: DataTypes.STRING(30),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Soyadi: {
      type: DataTypes.STRING(30),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    HesapGrupKodu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Unvani: {
      type: DataTypes.STRING(60),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Kurum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Departman: {
      type: DataTypes.STRING(60),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Bolum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    AltBolum1: {
      type: DataTypes.STRING(210),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    AltBolum2: {
      type: DataTypes.DATE,
      allowNull: true
    },
    AltBolum3: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    MaasGrubu: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    GirisTarihi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    CikisTarihi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    TCKimlikNo: {
      type: DataTypes.STRING(11),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    SigortaNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    VergiNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    VergiDairesi: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    BabaAdi: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    AnaAdi: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    DogumYeri: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    DogumTarihi: {
      type: DataTypes.DATE,
      allowNull: true
    },
    Adresi: {
      type: DataTypes.STRING(200),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Adres_ILCE: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Adres_IL: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    TelefonNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    CepTelNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    FaxNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    EMailAdresi: {
      type: DataTypes.STRING(60),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Cinsiyeti: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    MedeniDurumu: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    CocukSayisi: {
      type: DataTypes.TINYINT,
      defaultValue: 0
    },
    BakimiGerekliKisiSayisi: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    OgrenimDurumu: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    KontrolID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DigerID: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Resim: {
      type: DataTypes.STRING(200),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    KanGrubu: {
      type: DataTypes.STRING(5),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    AzamiHak: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    Notlar: {
      type: DataTypes.TEXT,
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    BankaAdi: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    BankaSubeKodu: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    BankaHesapNo: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    IBAN: {
      type: DataTypes.STRING(20),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    Ayrilma_Nedeni: {
      type: DataTypes.STRING(25),
      allowNull: true,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    },
    member: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    durum: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(90),
      allowNull: false,
      charset: 'utf8mb3',
      collate: 'utf8mb3_turkish_ci'
    }
  }, {
    sequelize,
    modelName: 'Personel',
    tableName: 'personel',
    timestamps: false // Add this if your table does not have createdAt and updatedAt columns
  });

  return Personel;
};
