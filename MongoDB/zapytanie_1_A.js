printjson(db.people.aggregate([
    {$group:{_id:"$sex",weight:{$avg:"$weight"},height:{$avg:"$height"}}}
]).toArray());
