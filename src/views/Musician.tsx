import React, { memo, Suspense, useEffect, useRef, useState } from "react";
import { Spin, Tag } from "antd";
import { getHotMusicians, getMusicians } from "../api/api";
import { off } from "process";
const { CheckableTag } = Tag;

type languageType = "全部" | "华语" | "日本" | "韩国" | "欧美" | "其他";
type categoryType = "全部" | "男歌手" | "女歌手" | "组合歌手";
interface resultType {
  [key: string]: {
    [key: string]: number;
  };
}
type paramsQueryType = (
  params: {
    language: languageType;
    category: categoryType;
    filter: string;
    offset: number;
  },
  type: getDataStatusType
) => void;
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
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
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
    console.log(tag, "语种");
    setLanguageTag(tag);
    setOffset(0);
  };

  // 分类
  const [categoryTag, setCategoryTag] = useState<categoryType>("全部");
  const handleChangeCategoryTag = (tag: categoryType) => {
    console.log(tag, "分类");
    setCategoryTag(tag);
    setOffset(0);
  };

  // 筛选
  const [filterTag, setFilterTag] = useState<string>("热门");
  const handleChangeFilterTag = (tag: string) => {
    console.log(tag, "名字");
    setFilterTag(tag);
    setOffset(0);
  };

  // 歌手数据
  const [musicians, setMusicians] = useState<any[]>([]);

  // 筛选接口参数
  const paramsQuery: paramsQueryType = (params, type = "init") => {
    const { language, category, filter, offset } = params;
    console.log(language, category, "类型");

    if (language === "全部" || category === "全部") {
      getHotMusicians({ offset, limit }).then((res) => {
        if (type === "init") {
          setMusicians(res.artists);
          backTop.current?.scrollTo(0, 0);
        } else if (type === "scroll") {
          setMusicians([...musicians, ...res.artists]);
        } else {
          throw "类型错误";
        }
      });
    } else {
      const data = {
        cat: result[language][category],
        initial: filter === "热门" ? undefined : filter,
        limit,
        offset,
      };
      getMusicians(data).then((res) => {
        console.log(res.artists);
        if (type === "init") {
          console.log("init");
          backTop.current?.scrollTo(0, 0);

          setMusicians(res.artists);
        } else if (type === "scroll") {
          console.log("scroll");

          setMusicians([...musicians, ...res.artists]);
        } else {
          throw "类型错误";
        }
      });
    }
  };

  // 滚动加载
  const handleScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    const mainScrollProperty = {
      scrollHeight: e.currentTarget.scrollHeight,
      scrollTop: e.currentTarget.scrollTop,
      clientHeight: e.currentTarget.clientHeight,
    };

    const { scrollHeight, scrollTop, clientHeight } = mainScrollProperty;
    if (scrollTop + clientHeight === scrollHeight && !(offset >= 100)) {
      setOffset(offset + 20);
    }
  };

  const backTop = useRef<HTMLElement>(null);

  useEffect(() => {
    createNameFilter(); // 生成 A-Z
  }, []);

  // 数据请求
  useEffect(() => {
    let type: getDataStatusType = offset === 0 ? "init" : "scroll";
    console.log(offset, "offset");
    paramsQuery(
      {
        language: languageTag,
        category: categoryTag,
        filter: filterTag,
        offset,
      },
      type
    );
  }, [offset, languageTag, categoryTag, filterTag]);

  return (
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

      <Suspense fallback={<Spin />}>
        <main ref={backTop} onScroll={handleScroll}>
          {musicians.map((item, index) => {
            return (
              <div className="songs" key={index}>
                <img loading="lazy" src={item.picUrl} />
                <h3>{item.name}</h3>
              </div>
            );
          })}
        </main>
      </Suspense>
    </div>
  );
};

export default memo(Musician);
