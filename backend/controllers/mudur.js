const CustomError = require("../errors/CustomError");
const { User, Admin, Mudur, Mudurlukler, Personel } = require("../models");
const Response = require("../responses/response");
const { generateAccessToken } = require("../helpers/token");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const isUser = await Mudur.findOne({
      where: {
        username: username,
      },
    });

    if (!isUser) {
      return res.json(new Response(-1, null, "Böyle bir kullanıcı bulunamadı"));
    }

    const passwordMatch = await bcrypt.compare(password, isUser.password);

    if (!passwordMatch) {
      return res.json(new Response(-1, null, "Hatalı şifre girdiniz."));
    }

    const token = {
      accessToken: generateAccessToken(isUser.id),
    };
    await Mudur.update(
      {
        accessToken: token.accessToken,
      },
      {
        where: { id: isUser.id },
      }
    );

    const updatedUser = await Mudur.findOne({
      where: {
        id: isUser.id,
      },
      attributes: { exclude: ["password", "accessToken"] },
    });

    // Başarılı yanıt döndür
    res
      .status(200)
      .json(new Response(1, { user: updatedUser, token }, "success"));
  } catch (error) {
    console.log(error);
    return next(new CustomError());
  }
};

function getAttendanceSummary(jsonData) {
  const attendanceLogs = jsonData.resp.data;
  const personelList = jsonData.personels;

  const result = personelList.map((personel) => {
    const fullName = `${personel.Adi.trim().toLowerCase()} ${personel.Soyadi.trim().toLowerCase()}`;

    // Bu personelin tüm loglarını filtrele
    const logs = attendanceLogs.filter((log) => {
      const logName = log.first_name.trim().toLowerCase();
      return logName === fullName;
    });

    if (logs.length === 0) {
      return {
        ad: `${personel.Adi} ${personel.Soyadi}`,
        giris: null,
        cikis: null,
        durum: "Gelmedi",
      };
    }

    // Saatlere göre sırala ve ilk/son saatleri al
    logs.sort((a, b) => a.punch_time.localeCompare(b.punch_time));

    const giris = logs[0].punch_time;
    let cikis = logs[logs.length - 1].punch_time;

    // Zaman durumu kontrolü
    const zaman = [];

    const toMinutes = (timeStr) => {
      const [hour, minute] = timeStr.split(":").map(Number);
      return hour * 60 + minute;
    };

    const girisMinutes = toMinutes(giris);
    const cikisMinutes = toMinutes(cikis);

    if (girisMinutes > toMinutes("08:15")) {
      zaman.push("Geç Giriş");
    }

    if (cikisMinutes < toMinutes("16:45")) {
      zaman.push("Erken Çıkış");
    }
    if (
      cikisMinutes > toMinutes("16:45") &&
      girisMinutes < toMinutes("08:15")
    ) {
      zaman.push("Uygun");
    }

    return {
      ad: `${personel.Adi} ${personel.Soyadi}`,
      giris,
      cikis: giris == cikis ? null : cikis,
      durum: giris && "Geldi",
      zaman,
    };
  });

  return result;
}

