import superbase, { superbaseUrl } from './superbase';

export const login = async ({ email, password }) => {
  const { data, error } = await superbase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);

  return data;
};

export const getCurrentUser = async () => {
  const { data: session, error } = await superbase.auth.getSession();
  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
};

export const signup  = async ({name,email,password,profile_pic}) =>{
  const fileName = `dp-${name.split(" ").join("-")}${Math.random()}`;
  const {error: storageError} = await superbase.storage.from('profile_pic').upload(fileName,profile_pic);
  if(storageError) throw new Error(storageError.message);

  const {data, error} = await superbase.auth.signUp({
    email,
    password,
    options:{
      data:{
        name,
        profile_pic:`${superbaseUrl}/storage/v1/object/public/profile_pic/${fileName}`
      }
    }
  })
  if(error) throw new Error(error.message);

  return data;
}

export const logout = async() => {
  const {error} = await superbase.auth.signOut();
  if (error) throw new Error(error.message);
}