function paginatedModel(model){
    return (req,res,next)=>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const startIndex = ( page - 1) * limit
    const endIndex = page * limit
    console.log(endIndex)
    console.log(startIndex)
    var data = {}
    data.startIndex = startIndex;
    data.endIndex = endIndex;
    data.remainingItems = model.length - (startIndex +limit)
    data.remainingPages = data.remainingItems/limit
    if(endIndex>0){
        data.next = {
            page:page + 1 ,
            limit:limit
        }
    }
    if(startIndex>0){
        data.previous = {
            page:page - 1,
            limit,
        }
    }
    data.userdata = model.slice( startIndex , endIndex );
    res.send(data)
    next()
    }
}

module.exports = paginatedModel;