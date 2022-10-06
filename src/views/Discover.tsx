import { Carousel, Image } from "antd";
import React, { useState, useEffect, memo } from "react";
import { getBanner, getNewSong, getPlayList, getMv } from "../api/api";
import IconFont from "../components/IconFont";
// import { createFromIconfontCN } from "@ant-design/icons";
// const IconFont = createFromIconfontCN({
//   scriptUrl: ["//at.alicdn.com/t/c/font_3685893_p836jz6du0t.js"],
// });

const Discover: React.FC = () => {
  const [banners, setBanners] = useState<any[]>([]);
  const [playlists, setPlayLists] = useState<any[]>([]);
  const [songs, setSons] = useState<any[]>([]);
  const [mvs, setMvs] = useState<any[]>([]);
  useEffect(() => {
    // 第一次执行
    getBanner().then((res) => {
      setBanners(res.banners);
    });

    getPlayList().then((res) => {
      setPlayLists(res.result);
    });

    getNewSong().then((res) => {
      setSons(res.result);
    });

    getMv().then((res) => {
      console.log(res.result);
      setMvs(res.result);
    });
  }, []);
  return (
    <div className="home">
      <div className="banners">
        <Carousel autoplay>
          {banners.map((item, index) => {
            return <Image key={index} src={item.imageUrl} />;
          })}
        </Carousel>
      </div>
      <main>
        <div className="newPlayLists">
          <h2>推荐歌单</h2>
          <div>
            {playlists.map((item, index) => {
              return (
                <div className="playList" key={index}>
                  <div>
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                    <img src={item.picUrl} alt="" />
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
            {songs.map((item, index) => {
              return (
                <div className="newSongs" key={index}>
                  <span>{index + 1 >= 10 ? index + 1 : "0" + (index + 1)}</span>
                  <div>
                    <img src={item.picUrl} alt="" />
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                  </div>
                  <div className="p">
                    <p>{item.name}</p>
                    <p>{item.song.artists[0].name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="newPlayLists">
          <h2>推荐 MV</h2>
          <div>
            {mvs.map((item, index) => {
              return (
                <div className="mvs" key={index}>
                  <div>
                    <img src={item.picUrl} alt="" />
                    <IconFont className="iconFont" type={"icon-bofang-copy"} />
                  </div>
                  <div className="p">
                    <p>{item.name}</p>
                    <p>{item.artists[0].name}</p>
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
