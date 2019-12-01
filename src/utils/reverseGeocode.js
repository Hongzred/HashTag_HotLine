import axios from 'axios'

export default async (lat, long) => {
  let address
  try {
    const response = await axios.get(
      `http://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`,
      {
        params: {
          access_token: process.env.REACT_APP_MAPBOX_KEY,
        },
      },
    )
    address = response.data.features[0].place_name
  } catch {
    address = 'Address not available'
  }
  return address
}
