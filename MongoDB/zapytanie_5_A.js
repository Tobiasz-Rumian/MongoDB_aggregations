printjson(db.people.aggregate([
    {$match:{sex:"Female",nationality:"Poland"}},
    {$unwind:"$credit"},
    { $project: { currency:"$credit.currency",balance:{$toDouble:"$credit.balance"}}},
    {$group:{_id:"$currency",avg:{$avg:"$balance"},sum:{$sum:"$balance"}}},
    {$sort:{_id:1}}
]).toArray());
