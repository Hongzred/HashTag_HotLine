import {API, graphqlOperation} from 'aws-amplify'
import {listReports} from '../custom_graphql/queries' 
import {
  createReport,createReportHashtags
} from '../graphql/mutations' 
import {createUserHashtag,getHashtagByName} from "./settings"
import {fetchRecentReports} from '../graphql/queries'

const createUserReport = async ({
    hashtags,
    location,
    post,
    post_date_creation,
    post_id,
    user_id,
    username,
  },settingsId)  => {
   
    const {
        data: {
          createReport: {id:reportId} 
        },
      } = await API.graphql(
        graphqlOperation(createReport, {input: {
            longtitude:location.longitude, // Need to fix DB field name
            latitude:location.latitude,
            post,
            date:post_date_creation,
            postId:post_id,
            userId:user_id,
            username,
            status: "PENDING",
            spam: false
        }})) 
        hashtags.forEach(async (hashtag) => {
            const hashtagId = await getHashtagByName(hashtag)
            if(!hashtagId) {
                await createUserHashtag(hashtag, settingsId)
            }
            
            await API.graphql(
                graphqlOperation(createReportHashtags,{input: {
                reportHashtagsReportId: reportId,
                reportHashtagsHashtagId: settingsId
            }}))
        })
      
    }
 
    const getUserReports = async () => {
        const {
            data: {
                listReports: {items}, 
            },
          } = await API.graphql(graphqlOperation(listReports))

          const reports = items.map((report) => ({...report, hashtags:report.hashtags.items.map((hashtag) => hashtag.name)}))
          return reports
    }

    const getRecentUserReports = async (oldReports,hashtags) => {
        const oldReportPosts = oldReports.map((report) => report.postId)

        let reports = await hashtags.map(async (hashtag) => {
            const {data:{fetchRecentReports: reports}} = await API.graphql(graphqlOperation(fetchRecentReports,{hashtag}));
            return reports            
        })
        reports = await Promise.all(reports)
        return reports.flat().filter((report) => !oldReportPosts.includes(report.post_id)) 
        
    }

   const updateUserReports = async (oldReports, hashtags) => {
        const reports = await getRecentUserReports(oldReports,hashtags)
        await reports.forEach(async (report) => {
            await createUserReport(report)
        })
        return reports
    }

    export {
        createUserReport,getUserReports,getRecentUserReports,updateUserReports
    }


