import { Link } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import  SignOutButton  from "../Pages/SignOutButton";


const Header = () => {
  const {isLoggedIn} = useAppContext();
  return (
    <div className="bg-indigo-600 py-6">
      <div className="container w-[80vw] xl:w-[60vw] mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to={"/"}>Holi - Days</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn  ? (
            <>
              <Link
                to="/sign-in"
                className="flex items-center bg-black p-2 text-white px-6 font-bold hover:bg-indigo-700 transition duration-500 ease-in-out border border-teal-300 hover:border-black rounded"
              >
                My Bookings
              </Link>
              <Link
                to="/sign-in"
                className="flex items-center bg-black p-2 text-white px-6 font-bold hover:bg-indigo-700 transition duration-500 ease-in-out border border-teal-300 hover:border-black rounded"
              >
                My Hotels
              </Link>
             <SignOutButton />
            </>
          ):
          <Link
            to="/sign-in"
            className="flex items-center bg-black p-2 text-white px-6 font-bold hover:bg-indigo-700 transition duration-500 ease-in-out border border-teal-300 hover:border-black rounded"
          >
            Sign In
          </Link> }
        </span>
      </div>
    </div>
  );
}

export default Header
