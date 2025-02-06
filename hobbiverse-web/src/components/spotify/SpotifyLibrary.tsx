"use client";
import useSpotifyAuth from "@/hooks/spotify/useSpotifyAuth";
import useSpotifyLibrary from "@/hooks/spotify/useSpotifyLibrary";
import { fetchLibrary } from "@/utils/api/spotify/spotify";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SpotifyLibrary = () => {
  const { accessToken } = useSpotifyAuth();
  const [library, setLibrary] = useState(null);

  useEffect(() => {
    const getLibrary = async () => {
      if (accessToken) {
        const libraryData = await fetchLibrary();
        setLibrary(libraryData);
      }
    };
    getLibrary();
  }, [accessToken]);

  const { playlists } = useSpotifyLibrary(library);

  return (
    <div className="flex flex-col h-full gap-2 px-2 m-2">
      <h2 className="px-3 mt-4 pb-2 font-bold text-lg">Playlists Library</h2>
      {playlists ? (
        playlists.map((playlist, index) => (
          <section key={index} className="flex flex-col my-2">
            <Link href={`/music/playlist/${playlist.id}`}>
              <div className="flex gap-2 text-md font-light">
                <div>
                  {playlist.images[0]?.url ? (
                    <div className="h-[65px] w-[65px]">
                      <Image
                        className="rounded-md"
                        src={playlist.images[0]?.url}
                        width={120}
                        height={120}
                        alt={`${playlist.name}'s cover image`}
                      />
                    </div>
                  ) : (
                    <div>
                      <p>No Image</p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1 px-1 justify-center">
                  <span>{playlist.name}</span>
                  <span>{playlist.owner?.display_name}</span>
                </div>
              </div>
            </Link>
          </section>
        ))
      ) : (
        <div>
          <p>No playlists found</p>
        </div>
      )}
    </div>
  );
};

export default SpotifyLibrary;
