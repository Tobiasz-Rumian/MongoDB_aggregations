db.people.mapReduce(
    function () {
        for (let i in this.credit) {
            emit(this.credit[i].currency, {sum: this.credit[i].balance, count: 1});
        }
    },
    function (currency, object) {
        return {
            sum: Array.sum(object.map(object => parseFloat(object.sum))).toFixed(2),
            count: object.length
        }
    },
    {
        out: "zapytanie_5",
        query:{
            nationality: {$eq: "Poland"},
            sex: {$eq: "Female"}
        },
        finalize: function (key, result) {
            const avg = result.sum/result.count;
            return {sum:result.sum,avg:avg};
        }
    }
);

printjson(db.zapytanie_5.find().toArray());
