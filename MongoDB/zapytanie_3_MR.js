db.people.mapReduce(
    function () {
        emit(this.job,1);
    },
    function (job, x) {
        return Array.sum(x);
    },
    {
        out: "zapytanie_3"
    }
);
printjson(db.zapytanie_3.find().toArray());
