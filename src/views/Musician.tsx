import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { Spin, Tag } from "antd";
import { musicianStore } from "../store/MusicianStore";
import { observer } from "mobx-react";
const { CheckableTag } = Tag;

type languageType = "全部" | "华语" | "日本" | "韩国" | "欧美" | "其他";
type categoryType = "全部" | "男歌手" | "女歌手" | "组合歌手";
interface resultType {
  [key: string]: {
    [key: string]: number;
  };
}
type getDataStatusType = "scroll" | "init";
// HashMap 取筛选后的值
const result: resultType = {
  华语: {
    男歌手: 1001,
    女歌手: 1002,
    组合歌手: 1003,
  },
  日本: {
    男歌手: 6001,
    女歌手: 6002,
    组合歌手: 6003,
  },
  韩国: {
    男歌手: 7001,
    女歌手: 7002,
    组合歌手: 7003,
  },
  欧美: {
    男歌手: 2001,
    女歌手: 2002,
    组合歌手: 2003,
  },
  其他: {
    男歌手: 4001,
    女歌手: 4002,
    组合歌手: 4003,
  },
};

const Musician: React.FC = () => {
  // 筛选歌手选项
  const [nameFilter, setNameFilter] = useState<string[]>(["全部"]);
  const createNameFilter = (): void => {
    let result: string[] = [];
    for (let i = 65; i <= 90; i++) {
      result = [...result, String.fromCharCode(i)];
    }
    setNameFilter(["热门", ...result]);
  };
  const [languageFilter] = useState<languageType[]>([
    "全部",
    "华语",
    "日本",
    "韩国",
    "欧美",
    "其他",
  ]);
  const [categoryFilter] = useState<categoryType[]>([
    "全部",
    "男歌手",
    "女歌手",
    "组合歌手",
  ]);
  // 语种
  const [languageTag, setLanguageTag] = useState<languageType>("全部");
  const handleChangeLanguage = (tag: languageType) => {
    setLanguageTag(tag);
    musicianStore.setStateOffset(0);
  };

  // 分类
  const [categoryTag, setCategoryTag] = useState<categoryType>("全部");
  const handleChangeCategoryTag = (tag: categoryType) => {
    setCategoryTag(tag);
    musicianStore.setStateOffset(0);
  };

  // 筛
  const [filterTag, setFilterTag] = useState<string>("热门");
  const handleChangeFilterTag = (tag: string) => {
    setFilterTag(tag);
    musicianStore.setStateOffset(0);
  };

  // 滚动加载
  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const mainScrollProperty = {
      scrollHeight: e.currentTarget.scrollHeight,
      scrollTop: e.currentTarget.scrollTop,
      clientHeight: e.currentTarget.clientHeight,
    };
    // 滚动最底下加载新资源
    const { scrollHeight, scrollTop, clientHeight } = mainScrollProperty;
    if (
      scrollTop + clientHeight === scrollHeight &&
      !(musicianStore.state.offset >= 100)
    ) {
      musicianStore.setStateOffset(musicianStore.state.offset + 12);
    }
  };

  const backTop = useRef<HTMLElement>(null);

  useEffect(() => {
    createNameFilter(); // 生成 A-Z
  }, []);

  const getData = (type: "init" | "scroll") => {
    if (languageTag === "全部" || categoryTag === "全部") {
      musicianStore.hotMusicians(type);
    } else {
      musicianStore.getMusiciansData(type, {
        cat: result[languageTag][categoryTag],
        initial: filterTag === "热门" ? undefined : filterTag,
      });
    }
    if (type === "init") backTop.current?.scrollTo(0, 0);
  };

  // 数据请求
  useEffect(() => {
    let type: getDataStatusType =
      musicianStore.state.offset === 0 ? "init" : "scroll";
    getData(type);
  }, [musicianStore.state.offset, languageTag, categoryTag, filterTag]);

  return (
    <Suspense fallback={<Spin />}>
      <div className="musician">
        <header>
          <div className="language">
            <span style={{ marginRight: 8 }}>语种:</span>
            {languageFilter.map((tag) => (
              <CheckableTag
                key={tag}
                checked={languageTag === tag}
                onChange={(checked) => handleChangeLanguage(tag)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
          <div className="category">
            <span style={{ marginRight: 8 }}>分类:</span>
            {categoryFilter.map((tag) => (
              <CheckableTag
                key={tag}
                checked={categoryTag === tag}
                onChange={(checked) => handleChangeCategoryTag(tag)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
          <div className="filterName">
            <span style={{ marginRight: 8 }}>筛选:</span>
            {nameFilter.map((tag) => (
              <CheckableTag
                key={tag}
                checked={filterTag === tag}
                onChange={(checked) => handleChangeFilterTag(tag)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        </header>

        <main ref={backTop} onScroll={handleScroll}>
          {musicianStore.musicians.map((item, index) => {
            return (
              <div className="songs" key={index}>
                <img loading="lazy" src={item.picUrl} />
                <h3>{item.name}</h3>
              </div>
            );
          })}
        </main>
      </div>
    </Suspense>
  );
};

export default memo(observer(Musician));
