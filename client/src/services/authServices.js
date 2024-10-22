import { userLogin, userRegister } from "../redux/features/auth/authActions";
import store from "../redux/store";

export const handleLogin = (e, role, email, password) => {
  e.preventDefault();
  try {
    if (!role || !email || !password) {
      return alert("Please provide all fields!!!");
    }
    store.dispatch(userLogin({ role, email, password }));
  } catch (error) {
    console.log(error);
  }
};

export const handleRegister = (
  e,
  role,
  name,
  organisationName,
  hospitalName,
  email,
  password,
  phone,
  website,
  address
) => {
  e.preventDefault();
  try {
    store.dispatch(
      userRegister({
        role,
        name,
        organisationName,
        hospitalName,
        email,
        password,
        phone,
        website,
        address,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
