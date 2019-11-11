import axios from "axios";
import reverseGeocode from "./reverseGeocode";


it("fetches address from mapbox places", async () => {

    axios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { features: [{
            place_name:"New York City"
        }] }
      }))

    const address = await reverseGeocode(40, -73)
    expect(address).toEqual("New York City");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
    `http://api.mapbox.com/geocoding/v5/mapbox.places/-73,40.json`,{
            params: {
                access_token: process.env.REACT_APP_MAPBOX_KEY
            }
        }
  );

    });
