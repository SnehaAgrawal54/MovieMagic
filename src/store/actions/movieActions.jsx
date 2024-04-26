export { removemovie } from "../reducers/movieSlice"
import { loadmovie } from '../reducers/movieSlice'
import axios from "../../utils/axios"

export const asyncloadmovie = (id) => async (dispatch, getState) => {
    try {
        const detail = await axios.get(`/movie/${id}`);
        const externalid = await axios.get(`/movie/${id}/external_ids`);
        const recommendations = await axios.get(`/movie/${id}/recommendations`);
        const similar = await axios.get(`/movie/${id}/similar`);
        const translations = await axios.get(`/movie/${id}/translations`);
        const videos = await axios.get(`/movie/${id}/videos`);
        const watchproviders = await axios.get(`/movie/${id}/watch/providers`);

        let ultimatedetails = {
            detail: detail.data,
            externalid: externalid.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            translations: translations.data.translations.map((item) => item.english_name),
            videos: videos.data.results.find((i) => i.type === "Trailer"),
            watchproviders: watchproviders.data.results.IN,
        }

        dispatch(loadmovie(ultimatedetails))
    } catch (error) {
        console.log("Error:", error)
    }
}