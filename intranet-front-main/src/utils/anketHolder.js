
export const getAnsweredSurveys = () => {
  return JSON.parse(localStorage.getItem('answeredAnket')) || [];
};

export const markSurveyAsAnswered = (id) => {
  const answered = getAnsweredSurveys();
  if (!answered.includes(id)) {
    answered.push(id);
    localStorage.setItem('answeredAnket', JSON.stringify(answered));
  }
};

export const isSurveyAnswered = (id) => {
  const answered = getAnsweredSurveys();
  return answered.includes(id);
};
