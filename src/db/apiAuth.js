import superbase from './superbase';

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
