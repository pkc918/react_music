import { Carousel, Image } from "antd";
import React, { useEffect, memo } from "react";
import IconFont from "../components/IconFont";
import { store } from "../store/store";

const Discover: React.FC = () => {
  useEffect(() => {
    // 轮播图
    store.getBannerImgs();
    // 歌单
    store.getPlayLists();
    // 新歌
    store.getNewSongs();
    // MV
    store.getRecommendMV();
  }, []);

  return (
    <div className="home">
      <div className="banners">
        <Carousel autoplay>
          {store.bannerImgs.map((item) => {
            return (
              <Image loading="lazy" key={item.targetId} src={item.imageUrl} />
            );
          })}
        </Carousel>
      </div>
      <main>
        <div className="newPlayLists">
          <h2>推荐歌单</h2>
          <div>
            {store.playLists.map((item) => {
              return (
                <div className="playList" key={item.id}>
                  <div>
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                    <img loading="lazy" src={item.picUrl} alt="" />
                  </div>
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="newPlayLists">
          <h2>推荐新歌</h2>
          <div>
            {store.newSongs.map((item, index) => {
              return (
                <div className="newSongs" key={item.id}>
                  <span>{index + 1 >= 10 ? index + 1 : "0" + (index + 1)}</span>
                  <div>
                    <img loading="lazy" src={item.picUrl} alt="" />
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                  </div>
                  <div className="p">
                    <p>{item.name}</p>
                    {item.song.artists.map((artist) => {
                      return <p key={artist.id}>{artist.name}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="newPlayLists">
          <h2>推荐 MV</h2>
          <div>
            {store.recommendMVs.map((item, index) => {
              return (
                <div className="mvs" key={item.id}>
                  <div>
                    <img loading="lazy" src={item.picUrl} alt="" />
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                  </div>
                  <div className="p">
                    <p>{item.name}</p>
                    {item.artists.map((artist) => {
                      return <p key={artist.id}>{artist.name}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
};

export default memo(Discover);
