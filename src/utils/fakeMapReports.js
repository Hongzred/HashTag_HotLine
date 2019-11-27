import { listReports } from "../custom_graphql/queries"; 
import { API, graphqlOperation } from "aws-amplify";

const jsonData=[
  {
    "_id": "5dc2f75ea5c32bb3c49a667f",
    "report": "laborum",
    "description": "excepteur anim exercitation dolor enim",
    "latitude": "40.8",
    "longitude": "-73.9412"
  },
  {
    "_id": "5dc2f75ea0fd836214e9cf5f",
    "report": "cillum",
    "description": "veniam pariatur ea amet ea",
    "latitude": "40.81",
    "longitude": "-73.9549"
  },
  {
    "_id": "5dc2f75e8da3f4e4a18d8826",
    "report": "esse",
    "description": "labore ipsum quis elit sint",
    "latitude": "40.71",
    "longitude": "-73.9781"
  },
  {
    "_id": "5dc2f75ebeda609c25516395",
    "report": "excepteur",
    "description": "enim elit aliqua aute aute",
    "latitude": "40.82",
    "longitude": "-73.9754"
  },
  {
    "_id": "5dc2f75eb33f30dbe9719ead",
    "report": "reprehenderit",
    "description": "labore ipsum id ex anim",
    "latitude": "40.73",
    "longitude": "-73.9307"
  },
  {
    "_id": "5dc2f75ea56f1ea4afa19815",
    "report": "duis",
    "description": "mollit officia do ea qui",
    "latitude": "40.76",
    "longitude": "-73.9775"
  },
  {
    "_id": "5dc2f75e2b378e68cdd91ed0",
    "report": "veniam",
    "description": "deserunt tempor velit cillum excepteur",
    "latitude": "40.81",
    "longitude": "-73.9444"
  },
  {
    "_id": "5dc2f75ef78d59c4f0217340",
    "report": "non",
    "description": "ex laboris laborum amet esse",
    "latitude": "40.74",
    "longitude": "-73.9994"
  },
  {
    "_id": "5dc2f75e8f1fb57b475f95ac",
    "report": "amet",
    "description": "pariatur commodo enim laborum fugiat",
    "latitude": "40.77",
    "longitude": "-73.9049"
  },
  {
    "_id": "5dc2f75eed98a9973ab2a73f",
    "report": "voluptate",
    "description": "ad eu consequat ipsum in",
    "latitude": "40.81",
    "longitude": "-73.9149"
  },
  {
    "_id": "5dc2f75ed5965c4174e9392c",
    "report": "velit",
    "description": "veniam ea do consectetur Lorem",
    "latitude": "40.8",
    "longitude": "-73.9656"
  },
  {
    "_id": "5dc2f75ea9504266fb1a6d78",
    "report": "consectetur",
    "description": "deserunt et enim incididunt ad",
    "latitude": "40.72",
    "longitude": "-73.9475"
  },
  {
    "_id": "5dc2f75eb4a48e5d7a36ec02",
    "report": "nostrud",
    "description": "culpa in est velit sunt",
    "latitude": "40.76",
    "longitude": "-73.995"
  },
  {
    "_id": "5dc2f75e7b399f92b7897975",
    "report": "labore",
    "description": "exercitation cupidatat commodo qui occaecat",
    "latitude": "40.78",
    "longitude": "-73.9745"
  },
  {
    "_id": "5dc2f75e43b78c3b2ed10f6d",
    "report": "anim",
    "description": "sunt ullamco id deserunt occaecat",
    "latitude": "40.75",
    "longitude": "-73.9942"
  },
  {
    "_id": "5dc2f75ea2472651f233ff60",
    "report": "aute",
    "description": "velit quis adipisicing mollit veniam",
    "latitude": "40.75",
    "longitude": "-73.9044"
  },
  {
    "_id": "5dc2f75e1fdde9e58cf93457",
    "report": "magna",
    "description": "et irure enim quis cillum",
    "latitude": "40.81",
    "longitude": "-73.9746"
  },
  {
    "_id": "5dc2f75ee1c43394d02e36d1",
    "report": "duis",
    "description": "dolor minim sunt proident nulla",
    "latitude": "40.79",
    "longitude": "-73.9606"
  },
  {
    "_id": "5dc2f75e2091b5cea7195694",
    "report": "sunt",
    "description": "laborum aliqua aliquip nisi pariatur",
    "latitude": "40.78",
    "longitude": "-73.9798"
  },
  {
    "_id": "5dc2f75ecaa1127965c57dc4",
    "report": "ea",
    "description": "culpa velit commodo do aliquip",
    "latitude": "40.76",
    "longitude": "-73.9598"
  },
  {
    "_id": "5dc2f75ea976273fa25b982b",
    "report": "esse",
    "description": "velit culpa do laborum sunt",
    "latitude": "40.73",
    "longitude": "-73.9193"
  },
  {
    "_id": "5dc2f75ea5ceabcd60689477",
    "report": "mollit",
    "description": "deserunt anim laboris veniam sunt",
    "latitude": "40.72",
    "longitude": "-73.9117"
  },
  {
    "_id": "5dc2f75ed59e3faf99292e89",
    "report": "pariatur",
    "description": "voluptate sint nulla in elit",
    "latitude": "40.73",
    "longitude": "-73.9947"
  },
  {
    "_id": "5dc2f75eb083d60777c01c33",
    "report": "consequat",
    "description": "est esse irure consectetur sunt",
    "latitude": "40.74",
    "longitude": "-73.9216"
  },
  {
    "_id": "5dc2f75ed9fa1e7ed377313a",
    "report": "ea",
    "description": "sunt duis incididunt incididunt est",
    "latitude": "40.76",
    "longitude": "-73.9479"
  },
  {
    "_id": "5dc2f75ed814eb0d0936742e",
    "report": "deserunt",
    "description": "veniam irure occaecat occaecat nisi",
    "latitude": "40.74",
    "longitude": "-73.9651"
  },
  {
    "_id": "5dc2f75ebeba31338d48ebcb",
    "report": "magna",
    "description": "dolore id qui ex minim",
    "latitude": "40.71",
    "longitude": "-73.9934"
  },
  {
    "_id": "5dc2f75ead0781cea946a7e2",
    "report": "et",
    "description": "mollit aliqua labore tempor adipisicing",
    "latitude": "40.76",
    "longitude": "-73.9545"
  },
  {
    "_id": "5dc2f75ed6a14945fdeccd7a",
    "report": "sunt",
    "description": "Lorem proident dolor qui duis",
    "latitude": "40.82",
    "longitude": "-73.9996"
  },
  {
    "_id": "5dc2f75ee609b0b94b204836",
    "report": "est",
    "description": "amet nulla labore amet incididunt",
    "latitude": "40.8",
    "longitude": "-73.9993"
  },
  {
    "_id": "5dc2f75ebf50e4e634d72e42",
    "report": "nostrud",
    "description": "non ad aliqua voluptate consectetur",
    "latitude": "40.82",
    "longitude": "-73.9654"
  }
]

const realData = [
  {
    "_id": "5dc2f75ebf50e4e634d72e42",
    "report": "nostrud",
    "description": "non ad aliqua voluptate consectetur",
    "latitude": "40.82",
    "longitude": "-73.9654"
  }
]

const getReports = async () => {
  const {
      data: {
          listReports: { items } //We use destructoring to get reports (items)
      }
  } = await API.graphql(graphqlOperation(listReports)); 
  const reports = items; 
  console.log(items);
  return reports; 
}

const fakeReports =  async () => { 
  const realData = [
    {
      "_id": "5dc2f75ebf50e4e634d72e42",
      "report": "nostrud",
      "description": "non ad aliqua voluptate consectetur",
      "latitude": "40.82",
      "longitude": "-73.9654"
    }
  ]
  const {
      data: {
          listReports: { items } //We use destructoring to get reports (items)
      }
  } = await API.graphql(graphqlOperation(listReports)); 
  const reports = items; 
  console.log(items);
  realData.push(reports) 
  return jsonData.map((data) => ({ ...data, longitude: parseFloat(data.longitude), latitude: parseFloat(data.latitude) }))
}

export default fakeReports