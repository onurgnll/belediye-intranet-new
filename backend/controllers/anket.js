

const CustomError = require("../errors/CustomError");
const { Survey, User, Choice, UserSurvey, SurveyResponse, Question, Answer, Client } = require("../models");
const Response = require("../responses/response");
const { generateAccessToken } = require("../helpers/token");
const { Sequelize, where } = require("sequelize");
const { pagination } = require("../helpers/pagination");

const createAnket = async (req, res, next) => {
    try {

        const { title, description, questions, isMain } = req.body

        if (title == "") {
            return res.json(new Response(-1, null, "Başlık girilmesi zorunludur"))
        }

        const main = isMain == "true" ? 1 : 0

        if (main) {

            const lastMain = await Survey.findOne({ isMain: 1 })
            if (lastMain) {
                await Survey.update({ isMain: 0 }, { where: { isMain: 1 } })
            }
        }
        const survey = await Survey.create({
            title,
            description,
            isMain: main
        })

        // const question = await Question.create({
        //     question_text: "Adınız Soyadınız",
        //     question_type: "text_input",
        //     surveyID: survey.id
        // })
        for (const element of questions) {

            if (element.question_text == "") continue;


            if (element.question_type == "multiple_choice") {

                const question = await Question.create({
                    question_text: element.question_text,
                    question_type: element.question_type,
                    surveyID: survey.id
                })

                for (const choice of element.choices) {
                    if (choice == "") continue;
                    const choices = await Choice.create({
                        questionID: question.id,
                        choice_text: choice
                    })

                }
            }
            if (element.question_type == "text_input") {

                const question = await Question.create({
                    question_text: element.question_text,
                    question_type: element.question_type,
                    surveyID: survey.id
                })
            }
            if (element.question_type == "multiple_selection") {

                const question = await Question.create({
                    question_text: element.question_text,
                    question_type: element.question_type,
                    surveyID: survey.id
                })
                for (const choice of element.choices) {
                    if (choice == "") continue;
                    const choices = await Choice.create({
                        questionID: question.id,
                        choice_text: choice
                    })

                }
            }


        }

        const anket = await Survey.findOne({
            where: {
                id: survey.id
            },
            include: [
                {
                    model: Question,
                    as: "Questions",
                    include: [
                        {
                            model: Choice,
                            as: "Choices"
                        }
                    ]
                }
            ]
        })


        res.status(200).json(new Response(1, { anket }, "success"));
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getAnketler = async (req, res, next) => {
    try {

        const surveys = await Survey.findAll({
            order: [["created_at", "DESC"]]
        })


        res.status(200).json(new Response(1, { surveys }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}
const getAnket = async (req, res, next) => {
    try {

        const survey = await Survey.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Question,
                as: "Questions",
                include: [
                    {
                        model: Choice,
                        as: "Choices"
                    }
                ]
            }
        })


        res.status(200).json(new Response(1, { survey }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const replyAnket = async (req, res, next) => {
    try {
        const { answer, user, surveyID } = req.body

        const client = await Client.findOne({
            where: {

                ip: user
            }
        })

        const surveyResponse = await SurveyResponse.create({
            surveyID,
            userID: client.id
        })

        // const userResponse = await UserSurvey.create({
        //     surveyID,
        //     userID: client.id
        // })

        for (const element of answer) {

            if (element.choice) {
                const answer = await Answer.create({
                    responseID: surveyResponse.id,
                    questionID: element.questionID,
                    choiceID: element.choice
                })
            }
            if (element.choices) {
                for (const choiceElement of element.choices) {

                    const answer = await Answer.create({
                        responseID: surveyResponse.id,
                        questionID: element.questionID,
                        choiceID: choiceElement
                    })
                }
            }
            if (element.text) {
                const question = await Question.findOne({ where: { id: element.questionID } })

                // if (question.question_text != "Adınız Soyadınız") {

                    const answers = element.text.split(";")
                    console.log(answers);
                    for (const elementt of answers) {

                        await Answer.create({
                            responseID: surveyResponse.id,
                            questionID: element.questionID,
                            answer_text: elementt
                        })
                    }
                // } else {
                //     await Answer.create({
                //         responseID: surveyResponse.id,
                //         questionID: element.questionID,
                //         answer_text: element.text
                //     })
                // }

            }


        }

        res.status(200).json(new Response(1, {}, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}




const getAnketCevaplayanlar = async (req, res, next) => {
    try {

        const { surveyID } = req.params

        const answers = await SurveyResponse.findAll({
            where: {
                surveyID
            },
            include: [
                {
                    model: Client,
                    as: "client",
                    attributes: ["name"]
                },
                {
                    model: Answer,
                    as: "Answers",
                    include: {
                        model: Question,
                        as: "Question"
                    }
                }
            ]
        })



        res.status(200).json(new Response(1, { attends: answers }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getCevaplar = async (req, res, next) => {
    try {

        const { surveyID } = req.params

        const answers = await SurveyResponse.findAll({
            where: {
                surveyID
            },
            include: [
                {
                    model: Client,
                    as: "client",
                    attributes: ["name"]
                },
                {
                    model: Answer,
                    as: "Answers",
                    required: true,
                }
            ]
        })
        res.status(200).json(new Response(1, { answers }, "success"));
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}

const getCevap = async (req, res, next) => {
    try {

        const { surveyResponseID } = req.params

        const answer = await SurveyResponse.findOne({
            where: {
                id: surveyResponseID
            },
            include: [
                {
                    model: Client,
                    as: "client",
                },
                {
                    model: Answer,
                    as: "Answers",
                    required: true,
                    include: [
                        {
                            model: Choice,
                            as: "Choice"

                        },
                        {
                            model: Question,
                            as: "Question"
                        }
                    ]
                }
            ]
        })
        res.status(200).json(new Response(1, { answer }, "success"));
    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}


const getKullaniciCevap = async (req, res, next) => {
    try {

        const { surveyID, userID } = req.body



        const answers = await SurveyResponse.findAll({
            where: {
                surveyID: surveyID,
                userID: userID
            },
            include: [
                {
                    model: Client,
                    as: "client",
                },
                {
                    model: Answer,
                    as: "Answers",
                    required: true,
                }
            ]
        })


        res.status(200).json(new Response(1, { answers }, "success"));

    } catch (error) {
        console.log(error);
        return next(new CustomError())
    }
}
async function getSurveyStatistics(answers) {
    // Step 1: Create a lookup table for choices
    const choiceLookup = {};
    console.log(answers);
    for (const answer of answers) {
        if (answer?.Question?.Choices) {
            for (const choice of answer.Question.Choices) {
                choiceLookup[choice.id] = choice.choice_text;
            }
        }
    }

    // Step 2: Process the answers and generate statistics
    const statistics = {};

    for (const answer of answers) {
        const questionKey = `question_${answer.questionID}`;

        if (!statistics[questionKey]) {
            statistics[questionKey] = { answers: {}, question: "", type: "" };
        }

        if (answer.answer_text) {
            // Text answers
            if (!statistics[questionKey].answers[answer.answer_text]) {
                statistics[questionKey].answers[answer.answer_text] = 0;
            }
            statistics[questionKey].answers[answer.answer_text]++;
        }

        if (answer.choiceID) {
            // Choice answers
            const choiceText = choiceLookup[answer.choiceID];
            if (choiceText) {
                if (!statistics[questionKey].answers[choiceText]) {
                    statistics[questionKey].answers[choiceText] = 0;
                }
                statistics[questionKey].answers[choiceText]++;
            }
        }

        // Store question text and type
        statistics[questionKey].question = answer.Question?.question_text;
        statistics[questionKey].type = answer.Question?.question_type;
    }

    // Return the results
    return statistics;
}
const getCevapStatistics = async (req, res, next) => {
    try {

        const { surveyID } = req.params



        const answers = await Answer.findAll({
            include: [
                {
                    model: SurveyResponse,
                    as: "SurveyResponse",
                    required: true,
                    where: {
                        surveyID
                    }
                },
                {
                    model: Question,
                    as: "Question",
                    include: {
                        model: Choice,
                        as: Choice

                    }

                }
            ]
        })

        const a = await getSurveyStatistics(answers)


        res.status(200).json(new Response(1, { statistics: a }, "success"));



    } catch (error) {
        console.log(error);
        return next(new CustomError())

    }
}

const deleteAnket = async (req, res, next) => {
    try {

        await Survey.destroy({ where: { id: req.params.id } })

        res.status(200).json(new Response(1, {}, "success"));
    } catch (error) {
        console.log(error);
        return next(new CustomError())

    }
}

module.exports = {
    createAnket,
    replyAnket,
    getAnketCevaplayanlar,
    getCevaplar,
    getCevap,
    getAnketler,
    getAnket,
    getKullaniciCevap,
    getCevapStatistics,
    deleteAnket
}