import axios from "axios";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNTJkNTYyMTdmMzg5YWMzMjRjZTU4ODc0ZjVhYzVkZCIsInN1YiI6IjY2MjIwZTQ0MDIzMWYyMDE3YzEyZjAxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5U5AymeddNtp1_YCLHxvK16JyIsbWJeXGT78thY-05M"
    }
});

export default instance