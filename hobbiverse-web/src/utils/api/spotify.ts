const LoginSpotify = () => {
  const CLIENT_ID = "22e1d88c233349f5acda9f04ae0a8bb8";
  const REDIRECT_URI = "http://localhost:3000/";
  const AUTH_ENDPOINT = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=ugc-image-upload%20user-read-playback-state%20user-modify-playback-state%20user-read-currently-playing%20streaming%20playlist-read-private%20playlist-read-collaborative%20playlist-modify-private%20playlist-modify-public%20user-follow-modify%20user-follow-read%20user-read-playback-position%20user-top-read%20user-read-recently-played%20user-library-modify%20user-library-read%20user-read-private`;
  const RESPONSE_TYPE = "token";

  // const
};

export default LoginSpotify;
