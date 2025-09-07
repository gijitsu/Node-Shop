import { useEffect, useState } from "react";
import Layout from "../../Layouts/Layout";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../Redux/Actions/User";
import { USER_REGISTER_RESET } from "../../Redux/Constants/User";


export default function Register() {    

    const [email, setEmail] = useState(null);
    const [name, setName] = useState(null);
    const [password, setPassword] = useState(null);
    const [repeatPassword, setRepeatPassword] = useState(null);
    const [touched, setTouched] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [submitted, setSubmitted] = useState(false);


    const userRegisterReducer = useSelector((state)=>state.userRegisterReducer);
    const { loading, error, userInfo } = userRegisterReducer;

    const dispatch = useDispatch();

    const passwordsMatch = password === repeatPassword;
    const showPasswordError = touched && !passwordsMatch;

    const submitHandler = (e) => {
        e.preventDefault();
        if(!passwordsMatch) return;
        setSubmitted(true);
        dispatch(userRegisterAction(name, email, password));
    }

    useEffect(() => {
        dispatch({ type: USER_REGISTER_RESET });
    }, [dispatch]);

    useEffect(() => {
        if (submitted && userInfo) {
            setSuccessMessage("✅ Account created successfully!");
            setEmail("");
            setName("");
            setPassword("");
            setRepeatPassword("");
            setTouched(false);

            // Hide message after 3s
            const timer = setTimeout(() => {
                setSuccessMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [submitted, userInfo]);

    return (
        <Layout>
            { loading ? ( 

                <div class="flex items-center justify-center w-80 h-80  mx-auto my-56">
                <div role="status">
                    <svg aria-hidden="true" class="w-80 h-80 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
                    <span class="sr-only">Loading...</span>
                </div>
                </div>
            
            ) : error ? (
                <h1 className='text-center text-3xl font-bold py-60 text-red-700'>{error}</h1>
            ) : (
                <>
                    <form class="max-w-sm mx-auto py-48" onSubmit={submitHandler}>
                        {successMessage && (
                            <p className="mb-4 text-green-600 font-medium">{successMessage}</p>
                        )}
                       
                    <div class="mb-5">
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="admin@domain.com" required />
                    </div>

                    <div class="mb-5">
                        <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your full name</label>
                        <input type="text" id="text" value={name} onChange={(e) => setName(e.target.value)}  class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Ex. John" required />
                    </div>


                    <div class="mb-5">
                        <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} class="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
                    </div>
                    <div class="mb-5">
                        <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
                        <input type="password" id="repeat-password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} onBlur={() => setTouched(true)} className={`shadow-xs bg-gray-50 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:text-white
                        ${
                        showPasswordError
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        }`}
                        required
                        />
                        {showPasswordError && (
                        <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                        )} 
                    </div>
                    <div class="flex items-start mb-5">
                        <div class="flex items-center h-5">
                        <input id="terms" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                        </div>
                        <label for="terms" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a></label>
                    </div>
                    <button type="submit" disabled={!passwordsMatch || !password || !repeatPassword } className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none ${
              !passwordsMatch || !password || !repeatPassword
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            }`}
          >Register</button>
                    </form>

                </>
            )}
        </Layout>
    );
}