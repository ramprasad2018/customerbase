
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

// Hardcoded data

const customers = [
    {id:'1', name:'Ram', email:'rp@gmail.com', age:35},
    {id:'2', name:'Rudra', email:'rp2@gmail.com', age:15},
    {id:'3', name:'Hari', email:'rp3@gmail.com', age:30},
];



// Customer Type

const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type:GraphQLInt},
    })
});

// Root query
const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        customer: {
            type:CustomerType,
            args:{
                id:{type:GraphQLString},
                name:{type:GraphQLString}
            },
            resolve(parentValue, args){
                var n = args.name;
                for(let i = 0; i < customers.length;i++) {
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            } 
        },

        customer1: {
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                for(let i = 0; i < customers.length;i++) {
                    if(customers[i].id == args.id){
                        return customers[i];
                    }
                }
            } 
        }
    }
    
});

module.exports = new GraphQLSchema({
    query: RootQuery
});