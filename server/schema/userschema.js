const zod = require('zod');

const usersignupschema = zod.object({
    firstname:zod.string(),
    lastname:zod.string(),
    username:zod.string().email(),
    password:zod.string().min(5)

});

const usersigninschema = zod.object({
    username:zod.string(),
    password:zod.string().min(5)

});

const userupdateschema = zod.object({
    firstname:zod.string().optional(),
    lastname:zod.string().optional(),
    username:zod.string().email().optional(),
    password:zod.string().min(5).optional()
})

module.exports={usersignupschema,usersigninschema,userupdateschema};