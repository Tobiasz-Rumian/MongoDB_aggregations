printjson(db.people.aggregate([
    { $project: {nationality:"$nationality", weight:"$weight",height:"$height",bmiH:{$divide:["$height",100]}}},
    { $project: {nationality:"$nationality", weight:"$weight",height:"$height",bmi2:{$multiply:["$bmiH","$bmiH"]}}},
    { $project: {nationality:"$nationality",bmi:{$divide:["$weight","$bmi2"]}}},
    {$group:{_id:"$nationality",min:{$min:"$bmi"},max:{$max:"$bmi"},avg:{$avg:"$bmi"}}},
    {$sort:{_id: 1}}
]).toArray());
