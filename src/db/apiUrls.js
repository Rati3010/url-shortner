import superbase, { superbaseUrl } from './superbase';

export const getUrls = async (user_id) => {
  let { data, error } = await superbase
    .from('urls')
    .select('*')
    .eq('user_id', user_id);
  console.log(user_id)
  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }
  return data;
};

export const getUrl = async ({ id, user_id }) => {
  const { data, error } = await superbase
    .from('urls')
    .select('*')
    .eq('id', id)
    .eq('user_id', user_id)
    .single();
 
  if (error) {
    console.error(error.message);
    throw new Error('Short Url not found');
  }

  return data;
}

export const  getLongUrl = async(id) => {
  let { data: shortLinkData, error: shortLinkError } = await superbase
    .from('urls')
    .select('id, original')
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== 'PGRST116') {
    console.error('Error fetching short link:', shortLinkError);
    return;
  }

  return shortLinkData;
}

export const createUrl = async(
  { title, longUrl, customUrl, user_id },
  qrcode
) =>{
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;

  const { error: storageError } = await superbase.storage
    .from('qrs')
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${superbaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const { data, error } = await superbase
    .from('urls')
    .insert([
      {
        title,
        user_id,
        original: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr_code:qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error('Error creating short URL');
  }

  return data;
}

export const deleteUrl = async (id) => {
  const { data, error } = await superbase.from('urls').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Unable to delete Url');
  }

  return data;
}
