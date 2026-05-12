import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setUser } from "../../API/Slice/userSlice";

export default function OauthSuccess() {

  const [params] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");

    if (token) {

      const user = JSON.parse(atob(token.split(".")[1]));

      dispatch(setUser({ user, token }));

      navigate("/");
    }

  }, []);

}