printjson(db.people.aggregate([
    {$unwind:"$credit"},
    { $project: { currency:"$credit.currency",balance:{$toDouble:"$credit.balance"} }},
    {$group:{_id:"$currency",sum:{$sum:"$balance"}}},
    {$sort:{_id: 1}}
]).toArray());
