const { ToDo } = require('./db')

// SELECT *
exports.list = async (ctx) => {
    let {startDate} = ctx.request.query
    startDate = new Date(startDate)
    const year = startDate.getUTCFullYear()
    const month = startDate.getUTCMonth()
    try {
        const todos = await ToDo.find({
            "date":{
                $gte:new Date(Date.UTC(year,month,1)),
                $lte:new Date(Date.UTC(year,month+1,0)),
            },
        })
        .sort({date:1})
        .sort({createAt:1})
        .exec()
        ctx.body = todos
    } catch(e) {
        ctx.throw(e, 500)
    }
}

// SELECT id
exports.read = async (ctx) => {
   const {id} = ctx.params
   try {
       const post = await ToDo.findById(id).exec()
       if(!post) {
           ctx.status = 404
           return
       }
       ctx.body = post
   } catch(e) {
       ctx.throw(e, 500)
   }
}

// DELETE id
exports.remove = async (ctx) => {
    const {id} = ctx.params
    try {
        await ToDo.deleteOne({_id:id,}).exec()
        ctx.status = 204
    } catch(e) {
        ctx.throw(e, 500)
    }
}

// INSERT
exports.write = async (ctx) => {
   const {date, title, writer, contents} = ctx.request.body

   const todo = new ToDo({
       date, 
       title, 
       writer, 
       contents, 
       complete:false,
       createAt: new Date(),
   })
   try {
       await todo.save();
       ctx.body = todo;
   } catch(e) {
       ctx.throw(e, 500)
   }
}

// UPDATE id
exports.update = async (ctx) => {
    const {id} = ctx.params
    try {
        const post = await ToDo.findByIdAndUpdate(id, ctx.request.body, {
            new:true
        }).exec()
        if (!post) {
            ctx.status = 404
            return
        }
        ctx.body = post
    } catch(e) {
        ctx.throw(e, 500)
    }
}