const kartbasim = async (req, res, next) => {
  try {
    const { date } = req.body;
    console.log(req.mudur);
    const mudur = await Mudur.findByPk(req.mudur.result);

    const auth = await fetch(process.env.ZKT_IP + `/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.ZKT_USERNAME,
        password: process.env.ZKT_PASS,
      }),
    });

    const resp2 = await auth.json();

    const reqq = await fetch(
      process.env.ZKT_IP +
        `/att/api/transactionReport/?page=1&page_size=5000&start_date=${date}&end_date=${date}&export_type=txt&departments=${mudur.zktmudurlukid}`,
      {
        headers: {
          Authorization: "Token " + resp2.token,
          "Content-Type": "application/json",
        },
      }
    );

    const whereClause = { bolum: mudur.mudurluk, durum: { [Op.gt]: 0 } };

    const personels = await Personel.findAll({
      include: [
        {
          model: Mudurlukler,
          as: "department",
        },
      ],
      where: whereClause,
      order: [["adi", "ASC"]], // Tablo adı belirtildi
    });

    // Sequelize'den gelen personeller düz nesneye çevrilmeli:
    const personelsRaw = personels.map((p) => p.get({ plain: true }));

    // fetch sonrası JSON alınır
    const resp = await reqq.json();

    const summary = getAttendanceSummary({ resp, personels: personelsRaw });

    res.status(200).json(new Response(1, { a: summary }, "success"));
  } catch (error) {
    console.log(error);
    return next(new CustomError());
  }
};
const JWT = require("jsonwebtoken");

const ExcelJS = require("exceljs");
const kartbasimExcel = async (req, res, next) => {
  try {
    const { token } = req.query;

    if (token == null) {
      return res.status(401).json({
        success: -1,
        data: [],
        message: "Tekrar giriş yapınız",
      });
    }

    const currentUser = await Mudur.findOne({ where: { accessToken: token } });

    if (currentUser) {
      JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(401).json({
            success: -1,
            data: [],
            message: "Tekrar giriş yapınız",
          });
        }

        req.mudur = user;
        return
      });
    }
    const { date } = req.body;
    const mudur = await Mudur.findByPk(currentUser.id);

    const auth = await fetch(process.env.ZKT_IP + `/api-token-auth/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: process.env.ZKT_USERNAME,
        password: process.env.ZKT_PASS,
      }),
    });

    const resp2 = await auth.json();

    const reqq = await fetch(
      `${process.env.ZKT_IP}/att/api/transactionReport/?page=1&page_size=5000&start_date=${date}&end_date=${date}&export_type=txt&departments=${mudur.zktmudurlukid}`,
      {
        headers: {
          Authorization: "Token " + resp2.token,
          "Content-Type": "application/json",
        },
      }
    );

    const whereClause = { bolum: mudur.mudurluk, durum: { [Op.gt]: 0 } };

    const personels = await Personel.findAll({
      include: [{ model: Mudurlukler, as: "department" }],
      where: whereClause,
      order: [["adi", "ASC"]],
    });

    const personelsRaw = personels.map((p) => p.get({ plain: true }));
    const resp = await reqq.json();

    const summary = getAttendanceSummary({ resp, personels: personelsRaw });

    // ✅ Excel'i bellekte oluştur
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Yoklama Raporu");

    sheet.columns = [
      { header: "Ad Soyad", key: "ad", width: 30 },
      { header: "Giriş Saati", key: "giris", width: 15 },
      { header: "Çıkış Saati", key: "cikis", width: 15 },
      { header: "Durum", key: "durum", width: 15 },
      { header: "Zaman", key: "zaman", width: 30 },
    ];

    summary.forEach((item) => {
      sheet.addRow({
        ad: item.ad,
        giris: item.giris || "-",
        cikis: item.cikis || "-",
        durum: item.durum || "-",
        zaman: Array.isArray(item.zaman) ? item.zaman.join(", ") : "-",
      });
    });

    // ✅ Excel dosyasını buffer olarak oluştur
    const buffer = await workbook.xlsx.writeBuffer();

    // ✅ İstemciye gönder
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=Yoklama-Raporu-${date}.xlsx`);
    return res.send(buffer);
  } catch (error) {
    console.error(error);
    return next(new CustomError());
  }
};




const kartbasimHaftalikExcel = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { date } = req.body;

    if (!token) {
      return res.status(401).json({ success: -1, message: "Token eksik" });
    }

    const currentUser = await Mudur.findOne({ where: { accessToken: token } });
    if (!currentUser) {
      return res.status(401).json({ success: -1, message: "Kullanıcı bulunamadı" });
    }

    const verifiedUser = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY);
    req.mudur = verifiedUser;

    const mudur = await Mudur.findByPk(currentUser.id);
    const monday = getMonday(date); // Haftanın başı

    const allSummaries = [];
    const personels = await Personel.findAll({
      include: [{ model: Mudurlukler, as: "department" }],
      where: { bolum: mudur.mudurluk, durum: { [Op.gt]: 0 } },
      order: [["adi", "ASC"]],
    });
    const personelsRaw = personels.map((p) => p.get({ plain: true }));

    for (let i = 0; i < 5; i++) {
      const current = new Date(monday);
      current.setDate(current.getDate() + i);

      const dStr = current.toISOString().slice(0, 10);

      const auth = await fetch(process.env.ZKT_IP + `/api-token-auth/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: process.env.ZKT_USERNAME,
          password: process.env.ZKT_PASS,
        }),
      });
      const resp2 = await auth.json();

      const reqq = await fetch(
        `${process.env.ZKT_IP}/att/api/transactionReport/?page=1&page_size=5000&start_date=${dStr}&end_date=${dStr}&export_type=txt&departments=${mudur.zktmudurlukid}`,
        {
          headers: {
            Authorization: "Token " + resp2.token,
            "Content-Type": "application/json",
          },
        }
      );
      const resp = await reqq.json();
      const summary = getAttendanceSummary({ resp, personels: personelsRaw });

      allSummaries.push({ date: dStr, summary });
    }

    // ✅ Excel oluştur
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Haftalık Yoklama");

    // Başlıklar
    sheet.columns = [
      { header: "Tarih", key: "tarih", width: 15 },
      { header: "Ad Soyad", key: "ad", width: 30 },
      { header: "Giriş", key: "giris", width: 15 },
      { header: "Çıkış", key: "cikis", width: 15 },
      { header: "Durum", key: "durum", width: 15 },
      { header: "Zaman", key: "zaman", width: 30 },
    ];

    for (const day of allSummaries) {
      day.summary.forEach((p) => {
        sheet.addRow({
          tarih: day.date,
          ad: p.ad,
          giris: p.giris || "-",
          cikis: p.cikis || "-",
          durum: p.durum || "Gelmedi",
          zaman: Array.isArray(p.zaman) ? p.zaman.join(", ") : "-",
        });
      });
    }

    const buffer = await workbook.xlsx.writeBuffer();

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=Haftalik-Yoklama-${date}.xlsx`);
    return res.send(buffer);
  } catch (err) {
    console.error(err);
    if (!res.headersSent) return next(new CustomError());
  }
};

// Yardımcı fonksiyon
function getMonday(dateStr) {
  const date = new Date(dateStr);
  const day = date.getDay(); // 0 = Sunday
  const diff = date.getDate() - (day === 0 ? 6 : day - 1);
  return new Date(date.setDate(diff));
}
module.exports = {
  login,
  kartbasim,
  kartbasimExcel,
  kartbasimHaftalikExcel
};
