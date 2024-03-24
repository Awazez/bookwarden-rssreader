// src/components/useFeed.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import xml2js from 'xml-js';

const useFeed = (url) => {
  const [feed, setFeed] = useState(null);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await axios.get(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`);
        const result = xml2js.xml2json(res.data, { compact: true, spaces: 2 });
        const json = JSON.parse(result);
        setFeed(json.rss.channel);
      } catch (error) {
        console.error("Error fetching the feed: ", error);
      }
    };

    fetchFeed();
  }, [url]);

  return feed;
};

export default useFeed;