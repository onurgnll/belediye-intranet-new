

const CustomError = require("../errors/CustomError");
const { User, Admin, Telephone,Survey, DestekCevap, Duyuru, DuyuruResim, OgrenimDurumu, Mudurlukler, sequelize, Personel, Client, Destek } = require("../models");
const Response = require("../responses/response");
const { generateAccessToken } = require("../helpers/token");
const { Sequelize, where, Op } = require("sequelize");
const { pagination } = require("../helpers/pagination");

const ExcelJS = require('exceljs');

const login = async (req, res, next) => {
    try {

        const { username, password } = req.body

        const isUser = await Admin.findOne({
            where: {
                username: username
            }
        })

        if (!isUser) {
            return res.json(new Response(-1, null, "Böyle bir kullanıcı bulunamadı"))
        }

        if (isUser.password != password || isUser.username != username) {

            return res.json(new Response(-1, null, "Hatalı şifre girdiniz."))
        }


        const token = {
            accessToken: generateAccessToken(isUser.user_id),
        }
        await Admin.update(
            {
                accessToken: token.accessToken,
            },
            {
                where: { user_id: isUser.user_id },
            }
        );


        const updatedUser = await Admin.findOne({
            where: {
                user_id: isUser.user_id,
            },
            attributes: { exclude: ['user_pass', 'accessToken'] }
        });

        // Başarılı yanıt döndür
        res.status(200).json(new Response(1, { user: updatedUser, token }, "success"));



    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getPhoneNumbers = async (req, res, next) => {
    try {
        const { name, departman, phone } = req.body;

        const { page = 1, per_page = 30 } = req.query
        // Building the where clause conditionally
        const whereClause = {};
        if (name) {
            whereClause.name = {
                [Sequelize.Op.like]: `%${name}%` // Case-insensitive substring match
            };
        }
        if (departman) {
            whereClause.departmentID = departman // Case-insensitive substring match

        }
        if (phone) {
            whereClause.phone = {
                [Sequelize.Op.like]: `%${phone}%` // Case-insensitive substring match
            };
        }


        // Fetch telephones with the constructed where clause
        const telephones = await Telephone.findAll({
            where: whereClause,
            include: {
                model: Mudurlukler,
                as: "department"
            },
            order: [["phone", "ASC"]],
            limit: per_page,
            offset: (page - 1) * per_page,
        });

        const phoneCount = await Telephone.count({
            where: whereClause
        });

        const paginated = pagination({
            data: telephones,
            count: phoneCount,
            page: page,
            per_page: per_page
        })
        res.status(200).json(new Response(1, { telephones: paginated }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError());
    }
}

const updatePhoneNumber = async (req, res, next) => {
    try {

        const { id } = req.params
        const { name, telephone, departman } = req.body


        await Telephone.update({ name: name, description: name, departmentID: departman, phone: telephone }, { where: { id: id } })
        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const deletePhoneNumber = async (req, res, next) => {
    try {

        const { id } = req.params


        await Telephone.destroy({ where: { id: id } })
        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const createPhoneNumber = async (req, res, next) => {
    try {

        const { name, telephone, departman } = req.body


        const telephonee = await Telephone.create({ name: name, description: name, phone: telephone, departmentID: departman })
        res.status(200).json(new Response(1, { telephonee }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}






const getClients = async (req, res, next) => {
    try {


        const { name, ip = "" } = req.body

        const { page = 1, per_page = 30 } = req.query
        const whereClause = {
            status: {
                [Sequelize.Op.gte]: 0 // Filters for 'durum' greater than or equal to 0
            },
            [Sequelize.Op.or]: [
                Sequelize.where(
                    Sequelize.fn('concat', Sequelize.col('name'), ' ', Sequelize.col('surname')),
                    {
                        [Sequelize.Op.like]: `%${name}%` // Case-insensitive substring match
                    }
                )
            ],
            ip: {
                [Sequelize.Op.like]: `%${ip}%` // Case-insensitive substring match
            },

        };
        const clients = await Client.findAll({
            where: whereClause,
            // order: [["ip", "ASC"]],
            order: [
                [Sequelize.literal('CAST(SUBSTRING_INDEX(ip, ".", 1) AS UNSIGNED)'), 'ASC'],
                [Sequelize.literal('CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(ip, ".", 2), ".", -1) AS UNSIGNED)'), 'ASC'],
                [Sequelize.literal('CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(ip, ".", 3), ".", -1) AS UNSIGNED)'), 'ASC'],
                [Sequelize.literal('CAST(SUBSTRING_INDEX(ip, ".", -1) AS UNSIGNED)'), 'ASC']
            ],
            limit: per_page,
            offset: (page - 1) * per_page,
        });

        const clientCount = await Client.count({
            where: whereClause
        });

        const paginated = pagination({
            data: clients,
            count: clientCount,
            page: page,
            per_page: per_page
        })
        res.status(200).json(new Response(1, { clients: paginated }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())

    }
}




const updateClient = async (req, res, next) => {
    try {

        const { id } = req.params

        const { name, surname, ip, status , mac} = req.body
        await Client.update({ name, surname, ip, status , address:mac }, { where: { id } })


        res.status(200).json(new Response(1, {}, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())

    }
}

const createClient = async (req, res, next) => {
    try {


        const { name = "", surname = "", ip, status = 1 , mac = "" } = req.body

        const isClient = await Client.findOne({where: {ip: ip}})
        if(isClient){
            return res.status(200).json(new Response(-1, { }, "Bu IP zaten Ekli"));

        }
        const client = await Client.create({ name, surname, ip, status, birthday: new Date() , address: mac })


        res.status(200).json(new Response(1, { client }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())

    }
}

const deleteClient = async (req, res, next) => {
    try {

        const { id } = req.params


        await Client.destroy({ where: { id: id } })
        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getMainDuyuru = async (req, res, next) => {
    try {
        const duyuru = await Duyuru.findOne({
            where: {
                isMain: true
            },
            include: {
                model: DuyuruResim,
                as: "duyuruResimler"
            }
        })

        res.status(200).json(new Response(1, { duyuru }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}



const getDuyurular = async (req, res, next) => {
    try {
        const duyurular = await Duyuru.findAll({
            where: {
                isMain: false
            },
            include: {
                model: DuyuruResim,
                as: "duyuruResimler"
            }
        })

        res.status(200).json(new Response(1, { duyurular }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const createDuyuru = async (req, res, next) => {
    try {
        const { title, content, isMain } = req.body


        const main = isMain == "true" ? 1 : 0

        if (main) {

            const lastMain = await Duyuru.findOne({ isMain: 1 })
            if (lastMain) {
                await Duyuru.update({ isMain: 0 }, { where: { isMain: 1 } })
            }
        }

        const duyuru = await Duyuru.create({ title, content, isMain: main })

        if (req.file) {
            const link = req.file.filename
            const duyuruResim = await DuyuruResim.create({ duyuruID: duyuru.id, resim: link })

        }

        res.status(200).json(new Response(1, { duyuru }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const updateDuyuru = async (req, res, next) => {
    try {
        const { title, content, main, duyuruID } = req.body



        if (main) {

            const lastMain = await Duyuru.findOne({ isMain: 1 })
            if (lastMain) {
                await Duyuru.update({ isMain: 0 }, { where: { isMain: 1 } })
            }
        }

        const duyuru = await Duyuru.update({ title, content, isMain: main }, { where: { id: duyuruID } })

        res.status(200).json(new Response(1, { duyuru }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const setMainDuyuru = async (req, res, next) => {
    try {
        const { duyuruID } = req.params


        const lastMain = await Duyuru.findOne({ where: {id: duyuruID}  })
        // const lastMain = await Duyuru.findOne({ isMain: 1 })
        // if (lastMain) {
        //     await Duyuru.update({ isMain: 0 }, { where: { isMain: 1 } })
        // }

        await Duyuru.update({ isMain: !lastMain.isMain }, { where: { id: duyuruID } })

        res.status(200).json(new Response(1, { }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}
const setMainAnket = async (req, res, next) => {
    try {
        const { anketID } = req.params




        const lastMain = await Survey.findOne({ where: { id: anketID} })

        const duyuru = await Survey.update({ isMain: !lastMain.isMain }, { where: { id: anketID } })

        res.status(200).json(new Response(1, { duyuru }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}
const deleteDuyuru = async (req, res, next) => {
    try {
        const { id } = req.params

        await Duyuru.destroy({ where: { id } })

        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const deleteDuyuruPicture = async (req, res, next) => {
    try {
        const { id } = req.params

        await DuyuruResim.destroy({ where: { id } })

        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const addDuyuruPicture = async (req, res, next) => {
    try {
        const { id } = req.params

        await DuyuruResim.destroy({ where: { duyuruID: id } })
        if (req.file) {

            const link = req.file.filename
            const duyuruResim = await DuyuruResim.create({ duyuruID: id, resim: link })

        }


        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}




const switchDuyuruActive = async (req, res, next) => {
    try {
        const { id } = req.params

        const duyuru = await Duyuru.findOne({ where: { id } })

        await Duyuru.update({ isActive: !duyuru.isActive }, { where: { id } })

        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const switchAnketActive = async (req, res, next) => {
    try {
        const { id } = req.params

        const duyuru = await Survey.findOne({ where: { id } })

        await Survey.update({ isActive: !duyuru.isActive }, { where: { id } })

        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getPersonels = async (req, res, next) => {
    try {
        const { name, departman, kartno, unvan } = req.body

        const { page = 1, per_page = 10 } = req.query

        const whereClause = {
            durum: {
                [Sequelize.Op.gte]: 0 // Filters for 'durum' greater than or equal to 0
            },
            [Sequelize.Op.or]: [
                Sequelize.where(
                    Sequelize.fn('concat', Sequelize.col('Personel.adi'), ' ', Sequelize.col('soyadi')),
                    {
                        [Sequelize.Op.like]: `%${name}%` // Case-insensitive substring match
                    }
                )
            ],

        };

        if (unvan) {

            whereClause.Unvani = {
                [Sequelize.Op.like]: `%${unvan}%` // Case-insensitive substring match
            }
        }
        if (kartno) {

            whereClause.KartNo = {
                [Sequelize.Op.like]: `%${kartno}%` // Case-insensitive substring match
            }
        }
        if (departman && departman.trim() !== "") {
            whereClause.bolum = Number(departman);
        }

        const personels = await Personel.findAll({
            include: [
                {
                    model: Mudurlukler,
                    as: "department"
                },
                {
                    model: OgrenimDurumu,
                    as: "ogrenim"
                },

            ],
            limit: per_page,
            offset: (page - 1) * per_page,
            where: whereClause,
            order: [['adi', 'ASC']] // Tablo adı belirtildi
        });
        const personelCount = await Personel.count({
            where: whereClause
        });

        const paginated = pagination({
            data: personels,
            count: personelCount,
            page: page,
            per_page: per_page
        })

        res.status(200).json(new Response(1, { personels: paginated }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const createPersonel = async (req, res, next) => {
    try {
        const {
            KartNo,
            Adi,
            Soyadi,
            TCKimlikNo,
            TelefonNo,
            EMailAdresi,
            Adresi,
            DogumTarihiGun,
            DogumTarihiAy,
            DogumTarihiYil,
            OgrenimDurumu,
            Bolum,
            Unvani
        } = req.body


        const pers = await Personel.create({
            KartNo,
            Adi,
            Soyadi,
            TCKimlikNo,
            TelefonNo,
            EMailAdresi,
            Adresi,
            Departman: Bolum,
            Bolum,
            Unvani,
            OgrenimDurumu,
            Resim: req.file?.filename,
            DogumTarihi: DogumTarihiAy ? new Date(DogumTarihiYil + "-" + DogumTarihiAy + "-" + DogumTarihiGun) : null,
            author: "admin",
            durum: 1,
            ip: 0,
            member: 100,
            date: new Date()
        })


        res.status(200).json(new Response(1, { pers }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const updatePersonel = async (req, res, next) => {
    try {
        const {
            KartNo,
            Adi,
            Soyadi,
            TCKimlikNo,
            TelefonNo,
            EMailAdresi,
            Adresi,
            DogumTarihiGun,
            DogumTarihiAy,
            DogumTarihiYil,
            OgrenimDurumu,
            Bolum,
            Unvani
        } = req.body

        const { id } = req.params
        const pers = await Personel.update({
            KartNo,
            Adi,
            Soyadi,
            TCKimlikNo,
            TelefonNo,
            EMailAdresi,
            Adresi,
            Departman: Bolum,
            Bolum,
            Unvani,
            OgrenimDurumu,
            Resim: req.file?.filename,
            DogumTarihi: DogumTarihiAy ?  new Date(DogumTarihiYil + "-" + DogumTarihiAy + "-" + DogumTarihiGun) : null,
            author: "admin",
            durum: 1,
            ip: 0,
            member: 100,
            date: new Date()
        }, { where: { ID: id } })


        res.status(200).json(new Response(1, { pers }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const deletePersonels = async (req, res, next) => {
    try {
        const { id } = req.params

        await Personel.update({ durum: -1 }, { where: { ID: id } })

        res.status(200).json(new Response(1, {}, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const replyDestek = async (req, res, next) => {
    try {

        const { title, content, id } = req.body


        await Destek.update({ isAnswered: 1 }, { where: { id } })
        const reply = await DestekCevap.create({
            destekID: id,
            title,
            content
        })
        res.status(200).json(new Response(1, { reply }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const getDestekler = async (req, res, next) => {
    try {

        const { isAnswered } = req.body


        const destekler = await Destek.findAll({ where: { isAnswered } })
        res.status(200).json(new Response(1, { destekler }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}




const getMudurlukler = async (req, res, next) => {
    try {

        const mudurlukler = await Mudurlukler.findAll({
            where: {
                durum: {
                    [Op.gte]: 0 // This condition checks if 'durum' is 0 or greater
                }
            },
            include: {
                model: Client,
                as: "mudurr"
            },
            order: [["birim", "ASC"]]
        })


        res.status(200).json(new Response(1, { mudurlukler }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const deleteMudurluk = async (req, res, next) => {
    try {

        const { id } = req.params
        const mudurlukler = await Mudurlukler.destroy({ where: { id } })


        res.status(200).json(new Response(1, { mudurlukler }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const createMudurluk = async (req, res, next) => {
    try {

        const { birim, mudur } = req.body


        const mudurlukler = await Mudurlukler.create({
            birim,
            mudur,
            aciklama: "",
            durum: 0,
            author: ""
        })


        res.status(200).json(new Response(1, { mudurlukler }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}
const updateMudurluk = async (req, res, next) => {
    try {

        const { id } = req.params
        const { birim, mudur } = req.body


        const mudurlukler = await Mudurlukler.update({
            birim,
            mudur
        }, { where: { id } })


        res.status(200).json(new Response(1, { mudurlukler }, "success"));


    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}



const downloadPersonel = async (req, res, next) => {

    try {


        const personels = await Personel.findAll(
            {
                include: [
                    {
                        model: Mudurlukler,
                        as: "department"
                    },
                    {
                        model: OgrenimDurumu,
                        as: "ogrenim"
                    }
                ]

            }
        )

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Personeller');



        // Add header row
        worksheet.columns = [
            { header: 'Numara', key: 'number', width: 10 },
            { header: 'İsim', key: 'name', width: 50 },
            { header: 'Soyisim', key: 'surname', width: 50 },
            { header: 'Departman', key: 'department', width: 50 },
            { header: 'Ünvan', key: 'title', width: 50 },
            { header: 'Öğrenim Durumu', key: 'ogrenim', width: 50 },
            { header: 'TC', key: 'tc', width: 50 },
            { header: 'Doğum Tarihi', key: 'birthday', width: 50 },
            { header: 'Telefon Numarası', key: 'phoneNumber', width: 50 },
            { header: 'Email', key: 'email', width: 50 },
            { header: 'Kart No', key: 'cardNo', width: 50 },

            { header: 'Durum', key: 'state', width: 50 }
        ];

        // Add data rows
        personels.forEach((personel, index) => {
            worksheet.addRow({
                number: index + 1,
                name: personel.Adi,
                surname: personel.Soyadi,
                department: personel?.department?.birim || "",
                title: personel.Unvani,
                ogrenim: personel.ogrenim?.Adi,
                tc: personel.TCKimlikNo,
                birthday: personel.DogumTarihi,
                phoneNumber: personel.TelefonNo,
                email: personel.EMailAdresi,
                cardNo: personel.KartNo,
                state: personel.durum

            });
        });
        worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' } // Yellow background
            };
            cell.font = {
                bold: true,
                color: { argb: '000000' } // Black text
            };
        });

        // Write to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="personeller.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the buffer as a response
        res.send(buffer);
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const downloadTelefon = async (req, res, next) => {

    try {


        const personels = await Telephone.findAll({
            include: {
                model: Mudurlukler,
                as: "department"
            }
        })

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Telefonlar');



        // Add header row
        worksheet.columns = [
            { header: 'Numara', key: 'number', width: 10 },
            { header: 'İsim', key: 'name', width: 30 },
            { header: 'Açıklama', key: 'description', width: 30 },
            { header: 'Departman', key: 'department', width: 30 },
            { header: 'Dahili', key: 'telephone', width: 30 },

        ];

        console.log(personels[0].department);
        // Add data rows
        personels.forEach((personel, index) => {
            worksheet.addRow({
                number: index + 1,
                name: personel.name,
                description: personel.description,
                department: personel?.department?.birim || "",
                telephone: personel.phone,

            });
        });
        worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' } // Yellow background
            };
            cell.font = {
                bold: true,
                color: { argb: '000000' } // Black text
            };
        });

        // Write to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="telefonlar.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the buffer as a response
        res.send(buffer);
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const downloadClients = async (req, res, next) => {
    try {


        const personels = await Client.findAll({
            where: {
                status: {
                    [Sequelize.Op.gte]: 0 // Filters for 'durum' greater than or equal to 0
                },
            },
            order: [["ip" , "ASC"]]
        })

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('IPler');



        // Add header row
        worksheet.columns = [
            { header: 'İsim', key: 'name', width: 30 },
            { header: 'IP', key: 'ip', width: 30 },
            { header: 'MAC', key: 'mac', width: 30 },

        ];

        personels.forEach((personel, index) => {
            worksheet.addRow({
                name: personel.name + " " + personel.surname || "",
                ip: personel?.ip || "",
                mac: personel?.address || "",

            });
        });
        worksheet.getRow(1).eachCell({ includeEmpty: true }, (cell, colNumber) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFF00' } // Yellow background
            };
            cell.font = {
                bold: true,
                color: { argb: '000000' } // Black text
            };
        });

        // Write to a buffer
        const buffer = await workbook.xlsx.writeBuffer();

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename="IPler.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        // Send the buffer as a response
        res.send(buffer);
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const uploadExcel = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer);

        const worksheet = workbook.getWorksheet(1);
        const createPromises = [];

        await Telephone.destroy({
            where: {},
            truncate: true
        });

        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) { // Skip the header row
                const mudurluk = await Mudurlukler.findOne({ where: { birim: row.getCell(3).value } })
                let data = {
                    name: row.getCell(2).value || row.getCell(4).value || null,
                    departmentID: mudurluk?.id || null,
                    description: row.getCell(4).value || null,
                    phone: row.getCell(5).value.split(" ")[3] || null,
                };




                createPromises.push(Telephone.create(data));
            }
        });

        await Promise.all(createPromises);



        res.status(200).json(new Response(1, {}, "success"));
    } catch (err) {
        res.status(500).json(err);
    }
};



const uploadExcelForIPS = async (req, res, next) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(req.file.buffer);

        const worksheet = workbook.getWorksheet(1);
        const createPromises = [];

        await Client.destroy({
            where: {},
            truncate: true
        });

        worksheet.eachRow(async (row, rowNumber) => {
            if (rowNumber > 1) { // Skip the header row
                let data = {
                    name: row.getCell(1).value|| "",
                    ip: row.getCell(2).value || null,
                    address: row.getCell(3).value || null,
                    status: 1,
                    surname: ""
                };




                createPromises.push(Client.create(data));
            }
        });

        await Promise.all(createPromises);



        res.status(200).json(new Response(1, {}, "success"));
    } catch (err) {
        res.status(500).json(err);
    }
};



const getAdmins = async (req, res, next) => {
    try {
        const { name } = req.body


        const admins = await Admin.findAll({
            where: {
                username: {
                    [Sequelize.Op.like]: `%${name}%`
                }
            }
        })

        res.status(200).json(new Response(1, { admins }, "success"));



    } catch (error) {
        res.status(500).json(err);

    }
}



const updateAdmin = async (req, res, next) => {
    try {
        const { user_id, password, allowAdmins, allowAnket, allowDuyuru, allowIPS, allowMudurlukler, allowPersonel, allowPhones } = req.body

        await Admin.update({ allowAdmins, password, allowAnket, allowDuyuru, allowIPS, allowMudurlukler, allowPersonel, allowPhones }, { where: { user_id: user_id } })


        res.status(200).json(new Response(1, {}, "success"));



    } catch (error) {
        res.status(500).json(err);

    }
}

const createAdmin = async (req, res, next) => {
    try {
        const { username, password, allowAdmins, allowAnket, allowDuyuru, allowIPS, allowMudurlukler, allowPersonel, allowPhones } = req.body


        const isAd = await Admin.findOne({ where: { username: username } })

        if (isAd) return res.status(200).json(new Response(-1, {}, "Bu kullanıcı adında bir admin var"));

        const admin = await Admin.create({ allowAdmins, allowAnket, allowDuyuru, allowIPS, allowMudurlukler, allowPersonel, allowPhones, username, password })


        res.status(200).json(new Response(1, { admin }, "success"));



    } catch (error) {
        res.status(500).json(err);

    }
}
const deleteAdmin = async (req, res, next) => {
    try {
        const { id } = req.params

        await Admin.destroy({ where: { user_id: id } })


        res.status(200).json(new Response(1, {}, "success"));



    } catch (error) {
        res.status(500).json(err);

    }
}
module.exports = {
    getPhoneNumbers,
    deletePhoneNumber,
    updatePhoneNumber,
    createPhoneNumber,
    updateMudurluk,
    createPersonel,
    getClients,
    deleteClient,
    updateClient,
    createClient,

    getDuyurular,
    deleteDuyuru,
    createDuyuru,

    login,

    getPersonels,
    deletePersonels,
    getDestekler,
    replyDestek,

    getMudurlukler,
    deleteMudurluk,
    createMudurluk,
    getMainDuyuru,
    downloadPersonel,
    downloadTelefon,
    downloadClients,
    updatePersonel,
    uploadExcel,uploadExcelForIPS,



    getAdmins,
    updateAdmin,
    deleteAdmin,
    createAdmin,
    switchDuyuruActive,
    deleteDuyuruPicture,
    addDuyuruPicture,
    updateDuyuru,
    setMainDuyuru,
    switchAnketActive,
    setMainAnket
}