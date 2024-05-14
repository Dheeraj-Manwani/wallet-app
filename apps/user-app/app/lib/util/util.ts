export const massageAuditData = (data) => {

  const formattedData = [];

  data.forEach((d) => {
    const currDate = formatDate(d.date);
    if (!formattedData.find((data) => data.date === currDate)) {
      formattedData.push({ date: currDate, balance: d.Balance });
    }
  });

  const auditData = [];
  formattedData.reverse();

  let startDate = new Date(formattedData[0].date);
  const endDate = new Date(formattedData[formattedData.length - 1].date);
  let index = 0;
  let lastBalance = formattedData[0].balance;

  while (startDate <= endDate) {
    auditData.push({ date: formatDate(startDate), balance: lastBalance });
    if (new Date(formattedData[index].date).getTime() === startDate.getTime()) {
      index++;
      lastBalance = formattedData[index]? .balance;
    }
    startDate = new Date(startDate.setDate(startDate.getDate() + 1));
  }

  return auditData
};

// export const
const formatDate = (date) => {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = mm + "/" + dd + "/" + yyyy;

  return formattedToday;
};
