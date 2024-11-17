'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personel', {
      ID: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      KartNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      KartNo2: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      SicilNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Adi: {
        type: Sequelize.STRING(30),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Soyadi: {
        type: Sequelize.STRING(30),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      HesapGrupKodu: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Unvani: {
        type: Sequelize.STRING(60),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Kurum: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Departman: {
        type: Sequelize.STRING(60),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Bolum: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      AltBolum1: {
        type: Sequelize.STRING(210),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      AltBolum2: {
        type: Sequelize.DATE,
        allowNull: true
      },
      AltBolum3: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      MaasGrubu: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      GirisTarihi: {
        type: Sequelize.DATE,
        allowNull: true
      },
      CikisTarihi: {
        type: Sequelize.DATE,
        allowNull: true
      },
      TCKimlikNo: {
        type: Sequelize.STRING(11),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      SigortaNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      VergiNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      VergiDairesi: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      BabaAdi: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      AnaAdi: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      DogumYeri: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      DogumTarihi: {
        type: Sequelize.DATE,
        allowNull: true
      },
      Adresi: {
        type: Sequelize.STRING(200),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Adres_ILCE: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Adres_IL: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      TelefonNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      CepTelNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      FaxNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      EMailAdresi: {
        type: Sequelize.STRING(60),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Cinsiyeti: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      MedeniDurumu: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      CocukSayisi: {
        type: Sequelize.TINYINT,
        defaultValue: 0
      },
      BakimiGerekliKisiSayisi: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      OgrenimDurumu: {
        type: Sequelize.TINYINT,
        allowNull: true
      },
      KontrolID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      DigerID: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      Resim: {
        type: Sequelize.STRING(200),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      KanGrubu: {
        type: Sequelize.STRING(5),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      AzamiHak: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      Notlar: {
        type: Sequelize.TEXT,
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      BankaAdi: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      BankaSubeKodu: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      BankaHesapNo: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      IBAN: {
        type: Sequelize.STRING(20),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      Ayrilma_Nedeni: {
        type: Sequelize.STRING(25),
        allowNull: true,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      ip: {
        type: Sequelize.STRING(20),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      },
      member: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      durum: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      author: {
        type: Sequelize.STRING(90),
        allowNull: false,
        charset: 'utf8mb3',
        collate: 'utf8mb3_turkish_ci'
      }
    });
  },
  
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personel');
  }
};
