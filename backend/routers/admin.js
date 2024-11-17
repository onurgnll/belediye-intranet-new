const express = require("express");
const router = express.Router();
const { createDuyuru,downloadClients, getDuyurular, deleteDuyuru, getClients, deleteClient, createClient, updateClient, getPhoneNumbers, deletePhoneNumber, createPhoneNumber, updatePhoneNumber, login, getPersonels, replyDestek, getDestekler, getMudurlukler, createMudurluk, deleteMudurluk, getMainDuyuru, downloadPersonel, downloadTelefon, uploadExcel, updateMudurluk, createPersonel, updatePersonel, deletePersonels, getAdmins, updateAdmin, deleteAdmin, createAdmin } = require("../controllers/admin");
const adminAuth = require("../middlewares/adminAuth");

const multer = require('multer');


// router.post("/login", login);

const path = require('path');
const { createAnket, getAnketCevaplari, getCevaplar, getCevap, getAnketler, getAnket, getAnketCevaplayanlar, getKullaniciCevap, getCevapStatistics, deleteAnket } = require("../controllers/anket");
const { getMainAnket } = require("../controllers/user");

// Dosya yükleme konfigürasyonu
const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/duyuru'); // Yüklenen dosyaların kaydedileceği dizin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı ve uzantısı
    }
});

const upload2 = multer({ storage: storage2 });

const storage3 = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/kullanici'); // Yüklenen dosyaların kaydedileceği dizin
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Dosya adı ve uzantısı
    }
});

const upload3 = multer({ storage: storage3 });
router.post("/login" , login)

router.get("/get-main-anket"  , getMainAnket)
router.get("/get-duyurular" ,  adminAuth , getDuyurular)
router.get("/get-main-duyuru" ,  adminAuth , getMainDuyuru)
router.delete("/delete-duyuru/:id" ,  adminAuth , deleteDuyuru)
router.post("/create-duyuru" ,upload2.single("image"),  adminAuth , createDuyuru)

router.post("/create-personel" ,upload3.single("image"),  adminAuth , createPersonel)
router.put("/update-personel/:id" ,upload3.single("image"),  adminAuth , updatePersonel)
router.delete("/delete-personel/:id" , adminAuth , deletePersonels)

router.post("/get-clients" ,  adminAuth , getClients)
router.delete("/delete-client/:id" ,  adminAuth , deleteClient)
router.post("/create-client" ,  adminAuth , createClient)
router.put("/update-client/:id" ,  adminAuth , updateClient)


router.post("/get-phonenumber" ,  adminAuth , getPhoneNumbers)
router.delete("/delete-phonenumber/:id" ,  adminAuth , deletePhoneNumber)
router.post("/create-phonenumber" ,  adminAuth , createPhoneNumber)
router.put("/update-phonenumber/:id" ,  adminAuth , updatePhoneNumber)

router.post("/get-personels" ,  adminAuth , getPersonels)


// router.post("/get-destekler" ,  adminAuth , getDestekler)
// router.post("/reply-destek" ,  adminAuth , replyDestek)


router.get("/get-mudurlukler" , adminAuth , getMudurlukler)
router.post("/create-mudurluk" , adminAuth , createMudurluk)
router.delete("/delete-mudurluk/:id" , adminAuth , deleteMudurluk)
router.put("/update-mudurluk/:id" ,  adminAuth , updateMudurluk)



router.get("/get-anketler" , adminAuth , getAnketler)
router.get("/get-anket/:id" , adminAuth , getAnket)
router.post("/create-anket" , adminAuth , createAnket)
router.post("/delete-anket" , adminAuth , createAnket)
router.post("/status-anket" , adminAuth , createAnket)
router.get("/get-anket-cevap/:surveyID" , adminAuth , getAnketCevaplayanlar)
router.get("/get-cevap-statistics/:surveyID" , adminAuth , getCevapStatistics)
router.get("/get-cevap/:surveyResponseID" , adminAuth , getCevap)


router.delete("/delete-anket/:id", adminAuth , deleteAnket)



router.get("/download-personeller"  , downloadPersonel)
router.get("/download-telefon"  , downloadTelefon)
router.get("/download-clients"  , downloadClients)


router.post("/get-admins" , adminAuth , getAdmins)
router.post("/create-admin" , adminAuth , createAdmin)
router.post("/update-admin" , adminAuth , updateAdmin)
router.delete("/delete-admin/:id" , adminAuth , deleteAdmin)


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/upload-excel" ,upload.single("file") , uploadExcel)
module.exports = router;
