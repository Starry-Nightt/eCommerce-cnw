import { hideLogin, hideRegister, showLogin, showRegister } from "@/redux/auth-modal.slice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

function useAuthModal() {
  const { showingLogin, showingRegister } = useSelector((state: RootState) => state.authModal);
  const dispatch = useDispatch()

  const onShowLogin = () => dispatch(showLogin())
  const onShowRegister= () => dispatch(showRegister())
  const onHideLogin = () => dispatch(hideLogin())
  const onHideRegister = () => dispatch(hideRegister())

  return {showingLogin, showingRegister, onShowLogin, onShowRegister, onHideLogin, onHideRegister}
  
}

export default useAuthModal;
