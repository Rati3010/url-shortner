import { UAParser } from 'ua-parser-js';
import superbase from './superbase';

export const getClicksForUrls = async urlIds => {
  const { data, error } = await superbase
    .from('clicks')
    .select('*')
    .in('url_id', urlIds);

  if (error) {
    console.error('Error fetching clicks');
    return null;
  }

  return data;
};

export const getClicksForUrl = async url_id => {
  const { data, error } = await superbase
    .from('clicks')
    .select('*')
    .eq('url_id', url_id);

  if (error) {
    console.error('Error fetching clicks');
    throw new Error('Unable to load stats');
  }

  return data;
};

const parser = new UAParser();

export const storeClicks = async ({id, originalUrl}) => {
    try {
      const res = parser.getResult();
      const device = res.type || "desktop";
  
      const response = await fetch("https://ipapi.co/json");
      const {city, country_name: country} = await response.json();
  
      // Record the click
      await superbase.from("clicks").insert({
        url_id: id,
        city: city,
        country: country,
        device: device,
      });
  
      // Redirect to the original URL
      window.location.href = originalUrl;
    } catch (error) {
      console.error("Error recording click:", error);
    }
  };