import React from "react";
import { apiKey, apiUrl } from "@/constants";
import TitleBrowse from "@/components/TitleBrowse";
import SkeletonCardBrowse from "@/components/skeleton/SkeletonCardBrowse";

import dynamic from "next/dynamic";
const CardBrowse = dynamic(() => import("@/components/CardBrowse"));

const Browse = () => {
  const [platforms, setPlatforms] = React.useState([]);
  const [genres, setGenres] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [creators, setCreators] = React.useState([]);
  const [developers, setDevelopers] = React.useState([]);
  const [publishers, setPublishers] = React.useState([]);
  const [stores, setStores] = React.useState([]);

  const [lengthPlatforms, setLengthPlatforms] = React.useState(0);
  const [lengthGenres, setLengthGenres] = React.useState(0);
  const [lengthTags, setLengthTags] = React.useState(0);
  const [lengthCreators, setLengthCreators] = React.useState(0);
  const [lengthDevelopers, setLengthDevelopers] = React.useState(0);
  const [lengthPublishers, setLengthPublishers] = React.useState(0);
  const [lengthStores, setLengthStores] = React.useState(0);

  const getPlatforms = async () => {
    const response = await fetch(`${apiUrl}/platforms?key=${apiKey}`);
    const data = await response.json();
    setLengthPlatforms(data.count);
    setPlatforms(data.results);
  };

  const getGenres = async () => {
    const response = await fetch(`${apiUrl}/genres?key=${apiKey}`);
    const data = await response.json();
    setLengthGenres(data.count);
    setGenres(data.results);
  };

  const getTags = async () => {
    const response = await fetch(`${apiUrl}/tags?key=${apiKey}`);
    const data = await response.json();
    setLengthTags(data.count);
    setTags(data.results);
  };

  const getCreators = async () => {
    const response = await fetch(`${apiUrl}/creators?key=${apiKey}`);
    const data = await response.json();
    setLengthCreators(data.count);
    setCreators(data.results);
  };

  const getDevelopers = async () => {
    const response = await fetch(`${apiUrl}/developers?key=${apiKey}`);
    const data = await response.json();
    setLengthDevelopers(data.count);
    setDevelopers(data.results);
  };

  const getPublishers = async () => {
    const response = await fetch(`${apiUrl}/publishers?key=${apiKey}`);
    const data = await response.json();
    setLengthPublishers(data.count);
    setPublishers(data.results);
  };

  const getStores = async () => {
    const response = await fetch(`${apiUrl}/stores?key=${apiKey}`);
    const data = await response.json();
    setLengthStores(data.count);
    setStores(data.results);
  };

  React.useEffect(() => {
    getPlatforms();
    getGenres();
    getTags();
    getCreators();
    getDevelopers();
    getPublishers();
    getStores();
  }, []);

  return (
    <div>
      <h1 className="text-6xl font-bold">Browse</h1>
      <TitleBrowse
        href="/games/platforms"
        title="Platforms"
        length={lengthPlatforms.toLocaleString()}
      />
      {platforms?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {platforms?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/games/platforms" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/games/genres"
        title="Genres"
        length={lengthGenres.toLocaleString()}
      />
      {genres?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {genres?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/games/genres" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/games/tags"
        title="Tags"
        length={lengthTags.toLocaleString()}
      />
      {tags?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {tags?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/games/tags" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/creators"
        title="Creators"
        length={lengthCreators.toLocaleString()}
      />
      {creators?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {creators?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/creators" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/developers"
        title="Developers"
        length={lengthDevelopers.toLocaleString()}
      />
      {developers?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {developers?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/developers" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/publishers"
        title="Publishers"
        length={lengthPublishers.toLocaleString()}
      />
      {publishers?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {publishers?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/publishers" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
      <TitleBrowse
        href="/games/stores"
        title="Stores"
        length={lengthStores.toLocaleString()}
      />
      {stores?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {stores?.slice(0, 4).map((item) => (
            <CardBrowse pathname="/games/stores" key={item.id} {...item} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          <SkeletonCardBrowse cards={4} />
        </div>
      )}
    </div>
  );
};

export default Browse;
