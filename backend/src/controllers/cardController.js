export const getTrendingCards = (req, res) => {
  const cards = [
    {
      _id: "1",
      name: "HDFC Millennia",
      tagline: "5% Cashback on everything",
      logoUrl:
        "https://companieslogo.com/img/orig/HDB-bb6241fe.png?t=1720244492",
    },
    {
      _id: "2",
      name: "SBI Cashback",
      tagline: "Flat 5% Cashback",
      logoUrl:
        "https://companieslogo.com/img/orig/SBIN.NS-62e91540.png?t=1720244493",
    },
    {
      _id: "3",
      name: "Axis Flipkart",
      tagline: "Unlimited 5% Cashback",
      logoUrl:
        "https://companieslogo.com/img/orig/AXISBANK.BO-8f59e95b.png?t=1720244490",
    },
  ];
  res.json(cards);
};
