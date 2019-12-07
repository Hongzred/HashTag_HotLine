const API = {
    graphql: jest.fn(() => Promise.resolve({ data: {} }))
}
const graphqlOperation = ()=>{}
const Amplify = {
    configure: ()=>{}
}

export default Amplify
export  {
    API,
    graphqlOperation
    
}
