db.people.mapReduce(
    function() {
        emit(this.sex, {weight: this.weight, height: this.height})
    },
    function(sex, object) {
        const avgWeight = Array.sum(object.map(x => x.weight)) / object.length;
        const avgHeight = Array.sum(object.map(x => x.height)) / object.length;
        return {weight: avgWeight, height: avgHeight};
    },
    {
        out: "zapytanie_1"
    }
)
printjson(db.zapytanie_1.find().toArray());
