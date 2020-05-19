db.people.mapReduce(
    function () {
        for(let i in this.credit) {
            emit(this.credit[i].currency,this.credit[i].balance);
        }
    },
    function (currency, balance) {
        return Array.sum(balance.map(balance=> parseFloat(balance))).toFixed(2);
    },
    {
        out: "zapytanie_2"
    }
);
printjson(db.zapytanie_2.find().toArray());
