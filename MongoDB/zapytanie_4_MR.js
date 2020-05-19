db.people.mapReduce(
    function () {
        emit(this.nationality, {weight: this.weight, height: this.height, minBmi: 0, maxBmi: 0, avgBmi: 0});
    },
    function (nationality, object) {
        const bmiList = object.map(o => o.weight / ((o.height / 100) * (o.height / 100)))
        return {
            weight: object[0].weight,
            height: object[0].height,
            minBmi: Math.min.apply(null, bmiList),
            maxBmi: Math.max.apply(null, bmiList),
            avgBmi: Array.avg(bmiList)
        }
    },
    {
        out: "zapytanie_4",
        finalize: function (key, result) {
            if(result.minBmi<=0){
                const bmi = result.weight / ((result.height / 100) * (result.height / 100))
                return {minBmi: bmi, maxBmi: bmi, avgBmi: bmi}
            }
            return {minBmi: result.minBmi, maxBmi: result.maxBmi, avgBmi: result.avgBmi}
        }
    }
)
printjson(db.zapytanie_4.find().toArray());
